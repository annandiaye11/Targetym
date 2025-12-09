"""
Analytics endpoints for HR insights and dashboards.
"""

from fastapi import APIRouter
from typing import Dict, Any

router = APIRouter()


@router.get("/dashboard")
async def get_dashboard_data() -> Dict[str, Any]:
    """Get dashboard analytics data (placeholder)."""
    return {
        "message": "Analytics dashboard",
        "data": {
            "total_employees": 0,
            "active_employees": 0,
            "performance_score": 0,
            "engagement_score": 0
        }
    }


@router.get("/reports")
async def get_reports() -> Dict[str, Any]:
    """Get available reports (placeholder)."""
    return {
        "message": "Analytics reports",
        "reports": []
    }
