from fastapi import APIRouter
from app.services.prediction_service import predict_disease
from app.services.recommendation_service import generate_recommendations
from app.utils.response_formatter import format_response

router = APIRouter()

@router.post("/predict")
def get_prediction(data: dict):
    prediction = predict_disease(data)
    recommendations = generate_recommendations(prediction)

    return format_response(prediction, recommendations)