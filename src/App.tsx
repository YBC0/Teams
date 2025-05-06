import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Suspense, lazy, useEffect } from "react";
import { HelmetProvider } from 'react-helmet-async';
import { initPerformanceMonitoring } from '@/utils/performance';
import { PerformanceMonitor } from '@/components/dev/performance-monitor';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { LoadingState } from '@/components/ui/loading-state';
import { ROUTES } from '@/constants';
import { logger } from '@/utils/logger';

// Lazy load all pages
const Index = lazy(() => import("./pages/Index"));
const Impact = lazy(() => import("./pages/Impact"));
const Projects = lazy(() => import("./pages/Projects"));
const Donate = lazy(() => import("./pages/Donate"));
const About = lazy(() => import("./pages/About"));
const Journey = lazy(() => import("./pages/Journey"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Loading component
const PageLoader = () => <LoadingState fullScreen size="lg" />;

/**
 * Configure Query Client with sensible defaults
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

/**
 * Main App component with router and providers
 */
const App = () => {
  useEffect(() => {
    try {
      initPerformanceMonitoring();
      logger.info('Application initialized successfully');
    } catch (error) {
      logger.error('Failed to initialize application', error);
    }
  }, []);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <LanguageProvider>
            <ErrorBoundary>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Suspense fallback={<PageLoader />}>
                  <Routes>
                    <Route path={ROUTES.home} element={<Index />} />
                    <Route path={ROUTES.impact} element={<Impact />} />
                    <Route path={ROUTES.projects} element={<Projects />} />
                    <Route path={ROUTES.donate} element={<Donate />} />
                    <Route path={ROUTES.about} element={<About />} />
                    <Route path={ROUTES.journey} element={<Journey />} />
                    <Route path={ROUTES.contact} element={<Contact />} />
                    <Route path={ROUTES.notFound} element={<NotFound />} />
                  </Routes>
                </Suspense>
              </BrowserRouter>
              <PerformanceMonitor />
            </ErrorBoundary>
          </LanguageProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
