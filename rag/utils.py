import google.generativeai as genai
from dotenv import load_dotenv
import os
import pandas as pd
import numpy as np

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def load_workouts(path="data/context_exercises.csv"):
    return pd.read_csv(path)


def get_embedding(text: str) -> np.ndarray:
    res = genai.embed_content(
        model="gemini-embedding-001",
        content=text
    )
    return np.array(res["embedding"], dtype=np.float32)

def cosine_similarity(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

def search(query: str, vector_db, top_k=5):
    q_emb = get_embedding(query)
    scored = []
    for item in vector_db:
        score = cosine_similarity(q_emb, item["embedding"])
        scored.append((score, item))
    scored.sort(key=lambda x: x[0], reverse=True)
    return [item for _, item in scored[:top_k]]