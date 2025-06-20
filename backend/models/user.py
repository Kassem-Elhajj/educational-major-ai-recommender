from sqlalchemy import Column, Integer, String
from database.session import Base

class User(Base):
    __tablename__ = "users"
    __table_args__ = {'extend_existing': True}  # Add this line
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True)
    hashed_password = Column(String(255))