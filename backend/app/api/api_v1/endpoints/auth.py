"""
Authentication endpoints for login, registration, and token management.
"""

from datetime import timedelta
from typing import Any

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.database import get_db
from app.core.security import create_access_token, verify_password, get_password_hash
from app.models.user import User
from app.schemas.user import Token, UserCreate, User as UserSchema, LoginRequest, Message

router = APIRouter()


@router.post("/register", response_model=UserSchema, status_code=status.HTTP_201_CREATED)
async def register(
    user_data: UserCreate,
    db: Session = Depends(get_db),
) -> Any:
    """Register a new user."""
    
    # Check if user already exists
    existing_user = db.query(User).filter(User.email == user_data.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Create new user
    hashed_password = get_password_hash(user_data.password)
    
    db_user = User(
        email=user_data.email,
        first_name=user_data.first_name,
        last_name=user_data.last_name,
        company=user_data.company,
        hashed_password=hashed_password,
        is_active=True,
        is_verified=False,
    )
    
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    return db_user


@router.post("/login", response_model=Token)
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
) -> Any:
    """Authenticate user and return access token."""
    
    # Find user by email
    user = db.query(User).filter(User.email == form_data.username).first()
    
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Inactive user"
        )
    
    # Create access token
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        subject=user.id, expires_delta=access_token_expires
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
    }


@router.post("/login/email", response_model=Token)
async def login_with_email(
    login_data: LoginRequest,
    db: Session = Depends(get_db),
) -> Any:
    """Alternative login endpoint with email/password JSON."""
    
    # Find user by email
    user = db.query(User).filter(User.email == login_data.email).first()
    
    if not user or not verify_password(login_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
        )
    
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Inactive user"
        )
    
    # Create access token
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        subject=user.id, expires_delta=access_token_expires
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
    }


@router.post("/password-reset/request", response_model=Message)
async def request_password_reset(
    email: str,
    db: Session = Depends(get_db),
) -> Any:
    """Request password reset email."""
    
    user = db.query(User).filter(User.email == email).first()
    
    if not user:
        # Don't reveal if email exists or not for security
        return {"message": "Password reset email sent if account exists"}
    
    # TODO: Generate reset token and send email via Resend
    # For now, just return success message
    
    return {"message": "Password reset email sent if account exists"}


@router.post("/password-reset/confirm", response_model=Message)
async def confirm_password_reset(
    token: str,
    new_password: str,
    db: Session = Depends(get_db),
) -> Any:
    """Confirm password reset with token."""
    
    # TODO: Verify reset token and update password
    # For now, just return success message
    
    return {"message": "Password reset successful"}
