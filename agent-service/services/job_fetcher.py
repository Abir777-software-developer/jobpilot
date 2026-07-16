import os
import httpx
from datetime import datetime, timezone
from bson import ObjectId
from db import jobs_collection

async def fetch_and_cache_jobs(keywords: list[str]):
    app_id = os.getenv("ADZUNA_APP_ID")
    app_key = os.getenv("ADZUNA_APP_KEY")
    country = os.getenv("ADZUNA_COUNTRY", "in")

    query = " ".join(keywords[:5])
    url = f"https://api.adzuna.com/v1/api/jobs/{country}/search/1"

    params = {
        "app_id": app_id,
        "app_key": app_key,
        "what": query,
        "results_per_page": 20,
        # "content_type": "application/json",
    }

    async with httpx.AsyncClient() as client:
        response = await client.get(url, params=params, timeout=20)
        print(response.status_code, response.text,response.url)
        response.raise_for_status()
        data = response.json()

    results = data.get("results", [])
    saved_jobs = []

    for job in results:
        salary_min = job.get("salary_min")
        salary_max = job.get("salary_max")
        salary = (
            f"{round(salary_min)} - {round(salary_max or salary_min)}"
            if salary_min else "Not specified"
        )

        doc = {
            "source": "adzuna",
            "sourceId": job.get("id"),
            "title": job.get("title"),
            "company": (job.get("company") or {}).get("display_name", "Unknown"),
            "location": (job.get("location") or {}).get("display_name", ""),
            "description": job.get("description"),
            "applyUrl": job.get("redirect_url"),
            "salary": salary,
            "postedAt": job.get("created"),
            "fetchedAt": datetime.now(timezone.utc),
        }

        result = await jobs_collection.find_one_and_update(
            {"source": "adzuna", "sourceId": job.get("id")},
            {"$set": doc},
            upsert=True,
            return_document=True,
        )
        saved_jobs.append(result)

    return saved_jobs