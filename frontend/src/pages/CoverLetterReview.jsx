import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function CoverLetterReview() {
  const [searchParams] = useSearchParams();
  const jobId = searchParams.get("jobId");
  const mode = searchParams.get("mode") || "initial";
  const navigate = useNavigate();

  const [coverLetter, setCoverLetter] = useState("");
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [regenerating, setRegenerating] = useState(false);
  const [approving, setApproving] = useState(false);
  const [error, setError] = useState("");

  const generateDraft = async () => {
    try {
      const res = await api.post("/coverletter/generate", {
        jobId,
        mode,
      });
      setCoverLetter(res.data.draft);
      setJob(res.data.job);
    } catch (err) {
      setError("Failed to generate cover letter. Please try again.");
    }
  };

  useEffect(() => {
    if (!jobId) {
      setError("No job selected.");
      setLoading(false);
      return;
    }
    generateDraft().finally(() => setLoading(false));
  }, [jobId]);

  const handleRegenerate = async () => {
    setRegenerating(true);
    setError("");
    await generateDraft();
    setRegenerating(false);
  };

  const handleApprove = async () => {
    setApproving(true);
    setError("");
    try {
      await api.post("/applications/create", {
        jobId,
        coverLetterText: coverLetter,
      });
      navigate("/dashboard");
    } catch (err) {
      setError("Failed to save application.");
    } finally {
      setApproving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-140px)]">
        <p className="text-on-surface-variant">
          Generating your cover letter...
        </p>
      </div>
    );
  }

  if (error && !job) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-140px)]">
        <p className="text-error">{error}</p>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col md:flex-row gap-gutter overflow-hidden">
      <div className="w-full md:w-1/3 flex flex-col gap-gutter h-full overflow-y-auto custom-scrollbar pr-sm">
        <div className="bg-surface-container-lowest rounded-lg organic-shadow p-md flex flex-col gap-sm">
          <div className="flex items-center gap-sm mb-xs">
            <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center border border-outline-variant/10">
              <span className="material-symbols-outlined text-primary text-[24px]">
                business
              </span>
            </div>
            <div>
              <h3 className="font-label-md text-primary">{job?.title}</h3>
              <p className="text-label-sm text-outline">{job?.company}</p>
            </div>
          </div>
          <div className="space-y-sm">
            <div>
              <p className="text-label-sm font-bold text-on-surface-variant mb-xs">
                JOB SUMMARY
              </p>
              <p className="text-label-sm text-on-surface-variant leading-relaxed line-clamp-6">
                {job?.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full md:w-2/3 flex flex-col bg-surface-container-lowest rounded-lg organic-shadow relative overflow-hidden h-full">
        <div className="absolute top-4 right-4 z-10">
          <span className="px-sm py-xs bg-tertiary-fixed text-on-tertiary-fixed-variant text-label-sm rounded-full flex items-center gap-xs">
            <span className="material-symbols-outlined text-[14px]">info</span>
            Review before sending
          </span>
        </div>

        <div className="px-md pt-md pb-sm border-b border-outline-variant/10">
          <div className="flex items-center gap-sm">
            <span className="material-symbols-outlined text-outline">
              description
            </span>
            <h4 className="font-label-md text-primary">
              cover_letter_draft.txt
            </h4>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-lg">
          <div className="max-w-2xl mx-auto space-y-md h-full">
            <div className="flex flex-col gap-xs h-full">
              <p className="text-on-surface-variant">
                Dear Hiring Manager at {job?.company},
              </p>
              <textarea
                className="flex-1 w-full border-none focus:ring-0 p-0 text-on-surface-variant leading-relaxed resize-none font-body-md bg-transparent"
                spellCheck="false"
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
              />
            </div>
          </div>
        </div>

        {error && (
          <p className="text-error text-label-sm px-lg pb-2">{error}</p>
        )}

        <div className="p-md border-t border-outline-variant/10 bg-surface-container-lowest flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-sm text-outline">
            <a
              href={job?.applyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-label-sm hover:underline"
            >
              View original posting
            </a>
          </div>
          <div className="flex gap-sm">
            <button
              onClick={handleRegenerate}
              disabled={regenerating || approving}
              className="px-md py-sm border border-primary text-primary rounded-lg font-label-md hover:bg-surface-container transition-colors active:scale-[0.98] disabled:opacity-50"
            >
              {regenerating ? "Regenerating..." : "Regenerate"}
            </button>
            <button
              onClick={handleApprove}
              disabled={approving || regenerating}
              className="px-md py-sm bg-primary text-on-primary rounded-lg font-label-md hover:opacity-90 transition-opacity flex items-center gap-xs active:scale-[0.98] disabled:opacity-50"
            >
              {approving ? "Saving..." : "Approve & Apply"}
              <span className="material-symbols-outlined text-[18px]">
                send
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
