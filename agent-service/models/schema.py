from pydantic import BaseModel
from typing import List, Optional

class UserProfile(BaseModel):
    skills: List[str] = []
    experience: List[dict] = []
    projects: List[dict] = []
    education: Optional[str] = ""
    currentTitle: Optional[str] = ""

class MatchRequest(BaseModel):
    userId: str
    profile: UserProfile

class MatchResult(BaseModel):
    jobId: str
    score: int
    reasons: List[str]
    gaps: List[str]