"""
train_heart.py
==============
PURPOSE : Train and save a heart disease prediction model.
RUN     : python train_heart.py  (from backend/ml/ directory)
OUTPUT  : models/heart_model.pkl, models/scaler_heart.pkl
"""

import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import joblib
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
from preprocessing.preprocess import load_and_clean, preprocess_features, split_data
from training.evaluate import full_evaluation
import json

DATASET_PATH  = "ml/datasets/heart.csv"
TARGET_COL    = "target"
SCALER_PATH   = "ml/models/scaler_heart.pkl"
MODEL_PATH    = "ml/models/heart_model.pkl"


def train():
    print("=" * 60)
    print("   HEART DISEASE MODEL TRAINING")
    print("=" * 60)

    df = load_and_clean(DATASET_PATH)

    X, y, scaler, features = preprocess_features(
        df,
        target_col=TARGET_COL,
        scaler_path=SCALER_PATH,
        fit_scaler=True
    )

    X_train, X_test, y_train, y_test = split_data(X, y)

    models = {
        "Logistic Regression": LogisticRegression(max_iter=1000, random_state=42),
        "Random Forest": RandomForestClassifier(
            n_estimators=150,
            max_depth=12,
            min_samples_split=5,
            random_state=42
        )
    }

    results = {}
    trained_models = {}

    for name, model in models.items():
        print(f"\n>>> Training: {name}")
        model.fit(X_train, y_train)
        y_pred = model.predict(X_test)
        acc = accuracy_score(y_test, y_pred)
        results[name] = acc
        trained_models[name] = model
        print(f"    Accuracy: {acc:.4f}")
        print(classification_report(y_test, y_pred, target_names=["No Disease", "Heart Disease"]))

    best_name = max(results, key=results.get)
    best_model = trained_models[best_name]
    print(f"\n🏆 Best Model: {best_name} | Accuracy = {results[best_name]:.4f}")

    full_evaluation(best_model, X_test, y_test,
                    class_names=["No Disease", "Heart Disease"],
                    title="Heart Disease Model")

    os.makedirs("ml/models", exist_ok=True)
    joblib.dump(best_model, MODEL_PATH)

    with open("ml/models/heart_features.json", "w") as f:
        json.dump(features, f)

    print(f"\n✅ Model saved  → {MODEL_PATH}")
    print(f"✅ Scaler saved → {SCALER_PATH}")
    print(f"✅ Features     → ml/models/heart_features.json")


if __name__ == "__main__":
    train()