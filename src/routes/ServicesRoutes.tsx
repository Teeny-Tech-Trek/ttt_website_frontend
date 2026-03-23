import React from "react";
import { Route } from "react-router-dom";
import ChatbotsPage from "../pages/public/services/ChatbotsPage";
import AgenticWorkflowsPage from "../pages/public/services/AgenticWorkflowsPage";
import ProcessAutomationPage from "../pages/public/services/ProcessAutomationPage";
import AiAppsPage from "../pages/public/services/AiAppsPage";

type ServicesRoutesProps = {
  onOpenChatbot?: () => void;
};

const ServicesRoutes: React.FC<ServicesRoutesProps> = ({ onOpenChatbot }) => (
  <>
    <Route path="ai-chatbots" element={<ChatbotsPage onOpenChatbot={onOpenChatbot} />} />
    <Route path="agentic-ai-workflows" element={<AgenticWorkflowsPage onOpenChatbot={onOpenChatbot} />} />
    <Route path="smart-process-automation" element={<ProcessAutomationPage onOpenChatbot={onOpenChatbot} />} />
    <Route path="ai-apps-micro-saas" element={<AiAppsPage />} />
  </>
);

export default ServicesRoutes;
