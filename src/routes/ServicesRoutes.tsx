// src/routes/ServicesRoutes.tsx
import { Route } from 'react-router-dom';
import ChatbotsPage from '../pages/public/services/ChatbotsPage';
import AgenticWorkflowsPage from '../pages/public/services/AgenticWorkflowsPage';
import ProcessAutomationPage from '../pages/public/services/ProcessAutomationPage';
import AiAppsPage from '../pages/public/services/AiAppsPage';
import { Fragment } from 'react/jsx-runtime';

const ServicesRoutes = () => (
  <Fragment>
    <Route path="ai-chatbots" element={<ChatbotsPage />} />
    <Route path="agentic-ai-workflows" element={<AgenticWorkflowsPage />} />
    <Route path="smart-process-automation" element={<ProcessAutomationPage />} />
    <Route path="ai-apps-micro-saas" element={<AiAppsPage />} />
  </Fragment>
);

export default ServicesRoutes;
