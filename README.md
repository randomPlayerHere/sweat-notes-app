# 🏋️ SweatNotes - AI-Powered Fitness Platform

<div align="center">
  <img src="https://img.shields.io/badge/Python-3.13-blue.svg" alt="Python">
  <img src="https://img.shields.io/badge/FastAPI-0.116.1-green.svg" alt="FastAPI">
  <img src="https://img.shields.io/badge/Scikit--learn-1.7.1-orange.svg" alt="Scikit-learn">
  <img src="https://img.shields.io/badge/Google-Generative_AI-yellow.svg" alt="Google AI">
  <img src="https://img.shields.io/badge/License-MIT-red.svg" alt="License">
</div>

## 📖 Overview

SweatNotes is an intelligent fitness platform that combines machine learning and AI to provide personalized workout recommendations and calorie burn predictions. The platform leverages advanced ML models, RAG (Retrieval-Augmented Generation) architecture, and Google's Generative AI to deliver tailored fitness solutions.

## ✨ Key Features

- **🔥 Calorie Burn Prediction**: ML-powered calorie estimation based on user profile and workout characteristics
- **🤖 AI Workout Planner**: RAG-based system generating personalized workout plans using a comprehensive exercise database
- **📊 Data-Driven Insights**: Advanced analytics and visualization for fitness tracking
- **🚀 RESTful API**: FastAPI backend for seamless integration and scalability
- **📈 ML Pipeline**: Complete machine learning workflow from data preprocessing to model deployment

## 🏗️ Architecture

```
SweatNotes/
├── 📁 backend/           # FastAPI backend services
│   ├── app/
│   │   ├── main.py       # FastAPI application entry point
│   │   ├── models/       # Pydantic schemas and data models
│   │   ├── services/     # Business logic and ML predictions
│   │   └── utils/        # Utility functions and preprocessing
│   └── requirements.txt  # Python dependencies
├── 📁 rag/               # RAG system for workout recommendations
│   ├── api.py           # Flask API for workout generation
│   ├── ingest.py        # Vector database construction
│   ├── rag.py           # RAG implementation
│   └── utils.py         # RAG utilities
├── 📁 ml_models/         # Trained machine learning models
├── 📁 notebooks/         # Jupyter notebooks for ML experimentation
├── 📁 data/             # Training data and exercise database
└── 📁 frontend/         # Frontend components (if applicable)
```

## 🛠️ Technology Stack

### Backend & APIs
- **FastAPI**: High-performance web framework for building APIs
- **Flask**: Lightweight framework for RAG API services
- **Pydantic**: Data validation and serialization

### Machine Learning
- **Scikit-learn**: ML algorithms and model training
- **Pandas & NumPy**: Data manipulation and numerical computing
- **Joblib**: Model serialization and persistence

### AI & NLP
- **Google Generative AI**: Advanced language model integration
- **Vector Embeddings**: Semantic search and similarity matching
- **RAG Architecture**: Retrieval-Augmented Generation for context-aware responses

### Data & Visualization
- **Matplotlib & Seaborn**: Statistical visualization
- **Supabase**: Database and backend services
- **CSV Processing**: Exercise database management

## 🚀 Quick Start

### Prerequisites
- Python 3.13+
- Virtual environment (recommended)
- API keys for Google Generative AI (optional, for RAG features)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/randomPlayerHere/sweat-notes-streamlit.git
   cd sweatNotes
   ```

2. **Set up virtual environment**
   ```bash
   python -m venv env
   source env/bin/activate  # On Windows: env\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r backend/requirements.txt
   ```

4. **Environment setup**
   ```bash
   # Create .env file with your API keys
   echo "GOOGLE_API_KEY=your_google_api_key_here" > .env
   echo "SUPABASE_URL=your_supabase_url" >> .env
   echo "SUPABASE_KEY=your_supabase_key" >> .env
   ```

### Running the Application

1. **Start the FastAPI backend**
   ```bash
   cd backend
   uvicorn app.main:app --reload --port 8000
   ```

2. **Start the RAG API (separate terminal)**
   ```bash
   cd rag
   python api.py
   ```

3. **Access the services**
   - FastAPI Documentation: `http://localhost:8000/docs`
   - RAG API: `http://localhost:5000`

## 📡 API Endpoints

### Calorie Prediction API

#### `POST /predict/`
Predict calories burned based on user and workout data.

**Request Body:**
```json
{
  "user_id": "user123",
  "age": 25,
  "gender": "Male",
  "weight": 70,
  "height": 1.75,
  "workout_type": "Running",
  "fat_percentage": 15.0,
  "experience_level": 3,
  "bmi": 22.9,
  "intensity_level": 4,
  "session_duration": 1.5
}
```

**Response:**
```json
{
  "user_id": "user123",
  "predicted_calories": 487.2
}
```

### Workout Generation API

#### `POST /generate`
Generate personalized workout plans using RAG.

**Request Body:**
```json
{
  "query": "I want a beginner chest and triceps workout using dumbbells"
}
```

**Response:**
```json
{
  "plan": "Here's your personalized workout plan with exercise descriptions..."
}
```

## 🧠 Machine Learning Pipeline

### Calorie Prediction Model

The calorie prediction system uses a **Random Forest Regressor** with advanced feature engineering:

- **Feature Engineering**: BMR calculation, workout intensity metrics, duration-based features
- **Preprocessing**: One-hot encoding for categorical variables, ordinal encoding for experience levels
- **Model Performance**: Optimized through grid search with cross-validation

### Training Process

1. **Data Preprocessing**: Clean and transform raw fitness data
2. **Feature Engineering**: Create derived features (BMR, intensity scores)
3. **Model Training**: Random Forest with hyperparameter optimization
4. **Validation**: Cross-validation and test set evaluation
5. **Deployment**: Model serialization using joblib

## 🤖 RAG System

The Retrieval-Augmented Generation system provides intelligent workout recommendations:

- **Vector Database**: Exercise embeddings using Google's text-embedding-004
- **Semantic Search**: Cosine similarity for exercise matching
- **Context-Aware Generation**: Google Generative AI with retrieved context
- **Exercise Database**: 500+ exercises with detailed metadata

## 📊 Data Sources

- **Exercise Database**: Comprehensive collection of 500+ exercises with muscle groups, equipment, and difficulty levels
- **Training Data**: Synthetic and real-world fitness data for model training
- **User Profiles**: Demographic and fitness characteristic data

## 🔬 Experimentation & Development

Explore the Jupyter notebooks in the `notebooks/` directory:

- `calorie_predictor.ipynb`: Complete ML pipeline development
- `eda_workout.ipynb`: Exploratory data analysis for workout data
- `eda.ipynb`: General data exploration and visualization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **randomPlayerHere** - *Initial work* - [GitHub Profile](https://github.com/randomPlayerHere)

## 🙏 Acknowledgments

- Google Generative AI for powerful language model capabilities
- Scikit-learn community for excellent ML tools
- FastAPI team for the high-performance web framework
- Open-source fitness data contributors

## 📞 Support

For support, questions, or feature requests, please open an issue on GitHub or contact the maintainers.

---

<div align="center">
  <strong>Built with ❤️ for the fitness community</strong>
</div>
