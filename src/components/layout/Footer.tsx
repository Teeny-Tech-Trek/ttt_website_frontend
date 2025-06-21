import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowUp, Mail, Phone, MapPin } from 'lucide-react';
import { FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import Container from '../ui/Container';

interface Service {
  title: string;
  slug: string;
}

const services: Service[] = [
  { title: 'AI-Powered Chatbots', slug: 'ai-chatbots' },
  { title: 'Agentic AI Workflows', slug: 'agentic-ai-workflows' },
  { title: 'Smart Process Automation', slug: 'smart-process-automation' },
  { title: 'Lightweight AI Apps', slug: 'ai-apps-micro-saas' },
];

const Footer = () => {
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/newsletter/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.status === 201) {
        setMessage('Successfully subscribed! Please check your email to verify.');
        setEmail('');
      } else if (response.status === 409) {
        setMessage('This email is already subscribed.');
      } else {
        setMessage(data.message || 'An error occurred. Please try again.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

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
    <footer className="relative bg-[#1e40af] text-white pt-16 pb-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.1)_1px,transparent_0)] bg-[size:40px_40px] opacity-30" />

      <Container className="relative z-10">
        {/* Newsletter Section - Centered and Prominent */}
       

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
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
              <span className="text-2xl font-bold tracking-tight">
                Teeny Tech Trek
              </span>
            </div>
            <p className="text-[#93c5fd] text-sm leading-relaxed">
              Empowering small teams with AI-driven solutions for big impact.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  aria-label={link.ariaLabel}
                  className="w-10 h-10 flex items-center justify-center bg-[#3b82f6]/20 rounded-full hover:bg-[#3b82f6]/30 transition-all duration-300 hover:scale-105"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="text-[#3b82f6]">{link.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Our Services</h4>
            <ul className="space-y-3">
              {serviceLinks.map((service, index) => (
                <li key={index}>
                  <a
                    href={service.href}
                    className="text-[#93c5fd] hover:text-white text-sm transition-all duration-300 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-[#3b82f6] rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-[#93c5fd] hover:text-white text-sm transition-all duration-300 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-[#3b82f6] rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-[#3b82f6] mt-1 flex-shrink-0" />
                <a
                  href="mailto:anisha.singla@teenytechtrek.com"
                  className="text-[#93c5fd] hover:text-white text-sm transition-colors duration-300"
                >
                  anisha.singla@teenytechtrek.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-[#3b82f6] mt-1 flex-shrink-0" />
                <div className="text-[#93c5fd] text-sm">
                  <a href="tel:+16478645465" className="hover:text-white transition-colors duration-300 block">
                    +1 647-864-5465
                  </a>
                  <a href="tel:+919855806696" className="hover:text-white transition-colors duration-300 block">
                    +91 98558 06696
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-[#3b82f6] mt-1 flex-shrink-0" />
                <span className="text-[#93c5fd] text-sm">
                  C-201, 2nd Floor, Sebiz Square Building, Plot No. C-6, Sector-67, Mohali, SAS Nagar - 160062, Punjab, India
                </span>
              </li>
            </ul>
          </div>
        </div>

         <div className="max-w-3xl mx-auto mb-16 text-center bg-[#3b82f6]/10 p-8 rounded-xl backdrop-blur-sm border border-[#3b82f6]/20">
          <h3 className="text-2xl font-bold mb-3">Stay Updated</h3>
          <p className="text-[#93c5fd] mb-6">
            Subscribe to our newsletter for the latest AI trends and company updates
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 justify-center">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="px-4 py-3 rounded-lg bg-white/10 text-white border border-[#3b82f6]/30 focus:outline-none focus:ring-2 focus:ring-[#3b82f6] transition-all duration-300 flex-grow max-w-md placeholder-[#93c5fd]/70"
              required
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 bg-[#3b82f6] rounded-lg hover:bg-[#2563eb] transition-all duration-300 font-medium whitespace-nowrap shadow-lg hover:shadow-[#3b82f6]/30"
            >
              {isLoading ? 'Subscribing...' : 'Subscribe Now'}
            </button>
          </form>
          {message && (
            <p className={`mt-4 text-sm ${message.includes('Successfully') ? 'text-green-300' : 'text-red-300'}`}>
              {message}
            </p>
          )}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#93c5fd]/20 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[#93c5fd] text-xs">
            © {new Date().getFullYear()} Teeny Tech Trek. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-[#93c5fd]">
            <a href="/privacy" className="hover:text-white transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-white transition-colors duration-300">
              Terms of Service
            </a>
            <a href="/refund" className="hover:text-white transition-colors duration-300">
              Refund Policy
            </a>
          </div>
          <button
            onClick={scrollToTop}
            className="w-10 h-10 bg-[#3b82f6]/20 rounded-full flex items-center justify-center hover:bg-[#3b82f6]/30 transition-all duration-300 hover:scale-110"
            aria-label="Scroll to top"
          >
            <ArrowUp size={18} className="text-[#3b82f6]" />
          </button>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;