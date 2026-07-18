import { useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function ApplicationsDashboard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadApplications = async () => {
    try {
      const res = await api.get("/applications");
      setApplications(res.data.applications);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplications();
  }, []);

  const toggleComplete = async (id) => {
    // optimistic update
    setApplications((apps) =>
      apps.map((app) =>
        app.id === id
          ? { ...app, interviewCompleted: !app.interviewCompleted }
          : app,
      ),
    );

    try {
      await api.patch(`/applications/${id}/toggle-complete`);
    } catch (err) {
      // revert on failure
      setApplications((apps) =>
        apps.map((app) =>
          app.id === id
            ? { ...app, interviewCompleted: !app.interviewCompleted }
            : app,
        ),
      );
    }
  };

  const totalApplications = applications.length;
  const activeInterviews = applications.filter(
    (a) => a.status === "Applied" && !a.interviewCompleted,
  ).length;
  const successRate = totalApplications
    ? Math.round(
        (applications.filter((a) => a.interviewCompleted).length /
          totalApplications) *
          100,
      )
    : 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-on-surface-variant">Loading your applications...</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        <div className="bg-surface-container-lowest p-md rounded-xl organic-shadow space-y-sm">
          <p className="text-label-sm text-on-surface-variant font-medium">
            Total Applications
          </p>
          <div className="flex items-end justify-between">
            <h3 className="text-headline-xl font-bold">{totalApplications}</h3>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-md rounded-xl organic-shadow space-y-sm">
          <p className="text-label-sm text-on-surface-variant font-medium">
            Active Interviews
          </p>
          <div className="flex items-end justify-between">
            <h3 className="text-headline-xl font-bold">{activeInterviews}</h3>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-md rounded-xl organic-shadow space-y-sm">
          <p className="text-label-sm text-on-surface-variant font-medium">
            Completion Rate
          </p>
          <div className="flex items-end justify-between">
            <h3 className="text-headline-xl font-bold">{successRate}%</h3>
            <div className="w-24 h-2 bg-surface-container rounded-full mb-3 overflow-hidden">
              <div
                className="h-full bg-secondary"
                style={{ width: `${successRate}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-surface-container-lowest rounded-xl organic-shadow overflow-hidden mt-gutter">
        <div className="px-md py-md border-b border-outline-variant/10 flex justify-between items-center">
          <h4 className="text-label-md font-bold text-on-surface">
            Recent Applications
          </h4>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low/30">
              <th className="px-md py-4 text-label-sm font-semibold text-outline uppercase tracking-wider">
                Job Title
              </th>
              <th className="px-md py-4 text-label-sm font-semibold text-outline uppercase tracking-wider">
                Company
              </th>
              <th className="px-md py-4 text-label-sm font-semibold text-outline uppercase tracking-wider">
                Status
              </th>
              <th className="px-md py-4 text-label-sm font-semibold text-outline uppercase tracking-wider text-center">
                Interview Completed
              </th>
              <th className="px-md py-4 text-label-sm font-semibold text-outline uppercase tracking-wider text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/10">
            {applications.map((app) => (
              <tr
                key={app.id}
                className="hover:bg-surface-container-low/20 transition-colors group"
              >
                <td className="px-md py-5">
                  <div className="font-label-md text-on-surface font-semibold">
                    {app.title}
                  </div>
                  <div className="text-label-sm text-on-surface-variant/60">
                    {app.type}
                  </div>
                </td>
                <td className="px-md py-5 text-label-md text-on-surface">
                  {app.company}
                </td>
                <td className="px-md py-5">
                  <span
                    className={`px-3 py-1 rounded-full text-[12px] font-semibold ${
                      app.status === "Applied"
                        ? "bg-secondary/15 text-secondary"
                        : app.status === "Interviewing"
                          ? "bg-on-primary-container/15 text-on-primary-container"
                          : "bg-tertiary-container/15 text-on-tertiary-container"
                    }`}
                  >
                    {app.status}
                  </span>
                </td>
                <td className="px-md py-5 text-center">
                  <input
                    className="w-5 h-5 rounded-md border-outline-variant text-primary focus:ring-primary/20 transition-all cursor-pointer"
                    type="checkbox"
                    checked={app.interviewCompleted}
                    onChange={() => toggleComplete(app.id)}
                  />
                </td>
                <td className="px-md py-5 text-right">
                  <button
                    onClick={() =>
                      navigate(
                        `/cover-letter-review?jobId=${app.jobId}&mode=followup`,
                      )
                    }
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-primary text-primary text-label-sm font-label-sm hover:bg-surface-container-low transition-colors active:scale-[0.98]"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      forward_to_inbox
                    </span>
                    Follow Up
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-md py-md border-t border-outline-variant/10 flex items-center justify-between">
          <span className="text-label-sm text-on-surface-variant/60">
            Showing {applications.length} applications
          </span>
        </div>
      </div>
    </>
  );
}
