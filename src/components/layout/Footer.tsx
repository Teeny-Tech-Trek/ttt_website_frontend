import { useLocation } from 'react-router-dom';
import { ArrowUp, Mail, Phone, MapPin } from 'lucide-react';
import { FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import Container from '../ui/Container';

// Define Service interface for type safety
interface Service {
  title: string;
  slug: string;
}

// Example service data
const services: Service[] = [
  { title: 'AI-Powered Chatbots', slug: 'ai-chatbots' },
  { title: 'Agentic AI Workflows', slug: 'agentic-ai-workflows' },
  { title: 'Smart Process Automation', slug: 'smart-process-automation' },
  { title: 'Lightweight AI Apps', slug: 'ai-apps-micro-saas' },
];

const Footer = () => {
  const location = useLocation();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Hide footer on admin or login routes
  if (location.pathname.startsWith('/admin') || location.pathname.startsWith('/login')) {
    return null;
  }

  const socialLinks = [
    {
      platform: 'Instagram',
      icon: <FaInstagram />,
      href: 'https://www.instagram.com/teenytechtrek?igsh=cng0djJjbjN1dzFo&utm_source=qr',
      ariaLabel: 'Visit our Instagram page',
    },
    {
      platform: 'LinkedIn',
      icon: <FaLinkedinIn />,
      href: 'https://www.linkedin.com/company/teenytechtrek/',
      ariaLabel: 'Visit our LinkedIn page',
    },
  ];

  const serviceLinks = services.map((service) => ({
    name: service.title,
    href: `/services/${service.slug}`,
  }));

  const companyLinks = [
    { name: 'About', href: '/#about' },
    { name: 'Services', href: '/#services' },
    { name: 'Tech Stack', href: '/#tech-stack' },
    { name: 'Why Us', href: '/#why-us' },
    { name: 'Contact', href: '/#contact' },
  ];

  return (
    <footer className="relative bg-[#1e40af] text-white pt-20 pb-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.1)_1px,transparent_0)] bg-[size:40px_40px] opacity-30" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img
                src="/logo.svg"
                alt="Teeny Tech Trek Logo"
                className="w-10 h-10 bg-white p-1.5 rounded-lg shadow-md"
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/40';
                }}
              />
              <span className="text-2xl font-display font-bold tracking-tight">
                Teeny Tech Trek
              </span>
            </div>
            <p className="text-[#93c5fd] text-sm leading-relaxed max-w-xs">
              Empowering small teams with AI-driven solutions for big impact.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  aria-label={link.ariaLabel}
                  className="w-10 h-10 flex items-center justify-center bg-[#3b82f6]/20 rounded-full hover:bg-[#3b82f6]/30 transition-all duration-300 transform hover:scale-105"
                >
                  <span className="text-sm font-medium text-[#3b82f6]">{link.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xl font-semibold mb-6 tracking-wide">Services</h4>
            <ul className="space-y-3">
              {serviceLinks.map((service, index) => (
                <li key={index}>
                  <a
                    href={service.href}
                    className="text-[#93c5fd] hover:text-white text-sm font-medium transition-all duration-300 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-[#3b82f6] rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xl font-semibold mb-6 tracking-wide">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-[#93c5fd] hover:text-white text-sm font-medium transition-all duration-300 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-[#3b82f6] rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xl font-semibold mb-6 tracking-wide">Get in Touch</h4>
            <ul className="space-y-5">
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-[#3b82f6] flex-shrink-0" />
                <a
                  href="mailto:anisha.singla@teenytechtrek.com"
                  className="text-[#93c5fd] hover:text-white text-sm transition-colors duration-300"
                >
                  anisha.singla@teenytechtrek.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-[#3b82f6] flex-shrink-0" />
                <a
                  href="tel:+16478645465"
                  className="text-[#93c5fd] hover:text-white text-sm transition-colors duration-300"
                >
                  +1 647-864-5465<br />+91 98558 06696
                </a>

              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-[#3b82f6] flex-shrink-0 mt-1" />
                <span className="text-[#93c5fd] text-sm">
                  C-201, 2nd Floor, Sebiz Square Building, Plot No. C-6, Sector-67, Mohali, SAS Nagar - 160062, Punjab, India
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-10 border-t border-[#93c5fd]/20 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[#93c5fd] text-xs text-center md:text-left">
            © {new Date().getFullYear()} Teeny Tech Trek. All rights reserved.
          </p>
          <div className="flex gap-8 text-xs text-[#93c5fd]">
            <a href="#" className="hover:text-white transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors duration-300">
              Terms of Service
            </a>
          </div>
          <button
            onClick={scrollToTop}
            className="w-12 h-12 bg-[#3b82f6]/20 rounded-full flex items-center justify-center hover:bg-[#3b82f6]/30 transition-all duration-300 transform hover:scale-110"
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} className="text-[#3b82f6]" />
          </button>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;