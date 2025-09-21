import json
import pickle
import pandas as pd
from sentence_transformers import SentenceTransformer

model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")

with open("data/exercises.json", "r") as f:
    data = json.load(f)
excer = []
for ex in data:
    excer.append({
        "exercise": ex["name"],
        "muscle_group": ", ".join(ex.get("primaryMuscles", [])),
        "equipment": ex.get("equipment", ""),
        "instructions": ex.get("instructions", ""),
        "embedding": model.encode(
            f"{ex['name']} {ex.get('instructions','')} {ex.get('primaryMuscles','')}"
        )
    })

db = pd.DataFrame(excer)
db.to_pickle('exercise_embeddings.pkl')

# embeddings = model.encode(texts, show_progress_bar=True)

# with open("exercise_embeddings.pkl", "wb") as f:
#     pickle.dump({
#         "texts": texts,
#         "embeddings": embeddings
#     }, f)

# print("Shape of embeddings:", embeddings.shape)
