# Targetym AI Backend

Backend API for Targetym AI - HR Analytics Platform powered by FastAPI.

## Features

- **FastAPI Framework**: Modern, fast web framework for building APIs
- **PostgreSQL Database**: Reliable and scalable database with SQLAlchemy ORM
- **Authentication**: JWT-based authentication with role-based access control
- **AI Integration**: ML models for HR analytics and predictions
- **Email Integration**: Resend for transactional emails and notifications
- **Background Tasks**: Celery with Redis for async processing
- **API Documentation**: Automatic OpenAPI/Swagger documentation

## Tech Stack

- **Framework**: FastAPI 0.104+
- **Database**: PostgreSQL with SQLAlchemy 2.0
- **Authentication**: JWT with python-jose
- **Background Jobs**: Celery + Redis
- **ML Libraries**: scikit-learn, pandas, numpy
- **Email Service**: Resend
- **Deployment**: Railway

## Getting Started

### Prerequisites

- Python 3.11+
- PostgreSQL 14+
- Redis (for background tasks)
- Poetry (dependency management)

### Installation

1. Install dependencies:
```bash
poetry install
```

2. Activate virtual environment:
```bash
poetry shell
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Run database migrations:
```bash
alembic upgrade head
```

5. Start the development server:
```bash
uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`

### API Documentation

- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Project Structure

```
backend/
├── app/
│   ├── api/          # API route handlers
│   ├── core/         # Core functionality (config, security)
│   ├── models/       # SQLAlchemy models
│   ├── schemas/      # Pydantic schemas
│   ├── services/     # Business logic
│   ├── utils/        # Utility functions
│   └── main.py       # FastAPI application
├── alembic/          # Database migrations
├── tests/            # Test suite
└── pyproject.toml    # Dependencies and project config
```

## Environment Variables

Create a `.env` file with the following variables:

```env
# Database
DATABASE_URL=postgresql://username:password@localhost/targetym_db

# JWT Security
SECRET_KEY=your-secret-key-here
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Redis
REDIS_URL=redis://localhost:6379

# Resend API
RESEND_API_KEY=your-resend-api-key

# Environment
ENVIRONMENT=development
```

## Deployment

This backend is configured for deployment on Railway. See `railway.json` for configuration details.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Run the test suite: `pytest`
6. Submit a pull request

## License

This project is proprietary software. All rights reserved.
