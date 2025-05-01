from fastapi import APIRouter, Depends
from common.utils.auth import decode_token_from_request
from common.types import AppointmentCreate
from common.db import Database
from common.utils.date import make_naive
from typing import Optional

db = Database()

appointment_router = APIRouter(prefix="/appointment")

@appointment_router.get("/")
async def get_appointments(skip: Optional[int] = 0, limit: Optional[int] = 10):
    """
    Get all appointments.
    """
    try:
        appointments = await db.get_appointments(skip=skip, limit=limit)
        return  appointments
    except Exception as e:
        return {"error": str(e)}


@appointment_router.get("/{appointment_id}")
async def get_appointment(appointment_id: int):
    """
    Get a specific appointment by ID.
    """
    try:
        appointment = await db.get_patient_appointments(appointment_id)
        return appointment
    except Exception as e:
        return {"error": str(e)}

@appointment_router.get("/patient/{patient_id}")
async def get_patient_appointments(patient_id: int, skip: Optional[int] = 0, limit: Optional[int] = 10, token: str = Depends(decode_token_from_request)):
    """
    Get all appointments for a specific patient.
    """
    try:
        print(token)
        appointments = await db.get_patient_appointments(patient_id, skip=skip, limit=limit)
        return appointments
    except Exception as e:
        return {"error": str(e)}  

@appointment_router.post("/")
async def create_appointment(appointment_payload: AppointmentCreate):
    """
    Create a new appointment.
    """
    try:
        appointment_payload.date = make_naive(appointment_payload.date)
        appointment  = await db.create_appointment(appointment_payload)
        return appointment
    except Exception as e:
        return {"error": str(e)}

@appointment_router.put("/{appointment_id}")
async def update_appointment(appointment_id: int, token: str = Depends(decode_token_from_request)):
    """
    Update an existing appointment by ID.
    """
    return {"message": f"Update appointment with ID {appointment_id}", "data": token}

@appointment_router.delete("/{appointment_id}")
async def delete_appointment(appointment_id: int):
    """
    Delete an appointment by ID.
    """
    return {"message": f"Delete appointment with ID {appointment_id}"}

