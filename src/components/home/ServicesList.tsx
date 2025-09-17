import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HashLink as Link } from 'react-router-hash-link';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import { services } from '../../data/services';
import { ArrowRight } from 'lucide-react';
import React from 'react';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

const Services = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const { scrollYProgress } = useScroll();
  const bgOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <motion.section
      id="services"
      className="relative py-20 bg-gray-50 font-sans min-h-[90vh]"
      style={{ opacity: bgOpacity }}
    >
      {/* Soft, blurred background visuals */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute w-64 h-64 bg-blue-100 rounded-full top-1/5 left-1/5 blur-2xl opacity-20"
          animate={{ x: [0, 24, 0], y: [0, 32, 0] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: 'mirror' }}
        />
        <motion.div
          className="absolute bg-blue-200 rounded-full bottom-1/5 right-1/5 w-52 h-52 blur-2xl opacity-15"
          animate={{ x: [0, -20, 0], y: [0, -30, 0] }}
          transition={{ duration: 25, repeat: Infinity, repeatType: 'mirror' }}
        />
      </div>

      <Container className="relative z-10">
        <SectionHeading
          title="Our AI-Powered Services"
          subtitle="Innovative solutions designed for ambitious teams and next-gen projects."
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
                className="relative bg-white rounded-2xl shadow-[0_4px_32px_0_rgba(59,130,246,0.08)] hover:shadow-[0_8px_32px_0_rgba(59,130,246,0.18)] border border-gray-100/30 transition-all duration-300 flex flex-col p-8 min-h-[320px] h-full"
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
                <div className="flex items-center gap-3 mb-4">
                  {React.cloneElement(service.icon, {
                    className: 'w-8 h-8 text-blue-600',
                  })}
                  <h3 className="text-xl font-semibold leading-tight text-blue-900">
                    {service.title}
                  </h3>
                </div>
                <p className="mb-4 text-sm text-blue-900/70">{service.description}</p>
                <ul className="pl-4 mb-4 space-y-2 text-sm list-disc text-blue-800/90">
                  {service.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
                <div className="mt-auto">
                  <span className="inline-flex items-center gap-2 font-semibold text-blue-600 transition-all cursor-pointer hover:text-blue-700 group">
                    Learn More
                    <ArrowRight className="w-4 h-4" />
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
