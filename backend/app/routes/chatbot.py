from fastapi import APIRouter
from app.services.chatbot_service import get_chatbot_response

router = APIRouter()

@router.post("/chat")
def chat(request: dict):
    question = request.get("question")
    user_data = request.get("user_data", {})

    response = get_chatbot_response(question, user_data)

    return {
        "question": question,
        "response": response
    }


