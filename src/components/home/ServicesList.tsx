import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HashLink as Link } from 'react-router-hash-link';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import { services } from '../../data/services';
import { ArrowRight } from 'lucide-react';
import React from 'react';

const Services = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Scroll-based effects
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.section
      id="services"
      className="py-24 relative overflow-hidden bg-gray-50 font-sans"
      style={{ opacity }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/5 w-96 h-96 rounded-full bg-blue-100 blur-3xl opacity-15"
          animate={{ x: [0, 40, 0], y: [0, 60, 0] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
          style={{ y: y1 }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/5 w-80 h-80 rounded-full bg-blue-200 blur-3xl opacity-10"
          animate={{ x: [0, -60, 0], y: [0, -40, 0] }}
          transition={{ duration: 25, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
          style={{ y: y2 }}
        />
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2390cdf4' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 10, repeat: Infinity, repeatType: 'mirror' }}
        />
      </div>

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading
            title="Our AI-Powered Services"
            subtitle="Innovative solutions designed for small teams with big goals."
          />
        </motion.div>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{
            visible: { transition: { staggerChildren: 0.2 } },
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="relative bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100/20 group overflow-hidden transition-all duration-300"
              whileHover={{
                scale: 1.04,
                boxShadow: '0 10px 30px rgba(59, 130, 246, 0.2)',
                transition: { duration: 0.3 },
              }}
            >
              {/* Hover glow effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ borderRadius: 'inherit' }}
              />
              <motion.div
                className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600/20 transition-colors duration-300"
                animate={{ rotate: [0, 5, 0] }}
                transition={{ duration: 10, repeat: Infinity, repeatType: 'loop' }}
                whileHover={{ rotate: 15, scale: 1.1 }}
              >
                {React.cloneElement(service.icon, {
                  className: 'h-8 w-8 text-blue-600 group-hover:text-blue-700 transition-colors',
                })}
              </motion.div>
              <h3 className="text-2xl font-bold text-blue-900 mb-4 tracking-tight">{service.title}</h3>
              <p className="text-blue-900/70 mb-6 leading-relaxed">{service.description}</p>
              <div className="space-y-3 mb-6">
                {service.features.map((feature, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
                  >
                    <motion.div
                      className="w-2 h-2 rounded-full bg-blue-500"
                      whileHover={{ scale: 1.5 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                    />
                    <span className="text-sm text-blue-900/80">{feature}</span>
                  </motion.div>
                ))}
              </div>
              <motion.div
                whileHover={{ x: 8 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Link
                  to={`/services/${service.slug}`}
                  className="text-blue-600 font-semibold inline-flex items-center gap-2 hover:text-blue-700 transition-transform group-hover:translate-x-2 transition-colors"
                >
                  Learn More
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20 text-center"
        >
          <motion.a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl font-semibold text-base shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-600 transition-all group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            Discuss Your Project
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </motion.a>
        </motion.div>
      </Container>
    </motion.section>
  );
};

export default Services;