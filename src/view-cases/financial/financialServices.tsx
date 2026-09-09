import React from 'react';
import { Helmet } from 'react-helmet-async';
import FinancialHeroSection from './hero';
import AutomationFeaturesSection from './automationFeatures';
import ComplianceRiskSection from './riskSection';
import BenefitsSection from './benefits';
import IntegrationsSection from './integration';
import ImplementationSection from './implementation';
import SecuritySection from './services';
import CTASection from './cta';

const FinancialServices: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      <Helmet>
        <title>AI-Powered Financial Automation Suite | KYC, Risk & Compliance | Teeny Tech Trek</title>
        <meta
          name="description"
          content="Automate KYC onboarding, ensure regulatory compliance across US, UK, and Canada, and reduce operational costs by 80% with our enterprise-grade AI platform for financial institutions."
        />
        <meta
          name="keywords"
          content="Financial AI, KYC automation, banking compliance, AML screening, fraud detection, SOX compliance, FCA compliance, FINTRAC, Teeny Tech Trek"
        />
      </Helmet>

      {/* 1. Hero Section */}
      <FinancialHeroSection />

      {/* 2 & 3. Suite Overview & KYC Document Intelligence Deep Dive */}
      <AutomationFeaturesSection />

      {/* 4. Compliance & Risk Management */}
      <ComplianceRiskSection />

      {/* 5. Results & ROI Section */}
      <BenefitsSection />

      {/* 6 & 7. Enterprise-Grade Integrations & Developer-Friendly APIs */}
      <IntegrationsSection />

      {/* 8. Implementation Process & Expert Support */}
      <ImplementationSection />

      {/* 9 & 10. Bank-Grade Security & Compliance Certifications */}
      <SecuritySection />

      {/* 11. FAQ & Final CTA Banner */}
      <CTASection />
    </div>
  );
};

export default FinancialServices;