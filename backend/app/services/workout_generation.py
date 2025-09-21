from backend.app.services.rag.rag import generate_workout_plan
import pandas as pd

db = pd.read_pickle('data/exercise_embeddings.pkl')

def workout_plan(query: str):
    plan = generate_workout_plan(query.query, db)
    ## this return a json
    return plan
