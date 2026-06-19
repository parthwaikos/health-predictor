# backend/app/services/prediction_service.py

import sys
import os

# This line tells Python where to find the ML folder
# Adjust path if your folder structure is different
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..')))

from ML.utils.model_loader import predict as ml_predict


def predict_disease(data):
    """
    PURPOSE:
    --------
    This is the BRIDGE between your FastAPI route and the real ML model.
    
    FLOW:
    -----
    prediction.py (route)
          ↓  calls predict_disease(data)
    prediction_service.py   ← YOU ARE HERE
          ↓  calls ml_predict(disease_type, data_dict)
    ML/utils/model_loader.py
          ↓  loads .pkl model, scales input, runs predict()
    Returns structured result dict
    
    PARAMETERS:
    -----------
    data : SymptomRequest object (Pydantic model from symptom_schema.py)
    
    RETURNS:
    --------
    dict with: prediction, label, confidence, probability,
               risk_level, recommendations
    """

    # Step 1: Convert Pydantic object → plain Python dictionary
    # .dict() turns SymptomRequest into {"age": 45, "glucose": 148, ...}
    data_dict = data.dict()

    # Step 2: Extract which disease to predict
    # Frontend will send: {"disease_type": "diabetes", "age": 45, ...}
    disease_type = data_dict.get("disease_type", "diabetes").lower().strip()

    # Step 3: Validate disease type before calling model
    supported = ["diabetes", "heart"]
    if disease_type not in supported:
        return {
            "error": True,
            "message": f"Unsupported disease type: '{disease_type}'. Choose from: {supported}",
            "prediction": None,
            "risk_level": "Unknown"
        }

    # Step 4: Remove None values — model_loader only needs relevant fields
    # For example, heart model doesn't need 'glucose', so we drop None fields
    clean_data = {k: v for k, v in data_dict.items() if v is not None}

    # Step 5: Call the actual ML model
    try:
        result = ml_predict(disease_type, clean_data)
        return result

    except FileNotFoundError as e:
        # Model .pkl file not found — training hasn't been run yet
        return {
            "error": True,
            "message": f"Model not trained yet. Run train_{disease_type}.py first. Details: {str(e)}",
            "prediction": None,
            "risk_level": "Unknown"
        }

    except ValueError as e:
        # Wrong input features sent
        return {
            "error": True,
            "message": f"Invalid input data: {str(e)}",
            "prediction": None,
            "risk_level": "Unknown"
        }

    except Exception as e:
        # Catch-all for unexpected errors
        return {
            "error": True,
            "message": f"Prediction failed: {str(e)}",
            "prediction": None,
            "risk_level": "Unknown"
        }