import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

export default function MainLayout() {
  const location = useLocation();
  
  // A simple mapping to determine the title based on the route
  const getPageTitle = (path) => {
    switch (path) {
      case '/': return 'Applications';
      case '/job-matches': return 'Job Availables';
      case '/resume-extraction': return 'Resume Analysis';
      case '/cover-letter-review': return 'Cover Letter Generator';
      case '/settings': return 'Settings';
      default: return 'JobPilot';
    }
  };

  return (
    <div className="bg-background text-on-surface antialiased">
      <Sidebar />
      <main className="ml-64 min-h-screen">
        <Header title={getPageTitle(location.pathname)} showSearch={location.pathname === '/'} />
        <div className="max-w-container-max mx-auto p-md space-y-md">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
