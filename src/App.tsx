import { FC, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { AdminProvider } from './contexts/AdminContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { LoadingState } from './components/ui/loading-state';

// Lazy load public pages
const Index = lazy(() => import('./pages/Index'));
const About = lazy(() => import('./pages/About'));
const Projects = lazy(() => import('./pages/Projects'));
const Donate = lazy(() => import('./pages/Donate'));
const Contact = lazy(() => import('./pages/Contact'));

// Lazy load public pages
const Impact = lazy(() => import("./pages/Impact"));
const ProjectsPage = lazy(() => import("./pages/Projects"));
const Journey = lazy(() => import("./pages/Journey"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Lazy load admin pages
const AdminLayout = lazy(() => import('./layouts/AdminLayout'));
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const AdminHomepage = lazy(() => import('./pages/admin/Homepage'));
const AdminImpact = lazy(() => import('./pages/admin/Impact'));
const AdminProjects = lazy(() => import('./pages/admin/Projects'));
const AdminDonate = lazy(() => import('./pages/admin/Donate'));
const AdminAbout = lazy(() => import('./pages/admin/About'));
const AdminJourney = lazy(() => import('./pages/admin/Journey'));
const AdminContact = lazy(() => import('./pages/admin/Contact'));
const AdminDonations = lazy(() => import('./pages/admin/Donations'));
const AdminMedia = lazy(() => import('./pages/admin/Media'));
const AdminUsers = lazy(() => import('./pages/admin/Users'));
const AdminSettings = lazy(() => import('./pages/admin/Settings'));
const AdminActivity = lazy(() => import('./pages/admin/Activity'));

export const App: FC = () => {
  return (
    <LanguageProvider>
      <ErrorBoundary>
        <AdminProvider>
          <Router>
            <Suspense fallback={<LoadingState />}>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Index />} />
                <Route path="/impact" element={<Impact />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/donate" element={<Donate />} />
                <Route path="/about" element={<About />} />
                <Route path="/journey" element={<Journey />} />
                <Route path="/contact" element={<Contact />} />

                {/* Admin Routes */}
                <Route path="/adminsea" element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="pages/home" element={<AdminHomepage />} />
                  <Route path="pages/impact" element={<AdminImpact />} />
                  <Route path="pages/projects" element={<AdminProjects />} />
                  <Route path="pages/donate" element={<AdminDonate />} />
                  <Route path="pages/about" element={<AdminAbout />} />
                  <Route path="pages/journey" element={<AdminJourney />} />
                  <Route path="pages/contact" element={<AdminContact />} />
                  <Route path="donations" element={<AdminDonations />} />
                  <Route path="media" element={<AdminMedia />} />
                  <Route path="users" element={<AdminUsers />} />
                  <Route path="settings" element={<AdminSettings />} />
                  <Route path="activity" element={<AdminActivity />} />
                </Route>

                {/* 404 Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </Router>
        </AdminProvider>
      </ErrorBoundary>
    </LanguageProvider>
  );
};
