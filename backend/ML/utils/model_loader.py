"""
model_loader.py
===============
PURPOSE : Load trained models + scalers for FastAPI inference.
USED BY : FastAPI backend (routes/predict.py)
CONCEPT : joblib is like "freeze-drying" the trained model.
          We train once, save, and load quickly on every API call.
"""

import joblib
import json
import numpy as np
import os
from typing import Tuple


# ─────────────────────────────────────────────────────────────
# PATHS (adjust if your folder structure differs)
# ─────────────────────────────────────────────────────────────
BASE = os.path.dirname(os.path.abspath(__file__))
ML_ROOT = os.path.join(BASE, "..")

PATHS = {
    "diabetes": {
        "model":    os.path.join(ML_ROOT, "models", "diabetes_model.pkl"),
        "scaler":   os.path.join(ML_ROOT, "models", "scaler_diabetes.pkl"),
        "features": os.path.join(ML_ROOT, "models", "diabetes_features.json"),
    },
    "heart": {
        "model":    os.path.join(ML_ROOT, "models", "heart_model.pkl"),
        "scaler":   os.path.join(ML_ROOT, "models", "scaler_heart.pkl"),
        "features": os.path.join(ML_ROOT, "models", "heart_features.json"),
    }
}


def load_model_and_scaler(disease_type: str):
    """
    Load model, scaler, and feature list for a given disease type.

    Parameters:
    -----------
    disease_type : "diabetes" or "heart"

    Returns:
    --------
    model    : Trained sklearn model
    scaler   : Fitted StandardScaler
    features : List of expected input feature names
    """
    if disease_type not in PATHS:
        raise ValueError(f"Unknown disease type: '{disease_type}'. Choose: {list(PATHS.keys())}")

    p = PATHS[disease_type]

    # Validate all files exist before loading
    for key, path in p.items():
        if not os.path.exists(path):
            raise FileNotFoundError(
                f"[{disease_type}] Missing file: {path}\n"
                f"→ Did you run train_{disease_type}.py first?"
            )

    model    = joblib.load(p["model"])
    scaler   = joblib.load(p["scaler"])
    with open(p["features"], "r") as f:
        features = json.load(f)

    return model, scaler, features


def predict(disease_type: str, input_data: dict) -> dict:
    """
    Full inference pipeline for one patient.

    Parameters:
    -----------
    disease_type : "diabetes" or "heart"
    input_data   : dict with feature values, e.g.
                   {"age": 45, "bmi": 28.5, "glucose": 148, ...}

    Returns:
    --------
    {
        "prediction"      : 0 or 1,
        "label"           : "Diabetic" / "Not Diabetic",
        "confidence"      : 0.82,
        "probability_0"   : 0.18,
        "probability_1"   : 0.82,
        "risk_level"      : "High" / "Medium" / "Low",
        "recommendations" : ["..."]
    }
    """
    model, scaler, features = load_model_and_scaler(disease_type)

    # Build input row in correct feature order
    try:
        row = np.array([[input_data[f] for f in features]])
    except KeyError as e:
        raise ValueError(f"Missing feature in input: {e}. Expected: {features}")

    # Scale input (must use SAME scaler used during training)
    row_scaled = scaler.transform(row)

    # Predict class and probability
    prediction = int(model.predict(row_scaled)[0])
    proba      = model.predict_proba(row_scaled)[0]   # [P(class=0), P(class=1)]
    confidence = float(round(max(proba), 4))

    # Risk level based on probability of positive class
    prob_positive = float(round(proba[1], 4))
    if prob_positive >= 0.70:
        risk_level = "High"
    elif prob_positive >= 0.40:
        risk_level = "Medium"
    else:
        risk_level = "Low"

    # Labels
    labels = {
        "diabetes": {0: "No Diabetes", 1: "Diabetic"},
        "heart":    {0: "No Heart Disease", 1: "Heart Disease Risk Detected"}
    }
    label = labels.get(disease_type, {}).get(prediction, str(prediction))

    # Recommendations
    recommendations = get_recommendations(disease_type, prediction, prob_positive, input_data)

    return {
        "prediction":     prediction,
        "label":          label,
        "confidence":     confidence,
        "probability_0":  float(round(proba[0], 4)),
        "probability_1":  prob_positive,
        "risk_level":     risk_level,
        "recommendations": recommendations
    }


def get_recommendations(disease_type: str, prediction: int,
                         prob: float, data: dict) -> list:
    """Returns context-aware health recommendations."""
    recs = []

    if disease_type == "diabetes":
        if prediction == 1:
            recs.append("⚠️ High diabetes risk detected. Consult an endocrinologist immediately.")
            if data.get("glucose", 0) > 140:
                recs.append("🍬 Your glucose level is elevated. Reduce sugar and refined carbs.")
            if data.get("bmi", 0) > 30:
                recs.append("⚖️ Your BMI indicates obesity. Aim for 30 min exercise daily.")
        else:
            recs.append("✅ Low diabetes risk. Maintain a healthy lifestyle.")
            recs.append("🥗 Keep up a balanced diet and regular exercise.")

    elif disease_type == "heart":
        if prediction == 1:
            recs.append("⚠️ Heart disease risk detected. Consult a cardiologist promptly.")
            if data.get("chol", 0) > 240:
                recs.append("🫀 Cholesterol is high. Reduce saturated fats and consider medication.")
            if data.get("trestbps", 0) > 140:
                recs.append("🩸 Blood pressure is elevated. Monitor daily and reduce salt intake.")
        else:
            recs.append("✅ Low heart disease risk. Keep monitoring annually.")
            recs.append("🏃 Continue regular cardio exercise.")

    return recs