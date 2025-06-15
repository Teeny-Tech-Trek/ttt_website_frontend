// src/pages/HomePage.tsx
import { useEffect } from 'react';
import Particles from '../../components/ui/Particles';
import Hero from '../../components/home/Hero';
import Services from '../../components/home/ServicesList';
import TechStack from '../../components/home/TechStack';
import Pricing from '../../components/home/Pricing';
import Contact from '../../components/home/Contact';
import Blogs from '../../components/home/Blog';
import Events from '../../components/home/EventList';
import About from '../../components/home/About';
import WhyUs from '../../components/home/WhyUs';

const HomePage = () => {
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const navLinks = document.querySelectorAll('.nav-link');
      let current = '';

      sections.forEach((section) => {
const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = section.clientHeight;
        if (
          window.scrollY >= sectionTop - 200 &&
          window.scrollY < sectionTop + sectionHeight - 200
        ) {
          current = section.getAttribute('id') || '';
        }
      });

      // If no section is in view, default to 'home'
      if (!current && window.scrollY < 200) {
        current = 'home';
      }

      navLinks.forEach((link) => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href && href.includes(`#${current}`)) {
          link.classList.add('active');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main>
      <section id="home" className="relative">
        <Particles />
        <Hero />
      </section>
      <section id="services">
        <Services />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="blogs">
        <Blogs />
      </section>
      <section id="events">
        <Events />
      </section>
      <section id="tech-stack">
        <TechStack />
      </section>
      <section id="why-us">
        <WhyUs />
      </section>
      <section id="pricing">
        <Pricing />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </main>
  );
};

export default HomePage;