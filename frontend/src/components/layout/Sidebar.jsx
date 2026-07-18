import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // adjust path to match your folder structure

const navItems = [
  { name: "Job Availables", path: "/job-matches", icon: "work" },
  { name: "Resume Analysis", path: "/resume-extraction", icon: "upload_file" },
  {
    name: "Cover Letter Generator",
    path: "/cover-letter-review",
    icon: "edit_note",
  },
  { name: "Applications", path: "/dashboard", icon: "description" },
  { name: "Settings", path: "/settings", icon: "settings" },
];

export default function Sidebar() {
  const location = useLocation();
  const { user } = useAuth();

  return (
    <aside className="flex flex-col h-full border-r border-outline-variant/10 w-64 fixed left-0 top-0 bg-surface dark:bg-surface-container shadow-sm z-50">
      <div className="px-md py-lg">
        <h1 className="text-headline-md font-headline-md font-bold text-primary dark:text-primary-fixed">
          JobPilot
        </h1>
        <p className="text-label-sm text-on-surface-variant/60 tracking-wider">
          ELEVATED UTILITY
        </p>
      </div>
      <nav className="flex-grow space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center space-x-sm px-6 py-4 transition-colors duration-200 ${
                isActive
                  ? "text-primary dark:text-primary-fixed font-bold border-r-4 border-primary dark:border-primary-fixed bg-surface-container-high dark:bg-surface-container-highest"
                  : "text-on-surface-variant dark:text-outline hover:bg-surface-container-low dark:hover:bg-surface-container active:scale-[0.98] transition-transform"
              }`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="font-label-md text-label-md">{item.name}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-md mt-auto">
        <div className="mt-md flex items-center space-x-sm p-sm">
          <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center overflow-hidden">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user.name || "User avatar"}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="material-symbols-outlined text-[16px]">
                person
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-label-sm font-bold">
              {user?.name || "User"}
            </span>
            <span className="text-[10px] text-on-surface-variant/60">
              {user?.profile?.currentTitle || "No title set"}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
