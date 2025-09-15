import time
import pickle
import os
import pandas as pd
from utils import load_workouts
import google.generativeai as genai

# Configure Gemini with API key
genai.configure(api_key=os.environ["GEMINI_API_KEY"])

# Configuration
GEMINI_MODEL = "models/embedding-001"
OUTPUT_DIM = 768
MAX_BATCH_SIZE = 50
SLEEP_ON_RATE_LIMIT = 60

def embed_texts_with_gemini(texts):
    """
    Call Gemini embedding API in batch for a list of texts.
    Returns list of embeddings.
    """
    try:
        result = genai.embed_content(
            model=GEMINI_MODEL,
            content=texts,
            task_type="retrieval_document",
            output_dimensionality=OUTPUT_DIM
        )
        # If input is list of texts → embeddings is list of vectors
        return result["embedding"]
    except Exception as e:
        raise e

def build_vector_db(csv_path="data/context_exercises.csv", cache_file="vector_db_gemini.pkl"):
    if os.path.exists(cache_file):
        with open(cache_file, "rb") as f:
            vector_db = pickle.load(f)
    else:
        vector_db = []

    processed_texts = set(entry["text"] for entry in vector_db)

    df = load_workouts(csv_path)
    texts_to_embed, rows_to_embed = [], []

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
        """.strip()

        if text in processed_texts:
            continue

        texts_to_embed.append(text)
        rows_to_embed.append(row.to_dict())

        if len(texts_to_embed) >= MAX_BATCH_SIZE:
            success = False
            while not success:
                try:
                    embeddings = embed_texts_with_gemini(texts_to_embed)
                    success = True
                except Exception as e:
                    print(f"⚠️ Error embedding batch: {e}. Sleeping {SLEEP_ON_RATE_LIMIT}s.")
                    time.sleep(SLEEP_ON_RATE_LIMIT)

            for emb, meta, txt in zip(embeddings, rows_to_embed, texts_to_embed):
                vector_db.append({"embedding": emb, "metadata": meta, "text": txt})
                processed_texts.add(txt)

            texts_to_embed, rows_to_embed = [], []

            with open(cache_file, "wb") as f:
                pickle.dump(vector_db, f)

    # Leftovers
    if texts_to_embed:
        embeddings = embed_texts_with_gemini(texts_to_embed)
        for emb, meta, txt in zip(embeddings, rows_to_embed, texts_to_embed):
            vector_db.append({"embedding": emb, "metadata": meta, "text": txt})
            processed_texts.add(txt)

        with open(cache_file, "wb") as f:
            pickle.dump(vector_db, f)

    print(f"✅ Built Gemini vector DB with {len(vector_db)} exercises")
    return vector_db

if __name__ == "__main__":
    db = build_vector_db("data/context_exercises.csv")
    print(db[0])
