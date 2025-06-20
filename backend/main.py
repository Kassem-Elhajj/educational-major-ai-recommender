from fastapi import FastAPI
from api.v1 import auth
from database.session import engine
from models.user import Base

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(auth.router, prefix="/api/v1/auth")