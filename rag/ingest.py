from utils import load_workouts, get_embedding
import pandas as pd
import numpy as np

vector_db = []

def build_vector_db(csv_path="data/context_exercises.csv"):
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
    return vector_db