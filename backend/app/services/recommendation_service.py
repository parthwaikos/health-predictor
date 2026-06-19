def generate_recommendations(prediction):

    disease = prediction["disease"]

    recommendations = []

    if disease == "Viral Fever":

        recommendations = [
            "Drink plenty of water",
            "Take proper rest",
            "Monitor body temperature"
        ]

    else:

        recommendations = [
            "Maintain a healthy lifestyle"
        ]

    return recommendations