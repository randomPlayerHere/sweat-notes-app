from pydantic import BaseModel, EmailStr

class PredictCalorieRequest(BaseModel):
    user_id : str
    age : int
    gender: str
    weight: int
    height : float
    workout_type: str
    fat_percentage : float
    workout_frequency: int
    #earlier here there was workout_type by mistake, i.e. repeated, i changed it, and puut frequency
    experience_level : int
    bmi : float
    intensity_level : int
    seesion_duration: int

# age                     int64
# gender                 object
# weight kg                float64
# height m                float64
# session_duration hrs     float64
# workout_type           object
# fat_percentage        float64
# workout_frequency       int64
# experience_level        int64
# bmi                   float64

class PredictCalorieResponse(BaseModel):
    user_id: str
    predicted_calories: float


class SignUpRequest(BaseModel):
    email : EmailStr
    password: str

class SignInRequest(BaseModel):
    email: EmailStr
    password: str

class UserDetails(BaseModel):
    age : int
    gender: str
    weight: int
    height: float
    workout_type: str
    fat_percentage: int
    workout_frequency: int
    experience_level: int
    bmi: float
