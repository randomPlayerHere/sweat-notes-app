from pydantic import BaseModel
from typing import List

class PredictCalorieRequest(BaseModel):
    user_id : str
    age : int
    gender: str
    weight: int
    height : int
    workout_type: str
    fat_percentage : float
    workout_type: str
    experience_level : int
    bmi : float
    intensity_level : int
    seesion_duration: int

class PredictCalorieResponse:
    user_id: int
    pred_id : int


