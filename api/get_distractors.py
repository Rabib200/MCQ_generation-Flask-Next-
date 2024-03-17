from flask import Flask, jsonify, request
from nltk.corpus import wordnet as wn
from flask_cors import CORS

app = Flask(__name__)

CORS(app, resources={r"/api/*": {"origins": ["*"]}})

app.config['MAX_CONTENT_LENGTH'] = 1 * 1024 * 1024  # 1MB

def get_distractors_of_a_word(syn,word):
    distractors = []
    word = word.lower()
    orig_word = word

    if len(word.split())>0:
        word = word.replace(" ","_")
    hypernym = syn.hypernyms()
    if len(hypernym) == 0:
        return distractors
    for item in hypernym[0].hyponyms():
        name = item.lemmas()[0].name()
        if name == orig_word:
            continue
        name = name.replace("_"," ")
        name = " ".join(w.capitalize() for w in name.split())
        if name is not None and name not in distractors:
            distractors.append(name)
    return distractors

    

@app.route('/api/get_distractors', methods=['GET'])
def get_distractors():
    word = request.args.get('word')
    if not isinstance(word, str):
        return jsonify({'error': 'Word parameter must be a string'}), 400

    if not word:
        return jsonify({'error': 'Word parameter is missing'}), 400

    try:
        distractors = get_distractors_of_a_word(word)
        
        return jsonify({'distractors': distractors})
    except Exception as e:
        app.logger.error(f"An error occurred: {e}")
        return jsonify({'error': 'An error occurred while processing the word'}), 500

if __name__ == '__main__':
    app.run(debug=False)
