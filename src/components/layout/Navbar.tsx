import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
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
    { name: 'Blogs', href: isHomePage ? '#blogs' : '/blogs', hash: '#blogs', path: '/blogs' },
    { name: 'Events', href: isHomePage ? '#events' : '/#events', hash: '#events', path: '/' },
    { name: 'Tech Stack', href: isHomePage ? '#tech-stack' : '/#tech-stack', hash: '#tech-stack', path: '/' },
    { name: 'Pricing', href: isHomePage ? '#pricing' : '/#pricing', hash: '#pricing', path: '/' },
    { name: 'Contact', href: isHomePage ? '#contact' : '/#contact', hash: '#contact', path: '/' },
  ];

  // Track active section based on scroll position
  const [activeSection, setActiveSection] = useState('#home');

  useEffect(() => {
    if (!isHomePage) return;

   const handleScroll = () => {
  const offsets = navLinks.map((link) => {
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
    // fallback: pick the nearest section by distance
    const closest = offsets.reduce((prev, curr) =>
      curr.top < prev.top ? curr : prev
    );
    setActiveSection(closest.hash);
  }
};


    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage, navLinks]);

  const isLinkActive = (linkHash: string, linkPath: string): boolean => {
    if (linkPath !== '/' && location.pathname === linkPath) return true;
    if (isHomePage && activeSection === linkHash) return true;
    return location.pathname === '/' && location.hash === linkHash;
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
            to="/home"
            smooth
            className="flex items-center gap-3 z-50"
            style={{ scale: logoScale }}
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
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
                    className={`relative text-sm font-medium text-blue-900/70 transition-colors hover:text-blue-600 ${
                      isLinkActive(link.hash, link.path) ? 'text-blue-600' : ''}`}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 300 }}
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
                    className="text-sm text-blue-900/70 hover:text-blue-600 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    Hi, {user.role}
                  </MotionLink>
                </motion.div>
                <motion.button
                  onClick={handleLogout}
                  className="text-sm text-red-500 hover:text-red-600 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Logout
                </motion.button>
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
                  className="text-sm text-blue-900/70 hover:text-blue-600 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  Login
                </MotionLink>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, type: 'spring', stiffness: 300 }}
            >
              <MotionLink
                smooth
                to="/#contact"
                className="px-8 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-full hover:bg-blue-700 transition-all shadow-sm hover:shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
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
                      className={`text-lg font-semibold transition-colors ${
                        isLinkActive(link.hash, link.path)
                          ? 'text-blue-600'
                          : 'text-blue-900/80 hover:text-blue-600'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
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
                        className="text-lg font-medium text-blue-900/70 hover:text-blue-600"
                        onClick={() => setIsMenuOpen(false)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Hi, {user.sub}
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
                      onClick={() => setIsMenuOpen(false)}
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
                    className="px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-full hover:bg-blue-700 transition-all shadow-sm hover:shadow-md"
                    onClick={() => setIsMenuOpen(false)}
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