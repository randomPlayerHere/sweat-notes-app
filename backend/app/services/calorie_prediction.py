import joblib, os
from app.utils.preprocessing_calorie import featureEngineering  # relative import

MODEL_PATH = os.path.join(os.path.dirname(__file__),"app", "ml_models", "calorie_predictor.pkl")
MODEL_PATH = os.path.abspath(MODEL_PATH)  
model = joblib.load(MODEL_PATH)


def get_prediction(features: list) -> float:
    return float(model.predict([features])[0])


if __name__ == "__main__":
    y = [56, 'Male', 88.3, 1.71, 1.69, 'Yoga', 12.6, 4, 3, 30.2]
    print(get_prediction(y))
