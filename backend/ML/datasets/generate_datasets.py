"""
generate_datasets.py
====================
PURPOSE : Generates 3 realistic synthetic healthcare CSV datasets.
RUN ONCE: python generate_datasets.py
OUTPUT  : diabetes.csv, heart.csv, mental_health.csv
"""

import numpy as np
import pandas as pd

# Fix random seed so results are reproducible every time you run this
np.random.seed(42)
N = 1000  # Number of patient records per dataset


# ─────────────────────────────────────────────────────────────
# DATASET 1: diabetes.csv
# Features based on PIMA Indians Diabetes Dataset (famous dataset)
# Target: 0 = No Diabetes, 1 = Diabetes
# ─────────────────────────────────────────────────────────────

def generate_diabetes(n=N):
    age         = np.random.randint(21, 80, n)
    bmi         = np.round(np.random.normal(28, 6, n).clip(15, 55), 1)
    glucose     = np.random.randint(70, 200, n)
    blood_pres  = np.random.randint(60, 120, n)
    insulin     = np.random.randint(0, 300, n)
    skin_thick  = np.random.randint(10, 50, n)
    dpf         = np.round(np.random.uniform(0.08, 2.5, n), 3)  # Diabetes Pedigree Function

    # Realistic label: higher glucose + BMI = more likely diabetic
    score = (
        (glucose > 140).astype(int) * 2 +
        (bmi > 30).astype(int) +
        (age > 45).astype(int)
    )
    outcome = (score + np.random.randint(0, 2, n) >= 2).astype(int)

    df = pd.DataFrame({
        'age': age, 'bmi': bmi, 'glucose': glucose,
        'blood_pressure': blood_pres, 'insulin': insulin,
        'skin_thickness': skin_thick,
        'diabetes_pedigree_function': dpf,
        'outcome': outcome   # TARGET COLUMN
    })
    return df


# ─────────────────────────────────────────────────────────────
# DATASET 2: heart.csv
# Based on Cleveland Heart Disease Dataset
# Target: 0 = No Disease, 1 = Heart Disease
# ─────────────────────────────────────────────────────────────

def generate_heart(n=N):
    age         = np.random.randint(29, 77, n)
    sex         = np.random.randint(0, 2, n)          # 0=Female, 1=Male
    cp          = np.random.randint(0, 4, n)          # Chest Pain Type (0–3)
    trestbps    = np.random.randint(90, 200, n)       # Resting Blood Pressure
    chol        = np.random.randint(150, 400, n)      # Serum Cholesterol
    fbs         = (np.random.rand(n) > 0.85).astype(int)  # Fasting Blood Sugar > 120
    restecg     = np.random.randint(0, 3, n)          # Resting ECG
    thalach     = np.random.randint(70, 210, n)       # Max Heart Rate
    exang       = np.random.randint(0, 2, n)          # Exercise Induced Angina
    oldpeak     = np.round(np.random.uniform(0, 6.2, n), 1)
    slope       = np.random.randint(0, 3, n)
    ca          = np.random.randint(0, 4, n)          # Major vessels colored by fluoroscopy
    thal        = np.random.randint(0, 3, n)          # Thalassemia

    score = (
        (chol > 240).astype(int) +
        (trestbps > 140).astype(int) +
        (age > 55).astype(int) +
        (thalach < 140).astype(int)
    )
    target = (score + np.random.randint(0, 2, n) >= 2).astype(int)

    df = pd.DataFrame({
        'age': age, 'sex': sex, 'cp': cp,
        'trestbps': trestbps, 'chol': chol, 'fbs': fbs,
        'restecg': restecg, 'thalach': thalach, 'exang': exang,
        'oldpeak': oldpeak, 'slope': slope, 'ca': ca,
        'thal': thal,
        'target': target   # TARGET COLUMN
    })
    return df


# ─────────────────────────────────────────────────────────────
# DATASET 3: mental_health.csv
# Mental health risk based on lifestyle factors
# Target: 0 = Low Risk, 1 = High Risk
# ─────────────────────────────────────────────────────────────

def generate_mental_health(n=N):
    age           = np.random.randint(18, 65, n)
    stress_level  = np.random.randint(1, 11, n)      # Scale 1–10
    sleep_hours   = np.round(np.random.normal(6.5, 1.5, n).clip(3, 12), 1)
    mood_score    = np.random.randint(1, 11, n)       # Scale 1–10
    anxiety_score = np.random.randint(1, 11, n)       # Scale 1–10
    exercise_freq = np.random.randint(0, 8, n)        # Days/week
    social_score  = np.random.randint(1, 11, n)       # Social interaction 1–10
    screen_time   = np.random.randint(1, 14, n)       # Hours/day
    work_hours    = np.random.randint(20, 80, n)      # Hours/week

    score = (
        (stress_level > 7).astype(int) * 2 +
        (sleep_hours < 6).astype(int) +
        (anxiety_score > 7).astype(int) * 2 +
        (mood_score < 4).astype(int)
    )
    risk = (score + np.random.randint(0, 2, n) >= 3).astype(int)

    df = pd.DataFrame({
        'age': age, 'stress_level': stress_level,
        'sleep_hours': sleep_hours, 'mood_score': mood_score,
        'anxiety_score': anxiety_score, 'exercise_frequency': exercise_freq,
        'social_interaction_score': social_score,
        'screen_time_hours': screen_time, 'work_hours_per_week': work_hours,
        'mental_health_risk': risk   # TARGET COLUMN
    })
    return df


# ─────────────────────────────────────────────────────────────
# RUN AND SAVE
# ─────────────────────────────────────────────────────────────

if __name__ == "__main__":
    df_diabetes = generate_diabetes()
    df_heart    = generate_heart()
    df_mental   = generate_mental_health()

    df_diabetes.to_csv("diabetes.csv",      index=False)
    df_heart.to_csv("heart.csv",            index=False)
    df_mental.to_csv("mental_health.csv",   index=False)

    print("✅ Datasets generated!")
    print(f"   diabetes.csv      → {len(df_diabetes)} rows, columns: {list(df_diabetes.columns)}")
    print(f"   heart.csv         → {len(df_heart)} rows, columns: {list(df_heart.columns)}")
    print(f"   mental_health.csv → {len(df_mental)} rows, columns: {list(df_mental.columns)}")