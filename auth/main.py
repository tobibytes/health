from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import auth.db
import auth.types as types
import auth.utils as utils


db = auth.db.Database("postgresql://postgres:postgres@localhost:5432/postgres")
async def init_db():
    await db.connect()

app = FastAPI()

@app.on_event("startup")
async def startup_event():
    await init_db()
    await db.create_table()


origins = [
    "http://localhost:3000",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Hello": "World"}

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
    
@app.post("/auth/register")
async def register(patient_payload: types.PatientCreate):
    """
    Register a new patient and return the patient details.
    """
    # Hash the password
    hashed_password = utils.hash_password(patient_payload.password)
    
    # Create the patient in the database
    patient_payload.password = hashed_password
    patient = await db.create_patient(patient_payload)
    return types.LoginResponse(token=utils.generate_token(patient.model_dump())).model_dump()