import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function JobMatches() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loadMatches = async () => {
    try {
      const res = await api.get("/jobs/matches");
      setJobs(res.data.matches);
    } catch (err) {
      setError("Failed to load job matches");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMatches();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    setError("");
    try {
      const res = await api.post("/jobs/refresh-matches");
      setJobs(res.data.matches);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to refresh matches");
    } finally {
      setRefreshing(false);
    }
  };

  const handleGenerateCoverLetter = (jobId) => {
    navigate(`/cover-letter-review?jobId=${jobId}&mode=initial`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-on-surface-variant">Loading your matches...</p>
      </div>
    );
  }

  return (
    <>
      <section className="px-md py-4 bg-background border-b border-outline-variant/10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-label-sm font-label-sm text-outline uppercase tracking-wider">
            Sort by:
          </span>
          <select className="bg-transparent border-none font-label-md text-label-md text-primary cursor-pointer focus:ring-0 p-0 pr-8">
            <option>Match Score</option>
            <option>Date Posted</option>
          </select>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-primary text-primary text-label-md hover:bg-surface-container-low transition-colors disabled:opacity-50"
        >
          <span className="material-symbols-outlined text-base">refresh</span>
          {refreshing ? "Refreshing..." : "Refresh Matches"}
        </button>
      </section>

      {error && <p className="text-error text-label-sm px-md mt-2">{error}</p>}

      {jobs.length === 0 && !loading && !error && (
        <p className="text-on-surface-variant px-md mt-6">
          No matches yet — upload a resume or hit refresh to search.
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-gutter mt-4">
        {jobs.map((job) => (
          <div
            key={job.matchId}
            className="bg-surface-container-lowest rounded-lg p-6 organic-shadow hover:translate-y-[-2px] transition-all duration-200 flex flex-col gap-5 border border-transparent hover:border-outline-variant/20"
          >
            <div className="flex justify-between items-start">
              <div className="flex gap-4">
                <div className="h-12 w-12 rounded-lg bg-surface-container overflow-hidden flex items-center justify-center text-on-surface-variant font-bold text-lg">
                  {job.company?.charAt(0)}
                </div>
                <div>
                  <h3 className="font-headline-md text-label-md text-primary leading-tight">
                    {job.title}
                  </h3>
                  <p className="text-on-surface-variant text-label-sm">
                    {job.company} • {job.location}
                  </p>
                </div>
              </div>
              <div className="relative flex items-center justify-center">
                <svg className="w-12 h-12">
                  <circle
                    className="text-surface-container-high"
                    cx="24"
                    cy="24"
                    fill="transparent"
                    r="20"
                    stroke="currentColor"
                    strokeWidth="3"
                  ></circle>
                  <circle
                    className={
                      job.match >= 80
                        ? "text-secondary"
                        : "text-on-tertiary-container"
                    }
                    cx="24"
                    cy="24"
                    fill="transparent"
                    r="20"
                    stroke="currentColor"
                    strokeDasharray="125.6"
                    strokeDashoffset={125.6 - (125.6 * job.match) / 100}
                    strokeLinecap="round"
                    strokeWidth="3"
                    style={{
                      transform: "rotate(-90deg)",
                      transformOrigin: "50% 50%",
                      transition: "stroke-dashoffset 0.35s",
                    }}
                  ></circle>
                </svg>
                <span
                  className={`absolute text-[10px] font-bold ${
                    job.match >= 80
                      ? "text-secondary"
                      : "text-on-tertiary-container"
                  }`}
                >
                  {job.match}%
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-label-sm font-semibold text-outline tracking-wide uppercase">
                Why this matches
              </p>
              <ul className="space-y-2">
                {job.matchReasons?.map((reason, i) => (
                  <li
                    key={i}
                    className="flex gap-2 text-body-md text-on-surface-variant text-label-md leading-relaxed"
                  >
                    <span className="material-symbols-outlined text-secondary text-base shrink-0">
                      check_circle
                    </span>
                    {reason}
                  </li>
                ))}
                {job.gaps?.map((gap, i) => (
                  <li
                    key={`gap-${i}`}
                    className="flex gap-2 text-body-md text-on-surface-variant text-label-md leading-relaxed"
                  >
                    <span className="material-symbols-outlined text-on-tertiary-container text-base shrink-0">
                      info
                    </span>
                    {gap}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-auto pt-4 flex flex-col gap-3">
              <a
                href={job.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 bg-primary text-on-primary rounded-lg font-label-md text-label-md hover:opacity-90 transition-opacity text-center"
              >
                View Original Posting
              </a>
              <button
                onClick={() => handleGenerateCoverLetter(job.jobId)}
                className="w-full py-2.5 border border-primary text-primary rounded-lg font-label-md text-label-md hover:bg-surface-container-low transition-colors flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-base">
                  auto_awesome
                </span>
                Generate Cover Letter
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
