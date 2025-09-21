from pyexpat import features
from fastapi import FastAPI
from backend.app.models.schema import PredictCalorieRequest, PredictCalorieResponse, WorkoutGenerationQuery, WorkoutGenerationResponse
from backend.app.services.calorie_prediction import get_prediction
from backend.app.services.workout_generation import workout_plan

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

@app.post("/generate/", response_model=WorkoutGenerationResponse)
def genWorkoutplan(query: WorkoutGenerationQuery):
    # workout_plan(query) should already return a dict with the correct keys
    plan = workout_plan(query)
    return WorkoutGenerationResponse(**plan)