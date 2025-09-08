import AIAgentsSection from "./AIAgents"
import BenefitsSection from "./Benefits"
import CTASection from "./CTA"
import GettingStartedSection from "./GettingStarted"
import HeroSection from "./HeroSection"
import IntegrationsSection from "./Integration"
import TrustedSection from "./TrustedSection"
import AIVoiceAgents from "./VoiceAi"

const MainD2C = () => {
    return <>
    <HeroSection/>
    <AIAgentsSection/>
    <AIVoiceAgents />
    <TrustedSection/>
    <BenefitsSection />
    <IntegrationsSection/>
    <GettingStartedSection/>
    <CTASection />
    </>
}

export default MainD2C;