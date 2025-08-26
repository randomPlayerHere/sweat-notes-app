# main.py
from ingest import build_vector_db
from rag import generate_workout_plan

db = build_vector_db("data/context_exercises.csv")
plan = generate_workout_plan("I want a beginner chest and triceps workout using dumbbells", db)
print(plan)
