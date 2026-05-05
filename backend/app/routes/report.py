from fastapi import APIRouter

router = APIRouter()

@router.post("/generate-report")
def generate_report(data: dict):
    return {
        "message": "Report generated successfully",
        "report": data
    }