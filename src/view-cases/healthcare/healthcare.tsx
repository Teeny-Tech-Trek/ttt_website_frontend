import React from 'react';
import { motion } from 'framer-motion';
import {
  MessageCircle,
  ArrowRight,
  Shield,
  Handshake,
  DollarSign,
  BarChart3,
  Users,
  CheckCircle2,
  Settings,
  Monitor,
  Database,
  TrendingUp,
  Clock,
  Target,
  Calendar,
  FileText,
  Cloud,
  HeartPulse,
  Stethoscope,
  Building2,
  Heart,
  Bot,
  Zap,
  RefreshCw,
} from 'lucide-react';

import HashLink from '../../components/ui/SectionLink';
import { scrollToSection } from '../../utils/scrollToSection';

import healthcareHeroImg from '../../Images/Case Studies/healthcare/healthcare.png';
import benefitsToYouImg from '../../Images/Case Studies/healthcare/benefits-to-you.png';
import howWeDeliverThemImg from '../../Images/Case Studies/healthcare/how-we-deliver-them.png';
import urgentCareImg from '../../Images/Case Studies/healthcare/urgent-care-providers.png';
import surgeryCentersImg from '../../Images/Case Studies/healthcare/surgery-centers.png';
import hospitalsImg from '../../Images/Case Studies/healthcare/hospitals-&-speciality-practices.png';
import primaryCareImg from '../../Images/Case Studies/healthcare/primary-care-clinics.png';

// Animation variants
const slideFromLeft = {
  hidden: { x: -50, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
};

const slideFromRight = {
  hidden: { x: 50, opacity: 0 },
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

const fadeInUp = slideFromBottom;

type ChatbotOpenProps = {
  onOpenChatbot?: () => void;
};

/* ------------------------------------------------------------------ */
/*  SECTION 1 — Hero                                                   */
/* ------------------------------------------------------------------ */

const heroFeatures = [
  { icon: MessageCircle, label: 'AI Patient Engagement' },
  { icon: Calendar, label: 'Appointment Scheduling' },
  { icon: FileText, label: 'EHR/EMR & Data Integration' },
  { icon: BarChart3, label: 'Real-Time Insights & Analytics' },
  { icon: Shield, label: 'Compliant by Design' },
];

const HeroSection: React.FC<ChatbotOpenProps> = ({ onOpenChatbot }) => {
  const handleTalkToExpert = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onOpenChatbot) onOpenChatbot();
  };

  return (
    <section className="relative overflow-hidden bg-white">
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute bg-blue-100 rounded-full -top-40 -right-40 w-80 h-80 opacity-20" />
        <div className="absolute bg-gray-100 rounded-full -bottom-40 -left-40 w-80 h-80 opacity-20" />
      </div>

      <div className="relative px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-12 sm:pb-16 mx-auto max-w-7xl">
        <div className="grid items-center gap-10 lg:gap-16 lg:grid-cols-2">
          {/* Left content */}
          <motion.div className="space-y-8" initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-blue-900 rounded-full bg-blue-50"
              variants={slideFromLeft}
            >
              <HeartPulse className="w-4 h-4" aria-hidden="true" />
              AI Healthcare
            </motion.div>

            <motion.div variants={slideFromLeft}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-black">
                Your AI Workforce
                <br />
                <span className="text-blue-900">for Healthcare</span>
              </h1>
              <div className="w-24 h-1 mt-4 bg-blue-600" />
            </motion.div>

            <motion.p className="max-w-lg text-base sm:text-lg leading-relaxed text-gray-700" variants={slideFromLeft}>
              Digital care teammates that engage your patients, extend the capacity of your clinical
              staff, and help you deliver better health outcomes — around the clock.
            </motion.p>

            <motion.div className="divide-y divide-gray-100 border-t border-gray-100" variants={staggerContainer}>
              {heroFeatures.map((f) => (
                <motion.div key={f.label} className="flex items-center gap-3 py-3" variants={fadeInUp}>
                  <div className="flex items-center justify-center flex-shrink-0 w-9 h-9 bg-blue-50 rounded-lg">
                    <f.icon className="w-4.5 h-4.5 text-blue-900" aria-hidden="true" />
                  </div>
                  <span className="font-semibold text-black">{f.label}</span>
                </motion.div>
              ))}
            </motion.div>

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
          </motion.div>

          {/* Right visual */}
          <motion.div className="relative" initial="hidden" animate="visible" variants={slideFromRight}>
            <img
              src={healthcareHeroImg}
              alt="AI healthcare dashboard on a laptop showing patient overview, engagement, and an AI assistant, alongside patient count, compliance, satisfaction, and response-time cards"
              className="w-full h-auto"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*  SECTION 2 — Healthcare Solutions (Voice Receptionist & Data Mgmt)  */
/* ------------------------------------------------------------------ */

const CoreServicesSection = () => (
  <section id="solutions" className="py-20 bg-gray-50">
    <div className="px-6 mx-auto max-w-7xl">
      <motion.div
        className="mb-16 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={slideFromTop}
      >
        <h2 className="mb-4 text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900">Healthcare Solutions</h2>
        <p className="max-w-3xl mx-auto text-base sm:text-lg leading-relaxed text-gray-700">
          AI-powered tools designed specifically for healthcare providers
        </p>
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Voice Receptionist */}
        <motion.div
          className="p-6 sm:p-10 bg-white border border-gray-200 rounded-3xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={slideFromLeft}
        >
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-blue-50 rounded-2xl">
              <Stethoscope className="w-10 h-10 text-blue-900" aria-hidden="true" />
            </div>
            <h3 className="mb-4 text-2xl font-bold text-blue-900">Voice Receptionist</h3>
            <p className="leading-relaxed text-gray-700">
              AI-powered voice assistance that handles patient calls, appointments, and inquiries with
              professional healthcare expertise.
            </p>
          </div>

          <div className="space-y-4">
            {[
              { icon: Clock, title: '24/7 Availability', desc: 'Round-the-clock patient support' },
              { icon: Shield, title: 'Fully Compliant', desc: 'Built to HIPAA, GDPR, and PIPEDA standards' },
              { icon: MessageCircle, title: 'Natural Conversations', desc: 'Human-like patient interactions' },
            ].map((item) => (
              <div key={item.title} className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl">
                <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg">
                  <item.icon className="w-5 h-5 text-blue-900" aria-hidden="true" />
                </div>
                <div>
                  <div className="font-semibold text-blue-900">{item.title}</div>
                  <div className="text-sm text-gray-600">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Data Management */}
        <motion.div
          className="p-6 sm:p-10 bg-white border border-gray-200 rounded-3xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={slideFromRight}
        >
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-blue-50 rounded-2xl">
              <Database className="w-10 h-10 text-blue-900" aria-hidden="true" />
            </div>
            <h3 className="mb-4 text-2xl font-bold text-blue-900">Data Management</h3>
            <p className="leading-relaxed text-gray-700">
              Intelligent data organization and insights that help you understand patients better and
              optimize care delivery.
            </p>
          </div>

          <div className="space-y-4">
            {[
              { icon: BarChart3, title: 'Patient Analytics', desc: 'Real-time health insights' },
              { icon: Target, title: 'Care Coordination', desc: 'Streamlined patient workflows' },
              { icon: CheckCircle2, title: 'Automated Reports', desc: 'Intelligent documentation' },
            ].map((item) => (
              <div key={item.title} className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl">
                <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg">
                  <item.icon className="w-5 h-5 text-blue-900" aria-hidden="true" />
                </div>
                <div>
                  <div className="font-semibold text-blue-900">{item.title}</div>
                  <div className="text-sm text-gray-600">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

/* ------------------------------------------------------------------ */
/*  SECTION 3 — AI Agents for Your Practice                            */
/* ------------------------------------------------------------------ */

const practices = [
  {
    title: 'Urgent Care Providers',
    badge: '24/7 Support',
    badgeIcon: Clock,
    icon: Stethoscope,
    image: urgentCareImg,
    desc: 'Expand patient relationships with targeted programs.',
    points: ['24/7 patient communication', 'Wait time updates', 'Post-visit follow-ups'],
  },
  {
    title: 'Surgical & Procedure Centers',
    badge: 'Procedure Support',
    badgeIcon: Stethoscope,
    icon: Building2,
    image: surgeryCentersImg,
    desc: 'Enhance patient care while optimizing the procedure calendar.',
    points: ['Pre-surgery patient education', 'Automated scheduling', 'Post-op follow-up'],
  },
  {
    title: 'Hospitals & Specialty Practices',
    badge: 'Enterprise Ready',
    badgeIcon: Users,
    icon: Database,
    image: hospitalsImg,
    desc: 'Support value-based care with personalized patient engagement.',
    points: ['Care coordination', 'Patient data insights', 'Multi-department workflows'],
  },
  {
    title: 'Primary Care Clinics',
    badge: 'Better Outcomes',
    badgeIcon: Heart,
    icon: Users,
    image: primaryCareImg,
    desc: 'Drive consistency and patient follow-through with treatment plans.',
    points: ['Appointment scheduling', 'Medication reminders', 'Ongoing patient engagement'],
  },
];

const PracticeTypesSection = () => (
  <section className="py-20 bg-white">
    <div className="px-6 mx-auto max-w-7xl">
      <motion.div
        className="mb-16 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={slideFromTop}
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 text-xs font-semibold tracking-wide text-blue-900 uppercase bg-blue-50 rounded-full">
          <Users className="w-3.5 h-3.5" aria-hidden="true" />
          Built for Every Care Setting
        </div>
        <h2 className="mb-4 text-4xl font-bold text-blue-900">
          AI Agents for <span className="text-blue-600">Your Practice</span>
        </h2>
        <p className="max-w-3xl mx-auto text-xl leading-relaxed text-gray-700">
          Our digital workers are designed specifically for your practice, with comprehensive programs
          tailored to meet your unique patient needs.
        </p>
      </motion.div>

      <motion.div
        className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        {practices.map((practice) => (
          <motion.div
            key={practice.title}
            className="overflow-hidden transition-shadow duration-300 bg-white border border-gray-200 shadow-sm rounded-2xl hover:shadow-lg"
            variants={slideFromBottom}
          >
            <div className="relative">
              <img src={practice.image} alt={practice.title} className="object-cover w-full h-40" />
              <span className="absolute inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-blue-900 bg-white/95 rounded-full shadow-sm top-3 left-3">
                <practice.badgeIcon className="w-3 h-3" aria-hidden="true" />
                {practice.badge}
              </span>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-center w-11 h-11 mb-4 bg-blue-50 rounded-xl">
                <practice.icon className="w-5 h-5 text-blue-900" aria-hidden="true" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-blue-900">{practice.title}</h3>
              <p className="mb-4 text-sm leading-relaxed text-gray-600">{practice.desc}</p>

              <ul className="mb-5 space-y-2">
                {practice.points.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" aria-hidden="true" />
                    {p}
                  </li>
                ))}
              </ul>

              <HashLink
                to="/pilot"
                className="inline-flex items-center gap-1 text-sm font-semibold text-blue-900 hover:text-blue-700"
              >
                Learn More
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </HashLink>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

/* ------------------------------------------------------------------ */
/*  SECTION 4 — How We Help Scale Your Practice                        */
/* ------------------------------------------------------------------ */

const benefits = [
  { icon: RefreshCw, title: 'Enhance patient outcomes', desc: 'Better care through proactive engagement' },
  { icon: Handshake, title: 'Strengthen patient relationships', desc: 'More meaningful, consistent communication' },
  { icon: DollarSign, title: 'Accelerate revenue', desc: 'Capture more opportunities for growth' },
  { icon: BarChart3, title: 'Increase efficiency and reduce costs', desc: 'Do more with less effort' },
  { icon: Users, title: 'Empower your human workforce', desc: 'Let your team focus on what matters most' },
];

const deliveryPoints = [
  { icon: Bot, title: 'Role-specific AI agents', desc: 'Built for real healthcare workflows' },
  { icon: Zap, title: 'Autonomous task execution and results', desc: 'From scheduling to follow-ups' },
  { icon: Users, title: 'AI co-pilot to superpower your humans', desc: 'Augment, not replace' },
  { icon: Database, title: 'Seamless integration with your existing systems', desc: 'EHR/EMR, CRM, and more' },
  { icon: RefreshCw, title: 'Self-learning and continuous improvement', desc: 'Gets smarter over time' },
];

const BenefitsSection = () => (
  <section className="py-14 sm:py-20 bg-slate-50/60 relative overflow-hidden border-t border-slate-100">
    {/* Subtle Background Pattern */}
    <div className="absolute top-8 left-8 w-48 h-48 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />
    <div className="absolute top-8 right-8 w-48 h-48 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />

    <div className="px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl relative z-10">
      <motion.div
        className="mb-12 sm:mb-14 text-center max-w-3xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={slideFromTop}
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-3 text-xs font-bold tracking-wider text-blue-900 uppercase bg-blue-50 border border-blue-100/80 rounded-full shadow-2xs">
          <BarChart3 className="w-3.5 h-3.5 text-blue-600" aria-hidden="true" />
          Real Impact. Lasting Growth.
        </div>
        <h2 className="mb-3 text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-900 tracking-tight">
          How We Help Scale Your Practice
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-gray-600 max-w-2xl mx-auto">
          AI voice, data management, and analytics tools that enhance your patient interactions and
          streamline your operations
        </p>
      </motion.div>

      <div className="grid gap-6 lg:gap-8 lg:grid-cols-2 items-stretch">
        {/* Card 1: Benefits to You */}
        <motion.div
          className="relative p-6 sm:p-7 xl:p-8 bg-white border border-slate-200/80 rounded-3xl shadow-[0_4px_25px_rgba(0,0,0,0.04)] hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={slideFromLeft}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 h-full">
            {/* Left Content Column */}
            <div className="flex-1 w-full min-w-0 flex flex-col justify-between self-stretch">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex items-center justify-center w-11 h-11 bg-blue-50 border border-blue-100/80 rounded-xl text-blue-900 shrink-0">
                    <Users className="w-5 h-5 text-blue-900" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-blue-900 tracking-tight">Benefits to You</h3>
                </div>
                <p className="mb-4 text-xs sm:text-sm leading-relaxed text-gray-600">
                  We design, customize, and deploy digital workers to transform your practice.
                </p>

                <div className="space-y-2.5 mb-6">
                  {benefits.map((b) => (
                    <div key={b.title} className="flex items-start gap-2.5 group">
                      <div className="flex items-center justify-center flex-shrink-0 w-7 h-7 bg-blue-50 border border-blue-100/80 rounded-lg text-blue-900 mt-0.5 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <b.icon className="w-3.5 h-3.5" aria-hidden="true" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-xs sm:text-sm text-slate-900 leading-snug">{b.title}</div>
                        <div className="text-[11px] sm:text-xs text-gray-500 leading-tight mt-0.5">{b.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-1">
                <HashLink
                  to="/pilot"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded-xl shadow-xs transition-all w-fit cursor-pointer hover:gap-2.5"
                >
                  <span>See the Impact</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </HashLink>
              </div>
            </div>

            {/* Right Image Column: Framed Showcase Container */}
            <div className="w-full sm:w-[48%] lg:w-[48%] shrink-0 flex items-center justify-center self-stretch">
              <div className="relative w-full h-full min-h-[260px] sm:min-h-[300px] lg:min-h-[320px] flex items-center justify-center p-3 sm:p-5 rounded-2xl bg-gradient-to-br from-blue-50/70 via-indigo-50/30 to-slate-50/50 border border-blue-100/70 shadow-inner group overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-200/40 rounded-full blur-2xl pointer-events-none group-hover:bg-blue-300/50 transition-all duration-500" />
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-indigo-200/30 rounded-full blur-2xl pointer-events-none group-hover:bg-indigo-300/40 transition-all duration-500" />
                <img
                  src={benefitsToYouImg}
                  alt="Better Outcomes — a rising trend line over growth bars"
                  className="relative z-10 w-full h-auto max-h-[290px] sm:max-h-[330px] lg:max-h-[320px] xl:max-h-[360px] object-contain drop-shadow-xl transform group-hover:scale-105 transition-transform duration-500 mx-auto"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Card 2: How We Deliver Them */}
        <motion.div
          className="relative p-6 sm:p-7 xl:p-8 bg-white border border-slate-200/80 rounded-3xl shadow-[0_4px_25px_rgba(0,0,0,0.04)] hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={slideFromRight}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 h-full">
            {/* Left Content Column */}
            <div className="flex-1 w-full min-w-0 flex flex-col justify-between self-stretch">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex items-center justify-center w-11 h-11 bg-blue-50 border border-blue-100/80 rounded-xl text-blue-900 shrink-0">
                    <Settings className="w-5 h-5 text-blue-900" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-blue-900 tracking-tight">How We Deliver Them</h3>
                </div>
                <p className="mb-4 text-xs sm:text-sm leading-relaxed text-gray-600">
                  Machine learning, natural language processing, and scalable automation.
                </p>

                <div className="space-y-2.5 mb-6">
                  {deliveryPoints.map((d) => (
                    <div key={d.title} className="flex items-start gap-2.5 group">
                      <div className="flex items-center justify-center flex-shrink-0 w-7 h-7 bg-blue-50 border border-blue-100/80 rounded-lg text-blue-900 mt-0.5 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <d.icon className="w-3.5 h-3.5" aria-hidden="true" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-xs sm:text-sm text-slate-900 leading-snug">{d.title}</div>
                        <div className="text-[11px] sm:text-xs text-gray-500 leading-tight mt-0.5">{d.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-1">
                <HashLink
                  to="/pilot"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded-xl shadow-xs transition-all w-fit cursor-pointer hover:gap-2.5"
                >
                  <span>Learn How It Works</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </HashLink>
              </div>
            </div>

            {/* Right Image Column: Framed Showcase Container */}
            <div className="w-full sm:w-[48%] lg:w-[48%] shrink-0 flex items-center justify-center self-stretch">
              <div className="relative w-full h-full min-h-[260px] sm:min-h-[300px] lg:min-h-[320px] flex items-center justify-center p-3 sm:p-5 rounded-2xl bg-gradient-to-br from-blue-50/70 via-indigo-50/30 to-slate-50/50 border border-blue-100/70 shadow-inner group overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-200/40 rounded-full blur-2xl pointer-events-none group-hover:bg-blue-300/50 transition-all duration-500" />
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-indigo-200/30 rounded-full blur-2xl pointer-events-none group-hover:bg-indigo-300/40 transition-all duration-500" />
                <img
                  src={howWeDeliverThemImg}
                  alt="An AI processor connected to document, security, and database icons"
                  className="relative z-10 w-full h-auto max-h-[290px] sm:max-h-[330px] lg:max-h-[320px] xl:max-h-[360px] object-contain drop-shadow-xl transform group-hover:scale-105 transition-transform duration-500 mx-auto"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

/* ------------------------------------------------------------------ */
/*  SECTION 5 — Getting Started is Easy                                */
/* ------------------------------------------------------------------ */

const steps = [
  {
    number: 1,
    title: 'Define Strategy & Scope',
    icon: Target,
    decoIcon: Target,
    desc: "We work with you to identify specific healthcare challenges the AI agent will solve, and together we establish success metrics that align with your practice's objectives.",
    points: ['Understand your goals and needs', 'Establish success metrics'],
  },
  {
    number: 2,
    title: 'Customize the AI Agent',
    icon: Settings,
    decoIcon: Users,
    desc: "We define the agent's personality and interaction style to align with your practice, and map out healthcare-specific workflows and patient interaction protocols.",
    points: ['Tailor to your workflows', 'Design patient-centric conversations'],
  },
  {
    number: 3,
    title: 'Develop & Train',
    icon: Monitor,
    decoIcon: Database,
    desc: 'We configure fully compliant systems — built to HIPAA, GDPR, and PIPEDA standards — and train the agent on medical terminology and patient care protocols.',
    points: ['Train with medical terminology', 'Validate with real-world scenarios'],
  },
  {
    number: 4,
    title: 'Integrate & Deploy',
    icon: Database,
    decoIcon: Cloud,
    desc: 'We seamlessly embed the AI agent into your existing healthcare systems and run pilot testing to safeguard patient safety and satisfaction before full rollout.',
    points: ['Integrate with EHR/EMR, CRM, and more', 'Conduct pilot testing'],
  },
  {
    number: 5,
    title: 'Optimize & Scale',
    icon: TrendingUp,
    decoIcon: TrendingUp,
    desc: 'We track patient satisfaction and care quality metrics for continuous improvement — your AI agent keeps getting sharper, learning from real patient feedback and care outcomes.',
    points: ['Monitor performance and outcomes', 'Scale across departments and locations'],
  },
];

// Cards where a connecting arrow should render after them (row-mates only —
// not before a card that starts a new row on the 3-col desktop layout).
const ARROW_AFTER = new Set([1, 2, 4]);

const GettingStartedSection = () => (
  <section className="py-20 bg-white">
    <div className="px-6 mx-auto max-w-7xl">
      <motion.div
        className="mb-16 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={slideFromTop}
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 text-xs font-semibold tracking-wide text-blue-900 uppercase bg-blue-50 rounded-full">
          <Settings className="w-3.5 h-3.5" aria-hidden="true" />
          Simple. Secure. Scalable.
        </div>
        <h2 className="mb-4 text-4xl font-bold text-blue-900">
          Getting Started is <span className="text-blue-600">Easy</span>
        </h2>
        <p className="max-w-3xl mx-auto text-xl leading-relaxed text-gray-700">
          Our streamlined process gets your AI workforce up and running quickly with minimal disruption
          to your healthcare operations.
        </p>
      </motion.div>

      <motion.div
        className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        {steps.map((step) => (
          <motion.div key={step.number} className="relative" variants={slideFromBottom}>
            <div className="relative h-full p-6 overflow-hidden bg-white border border-gray-200 rounded-2xl">
              <step.decoIcon
                className="absolute w-24 h-24 -top-4 -right-4 text-blue-50"
                strokeWidth={1.5}
                aria-hidden="true"
              />

              <div className="relative flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 text-sm font-bold text-white bg-blue-500 rounded-full">
                  {step.number}
                </div>
                <div className="flex items-center justify-center flex-shrink-0 w-11 h-11 bg-blue-900 rounded-xl">
                  <step.icon className="w-5 h-5 text-white" aria-hidden="true" />
                </div>
              </div>

              <h3 className="relative mb-2 text-lg font-bold text-blue-900">{step.title}</h3>
              <p className="relative mb-4 text-sm leading-relaxed text-gray-600">{step.desc}</p>

              <div className="relative space-y-2">
                {step.points.map((p) => (
                  <div key={p} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" aria-hidden="true" />
                    {p}
                  </div>
                ))}
              </div>
            </div>

            {ARROW_AFTER.has(step.number) && (
              <ArrowRight
                className="absolute z-10 hidden w-5 h-5 text-blue-300 -translate-y-1/2 lg:block top-1/2 -right-6"
                aria-hidden="true"
              />
            )}
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="mt-12 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={slideFromBottom}
      >
        <HashLink
          to="/pilot"
          className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold text-white transition-colors bg-blue-900 rounded-lg hover:bg-blue-950 group"
        >
          Start Your AI Journey
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </HashLink>
        <p className="mt-4 text-sm text-gray-500">
          From strategy to impact — we're with you every step of the way.
        </p>
      </motion.div>
    </div>
  </section>
);

/* ------------------------------------------------------------------ */
/*  SECTION 6 — Closing CTA                                             */
/* ------------------------------------------------------------------ */

const FinalCTASection = () => (
  <section className="py-20 bg-gray-50">
    <div className="max-w-4xl px-6 mx-auto text-center">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={staggerContainer}>
        <motion.h2 className="mb-6 text-4xl font-bold text-blue-900" variants={slideFromTop}>
          Ready to Transform Patient Care?
        </motion.h2>

        <motion.p className="mb-10 text-xl leading-relaxed text-gray-700" variants={slideFromBottom}>
          Join the healthcare providers already using AI agents to engage patients and scale their
          practice with Teeny Tech Trek.
        </motion.p>

        <motion.div variants={slideFromBottom}>
          <HashLink
            smooth
            to="/book-consultation"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-white transition-colors bg-blue-900 rounded-lg hover:bg-blue-950 group"
          >
            Book a Consultation
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </HashLink>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

/* ------------------------------------------------------------------ */
/*  PAGE                                                                */
/* ------------------------------------------------------------------ */

const Healthcare: React.FC<ChatbotOpenProps> = ({ onOpenChatbot }) => (
  <div className="min-h-screen">
    <HeroSection onOpenChatbot={onOpenChatbot} />
    <CoreServicesSection />
    <PracticeTypesSection />
    <BenefitsSection />
    <GettingStartedSection />
    <FinalCTASection />
  </div>
);

export default Healthcare;
