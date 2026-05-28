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
  FaKey,
} from 'react-icons/fa';

/* ------------------------------------------------------------------ *
 *  RIGHT-SIDE IMAGE har card ki apni hai — `data/services` me          *
 *  har service ke andar `image: '...'` field se aati hai.              *
 *  Path wahin change karna. Jis card me image nahi, uska image area    *
 *  render hi nahi hoga.                                                *
 * ------------------------------------------------------------------ */

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

// Colored feature icons (image jaise)
const featureIcons = {
  automation: <FaRobot className="w-[18px] h-[18px] text-blue-500" />,
  intelligent: <FaBrain className="w-[18px] h-[18px] text-purple-500" />,
  analytics: <FaChartBar className="w-[18px] h-[18px] text-green-500" />,
  chatbot: <FaComments className="w-[18px] h-[18px] text-pink-500" />,
  language: <FaLanguage className="w-[18px] h-[18px] text-red-500" />,
  search: <FaSearch className="w-[18px] h-[18px] text-yellow-500" />,
  custom: <FaCogs className="w-[18px] h-[18px] text-indigo-500" />,
  insights: <FaLightbulb className="w-[18px] h-[18px] text-orange-500" />,
  code: <FaCode className="w-[18px] h-[18px] text-teal-500" />,
  cloud: <FaCloud className="w-[18px] h-[18px] text-cyan-500" />,
  email: <FaEnvelope className="w-[18px] h-[18px] text-purple-400" />,
  mobile: <FaMobile className="w-[18px] h-[18px] text-green-400" />,
  security: <FaShieldAlt className="w-[18px] h-[18px] text-red-400" />,
  database: <FaDatabase className="w-[18px] h-[18px] text-indigo-400" />,
  professional: <FaUserTie className="w-[18px] h-[18px] text-purple-400" />,
  ecommerce: <FaShoppingCart className="w-[18px] h-[18px] text-amber-500" />,
  image: <FaCamera className="w-[18px] h-[18px] text-pink-400" />,
  video: <FaVideo className="w-[18px] h-[18px] text-rose-500" />,
  support: <FaHeadset className="w-[18px] h-[18px] text-emerald-500" />,
  design: <FaPalette className="w-[18px] h-[18px] text-fuchsia-500" />,
  document: <FaFileAlt className="w-[18px] h-[18px] text-blue-400" />,
  network: <FaNetworkWired className="w-[18px] h-[18px] text-pink-500" />,
  privacy: <FaLock className="w-[18px] h-[18px] text-violet-500" />,
  fast: <FaRocket className="w-[18px] h-[18px] text-orange-400" />,
  global: <FaGlobe className="w-[18px] h-[18px] text-sky-500" />,
  trends: <FaChartLine className="w-[18px] h-[18px] text-emerald-400" />,
  integration: <FaSync className="w-[18px] h-[18px] text-blue-400" />,
  notification: <FaBell className="w-[18px] h-[18px] text-yellow-400" />,
  authentication: <FaKey className="w-[18px] h-[18px] text-amber-600" />,
  default: <FaCogs className="w-[18px] h-[18px] text-blue-400" />,
};

// Helper to pick icon based on feature
const getIconForFeature = (feature) => {
  const lowerFeature = feature.toLowerCase();

  if (lowerFeature.includes('email') || lowerFeature.includes('mail')) return featureIcons.email;
  if (lowerFeature.includes('mobile') || lowerFeature.includes('app')) return featureIcons.mobile;
  if (lowerFeature.includes('security') || lowerFeature.includes('secure') || lowerFeature.includes('protection'))
    return featureIcons.security;
  if (lowerFeature.includes('onboarding') || lowerFeature.includes('user') || lowerFeature.includes('cowork'))
    return featureIcons.professional;
  if (lowerFeature.includes('knowledge') || lowerFeature.includes('database') || lowerFeature.includes('storage') || lowerFeature.includes('data'))
    return featureIcons.database;
  if (lowerFeature.includes('professional') || lowerFeature.includes('business') || lowerFeature.includes('enterprise'))
    return featureIcons.professional;
  if (lowerFeature.includes('ecommerce') || lowerFeature.includes('shop') || lowerFeature.includes('cart'))
    return featureIcons.ecommerce;
  if (lowerFeature.includes('image') || lowerFeature.includes('photo') || lowerFeature.includes('picture'))
    return featureIcons.image;
  if (lowerFeature.includes('video') || lowerFeature.includes('movie') || lowerFeature.includes('stream'))
    return featureIcons.video;
  if (lowerFeature.includes('support') || lowerFeature.includes('help') || lowerFeature.includes('service'))
    return featureIcons.support;
  if (lowerFeature.includes('design') || lowerFeature.includes('ui') || lowerFeature.includes('ux'))
    return featureIcons.design;
  if (lowerFeature.includes('summar') || lowerFeature.includes('document') || lowerFeature.includes('file') || lowerFeature.includes('pdf'))
    return featureIcons.document;
  if (lowerFeature.includes('platform') || lowerFeature.includes('network') || lowerFeature.includes('mcp') || lowerFeature.includes('tool') || lowerFeature.includes('api'))
    return featureIcons.network;
  if (lowerFeature.includes('privacy') || lowerFeature.includes('gdpr') || lowerFeature.includes('compliance'))
    return featureIcons.privacy;
  if (lowerFeature.includes('fast') || lowerFeature.includes('speed') || lowerFeature.includes('performance'))
    return featureIcons.fast;
  if (lowerFeature.includes('global') || lowerFeature.includes('world') || lowerFeature.includes('international'))
    return featureIcons.global;
  if (lowerFeature.includes('trend') || lowerFeature.includes('pattern') || lowerFeature.includes('forecast'))
    return featureIcons.trends;
  if (lowerFeature.includes('integration') || lowerFeature.includes('sync') || lowerFeature.includes('workflow') || lowerFeature.includes('connect') || lowerFeature.includes('recurring'))
    return featureIcons.integration;
  if (lowerFeature.includes('notification') || lowerFeature.includes('alert') || lowerFeature.includes('reminder'))
    return featureIcons.notification;
  if (lowerFeature.includes('authentication') || lowerFeature.includes('login') || lowerFeature.includes('signin'))
    return featureIcons.authentication;

  if (lowerFeature.includes('automation') || lowerFeature.includes('auto')) return featureIcons.automation;
  if (lowerFeature.includes('intelligent') || lowerFeature.includes('smart')) return featureIcons.intelligent;
  if (lowerFeature.includes('analytics') || lowerFeature.includes('analysis') || lowerFeature.includes('retriev'))
    return featureIcons.analytics;
  if (lowerFeature.includes('chat') || lowerFeature.includes('conversation')) return featureIcons.chatbot;
  if (lowerFeature.includes('language') || lowerFeature.includes('translation')) return featureIcons.language;
  if (lowerFeature.includes('search') || lowerFeature.includes('discovery')) return featureIcons.search;
  if (lowerFeature.includes('decision') || lowerFeature.includes('custom') || lowerFeature.includes('personal'))
    return featureIcons.custom;
  if (lowerFeature.includes('insight')) return featureIcons.insights;
  if (lowerFeature.includes('code') || lowerFeature.includes('development')) return featureIcons.code;
  if (lowerFeature.includes('cloud') || lowerFeature.includes('host')) return featureIcons.cloud;

  return featureIcons.default;
};

// Truncate long feature labels
const truncateFeature = (feature) => (feature.length > 40 ? feature.substring(0, 37) + '...' : feature);

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
            {services.map((service, idx) => {
              // Har card ki apni image (data/services me set ki gayi). Na ho to image area skip.
              const cardImage = service.image;

              return (
                <motion.div
                  key={idx}
                  variants={cardVariants}
                  className="relative flex h-full overflow-hidden transition-all duration-500 border shadow-lg rounded-2xl bg-blue-900 border-blue-800/40 hover:shadow-xl min-h-[262px] group"
                  tabIndex={0}
                  role="region"
                  aria-label={service.title}
                >
                  {/* Pura card clickable */}
                  <Link
                    to={`/services/${service.slug}`}
                    className="absolute inset-0 z-30 rounded-2xl"
                    tabIndex={-1}
                    aria-hidden="true"
                  />

                  {/* Hover glow */}
                  <div className="absolute inset-0 z-[1] transition-opacity duration-500 opacity-0 bg-gradient-to-br from-blue-600/15 to-transparent group-hover:opacity-100" />

                  {/* 👉 RIGHT SIDE IMAGE — har card ki apni (crisp + minimal left fade for text readability) */}
                  {cardImage && (
                    <div className="absolute top-0 bottom-0 right-0  z-0 hidden bg-blue-900 pointer-events-none md:block">
                      <img
                        src={cardImage}
                        alt={service.title}
                        decoding="async"
                        className="object-cover w-full h-full rounded-r-2xl"
                        style={{ imageRendering: 'auto' }}
                      />
                      {/* Sirf left edge pe subtle fade — image card me smoothly blend ho, baaki sharp rahe */}
                      <div
                        className="absolute inset-0 rounded-r-2xl"
                        style={{
                          background:
                            'linear-gradient(to right, #1e3a8a 0%, rgba(30,58,138,0.55) 18%, rgba(30,58,138,0) 40%)',
                        }}
                      />
                    </div>
                  )}

                  {/* CONTENT — left side */}
                  <div className={`relative z-10 flex flex-col flex-1 p-6 ${cardImage ? 'md:pr-[44%]' : ''}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex items-center justify-center flex-shrink-0 rounded-xl w-11 h-11 bg-gradient-to-br from-indigo-500 to-blue-600 shadow-lg shadow-blue-900/40">
                        {React.cloneElement(service.icon, {
                          className: 'w-[22px] h-[22px] text-white',
                        })}
                      </div>
                      <h3 className="text-lg font-bold leading-tight text-white">
                        {service.title}
                      </h3>
                    </div>

                    <p className="mb-5 text-sm leading-relaxed text-white/90">
                      {service.description}
                    </p>

                    {/* Features */}
                    <div className="grid grid-cols-1 mb-5 gap-x-4 gap-y-3 sm:grid-cols-2">
                      {service.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2.5">
                          <span className="flex-shrink-0">{getIconForFeature(feature)}</span>
                          <span className="text-sm font-medium text-white">
                            {truncateFeature(feature)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-auto">
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-white transition-transform duration-300 cursor-pointer group-hover:translate-x-1">
                        Discover More
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </Container>
    </motion.section>
  );
};

export default Services;