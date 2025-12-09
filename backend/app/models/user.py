"""
User model for authentication and user management.
"""

from sqlalchemy import Boolean, Column, DateTime, Integer, String, Text
from sqlalchemy.sql import func

from app.core.database import Base


class User(Base):
    """User model for authentication."""
    
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=False)
    company = Column(String(255), nullable=True)
    hashed_password = Column(String(255), nullable=False)
    is_active = Column(Boolean, default=True)
    is_superuser = Column(Boolean, default=False)
    is_verified = Column(Boolean, default=False)
    
    # Subscription info
    subscription_plan = Column(String(50), default="starter")
    subscription_status = Column(String(50), default="trial")
    trial_ends_at = Column(DateTime(timezone=True), nullable=True)
    
    # Profile info
    avatar_url = Column(String(500), nullable=True)
    bio = Column(Text, nullable=True)
    phone = Column(String(20), nullable=True)
    timezone = Column(String(50), default="UTC")
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    last_login_at = Column(DateTime(timezone=True), nullable=True)
    
    def __repr__(self) -> str:
        return f"<User {self.email}>"


class Company(Base):
    """Company model for multi-tenant support."""
    
    __tablename__ = "companies"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    slug = Column(String(100), unique=True, index=True, nullable=False)
    description = Column(Text, nullable=True)
    website = Column(String(255), nullable=True)
    logo_url = Column(String(500), nullable=True)
    
    # Settings
    employee_limit = Column(Integer, default=50)
    timezone = Column(String(50), default="UTC")
    currency = Column(String(3), default="USD")
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    
    def __repr__(self) -> str:
        return f"<Company {self.name}>"


class Employee(Base):
    """Employee model for HR management."""
    
    __tablename__ = "employees"

    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(String(50), unique=True, index=True, nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=False)
    
    # Job details
    job_title = Column(String(200), nullable=True)
    department = Column(String(100), nullable=True)
    manager_id = Column(Integer, nullable=True)  # Self-referential foreign key
    employment_type = Column(String(50), nullable=True)  # full-time, part-time, contractor
    employment_status = Column(String(50), default="active")  # active, inactive, terminated
    
    # Personal details
    phone = Column(String(20), nullable=True)
    address = Column(Text, nullable=True)
    date_of_birth = Column(DateTime, nullable=True)
    
    # Employment dates
    hire_date = Column(DateTime, nullable=True)
    termination_date = Column(DateTime, nullable=True)
    
    # Performance metrics
    performance_score = Column(Integer, nullable=True)  # 1-5 scale
    last_review_date = Column(DateTime, nullable=True)
    next_review_date = Column(DateTime, nullable=True)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    
    def __repr__(self) -> str:
        return f"<Employee {self.first_name} {self.last_name}>"
