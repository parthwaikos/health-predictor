"""
preprocess.py
=============
PURPOSE  : Reusable preprocessing pipeline for all 3 datasets.
USED BY  : train_diabetes.py, train_heart.py, model_loader.py
CONCEPT  : StandardScaler transforms features so mean=0, std=1.
           This prevents large-valued features from dominating the model.
"""

import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
import joblib
import os


# ─────────────────────────────────────────────────────────────
# FUNCTION 1: load_and_clean
# Handles the most common data quality issues
# ─────────────────────────────────────────────────────────────

def load_and_clean(filepath: str) -> pd.DataFrame:
    """
    Load CSV and perform basic cleaning.
    
    Steps:
    1. Load CSV into DataFrame
    2. Drop fully duplicate rows
    3. Fill missing numerical values with column median
       (Median is preferred over mean in healthcare — resistant to outliers)
    4. Fill missing categorical values with mode (most frequent value)
    """
    df = pd.read_csv(filepath)
    print(f"[INFO] Loaded {filepath} → Shape: {df.shape}")

    # Drop duplicate rows
    before = len(df)
    df = df.drop_duplicates()
    print(f"[INFO] Removed {before - len(df)} duplicate rows")

    # Fill missing values
    for col in df.columns:
        if df[col].isnull().sum() > 0:
            if df[col].dtype in ['float64', 'int64']:
                df[col].fillna(df[col].median(), inplace=True)
                print(f"[INFO] Filled missing in '{col}' with median={df[col].median():.2f}")
            else:
                df[col].fillna(df[col].mode()[0], inplace=True)
                print(f"[INFO] Filled missing in '{col}' with mode={df[col].mode()[0]}")

    return df


# ─────────────────────────────────────────────────────────────
# FUNCTION 2: preprocess_features
# Separates features (X) from target (y), then scales X
# ─────────────────────────────────────────────────────────────

def preprocess_features(df: pd.DataFrame,
                         target_col: str,
                         scaler_path: str = None,
                         fit_scaler: bool = True):
    """
    Parameters:
    -----------
    df          : Cleaned DataFrame
    target_col  : Name of the label/output column (e.g., 'outcome')
    scaler_path : Where to save/load the scaler .pkl file
    fit_scaler  : True during training, False during inference

    Returns:
    --------
    X_scaled : Scaled feature matrix (numpy array)
    y        : Target labels (numpy array)
    scaler   : Fitted StandardScaler object
    features : List of feature column names
    """

    # Separate features and target
    X = df.drop(columns=[target_col])
    y = df[target_col].values
    features = list(X.columns)

    print(f"[INFO] Features: {features}")
    print(f"[INFO] Target  : {target_col}")
    print(f"[INFO] Class distribution:\n{pd.Series(y).value_counts()}")

    # Scale features using StandardScaler
    # Formula: z = (x - mean) / std
    # Result: each feature has mean≈0, std≈1
    if fit_scaler:
        scaler = StandardScaler()
        X_scaled = scaler.fit_transform(X)         # Learns mean & std, then transforms
        if scaler_path:
            os.makedirs(os.path.dirname(scaler_path), exist_ok=True)
            joblib.dump(scaler, scaler_path)
            print(f"[INFO] Scaler saved → {scaler_path}")
    else:
        # During inference: load saved scaler, don't re-fit
        if scaler_path and os.path.exists(scaler_path):
            scaler = joblib.load(scaler_path)
            X_scaled = scaler.transform(X)         # Only transforms, does NOT re-learn
            print(f"[INFO] Scaler loaded from {scaler_path}")
        else:
            raise FileNotFoundError(f"Scaler not found at {scaler_path}")

    return X_scaled, y, scaler, features


# ─────────────────────────────────────────────────────────────
# FUNCTION 3: split_data
# Splits into Train set and Test set
# ─────────────────────────────────────────────────────────────

def split_data(X, y, test_size=0.2, random_state=42):
    """
    WHY SPLIT?
    ----------
    If we train and test on the SAME data, the model memorizes answers
    (like a student who cheats by studying the exam paper).
    We need unseen test data to check true performance.

    80% data → Training  (model learns patterns)
    20% data → Testing   (we evaluate how well it learned)
    
    stratify=y ensures both splits have similar class distribution.
    """
    X_train, X_test, y_train, y_test = train_test_split(
        X, y,
        test_size=test_size,
        random_state=random_state,
        stratify=y           # Important for imbalanced datasets!
    )
    print(f"[INFO] Train size: {len(X_train)} | Test size: {len(X_test)}")
    return X_train, X_test, y_train, y_test


# ─────────────────────────────────────────────────────────────
# FUNCTION 4: preprocess_single_input
# Used during API inference — preprocess one patient's data
# ─────────────────────────────────────────────────────────────

def preprocess_single_input(input_dict: dict,
                             feature_order: list,
                             scaler_path: str) -> np.ndarray:
    """
    Takes a single patient's data as a dictionary,
    orders it correctly, scales it, and returns a numpy array
    ready to be passed into model.predict()

    Example input_dict:
    {
        "age": 45, "bmi": 29.5, "glucose": 148, ...
    }
    """
    # Build a single-row DataFrame in the correct column order
    row = pd.DataFrame([[input_dict[f] for f in feature_order]], columns=feature_order)

    scaler = joblib.load(scaler_path)
    row_scaled = scaler.transform(row)

    return row_scaled