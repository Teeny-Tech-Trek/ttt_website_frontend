import { useState, useEffect } from 'react';
import { Menu, X, Bot, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import SectionLink from '../ui/SectionLink';
import Container from '../ui/Container';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import logo from '../../assets/teeny-logo.svg';

// Create a motion-enabled Link component
const MotionLink = motion.create(SectionLink);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, openAuthModal } = useAuth();
  const isHomePage = location.pathname === '/';

  // State for Convai widget
  const [isWidgetReady, setIsWidgetReady] = useState(false);
  const [isWidgetVisible, setIsWidgetVisible] = useState(false);
  const [convaiError, setConvaiError] = useState<string | null>(null);

  // Dropdown states
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpenSub, setMobileOpenSub] = useState<{ [key: string]: boolean }>({});

  // Initialize activeSection based on URL hash
  const [activeSection, setActiveSection] = useState(() => {
    if (isHomePage && location.hash) {
      return location.hash;
    }
    const path = location.pathname;
    if (path.startsWith('/services')) return '#services';
    if (path === '/solutions') return '#solutions';
    if (path === '/blogs' || path === '/community' || path === '/auditform') return '#resources';
    return '#home';
  });

  // Responsive scroll-based effects
  const backgroundOpacity = useTransform(scrollY, [0, 100], [0, 0.9]);
  const navHeight = useTransform(scrollY, [0, 100], [80, 64]);
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.85]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    logout();
    toast.success('Log out successful!');
    setIsMenuOpen(false);
  };

  const handleLoginClick = () => {
    openAuthModal('login');
    setIsMenuOpen(false);
  };

  // Monitor Convai SDK and widget element
  useEffect(() => {
    const checkWidget = () => {
      const convaiElement = document.querySelector('elevenlabs-convai');
      const convai = (window as any).Convai || (window as any).ElevenLabsConvai || (window as any).convai;
      if (convaiElement) {
        setIsWidgetReady(true);
        console.log('Found elevenlabs-convai element:', convaiElement);
      }
      if (convai) {
        console.log('Convai SDK loaded successfully:', convai);
        console.dir(convai);
      } else {
        console.log('Convai SDK not detected. Global objects checked:', Object.keys(window).filter(key => key.toLowerCase().includes('convai')));
      }
    };

    checkWidget();
    const maxAttempts = 40;
    let attempts = 0;
    const interval = setInterval(() => {
      checkWidget();
      attempts++;
      if (isWidgetReady || attempts >= maxAttempts) {
        clearInterval(interval);
        if (!isWidgetReady) {
          setConvaiError('AI Assistant widget not found. Please refresh the page.');
          console.error('Convai widget not detected after 20 seconds');
        }
      }
    }, 500);

    const script = document.querySelector('script[src="https://elevenlabs.io/convai-widget/index.js"]');
    if (script) {
      script.addEventListener('load', () => {
        console.log('Convai script loaded');
        checkWidget();
      });
      script.addEventListener('error', () => {
        setConvaiError('Failed to load AI Assistant script. Check your network or contact support.');
        console.error('Convai script failed to load');
      });
    } else {
      console.warn('Convai script tag not found in DOM');
    }

    return () => clearInterval(interval);
  }, [isWidgetReady]);

  // Handle Talk to AI button click
  const handleTalkToAI = () => {
    if (!isWidgetReady) {
      toast.error(convaiError || 'AI Assistant is still loading...');
      return;
    }
    try {
      const convaiElement = document.querySelector('elevenlabs-convai');
      const backdrop = document.getElementById('convai-backdrop');
      if (convaiElement && backdrop) {
        convaiElement.classList.add('visible');
        backdrop.classList.add('visible');
        setIsWidgetVisible(true);
        convaiElement.dispatchEvent(new CustomEvent('open-convai-widget'));
        console.log('Displayed elevenlabs-convai widget');
        const hideWidget = () => {
          convaiElement.classList.remove('visible');
          backdrop.classList.remove('visible');
          setIsWidgetVisible(false);
          backdrop.removeEventListener('click', hideWidget);
        };
        backdrop.addEventListener('click', hideWidget);
        toast.success('AI Assistant opened!');
      } else {
        throw new Error('Convai widget or backdrop not found');
      }
    } catch (error) {
      console.error('Failed to open AI Assistant:', error);
      toast.error('Failed to open AI Assistant. Please try again.');
    }
  };

  // Scroll and resize effects
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Updated topNavLinks to match Footer's services structure and add techtrekkers.ai and use cases under Solutions
  const services = [
    { title: 'AI-Powered Chatbots', slug: 'ai-chatbots', key: 'ai-chatbots' },
    { title: 'Agentic AI Workflows', slug: 'agentic-ai-workflows', key: 'agentic-ai-workflows' },
    { title: 'Smart Process Automation', slug: 'smart-process-automation', key: 'smart-process-automation' },
    { title: 'Claude Automation', slug: 'claude-automation', key: 'claude-automation' },
    { title: 'Lightweight AI Apps', slug: 'ai-apps-micro-saas', key: 'ai-apps-micro-saas' },
    { title: 'Custom AI Integrations', slug: 'custom-ai-integrations', key: 'custom-ai-integrations' },
  ];

  const techTrekkersProducts = [
    { name: 'NetTwin', href: 'https://nettwin.techtrekkers.ai', key: 'nettwin' },
    { name: 'NexEstate', href: 'https://nexestate.techtrekkers.ai', key: 'nexestate' },
    { name: 'NeoScripting', href: 'https://neoscript.techtrekkers.ai', key: 'neoscripting' },
  ];

  const topNavLinks = [
    { name: 'Home', href: isHomePage ? '#home' : '/', key: 'home', hash: '#home', path: '/' },
    {
      name: 'Services',
      key: 'services',
      hash: '#services',
      path: '/',
      href: isHomePage ? '#services' : '/#services',
      subLinks: services.map((service) => ({
        name: service.title,
        href: `/services/${service.slug}`,
        key: service.key,
      })),
    },
    // { name: 'Book Consultation', href: isHomePage ? '#pricing' : '/#pricing', key: 'pricing', hash: '#pricing', path: '/' },
    {
      name: 'Solutions',
      href: isHomePage ? '#solutions' : '/solutions',
      key: 'solutions',
      // hash: '#solutions',
      path: '/',
      subLinks: [
        { name: 'TechTrekkers.ai', href: 'https://techtrekkers.ai', key: 'techtrekkers', products: techTrekkersProducts },
        { name: 'Use Cases', href: '/use-cases', key: 'use-cases' },
      ],
    },
    {
      name: 'Resources',
      key: 'resources',
      subLinks: [
        { name: 'Blog', href: '/blogs', key: 'blogs' },
        // { name: 'Community', href: '/community', key: 'community' },
        { name: 'Audit Form', href: '/auditform', key: 'auditform' },
      ],
    },
    // { name: 'Contact', href: isHomePage ? '#contact' : '/#contact', key: 'contact', hash: '#contact', path: '/' },
  ];

  const isLinkActive = (link: any) => {
    if (isHomePage) {
      return activeSection === link.hash;
    } else {
      const path = location.pathname;
      switch (link.key) {
        case 'home':
          return path === '/';
        case 'services':
          return path.startsWith('/services');
        case 'solutions':
          return path === '/solutions' || path === '/use-cases';
        case 'resources':
          return path === '/blogs'  || path === '/audit-form';
        case 'pricing':
        case 'contact':
          return false;
        default:
          return false;
      }
    }
  };

  // Track active section based on scroll position
  useEffect(() => {
    if (!isHomePage) return;
    const updateActiveSection = () => {
      const offsets = topNavLinks
        .filter((link) => link.hash)
        .map((link) => {
          const element = document.querySelector(link.hash!);
          if (!element) return { hash: link.hash!, visible: false, top: Infinity };
          const rect = element.getBoundingClientRect();
          return {
            hash: link.hash!,
            visible: rect.top <= window.innerHeight * 0.5 && rect.bottom >= 100,
            top: Math.abs(rect.top),
          };
        });

      const visibleSection = offsets.find((section) => section.visible);
      if (visibleSection) {
        setActiveSection(visibleSection.hash);
      } else {
        const closest = offsets.reduce((prev, curr) => (curr.top < prev.top ? curr : prev));
        setActiveSection(closest.hash);
      }
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection);
    return () => window.removeEventListener('scroll', updateActiveSection);
  }, [isHomePage]);

  // Sync activeSection with location
  useEffect(() => {
    let newActive = '#home';
    if (isHomePage && location.hash) {
      newActive = location.hash;
    } else {
      const path = location.pathname;
      if (path.startsWith('/services')) newActive = '#services';
      else if (path === '/solutions' || path === '/use-cases') newActive = '#solutions';
      else if (path === '/blogs' || path === '/community' || path === '/audit-form') newActive = '#resources';
      else if (path === '/') newActive = '#home';
    }
    setActiveSection(newActive);
  }, [location.hash, location.pathname, isHomePage]);

  const openExternalLink = (href: string) => {
    window.open(href, '_blank', 'noopener,noreferrer');
  };

  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <motion.header className="fixed top-0 left-0 right-0 z-50 font-sans" style={{ height: navHeight }}>
      <motion.div
        className="absolute inset-0 border-b bg-white/80 backdrop-blur-lg border-gray-100/20"
        style={{ opacity: backgroundOpacity }}
      />
      <Container className="relative h-full">
        <nav className="relative flex items-center justify-between h-full px-2 sm:px-4 md:px-6 lg:px-0">
          {/* Logo - Responsive sizing with better spacing */}
          <MotionLink
            to="/#home"
            smooth
            className="z-50 flex items-center flex-shrink-0 min-w-0 gap-2 mr-6 sm:gap-3 lg:mr-8 xl:mr-10"
            style={{ scale: logoScale }}
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
            onClick={() => setActiveSection('#home')}
          >
            <motion.img 
              src={logo} 
              alt="Teeny Tech Trek Logo" 
              className="w-8 h-10 sm:w-10 sm:h-12 md:w-12 md:h-15 ml-[-8px] sm:ml-[-10px] md:ml-[-15px] flex-shrink-0" 
            />
            <motion.span
              className="text-sm font-semibold tracking-tight text-blue-900 truncate sm:text-lg md:text-xl"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="hidden sm:inline">Teeny Tech Trek</span>
              <span className="sm:hidden">TTT</span>
            </motion.span>
          </MotionLink>

          {/* Desktop Navigation - Multiple breakpoints with proper spacing */}
          <div className="items-center justify-center hidden lg:flex lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2">
            <ul className="flex items-center gap-3 xl:gap-6">
              {topNavLinks.map((link, index) => (
                <motion.li
                  key={link.key}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.4 }}
                >
                  <div
                    className="relative group"
                    onMouseEnter={() => link.subLinks && setOpenDropdown(link.key)}
                    onMouseLeave={() => link.subLinks && setOpenDropdown(null)}
                  >
                    {link.key === 'services' ? (
                      <MotionLink
                        smooth
                        to={link.href}
                        className={`relative text-xs xl:text-sm font-medium text-blue-900/70 transition-colors hover:text-blue-600 flex items-center cursor-pointer whitespace-nowrap ${
                          isLinkActive(link) ? 'text-blue-600' : ''
                        }`}
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                        onClick={() => setActiveSection(link.hash || `#${link.key}`)}
                      >
                        <span className="hidden xl:inline">{link.name}</span>
                        <span className="xl:hidden">
                          {link.name === 'Book Consultation' ? 'Book' : link.name}
                        </span>
                        {link.subLinks && (
                          <ChevronDown
                            className="w-3 h-3 ml-1 transition-transform xl:w-4 xl:h-4 group-hover:rotate-180"
                          />
                        )}
                      </MotionLink>
                    ) : link.key === 'resources' || link.key === 'solutions' ? (
                      <span
                        className={`relative text-xs xl:text-sm font-medium text-blue-900/70 transition-colors hover:text-blue-600 flex items-center cursor-pointer whitespace-nowrap ${
                          isLinkActive(link) ? 'text-blue-600' : ''
                        }`}
                      >
                        <span className="hidden xl:inline">{link.name}</span>
                        <span className="xl:hidden">
                          {link.name === 'Book Consultation' ? 'Book' : link.name}
                        </span>
                        {link.subLinks && (
                          <ChevronDown
                            className="w-3 h-3 ml-1 transition-transform xl:w-4 xl:h-4 group-hover:rotate-180"
                          />
                        )}
                      </span>
                    ) : (
                      <MotionLink
                        smooth
                        to={link.href}
                        className={`relative text-xs xl:text-sm font-medium text-blue-900/70 transition-colors hover:text-blue-600 flex items-center whitespace-nowrap ${
                          isLinkActive(link) ? 'text-blue-600' : ''
                        }`}
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                        onClick={() => setActiveSection(link.hash || `#${link.key}`)}
                      >
                        <span className="hidden xl:inline">{link.name}</span>
                        <span className="xl:hidden">
                          {link.name === 'Book Consultation' ? 'Book' : link.name}
                        </span>
                        {link.subLinks && (
                          <ChevronDown
                            className="w-3 h-3 ml-1 transition-transform xl:w-4 xl:h-4 group-hover:rotate-180"
                          />
                        )}
                      </MotionLink>
                    )}
                    {isLinkActive(link) && (
                      <motion.div
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600"
                        layoutId="underline"
                        transition={{ type: 'spring', stiffness: 300 }}
                      />
                    )}
                    <AnimatePresence>
                      {link.subLinks && openDropdown === link.key && (
                        <motion.div
                          className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-100 min-w-[180px] xl:min-w-[240px]"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.15 }}
                        >
                         {link.subLinks.map((sub) => (
                            <div
                              key={sub.key}
                              className="relative block px-3 py-2 text-xs text-gray-700 transition-colors cursor-pointer xl:px-4 xl:py-3 xl:text-sm hover:bg-gray-100 hover:text-blue-600 group/item"
                              onClick={() => {
                                setOpenDropdown(null);

                                if (sub.href.startsWith('http')) {
                                  // OPEN IN NEW TAB ⭐⭐
                                  openExternalLink(sub.href);
                                  return;
                                }

                                // DEFAULT BEHAVIOR FOR OTHER LINKS
                                navigate(sub.href);
                                setActiveSection(link.hash || `#${link.key}`);
                              }}
                            >
                              <div className="flex items-center">
                                <span className="w-1 xl:w-1.5 h-1 xl:h-1.5 bg-blue-600 rounded-full mr-2 xl:mr-3 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />
                                {sub.name}
                              </div>
                              {'products' in sub && sub.products && (
                                <>
                                  <span className="absolute top-0 left-full hidden w-3 h-full group-hover/item:block" />
                                  <div
                                    className="absolute top-0 left-[calc(100%+0.75rem)] z-50 hidden min-w-[180px] overflow-hidden bg-white border border-gray-100 rounded-lg shadow-xl group-hover/item:block"
                                    onClick={(event) => event.stopPropagation()}
                                  >
                                    {sub.products.map((product) => (
                                      <button
                                        key={product.key}
                                        type="button"
                                        className="block w-full px-4 py-3 text-xs text-left text-gray-700 transition-colors xl:text-sm hover:bg-gray-100 hover:text-blue-600"
                                        onClick={() => {
                                          openExternalLink(product.href);
                                          setOpenDropdown(null);
                                        }}
                                      >
                                        {product.name}
                                      </button>
                                    ))}
                                  </div>
                                </>
                              )}
                            </div>
                          ))}

                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.li>
              ))}
            </ul>
            
           
            
            {/* AI Call Button - Responsive */}
            {/* <motion.button
              onClick={handleTalkToAI}
              disabled={!isWidgetReady}
              className={`px-3 xl:px-5 py-1.5 xl:py-2 text-xs xl:text-sm font-medium rounded-full transition-all shadow-sm hover:shadow-md flex items-center gap-1 xl:gap-2 relative overflow-hidden whitespace-nowrap ${
                isWidgetReady ? 'bg-black text-white hover:text-blue-500' : 'bg-gray-300 text-black-500 cursor-not-allowed'
              }`}
              whileHover={isWidgetReady ? { scale: 1.05 } : {}}
              whileTap={isWidgetReady ? { scale: 0.95 } : {}}
            >
              {isWidgetReady && (
                <motion.span
                  className="absolute inset-0 z-0 bg-white"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
              <motion.span className="relative z-10 flex items-center gap-1 xl:gap-2">
                <Bot size={12} className="xl:w-4 xl:h-4" />
                <span className="hidden lg:inline xl:hidden">AI Call</span>
                <span className="hidden xl:inline">Call with AI</span>
                <span className="lg:hidden">AI</span>
              </motion.span>
            </motion.button> */}
          </div>

          <div className="items-center justify-end hidden ml-auto lg:flex">
            {/* Get Started Button - Only show if not logged in */}
            {!user && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, type: 'spring', stiffness: 300 }}
              >
                <MotionLink
                  smooth
                  to="/book-consultation"
                  className="px-4 xl:px-8 py-1.5 xl:py-2.5 bg-blue-900 text-white text-xs xl:text-sm font-medium rounded-full hover:bg-blue-700 transition-all shadow-sm hover:shadow-md whitespace-nowrap"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveSection('#pricing')}
                >
                  <span className="hidden xl:inline">Book Consultation</span>
                  <span className="xl:hidden">Start</span>
                </MotionLink>
              </motion.div>
            )}
          </div>

          {/* Mobile Navigation - Enhanced for different mobile sizes */}
          <div className="flex items-center gap-1 sm:gap-2 lg:hidden">
            {/* Mobile AI Call Button */}
           
            
            {/* Mobile Menu Button */}
            <motion.button
              className="z-50 p-1.5 sm:p-2 transition-colors rounded-full hover:bg-blue-50/50"
              onClick={toggleMenu}
              aria-label="Toggle Menu"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMenuOpen ? (
                <X size={20} className="text-blue-900 sm:w-6 sm:h-6" />
              ) : (
                <Menu size={20} className="text-blue-900 sm:w-6 sm:h-6" />
              )}
            </motion.button>
          </div>
        </nav>

        {/* Mobile Menu - Enhanced responsive design */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: '-100%' }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: '-100%' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="fixed inset-0 top-[60px] sm:top-[80px] z-40 bg-white/95 backdrop-blur-md lg:hidden overflow-y-auto"
            >
           <div className="flex flex-col items-end justify-start min-h-screen px-8 py-8 space-y-4 sm:space-y-6 sm:px-12">
                {topNavLinks.map((link, index) => {
                  const delay = 0.1 * index;
                  return (
                    <motion.div
                      key={link.key}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay, duration: 0.3 }}
                      className="w-full max-w-sm"
                    >
                      {link.key === 'services' ? (
                        <>
                          <MotionLink
                            smooth
                            to={link.href}
                            className={`block py-3 pr-4 text-base sm:text-lg font-semibold transition-colors text-right ${
                              isLinkActive(link) ? 'text-blue-600' : 'text-blue-900/80 hover:text-blue-600'
                            }`}
                            onClick={() => {
                              setIsMenuOpen(false);
                              setActiveSection(link.hash || `#${link.key}`);
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {link.name}
                          </MotionLink>
                          <div
                            className="flex items-center justify-end w-full py-2 pr-4 cursor-pointer"
                            onClick={() =>
                              setMobileOpenSub((prev) => ({ ...prev, [link.key]: !prev[link.key] }))
                            }
                          >
                            <ChevronDown
                              className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 mr-2 ${
                                mobileOpenSub[link.key] ? 'rotate-180' : ''
                              }`}
                            />
                            <span className="text-sm text-blue-900/60">View All Services</span>
                          </div>
                          <AnimatePresence>
                            {mobileOpenSub[link.key] && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="w-full overflow-hidden"
                              >
                                <div className="px-4 pr-8 space-y-2 text-right">
                                  {link.subLinks?.map((sub) => (
                                    <MotionLink
                                      key={sub.key}
                                      to={sub.href}
                                      className={`block py-2 sm:py-3 text-sm sm:text-base transition-colors border-r-2 border-transparent hover:border-blue-600 hover:text-blue-600 cursor-pointer text-right ${
                                        location.pathname === sub.href ? 'border-blue-600 text-blue-600 bg-blue-50' : 'text-blue-900/70'
                                      }`}
                                      whileHover={{ x: 2 }}
                                      onClick={() => {
                                        setIsMenuOpen(false);
                                        setMobileOpenSub({});
                                        navigate(sub.href);
                                      }}
                                    >
                                      {sub.name}
                                      <span className="inline-block w-2 h-2 ml-2 transition-opacity duration-300 bg-blue-600 rounded-full opacity-0 group-hover:opacity-100" />
                                    </MotionLink>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : link.subLinks ? (
                        <>
                          <div
                            className="flex items-center justify-end w-full py-3 pr-4 cursor-pointer"
                            onClick={() =>
                              setMobileOpenSub((prev) => ({ ...prev, [link.key]: !prev[link.key] }))
                            }
                          >
                            <ChevronDown
                              className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 mr-2 ${
                                mobileOpenSub[link.key] ? 'rotate-180' : ''
                              }`}
                            />
                            <span
                              className={`text-base sm:text-lg font-semibold transition-colors ${
                                isLinkActive(link) ? 'text-blue-600' : 'text-blue-900/80 hover:text-blue-600'
                              }`}
                            >
                              {link.name}
                            </span>
                          </div>
                          <AnimatePresence>
                            {mobileOpenSub[link.key] && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="w-full overflow-hidden"
                              >
                                <div className="px-4 pr-8 space-y-2 text-right">
                                  {link.subLinks.map((sub) => (
                                    <MotionLink
                                      key={sub.key}
                                      to={sub.href}
                                      className={`block py-2 sm:py-3 text-sm sm:text-base transition-colors border-r-2 border-transparent hover:border-blue-600 hover:text-blue-600 cursor-pointer text-right ${
                                        location.pathname === sub.href ? 'border-blue-600 text-blue-600 bg-blue-50' : 'text-blue-900/70'
                                      }`}
                                      whileHover={{ x: 2 }}
                                      onClick={() => {
                                        setIsMenuOpen(false);
                                        setMobileOpenSub({});
                                        navigate(sub.href);
                                        setActiveSection(link.hash || `#${link.key}`);
                                      }}
                                    >
                                      {sub.name}
                                      <span className="inline-block w-2 h-2 ml-2 transition-opacity duration-300 bg-blue-600 rounded-full opacity-0 group-hover:opacity-100" />
                                    </MotionLink>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <MotionLink
                          smooth
                          to={link.href}
                          className={`block py-3 pr-4 text-base sm:text-lg font-semibold transition-colors text-right ${
                            isLinkActive(link) ? 'text-blue-600' : 'text-blue-900/80 hover:text-blue-600'
                          }`}
                          onClick={() => {
                            setIsMenuOpen(false);
                            setActiveSection(link.hash || `#${link.key}`);
                          }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {link.name}
                        </MotionLink>
                      )}
                    </motion.div>
                  );
                })}
                
                
                
                {/* Mobile Get Started Button - Only show if not logged in */}
                {!user && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.3 }}
                    className="w-full max-w-sm px-4"
                  >
                    <MotionLink
                      smooth
                      to="/book-consultation"
                      className="block w-full px-6 py-3 text-base font-medium text-center text-white transition-colors bg-blue-600 rounded-full shadow-sm sm:py-4 sm:text-lg hover:bg-blue-700 hover:shadow-md"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setActiveSection('#pricing');
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Book a Consultation
                    </MotionLink>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </motion.header>
  );
};

export default Navbar;


