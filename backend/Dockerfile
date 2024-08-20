# Use the official Python image from the Docker Hub
FROM python:3.9

# Set the working directory in the container
WORKDIR /backend

# Copy the requirements file into the container
COPY requirements.txt requirements.txt

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libhdf5-dev \
    && rm -rf /var/lib/apt/lists/*

# Install the Python dependencies
RUN pip install -r requirements.txt

# Expose the port the app runs on
EXPOSE 8080

# Copy the rest of the application code into the container
COPY . .

# Copy the model file into the container
COPY cnn/cnn_model2.h5 cnn/cnn_model2.h5

# Command to run the application
CMD ["python", "app.py"]