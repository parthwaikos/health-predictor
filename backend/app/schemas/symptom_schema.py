# backend/app/schemas/symptom_schema.py

from pydantic import BaseModel, Field
from typing import Optional

class SymptomRequest(BaseModel):
    """
    Unified request schema for all disease predictions.
    
    WHY Optional?
    - Diabetes needs: glucose, insulin, bmi, etc.
    - Heart needs:    chol, trestbps, thalach, etc.
    - They don't share all fields, so non-relevant fields are Optional.
    - The ML model_loader will only pick the fields IT needs.
    """

    # ── REQUIRED: tells backend which model to use ──────────
    disease_type: str = Field(
        ...,
        description="Which model to use: 'diabetes' or 'heart'"
    )

    # ── COMMON fields (used by both models) ─────────────────
    age: float = Field(..., gt=0, description="Age in years")

    # ── DIABETES-specific fields ─────────────────────────────
    bmi:                           Optional[float] = Field(None, gt=0)
    glucose:                       Optional[float] = Field(None, ge=0)
    blood_pressure:                Optional[float] = Field(None, ge=0)
    insulin:                       Optional[float] = Field(None, ge=0)
    skin_thickness:                Optional[float] = Field(None, ge=0)
    diabetes_pedigree_function:    Optional[float] = Field(None, ge=0)

    # ── HEART-specific fields ────────────────────────────────
    sex:        Optional[int]   = None   # 0=Female, 1=Male
    cp:         Optional[int]   = None   # Chest pain type 0-3
    trestbps:   Optional[float] = None   # Resting blood pressure
    chol:       Optional[float] = None   # Serum cholesterol mg/dL
    fbs:        Optional[int]   = None   # Fasting blood sugar >120 (1=True)
    restecg:    Optional[int]   = None   # Resting ECG result
    thalach:    Optional[float] = None   # Max heart rate achieved
    exang:      Optional[int]   = None   # Exercise induced angina
    oldpeak:    Optional[float] = None   # ST depression
    slope:      Optional[int]   = None   # Slope of peak exercise ST
    ca:         Optional[int]   = None   # Major vessels (0-3)
    thal:       Optional[int]   = None   # Thalassemia type