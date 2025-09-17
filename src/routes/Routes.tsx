// src/routes/AppRoutes.tsx
import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { withAuthGuard } from './RouteGuards';

import HomePage from '../pages/public/HomePage';
// Remove AuthPage import since we're using modal now
// import AuthPage from '../pages/public/AuthPage';
import ServicesRoutes from './ServicesRoutes';
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

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
};

const AppRoutes = () => (
  <>
    <ScrollToTop />

    <Routes>
      {/* Public routes */}
      <Route path="/" element={<HomePage />} />
      
      {/* Remove the login route since we're using modal */}
      {/* <Route path="/login" element={<AuthPage />} /> */}
      
      <Route path="/refund" element={<Refund />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/aboutUs" element={<AboutUs />} />
      <Route path="/community" element={<Community />} />
      <Route path="/case" element={<CaseStudies />} />
      <Route path="/healthcare" element={<Healthcare />} />
      <Route path="/ecommerce" element={<MainD2C />} />
      <Route path="/financial-services" element={<FinancialServices />} />
      <Route path="/real-estate" element={<RealEstateIndex />} />
      <Route path="/logistics" element={<ManufacturingLogisticsIndex />} />
      <Route path="/education" element={<EducationIndex />} />
      <Route path="/hospitality" element={<HospitalityIndex />} />
      <Route path="/aeo-geo" element={<AEOIndex />} />

      {/* Blog and event routes */}
      <Route path="/blog/:slug" element={<BlogSingleView />} />
      <Route path="/event/:slug" element={<SingleEventPage />} />

      {/* Package details */}
      <Route path="/packages/:slug" element={<PackageDetailPage />} />

      {/* All /services/* routes → rendered by the <ServicesRoutes /> component */}
      <Route path="services/*">
      {ServicesRoutes()}</Route>

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