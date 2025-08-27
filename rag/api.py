# api.py
from flask import Flask, request, jsonify
from ingest import build_vector_db
from rag import generate_workout_plan

app = Flask(__name__)

db = build_vector_db("data/context_exercises.csv")

@app.route("/generate", methods=["POST"])
def generate():
    data = request.get_json()
    query = data.get("query")

    if not query:
        return jsonify({"error": "Query is required"}), 400

    plan = generate_workout_plan(query, db)
    return jsonify({"plan": plan})

if __name__ == "__main__":
    app.run(debug=True, port=5000)
