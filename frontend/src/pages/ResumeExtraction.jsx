import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
export default function ResumeExtraction() {
  const [skills, setSkills] = useState([]);
  const [fullName, setFullName] = useState("");
  const [currentTitle, setCurrentTitle] = useState("");
  const [experience, setExperience] = useState([]);
  const [projects, setProjects] = useState([]);
  const [education, setEducation] = useState("");
  const [rawText, setRawText] = useState("");
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [extracted, setExtracted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [hasNewUpload, setHasNewUpload] = useState(false);
  const { refetchUser } = useAuth();

  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await api.get("/resume/profile");
        const data = res.data;

        if (data.hasProfile) {
          setFullName(data.fullName);
          setCurrentTitle(data.currentTitle);
          setSkills(data.skills);
          setExperience(data.experience);
          setProjects(data.projects);
          setEducation(data.education);
          setRawText(data.rawText);
          setExtracted(true); // shows the results section immediately
        }
      } catch (err) {
        // no profile yet, that's fine — first-time user
      } finally {
        setInitialLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    setError("");
    setLoading(true);

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const res = await api.post("/resume/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const { extracted: data, rawText: text } = res.data;

      setFullName(data.fullName || "");
      setCurrentTitle(data.currentTitle || "");
      setSkills(data.skills || []);
      setExperience(data.experience || []);
      setProjects(data.projects || []);
      setEducation(data.education || "");
      setRawText(text || "");
      setExtracted(true);
      setHasNewUpload(true);
    } catch (err) {
      setError(
        err.response?.data?.message || "Extraction failed. Please try again.",
      );
      setFileName("");
    } finally {
      setLoading(false);
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  const addSkill = () => {
    const newSkill = prompt("Enter skill:");
    if (newSkill && newSkill.trim()) {
      setSkills([...skills, newSkill.trim()]);
    }
  };

  const updateExperience = (index, field, value) => {
    const updated = [...experience];
    updated[index] = { ...updated[index], [field]: value };
    setExperience(updated);
  };

  const removeExperience = (index) => {
    setExperience(experience.filter((_, i) => i !== index));
  };

  const addExperience = () => {
    setExperience([
      ...experience,
      { company: "", role: "", duration: "", description: "" },
    ]);
  };
  const updateProject = (index, field, value) => {
    const updated = [...projects];
    updated[index] = { ...updated[index], [field]: value };
    setProjects(updated);
  };

  const removeProject = (index) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  const addProject = () => {
    setProjects([...projects, { name: "", techStack: "", description: "" }]);
  };
  const handleFinish = async () => {
    setSaving(true);
    setError("");

    try {
      await api.post("/resume/save", {
        fullName,
        currentTitle,
        skills,
        experience,
        projects,
        education,
        rawText,
      });
      await refetchUser();
      await api.post("/jobs/refresh-matches");
      navigate("/job-matches");
      setHasNewUpload(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save profile.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFileName("");
    setExtracted(false);
    setProjects([]);
    setFullName("");
    setCurrentTitle("");
    setSkills([]);
    setExperience([]);
    setEducation("");
    setRawText("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  if (initialLoading) {
    return (
      <div className="max-w-[1000px] mx-auto pb-xl flex items-center justify-center py-20">
        <p className="text-on-surface-variant">Loading your profile...</p>
      </div>
    );
  }
  return (
    <div className="max-w-[1000px] mx-auto pb-xl space-y-gutter">
      <nav className="flex items-center text-label-sm text-on-surface-variant/60 gap-2 mb-2">
        <a className="hover:text-primary" href="#">
          Applications
        </a>
        <span className="material-symbols-outlined text-[16px]">
          chevron_right
        </span>
        <span className="text-on-surface">Resume Upload</span>
      </nav>

      <section
        onClick={() => fileInputRef.current?.click()}
        className="bg-surface-container-lowest rounded-xl organic-shadow p-lg border-2 border-dashed border-outline-variant/30 text-center transition-all hover:border-primary/30 group cursor-pointer"
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept=".pdf,.docx,.txt"
          className="hidden"
        />
        <div className="flex flex-col items-center justify-center max-w-md mx-auto py-8">
          <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center mb-md group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-primary text-[32px]">
              {loading ? "hourglass_empty" : "cloud_upload"}
            </span>
          </div>
          <h3 className="text-headline-md font-headline-md mb-2">
            {loading
              ? "Extracting your resume..."
              : fileName
                ? fileName
                : "Upload your resume"}
          </h3>
          <p className="text-on-surface-variant/70 mb-lg">
            {loading
              ? "This usually takes a few seconds."
              : "Drag and drop your PDF or Word document here. Our AI will automatically extract your experience and skills to pre-fill your application."}
          </p>
          {!loading && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
              className="bg-primary px-lg py-3 rounded-lg text-on-primary font-label-md transition-all hover:opacity-90 active:scale-[0.98]"
            >
              Select File
            </button>
          )}
          <p className="mt-md text-label-sm text-on-surface-variant/50">
            Supported formats: .pdf, .docx, .txt (Max 5MB)
          </p>
          {error && <p className="mt-md text-label-sm text-error">{error}</p>}
        </div>
      </section>

      {extracted && (
        <section className="bg-surface-container-lowest rounded-xl organic-shadow overflow-hidden">
          <div className="p-md border-b border-outline-variant/10 flex justify-between items-center bg-surface-container-low/30">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-secondary text-[20px]">
                  auto_awesome
                </span>
              </div>
              <h3 className="font-headline-md text-body-lg font-bold">
                Extraction Results
              </h3>
            </div>
            <span className="text-label-sm text-secondary font-bold px-3 py-1 bg-secondary/10 rounded-full flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">
                check_circle
              </span>
              AI Verified
            </span>
          </div>

          <div className="p-lg space-y-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
              <div className="space-y-2">
                <label className="text-label-sm text-on-surface-variant uppercase tracking-wider font-bold">
                  Full Name
                </label>
                <input
                  className="w-full bg-white border border-outline-variant/20 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-all text-body-md"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-label-sm text-on-surface-variant uppercase tracking-wider font-bold">
                  Current Title
                </label>
                <input
                  className="w-full bg-white border border-outline-variant/20 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-all text-body-md"
                  type="text"
                  value={currentTitle}
                  onChange={(e) => setCurrentTitle(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-label-sm text-on-surface-variant uppercase tracking-wider font-bold">
                Extracted Skills
              </label>
              <div className="flex flex-wrap gap-2 p-3 bg-surface-container-low/50 rounded-lg border border-outline-variant/10">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-white border border-outline-variant/30 px-3 py-1.5 rounded-full text-label-md flex items-center gap-2"
                  >
                    {skill}
                    <button
                      onClick={() => removeSkill(skill)}
                      className="material-symbols-outlined text-[16px] hover:text-error"
                    >
                      close
                    </button>
                  </span>
                ))}
                <button
                  onClick={addSkill}
                  className="px-3 py-1.5 rounded-full text-label-md text-primary border border-dashed border-primary/40 hover:bg-primary/5 transition-colors flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    add
                  </span>
                  Add Skill
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-label-sm text-on-surface-variant uppercase tracking-wider font-bold">
                  Experience
                </label>
                <button
                  onClick={addExperience}
                  className="text-primary text-label-sm font-bold flex items-center gap-1 hover:underline"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    add
                  </span>
                  Add Position
                </button>
              </div>
              <div className="space-y-4">
                {experience.map((exp, index) => (
                  <div
                    key={index}
                    className="p-md bg-white border border-outline-variant/10 rounded-xl relative group"
                  >
                    <div className="flex justify-between mb-4">
                      <div className="flex gap-4 flex-1">
                        <div className="w-12 h-12 bg-surface-container-high rounded-lg flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-on-surface-variant">
                            business
                          </span>
                        </div>
                        <div className="flex-1">
                          <input
                            className="font-bold text-body-md focus:outline-none focus:border-b border-primary block w-full mb-1"
                            type="text"
                            placeholder="Role"
                            value={exp.role || ""}
                            onChange={(e) =>
                              updateExperience(index, "role", e.target.value)
                            }
                          />
                          <input
                            className="text-label-md text-on-surface-variant/70 focus:outline-none focus:border-b border-primary block w-full"
                            type="text"
                            placeholder="Company · Duration"
                            value={`${exp.company || ""}${exp.duration ? " · " + exp.duration : ""}`}
                            onChange={(e) =>
                              updateExperience(index, "company", e.target.value)
                            }
                          />
                        </div>
                      </div>
                      <button
                        onClick={() => removeExperience(index)}
                        className="p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <span className="material-symbols-outlined text-outline hover:text-error">
                          delete
                        </span>
                      </button>
                    </div>
                    <textarea
                      className="w-full text-label-md text-on-surface-variant leading-relaxed focus:outline-none focus:border-primary p-2 rounded bg-surface-container-low/30 border-none resize-none"
                      rows="3"
                      value={exp.description || ""}
                      onChange={(e) =>
                        updateExperience(index, "description", e.target.value)
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-label-sm text-on-surface-variant uppercase tracking-wider font-bold">
                  Projects
                </label>
                <button
                  onClick={addProject}
                  className="text-primary text-label-sm font-bold flex items-center gap-1 hover:underline"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    add
                  </span>
                  Add Project
                </button>
              </div>
              <div className="space-y-4">
                {projects.map((proj, index) => (
                  <div
                    key={index}
                    className="p-md bg-white border border-outline-variant/10 rounded-xl relative group"
                  >
                    <div className="flex justify-between mb-4">
                      <div className="flex gap-4 flex-1">
                        <div className="w-12 h-12 bg-surface-container-high rounded-lg flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-on-surface-variant">
                            code
                          </span>
                        </div>
                        <div className="flex-1">
                          <input
                            className="font-bold text-body-md focus:outline-none focus:border-b border-primary block w-full mb-1"
                            type="text"
                            placeholder="Project Name"
                            value={proj.name || ""}
                            onChange={(e) =>
                              updateProject(index, "name", e.target.value)
                            }
                          />
                          <input
                            className="text-label-md text-on-surface-variant/70 focus:outline-none focus:border-b border-primary block w-full"
                            type="text"
                            placeholder="Tech Stack (e.g. MERN, LangGraph)"
                            value={proj.techStack || ""}
                            onChange={(e) =>
                              updateProject(index, "techStack", e.target.value)
                            }
                          />
                        </div>
                      </div>
                      <button
                        onClick={() => removeProject(index)}
                        className="p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <span className="material-symbols-outlined text-outline hover:text-error">
                          delete
                        </span>
                      </button>
                    </div>
                    <textarea
                      className="w-full text-label-md text-on-surface-variant leading-relaxed focus:outline-none focus:border-primary p-2 rounded bg-surface-container-low/30 border-none resize-none"
                      rows="3"
                      placeholder="Brief description of the project"
                      value={proj.description || ""}
                      onChange={(e) =>
                        updateProject(index, "description", e.target.value)
                      }
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-label-sm text-on-surface-variant uppercase tracking-wider font-bold">
                Education
              </label>
              <textarea
                className="w-full text-body-md focus:outline-none focus:border-primary p-3 rounded-lg bg-white border border-outline-variant/20 resize-none"
                rows="2"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
              />
            </div>
          </div>

          <div className="p-md bg-surface-container-low/30 border-t border-outline-variant/10 flex justify-end gap-md">
            <button
              onClick={handleCancel}
              disabled={saving || !hasNewUpload}
              className="px-6 py-2.5 rounded-lg text-primary font-label-md border border-outline-variant/40 hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              onClick={handleFinish}
              disabled={saving || !hasNewUpload}
              className="bg-primary-container text-on-primary px-10 py-2.5 rounded-lg font-label-md shadow-sm transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? "Finding matching jobs..." : "Finish"}
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
