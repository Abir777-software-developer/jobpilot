import mongoose from "mongoose";

const jobMatchSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    matchScore: { type: Number, required: true },
    matchReasons: [String],
    gaps: [String],
    computedAt: { type: Date, default: Date.now },
    status: { type: String, enum: ["new", "seen"], default: "new" },
  },
  { timestamps: true },
);

jobMatchSchema.index({ userId: 1, jobId: 1 }, { unique: true });

export default mongoose.model("JobMatch", jobMatchSchema);
