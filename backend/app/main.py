from fastapi import FastAPI
from models.schema import PredictCalorieRequest, PredictCalorieResponse
from services.calorie_prediction import get_prediction

app = FastAPI(title="Sweat Notes")

@app.get("/")
def status():
    return {"message": "FastAPI Backend is running"}

@app.get("/predict/")
def predictCalories(req: PredictCalorieRequest):
    features = [
        req.age,
        req.gender,
        req.weight,
        req.height,
        req.bmi,
        req.workout_type,
        req.session_duration,
        req.experience_level,
        req.workout_frequency,
        req.fat_percentage
    ]
    prediction = get_prediction(features)
    response = PredictCalorieResponse(
        user_id=req.user_id,
        predicted_calories=prediction
    )
    return response
