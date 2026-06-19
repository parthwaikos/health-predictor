import pickle
from app.config import settings

def load_model():

    try:

        with open(settings.MODEL_PATH, "rb") as f:
            return pickle.load(f)

    except Exception:

        return None

# Load model once during startup
model = load_model()