from fastapi import FastAPI
from common.db import Database
from fastapi.middleware.cors import CORSMiddleware
from auth import auth_router
from dotenv import load_dotenv



app = FastAPI()

load_dotenv()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup_event():
    """
    Startup event to initialize the database connection.
    """
    db = Database()
    await db.init_db()


@app.get("/")
async def root():
    """
    Root endpoint to check if the server is running.
    """
    return {"message": "Hello World"}

app.include_router(auth_router)