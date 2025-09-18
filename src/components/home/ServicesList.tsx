import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HashLink as Link } from 'react-router-hash-link';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import { services } from '../../data/services';
import { ArrowRight } from 'lucide-react';
import React from 'react';
import { 
  FaRobot, 
  FaBrain, 
  FaChartBar, 
  FaComments, 
  FaLanguage, 
  FaSearch,
  FaCogs,
  FaLightbulb,
  FaCode,
  FaCloud,
  FaEnvelope,
  FaMobile,
  FaShieldAlt,
  FaDatabase,
  FaUserTie,
  FaShoppingCart,
  FaCamera,
  FaVideo,
  FaHeadset,
  FaPalette,
  FaFileAlt,
  FaNetworkWired,
  FaLock,
  FaRocket,
  FaGlobe,
  FaChartLine,
  FaSync,
  FaBell,
  FaKey
} from 'react-icons/fa';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

// Expanded icon mapping with more specific and varied icons
const featureIcons = {
  // AI/ML icons
  automation: <FaRobot className="text-blue-500 w-5 h-5" />,
  intelligent: <FaBrain className="text-purple-500 w-5 h-5" />,
  analytics: <FaChartBar className="text-green-500 w-5 h-5" />,
  chatbot: <FaComments className="text-pink-500 w-5 h-5" />,
  language: <FaLanguage className="text-red-500 w-5 h-5" />,
  search: <FaSearch className="text-yellow-500 w-5 h-5" />,
  custom: <FaCogs className="text-indigo-500 w-5 h-5" />,
  insights: <FaLightbulb className="text-orange-500 w-5 h-5" />,
  code: <FaCode className="text-teal-500 w-5 h-5" />,
  cloud: <FaCloud className="text-cyan-500 w-5 h-5" />,
  
  // New specific icons
  email: <FaEnvelope className="text-blue-400 w-5 h-5" />,
  mobile: <FaMobile className="text-green-400 w-5 h-5" />,
  security: <FaShieldAlt className="text-red-400 w-5 h-5" />,
  database: <FaDatabase className="text-purple-400 w-5 h-5" />,
  professional: <FaUserTie className="text-indigo-400 w-5 h-5" />,
  ecommerce: <FaShoppingCart className="text-amber-500 w-5 h-5" />,
  image: <FaCamera className="text-pink-400 w-5 h-5" />,
  video: <FaVideo className="text-rose-500 w-5 h-5" />,
  support: <FaHeadset className="text-emerald-500 w-5 h-5" />,
  design: <FaPalette className="text-fuchsia-500 w-5 h-5" />,
  document: <FaFileAlt className="text-slate-500 w-5 h-5" />,
  network: <FaNetworkWired className="text-lime-500 w-5 h-5" />,
  privacy: <FaLock className="text-violet-500 w-5 h-5" />,
  fast: <FaRocket className="text-orange-400 w-5 h-5" />,
  global: <FaGlobe className="text-sky-500 w-5 h-5" />,
  trends: <FaChartLine className="text-emerald-400 w-5 h-5" />,
  integration: <FaSync className="text-cyan-400 w-5 h-5" />,
  notification: <FaBell className="text-yellow-400 w-5 h-5" />,
  authentication: <FaKey className="text-amber-600 w-5 h-5" />,
  
  default: <FaCogs className="text-gray-400 w-5 h-5" />,
};

// Helper to pick icon based on feature
const getIconForFeature = (feature) => {
  const lowerFeature = feature.toLowerCase();
  
  // Email related
  if (lowerFeature.includes('email') || lowerFeature.includes('mail')) return featureIcons.email;
  
  // Mobile related
  if (lowerFeature.includes('mobile') || lowerFeature.includes('app')) return featureIcons.mobile;
  
  // Security related
  if (lowerFeature.includes('security') || lowerFeature.includes('secure') || lowerFeature.includes('protection')) 
    return featureIcons.security;
  
  // Database related
  if (lowerFeature.includes('database') || lowerFeature.includes('storage') || lowerFeature.includes('data')) 
    return featureIcons.database;
  
  // Professional services
  if (lowerFeature.includes('professional') || lowerFeature.includes('business') || lowerFeature.includes('enterprise')) 
    return featureIcons.professional;
  
  // E-commerce
  if (lowerFeature.includes('ecommerce') || lowerFeature.includes('shop') || lowerFeature.includes('cart')) 
    return featureIcons.ecommerce;
  
  // Image related
  if (lowerFeature.includes('image') || lowerFeature.includes('photo') || lowerFeature.includes('picture')) 
    return featureIcons.image;
  
  // Video related
  if (lowerFeature.includes('video') || lowerFeature.includes('movie') || lowerFeature.includes('stream')) 
    return featureIcons.video;
  
  // Support related
  if (lowerFeature.includes('support') || lowerFeature.includes('help') || lowerFeature.includes('service')) 
    return featureIcons.support;
  
  // Design related
  if (lowerFeature.includes('design') || lowerFeature.includes('ui') || lowerFeature.includes('ux')) 
    return featureIcons.design;
  
  // Document related
  if (lowerFeature.includes('document') || lowerFeature.includes('file') || lowerFeature.includes('pdf')) 
    return featureIcons.document;
  
  // Network related
  if (lowerFeature.includes('network') || lowerFeature.includes('api') || lowerFeature.includes('connect')) 
    return featureIcons.network;
  
  // Privacy related
  if (lowerFeature.includes('privacy') || lowerFeature.includes('gdpr') || lowerFeature.includes('compliance')) 
    return featureIcons.privacy;
  
  // Speed related
  if (lowerFeature.includes('fast') || lowerFeature.includes('speed') || lowerFeature.includes('performance')) 
    return featureIcons.fast;
  
  // Global related
  if (lowerFeature.includes('global') || lowerFeature.includes('world') || lowerFeature.includes('international')) 
    return featureIcons.global;
  
  // Trends related
  if (lowerFeature.includes('trend') || lowerFeature.includes('pattern') || lowerFeature.includes('forecast')) 
    return featureIcons.trends;
  
  // Integration related
  if (lowerFeature.includes('integration') || lowerFeature.includes('sync') || lowerFeature.includes('connect')) 
    return featureIcons.integration;
  
  // Notification related
  if (lowerFeature.includes('notification') || lowerFeature.includes('alert') || lowerFeature.includes('reminder')) 
    return featureIcons.notification;
  
  // Authentication related
  if (lowerFeature.includes('authentication') || lowerFeature.includes('login') || lowerFeature.includes('signin')) 
    return featureIcons.authentication;
  
  // Original mappings (keep these as fallbacks)
  if (lowerFeature.includes('automation') || lowerFeature.includes('auto')) return featureIcons.automation;
  if (lowerFeature.includes('intelligent') || lowerFeature.includes('smart')) return featureIcons.intelligent;
  if (lowerFeature.includes('analytics') || lowerFeature.includes('analysis')) return featureIcons.analytics;
  if (lowerFeature.includes('chat') || lowerFeature.includes('conversation')) return featureIcons.chatbot;
  if (lowerFeature.includes('language') || lowerFeature.includes('translation')) return featureIcons.language;
  if (lowerFeature.includes('search') || lowerFeature.includes('discovery')) return featureIcons.search;
  if (lowerFeature.includes('custom') || lowerFeature.includes('personal')) return featureIcons.custom;
  if (lowerFeature.includes('insight') || lowerFeature.includes('analysis')) return featureIcons.insights;
  if (lowerFeature.includes('code') || lowerFeature.includes('development')) return featureIcons.code;
  if (lowerFeature.includes('cloud') || lowerFeature.includes('host')) return featureIcons.cloud;
  
  return featureIcons.default;
};

// Truncate and make feature short & snappy
const truncateFeature = (feature) => {
  return feature.length > 40 ? feature.substring(0, 37) + '...' : feature;
};

const Services = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const { scrollYProgress } = useScroll();
  const bgOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <motion.section
      id="services"
      className="relative py-20 font-sans min-h-[90vh]"
      style={{ opacity: bgOpacity }}
    >
      <Container className="relative z-10">
        <SectionHeading
          title="Our AI-Powered Solutions"
          subtitle="Innovative tools for visionary teams."
        />

        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          className="grid grid-cols-1 gap-8 mt-10 md:grid-cols-2"
        >
          <AnimatePresence>
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                variants={cardVariants}
                className="relative bg-white rounded-2xl shadow-lg hover:shadow-xl border border-blue-200/50 transition-all duration-500 flex flex-col p-6 min-h-[260px] h-full group overflow-hidden"
                tabIndex={0}
                role="region"
                aria-label={service.title}
              >
                <Link
                  to={`/services/${service.slug}`}
                  className="absolute inset-0 z-10 rounded-2xl"
                  tabIndex={-1}
                  aria-hidden="true"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="flex items-center gap-3 mb-4">
                  {React.cloneElement(service.icon, {
                    className: 'w-8 h-8 text-blue-600',
                  })}
                  <h3 className="text-lg font-bold leading-tight text-blue-900 group-hover:text-blue-700 transition-colors duration-300">
                    {service.title}
                  </h3>
                </div>

                <p className="mb-4 text-sm text-blue-700/80 leading-relaxed">{service.description}</p>

                {/* Features with updated icons */}
                <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 bg-blue-50/30 p-2 rounded-lg">
                      {getIconForFeature(feature)}
                      <span className="text-sm text-blue-800 font-medium">{truncateFeature(feature)}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto">
                  <span className="inline-flex items-center gap-2 font-medium text-blue-600 transition-all cursor-pointer hover:text-blue-800 group-hover:translate-x-1">
                    Discover More
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>
    </motion.section>
  );
};

export default Services;