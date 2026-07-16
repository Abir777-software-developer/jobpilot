import os
import json
from groq import Groq

groq_client = Groq(api_key=os.getenv("GROQ_API_KEY"))

async def score_jobs_against_profile(jobs: list[dict], profile: dict):
    condensed_jobs = [
        {
            "jobId": str(j["_id"]),
            "title": j.get("title"),
            "company": j.get("company"),
            "description": (j.get("description") or "")[:600],
        }
        for j in jobs
    ]

    prompt = f"""
You are a job-matching assistant. Given a candidate profile and a list of jobs,
score each job's fit for the candidate from 0-100, and give 2-3 short reasons
why it matches, plus any notable gaps.

Return ONLY a valid JSON object with this exact shape, no markdown, no commentary:
{{
  "results": [
    {{ "jobId": string, "score": number, "reasons": string[], "gaps": string[] }}
  ]
}}

Candidate profile:
Skills: {", ".join(profile.get("skills", []))}
Experience: {json.dumps(profile.get("experience", []))}
Projects: {json.dumps(profile.get("projects", []))}
Education: {profile.get("education", "")}

Jobs:
{json.dumps(condensed_jobs)}
"""

    completion = groq_client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.2,
        response_format={"type": "json_object"},
    )

    raw = completion.choices[0].message.content
    cleaned = raw.replace("```json", "").replace("```", "").strip()
    parsed = json.loads(cleaned)

    return parsed.get("results", [])