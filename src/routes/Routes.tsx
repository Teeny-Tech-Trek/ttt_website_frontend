// src/routes/AppRoutes.tsx
import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { withAuthGuard } from './RouteGuards';

import HomePage from '../pages/public/HomePage';
import AuthPage from '../pages/public/AuthPage';
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
      <Route path="/login" element={<AuthPage />} />
         <Route path="/refund" element={<Refund />} />
            <Route path="/privacy" element={<Privacy />} />
               <Route path="/terms" element={<Terms />} />
        <Route path="/community" element={<Community />} />
         <Route path="/case" element={<CaseStudies />} />

      {/* ←── New public route for "single blog" */}
      <Route path="/blog/:slug" element={<BlogSingleView />} />

      {/* ←── New public route for "single blog" */}
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
