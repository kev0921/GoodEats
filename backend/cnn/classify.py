from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array, load_img
import numpy as np

# Load the saved model
# model = load_model('/Users/kevinhu/Downloads/web-projects/SafeEats/backend/cnn/cnn_model2.h5')
model = load_model('cnn/cnn_model2.h5')

def get_prediction(image_path):
    # Load and preprocess the image
    img = load_img(image_path, target_size=(300, 300))
    img = img_to_array(img)
    img = np.expand_dims(img, axis=0)
    img /= 255.

    # Make prediction
    prediction = model.predict(img)

    # Get the class with highest probability
    predicted_class = np.argmax(prediction)

    # Assuming you have a list of class names in the order they were encoded
    class_names = ['Fresh', 'Stale']

    return class_names[predicted_class]

# # Test the function
# image_path = '/Users/kevinhu/Downloads/web-projects/SafeEats/backend/images/Test/RottenPeach/rotten_peach_1.jpg'
# print(get_prediction(image_path))