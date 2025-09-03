# rag.py
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
import google.generativeai as genai
from dotenv import load_dotenv
import os

load_dotenv()

# Configure the API key (you'll need to set this)
genai.configure(api_key=os.getenv("YOUR_API_KEY"))

def retrieve(query, db, top_k=3):
    """Retrieve most similar exercises from database using embeddings"""
    # Generate embedding for query
    embedding_result = genai.embed_content(
        model="gemini-embedding-001",
        content=query
    )
    q_emb = embedding_result['embedding']
    
    # Calculate cosine similarities
    sims = cosine_similarity([q_emb], db["embedding"].tolist())[0]
    
    # Get top-k most similar indices
    top_idx = np.argsort(sims)[::-1][:top_k]
    
    return db.iloc[top_idx]

def generate_workout_plan(query, db):
    """Generate workout plan based on retrieved exercises and user query"""
    # Retrieve relevant exercises
    retrieved = retrieve(query, db)
    
    # Create context from retrieved exercises
    context = "\n".join(
        f"- {row['exercise']} ({row['muscle_group']}, {row['equipment']})"
        for _, row in retrieved.iterrows()
    )
    
    # Create prompt with context
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
    
    # Initialize the model
    model = genai.GenerativeModel('gemini-1.5-flash')
    
    # Generate response
    response = model.generate_content(prompt)
    
    return response.text
