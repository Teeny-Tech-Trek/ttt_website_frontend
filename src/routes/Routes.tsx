// src/routes/AppRoutes.tsx
import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import HomePage from '../pages/public/HomePage';
import BookConsultation from '../pages/public/BookConsultation';
import BlogSingleView from '../pages/public/BlogDetail';
import SingleEventPage from '../pages/public/EventDetail';
import PackageDetailPage from '../pages/public/PackageDetail';
import Refund from '../components/policy/Refund';
import Terms from '../components/policy/Terms';
import Privacy from '../components/policy/Privacy';
import Community from '../pages/Community';
import CaseStudies from '../pages/CaseStudies';
import Healthcare from '../view-cases/healthcare/healthcare';
import MainD2C from '../view-cases/D2C/Main';
import FinancialServices from '../view-cases/financial/financialServices';
import RealEstateIndex from '../view-cases/real-estate/hero';
import ManufacturingLogisticsIndex from '../view-cases/manufacturing-&-logistics/hero';
import HospitalityIndex from '../view-cases/hospitality/hero';
import EducationIndex from '../view-cases/education/main';
import AboutUs from '../components/layout/AboutUs';
import AEOIndex from '../view-cases/AGO/main';
import AuditForm from '../components/home/AuditForm';
import TechTrekkerAi from '../pages/public/TechTrekkerAi';

import ChatbotsPage from '../pages/public/services/ChatbotsPage';
import AgenticWorkflowsPage from '../pages/public/services/AgenticWorkflowsPage';
import ProcessAutomationPage from '../pages/public/services/ProcessAutomationPage';
import AiAppsPage from '../pages/public/services/AiAppsPage';
import Pilot from '../pages/Pilot';
import { BlogSection } from '../components/home/BlogSection';
import { blogPosts } from '../data/blogData';
import ClaudeAutomationsPage from '../pages/public/services/Claudeautomationspage';
import AdminLogin from '../pages/admin/AdminLogin';
import AdminCRM from '../pages/admin/AdminCRM';

const ScrollToTop = () => {
  const { pathname, hash, state } = useLocation();

  useEffect(() => {
    // Don't jump to top when the navigation asked for a specific section —
    // HomePage will smooth-scroll to it instead.
    if (hash) return;
    if ((state as { scrollTo?: string } | null)?.scrollTo) return;
    window.scrollTo(0, 0);
  }, [pathname, hash, state]);

  return null;
};

type AppRoutesProps = {
  onOpenChatbot?: () => void;
};

const AppRoutes: React.FC<AppRoutesProps> = ({ onOpenChatbot }) => (
  <>
    <ScrollToTop />

    <Routes>
      {/* Standalone chatbot page (used by QR code) — actual UI is the
          ChatbotModal in fullPage mode rendered globally in App.tsx. */}
      <Route path="/chat" element={<></>} />

      {/* Public routes */}
      <Route path="/" element={<HomePage onOpenChatbot={onOpenChatbot} />} />

      {/* Dedicated consultation/booking route — opens directly on the
          consultation section (no scroll-from-top). Reuses the same Pricing UI. */}
      <Route path="/book-consultation" element={<BookConsultation />} />

      <Route path="/refund" element={<Refund />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/aboutUs" element={<AboutUs />} />
      <Route path="/community" element={<Community />} />
      <Route path="/pilot" element={<Pilot />} />

      <Route path="/auditform" element={<AuditForm />} />
      <Route path="/use-cases" element={<CaseStudies />} />
      <Route path="/healthcare" element={<Healthcare onOpenChatbot={onOpenChatbot} />} />
      <Route path="/ecommerce" element={<MainD2C onOpenChatbot={onOpenChatbot} />} />
      <Route path="/financial-services" element={<FinancialServices />} />
      <Route path="/real-estate" element={<RealEstateIndex onOpenChatbot={onOpenChatbot} />} />
      <Route path="/logistics" element={<ManufacturingLogisticsIndex />} />
      <Route path="/education" element={<EducationIndex />} />
      <Route path="/blogs" element={<BlogSection blogPosts={blogPosts} />} />
      <Route path="/hospitality" element={<HospitalityIndex />} />
      <Route path="/aeo-geo" element={<AEOIndex onOpenChatbot={onOpenChatbot} />} />
      <Route path="/techtrekkers.ai" element={<TechTrekkerAi />} />

      {/* Blog and event routes */}
      <Route path="/blog/:slug" element={<BlogSingleView />} />
      <Route path="/event/:slug" element={<SingleEventPage />} />

      {/* Package details */}
      <Route path="/packages/:slug" element={<PackageDetailPage />} />

      {/* Internal Admin CRM (auth handled inside the pages) */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminCRM />} />

      {/* Service routes */}
      <Route path="/services/ai-chatbots" element={<ChatbotsPage onOpenChatbot={onOpenChatbot} />} />
      <Route path="/services/agentic-ai-workflows" element={<AgenticWorkflowsPage onOpenChatbot={onOpenChatbot} />} />
      <Route path="/services/smart-process-automation" element={<ProcessAutomationPage onOpenChatbot={onOpenChatbot} />} />
      <Route path="/services/ai-apps-micro-saas" element={<AiAppsPage onOpenChatbot={onOpenChatbot} />} />
      <Route path="/services/claude-automation" element={<ClaudeAutomationsPage />} />

      {/* Catch-all */}
      <Route path="*" element={<div>404: Not Found</div>} />
    </Routes>
  </>
);

export default AppRoutes;
