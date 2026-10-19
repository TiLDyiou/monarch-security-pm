import { LanguageProvider } from "@/i18n/LanguageContext";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import EarlyAccess from "./pages/early-access";
import Home from "./pages/home";
import PrivacyPolicyPage from "./pages/legal/privacy-&-policy";
import TermsAndConditionPage from "./pages/legal/terms-&-condition";
import NotFound from "./pages/not-found";
import Pricing from "./pages/pricing";
import ProfessionalPricing from "./pages/pricing/professional";
import StarterPricing from "./pages/pricing/starter";

// Ant Design Pro dashboard (Analysis, Monitor, Workplace), split out so the landing page stays light
const DashboardLayout = lazy(() => import("./pages/dashboard/layout"));
const DashboardAnalysis = lazy(() => import("./pages/dashboard/analysis"));
const DashboardMonitor = lazy(() => import("./pages/dashboard/monitor"));
const DashboardWorkplace = lazy(() => import("./pages/dashboard/workplace"));

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <BrowserRouter>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/pricing/starter" element={<StarterPricing />} />
              <Route path="/pricing/professional" element={<ProfessionalPricing />} />
              <Route path="/early-access" element={<EarlyAccess />} />
              <Route
                path="/dashboard"
                element={
                  <Suspense fallback={null}>
                    <DashboardLayout />
                  </Suspense>
                }
              >
                <Route index element={<Navigate to="/dashboard/analysis" replace />} />
                <Route path="analysis" element={<DashboardAnalysis />} />
                <Route path="monitor" element={<DashboardMonitor />} />
                <Route path="workplace" element={<DashboardWorkplace />} />
              </Route>
              <Route path="/legal/terms-&-condition" element={<TermsAndConditionPage />} />
              <Route path="/legal/privacy-policy" element={<PrivacyPolicyPage />} />
              {/* The cookie policy now lives inside the privacy policy */}
              <Route path="/legal/cookie-policy" element={<Navigate to="/legal/privacy-policy" replace />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
