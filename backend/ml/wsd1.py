import torch
import math
from transformers import BertModel, BertConfig, BertPreTrainedModel, BertTokenizer

import csv
import os
from collections import namedtuple



import nltk
nltk.download('wordnet')

import re
from tabulate import tabulate
from nltk.corpus import wordnet as wn

from torch.nn.functional import softmax
from tqdm import tqdm
from transformers import BertTokenizer
import time







class BertWSD(BertPreTrainedModel):
    def __init__(self, config):
        super().__init__(config)
        self.bert = BertModel(config)
        self.dropout = torch.nn.Dropout(config.hidden_dropout_prob)

        self.ranking_linear = torch.nn.Linear(config.hidden_size , 1)
        self.init_weights()



DEVICE = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

model_filename = "bert_base-augmented-batch_size=128-lr=2e-5-max_gloss=6.zip"

# Specify the path to the 'wsd_model' folder within your project
wsd_model_folder = "wsd_model"

# Generate the full path to the BERT model ZIP file
bert_wsd_pytorch = os.path.join(wsd_model_folder, model_filename)

# Specify the directory where you want to extract the contents
extract_directory = wsd_model_folder

# Generate the path for the extracted folder based on the ZIP file's name
model_dir =  os.path.join(extract_directory, os.path.splitext(model_filename)[0])
print("model loaded from dir: ", model_dir)
model = BertWSD.from_pretrained(model_dir)
tokenizer = BertTokenizer.from_pretrained(model_dir)

if '[TGT]' not in tokenizer.additional_special_tokens:
    tokenizer.add_special_tokens({'additional_special_tokens': ['[TGT]']})
    assert '[TGT]' in tokenizer.additional_special_tokens
    model.resize_token_embeddings(len(tokenizer))


model.to(DEVICE)
model.eval()


GlossSelectionRecord = namedtuple("GlossSelectionRecord", ["guid", "sentence", "sense_keys", "glosses", "targets"])
BertInput = namedtuple("BertInput", ["input_ids", "input_mask", "segment_ids", "label_id"])



def _create_features_from_records(records, max_seq_length, tokenizer, cls_token_at_end=False, pad_on_left=False,
                                  cls_token='[CLS]', sep_token='[SEP]', pad_token=0,
                                  sequence_a_segment_id=0, sequence_b_segment_id=1,
                                  cls_token_segment_id=1, pad_token_segment_id=0,
                                  mask_padding_with_zero=True, disable_progress_bar=False):
    """ Convert records to list of features. Each feature is a list of sub-features where the first element is
        always the feature created from context-gloss pair while the rest of the elements are features created from
        context-example pairs (if available)
        `cls_token_at_end` define the location of the CLS token:
            - False (Default, BERT/XLM pattern): [CLS] + A + [SEP] + B + [SEP]
            - True (XLNet/GPT pattern): A + [SEP] + B + [SEP] + [CLS]
        `cls_token_segment_id` define the segment id associated to the CLS token (0 for BERT, 2 for XLNet)
    """
    features = []
    for record in tqdm(records, disable=disable_progress_bar):
        tokens_a = tokenizer.tokenize(record.sentence)

        sequences = [(gloss, 1 if i in record.targets else 0) for i, gloss in enumerate(record.glosses)]

        pairs = []
        for seq, label in sequences:
            tokens_b = tokenizer.tokenize(seq)

            # Modifies `tokens_a` and `tokens_b` in place so that the total
            # length is less than the specified length.
            # Account for [CLS], [SEP], [SEP] with "- 3"
            _truncate_seq_pair(tokens_a, tokens_b, max_seq_length - 3)

            # The convention in BERT is:
            # (a) For sequence pairs:
            #  tokens:   [CLS] is this jack ##son ##ville ? [SEP] no it is not . [SEP]
            #  type_ids:   0   0  0    0    0     0       0   0   1  1  1  1   1   1
            #
            # Where "type_ids" are used to indicate whether this is the first
            # sequence or the second sequence. The embedding vectors for `type=0` and
            # `type=1` were learned during pre-training and are added to the wordpiece
            # embedding vector (and position vector). This is not *strictly* necessary
            # since the [SEP] token unambiguously separates the sequences, but it makes
            # it easier for the model to learn the concept of sequences.
            #
            # For classification tasks, the first vector (corresponding to [CLS]) is
            # used as as the "sentence vector". Note that this only makes sense because
            # the entire model is fine-tuned.
            tokens = tokens_a + [sep_token]
            segment_ids = [sequence_a_segment_id] * len(tokens)

            tokens += tokens_b + [sep_token]
            segment_ids += [sequence_b_segment_id] * (len(tokens_b) + 1)

            if cls_token_at_end:
                tokens = tokens + [cls_token]
                segment_ids = segment_ids + [cls_token_segment_id]
            else:
                tokens = [cls_token] + tokens
                segment_ids = [cls_token_segment_id] + segment_ids

            input_ids = tokenizer.convert_tokens_to_ids(tokens)

            # The mask has 1 for real tokens and 0 for padding tokens. Only real
            # tokens are attended to.
            input_mask = [1 if mask_padding_with_zero else 0] * len(input_ids)

            # Zero-pad up to the sequence length.
            padding_length = max_seq_length - len(input_ids)
            if pad_on_left:
                input_ids = ([pad_token] * padding_length) + input_ids
                input_mask = ([0 if mask_padding_with_zero else 1] * padding_length) + input_mask
                segment_ids = ([pad_token_segment_id] * padding_length) + segment_ids
            else:
                input_ids = input_ids + ([pad_token] * padding_length)
                input_mask = input_mask + ([0 if mask_padding_with_zero else 1] * padding_length)
                segment_ids = segment_ids + ([pad_token_segment_id] * padding_length)

            assert len(input_ids) == max_seq_length
            assert len(input_mask) == max_seq_length
            assert len(segment_ids) == max_seq_length

            pairs.append(
                BertInput(input_ids=input_ids, input_mask=input_mask, segment_ids=segment_ids, label_id=label)
            )

        features.append(pairs)

    return features


def _truncate_seq_pair(tokens_a, tokens_b, max_length):
    """Truncates a sequence pair in place to the maximum length."""

    # This is a simple heuristic which will always truncate the longer sequence
    # one token at a time. This makes more sense than truncating an equal percent
    # of tokens from each, since if one sequence is very short then each token
    # that's truncated likely contains more information than a longer sequence.
    while True:
        total_length = len(tokens_a) + len(tokens_b)
        if total_length <= max_length:
            break
        if len(tokens_a) > len(tokens_b):
            tokens_a.pop()
        else:
            tokens_b.pop()





MAX_SEQ_LENGTH = 128
DEVICE = "cuda" if torch.cuda.is_available() else "cpu"  # Adjust as needed

# Assuming you have a tokenizer defined like this:
tokenizer = BertTokenizer.from_pretrained("bert-base-uncased")

def get_sense(sent):
    re_result = re.search(r"\[TGT\](.*)\[TGT\]", sent)
    if re_result is None:
        print("\nIncorrect input format. Please try again.")

    ambiguous_word = re_result.group(1).strip()

    results = dict()

    wn_pos = wn.NOUN
    for i, synset in enumerate(set(wn.synsets(ambiguous_word, pos=wn_pos))):
        results[synset] = synset.definition()

    if len(results) == 0:
        return (None, None, ambiguous_word)

    sense_keys = []
    definitions = []
    for sense_key, definition in results.items():
        sense_keys.append(sense_key)
        definitions.append(definition)

    # Assuming GlossSelectionRecord and _create_features_from_records are defined elsewhere in your code

    # Assuming you have a GlossSelectionRecord class defined
    record = GlossSelectionRecord("test", sent, sense_keys, definitions, [-1])

    # Assuming you have a function _create_features_from_records defined
    features = _create_features_from_records([record], MAX_SEQ_LENGTH, tokenizer,
                                             cls_token=tokenizer.cls_token,
                                             sep_token=tokenizer.sep_token,
                                             cls_token_segment_id=1,
                                             pad_token_segment_id=0,
                                             disable_progress_bar=True)[0]

    with torch.no_grad():
        logits = torch.zeros(len(definitions), dtype=torch.double).to(DEVICE)
        for i, bert_input in list(enumerate(features)):
            # print(f"Processing example {i + 1}")
            # print("Length of input_ids in loop:", len(bert_input.input_ids))
            # print("Input_ids in loop:", bert_input.input_ids)
            # print("Length of attention_mask in loop:", len(bert_input.input_mask))
            # print("Attention_mask in loop:", bert_input.input_mask)
            # print("Length of token_type_ids in loop:", len(bert_input.segment_ids))
            # print("Token_type_ids in loop:", bert_input.segment_ids)
            logits[i] = model.ranking_linear(
                model.bert(
                    input_ids=torch.tensor(bert_input.input_ids, dtype=torch.long).unsqueeze(0).to(DEVICE),
                    attention_mask=torch.tensor(bert_input.input_mask, dtype=torch.long).unsqueeze(0).to(DEVICE),
                    token_type_ids=torch.tensor(bert_input.segment_ids, dtype=torch.long).unsqueeze(0).to(DEVICE)
                )[1]
            )

        scores = softmax(logits, dim=0)

        preds = (sorted(zip(sense_keys, definitions, scores), key=lambda x: x[-1], reverse=True))

    sense = preds[0][0]
    meaning = preds[0][1]
    return (sense, meaning, ambiguous_word)


# sentence1 = "Rabib is annoyed by the **cricket** insect in his room"


# sentence_for_bert = sentence1.replace("**"," [TGT] ")
# sentence_for_bert = " ".join(sentence_for_bert.split())
# sense,meaning,answer = get_sense(sentence_for_bert)

# print (sentence1)
# print (sense)
# print (meaning)

# sentence2 = "Rabib loves to play **cricket**"
# sentence_for_bert = sentence2.replace("**"," [TGT] ")
# sentence_for_bert = " ".join(sentence_for_bert.split())
# sense,meaning,answer = get_sense(sentence_for_bert)

# print ("\n-------------------------------")
# print (sentence2)
# print (sense)
# print (meaning)
