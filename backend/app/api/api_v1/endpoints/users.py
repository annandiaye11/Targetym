"""
Simple endpoints for basic functionality.
"""

from fastapi import APIRouter
from typing import Dict, Any

router = APIRouter()


@router.get("/")
async def get_users() -> Dict[str, Any]:
    """Get users endpoint (placeholder)."""
    return {
        "message": "Users endpoint",
        "users": []
    }


@router.get("/me")
async def get_current_user() -> Dict[str, Any]:
    """Get current user endpoint (placeholder)."""
    return {
        "message": "Current user endpoint",
        "user": None
    }
