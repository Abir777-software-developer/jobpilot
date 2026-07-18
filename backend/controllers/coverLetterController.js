import axios from "axios";
import Job from "../models/Jobs.js";

const AGENT_SERVICE_URL =
  process.env.AGENT_SERVICE_URL || "http://localhost:8000";

export const generateCoverLetter = async (req, res) => {
  try {
    const { jobId, mode = "initial" } = req.body;
    const user = req.user;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const { data } = await axios.post(
      `${AGENT_SERVICE_URL}/agent/cover-letter`,
      {
        userId: user._id.toString(),
        jobId: job._id.toString(),
        profile: {
          fullName: user.name || "",
          skills: user.profile?.skills || [],
          experience: user.profile?.experience || [],
          projects: user.profile?.projects || [],
          education: user.profile?.education || "",
          currentTitle: user.profile?.currentTitle || "",
        },
        jobDetails: {
          title: job.title,
          company: job.company,
          description: job.description || "",
        },
        mode,
      },
    );

    res.status(200).json({
      draft: data.draft,
      job: {
        jobId: job._id,
        title: job.title,
        company: job.company,
        description: job.description,
        applyUrl: job.applyUrl,
      },
    });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ message: "Failed to generate cover letter" });
  }
};
