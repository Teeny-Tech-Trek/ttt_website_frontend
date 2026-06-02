// src/pages/public/HomePage.tsx
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { scrollToSection } from '../../utils/scrollToSection';
import Hero from '../../components/home/Hero';
import Services from '../../components/home/ServicesList';
import Pricing from '../../components/home/Pricing';
import FAQ from '../../components/home/FAQ';
import Contact from '../../components/home/Contact';

import WhyUs from '../../components/home/WhyUs';
import WhyUsQuote from '../../components/home/WhyUsQuote';
import { Helmet } from 'react-helmet-async';
import Industries from '../../components/home/industries';
import AIServicesCards from '../../components/home/featuredCase';
import AutonomousAgentic from '../../components/home/AutonomousAgentic';

interface HomePageProps {
  onOpenChatbot?: () => void;
}

const HomePage = ({ onOpenChatbot }: HomePageProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  // When we arrive here from another route via a SectionLink, the target section
  // is carried in router state (so the URL stays clean — no `#hash`). Scroll to it
  // once, then clear the state so a refresh or Back press doesn't re-trigger it.
  useEffect(() => {
    const target = (location.state as { scrollTo?: string } | null)?.scrollTo;
    if (!target) return;
    scrollToSection(target);
    navigate(location.pathname, { replace: true, state: null });
  }, [location, navigate]);

  return (
    <main>
       <Helmet>
        <title>Teeny Tech Trek - AI Automation for Lean Teams</title>
        <meta name="description" content="Build small, launch fast. Custom AI chatbots and automation tools for startups and solopreneurs." />
        <meta property="og:title" content="Teeny Tech Trek - AI Automation for Lean Teams" />
        <meta property="og:description" content="Scale smart with custom AI agents and automation tools tailored for lean product teams." />
        <meta property="og:image" content="https://www.teenytechtrek.com/og-image.jpg" />
        <meta property="og:url" content="https://www.teenytechtrek.com/" />
        <link rel="canonical" href="https://www.teenytechtrek.com/" />
      </Helmet>
      <section id="home" className="relative">
        {/* Pass the onOpenChatbot prop to Hero */}
        <Hero onOpenChatbot={onOpenChatbot} />
      </section>
      <section id="login" className="h-0" aria-hidden="true" />
      <section id="solutions" className="h-0" aria-hidden="true" />
      <section id="industries">
       <Industries />
     </section>
      <section id="services">
        <Services />
      </section>
     
      {/* <section id="about">
        <About />
      </section> */}
       <section id="use-cases" className="h-0" aria-hidden="true" />
       <section id="featuredCase">
        <AIServicesCards />
      </section>
       <section id="autonomous-agentic">
       <AutonomousAgentic />
      </section>

      {/* <section id="tech-stack">
        <TechStack />
      </section> */}
      <section id="pricing">
        <div id="book-consultation">
          <Pricing />
        </div>
      </section>

      <section id="about-us">
        <WhyUs />
      </section>
      
      <section id="faq">
        <FAQ />
      </section>
      <section id="blogs" className="h-0" aria-hidden="true" />
      
        {/* <section id="blogs">
        <Blogs />
      </section>
      <section id="events">
        <Events />
      </section> */}
      <section id="why-us-quote">
        <WhyUsQuote />
      </section>
   
      <section id="contact">
        <Contact />
      </section>
    </main>
  );
};

export default HomePage;

