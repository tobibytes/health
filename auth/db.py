import asyncpg
import auth.types as types
import auth.utils as utils

class Database:
    def __init__(self, db_url: str):
        self.db_url = db_url
        self.pool = None

    async def connect(self):
        self.pool = await asyncpg.create_pool(self.db_url)

    async def disconnect(self):
        await self.pool.close()


    async def create_table(self):
        async with self.pool.acquire() as connection:
            await connection.execute("""
            CREATE TABLE IF NOT EXISTS patients (
                id SERIAL PRIMARY KEY,
                email VARCHAR(255) UNIQUE NOT NULL,
                fullName VARCHAR(255) NOT NULL,
                phoneNumber VARCHAR(20),
                dateOfBirth TIMESTAMP,
                gender VARCHAR(10),
                existingConditions TEXT[],
                insuranceProvider VARCHAR(255),
                allergies TEXT[],
                address VARCHAR(255),
                password VARCHAR(255) NOT NULL,
                role VARCHAR(50) NOT NULL DEFAULT 'patient',
                status VARCHAR(50) NOT NULL DEFAULT 'active',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
            """)


    async def create_patient(self, patient_payload: types.PatientCreate) -> types.PatientBase:
        async with self.pool.acquire() as connection:
            query = """
            INSERT INTO patients (email, fullName, phoneNumber, dateOfBirth, gender, existingConditions, insuranceProvider, allergies, address, password, role)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
            RETURNING id, role, status, email;
            """
            values = (
                patient_payload.email,
                patient_payload.fullName,
                patient_payload.phoneNumber,
                patient_payload.dateOfBirth,
                patient_payload.gender,
                patient_payload.existingConditions,
                patient_payload.insuranceProvider,
                patient_payload.allergies,
                patient_payload.address,
                patient_payload.password,
                patient_payload.role,
            )
            result = await connection.fetchrow(query, *values)
            if result:
                return types.PatientBase.model_validate({
                    "id": result["id"],
                    "email": result["email"],
                    "role": result["role"],
                    "status": result["status"],
                })
            else:
                raise Exception("Failed to create patient")
            

    async def get_patient_by_email(self, email: str) -> types.PatientBase:
        async with self.pool.acquire() as connection:
            query = """
            SELECT id, email, fullName, role, status
            FROM patients
            WHERE email = $1;
            """
            result = await connection.fetchrow(query, email)
            if result:
                return types.PatientBase.model_validate({
                    "id": result["id"],
                    "email": result["email"],
                    "role": result["role"],
                    "status": result["status"],
                })
            else:
                raise Exception("Patient not found")
            
    async def check_password(self, email: str, password: str) -> bool:
        async with self.pool.acquire() as connection:
            query = """
            SELECT password
            FROM patients
            WHERE email = $1;
            """
            result = await connection.fetchrow(query, email)
            if result:
                return utils.verify_hash(password, result["password"])
            else:
                raise Exception("Patient not found")
    
