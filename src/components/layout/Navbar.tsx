import { useState, useEffect } from 'react';
import { Menu, X, Bot, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';
import Container from '../ui/Container';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

// Create a motion-enabled Link component
const MotionLink = motion(Link);

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
    if (path === '/blogs' || path === '/community' || path === '/audit-form') return '#resources';
    return '#home';
  });

  // Scroll-based effects
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

  // Updated topNavLinks to match Footer's services structure
  const services = [
    { title: 'AI-Powered Chatbots', slug: 'ai-chatbots', key: 'ai-chatbots' },
    { title: 'Agentic AI Workflows', slug: 'agentic-ai-workflows', key: 'agentic-ai-workflows' },
    { title: 'Smart Process Automation', slug: 'smart-process-automation', key: 'smart-process-automation' },
    { title: 'Lightweight AI Apps', slug: 'ai-apps-micro-saas', key: 'ai-apps-micro-saas' },
  ];

  const topNavLinks = [
    { name: 'Home', href: isHomePage ? '#home' : '/', key: 'home', hash: '#home', path: '/' },
    {
      name: 'Services',
      href: isHomePage ? '#services' : '/services',
      key: 'services',
      hash: '#services',
      path: '/',
      subLinks: services.map((service) => ({
        name: service.title,
        href: `/services/${service.slug}`,
        key: service.key,
      })),
    },
    { name: 'Book Consultation', href: isHomePage ? '#pricing' : '/#pricing', key: 'pricing', hash: '#pricing', path: '/' },
    { name: 'Solutions', href: isHomePage ? '#solutions' : '/solutions', key: 'solutions', hash: '#solutions', path: '/' },
    {
      name: 'Resources',
      href: '/resources',
      key: 'resources',
      subLinks: [
        { name: 'Blog', href: '/blogs', key: 'blogs' },
        { name: 'Community', href: '/community', key: 'community' },
        { name: 'Audit Form', href: '/audit-form', key: 'audit-form' },
      ],
    },
    { name: 'Contact', href: isHomePage ? '#contact' : '/#contact', key: 'contact', hash: '#contact', path: '/' },
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
          return path === '/solutions';
        case 'resources':
          return path === '/blogs' || path === '/community' || path === '/audit-form';
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
      else if (path === '/solutions') newActive = '#solutions';
      else if (path === '/blogs' || path === '/community' || path === '/audit-form') newActive = '#resources';
      else if (path === '/') newActive = '#home';
    }
    setActiveSection(newActive);
  }, [location.hash, location.pathname, isHomePage]);

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
        <nav className="flex items-center justify-between h-full">
          {/* Logo */}
          <MotionLink
            to="/#home"
            smooth
            className="z-50 flex items-center gap-3"
            style={{ scale: logoScale }}
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
            onClick={() => setActiveSection('#home')}
          >
            <motion.img src="/logo.svg" alt="Teeny Tech Trek Logo" className="w-12 h-15 ml-[-15px]" />
            <motion.span
              className="text-xl font-semibold tracking-tight text-blue-900"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              Teeny Tech Trek
            </motion.span>
          </MotionLink>

          {/* Desktop Navigation */}
          <div className="items-center hidden gap-8 lg:flex">
            <ul className="flex items-center gap-6">
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
                    <MotionLink
                      smooth
                      to={link.href}
                      className={`relative text-sm font-medium text-blue-900/70 transition-colors hover:text-blue-600 flex items-center ${
                        isLinkActive(link) ? 'text-blue-600' : ''
                      }`}
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      onClick={() => setActiveSection(link.hash || `#${link.key}`)}
                    >
                      {link.name}
                      {link.subLinks && (
                        <ChevronDown
                          className="w-4 h-4 ml-1 transition-transform group-hover:rotate-180"
                        />
                      )}
                    </MotionLink>
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
                          className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-100 min-w-[240px]"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.15 }}
                        >
                          {link.subLinks.map((sub) => (
                            <MotionLink
                              key={sub.key}
                              to={sub.href}
                              className="block px-4 py-3 text-sm text-gray-700 transition-colors cursor-pointer hover:bg-gray-100 hover:text-blue-600 group/item"
                              whileHover={{ x: 4 }}
                              onClick={() => {
                                setOpenDropdown(null);
                                navigate(sub.href);
                                setActiveSection(link.hash || `#${link.key}`);
                              }}
                            >
                              <div className="flex items-center">
                                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />
                                {sub.name}
                              </div>
                            </MotionLink>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.li>
              ))}
            </ul>
            {user ? (
              <div className="flex items-center gap-4">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                  <MotionLink
                    to="/admin"
                    smooth
                    className="flex items-center gap-2 text-sm font-medium transition-colors text-blue-900/70 hover:text-blue-600"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    Hi, {user.username}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2V9a2 2 0 00-2-2h-2a2 2 0 00-2 2v10m0 0a2 2 0 01-2 2H5a2 2 0 01-2-2V9"
                      />
                    </svg>
                  </MotionLink>
                </motion.div>
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  onClick={handleLogout}
                  className="text-sm font-medium text-red-500 hover:text-red-600"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Logout
                </motion.button>
              </div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                <motion.button
                  onClick={handleLoginClick}
                  className="text-sm font-medium transition-colors text-blue-900/70 hover:text-blue-600"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  Login
                </motion.button>
              </motion.div>
            )}
            <motion.button
              onClick={handleTalkToAI}
              disabled={!isWidgetReady}
              className={`px-5 py-2 text-sm font-medium rounded-full transition-all shadow-sm hover:shadow-md flex items-center gap-2 relative overflow-hidden ${
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
              <motion.span className="relative z-10 flex items-center gap-2">
                <Bot size={16} /> Start a call with AI
              </motion.span>
            </motion.button>
            {!user && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, type: 'spring', stiffness: 300 }}
              >
                <MotionLink
                  smooth
                  to="/#contact"
                  className="px-8 py-2.5 bg-blue-900 mr-[-2rem] text-white text-sm font-medium rounded-full hover:bg-blue-700 transition-all shadow-sm hover:shadow-md"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveSection('#contact')}
                >
                  Get Started
                </MotionLink>
              </motion.div>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="flex items-center gap-2 lg:hidden">
            <motion.button
              onClick={handleTalkToAI}
              disabled={!isWidgetReady}
              className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all flex items-center gap-2 relative overflow-hidden ${
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
              <motion.span className="relative z-10 flex items-center gap-1">
                <Bot size={14} /> AI Call
              </motion.span>
            </motion.button>
            <motion.button
              className="z-50 p-2 transition-colors rounded-full hover:bg-blue-50/50"
              onClick={toggleMenu}
              aria-label="Toggle Menu"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMenuOpen ? <X size={24} className="text-blue-900" /> : <Menu size={24} className="text-blue-900" />}
            </motion.button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: '-100%' }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: '-100%' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="fixed inset-0 top-[80px] z-40 bg-white/95 backdrop-blur-md lg:hidden"
            >
              <div className="flex flex-col items-center justify-center min-h-screen space-y-6">
                {topNavLinks.map((link, index) => {
                  const delay = 0.1 * index;
                  return (
                    <motion.div
                      key={link.key}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay, duration: 0.3 }}
                    >
                      {link.subLinks ? (
                        <>
                          <div
                            className="flex items-center justify-between w-full px-4 py-2 cursor-pointer"
                            onClick={() =>
                              setMobileOpenSub((prev) => ({ ...prev, [link.key]: !prev[link.key] }))
                            }
                          >
                            <span
                              className={`text-lg font-semibold transition-colors ${
                                isLinkActive(link) ? 'text-blue-600' : 'text-blue-900/80 hover:text-blue-600'
                              }`}
                            >
                              {link.name}
                            </span>
                            <ChevronDown
                              className={`w-5 h-5 transition-transform duration-200 ${
                                mobileOpenSub[link.key] ? 'rotate-180' : ''
                              }`}
                            />
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
                                <div className="px-4 pl-8 space-y-2">
                                  {link.subLinks.map((sub) => (
                                    <MotionLink
                                      key={sub.key}
                                      to={sub.href}
                                      className={`block py-2 text-base transition-colors border-l-2 border-transparent hover:border-blue-600 hover:text-blue-600 cursor-pointer ${
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
                                      <span className="inline-block w-2 h-2 mr-2 transition-opacity duration-300 bg-blue-600 rounded-full opacity-0 group-hover:opacity-100" />
                                      {sub.name}
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
                          className={`block py-2 text-lg font-semibold transition-colors ${
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
                {user ? (
                  <>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7, duration: 0.3 }}
                    >
                      <MotionLink
                        to="/admin"
                        smooth
                        className="flex items-center gap-2 text-lg font-medium text-blue-900/70 hover:text-blue-600"
                        onClick={() => {
                          setIsMenuOpen(false);
                          setActiveSection('');
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Hi, {user.username}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 19v-6a2 2 0 00-2-2h4a2 2 0 00-2-2h6a2 2 0 00-2-2v6a2 2 0 002 2h2a2 2 0 002-2V9a2 2 0 00-2-2h-2a2 2 0 00-2 2v10m0 0a2 2 0 01-2 2h-5a2 2 0 01-2-2V9"
                          />
                        </svg>
                      </MotionLink>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8, duration: 0.3 }}
                    >
                      <motion.button
                        onClick={handleLogout}
                        className="text-lg font-medium text-red-500 hover:text-red-600"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Logout
                      </motion.button>
                    </motion.div>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.3 }}
                  >
                    <motion.button
                      onClick={handleLoginClick}
                      className="text-lg font-medium text-blue-900/70 hover:text-blue-600"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Login
                    </motion.button>
                  </motion.div>
                )}
                {!user && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.3 }}
                  >
                    <MotionLink
                      smooth
                      to="/#contact"
                      className="px-6 py-3 text-lg font-medium text-white transition-colors bg-blue-600 rounded-full shadow-sm hover:bg-blue-700 hover:shadow-md"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setActiveSection('#contact');
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Get Started
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