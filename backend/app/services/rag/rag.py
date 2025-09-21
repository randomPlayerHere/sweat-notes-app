import os,re
import json
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from sentence_transformers import SentenceTransformer
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()
genai.configure(api_key=os.getenv("YOUR_API_KEY"))

embedding_model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")

def retrieve(query_text: str, db, top_k=3):
    q_emb = embedding_model.encode(query_text)
    sims = cosine_similarity([q_emb], db["embedding"].tolist())[0]
    top_idx = np.argsort(sims)[::-1][:top_k]
    return db.iloc[top_idx]

def generate_workout_plan(query, db):
    # Convert Pydantic query to text for embedding + context
    
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
    llm = genai.GenerativeModel("gemini-1.5-flash")
    response = llm.generate_content(prompt)

    try:
        raw_text = response.text.strip()
        if raw_text.startswith("```"):
            raw_text = re.sub(r"^```json\n", "", raw_text)
            raw_text = re.sub(r"\n```$", "", raw_text)

        plan = json.loads(raw_text)
        return plan
    except Exception:
        print(response.text.strip())
        raise ValueError("LLM did not return valid JSON")
