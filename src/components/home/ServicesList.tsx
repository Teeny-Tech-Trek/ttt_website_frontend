import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import Link from '../ui/SectionLink';
import Container from '../ui/Container';
import { services } from '../../data/services';
import { ArrowRight, ChevronRight, Check } from 'lucide-react';
import React from 'react';

const truncate = (str, max = 80) =>
  str && str.length > max ? str.slice(0, max - 1) + '…' : str;

const STEP = 0.08;

const glassCard = {
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.12)',
  backdropFilter: 'blur(18px)',
  WebkitBackdropFilter: 'blur(18px)',
  boxShadow: '0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.12)',
};

const Services = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const [featuredIndex, setFeaturedIndex] = useState(0);

  const featured = services[featuredIndex];
  const restServices = services.filter((_, i) => i !== featuredIndex);

  const showNextFeatured = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setFeaturedIndex((prev) => (prev + 1) % services.length);
  };

  return (
    <>
      {/* ── HEADING outside blue-900 (white bg) ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="py-6 text-center sm:py-8"
      >
        <h2 className="text-3xl font-bold text-blue-900 sm:text-4xl">
          Our AI-Powered Solutions
        </h2>
        <p className="mt-2 text-base text-slate-500 sm:mt-3">
          Innovative tools for visionary teams.
        </p>
      </motion.div>

      {/* ── BLUE-900 SECTION ── */}
      <section
        id="services"
        className="relative mx-6 mb-10 overflow-hidden rounded-3xl bg-blue-900 py-8 md:mx-12 lg:mx-20 lg:py-10"
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
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 lg:gap-5"
          >
            {/* ── Featured (bento-tall) cell — a plain, non-clipping grid item so
                 the cycle button can sit half-outside the visual card without
                 being cut off; the visual card inside handles its own rounding. ── */}
            <div className="relative lg:row-span-2">
              <motion.div
                layout
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex h-full min-h-[320px] flex-col overflow-hidden rounded-2xl"
                style={glassCard}
              >
                <Link
                  to={`/services/${featured.slug}`}
                  className="absolute inset-0 z-30 rounded-2xl"
                  tabIndex={-1}
                  aria-hidden="true"
                />

                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-300/8 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={featured.slug}
                    layout
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="relative z-10 flex flex-1 flex-col p-5 sm:p-6"
                  >
                    <span className="mb-3 inline-flex w-fit items-center rounded-full border border-cyan-300/30 bg-cyan-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-cyan-300">
                      Featured Service
                    </span>

                    <h3 className="mb-2 text-lg font-bold leading-snug text-white sm:text-xl">
                      {featured.title}
                    </h3>

                    <p className="mb-3 text-[13px] leading-relaxed text-blue-100/75">
                      {truncate(featured.description, 110)}
                    </p>

                    <div className="mb-2 flex flex-col gap-1.5">
                      {featured.features?.slice(0, 4).map((feature, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <span className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-cyan-400/20 ring-1 ring-cyan-300/35">
                            <Check className="h-2.5 w-2.5 text-cyan-300" strokeWidth={3.5} />
                          </span>
                          <span className="text-[13px] font-medium text-white/90">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    <span className="relative z-30 mt-2 inline-flex w-fit cursor-pointer items-center gap-1 text-sm font-bold text-cyan-300 transition-all duration-300 group-hover:gap-1.5 group-hover:text-cyan-200">
                      Discover More
                      <ArrowRight className="h-4 w-4" />
                    </span>

                    <div className="mt-3 flex flex-1 items-end justify-center">
                      <motion.img
                        src={featured.image}
                        alt={featured.title}
                        className="h-28 w-auto max-w-[220px] object-contain drop-shadow-[0_4px_22px_rgba(34,211,238,0.5)] sm:h-36 sm:max-w-[260px]"
                        loading="lazy"
                        animate={{ y: [0, -10, 0] }}
                        transition={{
                          duration: 2.4,
                          ease: 'easeInOut',
                          repeat: Infinity,
                          repeatType: 'loop',
                        }}
                      />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              {/* Cycle to next featured service — a sibling of the visual card,
                   so it's never clipped by the card's rounded overflow-hidden edge */}
              <button
                type="button"
                onClick={showNextFeatured}
                aria-label="Show next featured service"
                className="absolute right-0 top-1/2 z-40 flex h-11 w-11 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 text-white shadow-[0_8px_24px_rgba(34,211,238,0.45)] ring-4 ring-blue-900 transition-all duration-300 hover:scale-110 hover:shadow-[0_10px_30px_rgba(34,211,238,0.65)]"
              >
                <ChevronRight className="h-5 w-5" strokeWidth={2.75} />
              </button>
            </div>

            {/* ── Concise cards — plain grid items in the same grid as the
                 featured cell, so their bottoms always line up with it ── */}
            {restServices.map((service, idx) => (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.55,
                  ease: [0.16, 1, 0.3, 1],
                  delay: (idx + 1) * STEP,
                }}
                className="group relative flex flex-col overflow-hidden rounded-2xl p-4 sm:p-5"
                style={glassCard}
              >
                <Link
                  to={`/services/${service.slug}`}
                  className="absolute inset-0 z-30 rounded-2xl"
                  tabIndex={-1}
                  aria-hidden="true"
                />

                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-300/8 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative z-10 flex flex-1 flex-col">
                  <div className="mb-2 flex justify-center">
                    <motion.img
                      src={service.image}
                      alt={service.title}
                      className="h-20 w-auto max-w-[170px] object-contain drop-shadow-[0_4px_18px_rgba(34,211,238,0.4)] sm:h-24 sm:max-w-[190px]"
                      loading="lazy"
                      animate={{ y: [0, -8, 0] }}
                      transition={{
                        duration: 2.4,
                        ease: 'easeInOut',
                        repeat: Infinity,
                        repeatType: 'loop',
                        delay: idx * 0.3,
                      }}
                    />
                  </div>

                  <h3 className="mb-1.5 text-[14px] font-bold leading-snug text-white">
                    {service.title}
                  </h3>

                  <p className="mb-2 line-clamp-3 text-[12px] leading-relaxed text-blue-100/75">
                    {service.description}
                  </p>

                  <span className="relative z-30 mt-auto inline-flex w-fit cursor-pointer items-center gap-1 pt-1 text-[11px] font-bold text-cyan-300 transition-all duration-300 group-hover:gap-1.5 group-hover:text-cyan-200">
                    Discover More
                    <ArrowRight className="h-3 w-3" />
                  </span>
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
