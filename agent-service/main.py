import os
from fastapi import FastAPI, HTTPException
from dotenv import load_dotenv

from models.schema import MatchRequest ,CoverLetterRequest
from agents.matching_agent import run_matching_agent
from agents.cover_letter_agent import run_cover_letter_agent

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


@app.post("/agent/cover-letter")
async def trigger_cover_letter_agent(payload: CoverLetterRequest):
    try:
        draft = await run_cover_letter_agent(
            userId=payload.userId,
            jobId=payload.jobId,
            profile=payload.profile.model_dump(),
            jobDetails=payload.jobDetails.model_dump(),
            mode=payload.mode
        )
        return {"draft": draft}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=int(os.getenv("PORT", 8000)), reload=True)