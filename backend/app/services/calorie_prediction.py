import joblib, os
MODEL_PATH = os.path.join("models", "model.pkl")
model = joblib.load(MODEL_PATH)

def get_prediction(features: list) -> float:
    return float(model.predict([features])[0])
