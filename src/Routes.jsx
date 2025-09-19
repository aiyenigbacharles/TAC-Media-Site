import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import LoginPage from './pages/login';
import UserManagement from './pages/user-management';
import TeamScheduling from './pages/team-scheduling';
import Dashboard from './pages/dashboard';
import CommunicationCenter from './pages/communication-center';
import MediaLibrary from './pages/media-library';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<CommunicationCenter />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/team-scheduling" element={<TeamScheduling />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/communication-center" element={<CommunicationCenter />} />
        <Route path="/media-library" element={<MediaLibrary />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
