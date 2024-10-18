# crop_recommendation.py

import json
import sys
from fuzzywuzzy import process

def load_data(file_path):
    with open(file_path, 'r') as file:
        return json.load(file)

def find_best_match(query, choices):
    best_match, score = process.extractOne(query, choices)
    return best_match if score >= 70 else None  # Set a threshold for matching

def get_treatment_info(data, crop_name, category, disease_name):
    crop_data = data.get(crop_name)
    if crop_data:
        treatment_category = crop_data.get(category)
        if treatment_category:
            available_diseases = list(treatment_category.keys())
            best_disease = find_best_match(disease_name, available_diseases)
            if best_disease:
                return treatment_category[best_disease]
            else:
                return f"No data found for disease: {disease_name}"
        else:
            return f"No data found for category: {category}"
    else:
        return f"No data found for crop: {crop_name}"

def main():
    data = load_data('dataset.json')  

    # Read input from stdin
    input_data = json.loads(sys.stdin.read())
    
    crop_name = input_data['crop_name']
    category = input_data['category']
    disease_name = input_data['disease_name']
    
    # Get treatment information
    result = get_treatment_info(data, crop_name, category, disease_name)
    
    # Return result as JSON
    print(json.dumps(result))

if __name__ == "__main__":
    main()
