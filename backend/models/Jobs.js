import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    source: { type: String, required: true },
    sourceId: { type: String, required: true },
    title: String,
    company: String,
    location: String,
    description: String,
    applyUrl: String,
    salary: String,
    postedAt: Date,
    fetchedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

jobSchema.index({ source: 1, sourceId: 1 }, { unique: true });

export default mongoose.model("Job", jobSchema);
