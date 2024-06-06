from flask import Flask, request, jsonify
# import tensorflow as tf
# import numpy as np
from cnn.classify import get_prediction
# from reverse_proxy import proxy_request
import os
from flask_cors import CORS
from io import BytesIO

app = Flask(__name__)
CORS(app)
# model_path = os.path.join(os.path.dirname(__file__), 'cnn', 'model.h5')
# model = tf.keras.models.load_model(model_path)

@app.route('/predict/peach', methods=['POST', 'OPTIONS'])
def peach_predict():
    if request.method == 'OPTIONS':
        return ('', 204)
    print(f"Analyzing peach")
    if 'image' in request.files:
        image = request.files['image']
        image_bytes = BytesIO(image.read())
        try:
            result = get_prediction(image_bytes)
            print('Model classification: ' + result)
            return jsonify({"result": result})
        except Exception as e:
            print("Error in get_prediction: ", str(e))
            return jsonify({"error": str(e)}), 500
    else:
        return jsonify({"error": "No image provided"}), 400


@app.route('/predict/pomegranate', methods=['POST', 'OPTIONS'])
def pomegranate_predict():
    if request.method == 'OPTIONS':
        return ('', 204)
    print(f"Analyzing pomegranate")
    if 'image' in request.files:
        image = request.files['image']
        image_bytes = BytesIO(image.read())
        try:
            result = get_prediction(image_bytes)
            print('Model classification: ' + result)
            return jsonify({"result": result})
        except Exception as e:
            print("Error in get_prediction: ", str(e))
            return jsonify({"error": str(e)}), 500
    else:
        return jsonify({"error": "No image provided"}), 400

    
@app.route('/predict/strawberry', methods=['POST', 'OPTIONS'])
def strawberry_predict():
    if request.method == 'OPTIONS':
        return ('', 204)
    print(f"Analyzing strawberry")
    if 'image' in request.files:
        image = request.files['image']
        image_bytes = BytesIO(image.read())
        try:
            result = get_prediction(image_bytes)
            print('Model classification: ' + result)
            return jsonify({"result": result})
        except Exception as e:
            print("Error in get_prediction: ", str(e))
            return jsonify({"error": str(e)}), 500
    else:
        return jsonify({"error": "No image provided"}), 400


@app.route('/predict/apple', methods=['POST', 'OPTIONS'])
def apple_predict():
    if request.method == 'OPTIONS':
        return ('', 204)
    print(f"Analyzing apple")
    if 'image' in request.files:
        image = request.files['image']
        image_bytes = BytesIO(image.read())
        try:
            result = get_prediction(image_bytes)
            print('Model classification: ' + result)
            return jsonify({"result": result})
        except Exception as e:
            print("Error in get_prediction: ", str(e))
            return jsonify({"error": str(e)}), 500
    else:
        return jsonify({"error": "No image provided"}), 400

@app.route('/predict/orange', methods=['POST', 'OPTIONS'])
def orange_predict():
    if request.method == 'OPTIONS':
        return ('', 204)
    print(f"Analyzing orange")
    if 'image' in request.files:
        image = request.files['image']
        image_bytes = BytesIO(image.read())
        try:
            result = get_prediction(image_bytes)
            print('Model classification: ' + result)
            return jsonify({"result": result})
        except Exception as e:
            print("Error in get_prediction: ", str(e))
            return jsonify({"error": str(e)}), 500
    else:
        return jsonify({"error": "No image provided"}), 400

@app.route('/predict/banana', methods=['POST', 'OPTIONS'])
def banana_predict():
    if request.method == 'OPTIONS':
        return ('', 204)
    print(f"Analyzing banana")
    if 'image' in request.files:
        image = request.files['image']
        image_bytes = BytesIO(image.read())
        try:
            result = get_prediction(image_bytes)
            print('Model classification: ' + result)
            return jsonify({"result": result})
        except Exception as e:
            print("Error in get_prediction: ", str(e))
            return jsonify({"error": str(e)}), 500
    else:
        return jsonify({"error": "No image provided"}), 400

if __name__ == '__main__':
    app.run(debug=True)
