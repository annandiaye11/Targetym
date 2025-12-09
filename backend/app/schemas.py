"""
Pydantic schemas for request/response validation.
"""

from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr


# User schemas
class UserBase(BaseModel):
    """Base user schema."""
    email: EmailStr
    first_name: str
    last_name: str
    company: Optional[str] = None


class UserCreate(UserBase):
    """Schema for user creation."""
    password: str
    confirm_password: str

    def passwords_match(self) -> bool:
        """Check if passwords match."""
        return self.password == self.confirm_password


class UserLogin(BaseModel):
    """Schema for user login."""
    email: EmailStr
    password: str


class UserResponse(UserBase):
    """Schema for user response."""
    id: int
    is_active: bool
    is_verified: bool
    subscription_plan: str
    subscription_status: str
    created_at: datetime
    last_login: Optional[datetime] = None

    class Config:
        from_attributes = True


class UserUpdate(BaseModel):
    """Schema for user update."""
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    company: Optional[str] = None


# Authentication schemas
class Token(BaseModel):
    """Token response schema."""
    access_token: str
    token_type: str
    expires_in: int
    user: UserResponse


class TokenData(BaseModel):
    """Token data schema."""
    user_id: Optional[int] = None
    email: Optional[str] = None


# Response schemas
class MessageResponse(BaseModel):
    """Generic message response."""
    message: str
    success: bool = True


class ErrorResponse(BaseModel):
    """Error response schema."""
    error: str
    detail: Optional[str] = None
    success: bool = False
