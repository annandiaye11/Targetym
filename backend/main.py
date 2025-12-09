"""
Main FastAPI application with authentication.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.auth import router as auth_router
from app.database import engine, Base
from app.models import User, UserSession

# Create database tables
Base.metadata.create_all(bind=engine)

# Create FastAPI app
app = FastAPI(
    title="Targetym AI Backend",
    description="HR Analytics Platform with Authentication",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include auth router
app.include_router(auth_router, prefix="/api/v1")

# Health check endpoint
@app.get("/")
async def root():
    """Health check endpoint."""
    return {"message": "Targetym AI Backend is running", "status": "healthy"}

@app.get("/api/v1/health")
async def health_check():
    """API health check."""
    return {"message": "API is healthy", "version": "1.0.0"}
