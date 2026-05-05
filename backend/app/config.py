import os

class Settings:
    """
    Application configuration settings
    """

    # 🔹 App Info
    APP_NAME: str = "AI Health Predictor"
    VERSION: str = "1.0.0"

    # 🔹 Server Config
    HOST: str = "127.0.0.1"
    PORT: int = 8000
    DEBUG: bool = True

    # 🔹 CORS (Frontend URL)
    ALLOWED_ORIGINS = [
        "http://localhost:3000",  # React frontend
    ]

    # 🔹 Model Path
    MODEL_PATH: str = os.path.join("models", "model.pkl")

    # 🔹 Database (for future use)
    DATABASE_URL: str = "sqlite:///../database/db.sqlite3"


# Create a single settings object
settings = Settings()