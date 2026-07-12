import { extractTextFromFile } from "../utils/parseFile.js";
import { extractResumeData } from "../services/extractResumeData.js";
import User from "../models/User.js";

// Step 1: upload + extract, return to frontend for review (not saved yet)
export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const rawText = await extractTextFromFile(req.file);
    const extracted = await extractResumeData(rawText);

    // Temporarily attach rawText too, useful for debugging/re-extraction later
    res.status(200).json({ extracted, rawText });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Resume extraction failed", error: err.message });
  }
};

// Step 2: user clicks "Finish" -> save confirmed/edited fields to DB
export const saveResumeProfile = async (req, res) => {
  try {
    const {
      fullName,
      currentTitle,
      skills,
      experience,
      education,
      projects,
      rawText,
    } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        name: fullName || req.user.name,
        profile: {
          skills,
          experience,
          education,
          projects,
          rawResumeText: rawText,
        },
      },
      { new: true },
    );

    res.status(200).json({ user: updatedUser });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Failed to save profile", error: err.message });
  }
};
export const getResumeProfile = async (req, res) => {
  try {
    const user = req.user; // already attached by `protect` middleware

    res.status(200).json({
      fullName: user.name || "",
      currentTitle: user.profile?.currentTitle || "",
      skills: user.profile?.skills || [],
      experience: user.profile?.experience || [],
      projects: user.profile?.projects || [],
      education: user.profile?.education || "",
      rawText: user.profile?.rawResumeText || "",
      hasProfile: !!(
        user.profile?.skills?.length || user.profile?.rawResumeText
      ),
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch profile" });
  }
};
