import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  Users,
  MapPin,
  Zap,
  ArrowRight,
  Target,
  Clock,
  DollarSign,
  MessageCircle,
  PieChart,
  Calendar,
  Database,
  Home,
  BarChart3,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { motion } from 'framer-motion';

import HashLink from '../../components/ui/SectionLink';
import { scrollToSection } from '../../utils/scrollToSection';

import realEstateHeroImg from '../../Images/Case Studies/RealEstate/real-estate.png';
import marketPredictionImg from '../../Images/Case Studies/RealEstate/market-prediction.png';
import locationIntelligenceImg from '../../Images/Case Studies/RealEstate/location-intelligence.png';
import portfolioAnalysisImg from '../../Images/Case Studies/RealEstate/portfolio-analysis.png';
import leadScoringImg from '../../Images/Case Studies/RealEstate/lead-scoring.png';
import testimonialImg from '../../Images/Case Studies/RealEstate/testimonial.png';

// Animation variants
const slideFromLeft = {
  hidden: { x: -50, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
};

const slideFromRight = {
  hidden: { x: 50, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
};

const fadeInUp = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

type ChatbotOpenProps = {
  onOpenChatbot?: () => void;
};

// Subtle dot-grid texture for sections that would otherwise be a flat block of
// color — keeps content-light sections from feeling empty without competing
// with the hero. `dark` swaps the dot color for use on the blue-900 strip.
const DotGridBackground: React.FC<{ dark?: boolean }> = ({ dark = false }) => (
  <div
    aria-hidden="true"
    className={`pointer-events-none absolute inset-0 ${
      dark
        ? 'bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)]'
        : 'bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,0.15)_1px,transparent_0)]'
    } bg-[size:28px_28px]`}
  />
);

/* ------------------------------------------------------------------ */
/*  SECTION 1 — Hero                                                   */
/* ------------------------------------------------------------------ */

const heroFeatures = [
  { icon: TrendingUp, title: 'Smarter Decisions', desc: 'AI-driven insights for data-backed decisions' },
  { icon: Target, title: 'Higher Conversions', desc: 'Identify, engage, and convert high-potential leads' },
  { icon: Zap, title: 'Operational Efficiency', desc: 'Automate workflows and cut manual work' },
  { icon: CheckCircle2, title: 'Better Outcomes', desc: 'Close deals faster and maximize ROI' },
];

const heroStats = [
  { icon: Home, value: '2,847', label: 'Properties', sub: 'Actively tracked in our database' },
  { icon: Clock, value: '24/7', label: 'Availability', sub: 'Always-on AI support and insights' },
  { icon: Zap, value: '3.2s', label: 'Avg. Response', sub: 'Instant answers, every time' },
];

const Hero: React.FC<ChatbotOpenProps> = ({ onOpenChatbot }) => {
  const handleTalkToExpert = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onOpenChatbot) onOpenChatbot();
  };

  return (
    <section className="relative overflow-hidden bg-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-12 sm:pb-16 mx-auto max-w-7xl">
        <div className="grid items-center gap-10 lg:gap-16 lg:grid-cols-2">
          {/* Left content */}
          <motion.div
            className="space-y-8"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-blue-900 rounded-full bg-blue-50"
              variants={slideFromLeft}
            >
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              AI for Real Estate
            </motion.div>

            <motion.h1
              className="text-3xl sm:text-5xl md:text-6xl font-black leading-tight text-black"
              variants={slideFromLeft}
            >
              Your AI Workforce
              <br />
              <span className="text-blue-900">for Real Estate</span>
            </motion.h1>

            <motion.p className="max-w-lg text-base sm:text-lg leading-relaxed text-gray-700" variants={slideFromLeft}>
              Intelligent systems that read the market in real time, equip your sales team with
              insights they can act on, and help you deliver better outcomes on every property you
              manage.
            </motion.p>

            <motion.div className="flex flex-col gap-4 sm:flex-row" variants={slideFromLeft}>
              <button
                type="button"
                onClick={() => scrollToSection('solutions')}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-white transition-colors bg-blue-900 rounded-lg hover:bg-blue-950 group"
              >
                Explore AI Solutions
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={handleTalkToExpert}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-blue-900 transition-colors bg-white border-2 border-blue-900 rounded-lg hover:bg-blue-50"
              >
                <MessageCircle className="w-5 h-5" aria-hidden="true" />
                Talk to an Expert
              </button>
            </motion.div>

            {/* Feature strip */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 pt-4"
              variants={staggerContainer}
            >
              {heroFeatures.map((f) => (
                <motion.div key={f.title} className="flex items-start gap-3" variants={fadeInUp}>
                  <div className="flex items-center justify-center flex-shrink-0 w-9 h-9 mt-0.5 bg-blue-100 rounded-lg">
                    <f.icon className="w-4.5 h-4.5 text-blue-900" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-black">{f.title}</div>
                    <div className="text-xs leading-relaxed text-gray-600">{f.desc}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Stat row */}
            <motion.div
              className="grid grid-cols-3 gap-2 sm:gap-4 pt-6 border-t border-gray-100"
              variants={staggerContainer}
            >
              {heroStats.map((s) => (
                <motion.div key={s.label} variants={fadeInUp}>
                  <div className="text-xl sm:text-2xl font-bold text-blue-900">{s.value}</div>
                  <div className="text-xs sm:text-sm font-semibold text-black">{s.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — hero visual dashboard */}
          <motion.div
            className="relative"
            initial="hidden"
            animate="visible"
            variants={slideFromRight}
          >
            <div className="absolute rounded-full -top-10 -right-10 w-72 h-72 bg-blue-50 blur-3xl" aria-hidden="true" />
            <img
              src={realEstateHeroImg}
              alt="AI dashboard showing property insights, market overview, and similar properties for a real estate listing"
              className="relative w-full h-auto"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*  SECTION 2 — Portfolio snapshot strip                               */
/* ------------------------------------------------------------------ */

const snapshotStats = [
  { icon: TrendingUp, value: '+47%', label: 'Portfolio Growth' },
  { icon: Target, value: '98%', label: 'Accuracy' },
  { icon: Clock, value: '-65%', label: 'Analysis Time' },
];

const PortfolioSnapshot = () => (
  <section className="relative overflow-hidden py-16 bg-blue-900">
    <DotGridBackground dark />
    <div className="relative z-10 px-6 mx-auto max-w-7xl">
      <motion.div
        className="mb-10 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <h2 className="mb-3 text-2xl font-bold text-white sm:text-3xl">
          How is your portfolio performing this quarter?
        </h2>
        <p className="text-blue-100">A live look at what our AI is already tracking for portfolios like yours.</p>
      </motion.div>

      <motion.div
        className="grid max-w-3xl grid-cols-3 gap-4 mx-auto sm:gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        {snapshotStats.map((s) => (
          <motion.div key={s.label} className="text-center" variants={fadeInUp}>
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-full bg-white/10">
              <s.icon className="w-6 h-6 text-white" aria-hidden="true" />
            </div>
            <div className="text-3xl font-bold text-white sm:text-4xl">{s.value}</div>
            <div className="mt-1 text-sm text-blue-100">{s.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

/* ------------------------------------------------------------------ */
/*  SECTION 3 — Our Core Solutions (tabs)                              */
/* ------------------------------------------------------------------ */

type SolutionKey = 'analytics' | 'crm';

const solutions: Record<
  SolutionKey,
  {
    badge: string;
    title: string;
    description: string;
    bullets: { icon: React.ElementType; title: string; desc: string }[];
    cards: {
      icon: React.ElementType;
      title: string;
      desc: string;
      image?: string;
      badge?: string;
      points?: { label: string; value: string }[];
    }[];
  }
> = {
  analytics: {
    badge: 'Advanced Analytics Tool',
    title: 'AI-Powered Analytics for Smarter Decisions',
    description:
      'Turn raw market data into decisions you can act on today. Built specifically for real estate professionals, our analytics engine surfaces the patterns that matter and tells you what to do next.',
    bullets: [
      { icon: TrendingUp, title: 'Data-Driven Insights', desc: 'Surface hidden patterns and opportunities in real-time market data' },
      { icon: Target, title: 'Higher Accuracy', desc: 'Forecasts built on models trained across millions of data points' },
      { icon: Zap, title: 'Actionable Intelligence', desc: 'Complex data, distilled into clear next steps that drive more deals' },
    ],
    cards: [
      {
        icon: TrendingUp,
        title: 'Market Prediction',
        desc: 'Forecast market trends up to six months out, with accuracy that holds up in the field.',
        image: marketPredictionImg,
      },
      {
        icon: MapPin,
        title: 'Location Intelligence',
        desc: 'Spot high-growth neighborhoods and investment-ready areas before your competitors do.',
        image: locationIntelligenceImg,
      },
    ],
  },
  crm: {
    badge: 'Custom CRM',
    title: 'Relationship Management Built for Real Estate',
    description:
      'A CRM tailored to how real estate teams actually work — pairing the right clients with the right properties and automating the busywork between first contact and closing.',
    bullets: [
      { icon: Users, title: 'Client Intelligence', desc: 'Deep insights into client preferences and behavior' },
      { icon: Calendar, title: 'Smart Scheduling', desc: 'AI-optimized appointment and follow-up management' },
      { icon: Zap, title: 'Workflow Automation', desc: 'Streamlined processes from lead to closing' },
    ],
    cards: [
      {
        icon: Database,
        title: 'Property Matching',
        desc: 'Automatically pairs active buyers with new listings that fit their criteria, the moment they hit the market.',
        badge: 'Instant Match',
      },
      {
        icon: Calendar,
        title: 'Smart Scheduling',
        desc: 'Coordinates showings and follow-ups around your team\'s availability and client priority.',
        points: [
          { label: 'Follow-Up Rate', value: '100%' },
          { label: 'No-Show Rate', value: '-32%' },
          { label: 'Response Time', value: '<5 min' },
        ],
      },
    ],
  },
};

const CleanSolutions = () => {
  const [activeTab, setActiveTab] = useState<SolutionKey>('analytics');
  const activeSolution = solutions[activeTab];

  return (
    <section id="solutions" className="relative overflow-hidden py-20 bg-gray-50">
      <DotGridBackground />
      <div className="relative z-10 px-6 mx-auto max-w-7xl">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2 className="mb-4 text-3xl font-bold text-black sm:text-4xl">Our Core Solutions</h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-700">
            Purpose-built AI tools for every stage of the deal — from your first read on a market to the
            signed contract.
          </p>
        </motion.div>

        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1 sm:p-1.5 bg-white border border-gray-200 rounded-xl shadow-sm">
            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-base font-semibold rounded-lg transition-all duration-300 ${
                activeTab === 'analytics' ? 'bg-blue-900 text-white shadow-sm' : 'text-gray-600 hover:text-blue-900'
              }`}
            >
              <BarChart3 className="w-4 h-4" aria-hidden="true" />
              Analytics Tool
            </button>
            <button
              onClick={() => setActiveTab('crm')}
              className={`flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-base font-semibold rounded-lg transition-all duration-300 ${
                activeTab === 'crm' ? 'bg-blue-900 text-white shadow-sm' : 'text-gray-600 hover:text-blue-900'
              }`}
            >
              <Users className="w-4 h-4" aria-hidden="true" />
              Custom CRM
            </button>
          </div>
        </div>

        <motion.div
          key={activeTab}
          className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          {/* Left — copy */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold tracking-wide text-blue-900 uppercase bg-blue-100 rounded-full">
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
              {activeSolution.badge}
            </div>
            <h3 className="text-2xl font-bold leading-snug text-black sm:text-3xl">
              {activeSolution.title.split(' for ')[0]}
              {activeSolution.title.includes(' for ') && (
                <>
                  {' for '}
                  <span className="text-blue-900">{activeSolution.title.split(' for ')[1]}</span>
                </>
              )}
            </h3>
            <p className="text-base leading-relaxed text-gray-700">{activeSolution.description}</p>

            <div className="space-y-4 pt-2">
              {activeSolution.bullets.map((b) => (
                <div key={b.title} className="flex items-start gap-3">
                  <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 mt-0.5 bg-blue-100 rounded-lg">
                    <b.icon className="w-5 h-5 text-blue-900" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="font-semibold text-black">{b.title}</div>
                    <div className="text-sm text-gray-600">{b.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <HashLink
                to="/pilot"
                className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white transition-colors bg-blue-900 rounded-lg hover:bg-blue-950 group"
              >
                Learn More
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </HashLink>
            </div>
          </div>

          {/* Right — supporting cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {activeSolution.cards.map((c) => (
              <div key={c.title} className="p-5 bg-white border border-gray-200 shadow-sm rounded-2xl">
                <div className="flex items-center justify-center w-11 h-11 mb-3 bg-blue-100 rounded-xl">
                  <c.icon className="w-5 h-5 text-blue-900" aria-hidden="true" />
                </div>
                <h4 className="mb-2 text-base font-bold leading-snug text-black">{c.title}</h4>
                <p className="mb-4 text-xs leading-relaxed text-gray-600">{c.desc}</p>

                {c.image && (
                  <img src={c.image} alt={c.title} className="w-full h-auto -mb-1 object-contain" />
                )}

                {c.badge && (
                  <span className="inline-flex items-center px-3 py-1 text-sm font-bold text-blue-900 bg-blue-100 rounded-full">
                    {c.badge}
                  </span>
                )}

                {c.points && (
                  <div className="grid grid-cols-3 gap-1.5 pt-3 mt-1 border-t border-gray-100">
                    {c.points.map((p) => (
                      <div key={p.label}>
                        <div className="text-sm font-bold text-blue-900">{p.value}</div>
                        <div className="text-[11px] text-gray-500 leading-tight">{p.label}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*  SECTION 4 — AI Tools Built for Real Estate Professionals           */
/* ------------------------------------------------------------------ */

const AiTools = () => (
  <section className="relative overflow-hidden py-20 bg-white">
    <DotGridBackground />
    <div className="relative z-10 px-6 mx-auto max-w-7xl">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold tracking-wide text-blue-900 uppercase bg-blue-100 rounded-full">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            Powering Real Estate Success
          </div>
          <h2 className="text-3xl font-bold leading-snug text-black sm:text-4xl">
            AI Tools Built for <span className="text-blue-900">Real Estate Professionals</span>
          </h2>
          <p className="text-lg leading-relaxed text-gray-700">
            From analytics to lead scoring, our intelligent tools help you make smarter decisions,
            engage the right leads, and close more deals.
          </p>
          <HashLink
            to="/pilot"
            className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white transition-colors bg-blue-900 rounded-lg hover:bg-blue-950 group w-fit"
          >
            Learn More
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </HashLink>
        </motion.div>

        <motion.div
          className="grid gap-6 sm:grid-cols-2"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {/* Portfolio Analysis card */}
          <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-2xl">
            <div className="flex items-center justify-center w-12 h-12 mb-4 bg-blue-100 rounded-xl">
              <PieChart className="w-6 h-6 text-blue-900" aria-hidden="true" />
            </div>
            <h3 className="mb-1 text-lg font-bold text-black">Portfolio Analysis</h3>
            <div className="w-10 h-0.5 bg-blue-900 mb-3" />
            <p className="mb-5 text-sm leading-relaxed text-gray-600">
              Comprehensive performance tracking and optimization
            </p>
            <img src={portfolioAnalysisImg} alt="Portfolio analysis dashboard" className="w-full h-auto rounded-xl" />
          </div>

          {/* Lead Scoring card */}
          <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-2xl">
            <div className="flex items-center justify-center w-12 h-12 mb-4 bg-blue-100 rounded-xl">
              <Target className="w-6 h-6 text-blue-900" aria-hidden="true" />
            </div>
            <h3 className="mb-1 text-lg font-bold text-black">Lead Scoring</h3>
            <div className="w-10 h-0.5 bg-blue-900 mb-3" />
            <p className="mb-5 text-sm leading-relaxed text-gray-600">
              AI-powered qualification and ranking system
            </p>
            <img src={leadScoringImg} alt="Lead scoring dashboard" className="w-full h-auto rounded-xl" />
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

/* ------------------------------------------------------------------ */
/*  SECTION 5 — Proven Results                                         */
/* ------------------------------------------------------------------ */

const resultStats = [
  { icon: DollarSign, target: 47, suffix: '%', title: 'Revenue Growth', desc: 'Average increase in first quarter', tag: 'Year over year' },
  { icon: Clock, target: 23, suffix: 'h', title: 'Time Saved Weekly', desc: 'Through intelligent automation', tag: 'Operational efficiency' },
  { icon: Target, target: 3.8, suffix: 'x', title: 'Conversion Rate', desc: 'Lead-to-client improvement', tag: 'Higher conversions', decimal: true },
];

const CleanMetrics = () => {
  const [counters, setCounters] = useState({ revenue: 0, time: 0, conversion: 0 });

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setCounters((prev) => ({
          revenue: Math.min(prev.revenue + 2, 47),
          time: Math.min(prev.time + 1, 23),
          conversion: Math.min(prev.conversion + 0.1, 3.8),
        }));
      }, 50);
      setTimeout(() => clearInterval(interval), 2000);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const values: Record<string, string> = {
    'Revenue Growth': `${counters.revenue}%`,
    'Time Saved Weekly': `${counters.time}h`,
    'Conversion Rate': `${counters.conversion.toFixed(1)}x`,
  };

  return (
    <section className="relative overflow-hidden py-20 bg-gray-50">
      <DotGridBackground />
      <div className="relative z-10 px-6 mx-auto max-w-7xl">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2 className="mb-4 text-3xl font-bold text-black sm:text-4xl">Proven Results</h2>
          <p className="text-lg text-gray-700">Real outcomes from real estate professionals using our platform.</p>
        </motion.div>

        <motion.div
          className="grid gap-6 mb-10 md:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          {resultStats.map((s) => (
            <motion.div key={s.title} className="p-8 text-center bg-white border border-gray-200 shadow-sm rounded-2xl" variants={fadeInUp}>
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-5 bg-blue-100 rounded-full">
                <s.icon className="w-8 h-8 text-blue-900" aria-hidden="true" />
              </div>
              <div className="mb-2 text-4xl font-bold text-blue-900">{values[s.title]}</div>
              <h3 className="mb-2 text-lg font-semibold text-black">{s.title}</h3>
              <p className="mb-4 text-sm text-gray-600">{s.desc}</p>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-blue-900 bg-blue-50 rounded-full">
                <TrendingUp className="w-3 h-3" aria-hidden="true" />
                {s.tag}
              </span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <img
            src={testimonialImg}
            alt="Testimonial from Sarah Johnson, CEO of Premier Properties, rated five stars"
            className="w-full h-auto rounded-2xl shadow-sm"
          />
        </motion.div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*  PAGE                                                                */
/* ------------------------------------------------------------------ */

const RealEstateIndex: React.FC<ChatbotOpenProps> = ({ onOpenChatbot }) => {
  return (
    <div className="min-h-screen bg-white">
      <Hero onOpenChatbot={onOpenChatbot} />
      <PortfolioSnapshot />
      <CleanSolutions />
      <AiTools />
      <CleanMetrics />
    </div>
  );
};

export default RealEstateIndex;
