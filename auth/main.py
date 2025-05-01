from fastapi import APIRouter
from common.db import Database
from common.types import *
from auth.utils import generate_token, verify_hash, hash_password

db = Database()

auth_router = APIRouter(prefix="/auth")

@auth_router.post("/login")
async def login(auth_payload: PatientLoginPayload):
    """
    Login a patient and return a JWT token.
    """
    patient = await db.get_patient_by_email(auth_payload.email, True)
    if not patient.password:
        return {"error": "Invalid email or password"}
    correct_password = verify_hash(auth_payload.password, patient.password)
    if not correct_password:
        return {"error": "Invalid email or password"}
    patient.password = None
    token = generate_token(patient.model_dump())
    
    return {
        "token": token,
    }
    
@auth_router.post("/register")
async def register(patient_payload: PatientCreate):
    """
    Register a new patient and return the patient details.
    """
    # Hash the password
    hashed_password = hash_password(patient_payload.password)
    
    # Create the patient in the database
    patient_payload.password = hashed_password
    patient = await db.create_patient(patient_payload)
    return LoginResponse(token=generate_token(patient.model_dump())).model_dump()