import joblib, os
MODEL_PATH = os.path.join("ml_models", "calorie_predictor_model.pkl")
model = joblib.load(MODEL_PATH)

def get_prediction(features: list) -> float:
    return float(model.predict([features])[0])



if __name__ == "__main__":
    y = [56,'Male',88.3,1.71,1.69,'Yoga',12.6,4,3,30.2]
    print(get_prediction(y))