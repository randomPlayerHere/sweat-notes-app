from pyexpat import features
from fastapi import FastAPI
from backend.app.models.schema import PredictCalorieRequest, PredictCalorieResponse
from backend.app.services.calorie_prediction import get_prediction

app = FastAPI(title="Sweat Notes")

@app.get("/")
def status():
    return {"message": "FastAPI Backend is running"}

@app.post("/predict/")
def predictCalories(req: PredictCalorieRequest):
    features = req.dict()
    prediction = get_prediction(features)
    response = PredictCalorieResponse(
        user_id=req.user_id,
        predicted_calories=prediction
    )
    return response
