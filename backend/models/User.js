import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    googleId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    name: String,
    avatar: String,
    profile: {
      skills: [String],
      experience: String,
      education: String,
      projects: [String],
      rawResumeText: String,
    },
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
