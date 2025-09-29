// src/routes/AppRoutes.tsx - Fixed version
import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { withAuthGuard } from './RouteGuards';

import HomePage from '../pages/public/HomePage';
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminRoutes from './Admin/AdminRoutes';
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

// Import service pages directly
import ChatbotsPage from '../pages/public/services/ChatbotsPage';
import AgenticWorkflowsPage from '../pages/public/services/AgenticWorkflowsPage';
import ProcessAutomationPage from '../pages/public/services/ProcessAutomationPage';
import AiAppsPage from '../pages/public/services/AiAppsPage';
import Pilot from '../pages/Pilot';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
};

// Accept onOpenChatbot prop and pass it to components that need it
const AppRoutes = ({ onOpenChatbot }) => (
  <>
    <ScrollToTop />

    <Routes>
      {/* Public routes */}
      <Route path="/" element={<HomePage onOpenChatbot={onOpenChatbot} />} />
      
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
      <Route path="/real-estate" element={<RealEstateIndex onOpenChatbot={onOpenChatbot}/>} />
      <Route path="/logistics" element={<ManufacturingLogisticsIndex />} />
      <Route path="/education" element={<EducationIndex />} />
      <Route path="/hospitality" element={<HospitalityIndex />} />
      <Route path="/aeo-geo" element={<AEOIndex onOpenChatbot={onOpenChatbot} />} />
      <Route path="/techtrekkers.ai" element={<TechTrekkerAi />} />

      {/* Blog and event routes */}
      <Route path="/blog/:slug" element={<BlogSingleView />} />
      <Route path="/event/:slug" element={<SingleEventPage />} />

      {/* Package details */}
      <Route path="/packages/:slug" element={<PackageDetailPage />} />

      {/* Service routes - defined directly here */}
      <Route path="/services/ai-chatbots" element={<ChatbotsPage onOpenChatbot={onOpenChatbot} />} />
      <Route path="/services/agentic-ai-workflows" element={<AgenticWorkflowsPage  onOpenChatbot={onOpenChatbot}/>} />
      <Route path="/services/smart-process-automation" element={<ProcessAutomationPage onOpenChatbot={onOpenChatbot}/>} />
      <Route path="/services/ai-apps-micro-saas" element={<AiAppsPage onOpenChatbot={onOpenChatbot}/>} />

      {/* Admin (protected) */}
      <Route
        path="admin/*"
        element={withAuthGuard(<AdminDashboard />, ['admin'])}
      >
        {/* Nested admin‐only sub‐routes */}
        {AdminRoutes()}
      </Route>

      {/* Optional: catch‐all */}
      <Route path="*" element={<div>404: Not Found</div>} />
    </Routes>
  </>
);

export default AppRoutes;