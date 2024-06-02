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

@app.route('/predict/apple', methods=['POST'])
def apple_predict():
    print("Analyzing apple")
    if (request.files['image']):
        image = request.files['image']
        result = get_prediction(image)
        print('Model classification: ' + result)
        return jsonify({"result": result})

@app.route('/predict/banana', methods=['POST'])
def banana_predict():
    print("Analyzing banana")
    if (request.files['image']):
        image = request.files['image']
        result = get_prediction(image)
        print('Model classification: ' + result)
        return jsonify({"result": result})

if __name__ == '__main__':
    app.run(debug=True)
