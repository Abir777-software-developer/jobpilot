import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    googleId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    name: String,

    currentTitle: String,
    hasSeenTutorial: { type: Boolean, default: false },
    avatar: String,
    profile: {
      skills: [String],
      experience: [
        {
          company: String,
          role: String,
          duration: String,
          description: String,
        },
      ],
      education: String,
      projects: [{ name: String, techStack: String, description: String }],
      rawResumeText: String,
    },
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
