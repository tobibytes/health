import bcrypt
import jwt
from datetime import datetime, timedelta
from fastapi import Header, HTTPException
def generate_token(user_info: dict) -> str:
    """Generate a JWT token for the user."""
    payload = {
        "user": user_info,
        "exp": datetime.utcnow() + timedelta(days=1)  # Token expires in 1 day
    }
    token = jwt.encode(payload, "SECRET_KEY", algorithm="HS256")
    return token

def decode_token(token: str) -> dict:
    """Decode a JWT token and return the payload."""
    try:
        payload = jwt.decode(token, "SECRET_KEY", algorithms=["HS256"])
        return payload
    except jwt.ExpiredSignatureError:
        return {"error": "Token has expired"}
    except jwt.InvalidTokenError:
        return {"error": "Invalid token"}

def decode_token_from_request(authorization: str = Header(...)):
    """Decode a JWT token from the request header."""
    try:
        if authorization:
            token = authorization.split(" ")[1]
            payload = decode_token(token)
            if "error" in payload:
                return {"error": payload["error"]}
            return payload
        raise HTTPException(status_code=401, detail="Token not provided")
    except:
        raise HTTPException(status_code=401, detail="Invalid token format")
def hash_password(password: str) -> str:
    """Hash a password using bcrypt."""
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed_password.decode('utf-8')

def verify_hash(password: str, hashed_password: str) -> bool:
    """Verify a password against a hashed password."""
    return bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode('utf-8'))