import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
export default function Settings() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };
  return (
    <div className="max-w-[800px] mx-auto">
      <header className="mb-lg">
        <h2 className="font-headline-lg text-headline-lg text-primary mb-2">
          Settings
        </h2>
        <p className="text-on-surface-variant">
          Manage your professional profile and application preferences.
        </p>
      </header>

      <section className="bg-surface-container-lowest rounded-lg organic-shadow p-md mb-gutter">
        <h3 className="font-headline-md text-headline-md text-primary mb-6">
          Profile Information
        </h3>

        <div className="flex items-center gap-6 mb-8 p-4 bg-surface-container-low rounded-lg border border-outline-variant/10">
          <div className="relative group">
            <div className="h-20 w-20 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center overflow-hidden">
              <span className="material-symbols-outlined text-[32px]">
                person
              </span>
            </div>
            <button className="absolute bottom-0 right-0 bg-primary text-on-primary p-1.5 rounded-full organic-shadow hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[16px]">
                edit
              </span>
            </button>
          </div>
          <div>
            <p className="font-headline-md text-primary leading-tight">Name</p>
            <p className="text-on-surface-variant font-label-md">Profession</p>
            <p className="text-outline text-label-sm mt-1">email@example.com</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            <div className="space-y-2 group">
              <label className="font-label-md text-on-surface-variant group-focus-within:text-primary transition-colors">
                Full Name
              </label>
              <input
                className="w-full px-4 py-3 rounded-lg bg-surface border border-outline-variant/20 focus:border-primary focus:ring-0 transition-colors outline-none font-body-md"
                type="text"
                defaultValue=""
              />
            </div>
            <div className="space-y-2 group">
              <label className="font-label-md text-on-surface-variant group-focus-within:text-primary transition-colors">
                Email Address
              </label>
              <input
                className="w-full px-4 py-3 rounded-lg bg-surface border border-outline-variant/20 focus:border-primary focus:ring-0 transition-colors outline-none font-body-md"
                type="email"
                defaultValue=""
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface-container-lowest rounded-lg organic-shadow p-md mb-gutter">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-headline-md text-headline-md text-primary">
            Resume & Documents
          </h3>
          <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-label-sm font-semibold flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">
              check_circle
            </span>
            Verified
          </span>
        </div>

        <div className="border-2 border-dashed border-outline-variant/30 rounded-lg p-lg text-center bg-surface-container-low/50">
          <span className="material-symbols-outlined text-outline text-[48px] mb-4">
            upload_file
          </span>
          <p className="text-on-surface font-label-md mb-1">
            Your resume: <span className="font-bold">No file uploaded</span>
          </p>
          <p className="text-outline text-label-sm mb-6"></p>

          <button className="bg-primary text-on-primary px-6 py-2.5 rounded-lg font-label-md hover:opacity-90 transition-opacity active:scale-95 inline-flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]">
              refresh
            </span>
            Re-upload Resume
          </button>
        </div>
      </section>

      <section className="flex flex-col md:flex-row items-center justify-between gap-gutter mt-lg pt-lg border-t border-outline-variant/20">
        <div>
          <h4 className="font-label-md text-on-surface">Session Security</h4>
          <p className="text-label-sm text-outline">
            Manage your current login session and security settings.
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="px-8 py-2.5 rounded-lg border border-primary text-primary font-label-md hover:bg-surface-container-high transition-colors active:scale-95 flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-[20px]">logout</span>
          Log out
        </button>
      </section>
    </div>
  );
}
