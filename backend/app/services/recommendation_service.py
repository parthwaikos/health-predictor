def generate_recommendations(prediction: dict):
    recommendations = []

    if prediction.get("bp_risk") == "High":
        recommendations.append("Reduce salt intake")
        recommendations.append("Exercise daily")
        recommendations.append("Monitor blood pressure regularly")

    if prediction.get("diabetes_risk") == "High":
        recommendations.append("Avoid sugar and processed food")
        recommendations.append("Maintain a balanced diet")
        recommendations.append("Exercise regularly")

    if not recommendations:
        recommendations.append("Maintain a healthy lifestyle")

    return recommendations