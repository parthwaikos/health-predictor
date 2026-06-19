from fastapi import APIRouter

router = APIRouter()

@router.get("/report")
def report_status():

    return {
        "success": True,
        "message": "Report service active"
    }