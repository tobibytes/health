from fastapi import FastAPI
from common.db import Database
from fastapi.middleware.cors import CORSMiddleware
from auth import auth_router
from appointment import appointment_router
import time
from dotenv import load_dotenv
load_dotenv()




async def lifespan(app: FastAPI):
    """
    Startup event to initialize the database connection.
    """
    time.sleep(3)
    db = Database()
    await db.init_db()
    yield
    await db.disconnect()



app = FastAPI(lifespan=lifespan)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    """
    Root endpoint to check if the server is running.
    """
    return {"message": "Hello World"}

app.include_router(auth_router)
app.include_router(appointment_router)