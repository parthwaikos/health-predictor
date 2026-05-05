from pydantic import BaseModel, Field

class SymptomRequest(BaseModel):
    fever: int = Field(..., ge=0, le=1, description="0 = No, 1 = Yes")
    headache: int = Field(..., ge=0, le=1, description="0 = No, 1 = Yes")
    fatigue: int = Field(..., ge=0, le=1, description="0 = No, 1 = Yes")

    # Optional fields (for future use)
    age: int | None = Field(default=None, ge=0, le=120)
    gender: str | None = Field(default=None, example="male")

    class Config:
        schema_extra = {
            "example": {
                "fever": 1,
                "headache": 1,
                "fatigue": 0,
                "age": 25,
                "gender": "male"
            }
        }