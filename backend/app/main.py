"""
Main FastAPI application for Targetym AI Backend.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware

from app.api.api_v1.api import api_router
from app.core.config import settings


def create_application() -> FastAPI:
    """Create and configure the FastAPI application."""
    
    app = FastAPI(
        title=settings.PROJECT_NAME,
        description="HR Analytics Platform powered by AI",
        version="1.0.0",
        openapi_url=f"{settings.API_V1_STR}/openapi.json",
        docs_url="/docs",
        redoc_url="/redoc",
    )

    # Add CORS middleware
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.BACKEND_CORS_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Add trusted host middleware for production
    if settings.ENVIRONMENT == "production":
        app.add_middleware(
            TrustedHostMiddleware,
            allowed_hosts=settings.ALLOWED_HOSTS,
        )

    # Include API router
    app.include_router(api_router, prefix=settings.API_V1_STR)

    @app.get("/", tags=["Health"])
    async def root():
        """Health check endpoint."""
        return {
            "message": "Targetym AI Backend API",
            "status": "healthy",
            "version": "1.0.0",
            "environment": settings.ENVIRONMENT
        }

    @app.get("/health", tags=["Health"])
    async def health_check():
        """Detailed health check endpoint."""
        return {
            "status": "healthy",
            "database": "connected",  # TODO: Add actual DB health check
            "redis": "connected",     # TODO: Add actual Redis health check
            "version": "1.0.0"
        }

    return app


app = create_application()
