import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from './context/ThemeContext';

// Lazy-loaded pages for optimal bundle splitting and Lighthouse performance
const LandingPage = lazy(() =>
  import('./pages/LandingPage').then((m) => ({ default: m.LandingPage }))
);
const HowItWorksPage = lazy(() =>
  import('./pages/HowItWorksPage').then((m) => ({ default: m.HowItWorksPage }))
);
const LoginPage = lazy(() =>
  import('./pages/LoginPage').then((m) => ({ default: m.LoginPage }))
);
const DashboardPage = lazy(() =>
  import('./pages/DashboardPage').then((m) => ({ default: m.DashboardPage }))
);
const CreateProjectPage = lazy(() =>
  import('./pages/CreateProjectPage').then((m) => ({ default: m.CreateProjectPage }))
);
const IdeasPage = lazy(() =>
  import('./pages/IdeasPage').then((m) => ({ default: m.IdeasPage }))
);
const SavedIdeasPage = lazy(() =>
  import('./pages/SavedIdeasPage').then((m) => ({ default: m.SavedIdeasPage }))
);
const ProjectDetailsPage = lazy(() =>
  import('./pages/ProjectDetailsPage').then((m) => ({ default: m.ProjectDetailsPage }))
);
const BlueprintPage = lazy(() =>
  import('./pages/BlueprintPage').then((m) => ({ default: m.BlueprintPage }))
);
const MentorPage = lazy(() =>
  import('./pages/MentorPage').then((m) => ({ default: m.MentorPage }))
);
const RoadmapPage = lazy(() =>
  import('./pages/RoadmapPage').then((m) => ({ default: m.RoadmapPage }))
);
const SettingsPage = lazy(() =>
  import('./pages/SettingsPage').then((m) => ({ default: m.SettingsPage }))
);

// Fallback Loader
const RouteLoadingFallback: React.FC = () => (
  <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-center p-4">
    <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center mb-3 animate-pulse text-cyan-400">
      <Sparkles className="w-6 h-6" />
    </div>
    <div className="text-xs font-mono text-slate-400 tracking-wider uppercase">
      Loading Workspace Module...
    </div>
  </div>
);

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <Suspense fallback={<RouteLoadingFallback />}>
          <Routes>
            {/* Public Pages */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Application Workspace Pages */}
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/create-project" element={<CreateProjectPage />} />
            <Route path="/ideas" element={<IdeasPage />} />
            <Route path="/ideas/saved" element={<SavedIdeasPage />} />
            <Route path="/project/:id" element={<ProjectDetailsPage />} />
            <Route path="/project/:id/blueprint" element={<BlueprintPage />} />
            <Route path="/mentor" element={<MentorPage />} />
            <Route path="/roadmap" element={<RoadmapPage />} />
            <Route path="/settings" element={<SettingsPage />} />

            {/* Catch-all fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
        <Analytics />
      </Router>
    </ThemeProvider>
  );
};

export default App;
