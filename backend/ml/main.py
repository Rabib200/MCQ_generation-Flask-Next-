import random
from flask import Flask, request,jsonify
from flask_cors import CORS
from transformers import T5ForConditionalGeneration,T5Tokenizer
from wsd1 import get_sense
from get_distractors import get_distractors_of_a_word

app = Flask(__name__)

CORS(app, resources={r"/api/*": {"origins": ["*"]}})

question_model = T5ForConditionalGeneration.from_pretrained('ramsrigouthamg/t5_squad_v1')
question_tokenizer = T5Tokenizer.from_pretrained('t5-base', legacy=False)

def get_question(sentence,answer):
  text = "context: {} answer: {} </s>".format(sentence,answer)
  # print (text)
  max_len = 256
  encoding = question_tokenizer.encode_plus(text,max_length=max_len, pad_to_max_length=True, return_tensors="pt")

  input_ids, attention_mask = encoding["input_ids"], encoding["attention_mask"]

  outs = question_model.generate(input_ids=input_ids,
                                  attention_mask=attention_mask,
                                  early_stopping=True,
                                  num_beams=5,
                                  num_return_sequences=1,
                                  no_repeat_ngram_size=2,
                                  max_length=200)


  dec = [question_tokenizer.decode(ids) for ids in outs]


  Question = dec[0].replace("question:","").replace("<pad>","").replace("</s>","")
  
  Question= Question.strip()
  return Question


def getMCQs(sent):
  sentence_for_bert = sent.replace("**"," [TGT] ")
  sentence_for_bert = " ".join(sentence_for_bert.split())

  sense,meaning,answer = get_sense(sentence_for_bert)
  if sense is not None:
    distractors = get_distractors_of_a_word(sense,answer)
  else:
    distractors = [""]
  
  sentence_for_T5 = sent.replace("**"," ")
  sentence_for_T5 = " ".join([sentence_for_T5, answer])

  ques = get_question(sentence_for_T5,answer)
  return ques,answer,distractors,meaning

def generate_unique_id(generated_ids):
    random_id = None
    while random_id is None or random_id in generated_ids:
        random_id = random.randint(1, 99999)
    generated_ids.add(random_id)
    return random_id



@app.route('/api/generate_mcq',methods=['POST'])
def generate_mcq():
  data = request.json

  sentence = data.get('sentence')
  generated_ids = set()
  

  if sentence  :
    question , answer , distractors , meaning = getMCQs(sentence)
    unique_id = generate_unique_id(generated_ids)
    
    response_data = {
      "question" : question,
      "answer" : answer,
      "distractors" : distractors,
      "meaning" : meaning,
      "random_id": unique_id,
    }
    return jsonify(response_data)
  else:
    return jsonify({"error" : "Sentence and answer must be proivded"})


if __name__ == '__main__':
  app.run(debug=True)


# sentence1 = "Rabib is annoyed by the **cricket** insect in his room"
# sentence2 = "Rabib loves to play **cricket**"

# answer = "cricket"


# print("\n---------------------------------\n")
# print ("\n")
# question,answer,distractors,meaning = getMCQs(sentence1)
# print (question)
# print (answer)
# print (distractors)
# print (meaning)


# print ("\n")
# question,answer,distractors,meaning = getMCQs(sentence2)
# print (question)
# print (answer)
# print (distractors)
# print (meaning)

# # sentence_for_T5 = sentence1.replace("**"," ")
# # sentence_for_T5 = " ".join(sentence_for_T5.split()) 
# # ques = get_question(sentence_for_T5,answer)
# # print (sentence1)
# # print (ques)


# # print ("\n**************************************\n")
# # sentence_for_T5 = sentence2.replace("**"," ")
# # sentence_for_T5 = " ".join(sentence_for_T5.split()) 
# # ques = get_question(sentence_for_T5,answer)
# # print (sentence2)
# # print (ques)



# print("\n--------------------------------\n")

