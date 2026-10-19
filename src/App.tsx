import { LanguageProvider } from "@/i18n/LanguageContext";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/use-auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import BlogDashboard from "./pages/dashboard/blog";
import BlogEditor from "./pages/dashboard/blog/editor";
import ProfilePage from "./pages/dashboard/profile";
import EarlyAccess from "./pages/early-access";
import Home from "./pages/home";
import PrivacyPolicyPage from "./pages/legal/privacy-&-policy";
import TermsAndConditionPage from "./pages/legal/terms-&-condition";
import LoginPage from "./pages/login";
import NotFound from "./pages/not-found";
import Pricing from "./pages/pricing";
import ProfessionalPricing from "./pages/pricing/professional";
import StarterPricing from "./pages/pricing/starter";
import SignupPage from "./pages/signup";

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
            <AuthProvider>
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
                <Route path="/dashboard/profile" element={<ProfilePage />} />
                <Route path="/dashboard/blog" element={<BlogDashboard />} />
                <Route path="/dashboard/blog/new" element={<BlogEditor />} />
                <Route path="/dashboard/blog/edit/:id" element={<BlogEditor />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/legal/terms-&-condition" element={<TermsAndConditionPage />} />
                <Route path="/legal/privacy-policy" element={<PrivacyPolicyPage />} />
                {/* The cookie policy now lives inside the privacy policy */}
                <Route path="/legal/cookie-policy" element={<Navigate to="/legal/privacy-policy" replace />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AuthProvider>
          </BrowserRouter>
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
