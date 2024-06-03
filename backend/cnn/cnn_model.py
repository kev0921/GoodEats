import os
import numpy as np
import cv2
import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.utils import img_to_array, load_img
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Dropout, Flatten, Dense
from tensorflow.keras.callbacks import EarlyStopping
from tensorflow.keras import layers
import matplotlib.pyplot as plt

train_path = "/Users/kevinhu/Downloads/web-projects/SafeEats/backend/images/Train"   # change later to path containing training images
test_path = "/Users/kevinhu/Downloads/web-projects/SafeEats/backend/images/Test"     # change later to path containing testing images

BatchSize = 64


# img = load_img("/Users/kevinhu/Downloads/web-projects/SafeEats/backend/images/Fruits Dataset/rotten_strawberries_done/rotten_strawberry_2.jpg")
# plt.imshow(img)
# plt.show()

# imgA = img_to_array(img)
# print(imgA.shape)


# Build the CNN model
model = Sequential()
model.add(layers.Conv2D(32, (3, 3), activation='relu', input_shape=(300, 300, 3)))
model.add(layers.MaxPooling2D((2, 2)))
model.add(layers.Conv2D(64, (3, 3), activation='relu'))
model.add(layers.MaxPooling2D((2, 2)))
model.add(layers.Conv2D(64, (3, 3), activation='relu'))
model.add(Flatten())
model.add(Dense(32, activation='relu'))
model.add(Dense(2, activation='softmax'))

print(model.summary())

# compile the model
model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])  # try SGD optimizer later

# load data
train_datagen = ImageDataGenerator(rescale=1./255, 
                                   shear_range=0.3, 
                                   zoom_range=0.2, 
                                   horizontal_flip=True,
                                   vertical_flip=True)

test_datagen = ImageDataGenerator(rescale=1./255)

train_generator = train_datagen.flow_from_directory(train_path, 
                                                    target_size=(300, 300), 
                                                    batch_size=BatchSize, 
                                                    class_mode='categorical',
                                                    color_mode='rgb',
                                                    shuffle=True)

test_generator = train_datagen.flow_from_directory(train_path, 
                                                    target_size=(300, 300), 
                                                    batch_size=BatchSize, 
                                                    class_mode='categorical',
                                                    color_mode='rgb')

steps_per_epoch = train_generator.samples // BatchSize
validation_steps = test_generator.samples // BatchSize

# Early stopping
# early_stopping = EarlyStopping(monitor='val_accuracy', patience=5)

# training the model
history = model.fit(train_generator,
                    steps_per_epoch=steps_per_epoch,
                    epochs=10,
                    validation_data=test_generator,
                    validation_steps=validation_steps)

model.save("cnn_model.h5")

# Evaluate the model on the test data
test_loss, test_acc = model.evaluate(test_generator, steps=validation_steps)

print(f'Test accuracy: {test_acc}')   # current test_acc: 0.83203125