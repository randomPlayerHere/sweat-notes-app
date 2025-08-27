# rag.py
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from google import genai

client = genai.Client()

def retrieve(query, db, top_k=3):
    q_emb = client.models.embed_content(
        model="text-embedding-004",
        contents=query
    ).embeddings[0].values

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
Use the provided context + user query to generate a workout plan.  
Respect injuries and user preferences.  
Respond ONLY in valid JSON following this schema. No explanations, no extra text.

Schema:
{
  "days_per_week": integer,
  "days": [
    {
      "day": string,
      "exercises": [
        {
          "name": string,
          "sets": integer,
          "reps": string,
          "rest_time_seconds": integer,
          "notes": string
        }
      ]
    }
  ],
  "injuries_considered": [string],   # return [] if none
  "preferences_respected": [string]  # return [] if none
}

User query: {query}
"""


    response = client.models.generate_content(
        model="gemini-1.5-flash",
        contents=prompt
    )
    return response.text
