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
<<<<<<< HEAD
      className="relative min-h-screen py-12 font-sans bg-gray-50 sm:py-16 md:py-20 lg:py-24 xl:py-28 2xl:py-32"
      style={{ opacity: bgOpacity }}
    >
      {/* Responsive blurred background visuals */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute bg-blue-100 rounded-full blur-2xl opacity-20
                     w-48 h-48 top-1/5 left-1/5
                     sm:w-56 sm:h-56
                     md:w-64 md:h-64
                     lg:w-80 lg:h-80
                     xl:w-96 xl:h-96
                     2xl:w-[28rem] 2xl:h-[28rem]"
          animate={{ x: [0, 24, 0], y: [0, 32, 0] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: 'mirror' }}
        />
        <motion.div
          className="absolute bg-blue-200 rounded-full blur-2xl opacity-15
                     w-40 h-40 bottom-1/5 right-1/5
                     sm:w-44 sm:h-44
                     md:w-52 md:h-52
                     lg:w-64 lg:h-64
                     xl:w-80 xl:h-80
                     2xl:w-[24rem] 2xl:h-[24rem]"
          animate={{ x: [0, -20, 0], y: [0, -30, 0] }}
          transition={{ duration: 25, repeat: Infinity, repeatType: 'mirror' }}
        />
      </div>

      <Container className="relative z-10 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 max-w-none">
        <div className="max-w-7xl mx-auto
                        2xl:max-w-[1600px]">
          <SectionHeading
            title="Our AI-Powered Services"
            subtitle="Innovative solutions designed for ambitious teams and next-gen projects."
            className="max-w-4xl mx-auto text-center 2xl:max-w-6xl"
          />

          <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
            className="grid grid-cols-1 gap-6 mt-8 sm:gap-8 sm:mt-10 md:grid-cols-2 md:gap-8 lg:gap-10 lg:mt-12 xl:grid-cols-2 xl:gap-12 xl:mt-16 2xl:grid-cols-2 2xl:gap-16 2xl:mt-20"
          >
            <AnimatePresence>
              {services.map((service, idx) => (
                <motion.div
                  key={idx}
                  variants={cardVariants}
                  className="relative bg-white shadow-lg hover:shadow-xl border border-gray-100/30 
                             transition-all duration-300 flex flex-col h-full
                             rounded-xl p-6 min-h-[280px]
                             sm:rounded-2xl sm:p-7 sm:min-h-[300px]
                             md:p-8 md:min-h-[320px]
                             lg:p-9 lg:min-h-[350px]
                             xl:p-10 xl:min-h-[380px] xl:rounded-3xl
                             2xl:p-12 2xl:min-h-[420px]
                             hover:shadow-[0_8px_32px_0_rgba(59,130,246,0.18)]
                             hover:scale-[1.02]
                             lg:hover:scale-[1.03]
                             2xl:hover:scale-[1.04]"
                  tabIndex={0}
                  role="region"
                  aria-label={service.title}
                  whileHover={{ 
                    y: -8,
                    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
                  }}
                >
                  <Link
                    to={`/services/${service.slug}`}
                    className="absolute inset-0 z-10 rounded-inherit"
                    tabIndex={-1}
                    aria-hidden="true"
                  />
                  
                  <div className="flex items-center gap-3 mb-3 sm:gap-4 sm:mb-4 lg:mb-5 xl:mb-6 2xl:gap-5 2xl:mb-8">
                    {React.cloneElement(service.icon, {
                      className: `text-blue-600
                                 w-6 h-6
                                 sm:w-7 sm:h-7
                                 md:w-8 md:h-8
                                 lg:w-9 lg:h-9
                                 xl:w-10 xl:h-10
                                 2xl:w-12 2xl:h-12`,
                    })}
                    <h3 className="text-lg font-semibold leading-tight text-blue-900 sm:text-xl lg:text-2xl xl:text-2xl 2xl:text-3xl">
                      {service.title}
                    </h3>
                  </div>

                  <p className="mb-3 text-sm text-blue-900/70 sm:text-base sm:mb-4 lg:text-lg lg:mb-5 xl:text-xl xl:mb-6 2xl:text-xl 2xl:mb-8">
                    {service.description}
                  </p>

                  <ul className="pl-4 mb-4 space-y-2 text-sm list-disc text-blue-800/90 sm:text-base sm:space-y-3 lg:text-lg lg:mb-6 lg:space-y-3 xl:text-xl xl:mb-8 xl:space-y-4 2xl:text-xl 2xl:mb-10 2xl:space-y-4">
                    {service.features.map((feature, i) => (
                      <li key={i} className="leading-relaxed">{feature}</li>
                    ))}
                  </ul>

                  <div className="mt-auto">
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition-all cursor-pointer hover:text-blue-700 group sm:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
                      Learn More
                      <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-1 sm:w-4 sm:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7" />
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
=======
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
>>>>>>> dev
      </Container>
    </motion.section>
  );
};

export default Services;