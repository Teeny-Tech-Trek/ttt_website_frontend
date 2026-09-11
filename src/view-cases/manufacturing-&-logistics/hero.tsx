import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Phone,
  Database,
  Users,
  Truck,
  Factory,
  ArrowRight,
  Target,
  Clock,
  DollarSign,
  TrendingUp,
  Settings,
  FileText,
  ShieldCheck,
  Star,
  CheckCircle2,
  Building2,
  Cog,
  Zap,
  Activity,
  RefreshCw,
  PhoneCall,
  BarChart3,
} from 'lucide-react';
import HashLink from '../../components/ui/SectionLink';

// Asset imports from user-added logistics directory
import heroImg from '../../Images/logistics/manufacturing-logistics.png';
import leadGenBannerImg from '../../Images/logistics/manufacturing-logistics-lead-generation.png';
import aiPoweredCallsImg from '../../Images/logistics/ai-powered-calls.png';
import crmIntegrationImg from '../../Images/logistics/crm-integration.png';
import ivrIntegrationsImg from '../../Images/logistics/ivr-integrations.png';
import callSummaryImg from '../../Images/logistics/call-summary.png';
import callAnalysisReportImg from '../../Images/logistics/call-analysis-report.png';
import availabilityImg from '../../Images/logistics/24-7-availability.png';

// Framer Motion Animation Variants
const slideFromLeft = {
  hidden: { x: -40, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
};

const slideFromRight = {
  hidden: { x: 40, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
};

const slideFromTop = {
  hidden: { y: -30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
};

const slideFromBottom = {
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

/* ------------------------------------------------------------------ */
/*  SECTION 1 — Hero                                                   */
/* ------------------------------------------------------------------ */

const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Background glow effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute bg-blue-100/40 rounded-full -top-32 -right-32 w-96 h-96 blur-3xl" />
        <div className="absolute bg-blue-50/60 rounded-full -bottom-32 -left-32 w-96 h-96 blur-3xl" />
      </div>

      <div className="relative px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-12 sm:pb-16 mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column: Content */}
          <motion.div
            className="space-y-8"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {/* Pill Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-blue-900 rounded-full bg-blue-50 border border-blue-100 shadow-sm"
              variants={slideFromLeft}
            >
              <Phone className="w-4 h-4 text-blue-900" aria-hidden="true" />
              <span>AI CALL AGENT</span>
            </motion.div>

            {/* Headline */}
            <motion.div variants={slideFromLeft}>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-[1.15] text-black tracking-tight">
                Your AI Call Agent
                <br />
                <span className="text-blue-900">for Manufacturing & Logistics</span>
              </h1>
              <div className="w-24 h-1.5 mt-5 bg-blue-600 rounded-full" />
            </motion.div>

            {/* Subhead */}
            <motion.p
              className="max-w-xl text-lg sm:text-xl leading-relaxed text-gray-700"
              variants={slideFromLeft}
            >
              AI-powered lead generation that never sleeps. Transform your sales process with
              intelligent calling that connects you to quality prospects, 24/7.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-col gap-4 sm:flex-row sm:items-center"
              variants={slideFromLeft}
            >
              <HashLink
                smooth
                to="/book-consultation"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base sm:text-lg font-semibold text-white transition-all duration-200 bg-blue-900 rounded-xl hover:bg-blue-950 shadow-md hover:shadow-lg group"
              >
                <span>Start Generating Leads</span>
                <ArrowRight
                  className="w-5 h-5 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </HashLink>

              <HashLink
                to="/pilot"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base sm:text-lg font-semibold text-blue-900 transition-all duration-200 bg-white border-2 border-blue-900 rounded-xl hover:bg-blue-50 shadow-sm"
              >
                <Phone className="w-5 h-5" aria-hidden="true" />
                <span>Demo AI Call Agent</span>
              </HashLink>
            </motion.div>
          </motion.div>

          {/* Right Column: Visual Asset */}
          <motion.div
            className="relative flex items-center justify-center"
            initial="hidden"
            animate="visible"
            variants={slideFromRight}
          >
            <div className="relative w-full max-w-2xl">
              <img
                src={heroImg}
                alt="AI Call Agent dashboard on laptop, mobile phone with active voice waveform, call center headset, and logistics distribution warehouse"
                className="w-full h-auto object-contain rounded-2xl drop-shadow-2xl"
                loading="eager"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*  SECTION 2 — Supercharge Your Business Calls                        */
/* ------------------------------------------------------------------ */

interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  pillText: string;
  pillIcon: React.ComponentType<{ className?: string }>;
  image: string;
  imageAlt: string;
  highlighted?: boolean;
}

const features: FeatureItem[] = [
  {
    id: 'ai-calls',
    title: 'AI-Powered Calls',
    description: 'Human-like voice conversations that engage prospects naturally',
    icon: Phone,
    pillText: 'Natural & context-aware',
    pillIcon: Activity,
    image: aiPoweredCallsImg,
    imageAlt: '3D telephone handset with voice frequency waves',
    highlighted: true,
  },
  {
    id: 'crm-integration',
    title: 'CRM Integration',
    description: 'Sync leads and data effortlessly with your CRM',
    icon: Database,
    pillText: 'Seamless data sync',
    pillIcon: RefreshCw,
    image: crmIntegrationImg,
    imageAlt: '3D database connected to Salesforce, HubSpot, and Zoho',
  },
  {
    id: 'ivr-integration',
    title: 'IVR Integration',
    description: 'Works seamlessly with your existing infrastructure',
    icon: Settings,
    pillText: 'Easy integration',
    pillIcon: PhoneCall,
    image: ivrIntegrationsImg,
    imageAlt: '3D interactive voice response tree routing sales, support, and inquiries',
  },
  {
    id: 'call-summary',
    title: 'Call Summary',
    description: 'Concise summaries after every call with key insights',
    icon: FileText,
    pillText: 'Actionable insights',
    pillIcon: FileText,
    image: callSummaryImg,
    imageAlt: '3D call summary document with key points and next steps',
  },
  {
    id: 'call-analysis',
    title: 'Call Analysis Report',
    description: 'Performance metrics to improve results',
    icon: BarChart3,
    pillText: 'Track & improve',
    pillIcon: TrendingUp,
    image: callAnalysisReportImg,
    imageAlt: '3D analytics report card with bar charts and 78% connection rate gauge',
  },
  {
    id: 'always-available',
    title: '24/7 Available',
    description: 'Never miss a lead - works around the clock',
    icon: Clock,
    pillText: 'Always on',
    pillIcon: Clock,
    image: availabilityImg,
    imageAlt: '3D world globe with 24/7 badge and orbiting sun and moon',
  },
];

const SuperchargeSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-24 bg-gradient-to-b from-[#F2F6FF]/80 via-[#F8FAFC] to-[#F1F6FF]/60 relative overflow-hidden border-t border-blue-50">
      {/* Soft Ambient Radial Background Glows matching design */}
      <div className="absolute top-0 left-0 w-[550px] h-[550px] bg-blue-100/45 rounded-full blur-3xl pointer-events-none -translate-x-1/3 -translate-y-1/3" />
      <div className="absolute top-1/4 right-0 w-[550px] h-[550px] bg-blue-100/35 rounded-full blur-3xl pointer-events-none translate-x-1/3" />

      <div className="relative px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          className="mb-14 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={slideFromTop}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 text-xs font-bold tracking-wider text-blue-600 uppercase bg-[#EEF4FE] rounded-full">
            <Phone className="w-3.5 h-3.5 fill-blue-600 text-blue-600" aria-hidden="true" />
            <span>AI CALL AGENT</span>
          </div>
          <h2 className="mb-4 text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-slate-900 tracking-tight leading-tight">
            Supercharge Your <span className="text-[#2563EB]">Business Calls</span>
          </h2>
          <p className="max-w-3xl mx-auto text-base sm:text-lg leading-relaxed text-slate-600">
            Say goodbye to missed opportunities and hello to smarter calling with our AI Call Agent
          </p>
        </motion.div>

        {/* 6 Feature Cards Grid */}
        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              className={`relative p-6 sm:p-7 bg-white rounded-3xl transition-all duration-300 flex flex-col justify-between shadow-[0_4px_25px_-5px_rgba(0,0,0,0.05)] hover:shadow-lg min-h-[270px] ${
                feature.highlighted
                  ? 'border-2 border-blue-500 ring-2 ring-blue-100/60'
                  : 'border border-slate-100 hover:border-blue-200'
              }`}
              variants={slideFromBottom}
            >
              <div className="flex items-start justify-between gap-3 h-full">
                {/* Left Column: Icon, Title, Description, Pill Badge */}
                <div className="flex flex-col justify-between h-full flex-1 min-w-0 pr-1">
                  <div>
                    {/* Squircle Icon */}
                    <div
                      className={`flex items-center justify-center w-11 h-11 mb-4 rounded-xl ${
                        feature.highlighted
                          ? 'bg-[#2563EB] text-white shadow-sm'
                          : 'bg-blue-50/90 text-slate-800'
                      }`}
                    >
                      <feature.icon
                        className={`w-5 h-5 ${feature.highlighted ? 'fill-white text-white' : ''}`}
                        aria-hidden="true"
                      />
                    </div>

                    {/* Title */}
                    <h3 className="mb-2 text-base sm:text-xl font-bold text-slate-900 tracking-tight">
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-[13px] leading-relaxed text-slate-500 font-normal">
                      {feature.description}
                    </p>
                  </div>

                  {/* Bottom Feature Pill Badge */}
                  <div className="pt-5 mt-auto">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-600 bg-[#EFF6FF] rounded-full border border-blue-100/50 whitespace-nowrap">
                      <feature.pillIcon className="w-3.5 h-3.5 text-blue-600" aria-hidden="true" />
                      {feature.pillText}
                    </span>
                  </div>
                </div>

                {/* Right 3D Visual Container */}
                <div className="relative shrink-0 w-28 sm:w-32 lg:w-36 flex flex-col items-center justify-center self-center">
                  {feature.id === 'ai-calls' && (
                    <div className="relative mb-2 bg-white border border-blue-100 rounded-2xl px-3 py-1.5 shadow-sm text-[11px] font-semibold text-blue-600 leading-tight self-end z-10 text-center whitespace-nowrap">
                      <div>Hello! How can</div>
                      <div>I help you today?</div>
                      <div className="absolute -bottom-1 left-4 w-2 h-2 bg-white border-b border-r border-blue-100 rotate-45" />
                    </div>
                  )}
                  <img
                    src={feature.image}
                    alt={feature.imageAlt}
                    className="w-full h-auto max-h-[130px] sm:max-h-[140px] object-contain drop-shadow-sm transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*  SECTION 3 — Manufacturing & Logistics Lead Generation              */
/* ------------------------------------------------------------------ */

const LeadGenerationSection: React.FC = () => {
  const [counters, setCounters] = useState({ leads: 0, conversion: 0, cost: 0 });

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setCounters((prev) => ({
          leads: Math.min(prev.leads + 10, 200),
          conversion: Math.min(prev.conversion + 2, 40),
          cost: Math.min(prev.cost + 4, 78),
        }));
      }, 40);
      setTimeout(() => clearInterval(interval), 1500);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        {/* Real Coded Lead Generation Component matching design reference */}
        <motion.div
          className="relative overflow-hidden rounded-[32px] border border-blue-100 shadow-xl bg-gradient-to-b from-[#F0F6FF] via-white to-[#F0F6FF]/40 pt-10 pb-12 sm:pt-12 sm:pb-16 px-4 sm:px-10 lg:px-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={slideFromBottom}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 text-xs font-bold tracking-wider text-blue-600 uppercase bg-blue-50/90 rounded-full border border-blue-100">
              <BarChart3 className="w-3.5 h-3.5 text-blue-600" aria-hidden="true" />
              <span>REAL RESULTS. REAL GROWTH.</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-slate-900 tracking-tight leading-tight mb-3">
              Manufacturing & Logistics <span className="text-[#2563EB]">Lead Generation</span>
            </h2>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Specialized AI calling designed for the manufacturing and logistics industry
            </p>
          </div>

          {/* Grid of 3 Stat Cards + Checklist Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch relative z-10">
            {/* Card 1: 200+ */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5">
                  <Users className="w-6 h-6" aria-hidden="true" />
                </div>
                <div className="text-4xl font-extrabold text-slate-900 tracking-tight mb-1">{counters.leads}+</div>
                <div className="text-base font-bold text-slate-800 mb-1">Quality Leads/Month</div>
                <p className="text-xs text-slate-500 mb-6 leading-relaxed">Pre-qualified manufacturing prospects</p>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-600 bg-[#EFF6FF] rounded-full border border-blue-100/50 self-start">
                <Users className="w-3.5 h-3.5" aria-hidden="true" />
                More opportunities. Less effort.
              </span>
            </div>

            {/* Card 2: 40% */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5">
                  <TrendingUp className="w-6 h-6" aria-hidden="true" />
                </div>
                <div className="text-4xl font-extrabold text-[#2563EB] tracking-tight mb-1">{counters.conversion}%</div>
                <div className="text-base font-bold text-slate-800 mb-1">Conversion Rate</div>
                <p className="text-xs text-slate-500 mb-6 leading-relaxed">From lead to qualified prospect</p>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-600 bg-[#EFF6FF] rounded-full border border-blue-100/50 self-start">
                <BarChart3 className="w-3.5 h-3.5" aria-hidden="true" />
                Turn conversations into business.
              </span>
            </div>

            {/* Card 3: 78% */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5">
                  <DollarSign className="w-6 h-6" aria-hidden="true" />
                </div>
                <div className="text-4xl font-extrabold text-slate-900 tracking-tight mb-1">{counters.cost}%</div>
                <div className="text-base font-bold text-slate-800 mb-1">Lower Cost Per Lead</div>
                <p className="text-xs text-slate-500 mb-6 leading-relaxed">Compared to traditional methods</p>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-600 bg-[#EFF6FF] rounded-full border border-blue-100/50 self-start">
                <RefreshCw className="w-3.5 h-3.5" aria-hidden="true" />
                Higher ROI. Greater efficiency.
              </span>
            </div>

            {/* Card 4: Checklist Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-lg transition-all duration-300 flex flex-col justify-center space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-white fill-blue-600" aria-hidden="true" />
                </div>
                <span className="text-sm font-semibold text-slate-800">Inquiries</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-white fill-blue-600" aria-hidden="true" />
                </div>
                <span className="text-sm font-semibold text-slate-800">Follow-ups</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-white fill-blue-600" aria-hidden="true" />
                </div>
                <span className="text-sm font-semibold text-slate-800">Appointments</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-white fill-blue-600" aria-hidden="true" />
                </div>
                <span className="text-sm font-semibold text-slate-800">Qualified Leads</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*  SECTION 4 — AI Call Agent for Every Segment                        */
/* ------------------------------------------------------------------ */

interface SegmentCard {
  title: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  points: string[];
}

const segments: SegmentCard[] = [
  {
    title: 'Manufacturers & Industrial Suppliers',
    badge: 'B2B Sales',
    icon: Factory,
    description:
      'Reach procurement and operations decision-makers with calls that speak their language — capacity, lead times, and specs.',
    points: [
      'Qualifies by production volume & specs',
      'Books meetings with procurement teams',
      'Follows up on RFQs automatically',
    ],
  },
  {
    title: 'Freight, Trucking & Fleet Operators',
    badge: 'Route Ready',
    icon: Truck,
    description:
      'Fill capacity and win new lanes with outbound calling built around freight and fleet sales cycles.',
    points: [
      'Qualifies by lane, volume & equipment type',
      'Coordinates around dispatch schedules',
      'Re-engages dormant shipper accounts',
    ],
  },
  {
    title: 'Warehousing & 3PL Providers',
    badge: 'Enterprise Ready',
    icon: Building2,
    description:
      'Generate a steady pipeline of shippers and brands looking for fulfillment and storage capacity.',
    points: [
      'Qualifies by SKU volume & storage needs',
      'Coordinates multi-stakeholder calls',
      'Tracks capacity-driven follow-ups',
    ],
  },
  {
    title: 'Equipment Dealers & Distributors',
    badge: 'Faster Quotes',
    icon: Cog,
    description:
      'Turn inbound interest and cold lists alike into scheduled demos and quote requests.',
    points: [
      'Qualifies by equipment type & budget',
      'Books demos and site visits',
      'Nurtures long sales-cycle leads',
    ],
  },
];

const SegmentSection: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50/70 border-t border-gray-100">
      <div className="px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={slideFromTop}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 text-xs font-semibold tracking-wide text-blue-900 uppercase bg-blue-50 rounded-full border border-blue-100">
            <Users className="w-3.5 h-3.5 text-blue-900" aria-hidden="true" />
            <span>Built for Every Segment</span>
          </div>
          <h2 className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-black tracking-tight">
            AI Call Agent for <span className="text-blue-900">Every Segment</span>
          </h2>
          <p className="max-w-3xl mx-auto text-lg sm:text-xl leading-relaxed text-gray-700">
            One AI Call Agent, tuned to the language, priorities, and buying cycle of each corner of
            manufacturing and logistics.
          </p>
        </motion.div>

        {/* 4 Segment Cards Grid */}
        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          {segments.map((segment) => (
            <motion.div
              key={segment.title}
              className="flex flex-col justify-between p-6 bg-white border border-gray-200 rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300"
              variants={slideFromBottom}
            >
              <div>
                {/* Top Badge */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="inline-flex items-center px-3 py-1 text-xs font-semibold text-blue-900 bg-blue-50 rounded-full border border-blue-100">
                    {segment.badge}
                  </span>
                  <div className="flex items-center justify-center w-10 h-10 bg-blue-50 rounded-xl">
                    <segment.icon className="w-5 h-5 text-blue-900" aria-hidden="true" />
                  </div>
                </div>

                <h3 className="mb-3 text-lg font-bold text-black leading-snug">{segment.title}</h3>
                <p className="mb-6 text-sm leading-relaxed text-gray-600">{segment.description}</p>

                {/* Bullet Points */}
                <ul className="mb-6 space-y-2.5">
                  {segment.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle2
                        className="w-4 h-4 mt-0.5 text-blue-600 flex-shrink-0"
                        aria-hidden="true"
                      />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Link */}
              <div className="pt-4 border-t border-gray-100">
                <HashLink
                  to="/pilot"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-900 hover:text-blue-700 group transition-colors"
                >
                  <span>Learn More</span>
                  <ArrowRight
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </HashLink>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*  SECTION 5 — How We Help You Scale                                  */
/* ------------------------------------------------------------------ */

const benefitsList = [
  {
    title: 'More qualified pipeline',
    desc: 'Every call is scored and routed to the reps who should follow up',
    icon: Target,
  },
  {
    title: 'Lower cost per lead',
    desc: 'Cut the cost of manual outbound dialing',
    icon: DollarSign,
  },
  {
    title: 'Faster follow-up',
    desc: 'No lead waits longer than it takes the AI to dial',
    icon: Clock,
  },
  {
    title: 'Consistent outreach at scale',
    desc: 'Every prospect gets the same quality conversation, every time',
    icon: TrendingUp,
  },
  {
    title: 'Free up your sales team',
    desc: 'Let your reps close, not dial',
    icon: Users,
  },
];

const deliveryList = [
  {
    title: 'Human-like AI voice agents',
    desc: 'Natural, context-aware conversations, not robotic scripts',
    icon: Phone,
  },
  {
    title: 'Industry-tuned call scripts',
    desc: 'Built around manufacturing & logistics buying signals',
    icon: FileText,
  },
  {
    title: 'CRM & IVR integration',
    desc: 'Works inside the systems your team already uses',
    icon: Database,
  },
  {
    title: 'Real-time call analytics',
    desc: "See what's working, call by call",
    icon: BarChart3,
  },
  {
    title: 'Continuous learning',
    desc: 'Gets sharper with every conversation',
    icon: Zap,
  },
];

const ScaleSection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={slideFromTop}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 text-xs font-semibold tracking-wide text-blue-900 uppercase bg-blue-50 rounded-full border border-blue-100">
            <TrendingUp className="w-3.5 h-3.5 text-blue-900" aria-hidden="true" />
            <span>Smarter Calling. Bigger Pipeline.</span>
          </div>
          <h2 className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-black tracking-tight">
            How We Help You <span className="text-blue-900">Scale</span>
          </h2>
          <p className="max-w-3xl mx-auto text-lg sm:text-xl leading-relaxed text-gray-700">
            AI calling, CRM sync, and real-time analytics that fill your pipeline and free up your
            sales team.
          </p>
        </motion.div>

        {/* Two-Panel Layout */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left Panel — Benefits to You */}
          <motion.div
            className="p-8 sm:p-10 bg-white border border-gray-200 rounded-3xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={slideFromLeft}
          >
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-50 rounded-2xl">
                  <Users className="w-6 h-6 text-blue-900" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-bold text-blue-900">Benefits to You</h3>
              </div>
              <p className="mb-8 leading-relaxed text-gray-700">
                We design, configure, and deploy an AI Call Agent built around your industry and ideal
                customer profile.
              </p>

              <div className="space-y-5 mb-8">
                {benefitsList.map((b) => (
                  <div key={b.title} className="flex items-start gap-3.5">
                    <div className="flex items-center justify-center flex-shrink-0 w-9 h-9 bg-blue-50 rounded-xl mt-0.5">
                      <b.icon className="w-4.5 h-4.5 text-blue-900" aria-hidden="true" />
                    </div>
                    <div>
                      <div className="font-semibold text-black">{b.title}</div>
                      <div className="text-sm text-gray-600">{b.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <HashLink
                to="/pilot"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-blue-900 bg-blue-50 hover:bg-blue-100 rounded-full transition-colors group"
              >
                <span>See the Impact</span>
                <ArrowRight
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </HashLink>
            </div>
          </motion.div>

          {/* Right Panel — How We Deliver Them */}
          <motion.div
            className="p-8 sm:p-10 bg-white border border-gray-200 rounded-3xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={slideFromRight}
          >
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-50 rounded-2xl">
                  <Settings className="w-6 h-6 text-blue-900" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-bold text-blue-900">How We Deliver Them</h3>
              </div>
              <p className="mb-8 leading-relaxed text-gray-700">
                Natural language voice AI, CRM-native workflows, and call intelligence built for
                industrial sales cycles.
              </p>

              <div className="space-y-5 mb-8">
                {deliveryList.map((d) => (
                  <div key={d.title} className="flex items-start gap-3.5">
                    <div className="flex items-center justify-center flex-shrink-0 w-9 h-9 bg-blue-50 rounded-xl mt-0.5">
                      <d.icon className="w-4.5 h-4.5 text-blue-900" aria-hidden="true" />
                    </div>
                    <div>
                      <div className="font-semibold text-black">{d.title}</div>
                      <div className="text-sm text-gray-600">{d.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <HashLink
                to="/pilot"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-blue-900 bg-blue-50 hover:bg-blue-100 rounded-full transition-colors group"
              >
                <span>Learn How It Works</span>
                <ArrowRight
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </HashLink>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*  SECTION 6 — Get Started in 5 Simple Steps                          */
/* ------------------------------------------------------------------ */

const steps = [
  {
    number: 1,
    title: 'Define Your Ideal Customer Profile',
    icon: Target,
    desc: 'We work with you to define the prospects worth calling — by industry, company size, and buying signals.',
    points: ['Set your targeting criteria', 'Establish qualification rules'],
  },
  {
    number: 2,
    title: 'Configure & Train Your AI Call Agent',
    icon: Phone,
    desc: "We tune the agent's voice, script, and objection handling to your industry and brand.",
    points: ['Build your call scripts', 'Train on your offer & FAQs'],
  },
  {
    number: 3,
    title: 'Connect Your CRM & Phone Systems',
    icon: Database,
    desc: 'We integrate with your CRM and existing phone infrastructure — no rip-and-replace required.',
    points: ['Connect your CRM & IVR', 'Sync lead routing rules'],
  },
  {
    number: 4,
    title: 'Test & Launch Campaigns',
    icon: PhoneCall,
    desc: 'We run test calls and pilot campaigns before going live at full volume.',
    points: ['Test call quality & scripts', 'Launch your first campaign'],
  },
  {
    number: 5,
    title: 'Monitor, Optimize & Scale',
    icon: TrendingUp,
    desc: 'We track call outcomes and pipeline impact, and keep refining the agent as your campaigns scale.',
    points: ['Monitor conversion & lead quality', 'Scale across teams & territories'],
  },
];

// Cards where a connecting arrow renders after them on desktop (row-mates)
const ARROW_AFTER = new Set([1, 2, 4]);

const ProcessStepsSection: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50/70 border-t border-gray-100">
      <div className="px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={slideFromTop}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 text-xs font-semibold tracking-wide text-blue-900 uppercase bg-blue-50 rounded-full border border-blue-100">
            <Settings className="w-3.5 h-3.5 text-blue-900" aria-hidden="true" />
            <span>From Setup to Scale</span>
          </div>
          <h2 className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-black tracking-tight">
            Get Started in <span className="text-blue-900">5 Simple Steps</span>
          </h2>
          <p className="max-w-3xl mx-auto text-lg sm:text-xl leading-relaxed text-gray-700">
            Our streamlined onboarding gets your AI Call Agent live and calling — with minimal lift
            from your team.
          </p>
        </motion.div>

        {/* 5-Step Process Grid */}
        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          {steps.map((step) => (
            <motion.div key={step.number} className="relative" variants={slideFromBottom}>
              <div className="relative h-full p-7 bg-white border border-gray-200 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                {/* Header: Step Number & Icon */}
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 text-sm font-bold text-white bg-blue-600 rounded-full">
                    {step.number}
                  </div>
                  <div className="flex items-center justify-center flex-shrink-0 w-11 h-11 bg-blue-900 text-white rounded-xl">
                    <step.icon className="w-5 h-5 text-white" aria-hidden="true" />
                  </div>
                </div>

                <h3 className="mb-2 text-lg font-bold text-black">{step.title}</h3>
                <p className="mb-5 text-sm leading-relaxed text-gray-600">{step.desc}</p>

                {/* Checkpoints */}
                <div className="space-y-2">
                  {step.points.map((p) => (
                    <div key={p} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle2
                        className="w-4 h-4 mt-0.5 text-blue-600 flex-shrink-0"
                        aria-hidden="true"
                      />
                      <span>{p}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Connecting arrow for desktop row flow */}
              {ARROW_AFTER.has(step.number) && (
                <ArrowRight
                  className="absolute z-10 hidden w-5 h-5 text-blue-300 -translate-y-1/2 lg:block top-1/2 -right-6"
                  aria-hidden="true"
                />
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Section Bottom CTA */}
        <motion.div
          className="mt-14 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={slideFromBottom}
        >
          <HashLink
            smooth
            to="/book-consultation"
            className="inline-flex items-center gap-2 px-8 py-4 text-base sm:text-lg font-semibold text-white transition-all duration-200 bg-blue-900 rounded-xl hover:bg-blue-950 shadow-md group"
          >
            <span>Start Calling Smarter</span>
            <ArrowRight
              className="w-5 h-5 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </HashLink>
        </motion.div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*  SECTION 7 — Why Manufacturing & Logistics Teams Choose TTT         */
/* ------------------------------------------------------------------ */

const WhyChooseSection: React.FC = () => {
  const [counters, setCounters] = useState({ leads: 0, conversion: 0, cost: 0 });

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setCounters((prev) => ({
          leads: Math.min(prev.leads + 10, 200),
          conversion: Math.min(prev.conversion + 2, 40),
          cost: Math.min(prev.cost + 4, 78),
        }));
      }, 40);
      setTimeout(() => clearInterval(interval), 1500);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={slideFromTop}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 text-xs font-semibold tracking-wide text-blue-900 uppercase bg-blue-50 rounded-full border border-blue-100">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-900" aria-hidden="true" />
            <span>Trusted by Industrial Sales Teams</span>
          </div>
          <h2 className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-black tracking-tight">
            Why Manufacturing & Logistics Teams{' '}
            <span className="text-blue-900">Choose Teeny Tech Trek</span>
          </h2>
          <p className="max-w-3xl mx-auto text-lg sm:text-xl leading-relaxed text-gray-700">
            Built specifically for how industrial and logistics sales cycles actually work.
          </p>
        </motion.div>

        {/* 4 Statistics Cards */}
        <motion.div
          className="grid gap-6 mb-12 sm:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          {/* Stat 1 */}
          <motion.div
            className="p-7 text-center bg-white border border-gray-200 rounded-3xl shadow-sm hover:shadow-md transition-shadow"
            variants={slideFromBottom}
          >
            <div className="flex items-center justify-center w-14 h-14 mx-auto mb-4 bg-blue-50 rounded-2xl">
              <Users className="w-7 h-7 text-blue-900" aria-hidden="true" />
            </div>
            <div className="mb-1 text-3xl sm:text-4xl font-extrabold text-blue-900">
              {counters.leads}+
            </div>
            <h3 className="mb-2 font-bold text-black">Quality Leads/Month</h3>
            <p className="text-sm text-gray-600">Pre-qualified manufacturing prospects</p>
          </motion.div>

          {/* Stat 2 */}
          <motion.div
            className="p-7 text-center bg-white border border-gray-200 rounded-3xl shadow-sm hover:shadow-md transition-shadow"
            variants={slideFromBottom}
          >
            <div className="flex items-center justify-center w-14 h-14 mx-auto mb-4 bg-blue-50 rounded-2xl">
              <TrendingUp className="w-7 h-7 text-blue-900" aria-hidden="true" />
            </div>
            <div className="mb-1 text-3xl sm:text-4xl font-extrabold text-blue-900">
              {counters.conversion}%
            </div>
            <h3 className="mb-2 font-bold text-black">Conversion Rate</h3>
            <p className="text-sm text-gray-600">From lead to qualified prospect</p>
          </motion.div>

          {/* Stat 3 */}
          <motion.div
            className="p-7 text-center bg-white border border-gray-200 rounded-3xl shadow-sm hover:shadow-md transition-shadow"
            variants={slideFromBottom}
          >
            <div className="flex items-center justify-center w-14 h-14 mx-auto mb-4 bg-blue-50 rounded-2xl">
              <DollarSign className="w-7 h-7 text-blue-900" aria-hidden="true" />
            </div>
            <div className="mb-1 text-3xl sm:text-4xl font-extrabold text-blue-900">
              {counters.cost}%
            </div>
            <h3 className="mb-2 font-bold text-black">Lower Cost Per Lead</h3>
            <p className="text-sm text-gray-600">Compared to traditional methods</p>
          </motion.div>

        {/* Stat 4 */}
        <motion.div
          className="p-7 text-center bg-white border border-gray-200 rounded-3xl shadow-sm hover:shadow-md transition-shadow"
          variants={slideFromBottom}
        >
          <div className="flex items-center justify-center w-14 h-14 mx-auto mb-4 bg-blue-50 rounded-2xl">
            <Building2 className="w-7 h-7 text-blue-900" aria-hidden="true" />
          </div>
          <div className="mb-1 text-3xl sm:text-4xl font-extrabold text-blue-900">85+</div>
          <h3 className="mb-2 font-bold text-black">Manufacturing & Logistics Clients</h3>
          <p className="text-sm text-gray-600">Scaling sales across global territories</p>
        </motion.div>
      </motion.div>

      {/* Compliance Trust Line */}
      <motion.div
        className="p-6 sm:p-7 mb-12 bg-blue-50/70 border border-blue-200/80 rounded-2xl flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left shadow-sm"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={slideFromBottom}
      >
        <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 bg-blue-900 text-white rounded-2xl shadow-sm">
          <ShieldCheck className="w-6 h-6" aria-hidden="true" />
        </div>
        <div className="text-sm sm:text-base leading-relaxed text-gray-800">
          <strong className="font-bold text-blue-900">Built for Compliant Calling</strong> —
          Respects Do-Not-Call registries and outbound-calling rules across the US (TCPA), UK
          (PECR/TPS), and Canada (National DNCL).
        </div>
      </motion.div>

      {/* Review / Testimonial Block (Commented out as requested) */}
      {/*
      <motion.div
        className="max-w-4xl mx-auto p-8 sm:p-10 bg-white border border-gray-200 rounded-3xl shadow-sm text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={slideFromBottom}
      >
        <div className="flex items-center justify-center gap-1 mb-6" aria-label="5 stars rating">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-blue-600 text-blue-600" aria-hidden="true" />
          ))}
        </div>

        <blockquote className="mb-6 text-lg sm:text-xl font-medium italic leading-relaxed text-gray-800">
          "The AI Call Agent completely transformed how we approach lead qualification and supplier outreach. We're booking high-value supply contracts consistently without adding headcount."
        </blockquote>

        <div className="text-base font-semibold text-blue-900">
          Marcus Vance, VP of Operations, Apex Logistics
        </div>
      </motion.div>
      */}
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*  SECTION 8 — Closing CTA                                            */
/* ------------------------------------------------------------------ */

const ClosingCTASection: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50/80 border-t border-gray-100">
      <div className="max-w-4xl px-4 sm:px-6 mx-auto text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 text-xs font-semibold tracking-wide text-blue-900 uppercase bg-blue-50 rounded-full border border-blue-100"
            variants={slideFromTop}
          >
            <Phone className="w-3.5 h-3.5 text-blue-900" aria-hidden="true" />
            <span>Scale Your Pipeline</span>
          </motion.div>

          <motion.h2
            className="mb-6 text-3xl sm:text-4xl lg:text-5xl font-bold text-black tracking-tight"
            variants={slideFromTop}
          >
            Ready to Fill Your <span className="text-blue-900">Pipeline?</span>
          </motion.h2>

          <motion.p
            className="mb-10 text-lg sm:text-xl leading-relaxed text-gray-700 max-w-2xl mx-auto"
            variants={slideFromBottom}
          >
            Join manufacturing and logistics teams already using AI Call Agents to generate
            qualified leads around the clock.
          </motion.p>

          <motion.div variants={slideFromBottom}>
            <HashLink
              smooth
              to="/book-consultation"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base sm:text-lg font-semibold text-white transition-all duration-200 bg-blue-900 rounded-xl hover:bg-blue-950 shadow-md hover:shadow-lg group"
            >
              <span>Book a Consultation</span>
              <ArrowRight
                className="w-5 h-5 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </HashLink>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*  MAIN PAGE EXPORT                                                   */
/* ------------------------------------------------------------------ */

const ManufacturingLogisticsIndex: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Supercharge Your Business Calls */}
      <SuperchargeSection />

      {/* 3. Manufacturing & Logistics Lead Generation */}
      <LeadGenerationSection />

      {/* 4. AI Call Agent for Every Segment */}
      <SegmentSection />

      {/* 5. How We Help You Scale */}
      <ScaleSection />

      {/* 6. Get Started in 5 Simple Steps */}
      <ProcessStepsSection />

      {/* 7. Why Manufacturing & Logistics Teams Choose Teeny Tech Trek */}
      <WhyChooseSection />

      {/* 8. Closing CTA */}
      <ClosingCTASection />
    </div>
  );
};

export default ManufacturingLogisticsIndex;
