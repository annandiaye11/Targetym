from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Database configuration
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./targetym_ai.db")

# Create engine with proper PostgreSQL configuration
if DATABASE_URL.startswith("postgresql"):
    # PostgreSQL configuration
    engine = create_engine(
        DATABASE_URL,
        pool_size=10,
        max_overflow=20,
        pool_pre_ping=True,
        echo=False  # Set to True for SQL debugging
    )
else:
    # SQLite configuration (fallback)
    engine = create_engine(
        DATABASE_URL,
        connect_args={"check_same_thread": False},
        echo=False
    )

# Create SessionLocal class
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create Base class
Base = declarative_base()

# Database dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Initialize database (create tables)
def init_db():
    """Create all tables in the database."""
    Base.metadata.create_all(bind=engine)
    
def drop_db():
    """Drop all tables in the database."""
    Base.metadata.drop_all(bind=engine)
