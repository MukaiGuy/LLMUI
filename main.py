# main.py  (very bare-bones FastAPI proxy)
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import openai, os

app = FastAPI()
openai.api_key = os.getenv("OPENAI_KEY")

class ChatReq(BaseModel):
    messages: list

@app.post("/chat")
async def chat(req: ChatReq):
    resp = openai.ChatCompletion.create(model="gpt-4.1-mini-2025-04-14", messages=req.messages)
    return resp.choices[0].message



app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],          # tighten this in prod
    allow_methods=["POST"],
    allow_headers=["*"],
)