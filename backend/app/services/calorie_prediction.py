import joblib, os
import pandas as pd
from ..utils.preprocessing_calorie import featureEngineering

MODEL_PATH = os.path.join(os.path.dirname(__file__), "..", "ml_models", "calorie_predictor.pkl")
MODEL_PATH = os.path.abspath(MODEL_PATH)
model = joblib.load(MODEL_PATH)

def get_prediction(features: list) -> float:
    cols = [
        "age", "gender", "weight", "height", "bmi", "workout_type",
        "session_duration", "experience_level", "workout_frequency", "fat_percentage"
    ]
    df = pd.DataFrame([features], columns=cols)
    return float(model.predict(df))
