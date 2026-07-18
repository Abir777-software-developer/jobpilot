import os
import json
from groq import Groq

groq_client = Groq(api_key=os.getenv("GROQ_API_KEY"))

async def generate_cover_letter(profile: dict, job: dict, mode: str):
    if mode == "followup":
        tone_instruction = """
            This is a FOLLOW-UP message. The candidate has ALREADY applied for this position.

            - Open by referencing that they applied previously (e.g. "I recently applied for...").
            - Thank them for their time, politely ask for a status update, close with continued interest.
            - Mention AT MOST ONE specific qualification, briefly, in a single clause.
            - Do NOT re-explain the candidate's full background, education, or tech stack.
            - Do NOT sound like a second cover letter.
        """
        length_requirement = "Maximum 100 words. Do not exceed this."
        content_requirement = "Mention at most one specific skill or project, briefly — do not list multiple."
    else:
        tone_instruction = """
            This is the FIRST application.

            - Introduce the candidate.
            - Connect their experience to the role.
            - Show enthusiasm for the company.
            - End by expressing interest in discussing the role further.
        """
        length_requirement = "150-220 words."
        content_requirement = "Mention specific skills, projects and experience, and relate them to the job description."

    prompt = f"""
            You are an expert career coach and professional cover letter writer.

            Instructions:
            {tone_instruction}

            Write ONLY the body of the message.
            Do NOT include:
            - Dear Hiring Manager
            - Subject
            - Regards
            - Signature
            - Markdown

            Requirements:
            - {length_requirement}
            - Professional but natural
            - Use first person
            - Mention the candidate's name only once in the opening paragraph
            - {content_requirement}
            - Do not invent experience or skills
            - Avoid generic phrases and repetition

            Candidate:
            Name: {profile.get("fullName","")}
            Current Title: {profile.get("currentTitle","")}
            Skills: {", ".join(profile.get("skills", []))}
            Experience: {json.dumps(profile.get("experience", []))}
            Projects: {json.dumps(profile.get("projects", []))}
            Education: {profile.get("education","")}

            Job:
            Title: {job.get("title")}
            Company: {job.get("company")}
            Description:
            {job.get("description","")[:1000]}

            Return ONLY the message body.
            """

    completion = groq_client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.4,
    )

    return completion.choices[0].message.content.strip()