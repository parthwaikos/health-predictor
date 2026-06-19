from fastapi import APIRouter

router = APIRouter()

@router.get("/chatbot")
def chatbot_status():

    return {
        "success": True,
        "message": "Chatbot service active"
    }