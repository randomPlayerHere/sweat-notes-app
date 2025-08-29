from fastapi import FastAPI
from app.models.schema import PredictCalorieRequest, PredictCalorieResponse
from app.services.calorie_prediction import get_prediction

app = FastAPI(title="Sweat Notes")

@app.get("/")
def status():
    return {"message": "FastAPI Backend is running"}

@app.get("/predict/")
def predictCalories(req: PredictCalorieRequest):