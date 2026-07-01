import React from "react";
import { Route } from "react-router-dom";
import ChatbotsPage from "../pages/public/services/ChatbotsPage";
import AgenticWorkflowsPage from "../pages/public/services/AgenticWorkflowsPage";
import ProcessAutomationPage from "../pages/public/services/ProcessAutomationPage";
import AiAppsPage from "../pages/public/services/AiAppsPage";
import ClaudeAutomationsPage from "../pages/public/services/Claudeautomationspage";
import CustomAiIntegrationsPage from "../pages/public/services/CustomAiIntegrationsPage";

type ServicesRoutesProps = {
  onOpenChatbot?: () => void;
};

const ServicesRoutes: React.FC<ServicesRoutesProps> = ({ onOpenChatbot }) => (
  <>
    <Route path="ai-chatbots" element={<ChatbotsPage onOpenChatbot={onOpenChatbot} />} />
    <Route path="agentic-ai-workflows" element={<AgenticWorkflowsPage onOpenChatbot={onOpenChatbot} />} />
    <Route path="smart-process-automation" element={<ProcessAutomationPage onOpenChatbot={onOpenChatbot} />} />
    <Route path="ai-apps-micro-saas" element={<AiAppsPage />} />
    <Route path="claude-automation" element={<ClaudeAutomationsPage/>} />
    <Route path="custom-ai-integrations" element={<CustomAiIntegrationsPage onOpenChatbot={onOpenChatbot} />} />
  </>
);

export default ServicesRoutes;
