from typing import TypedDict, Optional
from langgraph.graph import StateGraph, START, END

from services.cover_letter_generator import generate_cover_letter


class CoverLetterState(TypedDict):
    userId: str
    jobId: str
    profile: dict
    jobDetails: dict
    mode: str
    draftLetter: Optional[str]


async def draft_node(state: CoverLetterState) -> dict:
    draft = await generate_cover_letter(state["profile"], state["jobDetails"], state["mode"])
    return {"draftLetter": draft}


graph = StateGraph(CoverLetterState)
graph.add_node("draft", draft_node)
graph.add_edge(START, "draft")
graph.add_edge("draft", END)

cover_letter_agent = graph.compile()


async def run_cover_letter_agent(userId: str, jobId: str, profile: dict, jobDetails: dict, mode: str):
    result = await cover_letter_agent.ainvoke({
        "userId": userId,
        "jobId": jobId,
        "profile": profile,
        "jobDetails": jobDetails,
        "mode": mode,
    })
    return result["draftLetter"]