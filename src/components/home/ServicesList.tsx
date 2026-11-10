import { motion, useReducedMotion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';
import Link from '../ui/SectionLink';
import Container from '../ui/Container';
import { services } from '../../data/services';
import { ArrowRight, Bot, Check, Rocket, Sparkles, Workflow } from 'lucide-react';
import React from 'react';

const SWAP_MS = 7000;

// Short chip label + a distinct icon per service (keyed by slug).
const meta: Record<string, { label: string; Icon: React.ComponentType<{ className?: string }> }> = {
  'ai-chatbots': { label: 'Chatbots', Icon: Bot },
  'agentic-ai-workflows': { label: 'Agents & Claude', Icon: Sparkles },
  automations: { label: 'Automation', Icon: Workflow },
  'ai-apps-micro-saas': { label: 'AI Apps', Icon: Rocket },
};

const glassCard = {
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.12)',
  backdropFilter: 'blur(18px)',
  WebkitBackdropFilter: 'blur(18px)',
  boxShadow: '0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.12)',
};

// Bento slots: 0 = featured (spans all 3 rows on desktop), 1-3 = compact rows.
const slotClass = ['lg:col-span-6 lg:row-span-3', 'lg:col-span-6', 'lg:col-span-6', 'lg:col-span-6'];

const Services = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  // Featured first, the rest keep their original order.
  const ordered = [services[featuredIndex], ...services.filter((_, i) => i !== featuredIndex)];
  const next = () => setFeaturedIndex((i) => (i + 1) % services.length);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="py-4 text-center sm:py-5"
      >
        <h2 className="text-3xl font-bold text-blue-900 sm:text-4xl">Our AI-Powered Solutions</h2>
        <p className="mt-2 text-base text-slate-500 sm:mt-3">Innovative tools for visionary teams.</p>
      </motion.div>

      <style>{`@keyframes svc-progress{from{transform:scaleX(0)}to{transform:scaleX(1)}}`}</style>

      <section
        id="services"
        className="relative mx-3 mb-10 overflow-hidden rounded-3xl bg-blue-900 py-6 sm:mx-6 md:mx-12 lg:mx-20 lg:py-7"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-[5%] top-[30%] h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute left-1/2 top-[10%] h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-400/15 blur-3xl" />
          <div className="absolute bottom-[20%] right-[5%] h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
        </div>

        <Container className="relative z-10">
          {/* ── Selector: picks the featured service, auto-advances with a progress bar ── */}
          <div
            role="tablist"
            aria-label="Choose featured service"
            className="mb-4 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:justify-center [&::-webkit-scrollbar]:hidden"
          >
            {services.map((s, i) => {
              const { label, Icon } = meta[s.slug] ?? { label: s.title, Icon: Sparkles };
              const active = i === featuredIndex;
              return (
                <button
                  key={s.slug}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFeaturedIndex(i)}
                  className={`relative inline-flex min-h-[44px] flex-shrink-0 cursor-pointer items-center gap-2 overflow-hidden rounded-full border px-4 text-sm font-semibold transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300 ${
                    active
                      ? 'border-cyan-300/50 bg-cyan-400/15 text-white'
                      : 'border-white/15 bg-white/5 text-blue-100/80 hover:bg-white/10'
                  }`}
                >
                  <Icon className={`h-4 w-4 ${active ? 'text-cyan-300' : ''}`} />
                  {label}
                  {active && !reduce && (
                    <span
                      key={featuredIndex}
                      aria-hidden
                      onAnimationEnd={next}
                      className="absolute inset-x-0 bottom-0 h-[3px] origin-left bg-cyan-300"
                      style={{
                        animation: `svc-progress ${SWAP_MS}ms linear forwards`,
                        animationPlayState: paused ? 'paused' : 'running',
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* ── Bento grid — cards physically glide into their new slot on swap ── */}
          <div ref={ref} className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-12 lg:gap-4">
            {ordered.map((service, pos) => {
              const isFeatured = pos === 0;
              const { Icon } = meta[service.slug] ?? { Icon: Sparkles };
              return (
                <motion.article
                  key={service.slug}
                  layout={!reduce}
                  initial={{ opacity: 0, y: 28 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    opacity: { duration: 0.5, delay: pos * 0.08 },
                    y: { duration: 0.55, delay: pos * 0.08, ease: [0.16, 1, 0.3, 1] },
                    layout: { type: 'spring', stiffness: 220, damping: 28 },
                  }}
                  style={{
                    ...glassCard,
                    borderRadius: 20,
                    ...(isFeatured && {
                      border: '1px solid rgba(103,232,249,0.4)',
                      boxShadow:
                        '0 0 0 1px rgba(103,232,249,0.08), 0 16px 48px rgba(34,211,238,0.18), inset 0 1px 0 rgba(255,255,255,0.18)',
                    }),
                  }}
                  className={`group relative flex overflow-hidden ${slotClass[pos]} ${
                    isFeatured ? 'flex-col p-5 md:flex-row md:gap-6 md:p-6 lg:flex-col lg:gap-0' : 'flex-row items-center gap-3 p-3 sm:gap-4 sm:p-4'
                  }`}
                >
                  <Link
                    to={`/services/${service.slug}`}
                    aria-label={`${service.title} — discover more`}
                    className="absolute inset-0 z-30 rounded-[20px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300"
                  />
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-300/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Image — in the featured card it flexes to fill whatever height is left, at any zoom */}
                  <motion.div
                    key={`img-${isFeatured}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.35, delay: 0.2 }}
                    className={`relative z-10 ${
                      isFeatured
                        ? 'order-last mt-4 h-40 w-full md:order-none md:mt-0 md:h-auto md:w-[40%] md:flex-shrink-0 lg:order-last lg:mt-3 lg:min-h-[130px] lg:w-full lg:flex-1'
                        : 'h-20 w-24 flex-shrink-0 sm:h-24 sm:w-32'
                    }`}
                  >
                    <motion.img
                      src={service.image}
                      alt=""
                      loading="eager" decoding="async"
                      className="absolute inset-0 h-full w-full object-contain drop-shadow-[0_4px_22px_rgba(34,211,238,0.45)]"
                      animate={reduce ? {} : { y: [0, -6, 0] }}
                      transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity }}
                    />
                  </motion.div>

                  <motion.div
                    key={`txt-${isFeatured}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.35, delay: 0.15 }}
                    className="relative z-10 flex min-w-0 flex-1 flex-col"
                  >
                    {isFeatured && (
                      <div className="mb-3 flex items-center gap-2">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-400/15 ring-1 ring-cyan-300/30">
                          <Icon className="h-4 w-4 text-cyan-300" />
                        </span>
                        <span className="inline-flex items-center rounded-full border border-cyan-300/30 bg-cyan-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-cyan-300">
                          Featured
                        </span>
                      </div>
                    )}

                    <h3 className={`font-bold leading-snug text-white ${isFeatured ? 'mb-2 text-xl sm:text-2xl' : 'mb-1 text-[15px] sm:text-base'}`}>
                      {service.title}
                    </h3>

                    <p className={`text-blue-100/80 leading-relaxed ${isFeatured ? 'mb-3 text-sm' : 'mb-2 line-clamp-2 text-[13px]'}`}>
                      {service.description}
                    </p>

                    {isFeatured && (
                      <ul className="mb-3 grid grid-cols-1 gap-x-3 gap-y-1.5 sm:grid-cols-2">
                        {service.features.slice(0, 4).map((f) => (
                          <li key={f} className="flex items-center gap-2 text-[13px] font-medium text-white/90">
                            <span className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-cyan-400/20 ring-1 ring-cyan-300/35">
                              <Check className="h-2.5 w-2.5 text-cyan-300" strokeWidth={3.5} />
                            </span>
                            {f}
                          </li>
                        ))}
                      </ul>
                    )}

                    <span className="inline-flex w-fit items-center gap-1 text-sm font-bold text-cyan-300 transition-all duration-300 group-hover:gap-2 group-hover:text-cyan-200">
                      Discover More
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </motion.div>
                </motion.article>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
};

export default Services;
