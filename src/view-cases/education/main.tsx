import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GraduationCap,
  Users,
  BookOpen,
  ArrowRight,
  Sparkles,
  Brain,
  Globe,
  Award,
  Lightbulb,
  Laptop,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  School,
  Presentation,
  Compass,
  Play,
  FileCheck2,
  BarChart2,
  Lock,
  Target,
  Plus,
  HelpCircle,
} from 'lucide-react';
import HashLink from '../../components/ui/SectionLink';

// Asset Imports from src/Images/education/
import educationHeroImg from '../../Images/education/education.png';
import institutionCollabImg from '../../Images/education/institution collaboration.png';
import aiWorkshopsImg from '../../Images/education/ai workshops.png';
import transferingGloballyImg from '../../Images/education/transfering education globally.png';
import innovationHubImg from '../../Images/education/innovation hub.png';
import skillDevImg from '../../Images/education/skill development.png';

// Framer Motion Animation Variants
const slideFromLeft = {
  hidden: { x: -35, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
};

const slideFromRight = {
  hidden: { x: 35, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
};

const slideFromTop = {
  hidden: { y: -25, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
};

const slideFromBottom = {
  hidden: { y: 25, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

/* ------------------------------------------------------------------ */
/*  SECTION 1 — HERO SECTION (Matches UI Image 3)                     */
/* ------------------------------------------------------------------ */

const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/50 via-white to-white pt-24 sm:pt-28 pb-12 sm:pb-16">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column (UI Image 3 Layout) */}
          <motion.div
            className="lg:col-span-6 space-y-5 sm:space-y-6"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {/* Eyebrow Pill */}
            <motion.div variants={slideFromLeft}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100/70 border border-blue-200 text-blue-900 text-xs sm:text-sm font-bold tracking-wide">
                <GraduationCap className="w-4 h-4 text-blue-600" aria-hidden="true" />
                <span>AI EDUCATION</span>
              </div>
            </motion.div>

            {/* Main Headline with Blue Underline */}
            <motion.div className="space-y-3" variants={slideFromLeft}>
              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-black tracking-tight text-slate-900 leading-[1.12]">
                AI-Powered <br />
                <span className="text-blue-600">Education Solutions</span>
              </h1>
              <div className="w-14 h-1.5 bg-blue-600 rounded-full" />
            </motion.div>

            {/* Subheadline & Body */}
            <motion.div className="space-y-3" variants={slideFromLeft}>
              <p className="text-lg sm:text-xl font-bold text-slate-800 leading-snug">
                Give Every Student a Personal Tutor. Give Every Educator Their Time Back.
              </p>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                <strong className="text-slate-900 font-semibold">Teeny Tech Trek</strong> helps educators
                personalize learning at scale — explaining concepts, generating practice, and recommending
                next steps for every student, automatically. Institutions get real-time visibility into
                engagement and progress. Students get a learning experience that actually adapts to them.
              </p>
            </motion.div>

            {/* Vertical Feature List (Matching UI Image 3) */}
            <motion.div className="space-y-3.5 pt-1" variants={slideFromLeft}>
              <div className="flex items-center gap-3.5 group">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100/80 flex items-center justify-center flex-shrink-0 text-blue-600 shadow-xs group-hover:scale-105 transition-transform">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-base font-bold text-slate-900">Personalized Learning</span>
                  <span className="text-xs sm:text-sm text-slate-500 block">
                    Adapts to each student's pace and level
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3.5 group">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100/80 flex items-center justify-center flex-shrink-0 text-blue-600 shadow-xs group-hover:scale-105 transition-transform">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-base font-bold text-slate-900">Intelligent Tutoring</span>
                  <span className="text-xs sm:text-sm text-slate-500 block">
                    On-demand explanations, any concept, any time
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3.5 group">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100/80 flex items-center justify-center flex-shrink-0 text-blue-600 shadow-xs group-hover:scale-105 transition-transform">
                  <FileCheck2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-base font-bold text-slate-900">Automated Assessments</span>
                  <span className="text-xs sm:text-sm text-slate-500 block">
                    Faster grading, more consistent feedback
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3.5 group">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100/80 flex items-center justify-center flex-shrink-0 text-blue-600 shadow-xs group-hover:scale-105 transition-transform">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-base font-bold text-slate-900">Data-Driven Insights</span>
                  <span className="text-xs sm:text-sm text-slate-500 block">
                    See exactly where each student needs support
                  </span>
                </div>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
              variants={slideFromLeft}
            >
              <HashLink
                to="/pilot"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl bg-blue-600 text-white font-semibold text-base shadow-lg shadow-blue-600/25 hover:bg-blue-700 transition-all group"
              >
                <span>Request a Pilot</span>
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </HashLink>

              <a
                href="#solutions"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-white text-slate-800 font-semibold text-base border border-slate-300 hover:border-blue-600 hover:text-blue-600 transition-colors shadow-xs"
              >
                <Play className="w-4 h-4 mr-2 fill-current text-blue-600" />
                <span>See It in Action</span>
              </a>
            </motion.div>

            {/* Trust Line */}
            <motion.div
              className="pt-1 flex items-center gap-2 text-xs sm:text-sm text-slate-600 font-medium"
              variants={slideFromLeft}
            >
              <ShieldCheck className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <span>Trusted by K-12 schools, colleges, and universities across the US, UK, and Canada.</span>
            </motion.div>
          </motion.div>

          {/* Right Column — Clean Hero Image Presentation (Matching UI Image 3) */}
          <motion.div
            className="lg:col-span-6 relative flex justify-center"
            initial="hidden"
            animate="visible"
            variants={slideFromRight}
          >
            <div className="relative w-full max-w-xl lg:max-w-none">
              <div className="absolute -inset-4 bg-gradient-to-tr from-blue-200/40 to-indigo-100/30 rounded-3xl blur-2xl -z-10" />
              <img
                src={educationHeroImg}
                alt="AI-Powered Education Solutions Dashboard and Student Workspace"
                className="w-full h-auto rounded-3xl shadow-xl border border-slate-200/80 object-contain"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*  SECTION 2 — EDUCATION SOLUTIONS (Matches UI Image 1)              */
/* ------------------------------------------------------------------ */

const EducationSolutionsSection: React.FC = () => {
  return (
    <section id="solutions" className="py-20 lg:py-28 bg-slate-50/70 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={slideFromTop}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Comprehensive Platform</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Comprehensive AI Solutions for <span className="text-blue-600">Modern Education</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Purpose-built tools that strengthen collaboration between institutions and build real,
            practical AI capability — for educators and students alike.
          </p>
        </motion.div>

        {/* 2 Side-by-Side Cards (UI Image 1 Layout) */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10">
          {/* Card 1: Institutional Collaboration */}
          <motion.div
            className="bg-white border border-slate-200/90 rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 shadow-lg shadow-blue-500/5 hover:shadow-xl hover:border-blue-300 transition-all flex flex-col justify-between"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={slideFromLeft}
          >
            <div>
              {/* Header: Icon Squircle + Top-Right Arrow Circle */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/25">
                  <School className="w-7 h-7" />
                </div>
                <HashLink
                  to="/book-consultation"
                  className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors shadow-xs"
                  aria-label="Explore Institutional Collaboration"
                >
                  <ArrowRight className="w-5 h-5" />
                </HashLink>
              </div>

              {/* Title & Description with Right Floating 3D Globe Graphic */}
              <div className="grid sm:grid-cols-12 gap-4 items-center mb-8">
                <div className="sm:col-span-7">
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-3">
                    Institutional Collaboration
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    Connect educational institutions globally through intelligent collaboration platforms
                    that enhance learning and research.
                  </p>
                </div>
                <div className="sm:col-span-5 flex justify-center">
                  <img
                    src={institutionCollabImg}
                    alt="Institutional Collaboration Global Network"
                    className="w-40 sm:w-full max-w-[200px] h-auto object-contain drop-shadow-md"
                  />
                </div>
              </div>

              {/* 3 Horizontal Pill Rows (Light blue background with icons) */}
              <div className="space-y-3.5">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-[#F0F5FF] border border-blue-100/60 hover:bg-blue-100/70 hover:border-blue-300 transition-all cursor-pointer group">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-white text-blue-600 flex items-center justify-center shadow-xs">
                      <Globe className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        Global Network
                      </h4>
                      <p className="text-xs text-slate-500">Connect with institutions worldwide</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform" />
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-[#F0F5FF] border border-blue-100/60 hover:bg-blue-100/70 hover:border-blue-300 transition-all cursor-pointer group">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-white text-blue-600 flex items-center justify-center shadow-xs">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        Faculty Exchange
                      </h4>
                      <p className="text-xs text-slate-500">Facilitate knowledge sharing programs</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform" />
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-[#F0F5FF] border border-blue-100/60 hover:bg-blue-100/70 hover:border-blue-300 transition-all cursor-pointer group">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-white text-blue-600 flex items-center justify-center shadow-xs">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        Resource Sharing
                      </h4>
                      <p className="text-xs text-slate-500">Access shared academic resources</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2: AI Workshops */}
          <motion.div
            className="bg-white border border-slate-200/90 rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 shadow-lg shadow-blue-500/5 hover:shadow-xl hover:border-blue-300 transition-all flex flex-col justify-between"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={slideFromRight}
          >
            <div>
              {/* Header: Icon Squircle + Top-Right Arrow Circle */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/25">
                  <Presentation className="w-7 h-7" />
                </div>
                <HashLink
                  to="/pilot"
                  className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors shadow-xs"
                  aria-label="Explore AI Workshops"
                >
                  <ArrowRight className="w-5 h-5" />
                </HashLink>
              </div>

              {/* Title & Description with Right Floating Graphic */}
              <div className="grid sm:grid-cols-12 gap-4 items-center mb-8">
                <div className="sm:col-span-7">
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-3">
                    AI Workshops
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    Comprehensive training programs that equip educators and students with cutting-edge AI
                    knowledge and practical skills.
                  </p>
                </div>
                <div className="sm:col-span-5 flex justify-center">
                  <img
                    src={aiWorkshopsImg}
                    alt="AI Workshops Skills, Books, Laptop"
                    className="w-44 sm:w-full max-w-[210px] h-auto object-contain drop-shadow-md"
                  />
                </div>
              </div>

              {/* 3 Horizontal Pill Rows (Light blue background with icons) */}
              <div className="space-y-3.5">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-[#F0F5FF] border border-blue-100/60 hover:bg-blue-100/70 hover:border-blue-300 transition-all cursor-pointer group">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-white text-blue-600 flex items-center justify-center shadow-xs">
                      <Brain className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        AI Fundamentals
                      </h4>
                      <p className="text-xs text-slate-500">Comprehensive AI literacy programs</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform" />
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-[#F0F5FF] border border-blue-100/60 hover:bg-blue-100/70 hover:border-blue-300 transition-all cursor-pointer group">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-white text-blue-600 flex items-center justify-center shadow-xs">
                      <Laptop className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        Hands-on Training
                      </h4>
                      <p className="text-xs text-slate-500">Practical AI tool implementation</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform" />
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-[#F0F5FF] border border-blue-100/60 hover:bg-blue-100/70 hover:border-blue-300 transition-all cursor-pointer group">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-white text-blue-600 flex items-center justify-center shadow-xs">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        Certification
                      </h4>
                      <p className="text-xs text-slate-500">Industry-recognized credentials</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*  SECTION 3 — GLOBAL IMPACT (Matches UI Image 2)                    */
/* ------------------------------------------------------------------ */

const GlobalImpactSection: React.FC = () => {
  const [stats, setStats] = useState({ institutions: 0, students: 0, rate: 0 });

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setStats((prev) => ({
          institutions: Math.min(prev.institutions + 2, 100),
          students: Math.min(prev.students + 100, 5000),
          rate: Math.min(prev.rate + 2, 89),
        }));
      }, 30);
      setTimeout(() => clearInterval(interval), 1800);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={slideFromTop}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold uppercase tracking-wider mb-4">
            <BarChart2 className="w-3.5 h-3.5 text-blue-600" />
            <span>GLOBAL IMPACT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Transforming <span className="text-blue-600">Education Globally</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Measurable impact across educational institutions worldwide
          </p>
        </motion.div>

        {/* Top Showcase: Student Photo on Left + 3 Gauges in Center + World Map on Right */}
        <div className="bg-gradient-to-r from-blue-50/40 via-white to-blue-50/50 border border-slate-200/90 rounded-[2.5rem] p-6 sm:p-10 shadow-lg shadow-blue-500/5 mb-12 relative overflow-hidden">
          {/* Subtle background world map dots */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: 'radial-gradient(#3b82f6 1.5px, transparent 1.5px)',
              backgroundSize: '24px 24px',
            }}
          />

          <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left: Student Image */}
            <motion.div
              className="lg:col-span-4 flex justify-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={slideFromLeft}
            >
              <div className="relative max-w-[280px] sm:max-w-[320px] rounded-3xl overflow-hidden shadow-xl border-4 border-white">
                <img
                  src={transferingGloballyImg}
                  alt="Student with headphones writing notes, A Brighter Future Together"
                  className="w-full h-auto object-cover"
                />
              </div>
            </motion.div>

            {/* Center: 3 Circular Gauges */}
            <motion.div
              className="lg:col-span-8 grid sm:grid-cols-3 gap-6 text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainer}
            >
              {/* Stat 1: Partner Institutions */}
              <motion.div className="flex flex-col items-center" variants={slideFromBottom}>
                <div className="relative w-28 h-28 mb-4">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="50" fill="none" stroke="#E2E8F0" strokeWidth="8" />
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      fill="none"
                      stroke="#2563EB"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${(stats.institutions / 100) * 314.16} 314.16`}
                      className="transition-all duration-700 ease-out"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <School className="w-4 h-4 text-blue-600 mb-0.5" />
                    <span className="text-xl sm:text-2xl font-black text-slate-900">
                      {stats.institutions}+
                    </span>
                    <span className="text-[10px] text-slate-500 font-semibold uppercase">Institutions</span>
                  </div>
                </div>
                <h3 className="text-base font-bold text-slate-900">Partner Institutions</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-[180px]">
                  Universities and schools in our network
                </p>
              </motion.div>

              {/* Stat 2: Students Trained */}
              <motion.div className="flex flex-col items-center" variants={slideFromBottom}>
                <div className="relative w-28 h-28 mb-4">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="50" fill="none" stroke="#E2E8F0" strokeWidth="8" />
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${(stats.students / 5000) * 314.16} 314.16`}
                      className="transition-all duration-700 ease-out"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <Users className="w-4 h-4 text-emerald-600 mb-0.5" />
                    <span className="text-xl sm:text-2xl font-black text-slate-900">
                      {stats.students.toLocaleString()}+
                    </span>
                    <span className="text-[10px] text-slate-500 font-semibold uppercase">Students</span>
                  </div>
                </div>
                <h3 className="text-base font-bold text-slate-900">Students Trained</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-[180px]">
                  Learners empowered with AI skills
                </p>
              </motion.div>

              {/* Stat 3: Workshop Success */}
              <motion.div className="flex flex-col items-center" variants={slideFromBottom}>
                <div className="relative w-28 h-28 mb-4">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="50" fill="none" stroke="#E2E8F0" strokeWidth="8" />
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      fill="none"
                      stroke="#8B5CF6"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${(stats.rate / 100) * 314.16} 314.16`}
                      className="transition-all duration-700 ease-out"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <GraduationCap className="w-4 h-4 text-purple-600 mb-0.5" />
                    <span className="text-xl sm:text-2xl font-black text-slate-900">
                      {stats.rate}%
                    </span>
                    <span className="text-[10px] text-slate-500 font-semibold uppercase">Success Rate</span>
                  </div>
                </div>
                <h3 className="text-base font-bold text-slate-900">Workshop Success</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-[180px]">
                  Completion and satisfaction rate
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* 2 Feature Cards: Innovation Hub & Skill Development (Matches UI Image 2) */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Innovation Hub Card */}
          <motion.div
            className="bg-white border border-slate-200/90 rounded-[2.5rem] shadow-lg shadow-blue-500/5 hover:shadow-xl hover:border-blue-300 transition-all overflow-hidden flex flex-col sm:flex-row"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={slideFromLeft}
          >
            <div className="sm:w-1/2 p-7 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                  <Lightbulb className="w-6 h-6" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">Innovation Hub</h3>
                <p className="text-xs text-slate-500 font-medium mb-4">
                  Cutting-edge AI research collaboration
                </p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                  Foster innovation through cross-institutional research projects and AI development
                  initiatives that push the boundaries of educational technology.
                </p>
              </div>

              <HashLink
                to="/book-consultation"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors shadow-xs w-fit group"
              >
                <span>Explore Opportunities</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </HashLink>
            </div>

            <div className="sm:w-1/2 relative min-h-[220px]">
              <img
                src={innovationHubImg}
                alt="Innovation Hub Modern Research Campus"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Skill Development Card */}
          <motion.div
            className="bg-white border border-slate-200/90 rounded-[2.5rem] shadow-lg shadow-blue-500/5 hover:shadow-xl hover:border-blue-300 transition-all overflow-hidden flex flex-col sm:flex-row"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={slideFromRight}
          >
            <div className="sm:w-1/2 p-7 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">Skill Development</h3>
                <p className="text-xs text-slate-500 font-medium mb-4">
                  Comprehensive AI competency building
                </p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                  Develop practical AI skills through hands-on workshops, real-world projects, and
                  industry-standard certification programs.
                </p>
              </div>

              <HashLink
                to="/pilot"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-100 text-emerald-800 text-sm font-semibold hover:bg-emerald-200 transition-colors shadow-xs w-fit group"
              >
                <span>View Programs</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </HashLink>
            </div>

            <div className="sm:w-1/2 relative min-h-[220px]">
              <img
                src={skillDevImg}
                alt="Skill Development Classroom Seminar"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>

        {/* Bottom Benefit Row (Full-width divider bar matching UI Image 2) */}
        <motion.div
          className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs grid grid-cols-2 md:grid-cols-4 gap-4 divide-y md:divide-y-0 md:divide-x divide-slate-100"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <div className="flex items-center gap-3 pt-3 md:pt-0 md:px-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100/70 text-blue-700 flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-slate-900">Stronger</div>
              <div className="text-xs text-slate-500">Global Collaboration</div>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-3 md:pt-0 md:px-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100/70 text-blue-700 flex items-center justify-center flex-shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-slate-900">More</div>
              <div className="text-xs text-slate-500">Learning Opportunities</div>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-3 md:pt-0 md:px-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100/70 text-blue-700 flex items-center justify-center flex-shrink-0">
              <BarChart2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-slate-900">Greater</div>
              <div className="text-xs text-slate-500">Institutional Impact</div>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-3 md:pt-0 md:px-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100/70 text-blue-700 flex items-center justify-center flex-shrink-0">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-slate-900">A More Inclusive</div>
              <div className="text-xs text-slate-500">Education Ecosystem</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*  SECTION 4 — TRUST & COMPLIANCE (Procurement Standards)             */
/* ------------------------------------------------------------------ */

const TrustComplianceSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-24 bg-slate-50/70 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={slideFromTop}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold uppercase tracking-wider mb-4">
            <Lock className="w-3.5 h-3.5 text-blue-600" />
            <span>TRUST & COMPLIANCE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Built for the Standards Education Actually Requires
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Student data deserves more than good intentions.{' '}
            <strong className="text-slate-900 font-semibold">Teeny Tech Trek</strong> is built to
            align with the privacy and safeguarding standards your institution is already accountable
            to.
          </p>
        </motion.div>

        {/* 4 Compliance Cards */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          {/* US FERPA / COPPA */}
          <motion.div
            className="p-7 bg-white border border-slate-200/90 rounded-3xl shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between"
            variants={slideFromBottom}
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 font-bold text-lg">
                🇺🇸
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">US Institutions</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                <strong className="text-slate-800 font-semibold">FERPA-aligned</strong> data
                handling protocols and <strong className="text-slate-800 font-semibold">COPPA-aligned</strong> privacy
                architecture for protecting learners under 13.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs text-blue-600 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>FERPA & COPPA Ready</span>
            </div>
          </motion.div>

          {/* UK GDPR & DfE */}
          <motion.div
            className="p-7 bg-white border border-slate-200/90 rounded-3xl shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between"
            variants={slideFromBottom}
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 font-bold text-lg">
                🇬🇧
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">UK Institutions</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                <strong className="text-slate-800 font-semibold">UK GDPR compliant</strong> with
                safeguarding alignment built around Department for Education (DfE) Keeping Children Safe
                in Education (KCSIE) guidance.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs text-blue-600 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>UK GDPR & DfE Aligned</span>
            </div>
          </motion.div>

          {/* Canada PIPEDA */}
          <motion.div
            className="p-7 bg-white border border-slate-200/90 rounded-3xl shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between"
            variants={slideFromBottom}
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 font-bold text-lg">
                🇨🇦
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Canadian Institutions</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                <strong className="text-slate-800 font-semibold">PIPEDA-aligned</strong>, with strict
                adherence to provincial privacy statutes such as Ontario's FIPPA/MFIPPA for public schools
                and universities.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs text-blue-600 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>PIPEDA & FIPPA Ready</span>
            </div>
          </motion.div>

          {/* Accessibility WCAG */}
          <motion.div
            className="p-7 bg-white border border-slate-200/90 rounded-3xl shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between"
            variants={slideFromBottom}
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Universal Accessibility</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                <strong className="text-slate-800 font-semibold">WCAG 2.1 AA</strong> compliant design
                meeting accessibility standards referenced by ADA (US), Equality Act 2010 (UK), and AODA (Canada).
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs text-blue-600 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>WCAG 2.1 AA Compliant</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*  SECTION 5 — HOW INSTITUTIONS GET STARTED (3-Step Roadmap)         */
/* ------------------------------------------------------------------ */

const GettingStartedSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Pilot',
      desc: 'Run Teeny Tech Trek with one department, course, or cohort — no institution-wide commitment required.',
      highlight: 'Single-course sandbox',
    },
    {
      num: '02',
      title: 'Onboard',
      desc: 'We train your educators and integrate with the LMS you already use (e.g., Canvas, Blackboard, Moodle, Google Classroom).',
      highlight: 'Zero disruption setup',
    },
    {
      num: '03',
      title: 'Scale',
      desc: 'Expand across departments, faculties, or campuses once you’ve seen the results for yourself.',
      highlight: 'Measurable ROI',
    },
  ];

  return (
    <section className="py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={slideFromTop}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold uppercase tracking-wider mb-4">
            <School className="w-3.5 h-3.5 text-blue-600" />
            <span>IMPLEMENTATION ROADMAP</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-4">
            From Pilot to Full Rollout, <span className="text-blue-600">Without the Headache</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            A low-risk, structured implementation designed to fit how education procurement and faculty
            adoption actually work.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              className="relative bg-slate-50 border border-slate-200 rounded-3xl p-8 hover:border-blue-300 hover:shadow-lg transition-all flex flex-col justify-between"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={slideFromBottom}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-4xl font-black text-blue-600/30">{step.num}</span>
                  <span className="px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider shadow-xs">
                    {step.highlight}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*  SECTION 6 — FAQ (Clean Minimal Design Matching Website Theme)      */
/* ------------------------------------------------------------------ */

const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(0);

  const faqs = [
    {
      id: 0,
      question: 'Will this replace teachers or professors?',
      answer:
        'No. Teeny Tech Trek handles repetitive explanation, practice questions, and automated grading work — giving educators more time for the high-value aspects of teaching that need a human: mentorship, classroom discussion, and nuanced judgment calls.',
    },
    {
      id: 1,
      question: 'Does it work with our existing LMS?',
      answer:
        'Yes — it is purpose-built to integrate smoothly with the systems your institution already relies on, including Canvas, Blackboard, Moodle, and Google Classroom via standard LTI and secure API protocols.',
    },
    {
      id: 2,
      question: 'Is student data safe?',
      answer:
        'Yes. Our platform complies strictly with FERPA and COPPA in the United States, UK GDPR with Department for Education (DfE) safeguarding guidelines, and PIPEDA in Canada. Student data is encrypted at rest and in transit, and is never sold, shared, or used to train public models.',
    },
    {
      id: 3,
      question: 'Can we trial it before committing?',
      answer:
        'Yes — most institutions start with a low-risk pilot in a single department, faculty, or course before committing budget for broader campus-wide rollout.',
    },
  ];

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-20 lg:py-24 bg-slate-50/70 border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={slideFromTop}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-blue-50 text-blue-700 border border-blue-100 shadow-xs mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
            <span>Frequently Asked Questions</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked <span className="text-blue-600">Questions</span>
          </h2>

          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Clear, transparent answers about student data privacy, LMS integrations, and pilot rollout.
          </p>
        </motion.div>

        {/* Minimal Divided Accordion */}
        <div className="border border-slate-200 divide-y divide-slate-200 bg-white rounded-2xl shadow-xs px-4 sm:px-8">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div key={faq.id} className="transition-colors">
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full py-5 sm:py-6 flex items-center justify-between text-left gap-4 group cursor-pointer focus-visible:outline-none"
                >
                  <span
                    className={`text-base sm:text-lg font-bold transition-colors duration-200 ${
                      isOpen ? 'text-blue-600' : 'text-slate-900 group-hover:text-blue-600'
                    }`}
                  >
                    {faq.question}
                  </span>

                  <span
                    className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
                      isOpen
                        ? 'border-blue-600 bg-blue-600 text-white rotate-45'
                        : 'border-slate-300 text-slate-400 group-hover:border-blue-500 group-hover:text-blue-600 bg-white shadow-xs'
                    }`}
                  >
                    <Plus className="w-4 h-4 transition-transform duration-300" />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="faq-content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <div className="pb-5 pt-1 pr-6 text-slate-600 text-sm sm:text-base leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*  SECTION 7 — CLOSING CTA (Simple Minimal Light Theme)              */
/* ------------------------------------------------------------------ */

const ClosingCTASection: React.FC = () => {
  return (
    <section className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-4"
            variants={slideFromTop}
          >
            Ready to Bring AI Into Your Classroom —{' '}
            <span className="text-blue-600">the Right Way?</span>
          </motion.h2>

          <motion.p
            className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto mb-8"
            variants={slideFromBottom}
          >
            See how Teeny Tech Trek helps institutions like yours personalize learning, save educator
            time, and build real AI capability — starting with a single pilot.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            variants={slideFromBottom}
          >
            <HashLink
              to="/pilot"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl bg-blue-600 text-white font-semibold text-base hover:bg-blue-700 transition-all shadow-md group"
            >
              <span>Request a Pilot</span>
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </HashLink>

            <HashLink
              to="/book-consultation"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white border border-slate-300 text-slate-800 font-semibold text-base hover:border-blue-600 hover:text-blue-600 transition-all shadow-xs"
            >
              <span>Book Consultation</span>
            </HashLink>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*  MAIN PAGE COMPONENT                                                */
/* ------------------------------------------------------------------ */

const EducationIndex: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <EducationSolutionsSection />
      <GlobalImpactSection />
      <TrustComplianceSection />
      <GettingStartedSection />
      <FAQSection />
      <ClosingCTASection />
    </div>
  );
};

export default EducationIndex;