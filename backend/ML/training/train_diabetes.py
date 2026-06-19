"""
train_diabetes.py
=================
PURPOSE : Train and save a diabetes prediction model.
RUN     : python train_diabetes.py  (from backend/ml/ directory)
OUTPUT  : models/diabetes_model.pkl, models/scaler_diabetes.pkl
"""

import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import joblib
import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report

# Import our custom modules
from preprocessing.preprocess import load_and_clean, preprocess_features, split_data
from training.evaluate import full_evaluation


# ─────────────────────────────────────────────────────────────
# CONFIGURATION
# ─────────────────────────────────────────────────────────────
DATASET_PATH  = "ml/datasets/diabetes.csv"
TARGET_COL    = "outcome"
SCALER_PATH   = "ml/models/scaler_diabetes.pkl"
MODEL_PATH    = "ml/models/diabetes_model.pkl"


def train():
    print("=" * 60)
    print("   DIABETES MODEL TRAINING")
    print("=" * 60)

    # ── STEP 1: Load and clean data ──────────────────────────
    df = load_and_clean(DATASET_PATH)

    # ── STEP 2: Preprocess (scale features, separate target) ─
    X, y, scaler, features = preprocess_features(
        df,
        target_col=TARGET_COL,
        scaler_path=SCALER_PATH,
        fit_scaler=True      # Train mode: fit + save the scaler
    )

    # ── STEP 3: Split into train/test ─────────────────────────
    X_train, X_test, y_train, y_test = split_data(X, y)

    # ── STEP 4: Define candidate models ──────────────────────
    # We try 2 models and pick the best one.
    models = {
        "Logistic Regression": LogisticRegression(
            max_iter=1000,
            random_state=42
        ),
        "Random Forest": RandomForestClassifier(
            n_estimators=100,   # 100 decision trees vote together
            max_depth=10,       # Limit depth to prevent overfitting
            random_state=42
        )
    }

    # ── STEP 5: Train each model and collect results ──────────
    results = {}
    trained_models = {}

    for name, model in models.items():
        print(f"\n>>> Training: {name}")
        model.fit(X_train, y_train)       # THE LEARNING HAPPENS HERE
        y_pred = model.predict(X_test)    # Predict on unseen test data
        acc = accuracy_score(y_test, y_pred)
        results[name] = acc
        trained_models[name] = model
        print(f"    Accuracy: {acc:.4f}")
        print(classification_report(y_test, y_pred, target_names=["No Diabetes", "Diabetes"]))

    # ── STEP 6: Select the best model ─────────────────────────
    # "max" finds the key whose value (accuracy) is highest
    best_name = max(results, key=results.get)
    best_model = trained_models[best_name]
    print(f"\n🏆 Best Model: {best_name} with Accuracy = {results[best_name]:.4f}")

    # ── STEP 7: Full evaluation of best model ─────────────────
    full_evaluation(best_model, X_test, y_test,
                    class_names=["No Diabetes", "Diabetes"],
                    title="Diabetes Model")

    # ── STEP 8: Save the best model ───────────────────────────
    os.makedirs("ml/models", exist_ok=True)
    joblib.dump(best_model, MODEL_PATH)
    print(f"\n✅ Model saved → {MODEL_PATH}")
    print(f"✅ Scaler saved → {SCALER_PATH}")

    # ── STEP 9: Save feature names (needed during inference) ──
    import json
    with open("ml/models/diabetes_features.json", "w") as f:
        json.dump(features, f)
    print(f"✅ Features saved → ml/models/diabetes_features.json")


if __name__ == "__main__":
    train()