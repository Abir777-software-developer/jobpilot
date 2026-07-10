import { useState } from 'react';

export default function ResumeExtraction({ initialSkills = [] }) {
  const [skills, setSkills] = useState(initialSkills);

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  return (
    <div className="max-w-[1000px] mx-auto pb-xl space-y-gutter">
      <nav className="flex items-center text-label-sm text-on-surface-variant/60 gap-2 mb-2">
        <a className="hover:text-primary" href="#">Applications</a>
        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        <span className="text-on-surface">Resume Upload</span>
      </nav>

      <section className="bg-surface-container-lowest rounded-xl organic-shadow p-lg border-2 border-dashed border-outline-variant/30 text-center transition-all hover:border-primary/30 group cursor-pointer">
        <div className="flex flex-col items-center justify-center max-w-md mx-auto py-8">
          <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center mb-md group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-primary text-[32px]">cloud_upload</span>
          </div>
          <h3 className="text-headline-md font-headline-md mb-2">Upload your resume</h3>
          <p className="text-on-surface-variant/70 mb-lg">Drag and drop your PDF or Word document here. Our AI will automatically extract your experience and skills to pre-fill your application.</p>
          <button className="bg-primary px-lg py-3 rounded-lg text-on-primary font-label-md transition-all hover:opacity-90 active:scale-[0.98]">
            Select File
          </button>
          <p className="mt-md text-label-sm text-on-surface-variant/50">Supported formats: .pdf, .docx, .txt (Max 5MB)</p>
        </div>
      </section>

      <section className="bg-surface-container-lowest rounded-xl organic-shadow overflow-hidden">
        <div className="p-md border-b border-outline-variant/10 flex justify-between items-center bg-surface-container-low/30">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-secondary text-[20px]">auto_awesome</span>
            </div>
            <h3 className="font-headline-md text-body-lg font-bold">Extraction Results</h3>
          </div>
          <span className="text-label-sm text-secondary font-bold px-3 py-1 bg-secondary/10 rounded-full flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">check_circle</span>
            AI Verified
          </span>
        </div>
        
        <div className="p-lg space-y-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            <div className="space-y-2">
              <label className="text-label-sm text-on-surface-variant uppercase tracking-wider font-bold">Full Name</label>
              <input className="w-full bg-white border border-outline-variant/20 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-all text-body-md" type="text" defaultValue="" />
            </div>
            <div className="space-y-2">
              <label className="text-label-sm text-on-surface-variant uppercase tracking-wider font-bold">Current Title</label>
              <input className="w-full bg-white border border-outline-variant/20 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-all text-body-md" type="text" defaultValue="" />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-label-sm text-on-surface-variant uppercase tracking-wider font-bold">Extracted Skills</label>
            <div className="flex flex-wrap gap-2 p-3 bg-surface-container-low/50 rounded-lg border border-outline-variant/10">
              {skills.map(skill => (
                <span key={skill} className="bg-white border border-outline-variant/30 px-3 py-1.5 rounded-full text-label-md flex items-center gap-2">
                  {skill}
                  <button onClick={() => removeSkill(skill)} className="material-symbols-outlined text-[16px] hover:text-error">close</button>
                </span>
              ))}
              <button className="px-3 py-1.5 rounded-full text-label-md text-primary border border-dashed border-primary/40 hover:bg-primary/5 transition-colors flex items-center gap-1">
                <span className="material-symbols-outlined text-[18px]">add</span>
                Add Skill
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-label-sm text-on-surface-variant uppercase tracking-wider font-bold">Experience</label>
              <button className="text-primary text-label-sm font-bold flex items-center gap-1 hover:underline">
                <span className="material-symbols-outlined text-[16px]">add</span>
                Add Position
              </button>
            </div>
            <div className="space-y-4">
              <div className="p-md bg-white border border-outline-variant/10 rounded-xl relative group">
                <div className="flex justify-between mb-4">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-surface-container-high rounded-lg flex items-center justify-center">
                      <span className="material-symbols-outlined text-on-surface-variant">business</span>
                    </div>
                    <div>
                      <input className="font-bold text-body-md focus:outline-none focus:border-b border-primary block w-full mb-1" type="text" defaultValue="" />
                      <input className="text-label-md text-on-surface-variant/70 focus:outline-none focus:border-b border-primary block w-full" type="text" defaultValue="" />
                    </div>
                  </div>
                  <button className="p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="material-symbols-outlined text-outline hover:text-error">delete</span>
                  </button>
                </div>
                <textarea className="w-full text-label-md text-on-surface-variant leading-relaxed focus:outline-none focus:border-primary p-2 rounded bg-surface-container-low/30 border-none resize-none" rows="3" defaultValue=""></textarea>
              </div>
            </div>
          </div>

        </div>
        <div className="p-md bg-surface-container-low/30 border-t border-outline-variant/10 flex justify-end gap-md">
          <button className="px-6 py-2.5 rounded-lg text-primary font-label-md border border-outline-variant/40 hover:bg-white transition-colors">
            Cancel
          </button>
          <button className="bg-primary-container text-on-primary px-10 py-2.5 rounded-lg font-label-md shadow-sm transition-all hover:opacity-90 active:scale-[0.98]">
            Finish
          </button>
        </div>
      </section>
    </div>
  );
}
