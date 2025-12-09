"""
Authentication API endpoints.
"""

from datetime import datetime, timedelta
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import User, UserSession
from app.schemas import (
    UserCreate, UserLogin, UserResponse, Token, 
    MessageResponse, ErrorResponse
)
from app.security import (
    verify_password, get_password_hash, create_access_token,
    extract_token_data, ACCESS_TOKEN_EXPIRE_MINUTES
)

router = APIRouter(prefix="/auth", tags=["authentication"])
security = HTTPBearer()


def get_user_by_email(db: Session, email: str) -> User | None:
    """Get user by email."""
    return db.query(User).filter(User.email == email).first()


def create_user(db: Session, user: UserCreate) -> User:
    """Create a new user."""
    if not user.passwords_match():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Passwords do not match"
        )
    
    # Check if user already exists
    if get_user_by_email(db, user.email):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Create user
    hashed_password = get_password_hash(user.password)
    db_user = User(
        email=user.email,
        password_hash=hashed_password,
        first_name=user.first_name,
        last_name=user.last_name,
        company=user.company
    )
    
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def authenticate_user(db: Session, email: str, password: str) -> User | None:
    """Authenticate user with email and password."""
    user = get_user_by_email(db, email)
    if not user:
        return None
    if not verify_password(password, user.password_hash):
        return None
    return user


def create_user_session(db: Session, user_id: int, token_jti: str) -> UserSession:
    """Create a new user session."""
    expires_at = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    
    session = UserSession(
        user_id=user_id,
        token_jti=token_jti,
        expires_at=expires_at
    )
    
    db.add(session)
    db.commit()
    db.refresh(session)
    return session


async def get_current_user(
    credentials: Annotated[HTTPAuthorizationCredentials, Depends(security)],
    db: Annotated[Session, Depends(get_db)]
) -> User:
    """Get current authenticated user."""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    try:
        token = credentials.credentials
        token_data = extract_token_data(token)
        if token_data is None:
            raise credentials_exception
            
        user_id = token_data.get("user_id")
        if user_id is None:
            raise credentials_exception
            
    except Exception:
        raise credentials_exception
    
    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        raise credentials_exception
    return user


@router.post("/register", response_model=Token)
async def register(
    user: UserCreate,
    db: Annotated[Session, Depends(get_db)]
):
    """Register a new user."""
    try:
        db_user = create_user(db, user)
        
        # Create access token
        access_token = create_access_token(
            data={"sub": db_user.id, "email": db_user.email}
        )
        
        # Extract JWT ID and create session
        token_data = extract_token_data(access_token)
        if token_data:
            create_user_session(db, db_user.id, token_data["jti"])
        
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "expires_in": ACCESS_TOKEN_EXPIRE_MINUTES * 60,
            "user": UserResponse.model_validate(db_user)
        }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Registration failed: {str(e)}"
        )


@router.post("/login", response_model=Token)
async def login(
    user_credentials: UserLogin,
    db: Annotated[Session, Depends(get_db)]
):
    """Login user."""
    user = authenticate_user(db, user_credentials.email, user_credentials.password)
    if not user:
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
    
    # Update last login
    user.last_login = datetime.utcnow()
    db.commit()
    
    # Create access token
    access_token = create_access_token(
        data={"sub": user.id, "email": user.email}
    )
    
    # Extract JWT ID and create session
    token_data = extract_token_data(access_token)
    if token_data:
        create_user_session(db, user.id, token_data["jti"])
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "expires_in": ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        "user": UserResponse.model_validate(user)
    }


@router.post("/logout", response_model=MessageResponse)
async def logout(
    current_user: Annotated[User, Depends(get_current_user)],
    credentials: Annotated[HTTPAuthorizationCredentials, Depends(security)],
    db: Annotated[Session, Depends(get_db)]
):
    """Logout user by invalidating session."""
    try:
        token = credentials.credentials
        token_data = extract_token_data(token)
        
        if token_data and token_data.get("jti"):
            # Deactivate session
            session = db.query(UserSession).filter(
                UserSession.token_jti == token_data["jti"]
            ).first()
            
            if session:
                session.is_active = False
                db.commit()
        
        return {"message": "Successfully logged out"}
        
    except Exception as e:
        return {"message": "Logout completed", "success": True}


@router.get("/me", response_model=UserResponse)
async def get_current_user_info(
    current_user: Annotated[User, Depends(get_current_user)]
):
    """Get current user information."""
    return UserResponse.model_validate(current_user)
