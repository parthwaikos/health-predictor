from pydantic_settings import BaseSettings

class Settings(BaseSettings):

    MODEL_PATH: str = "app/ml/model.pkl"

    class Config:
        env_file = ".env"

settings = Settings()