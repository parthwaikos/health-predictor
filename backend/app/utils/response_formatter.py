def format_response(prediction, recommendations):

    return {
        "success": True,
        "prediction": prediction,
        "recommendations": recommendations
    }