import axios from "axios";
import JobMatch from "../models/JobMatches.js";
import Job from "../models/Jobs.js";

const AGENT_SERVICE_URL =
  process.env.AGENT_SERVICE_URL || "http://localhost:8000";

export const refreshMatches = async (req, res) => {
  try {
    const user = req.user;

    if (!user.profile?.skills?.length) {
      return res.status(400).json({ message: "Please upload a resume first" });
    }

    await axios.post(`${AGENT_SERVICE_URL}/agent/match`, {
      userId: user._id.toString(),
      profile: {
        skills: user.profile.skills || [],
        experience: user.profile.experience || [],
        projects: user.profile.projects || [],
        education: user.profile.education || "",
        currentTitle: user.profile.currentTitle || "",
      },
    });

    const matches = await getPopulatedMatches(user._id);
    res.status(200).json({ matches });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ message: "Failed to refresh job matches" });
  }
};

export const getMatches = async (req, res) => {
  try {
    const matches = await getPopulatedMatches(req.user._id);
    res.status(200).json({ matches });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch matches" });
  }
};

async function getPopulatedMatches(userId) {
  const matches = await JobMatch.find({ userId })
    .populate("jobId")
    .sort({ matchScore: -1 });

  return matches
    .filter((m) => m.jobId)
    .map((m) => ({
      matchId: m._id,
      jobId: m.jobId._id,
      title: m.jobId.title,
      company: m.jobId.company,
      location: m.jobId.location,
      applyUrl: m.jobId.applyUrl,
      match: m.matchScore,
      matchReasons: m.matchReasons,
      gaps: m.gaps,
      computedAt: m.computedAt,
    }));
}
