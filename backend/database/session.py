from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# MySQL connection URL format:
# mysql+pymysql://<username>:<password>@<host>/<dbname>
SQLALCHEMY_DATABASE_URL = "mysql+pymysql://root:yourpassword@localhost/educational_db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    pool_size=20,
    max_overflow=0,
    pool_pre_ping=True
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()