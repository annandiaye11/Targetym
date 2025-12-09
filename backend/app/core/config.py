"""
Core configuration settings for Targetym AI Backend.
"""

import os
from typing import List, Optional

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application settings."""
    
    # Project
    PROJECT_NAME: str = "Targetym AI Backend"
    API_V1_STR: str = "/api/v1"
    ENVIRONMENT: str = "development"
    
    # Security
    SECRET_KEY: str = "test-secret-key-change-in-production"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    EMAIL_RESET_TOKEN_EXPIRE_HOURS: int = 48
    ALGORITHM: str = "HS256"
    
    # Database
    DATABASE_URL: str = "sqlite:///./test.db"
    
    # Redis
    REDIS_URL: str = "redis://localhost:6379"
    
    # CORS
    BACKEND_CORS_ORIGINS: List[str] = [
        "http://localhost:3000",  # Next.js dev server
        "http://localhost:8000",  # FastAPI dev server
        "https://targetym-ai.vercel.app",  # Production frontend
    ]
    
    # Trusted hosts for production
    ALLOWED_HOSTS: List[str] = ["*"]
    
    # Email configuration (Resend)
    RESEND_API_KEY: Optional[str] = None
    EMAILS_FROM_EMAIL: Optional[str] = None
    EMAILS_FROM_NAME: Optional[str] = "Targetym AI"
    
    # File storage
    AWS_ACCESS_KEY_ID: Optional[str] = None
    AWS_SECRET_ACCESS_KEY: Optional[str] = None
    AWS_REGION: str = "eu-west-1"
    S3_BUCKET: Optional[str] = None
    
    # Pagination
    DEFAULT_PAGE_SIZE: int = 20
    MAX_PAGE_SIZE: int = 100
    
    # Background tasks
    CELERY_BROKER_URL: str = "redis://localhost:6379/0"
    CELERY_RESULT_BACKEND: str = "redis://localhost:6379/0"

    class Config:
        """Pydantic configuration."""
        env_file = ".env"
        case_sensitive = True


# Create global settings instance
settings = Settings()
