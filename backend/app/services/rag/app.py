from rag import generate_workout_plan
import pandas as pd

db = pd.read_pickle('data/exercise_embeddings.pkl')
plan = generate_workout_plan("I want a beginner chest and triceps workout using dumbbells", db)
print(plan)
