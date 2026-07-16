from typing import TypedDict, List, Optional
from datetime import datetime , timezone
from bson import ObjectId
from langgraph.graph import StateGraph, START, END

from services.job_fetcher import fetch_and_cache_jobs
from services.match_scorer import score_jobs_against_profile
from db import job_matches_collection


class AgentState(TypedDict):
    userId: str
    profile: dict
    jobs: Optional[List[dict]]
    scoredResults: Optional[List[dict]]


async def fetch_jobs_node(state: AgentState) -> dict:
    profile = state["profile"]
    keywords = [profile.get("currentTitle", "")] + profile.get("skills", [])[:4]
    keywords = [k for k in keywords if k]

    jobs = await fetch_and_cache_jobs(keywords)
    return {"jobs": jobs}


async def score_jobs_node(state: AgentState) -> dict:
    scored_results = await score_jobs_against_profile(state["jobs"], state["profile"])
    return {"scoredResults": scored_results}


async def save_matches_node(state: AgentState) -> dict:
    user_id = state["userId"]
    results = state["scoredResults"]

    for result in results:
        await job_matches_collection.find_one_and_update(
            {"userId": ObjectId(user_id), "jobId": ObjectId(result["jobId"])},
            {
                "$set": {
                    "userId": ObjectId(user_id),
                    "jobId": ObjectId(result["jobId"]),
                    "matchScore": result["score"],
                    "matchReasons": result["reasons"],
                    "gaps": result["gaps"],
                    "computedAt": datetime.now(timezone.utc),
                    "status": "new",
                }
            },
            upsert=True,
        )

    return {"scoredResults": results}


graph = StateGraph(AgentState)
graph.add_node("fetchJobs", fetch_jobs_node)
graph.add_node("scoreJobs", score_jobs_node)
graph.add_node("saveMatches", save_matches_node)

graph.add_edge(START, "fetchJobs")
graph.add_edge("fetchJobs", "scoreJobs")
graph.add_edge("scoreJobs", "saveMatches")
graph.add_edge("saveMatches", END)

matching_agent = graph.compile()


async def run_matching_agent(user_id: str, profile: dict):
    await matching_agent.ainvoke({"userId": user_id, "profile": profile})