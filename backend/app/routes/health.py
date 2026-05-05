from fastapi import APIRouter

# Create router object
router = APIRouter()

# Health check endpoint
@router.get("/health")
def check_health():
    return {
        "status": "OK",
        "message": "Server is running successfully"
    }