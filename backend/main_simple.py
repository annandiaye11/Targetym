"""
Simple FastAPI backend for authentication
"""
from datetime import datetime, timedelta
from typing import Optional
import os

from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from jose import JWTError, jwt
import sqlite3
import hashlib

# Configuration
SECRET_KEY = "your-super-secret-jwt-key-change-this-in-production"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Simple password hashing using SHA256
def hash_password(password: str) -> str:
    """Simple SHA256 password hashing"""
    return hashlib.sha256(password.encode()).hexdigest()

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify password with SHA256"""
    return hashlib.sha256(plain_password.encode()).hexdigest() == hashed_password

security = HTTPBearer()

# Create FastAPI app
app = FastAPI(
    title="Targetym AI Backend",
    description="Simple HR Analytics Backend",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class UserCreate(BaseModel):
    email: str
    first_name: str
    last_name: str
    company: Optional[str] = None
    password: str
    confirm_password: str

class UserLogin(BaseModel):
    email: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str
    user: dict

class User(BaseModel):
    id: str
    email: str
    first_name: str
    last_name: str
    company: Optional[str] = None
    is_active: bool
    created_at: str

# Database helper functions
def init_db():
    """Initialize SQLite database"""
    db_path = os.path.join(os.path.dirname(__file__), 'targetym_ai.db')
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            first_name TEXT NOT NULL,
            last_name TEXT NOT NULL,
            company TEXT,
            hashed_password TEXT NOT NULL,
            is_active BOOLEAN DEFAULT 1,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    conn.commit()
    conn.close()

def get_user_by_email(email: str):
    """Get user by email"""
    db_path = os.path.join(os.path.dirname(__file__), 'targetym_ai.db')
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    cursor.execute('SELECT * FROM users WHERE email = ?', (email,))
    user = cursor.fetchone()
    conn.close()
    
    return user


def create_user(user_data: UserCreate):
    """Create new user"""
    db_path = os.path.join(os.path.dirname(__file__), 'targetym_ai.db')
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    # Hash password with SHA256
    hashed_password = hash_password(user_data.password)
    
    cursor.execute('''
        INSERT INTO users (email, first_name, last_name, company, hashed_password)
        VALUES (?, ?, ?, ?, ?)
    ''', (user_data.email, user_data.first_name, user_data.last_name, 
            user_data.company, hashed_password))
    
    user_id = cursor.lastrowid
    conn.commit()
    conn.close()
    
    return user_id

# Auth helper functions (verify_password is already defined above)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    """Create JWT token"""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Get current user from JWT token"""
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=401, detail="Invalid token")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    user = get_user_by_email(email)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    return user

# Initialize database
init_db()

# Routes
@app.post("/api/v1/auth/register", response_model=Token)
async def register(user_data: UserCreate):
    """Register new user"""
    
    try:
        # Validate passwords match
        if user_data.password != user_data.confirm_password:
            raise HTTPException(
                status_code=400,
                detail="Passwords do not match"
            )
        
        # Check if user exists
        existing_user = get_user_by_email(user_data.email)
        if existing_user:
            raise HTTPException(
                status_code=400,
                detail="Email already registered"
            )
        
        # Create user
        user_id = create_user(user_data)
        
        # Create token
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={"sub": user_data.email}, expires_delta=access_token_expires
        )
        
        # Return response
        user_dict = {
        "id": str(user_id),
        "email": user_data.email,
        "first_name": user_data.first_name,
        "last_name": user_data.last_name,
        "company": user_data.company,
        "is_active": True,
            "created_at": datetime.utcnow().isoformat()
        }
        
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "user": user_dict
        }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Registration error: {str(e)}")

@app.post("/api/v1/auth/login", response_model=Token)
async def login(user_data: UserLogin):
    """Login user"""
    
    try:
        # Get user
        user = get_user_by_email(user_data.email)
        if not user:
            raise HTTPException(
                status_code=401,
                detail="Email not found"
            )
            
        # Verify password
        if not verify_password(user_data.password, user[5]):  # hashed_password is at index 5
            raise HTTPException(
                status_code=401,
                detail="Incorrect password"
            )
        
        # Create token
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={"sub": user_data.email}, expires_delta=access_token_expires
        )
        
        # Return response
        user_dict = {
        "id": str(user[0]),
        "email": user[1],
        "first_name": user[2],
        "last_name": user[3],
        "company": user[4],
        "is_active": bool(user[6]),
        "created_at": user[7] if len(user) > 7 else datetime.utcnow().isoformat()
        }
        
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "user": user_dict
        }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Login error: {str(e)}")

@app.get("/api/v1/auth/me", response_model=User)
async def get_me(current_user=Depends(get_current_user)):
    """Get current user info"""
    user_dict = {
        "id": str(current_user[0]),
        "email": current_user[1],
        "first_name": current_user[2],
        "last_name": current_user[3],
        "company": current_user[4],
        "is_active": bool(current_user[6]),
        "created_at": current_user[7] if len(current_user) > 7 else datetime.utcnow().isoformat()
    }
    return user_dict

@app.post("/api/v1/auth/logout")
async def logout():
    """Logout user"""
    return {"message": "Successfully logged out"}

@app.get("/")
async def root():
    """Root endpoint"""
    return {"message": "Targetym AI Backend API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
