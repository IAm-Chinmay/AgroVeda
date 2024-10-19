import sys
import json
import joblib
import numpy as np

# Load your models
label_encoder = joblib.load('label_encoder.pkl')
crop_recommendation_model = joblib.load('crop_recommendation_model.pkl')

# Read input from stdin
input_data = json.load(sys.stdin)

# Extract features from input data
features = [
    input_data['N'],
    input_data['P'],
    input_data['K'],
    input_data['temperature'],
    input_data['humidity'],
    input_data['ph'],
    input_data['rainfall']
]

# Predict probabilities for each class
probabilities = crop_recommendation_model.predict_proba([features])[0]

# Get the indices of the top 3 probabilities
top_indices = np.argsort(probabilities)[-3:][::-1]

# Map indices to labels
top_labels = label_encoder.inverse_transform(top_indices)
top_probabilities = [probabilities[i] for i in top_indices]

# Output the prediction and input features as JSON
output = {
   'crops': top_labels.tolist()
}

print(json.dumps(output))