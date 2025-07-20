import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
// Add your imports here
import AuthenticationPortal from "./pages/authentication-portal";
import AIResearchChat from "./pages/ai-research-chat";
import AnalyticsDashboard from "./pages/analytics-dashboard";
import SettingsPreferences from "./pages/settings-preferences";
import AppStartupPreloader from "./pages/app-startup-preloader";
import NotFound from "./pages/NotFound";
import RiskRoboLanding from "./pages/RiskRoboLanding";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<RiskRoboLanding />} />
        <Route path="/authentication-portal" element={<AuthenticationPortal />} />
        <Route path="/ai-research-chat" element={<AIResearchChat />} />
        <Route path="/analytics-dashboard" element={<AnalyticsDashboard />} />
        <Route path="/settings-preferences" element={<SettingsPreferences />} />
        <Route path="/app-startup-preloader" element={<AppStartupPreloader />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;