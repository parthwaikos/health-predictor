from app.utils.preprocess_input import preprocess_input

def predict_disease(data):
    """
    Main prediction function
    """

    # 🔹 Step 1: Preprocess input
    processed_data = preprocess_input(data)

    # 🔹 Step 2: Dummy ML prediction (replace later with real model)
    # Example probabilities for 2 diseases
    probs = [0.7, 0.3]  # Flu, Viral Fever

    # 🔹 Step 3: Format conditions
    conditions = [
        {"name": "Flu", "probability": probs[0]},
        {"name": "Viral Fever", "probability": probs[1]}
    ]

    # 🔹 Step 4: Calculate risk level
    max_prob = max(probs)

    if max_prob > 0.7:
        risk = "High"
    elif max_prob > 0.4:
        risk = "Medium"
    else:
        risk = "Low"

    # 🔹 Step 5: Generate advice
    if risk == "Low":
        advice = ["Take rest", "Stay hydrated"]
        alert = "No major concern"
    elif risk == "Medium":
        advice = ["Monitor symptoms", "Take basic care"]
        alert = "Consult doctor if symptoms persist"
    else:
        advice = ["Seek medical attention"]
        alert = "High risk detected! Visit a doctor immediately"

    # 🔹 Step 6: Final response
    return {
        "conditions": conditions,
        "risk_level": risk,
        "advice": advice,
        "alert": alert
    }