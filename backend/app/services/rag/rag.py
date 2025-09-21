# rag.py
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
import google.generativeai as genai
from sentence_transformers import SentenceTransformer
from dotenv import load_dotenv
import os

load_dotenv()
genai.configure(api_key=os.getenv("YOUR_API_KEY"))
model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")

def retrieve(query, db, top_k=3):
    q_emb = model.encode(query)
    sims = cosine_similarity([q_emb], db["embedding"].tolist())[0]
    top_idx = np.argsort(sims)[::-1][:top_k]
    return db.iloc[top_idx]

def generate_workout_plan(query, db):
    retrieved = retrieve(query, db)
    context = "\n".join(
        f"- {row['exercise']} ({row['muscle_group']}, {row['equipment']})"
        for _, row in retrieved.iterrows()
    )
    
    prompt = f"""
Use the provided context and user query to generate a workout plan.
Respect injuries and user preferences.
Respond ONLY in valid JSON following this schema. No explanations, no extra text.

Context (available exercises):
{context}

Schema:
{{
  "days_per_week": integer,
  "days": [
    {{
      "day": string,
      "exercises": [
        {{
          "name": string,
          "sets": integer,
          "reps": string,
          "rest_time_seconds": integer,
          "notes": string
        }}
      ]
    }}
  ],
  "injuries_considered": [string],
  "preferences_respected": [string]
}}

User query: {query}
"""
    model = genai.GenerativeModel('gemini-1.5-flash')
    response = model.generate_content(prompt)
    return response.text
