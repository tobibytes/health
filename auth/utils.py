import bcrypt
import jwt
from datetime import datetime, timedelta

def generate_token(user_info: dict) -> str:
    """Generate a JWT token for the user."""
    payload = {
        "user": user_info,
        "exp": datetime.utcnow() + timedelta(days=1)  # Token expires in 1 day
    }
    token = jwt.encode(payload, "SECRET_KEY", algorithm="HS256")
    return token

def hash_password(password: str) -> str:
    """Hash a password using bcrypt."""
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed_password.decode('utf-8')

def verify_hash(password: str, hashed_password: str) -> bool:
    """Verify a password against a hashed password."""
    return bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode('utf-8'))