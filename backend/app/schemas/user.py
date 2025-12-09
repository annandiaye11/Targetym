"""
Pydantic schemas for API request/response validation.
"""

from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr, validator


# User schemas
class UserBase(BaseModel):
    """Base user schema."""
    email: EmailStr
    first_name: str
    last_name: str
    company: Optional[str] = None
    is_active: bool = True


class UserCreate(UserBase):
    """Schema for user creation."""
    password: str
    confirm_password: str
    
    @validator('confirm_password')
    def passwords_match(cls, v, values, **kwargs):
        if 'password' in values and v != values['password']:
            raise ValueError('Passwords do not match')
        return v


class UserUpdate(BaseModel):
    """Schema for user updates."""
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    company: Optional[str] = None
    phone: Optional[str] = None
    bio: Optional[str] = None
    timezone: Optional[str] = None


class UserInDB(UserBase):
    """Schema for user in database."""
    id: int
    is_superuser: bool
    is_verified: bool
    subscription_plan: str
    subscription_status: str
    trial_ends_at: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime
    last_login_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class User(UserInDB):
    """Public user schema."""
    pass


# Authentication schemas
class Token(BaseModel):
    """JWT token schema."""
    access_token: str
    token_type: str = "bearer"


class TokenData(BaseModel):
    """Token data schema."""
    email: Optional[str] = None


class LoginRequest(BaseModel):
    """Login request schema."""
    email: EmailStr
    password: str


class PasswordReset(BaseModel):
    """Password reset schema."""
    token: str
    new_password: str
    confirm_password: str
    
    @validator('confirm_password')
    def passwords_match(cls, v, values, **kwargs):
        if 'new_password' in values and v != values['new_password']:
            raise ValueError('Passwords do not match')
        return v


# Company schemas
class CompanyBase(BaseModel):
    """Base company schema."""
    name: str
    description: Optional[str] = None
    website: Optional[str] = None


class CompanyCreate(CompanyBase):
    """Schema for company creation."""
    pass


class CompanyUpdate(BaseModel):
    """Schema for company updates."""
    name: Optional[str] = None
    description: Optional[str] = None
    website: Optional[str] = None
    employee_limit: Optional[int] = None
    timezone: Optional[str] = None
    currency: Optional[str] = None


class Company(CompanyBase):
    """Public company schema."""
    id: int
    slug: str
    logo_url: Optional[str] = None
    employee_limit: int
    timezone: str
    currency: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# Employee schemas
class EmployeeBase(BaseModel):
    """Base employee schema."""
    employee_id: str
    email: EmailStr
    first_name: str
    last_name: str
    job_title: Optional[str] = None
    department: Optional[str] = None
    employment_type: Optional[str] = None


class EmployeeCreate(EmployeeBase):
    """Schema for employee creation."""
    hire_date: Optional[datetime] = None


class EmployeeUpdate(BaseModel):
    """Schema for employee updates."""
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    job_title: Optional[str] = None
    department: Optional[str] = None
    manager_id: Optional[int] = None
    employment_type: Optional[str] = None
    employment_status: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    performance_score: Optional[int] = None


class Employee(EmployeeBase):
    """Public employee schema."""
    id: int
    manager_id: Optional[int] = None
    employment_status: str
    phone: Optional[str] = None
    hire_date: Optional[datetime] = None
    termination_date: Optional[datetime] = None
    performance_score: Optional[int] = None
    last_review_date: Optional[datetime] = None
    next_review_date: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# Generic response schemas
class Message(BaseModel):
    """Generic message schema."""
    message: str


class ErrorResponse(BaseModel):
    """Error response schema."""
    error: str
    detail: Optional[str] = None
