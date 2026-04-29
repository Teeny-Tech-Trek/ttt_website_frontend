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
  automation: <FaRobot className="w-5 h-5 text-blue-500" />,
  intelligent: <FaBrain className="w-5 h-5 text-purple-500" />,
  analytics: <FaChartBar className="w-5 h-5 text-green-500" />,
  chatbot: <FaComments className="w-5 h-5 text-pink-500" />,
  language: <FaLanguage className="w-5 h-5 text-red-500" />,
  search: <FaSearch className="w-5 h-5 text-yellow-500" />,
  custom: <FaCogs className="w-5 h-5 text-indigo-500" />,
  insights: <FaLightbulb className="w-5 h-5 text-orange-500" />,
  code: <FaCode className="w-5 h-5 text-teal-500" />,
  cloud: <FaCloud className="w-5 h-5 text-cyan-500" />,
  
  // New specific icons
  email: <FaEnvelope className="w-5 h-5 text-blue-400" />,
  mobile: <FaMobile className="w-5 h-5 text-green-400" />,
  security: <FaShieldAlt className="w-5 h-5 text-red-400" />,
  database: <FaDatabase className="w-5 h-5 text-purple-400" />,
  professional: <FaUserTie className="w-5 h-5 text-indigo-400" />,
  ecommerce: <FaShoppingCart className="w-5 h-5 text-amber-500" />,
  image: <FaCamera className="w-5 h-5 text-pink-400" />,
  video: <FaVideo className="w-5 h-5 text-rose-500" />,
  support: <FaHeadset className="w-5 h-5 text-emerald-500" />,
  design: <FaPalette className="w-5 h-5 text-fuchsia-500" />,
  document: <FaFileAlt className="w-5 h-5 text-slate-500" />,
  network: <FaNetworkWired className="w-5 h-5 text-lime-500" />,
  privacy: <FaLock className="w-5 h-5 text-violet-500" />,
  fast: <FaRocket className="w-5 h-5 text-orange-400" />,
  global: <FaGlobe className="w-5 h-5 text-sky-500" />,
  trends: <FaChartLine className="w-5 h-5 text-emerald-400" />,
  integration: <FaSync className="w-5 h-5 text-cyan-400" />,
  notification: <FaBell className="w-5 h-5 text-yellow-400" />,
  authentication: <FaKey className="w-5 h-5 text-amber-600" />,
  
  default: <FaCogs className="w-5 h-5 text-gray-400" />,
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
                <div className="absolute inset-0 transition-opacity duration-500 opacity-0 bg-gradient-to-br from-blue-50/50 to-transparent group-hover:opacity-100" />
                
                <div className="flex items-center gap-3 mb-4">
                  {React.cloneElement(service.icon, {
                    className: 'w-8 h-8 text-blue-900',
                  })}
                  <h3 className="text-lg font-bold leading-tight text-blue-900 transition-colors duration-300 group-hover:text-blue-700">
                    {service.title}
                  </h3>
                </div>

                <p className="mb-4 text-sm leading-relaxed text-black">{service.description}</p>

                {/* Features with updated icons */}
                <div className="grid grid-cols-1 gap-3 mb-4 sm:grid-cols-2">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-blue-50/30">
                      {getIconForFeature(feature)}
                      <span className="text-sm font-medium text-blue-900">{truncateFeature(feature)}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto">
                  <span className="inline-flex items-center gap-2 font-medium text-blue-900 transition-all cursor-pointer hover:text-blue-500 group-hover:translate-x-1">
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