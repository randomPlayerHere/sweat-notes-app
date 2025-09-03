from utils import load_workouts, get_embedding
import pandas as pd
import numpy as np
import csv
import pickle

def build_vector_db(csv_path="data/context_exercises.csv"):
    vector_db = []
    df = load_workouts(csv_path)
    for _, row in df.iterrows():
        text = f"""
        Name: {row['name']}
        Force: {row['force']}
        Level: {row['level']}
        Mechanic: {row['mechanic']}
        Equipment: {row['equipment']}
        Primary Muscles: {row['primaryMuscles']}
        Secondary Muscles: {row['secondaryMuscles']}
        Category: {row['category']}
        """
        embedding = get_embedding(text)
        vector_db.append({
            "embedding": embedding,
            "metadata": row.to_dict(),
            "text": text
        })
    print(f"✅ Built in-memory DB with {len(vector_db)} exercises")
    with open("vector_db.pkl", "wb") as f:
        pickle.dump(vector_db, f)
    return vector_db

if __name__ == "__main__":
    db = build_vector_db("data/context_exercises.csv")
    print(db[0])  # Print the first entry to verify
