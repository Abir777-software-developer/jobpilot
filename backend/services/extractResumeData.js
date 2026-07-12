//import { GoogleGenerativeAI } from "@google/generative-ai";
import Groq from "groq-sdk";
//const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function extractResumeData(rawText) {
  //const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `
You are a resume parser. Extract structured information from the resume text below.
Return ONLY valid JSON, no markdown formatting, no code fences, no extra commentary.

Schema:
{
  "fullName": string,
  "currentTitle": string,
  "skills": string[],
  "experience": [
    { "company": string, "role": string, "duration": string, "description": string }
  ],
  "projects": [
    { "name": string, "techStack": string, "description": string }
  ],
  "education": string
}

Resume text:
"""
${rawText}
"""
`;
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.2,
    response_format: { type: "json_object" }, // forces valid JSON output
  });
  //const result = await model.generateContent(prompt);
  const responseText = completion.choices[0].message.content;
  //const cleaned = responseText.replace(/```json|```/g, "").trim();

  // Strip accidental code fences if the model adds them anyway
  const cleaned = responseText.replace(/```json|```/g, "").trim();

  try {
    return JSON.parse(cleaned);
  } catch (err) {
    throw new Error("Failed to parse extraction result as JSON");
  }
}
