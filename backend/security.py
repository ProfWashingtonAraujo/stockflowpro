import base64
import hashlib
import hmac
import os
from datetime import datetime, timedelta, timezone

import jwt

from .config import ACCESS_TOKEN_EXPIRE_MINUTES, SECRET_KEY


ALGORITHM = "HS256"


def hash_password(password: str, salt: bytes | None = None) -> str:
    raw_salt = salt if salt else os.urandom(16)
    digest = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), raw_salt, 100000)
    return f"{base64.b64encode(raw_salt).decode()}${base64.b64encode(digest).decode()}"


def verify_password(password: str, password_hash: str) -> bool:
    salt_b64, digest_b64 = password_hash.split("$", 1)
    expected = hash_password(password, base64.b64decode(salt_b64))
    return hmac.compare_digest(expected.split("$", 1)[1], digest_b64)


def create_access_token(subject: str) -> str:
    expires = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    payload = {"sub": subject, "exp": expires}
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


def decode_access_token(token: str) -> dict:
    return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
