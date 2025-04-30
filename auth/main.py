from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import auth.db
import auth.types as types
import auth.utils as utils

db = auth.db.Database("postgresql://health:password@localhost:5432/postgres")
db.connect()

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/auth/login")
async def login(auth_payload: types.PatientLoginPayload):
    """
    Login a patient and return a JWT token.
    """
    # Fetch the patient from the database
    correct_password = await db.check_password(auth_payload.email, auth_payload.password)
    
    if not correct_password:
        return {"error": "Invalid email or password"}
    
    # Generate a token
    patient = await db.get_patient_by_email(auth_payload.email)
    token = utils.generate_token(patient.model_dump())
    
    return {
        "token": token,
    }
    