import { useState } from 'react';

export default function JobMatches({ initialJobs = [] }) {
  const [jobs] = useState(initialJobs);

  return (
    <>
      <section className="px-md py-4 bg-background border-b border-outline-variant/10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-label-sm font-label-sm text-outline uppercase tracking-wider">Sort by:</span>
          <select className="bg-transparent border-none font-label-md text-label-md text-primary cursor-pointer focus:ring-0 p-0 pr-8">
            <option>Match Score</option>
            <option>Date Posted</option>
          </select>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-gutter mt-4">
        {jobs.map((job) => (
          <div key={job.id} className="bg-surface-container-lowest rounded-lg p-6 organic-shadow hover:translate-y-[-2px] transition-all duration-200 flex flex-col gap-5 border border-transparent hover:border-outline-variant/20">
            <div className="flex justify-between items-start">
              <div className="flex gap-4">
                <div className="h-12 w-12 rounded-lg bg-surface-container overflow-hidden flex items-center justify-center text-on-surface-variant font-bold text-lg">
                  {job.company.charAt(0)}
                </div>
                <div>
                  <h3 className="font-headline-md text-label-md text-primary leading-tight">{job.title}</h3>
                  <p className="text-on-surface-variant text-label-sm">{job.company} • {job.location}</p>
                </div>
              </div>
              <div className="relative flex items-center justify-center">
                <svg className="w-12 h-12">
                  <circle className="text-surface-container-high" cx="24" cy="24" fill="transparent" r="20" stroke="currentColor" strokeWidth="3"></circle>
                  <circle 
                    className={job.match >= 80 ? 'text-secondary' : 'text-on-tertiary-container'} 
                    cx="24" cy="24" fill="transparent" r="20" stroke="currentColor" 
                    strokeDasharray="125.6" 
                    strokeDashoffset={125.6 - (125.6 * job.match / 100)} 
                    strokeLinecap="round" strokeWidth="3"
                    style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%', transition: 'stroke-dashoffset 0.35s' }}
                  ></circle>
                </svg>
                <span className={`absolute text-[10px] font-bold ${job.match >= 80 ? 'text-secondary' : 'text-on-tertiary-container'}`}>{job.match}%</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <p className="text-label-sm font-semibold text-outline tracking-wide uppercase">Why this matches</p>
              <ul className="space-y-2">
                <li className="flex gap-2 text-body-md text-on-surface-variant text-label-md leading-relaxed">
                  <span className="material-symbols-outlined text-secondary text-base shrink-0">check_circle</span>
                  Strong fit for your background in related fields.
                </li>
                <li className="flex gap-2 text-body-md text-on-surface-variant text-label-md leading-relaxed">
                  <span className="material-symbols-outlined text-secondary text-base shrink-0">check_circle</span>
                  Work policy matches your preferences.
                </li>
                {job.match < 80 && (
                  <li className="flex gap-2 text-body-md text-on-surface-variant text-label-md leading-relaxed">
                    <span className="material-symbols-outlined text-on-tertiary-container text-base shrink-0">info</span>
                    Requires additional experience or relocation.
                  </li>
                )}
              </ul>
            </div>
            
            <div className="mt-auto pt-4 flex flex-col gap-3">
              <button className="w-full py-2.5 bg-primary text-on-primary rounded-lg font-label-md text-label-md hover:opacity-90 transition-opacity">
                Apply Now
              </button>
              <button className="w-full py-2.5 border border-primary text-primary rounded-lg font-label-md text-label-md hover:bg-surface-container-low transition-colors flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-base">auto_awesome</span>
                Generate Cover Letter
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
