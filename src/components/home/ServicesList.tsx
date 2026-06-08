import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from '../ui/SectionLink';
import Container from '../ui/Container';
import { services } from '../../data/services';
import { ArrowRight, Check } from 'lucide-react';
import React from 'react';

const truncate = (str, max = 80) =>
  str && str.length > max ? str.slice(0, max - 1) + '…' : str;

const STEP = 0.1;

const Services = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <>
      {/* ── HEADING outside blue-900 (white bg) ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="py-10 text-center"
      >
        <h2 className="text-4xl font-bold text-blue-900">
          Our AI-Powered Solutions
        </h2>
        <p className="mt-3 text-base text-slate-500">
          Innovative tools for visionary teams.
        </p>
      </motion.div>

      {/* ── BLUE-900 SECTION ── */}
      <section
        id="services"
        className="relative mx-6 mb-10 overflow-hidden rounded-3xl bg-blue-900 py-14 md:mx-12 lg:mx-20"
      >
        {/* Glow blobs */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-[5%] top-[30%] h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute left-1/2 top-[10%] h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-400/15 blur-3xl" />
          <div className="absolute right-[5%] bottom-[20%] h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
        </div>

        <Container className="relative z-10">
          <div
            ref={ref}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {services.map((service, idx) => (
              <motion.div
                key={service.slug ?? idx}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.55,
                  ease: [0.16, 1, 0.3, 1],
                  delay: idx * STEP,
                }}
                className="group relative flex overflow-hidden rounded-2xl"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  backdropFilter: 'blur(18px)',
                  WebkitBackdropFilter: 'blur(18px)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.12)',
                  minHeight: '210px',
                }}
              >
                {/* Full-card link */}
                <Link
                  to={`/services/${service.slug}`}
                  className="absolute inset-0 z-30 rounded-2xl"
                  tabIndex={-1}
                  aria-hidden="true"
                />

                {/* Top sheen */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

                {/* Hover glow */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-300/8 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* ── LEFT: image panel — NO border-right ── */}
                <div className="relative z-10 flex w-[38%] flex-shrink-0 flex-col items-center justify-between py-6 px-3">

                  {/* Bouncing image */}
                  <div className="flex flex-1 items-center justify-center">
                    <motion.img
                      src={service.image}
                      alt={service.title}
                      className="h-40 w-48 object-contain drop-shadow-[0_4px_22px_rgba(34,211,238,0.5)]"
                      loading="lazy"
                      animate={{ y: [0, -10, 0] }}
                      transition={{
                        duration: 2.4,
                        ease: 'easeInOut',
                        repeat: Infinity,
                        repeatType: 'loop',
                        delay: idx * 0.3,
                      }}
                    />
                  </div>

                  {/* Discover More — below image */}
                  <span className="mt-4 inline-flex cursor-pointer items-center gap-1 text-[11px] font-bold text-cyan-300 transition-all duration-300 group-hover:gap-1.5 group-hover:text-cyan-200">
                    Discover More
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </div>

                {/* ── RIGHT: content ── */}
                <div className="relative z-10 flex flex-1 flex-col justify-center p-4">
                  <h3 className="mb-1.5 text-[14px] font-bold leading-snug text-white">
                    {service.title}
                  </h3>

                  <p className="mb-3 text-[11.5px] leading-relaxed text-blue-100/75">
                    {truncate(service.description)}
                  </p>

                  <div className="flex flex-col gap-1.5">
                    {service.features?.slice(0, 4).map((feature, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-cyan-400/20 ring-1 ring-cyan-300/35">
                          <Check className="h-2.5 w-2.5 text-cyan-300" strokeWidth={3.5} />
                        </span>
                        <span className="text-[11.5px] font-medium text-white/90">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
};

export default Services;