import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Login from "./pages/Login";
import ApplicationsDashboard from "./pages/ApplicationsDashboard";
import JobMatches from "./pages/JobMatches";
import CoverLetterReview from "./pages/CoverLetterReview";
import ResumeExtraction from "./pages/ResumeExtraction";
import Settings from "./pages/Settings";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<ApplicationsDashboard />} />
          <Route path="/job-matches" element={<JobMatches />} />
          <Route path="/cover-letter-review" element={<CoverLetterReview />} />
          <Route path="/resume-extraction" element={<ResumeExtraction />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
