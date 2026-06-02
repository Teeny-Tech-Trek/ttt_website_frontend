import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from '../ui/SectionLink';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import { services } from '../../data/services';
import { ArrowRight, Check } from 'lucide-react';
import React from 'react';

/* ------------------------------------------------------------------ *
 *  LEFT-SIDE IMAGE — har card ki apni `image: '...'` field se aati hai *
 *  (data/services me set karo). Jis card me image nahi, uske jagah    *
 *  card ka icon ek soft tile me show hoga.                            *
 * ------------------------------------------------------------------ */

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

// Long feature labels ko trim
const truncateFeature = (feature) =>
  feature.length > 40 ? feature.substring(0, 37) + '...' : feature;

const Services = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const { scrollYProgress } = useScroll();
  const bgOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <motion.section
      id="services"
      className="relative py-12 font-sans"
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
          className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-2"
        >
          <AnimatePresence>
            {services.map((service, idx) => {
              const cardImage = service.image; // har card ki apni image

              return (
                <motion.div
                  key={idx}
                  variants={cardVariants}
                  className="group relative flex h-full min-h-[180px] overflow-hidden rounded-2xl border border-blue-500/15 bg-blue-900 shadow-lg transition-all duration-500 hover:border-blue-400/30 hover:shadow-xl hover:shadow-blue-900/30"
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
                  <div className="absolute inset-0 z-[1] bg-gradient-to-br from-blue-600/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  {/* 👉 LEFT COLUMN — image (top) + Discover More (bottom) */}
                  <div className="relative z-10 hidden w-[34%] flex-shrink-0 flex-col p-4 sm:flex">
                    <div className="flex flex-1 items-center justify-center">
                      <div className=" w-full max-w-[120px] overflow-hidden rounded-2xl">
                        {cardImage ? (
                          <img
                            src={cardImage}
                            alt={service.title}
                            decoding="async"
                            className="h-full w-full  rounded-2xl object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 shadow-lg shadow-blue-900/40">
                            {React.cloneElement(service.icon, {
                              className: 'w-10 h-10 text-white',
                            })}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Discover More — image ke niche */}
                    <span className="mt-3 inline-flex cursor-pointer items-center gap-1.5 text-[12.5px] font-semibold text-blue-300 transition-transform duration-300 group-hover:translate-x-1">
                      Discover More
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>

                  {/* CONTENT — right side */}
                  <div className="relative z-10 flex flex-1 flex-col p-4 sm:pl-2">
                    <h3 className="mb-2 text-[17px] font-bold leading-snug text-white">
                      {service.title}
                    </h3>

                    <p className="mb-3 text-[12.5px] leading-relaxed text-slate-300/80">
                      {service.description}
                    </p>

                    {/* Features — simple cyan checks (image jaisa) */}
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                      {service.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <span className="flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-full bg-cyan-400/15">
                            <Check className="h-3 w-3 text-cyan-400" strokeWidth={3} />
                          </span>
                          <span className="text-[13px] font-medium text-slate-200">
                            {truncateFeature(feature)}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Mobile-only Discover More (left column hidden on mobile) */}
                    <div className="mt-3 sm:hidden">
                      <span className="inline-flex cursor-pointer items-center gap-1.5 text-[13.5px] font-semibold text-blue-300">
                        Discover More
                        <ArrowRight className="h-4 w-4" />
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