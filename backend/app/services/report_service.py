from datetime import datetime

def generate_report(prediction_result: dict):
    return {
        "report": {
            "result": prediction_result,
            "generated_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "advice": "Consult a healthcare professional for confirmation."
        }
    }