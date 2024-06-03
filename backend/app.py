from flask import Flask, request, jsonify
# import tensorflow as tf
# import numpy as np
from cnn.classify import get_prediction
from reverse_proxy import proxy_request
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
# model_path = os.path.join(os.path.dirname(__file__), 'cnn', 'model.h5')
# model = tf.keras.models.load_model(model_path)

@app.route('/predict/peach', methods=['POST'])
def apple_predict():
    print("Analyzing peach")
    if (request.files['image']):
        image = request.files['image']
        result = get_prediction(image)
        print('Model classification: ' + result)
        return jsonify({"result": result})

@app.route('/predict/pomegranate', methods=['POST'])
def banana_predict():
    print("Analyzing pomegranate")
    if (request.files['image']):
        image = request.files['image']
        result = get_prediction(image)
        print('Model classification: ' + result)
        return jsonify({"result": result})
    
@app.route('/predict/strawberry', methods=['POST'])
def banana_predict():
    print("Analyzing strawberry")
    if (request.files['image']):
        image = request.files['image']
        result = get_prediction(image)
        print('Model classification: ' + result)
        return jsonify({"result": result})

if __name__ == '__main__':
    app.run(debug=True)
