"""
Main API router that includes all API routes.
"""

from fastapi import APIRouter

from app.api.api_v1.endpoints import auth, users, employees, analytics

api_router = APIRouter()

# Include all endpoint routers
api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
api_router.include_router(users.router, prefix="/users", tags=["Users"])
api_router.include_router(employees.router, prefix="/employees", tags=["Employees"])
api_router.include_router(analytics.router, prefix="/analytics", tags=["Analytics"])
