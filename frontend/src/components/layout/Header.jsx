import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext"; // adjust path to match your structure
import api from "../../api/axios";

const tutorialSteps = [
  {
    icon: "upload_file",
    title: "Upload Your Resume",
    description:
      "Start by uploading your resume on the Resume Analysis page. Our AI extracts your skills, experience, and projects automatically — review and edit before saving.",
  },
  {
    icon: "work",
    title: "Get Matched Jobs",
    description:
      "Once your profile is saved, head to Job Availables to see ranked job matches with a fit score and reasons why each one suits you. Hit Refresh Matches anytime to search for new listings.",
  },
  {
    icon: "edit_note",
    title: "Generate a Cover Letter",
    description:
      'Click "Generate Cover Letter" on any job card. Review the AI-drafted letter, edit it freely, or hit Regenerate for a new version — nothing is sent until you approve it.',
  },
  {
    icon: "description",
    title: "Track Your Applications",
    description:
      "Approved applications show up on your Applications dashboard. Mark interviews as completed, and use Follow Up to generate a polite check-in message anytime.",
  },
  {
    icon: "settings",
    title: "Update Anytime",
    description:
      "Head to Settings to re-upload a newer resume — your profile and future job matches will update accordingly.",
  },
];

export default function Header({ title, showSearch }) {
  const { user, refetchUser } = useAuth();
  const [showTutorial, setShowTutorial] = useState(false);
  const [step, setStep] = useState(0);

  // Auto-open once for first-time users
  useEffect(() => {
    if (user && user.hasSeenTutorial === false) {
      setShowTutorial(true);
    }
  }, [user]);

  const closeTutorial = async () => {
    setShowTutorial(false);
    setStep(0);

    // Only hit the API if this was their first time seeing it
    if (user && user.hasSeenTutorial === false) {
      try {
        await api.post("/auth/tutorial-seen");
        await refetchUser();
      } catch (err) {
        // fail silently — not critical if this doesn't save
      }
    }
  };

  const nextStep = () => {
    if (step < tutorialSteps.length - 1) {
      setStep(step + 1);
    } else {
      closeTutorial();
    }
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  const current = tutorialSteps[step];

  return (
    <>
      <header className="flex justify-between items-center h-16 px-md bg-background/80 backdrop-blur-md sticky top-0 z-40">
        <div className="flex items-center">
          <h2 className="text-headline-md font-headline-md font-semibold text-primary">
            {title}
          </h2>
        </div>
        <div className="flex items-center space-x-lg">
          {showSearch && (
            <div className="relative group">
              <div className="flex items-center bg-surface-container-low px-4 py-2 rounded-full border border-outline-variant/20 focus-within:border-primary transition-all">
                <span className="material-symbols-outlined text-outline mr-2">
                  search
                </span>
                <input
                  className="bg-transparent border-none focus:ring-0 text-label-md w-64 p-0 outline-none"
                  placeholder="Search..."
                  type="text"
                />
              </div>
            </div>
          )}
          <div className="flex items-center space-x-md">
            <div className="relative cursor-pointer hover:text-primary transition-colors">
              {/* <span className="material-symbols-outlined">notifications</span> */}
              {/* <span className="absolute top-0 right-0 w-2 h-2 bg-error rounded-full"></span> */}
            </div>
            <span
              onClick={() => setShowTutorial(true)}
              className="material-symbols-outlined cursor-pointer hover:text-primary transition-colors"
            >
              help_outline
            </span>
          </div>
        </div>
      </header>

      {showTutorial && (
        <div
          className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
          onClick={closeTutorial}
        >
          <div
            className="bg-surface-container-lowest rounded-xl organic-shadow max-w-md w-full p-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeTutorial}
              className="absolute top-4 right-4 text-outline hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <div className="w-14 h-14 rounded-full bg-primary-container flex items-center justify-center mb-md">
              <span className="material-symbols-outlined text-on-primary text-[28px]">
                {current.icon}
              </span>
            </div>

            <h3 className="text-headline-md font-headline-md text-primary mb-2">
              {current.title}
            </h3>
            <p className="text-on-surface-variant text-body-md leading-relaxed mb-lg">
              {current.description}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex gap-1.5">
                {tutorialSteps.map((_, i) => (
                  <span
                    key={i}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      i === step ? "bg-primary" : "bg-outline-variant/30"
                    }`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                {step > 0 && (
                  <button
                    onClick={prevStep}
                    className="px-4 py-2 rounded-lg border border-outline-variant/30 text-on-surface-variant text-label-md hover:bg-surface-container-low transition-colors"
                  >
                    Back
                  </button>
                )}
                <button
                  onClick={nextStep}
                  className="px-5 py-2 rounded-lg bg-primary text-on-primary text-label-md hover:opacity-90 transition-opacity"
                >
                  {step === tutorialSteps.length - 1 ? "Got it" : "Next"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
