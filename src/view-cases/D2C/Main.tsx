import React from 'react';
import HeroSection from './HeroSection';
import ChatbotSolutionsSection from './chatbot';
import ChatbotDemoSection from './chatbotdemo';
import BenefitsSection from './Benefits';
import GettingStartedSection from './GettingStarted';
import StatsSection from './stats';
import FinalCTASection from './CTA';

const MainD2C = ({onOpenChatbot}) => {
  return (
    <div className="min-h-screen">
      <HeroSection onOpenChatbot={onOpenChatbot} />
      <ChatbotSolutionsSection onOpenChatbot={onOpenChatbot}/>
      <ChatbotDemoSection />
      <BenefitsSection />
      <GettingStartedSection />
      <StatsSection />
      <FinalCTASection />
    </div>
  );
};

export default MainD2C;