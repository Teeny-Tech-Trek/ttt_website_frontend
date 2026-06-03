import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from '../ui/SectionLink';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import { services } from '../../data/services';
import { ArrowRight, Check } from 'lucide-react';
import React from 'react';

/* ------------------------------------------------------------------ *
 *  SERVICES — glass cards, but DARKER tint + crisp text.
 *  - Glass kept (backdrop-blur + translucency + edge sheen).
 *  - Text contrast boosted: brighter colours + subtle text-shadow.
 * ------------------------------------------------------------------ */

const LINE = '#1E3A8A'; // tailwind blue-900
const TEXT_SHADOW = '0 1px 10px rgba(2,6,23,0.45)';

const STEP = 0.45;
const nodeDelay = (idx) => idx * STEP;
const cardDelay = (idx) => idx * STEP + STEP / 2;

const truncateFeature = (feature) =>
  feature.length > 40 ? feature.substring(0, 37) + '...' : feature;

const Services = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-white py-16 font-sans md:py-20"
    >
      {/* soft colour blobs (glass ke liye halka background tint) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[6%] top-[42%] h-72 w-72 rounded-full bg-blue-400/20 blur-3xl" />
        <div className="absolute left-1/2 top-[30%] h-80 w-80 -translate-x-1/2 rounded-full bg-indigo-400/15 blur-3xl" />
        <div className="absolute right-[8%] top-[45%] h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl" />
      </div>

      <Container className="relative z-10">
        <SectionHeading
          title="Our AI-Powered Solutions"
          subtitle="Innovative tools for visionary teams."
        />

        {/* ---------------- BLUE-900 TIMELINE ---------------- */}
        <div className="relative mt-12 mb-3 hidden lg:block">
          <div className="relative h-4">
            <motion.div
              className="absolute inset-x-0 top-1/2 h-px origin-left -translate-y-1/2"
              style={{
                background:
                  `linear-gradient(90deg, ${LINE}00, ${LINE}cc 7%, ${LINE}cc 93%, ${LINE}00)`,
              }}
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.9, ease: 'easeInOut' }}
            />

            <div className="grid h-full grid-cols-4 gap-5">
              {services.map((service, idx) => (
                <div
                  key={service.slug ?? idx}
                  className="flex items-center justify-center"
                >
                  <motion.span
                    aria-hidden
                    className="h-3.5 w-3.5 rounded-full"
                    style={{ backgroundColor: LINE }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={
                      inView
                        ? {
                            scale: 1,
                            opacity: 1,
                            boxShadow: [
                              `0 0 0 4px ${LINE}22, 0 0 10px 3px ${LINE}66`,
                              `0 0 0 5px ${LINE}2e, 0 0 18px 5px ${LINE}aa`,
                              `0 0 0 4px ${LINE}22, 0 0 10px 3px ${LINE}66`,
                            ],
                          }
                        : { scale: 0, opacity: 0 }
                    }
                    transition={{
                      scale: { duration: 0.4, ease: 'backOut', delay: nodeDelay(idx) },
                      opacity: { duration: 0.4, delay: nodeDelay(idx) },
                      boxShadow: {
                        duration: 2.8,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: nodeDelay(idx),
                      },
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-4 gap-5">
            {services.map((service, idx) => (
              <div key={service.slug ?? idx} className="flex justify-center">
                <motion.span
                  className="text-[12px] font-semibold tracking-[0.35em]"
                  style={{ color: LINE }}
                  initial={{ opacity: 0, y: 6 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
                  transition={{ duration: 0.35, delay: nodeDelay(idx) }}
                >
                  {String(idx + 1).padStart(2, '0')}
                </motion.span>
              </div>
            ))}
          </div>
        </div>

        {/* ---------------- GLASS CARDS (darker + crisp text) ---------------- */}
        <div
          ref={ref}
          className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {services.map((service, idx) => (
            <motion.div
              key={service.slug ?? idx}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: cardDelay(idx) }}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-blue-950/90 to-blue-900/80 p-6 shadow-xl shadow-blue-900/25 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-white/25 hover:shadow-2xl hover:shadow-blue-900/35"
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

              {/* glass edge sheen — sirf top, text area ke upar nahi */}
              <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-px bg-gradient-to-r from-transparent via-white/45 to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-20 bg-gradient-to-b from-white/10 to-transparent" />
              {/* hover glow */}
              <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-br from-cyan-300/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {/* title */}
              <h3
                className="relative z-10 mb-2.5 text-[17px] font-bold leading-snug text-white"
                style={{ textShadow: TEXT_SHADOW }}
              >
                {service.title}
              </h3>

              {/* description */}
              <p
                className="relative z-10 mb-5 text-[12.5px] font-medium leading-relaxed text-blue-50/95"
                style={{ textShadow: '0 1px 6px rgba(2,6,23,0.35)' }}
              >
                {service.description}
              </p>

              {/* features */}
              <div className="relative z-10 mb-6 grid grid-cols-1 gap-y-2.5">
                {service.features?.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-full bg-cyan-400/25 ring-1 ring-cyan-300/40">
                      <Check className="h-3 w-3 text-cyan-300" strokeWidth={3.5} />
                    </span>
                    <span
                      className="text-[13px] font-semibold text-white"
                      style={{ textShadow: '0 1px 6px rgba(2,6,23,0.35)' }}
                    >
                      {truncateFeature(feature)}
                    </span>
                  </div>
                ))}
              </div>

              {/* discover more */}
              <span className="relative z-10 mt-auto inline-flex cursor-pointer items-center gap-1.5 text-[12.5px] font-bold text-cyan-300 transition-transform duration-300 group-hover:translate-x-1">
                Discover More
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Services;