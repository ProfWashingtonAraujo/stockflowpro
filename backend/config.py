from os import getenv


DATABASE_URL = getenv("DATABASE_URL", "sqlite:///./backend/data/stockflow.db")
SECRET_KEY = getenv("SECRET_KEY", "stockflowpro-dev-secret-key")
ACCESS_TOKEN_EXPIRE_MINUTES = int(getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "1440"))
