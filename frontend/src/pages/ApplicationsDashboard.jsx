import { useState } from 'react';

export default function ApplicationsDashboard({ initialApplications = [] }) {
  const [applications, setApplications] = useState(initialApplications);

  const toggleComplete = (id) => {
    setApplications(apps => apps.map(app =>
      app.id === id ? { ...app, interviewCompleted: !app.interviewCompleted } : app
    ));
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        <div className="bg-surface-container-lowest p-md rounded-xl organic-shadow space-y-sm">
          <p className="text-label-sm text-on-surface-variant font-medium">Total Applications</p>
          <div className="flex items-end justify-between">
            <h3 className="text-headline-xl font-bold">0</h3>
            <span className="text-secondary text-label-sm flex items-center mb-1">
              <span className="material-symbols-outlined text-sm mr-1">trending_up</span>
              0%
            </span>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-md rounded-xl organic-shadow space-y-sm">
          <p className="text-label-sm text-on-surface-variant font-medium">Active Interviews</p>
          <div className="flex items-end justify-between">
            <h3 className="text-headline-xl font-bold">0</h3>
            <span className="text-on-tertiary-container text-label-sm flex items-center mb-1">
              <span className="material-symbols-outlined text-sm mr-1">schedule</span>
              No active interviews
            </span>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-md rounded-xl organic-shadow space-y-sm">
          <p className="text-label-sm text-on-surface-variant font-medium">Success Rate</p>
          <div className="flex items-end justify-between">
            <h3 className="text-headline-xl font-bold">0%</h3>
            <div className="w-24 h-2 bg-surface-container rounded-full mb-3 overflow-hidden">
              <div className="h-full bg-secondary w-[0%]"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-surface-container-lowest rounded-xl organic-shadow overflow-hidden">
        <div className="px-md py-md border-b border-outline-variant/10 flex justify-between items-center">
          <h4 className="text-label-md font-bold text-on-surface">Recent Applications</h4>
          <div className="flex items-center space-x-base">
            <button className="px-4 py-2 text-label-sm border border-outline-variant/30 rounded-lg hover:bg-surface-container-low transition-colors">Filter</button>
            <button className="px-4 py-2 text-label-sm border border-outline-variant/30 rounded-lg hover:bg-surface-container-low transition-colors">Export</button>
          </div>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low/30">
              <th className="px-md py-4 text-label-sm font-semibold text-outline uppercase tracking-wider">Job Title</th>
              <th className="px-md py-4 text-label-sm font-semibold text-outline uppercase tracking-wider">Company</th>
              <th className="px-md py-4 text-label-sm font-semibold text-outline uppercase tracking-wider">Status</th>
              <th className="px-md py-4 text-label-sm font-semibold text-outline uppercase tracking-wider text-center">Interview Completed</th>
              <th className="px-md py-4 text-label-sm font-semibold text-outline uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/10">
            {applications.map((app) => (
              <tr key={app.id} className="hover:bg-surface-container-low/20 transition-colors group">
                <td className="px-md py-5">
                  <div className="font-label-md text-on-surface font-semibold">{app.title}</div>
                  <div className="text-label-sm text-on-surface-variant/60">{app.type}</div>
                </td>
                <td className="px-md py-5 text-label-md text-on-surface">{app.company}</td>
                <td className="px-md py-5">
                  <span className={`px-3 py-1 rounded-full text-[12px] font-semibold ${app.status === 'Applied' ? 'bg-secondary/15 text-secondary' :
                      app.status === 'Interviewing' ? 'bg-on-primary-container/15 text-on-primary-container' :
                        'bg-tertiary-container/15 text-on-tertiary-container'
                    }`}>
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
                  <button className="p-2 rounded-full hover:bg-surface-container-high transition-colors group/btn" title="Generate Cover Letter">
                    <span className="material-symbols-outlined text-outline group-hover/btn:text-primary">description</span>
                  </button>
                  <button className="p-2 rounded-full hover:bg-surface-container-high transition-colors relative">
                    <span className="material-symbols-outlined text-outline group-hover:text-primary">notifications</span>
                    {app.status === 'Interviewing' && (
                      <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full ring-2 ring-surface-container-lowest"></span>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-md py-md border-t border-outline-variant/10 flex items-center justify-between">
          <span className="text-label-sm text-on-surface-variant/60">Showing {applications.length} applications</span>
          <div className="flex space-x-2">
            <button className="p-2 rounded-lg border border-outline-variant/20 hover:bg-surface-container-low transition-colors disabled:opacity-30" disabled>
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="p-2 rounded-lg border border-outline-variant/20 hover:bg-surface-container-low transition-colors">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-secondary-container/30 border border-secondary/10 p-md rounded-xl flex items-start space-x-md">
        <div className="bg-secondary text-on-secondary p-2 rounded-lg">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
        </div>
        <div>
          <h5 className="text-label-md font-bold text-on-secondary-container">Pilot Insight</h5>
          <p className="text-label-sm text-on-secondary-container/80 mt-1">Your AI insights will appear here once you start adding applications.</p>
        </div>
        <button className="ml-auto text-secondary font-semibold text-label-sm hover:underline">Draft Follow-up</button>
      </div>
    </>
  );
}
