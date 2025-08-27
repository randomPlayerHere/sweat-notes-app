from fastapi import FastAPI
from pydantic import BaseModel
from typing import List

app = FastAPI(title="Sweat Notes")

@app.get("/")
def status():
    return ("message": "FastAPI Backend is running")

@app.get("/predict/")
