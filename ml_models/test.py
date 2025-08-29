import joblib, os
MODEL_PATH = os.path.join("calorie_predictor_model.pkl")
model = joblib.load(MODEL_PATH)

def get_prediction(features: list) -> float:
    return float(model.predict([features])[0])

if __name__ == "__main__":
    
