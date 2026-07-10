import { useState } from 'react';

export default function CoverLetterReview() {
  const [coverLetter, setCoverLetter] = useState('');

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col md:flex-row gap-gutter overflow-hidden">
      <div className="w-full md:w-1/3 flex flex-col gap-gutter h-full overflow-y-auto custom-scrollbar pr-sm">
        <div className="bg-surface-container-lowest rounded-lg organic-shadow p-md flex flex-col gap-sm">
          <div className="flex items-center gap-sm mb-xs">
            <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center border border-outline-variant/10">
              <span className="material-symbols-outlined text-primary text-[24px]">business</span>
            </div>
            <div>
              <h3 className="font-label-md text-primary">Senior Product Designer</h3>
              <p className="text-label-sm text-outline">Lumina Fintech Labs</p>
            </div>
          </div>
          <div className="space-y-sm">
            <div className="p-sm bg-surface-container-low rounded border border-outline-variant/20">
              <p className="text-label-sm font-bold text-on-surface-variant mb-xs">KEY REQUIREMENTS</p>
              <ul className="text-label-sm text-on-surface space-y-xs list-disc pl-sm">
                <li>5+ years in complex B2B SaaS design</li>
                <li>Expertise in Design Systems & Tokenization</li>
                <li>Ability to bridge brand and utility</li>
              </ul>
            </div>
            <div>
              <p className="text-label-sm font-bold text-on-surface-variant mb-xs">JOB SUMMARY</p>
              <p className="text-label-sm text-on-surface-variant leading-relaxed">
                Seeking a designer to spearhead our next-generation workspace sanctuary interface...
              </p>
            </div>
            <div className="pt-sm border-t border-outline-variant/10">
              <p className="text-label-sm font-bold text-on-surface-variant mb-xs">AI ANALYSIS</p>
              <div className="flex flex-wrap gap-xs">
                <span className="px-xs py-[2px] bg-secondary-container text-on-secondary-fixed-variant text-[10px] rounded uppercase tracking-wider font-bold">Strong Match</span>
                <span className="px-xs py-[2px] bg-tertiary-fixed text-on-tertiary-fixed-variant text-[10px] rounded uppercase tracking-wider font-bold">High Sentiment</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-surface-container-lowest rounded-lg organic-shadow p-md border-l-4 border-secondary">
          <div className="flex items-center gap-xs text-secondary mb-sm">
            <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
            <p className="font-label-md">Designer Tip</p>
          </div>
          <p className="text-label-sm text-on-surface-variant leading-relaxed italic">
            "Your experience with 'Workplace Sanctuary' aesthetics perfectly aligns with Lumina's brand philosophy. I've emphasized your focus on soft minimalism and utility in the draft."
          </p>
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
            <span className="material-symbols-outlined text-outline">description</span>
            <h4 className="font-label-md text-primary">cover_letter_draft_v1.docx</h4>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto custom-scrollbar p-lg">
          <div className="max-w-2xl mx-auto space-y-md h-full">
            <div className="flex flex-col gap-xs h-full">
              <p className="text-on-surface-variant">Dear Hiring Manager at Lumina Fintech Labs,</p>
              <textarea 
                className="flex-1 w-full border-none focus:ring-0 p-0 text-on-surface-variant leading-relaxed resize-none font-body-md bg-transparent" 
                spellCheck="false"
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        <div className="p-md border-t border-outline-variant/10 bg-surface-container-lowest flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-sm text-outline">
            <span className="material-symbols-outlined text-[18px]">history</span>
            <span className="text-label-sm">Last saved 2m ago</span>
          </div>
          <div className="flex gap-sm">
            <button className="px-md py-sm border border-primary text-primary rounded-lg font-label-md hover:bg-surface-container transition-colors active:scale-[0.98]">
              Regenerate
            </button>
            <button className="px-md py-sm bg-primary text-on-primary rounded-lg font-label-md hover:opacity-90 transition-opacity flex items-center gap-xs active:scale-[0.98]">
              Approve & Apply
              <span className="material-symbols-outlined text-[18px]">send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
