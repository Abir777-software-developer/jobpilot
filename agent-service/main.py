import os
from fastapi import FastAPI, HTTPException
from dotenv import load_dotenv

from models.schema import MatchRequest
from agents.matching_agent import run_matching_agent

load_dotenv()

app = FastAPI(title="JobPilot Agent Service")


@app.get("/health")
async def health():
    return {"status": "ok"}


@app.post("/agent/match")
async def trigger_matching_agent(payload: MatchRequest):
    try:
        await run_matching_agent(payload.userId, payload.profile.model_dump())
        return {"status": "completed"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=int(os.getenv("PORT", 8000)), reload=True)