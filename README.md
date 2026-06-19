# ASEP 2 – AI Health Predictor

An AI-powered healthcare prediction system that combines machine learning, backend APIs, and modern frontend technologies to provide early health risk predictions and actionable recommendations.

---

# 📌 Project Overview

ASEP 2 – AI Health Predictor is a full-stack healthcare application designed to:

- Collect user health metrics
- Process and validate health data
- Predict disease risks using machine learning
- Display risk analysis and recommendations visually

The system integrates:

- Frontend UI
- Backend API
- Machine Learning models
- Data storage layer

---

# 🚀 Features

## Physical Health Prediction
- BMI analysis
- Blood pressure analysis
- Glucose risk prediction
- Diabetes risk estimation

## Mental Health Prediction
- Stress level analysis
- Mood tracking
- Sleep quality analysis

## Dashboard
- Health score visualization
- Risk charts
- Recommendations
- Prediction history

---

# 🧰 Tech Stack

## Frontend
- React.js
- Tailwind CSS
- Chart.js

## Backend
- Python
- FastAPI
- Flask-CORS
- Gunicorn

## Machine Learning
- Scikit-learn
- Pandas
- NumPy
- Pickle

## Database / Storage
- SQLite
- CSV
- MongoDB (optional)

## Development Tools
- VS Code
- GitHub

---

# 🏗️ System Architecture

Frontend (React)
↓
Backend API (FastAPI)
↓
Machine Learning Models (Scikit-learn)
↓
Database / Storage Layer

---

# 🔄 Workflow

1. User opens web application
2. User selects health module
3. User enters health data
4. Frontend sends API request
5. Backend validates data
6. Backend forwards data to ML model
7. ML model predicts health risk
8. Backend formats response
9. Frontend displays results and charts

---

# 📁 Recommended Folder Structure

```txt
health-predictor/
│
├── frontend/
├── backend/
├── ml-models/
├── docs/
├── README.md
└── .gitignore