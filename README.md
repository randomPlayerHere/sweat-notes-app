# SweatNotes - AI-Powered Fitness Platform

## Overview

SweatNotes is a fitness platform that uses machine learning and AI to provide personalized workout recommendations and calorie burn predictions. It combines ML models with a Retrieval-Augmented Generation (RAG) system and Google’s Generative AI to deliver customized fitness solutions.

## Features

* Calorie burn prediction based on user profile and workout details
* AI-driven workout planner using a RAG-based recommendation system
* Data analytics and visualization for fitness tracking
* RESTful API built with FastAPI
* End-to-end ML pipeline for training and deployment

## Project Structure

```
SweatNotes/
├── backend/            # FastAPI backend services
│   ├── app/
│   │   ├── main.py       # Application entry point
│   │   ├── models/       # Data models and schemas
│   │   ├── services/     # Business logic and ML predictions
│   │   └── utils/        # Utility functions
│   └── requirements.txt  # Python dependencies
├── rag/                # RAG system for workout recommendations
│   ├── api.py           # API for workout generation
│   ├── ingest.py        # Vector database construction
│   ├── rag.py           # RAG implementation
│   └── utils.py         # Utilities
├── ml_models/           # Trained ML models
├── notebooks/           # Jupyter notebooks for experimentation
├── data/                # Training data and exercise database
└── frontend/            # Frontend components (if applicable)
```

## Technology Stack

**Backend & APIs**

* FastAPI
* Flask (for RAG API)
* Pydantic

**Machine Learning**

* Scikit-learn
* Pandas, NumPy
* Joblib

**AI & NLP**

* Google Generative AI
* Vector embeddings
* RAG architecture

**Data & Visualization**

* Matplotlib, Seaborn
* Supabase
* CSV-based datasets

## Quick Start

### Prerequisites

* Python 3.13+
* Virtual environment recommended
* Google Generative AI API key (optional, for RAG features)

### Installation

```bash
git clone https://github.com/randomPlayerHere/sweat-notes-streamlit.git
cd sweatNotes
python -m venv env
source env/bin/activate  # On Windows: env\Scripts\activate
pip install -r backend/requirements.txt
```

Set up environment variables in a `.env` file:

```
GOOGLE_API_KEY=your_google_api_key
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
```

### Running the Application

Start the FastAPI backend:

```bash
cd backend
uvicorn app.main:app --reload --port 8000
```

Start the RAG API (in another terminal):

```bash
cd rag
python api.py
```

Services:

* FastAPI docs: `http://localhost:8000/docs`
* RAG API: `http://localhost:5000`

## API Endpoints

**Calorie Prediction** – `POST /predict/`
Predicts calories burned based on user/workout input.

**Workout Generation** – `POST /generate`
Generates a workout plan using RAG and Google Generative AI.

## Machine Learning Pipeline

The calorie prediction model is based on a Random Forest Regressor, with feature engineering (BMR calculation, workout intensity), preprocessing (categorical encodings), and optimization (grid search with cross-validation). Models are serialized with Joblib for deployment.

## RAG System

The RAG system provides personalized workout recommendations by combining:

* A vector database of exercises (embeddings)
* Semantic search (cosine similarity)
* Google Generative AI for context-aware plan generation

## Data Sources

* Exercise database (\~500 exercises with metadata)
* Training data (synthetic and real-world)
* User profile data (demographics and fitness characteristics)

## Experimentation

Jupyter notebooks in `/notebooks/` include:

* `calorie_predictor.ipynb`: ML pipeline
* `eda_workout.ipynb`: Workout dataset exploration
* `eda.ipynb`: General data analysis

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE).

## Author

Developed by [randomPlayerHere](https://github.com/randomPlayerHere).
