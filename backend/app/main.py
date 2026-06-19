from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Import routes
from app.routes import prediction, chatbot, report, health

# Create FastAPI app
app = FastAPI(
    title="AI Health Assistant API",
    description="Backend for health prediction, chatbot, and recommendations",
    version="1.0.0"
)

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(prediction.router, prefix="/api")
app.include_router(chatbot.router, prefix="/api")
app.include_router(report.router, prefix="/api")
app.include_router(health.router, prefix="/api")

# Root route
@app.get("/")
def root():
    return {
        "message": "AI Health Assistant API is running 🚀"
    }           