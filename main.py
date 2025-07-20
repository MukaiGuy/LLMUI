# main.py  (very bare-bones FastAPI proxy)
from fastapi import FastAPI
from pydantic import BaseModel
from dotenv import load_dotenv
from typing import Literal   

from fastapi.middleware.cors import CORSMiddleware
import os
import asyncio
from openai import AsyncOpenAI

# Load the .env in the current working directory
load_dotenv(dotenv_path='.env')   

app = FastAPI()


client = AsyncOpenAI(
    # This is the default and can be omitted
    api_key=os.environ.get("OPENAI_API_KEY"),
)

class Message(BaseModel):
    role: Literal["user", "assistant", "system"]
    content: str

class ChatReq(BaseModel):
    messages: list[Message]

@app.post("/chat")
async def chat(req: ChatReq):
    try:
        resp = await client.chat.completions.create(
            model="gpt-4.1-mini-2025-04-14",
            messages=req.messages,
        )
        return resp.choices[0].message
    except Exception as e:
        print(e)
        return {"role": "assistant", "content": "I'm sorry, I'm having trouble processing your request. Please try again later."}



app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],          # tighten this in prod
    allow_methods=["POST"],
    allow_headers=["*"],
)