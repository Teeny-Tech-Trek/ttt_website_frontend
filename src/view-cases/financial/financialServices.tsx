import AutomationFeaturesSection from "./automationFeatures";
import BenefitsSection from "./benefits";
import CTASection from "./cta";
import FinancialHeroSection from "./hero";
import ImplementationSection from "./implementation";
import IntegrationsSection from "./integration";
import ComplianceRiskSection from "./riskSection";
import SecuritySection from "./services";


const FinancialServices = () => {
  return (
    <div className="min-h-screen px-2">
      <FinancialHeroSection />
      <AutomationFeaturesSection />
      <ComplianceRiskSection />
      <BenefitsSection />
      <IntegrationsSection />
      <ImplementationSection />
      <SecuritySection />
      <CTASection />
    </div>
  );
};

export default FinancialServices;