def get_chatbot_response(question: str, user_data: dict):
    question = question.lower()

    # Blood Pressure Advice
    if "bp" in question or "blood pressure" in question:
        return "To control blood pressure, reduce salt intake, exercise regularly, and avoid stress."

    # Diabetes Advice
    if "diabetes" in question:
        return "To control diabetes, avoid sugar, maintain a healthy diet, and exercise daily."

    # Personalized Advice
    if "what should i do" in question or "advice" in question:
        if user_data.get("bp_risk") == "High":
            return "Your BP is high. Please reduce salt intake and consult a doctor."
        
        if user_data.get("diabetes_risk") == "High":
            return "Your diabetes risk is high. Avoid sugary foods and maintain a proper diet."

        return "Maintain a healthy lifestyle with balanced diet and exercise."

    return "I can help with health-related questions. Please ask about BP, diabetes, or your health risk."