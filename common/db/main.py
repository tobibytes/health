import os
import asyncpg
import common.types as types
import threading

class Database:

    __lock = None
    __instance = None
    __db_url = None
    pool = None

    def __new__(cls):
        if not cls.__instance:
            cls.__lock = threading.Lock()
            with cls.__lock:
                if not cls.__instance:
                    cls.__instance = super(Database, cls).__new__(cls)
        return cls.__instance

    async def connect(self):
        self.pool = await asyncpg.create_pool(self.__db_url)

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
            RETURNING id, role, status, email, password;
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
                    "password": result["password"],
                })
            else:
                raise Exception("Failed to create patient")
            

    async def get_patient_by_email(self, email: str, show_password=False) -> types.PatientBase:
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
                    **({"password": result["password"]} if show_password else {}),
                })
            else:
                raise Exception("Patient not found")
            
    async def init_db(self):
        self.__db_url = os.getenv("DATABASE_URL")
        await self.connect()
        await self.create_table()
        



