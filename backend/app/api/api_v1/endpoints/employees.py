"""
Employee management endpoints.
"""

from fastapi import APIRouter
from typing import Dict, Any

router = APIRouter()


@router.get("/")
async def get_employees() -> Dict[str, Any]:
    """Get employees endpoint (placeholder)."""
    return {
        "message": "Employees endpoint",
        "employees": []
    }
