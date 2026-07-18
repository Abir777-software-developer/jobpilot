import Application from "../models/Application.js";

export const createApplication = async (req, res) => {
  try {
    const { jobId, coverLetterText } = req.body;
    const userId = req.user._id;

    const application = await Application.findOneAndUpdate(
      { userId, jobId },
      {
        userId,
        jobId,
        coverLetterText,
        status: "applied",
        appliedAt: new Date(),
        lastUpdated: new Date(),
      },
      { upsert: true, new: true },
    );

    res.status(200).json({ application });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to save application" });
  }
};

export const getApplications = async (req, res) => {
  try {
    const applications = await Application.find({ userId: req.user._id })
      .populate("jobId")
      .sort({ appliedAt: -1 });

    const formatted = applications
      .filter((a) => a.jobId)
      .map((a) => ({
        id: a._id,
        jobId: a.jobId._id,
        title: a.jobId.title,
        company: a.jobId.company,
        type: a.jobId.location || "N/A",
        status:
          a.status === "applied"
            ? "Applied"
            : a.status === "interviewing"
              ? "Interviewing"
              : "Completed",
        interviewCompleted: a.interviewCompleted,
        appliedAt: a.appliedAt,
      }));

    res.status(200).json({ applications: formatted });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch applications" });
  }
};

export const toggleInterviewCompleted = async (req, res) => {
  try {
    const { id } = req.params;

    const application = await Application.findOne({
      _id: id,
      userId: req.user._id,
    });
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    application.interviewCompleted = !application.interviewCompleted;
    application.status = application.interviewCompleted
      ? "completed"
      : "applied";
    application.lastUpdated = new Date();
    await application.save();

    res.status(200).json({ application });
  } catch (err) {
    res.status(500).json({ message: "Failed to update application" });
  }
};
