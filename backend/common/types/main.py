from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime
from enum import Enum


class UserRole(str, Enum):
    PATIENT = "patient"
    Professional = "professional"
    ADMIN = "admin"

class PatientStatus(str, Enum):
    ACTIVE = "active"
    INACTIVE = "inactive"
    SUSPENDED = "suspended"
    DELETED = "deleted"

class PatientBase(BaseModel):
    id: Optional[int] = Field(None, example=1)
    email: EmailStr = Field(..., example="test@gmail.com")
    role: UserRole = Field(..., example=UserRole.PATIENT)
    status: PatientStatus = Field(..., example=PatientStatus.ACTIVE)
    password: Optional[str] = Field(None, example="password123")

class PatientLoginPayload(BaseModel):
    email: EmailStr = Field(..., example="test@gmail.com")
    password: str = Field(..., min_length=8, example="password123")
    role: Optional[UserRole] = Field(..., example=UserRole.PATIENT)
    

class PatientCreate(BaseModel):
    fullName: str = Field(..., example="John Doe")
    email: EmailStr = Field(..., example="test@gmail.com")
    phoneNumber: Optional[str] = Field(None, example="+1234567890")
    dateOfBirth: Optional[datetime] = Field(None, example="1990-01-01T00:00:00Z")
    gender: Optional[str] = Field(None, example="male")
    existingConditions: List[Optional[str]] = Field(None, example=["Diabetes", "Hypertension"])
    insuranceProvider: Optional[str] = Field(None, example="Health Insurance Co.")
    allergies: Optional[str] = Field(None, example="Penicillin")
    address: Optional[str] = Field(None, example="123 Main St, City, Country")
    password: str = Field(..., min_length=8, example="password123")
    role : UserRole = Field(default= UserRole.PATIENT)

class LoginResponse(BaseModel):
    token: str = Field(..., example="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c")

class AppointmentBase(BaseModel):
    id: Optional[int] = Field(None, example=1)
    patientId: int = Field(..., example=1)
    professionalId: int = Field(..., example=2)
    date: datetime = Field(..., example="2023-10-01T10:00:00Z")
    status: str = Field(..., example="scheduled")
    notes: Optional[str] = Field(None, example="Patient is feeling unwell") 
    reason: Optional[str] = Field(None, example="Routine checkup")
    location: Optional[str] = Field(None, example="Room 101")
    createdAt: Optional[datetime] = Field(None, example="2023-09-01T10:00:00Z")
    updatedAt: Optional[datetime] = Field(None, example="2023-09-01T10:00:00Z")

class AppointmentCreate(BaseModel):
    patientId: int = Field(..., example=1)
    professionalId: int = Field(..., example=2)
    date: datetime = Field(..., example="2023-10-01T10:00:00Z")
    notes: Optional[str] = Field(None, example="Patient is feeling unwell")
    reason: Optional[str] = Field(None, example="Routine checkup")

class AppointmentStatus(str, Enum):
    SCHEDULED = "scheduled"
    CONFIRMED = "confirmed"
    CANCELLED = "cancelled"
    COMPLETED = "completed"
    NO_SHOW = "no_show"