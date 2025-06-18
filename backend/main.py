from fastapi import FastAPI
from app.api.v1 import auth
from app.database.session import engine
from app.models.user import Base

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(auth.router, prefix="/api/v1/auth")