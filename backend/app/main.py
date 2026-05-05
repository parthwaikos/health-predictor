from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Import your routes
from app.routes import prediction , chatbot, report

# Create FastAPI app
app = FastAPI(
    title="AI Health Assistant API",
    description="Backend for health prediction, chatbot, and recommendations",
    version="1.0.0"
)

# Enable CORS (needed for frontend connection)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # allow all (change later for security)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include all routes
app.include_router(prediction.router, prefix="/api")
app.include_router(chatbot.router, prefix="/api")
app.include_router(report.router, prefix="/api")

# Root endpoint (test if server is running)
@app.get("/")
def root():
    return {
        "message": "AI Health Assistant API is running 🚀"
    }