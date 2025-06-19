import { useState, useEffect } from 'react';
import { Menu, X, Bot } from 'lucide-react';
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
  const { user, logout } = useAuth();
  const isHomePage = location.pathname === '/';

  // State for Convai widget
  const [isWidgetReady, setIsWidgetReady] = useState(false);
  const [isWidgetVisible, setIsWidgetVisible] = useState(false);
  const [convaiError, setConvaiError] = useState<string | null>(null);

  // Initialize activeSection based on URL hash
  const [activeSection, setActiveSection] = useState(() => {
    // Only use hash if we're on the home page
    if (isHomePage && location.hash) {
      return location.hash;
    }
    // For other pages, check if we're on a specific route
    if (location.pathname === '/blogs') return '#blogs';
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
    navigate('/login');
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

    // Initial check
    checkWidget();

    // Poll every 500ms, timeout after 20s
    const maxAttempts = 40; // 20s / 500ms
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

    // Listen for script load/error
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
        // Show widget and backdrop
        convaiElement.classList.add('visible');
        backdrop.classList.add('visible');
        setIsWidgetVisible(true);

        // Optional: Trigger widget initialization (adjust based on docs)
        convaiElement.dispatchEvent(new CustomEvent('open-convai-widget'));
        console.log('Displayed elevenlabs-convai widget');

        // Add click handler to hide widget when clicking backdrop
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

  const navLinks = [
    { name: 'Home', href: isHomePage ? '#home' : '/#home', hash: '#home', path: '/' },
    { name: 'Services', href: isHomePage ? '#services' : '/#services', hash: '#services', path: '/' },
    { name: 'Blogs', href: isHomePage ? '#blogs' : '/blogs', hash: '#blogs', path: '/' },
    { name: 'Events', href: isHomePage ? '#events' : '/#events', hash: '#events', path: '/' },
    { name: 'Tech Stack', href: isHomePage ? '#tech-stack' : '/#tech-stack', hash: '#tech-stack', path: '/' },
    { name: 'Pricing', href: isHomePage ? '#pricing' : '/#pricing', hash: '#pricing', path: '/' },
    { name: 'Contact', href: isHomePage ? '#contact' : '/#contact', hash: '#contact', path: '/' },
  ];

  // Track active section based on scroll position
  useEffect(() => {
    if (!isHomePage) return;

    const updateActiveSection = () => {
      const offsets = navLinks
        .filter(link => link.path === '/') // Only consider links that are on the home page
        .map((link) => {
          const element = document.querySelector(link.hash);
          if (!element) return { hash: link.hash, visible: false, top: Infinity };

          const rect = element.getBoundingClientRect();
          return {
            hash: link.hash,
            visible: rect.top <= window.innerHeight * 0.5 && rect.bottom >= 100,
            top: Math.abs(rect.top),
          };
        });

      const visibleSection = offsets.find((section) => section.visible);
      if (visibleSection) {
        setActiveSection(visibleSection.hash);
      } else {
        const closest = offsets.reduce((prev, curr) =>
          curr.top < prev.top ? curr : prev
        );
        setActiveSection(closest.hash);
      }
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection);
    return () => window.removeEventListener('scroll', updateActiveSection);
  }, [isHomePage, navLinks]);

  // Sync activeSection with location
  useEffect(() => {
    if (isHomePage && location.hash) {
      setActiveSection(location.hash);
    } else if (location.pathname === '/blogs') {
      setActiveSection('#blogs');
    } else if (!isHomePage) {
      setActiveSection('#home');
    }
  }, [location.hash, location.pathname, isHomePage]);

  const isLinkActive = (linkHash: string, linkPath: string): boolean => {
    // For non-home pages
    if (!isHomePage) {
      return location.pathname === linkPath;
    }
    
    // For home page
    return activeSection === linkHash;
  };

  if (location.pathname.startsWith('/admin') || location.pathname.startsWith('/login')) {
    return null;
  }

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 font-sans"
      style={{ height: navHeight }}
    >
      <motion.div
        className="absolute inset-0 bg-white/80 backdrop-blur-lg border-b border-gray-100/20"
        style={{ opacity: backgroundOpacity }}
      />
      <Container className="relative h-full">
        <nav className="flex items-center justify-between h-full">
          {/* Logo */}
          <MotionLink
            to="/#home"
            smooth
            className="flex items-center gap-3 z-50"
            style={{ scale: logoScale }}
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
            onClick={() => setActiveSection('#home')}
          >
            <motion.img
              src="/logo.svg"
              alt="Teeny Tech Trek Logo"
              className="w-9 h-9"
            />
            <motion.span
              className="text-xl font-semibold text-blue-900 tracking-tight"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              Teeny Tech Trek
            </motion.span>
          </MotionLink>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <ul className="flex items-center gap-6">
              {navLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.4 }}
                >
                  <MotionLink
                    smooth
                    to={link.href}
                    className={`relative text-sm font-medium text-blue-900/70 transition-colors hover:text-blue-600 ${isLinkActive(link.hash, link.path) ? 'text-blue-600' : ''}`}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    onClick={() => setActiveSection(link.hash)}
                  >
                    {link.name}
                    {isLinkActive(link.hash, link.path) && (
                      <motion.div
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600"
                        layoutId="underline"
                        transition={{ type: 'spring', stiffness: 300 }}
                      />
                    )}
                  </MotionLink>
                </motion.li>
              ))}
            </ul>

            {user ? (
              <div className="flex items-center gap-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <MotionLink
                    to="/admin"
                    smooth
                    className="text-sm font-medium text-blue-900/70 hover:text-blue-600 transition-colors flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    Hi, {user.role}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2V9a2 2 0 00-2-2h-2a2 2 0 00-2 2v10m0 0a2 2 0 01-2 2H5a2 2 0 01-2-2V9" />
                    </svg>
                  </MotionLink>
                </motion.div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <MotionLink
                  to="/login"
                  smooth
                  className="text-sm font-medium text-blue-900/70 hover:text-blue-600 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  Login
                </MotionLink>
              </motion.div>
            )}

            <motion.button
              onClick={handleTalkToAI}
              disabled={!isWidgetReady}
              className={`px-5 py-2 text-sm font-medium rounded-full transition-all shadow-sm hover:shadow-md flex items-center gap-2 relative overflow-hidden ${isWidgetReady
                  ? 'bg-black text-white hover:text-black'
                  : 'bg-gray-300 text-black-500 cursor-not-allowed'
                }`}
              whileHover={isWidgetReady ? { scale: 1.05 } : {}}
              whileTap={isWidgetReady ? { scale: 0.95 } : {}}
            >
              {/* Background animation on hover */}
              {isWidgetReady && (
                <motion.span
                  className="absolute inset-0 bg-white z-0"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}

              {/* Content with z-index to appear above background */}
              <motion.span className="flex items-center gap-2 z-10 relative">
                <Bot size={16} />
                Start a call with AI
              </motion.span>
            </motion.button>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, type: 'spring', stiffness: 300 }}
            >
              <MotionLink
                smooth
                to="/#contact"
                className="px-8 py-2.5 bg-blue-600   mr-[-2rem] text-white text-sm font-medium rounded-full hover:bg-blue-700 transition-all shadow-sm hover:shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveSection('#contact')}
              >
                Get Started
              </MotionLink>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden z-50 p-2 rounded-full hover:bg-blue-50/50 transition-colors"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMenuOpen ? (
              <X size={24} className="text-blue-900" />
            ) : (
              <Menu size={24} className="text-blue-900" />
            )}
          </motion.button>
        </nav>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: '-100%' }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: '-100%' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="fixed inset-0 top-0 z-40 bg-white/95 backdrop-blur-md lg:hidden"
            >
              <div className="flex flex-col items-center justify-center min-h-screen space-y-6">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.3 }}
                  >
                    <MotionLink
                      smooth
                      to={link.href}
                      className={`text-lg font-semibold transition-colors ${isLinkActive(link.hash, link.path)
                          ? 'text-blue-600'
                          : 'text-blue-900/80 hover:text-blue-600'
                        }`}
                      onClick={() => {
                        setIsMenuOpen(false);
                        setActiveSection(link.hash);
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {link.name}
                    </MotionLink>
                  </motion.div>
                ))}

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
                        className="text-lg font-medium text-blue-900/70 hover:text-blue-600 flex items-center gap-2"
                        onClick={() => {
                          setIsMenuOpen(false);
                          setActiveSection('');
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Hi, {user.role}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2h4a2 2 0 00-2-2h6a2 2 0 00-2-2v6a2 2 0 002 2h2a2 2 0 002-2V9a2 2 0 00-2-2h-2a2 2 0 00-2 2v10m0 0a2 2 0 01-2 2h-5a2 2 0 01-2-2V9" />
                        </svg>
                      </MotionLink>
                    </motion.div>
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8, duration: 0.3 }}
                      onClick={handleLogout}
                      className="text-lg font-medium text-red-500 hover:text-red-600"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Logout
                    </motion.button>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.3 }}
                  >
                    <MotionLink
                      to="/login"
                      smooth
                      className="text-lg font-medium text-blue-900/70 hover:text-blue-600"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setActiveSection('');
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Login
                    </MotionLink>
                  </motion.div>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.3 }}
                >
                  <MotionLink
                    smooth
                    to="/#contact"
                    className="px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-full hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md"
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
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </motion.header>
  );
};

export default Navbar;