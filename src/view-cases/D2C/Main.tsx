import React from 'react';
import HeroSection from './HeroSection';
import ChatbotSolutionsSection from './chatbot';
import ChatbotDemoSection from './chatbotdemo';
import BenefitsSection from './Benefits';
import GettingStartedSection from './GettingStarted';
import StatsSection from './stats';
import FinalCTASection from './CTA';

const MainD2C = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ChatbotSolutionsSection />
      <ChatbotDemoSection />
      <BenefitsSection />
      <GettingStartedSection />
      <StatsSection />
      <FinalCTASection />
    </div>
  );
};

export default MainD2C;