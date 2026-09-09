import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PhoneCall,
  Headphones,
  Sparkles,
  Clock,
  Globe,
  Zap,
  CheckCircle2,
  ArrowRight,
  Play,
  Hotel,
  Users,
  BarChart3,
  TrendingUp,
  ShieldCheck,
  Lock,
  Plus,
  HelpCircle,
  Smile,
  Star,
  Database,
  Volume2,
  CreditCard,
  FileText,
  Layers,
} from 'lucide-react';
import HashLink from '../../components/ui/SectionLink';

// Asset Imports from src/Images/hospitality/
import yourAiVoiceImg from '../../Images/hospitality/your ai voice reciponist.png';
import smartDataMgmtImg from '../../Images/hospitality/smart data management.png';
import reviewBannerImg from '../../Images/hospitality/review.png';
import guestSatisfactionImg from '../../Images/hospitality/guest satisfaction.png';
import responseTimeImg from '../../Images/hospitality/response time.png';
import efficiencyBoostImg from '../../Images/hospitality/efficiency boost.png';

// Framer Motion Animation Variants
const slideFromLeft = {
  hidden: { x: -30, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.55, ease: 'easeOut' } },
};

const slideFromRight = {
  hidden: { x: 30, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.55, ease: 'easeOut' } },
};

const slideFromTop = {
  hidden: { y: -25, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.55, ease: 'easeOut' } },
};

const slideFromBottom = {
  hidden: { y: 25, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.55, ease: 'easeOut' } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

/* ------------------------------------------------------------------ */
/*  SECTION 1 — HERO SECTION (Matches Reference Design)               */
/* ------------------------------------------------------------------ */

const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/60 via-white to-white pt-24 sm:pt-28 pb-12 sm:pb-16">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-1/4 w-[550px] h-[550px] bg-blue-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute -top-12 left-10 w-[350px] h-[350px] bg-sky-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Content Column */}
          <motion.div
            className="lg:col-span-6 space-y-5 sm:space-y-6"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {/* Eyebrow Pill */}
            <motion.div variants={slideFromLeft}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-900 text-xs sm:text-sm font-bold tracking-wide shadow-2xs">
                <Headphones className="w-4 h-4 text-blue-600" />
                <span className="uppercase">AI Voice Receptionist</span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.div className="space-y-3" variants={slideFromLeft}>
              <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-black tracking-tight text-slate-900 leading-[1.14]">
                Never Miss a <br />
                <span className="text-blue-600">Guest Call</span> Again
              </h1>
              <div className="w-16 h-1.5 bg-blue-600 rounded-full" />
            </motion.div>

            {/* Subheadline & Body */}
            <motion.div className="space-y-3" variants={slideFromLeft}>
              <p className="text-xl sm:text-2xl font-bold text-slate-800 leading-snug">
                Your 24/7 AI Voice Receptionist for Hospitality
              </p>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                Give every guest an instant, natural conversation — any time of day, in their own language.{' '}
                <strong className="text-slate-900 font-semibold">Teeny Tech Trek</strong> answers calls, takes bookings, manages reservations, and handles guest requests like your best front-desk agent, so your team can focus on what actually keeps guests coming back: great in-person service.
              </p>
            </motion.div>

            {/* Stat Strip Cards */}
            <motion.div className="grid grid-cols-3 gap-3 sm:gap-4 pt-2" variants={slideFromLeft}>
              <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-blue-100/90 shadow-xs hover:border-blue-300 transition-colors">
                <div className="flex items-center gap-1.5 text-blue-600 mb-1">
                  <Clock className="w-4 h-4" />
                  <span className="text-lg sm:text-xl font-black text-slate-900">24/7</span>
                </div>
                <div className="text-xs font-semibold text-slate-700">Always Available</div>
                <div className="text-[11px] text-slate-500 hidden sm:block">No hold music, no voicemail</div>
              </div>

              <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-blue-100/90 shadow-xs hover:border-blue-300 transition-colors">
                <div className="flex items-center gap-1.5 text-blue-600 mb-1">
                  <Globe className="w-4 h-4" />
                  <span className="text-lg sm:text-xl font-black text-slate-900">50+</span>
                </div>
                <div className="text-xs font-semibold text-slate-700">Languages</div>
                <div className="text-[11px] text-slate-500 hidden sm:block">Spoken fluently</div>
              </div>

              <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-blue-100/90 shadow-xs hover:border-blue-300 transition-colors">
                <div className="flex items-center gap-1.5 text-blue-600 mb-1">
                  <Zap className="w-4 h-4" />
                  <span className="text-lg sm:text-xl font-black text-slate-900">&lt;24s</span>
                </div>
                <div className="text-xs font-semibold text-slate-700">Response Time</div>
                <div className="text-[11px] text-slate-500 hidden sm:block">Instant pick-up</div>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2" variants={slideFromLeft}>
              <HashLink
                to="/book-consultation"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl bg-blue-600 text-white font-bold text-base hover:bg-blue-700 transition-all shadow-md hover:shadow-lg group"
              >
                <span>Book a Free Demo</span>
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </HashLink>

              <a
                href="#voice-demo"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-white border border-slate-300 text-slate-800 font-semibold text-base hover:border-blue-600 hover:text-blue-600 transition-all shadow-2xs group"
              >
                <Play className="w-4 h-4 mr-2 text-blue-600 fill-blue-600 transition-transform group-hover:scale-110" />
                <span>See It in Action</span>
              </a>
            </motion.div>

            {/* Trust Line */}
            <motion.div variants={slideFromLeft}>
              <p className="text-xs sm:text-sm text-slate-500 italic pt-1">
                Built for independent hotels, boutique resorts, restaurant groups, and multi-property brands across the US, UK, and Canada.
              </p>
            </motion.div>
          </motion.div>

          {/* Right Visual Column (Hero Visual matching reference) */}
          <motion.div
            className="lg:col-span-6 relative"
            initial="hidden"
            animate="visible"
            variants={slideFromRight}
          >
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-blue-100/60 bg-white">
                <img
                  src={yourAiVoiceImg}
                  alt="Your AI Voice Receptionist for Hospitality showing smartphone live demo, room bookings, and guest service"
                  className="w-full h-auto object-cover transform hover:scale-[1.01] transition-transform duration-500"
                />
              </div>

              {/* Floating micro-pill for live presence */}
              <div className="absolute -bottom-3 -left-3 sm:bottom-4 sm:left-4 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-xl shadow-lg border border-slate-100 flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <div className="text-xs">
                  <div className="font-bold text-slate-900">Voice AI Ready</div>
                  <div className="text-slate-500">First-ring response 24/7</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom 4-Pillar Benefit Strip (Matching Reference Image) */}
        <motion.div
          className="mt-16 sm:mt-20 pt-8 border-t border-slate-200/80"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="flex items-center gap-3.5 p-4 rounded-xl bg-slate-50/70 border border-slate-100 shadow-2xs hover:bg-white hover:border-blue-200 transition-all">
              <div className="w-11 h-11 rounded-xl bg-blue-100/80 flex items-center justify-center text-blue-700 flex-shrink-0">
                <Smile className="w-6 h-6" />
              </div>
              <div>
                <div className="text-base font-bold text-slate-900">Higher</div>
                <div className="text-xs sm:text-sm text-slate-600 font-medium">Guest Satisfaction</div>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-4 rounded-xl bg-slate-50/70 border border-slate-100 shadow-2xs hover:bg-white hover:border-blue-200 transition-all">
              <div className="w-11 h-11 rounded-xl bg-blue-100/80 flex items-center justify-center text-blue-700 flex-shrink-0">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <div className="text-base font-bold text-slate-900">Lower</div>
                <div className="text-xs sm:text-sm text-slate-600 font-medium">Operational Costs</div>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-4 rounded-xl bg-slate-50/70 border border-slate-100 shadow-2xs hover:bg-white hover:border-blue-200 transition-all">
              <div className="w-11 h-11 rounded-xl bg-blue-100/80 flex items-center justify-center text-blue-700 flex-shrink-0">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div>
                <div className="text-base font-bold text-slate-900">More</div>
                <div className="text-xs sm:text-sm text-slate-600 font-medium">Direct Bookings</div>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-4 rounded-xl bg-slate-50/70 border border-slate-100 shadow-2xs hover:bg-white hover:border-blue-200 transition-all">
              <div className="w-11 h-11 rounded-xl bg-blue-100/80 flex items-center justify-center text-blue-700 flex-shrink-0">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <div className="text-base font-bold text-slate-900">Stronger</div>
                <div className="text-xs sm:text-sm text-slate-600 font-medium">Guest Loyalty</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*  SECTION 2 & 3 — HOSPITALITY SOLUTIONS & AI VOICE RECEPTIONIST     */
/* ------------------------------------------------------------------ */

const HospitalitySolutionsSection: React.FC = () => {
  return (
    <section id="voice-demo" className="py-20 lg:py-24 bg-slate-50/60 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Intro */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={slideFromTop}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-900 text-xs font-bold tracking-wider uppercase mb-3">
            <Hotel className="w-3.5 h-3.5 text-blue-600" />
            <span>AI Voice Receptionist</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Purpose-Built for Hospitality —{' '}
            <span className="text-blue-600">Not a Generic Chatbot</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            AI tools designed specifically for hotels, resorts, restaurants, and hospitality groups that need to sound like them, not like a call center script.
          </p>
        </motion.div>

        {/* Feature Block: AI Voice Receptionist */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-slate-200/80 shadow-md">
          {/* Left Details */}
          <motion.div
            className="lg:col-span-6 space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={slideFromLeft}
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-2xs">
                <PhoneCall className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">AI Voice Receptionist</h3>
                <p className="text-blue-600 font-semibold text-sm sm:text-base">24/7 Guest Communication</p>
              </div>
            </div>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              A warm, human-sounding voice AI that answers every guest call on the first ring — day or night, weekday or holiday weekend. It handles bookings, reservations, and everyday requests with the professionalism and hospitality expertise your guests expect from your brand, not a robotic phone tree.
            </p>

            {/* What it handles */}
            <div className="space-y-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100/90 flex items-start gap-3.5 hover:bg-blue-50/40 hover:border-blue-200 transition-colors">
                <div className="text-2xl mt-0.5">📅</div>
                <div>
                  <h4 className="text-base font-bold text-slate-900">Room Bookings</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Checks live availability and confirms reservations instantly, without a human ever picking up the phone.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100/90 flex items-start gap-3.5 hover:bg-blue-50/40 hover:border-blue-200 transition-colors">
                <div className="text-2xl mt-0.5">🍽️</div>
                <div>
                  <h4 className="text-base font-bold text-slate-900">Restaurant Reservations</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Books tables, manages covers, and sends automatic reminders that cut down no-shows.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100/90 flex items-start gap-3.5 hover:bg-blue-50/40 hover:border-blue-200 transition-colors">
                <div className="text-2xl mt-0.5">👥</div>
                <div>
                  <h4 className="text-base font-bold text-slate-900">Guest Services</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Answers FAQs (check-in times, parking, Wi-Fi, amenities) and routes anything urgent straight to your team, instantly.
                  </p>
                </div>
              </div>
            </div>

            {/* Live Status Indicators */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                <Clock className="w-3.5 h-3.5 text-blue-600" />
                24/7 Available
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                <Globe className="w-3.5 h-3.5 text-blue-600" />
                50+ Languages
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Voice AI Active
              </span>
            </div>
          </motion.div>

          {/* Right Mockup: Live Conversation & Audio Simulation */}
          <motion.div
            className="lg:col-span-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={slideFromRight}
          >
            <div className="bg-gradient-to-br from-blue-900 via-slate-900 to-blue-950 text-white p-6 sm:p-8 rounded-2xl shadow-xl border border-blue-800/40 relative overflow-hidden">
              {/* Top simulation bar */}
              <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                    <Volume2 className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <div className="font-bold text-sm sm:text-base">Front Desk Live Line</div>
                    <div className="text-xs text-emerald-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block"></span>
                      Active Call • 00:38
                    </div>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-white/10 text-xs text-blue-200 font-mono">
                  50+ Lang Auto-Detect
                </span>
              </div>

              {/* Sample conversation sequence */}
              <div className="space-y-4 text-sm sm:text-base">
                {/* Guest bubble */}
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold flex-shrink-0 text-slate-300">
                    G
                  </div>
                  <div className="bg-slate-800/90 text-slate-200 p-3.5 rounded-2xl rounded-tl-xs border border-white/5 max-w-[85%]">
                    <p className="text-xs text-slate-400 mb-1 font-semibold">Incoming Guest</p>
                    "I'd like to book a room for this weekend."
                  </div>
                </div>

                {/* AI response bubble 1 */}
                <div className="flex items-start gap-3 justify-end">
                  <div className="bg-blue-600 text-white p-3.5 rounded-2xl rounded-tr-xs shadow-md max-w-[85%] text-right">
                    <p className="text-xs text-blue-200 mb-1 font-semibold">Teeny Tech Trek AI</p>
                    "Perfect — I've found a few great options for you. Would you prefer a Deluxe or a Suite?"
                  </div>
                  <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold flex-shrink-0 text-white">
                    AI
                  </div>
                </div>

                {/* AI confirmation bubble */}
                <div className="flex items-start gap-3 justify-end pt-1">
                  <div className="bg-emerald-600/90 text-white p-4 rounded-2xl rounded-tr-xs border border-emerald-400/30 shadow-lg max-w-[90%] text-right">
                    <div className="flex items-center justify-end gap-1.5 text-xs text-emerald-200 font-bold mb-1">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Instant PMS Reservation Confirmed</span>
                    </div>
                    <p className="text-sm leading-relaxed">
                      "✅ Booking Confirmed — Deluxe Room, Mar 22–24. You'll get a confirmation by email shortly. Anything else I can help with?"
                    </p>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center text-xs font-bold flex-shrink-0 text-white">
                    ✓
                  </div>
                </div>
              </div>

              {/* Audio Wave Simulation Bar */}
              <div className="mt-8 pt-5 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-1 h-3 bg-blue-400 rounded-full animate-pulse"></span>
                  <span className="w-1 h-6 bg-blue-300 rounded-full animate-pulse" style={{ animationDelay: '100ms' }}></span>
                  <span className="w-1 h-8 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '200ms' }}></span>
                  <span className="w-1 h-5 bg-blue-300 rounded-full animate-pulse" style={{ animationDelay: '300ms' }}></span>
                  <span className="w-1 h-7 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '400ms' }}></span>
                  <span className="w-1 h-4 bg-blue-300 rounded-full animate-pulse" style={{ animationDelay: '150ms' }}></span>
                </div>
                <span className="text-xs text-blue-200">Natural voice • Zero robotic pause</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*  SECTION 4 — SMART DATA MANAGEMENT (Intelligent Operations)        */
/* ------------------------------------------------------------------ */

const SmartDataManagementSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Graphic showing laptop dashboard & analytics */}
          <motion.div
            className="lg:col-span-6 relative order-2 lg:order-1"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={slideFromLeft}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200/80 bg-slate-50">
              <img
                src={smartDataMgmtImg}
                alt="Smart Data Management guest analytics preview showing occupancy rate 87%, satisfaction 4.8/5, and booking mix"
                className="w-full h-auto object-cover transform hover:scale-[1.01] transition-transform duration-500"
              />
            </div>

            {/* Handwritten style badge callout */}
            <div className="mt-4 text-center sm:text-left">
              <span className="inline-block text-blue-800 font-serif italic text-sm sm:text-base font-semibold bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100">
                "Data today. Happier guests tomorrow."
              </span>
            </div>
          </motion.div>

          {/* Right Column: Copy & Insights */}
          <motion.div
            className="lg:col-span-6 space-y-6 order-1 lg:order-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={slideFromRight}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-900 text-xs font-bold tracking-wider uppercase">
              <Database className="w-3.5 h-3.5 text-blue-600" />
              <span>Intelligent Operations</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              Smart <span className="text-blue-600">Data Management</span>
            </h2>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Every phone call is a data point you’re currently losing. <strong className="text-slate-900 font-semibold">Teeny Tech Trek</strong> turns each guest conversation into structured insight — so you can spot patterns, personalize future stays, and make faster, sharper operating decisions without digging through spreadsheets.
            </p>

            {/* What it delivers */}
            <div className="space-y-4 pt-1">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-4 hover:border-blue-300 transition-all group">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900">Guest Preference Tracking</h4>
                  <p className="text-sm text-slate-600 leading-relaxed mt-0.5">
                    Builds a living profile of each guest across every stay, so returning guests feel remembered, not re-asked.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-4 hover:border-blue-300 transition-all group">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900">Real-Time Analytics Dashboard</h4>
                  <p className="text-sm text-slate-600 leading-relaxed mt-0.5">
                    See bookings, occupancy, and guest sentiment update live, not in next week’s report.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-4 hover:border-blue-300 transition-all group">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900">Automated Reporting</h4>
                  <p className="text-sm text-slate-600 leading-relaxed mt-0.5">
                    Performance summaries land in your inbox on a schedule you set — no manual pulls required.
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Booking Hook Highlight Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">
                  Booking Source Breakdown
                </span>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                  Direct 42% · OTA 28% · Phone 18% · Walk-in 12%
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                <strong className="text-slate-900 font-semibold">More direct bookings mean fewer commissions to Booking.com and Expedia.</strong> Hotels capturing direct voice bookings keep 15–25% more revenue per room without paying high intermediary fees.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <HashLink
                to="/book-consultation"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-blue-600 text-white font-bold text-base hover:bg-blue-700 transition-all shadow-md group"
              >
                <span>See It in Action</span>
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </HashLink>

              <HashLink
                to="/pilot"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-white border border-slate-300 text-slate-800 font-semibold text-base hover:border-blue-600 hover:text-blue-600 transition-all shadow-2xs"
              >
                <span>Request a Pilot</span>
              </HashLink>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*  SECTION 5 — REAL RESULTS (Matches Results Reference Image)        */
/* ------------------------------------------------------------------ */

const RealResultsSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-24 bg-slate-50/70 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={slideFromTop}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-900 text-xs font-bold tracking-wider uppercase mb-3">
            <BarChart3 className="w-3.5 h-3.5 text-blue-600" />
            <span>Real Results</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Transform Your <span className="text-blue-600">Guest Experience</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            See how AI voice assistance and smart data management improve real hospitality operations — not just satisfaction scores, but the way your property runs day to day.
          </p>
        </motion.div>

        {/* 3 Stat Cards Grid (Matching Reference Screenshot) */}
        <div className="grid md:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {/* Card 1: Guest Satisfaction */}
          <motion.div
            className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-lg hover:shadow-xl transition-all flex flex-col justify-between"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={slideFromBottom}
          >
            <div>
              {/* Header Icon + Delta Badge */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                  <Star className="w-6 h-6 fill-blue-600/20 text-blue-600" />
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold flex items-center gap-1">
                  ↑ +28%
                </span>
              </div>

              {/* Big Stat & Title */}
              <div className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mb-2">
                80%
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Guest Satisfaction</h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                Higher guest experience ratings, driven by faster, more consistent service around the clock.
              </p>
            </div>

            {/* Visual Curve Card */}
            <div className="pt-4 border-t border-slate-100">
              <img
                src={guestSatisfactionImg}
                alt="Guest Satisfaction rating curve visual"
                className="w-full h-auto rounded-xl object-contain max-h-36 mx-auto"
              />
              <div className="text-center text-xs text-slate-500 font-medium mt-3">
                Higher guest happiness
              </div>
            </div>
          </motion.div>

          {/* Card 2: Response Time */}
          <motion.div
            className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-lg hover:shadow-xl transition-all flex flex-col justify-between"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={slideFromBottom}
          >
            <div>
              {/* Header Icon + Delta Badge */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                  <Zap className="w-6 h-6 fill-blue-600/20 text-blue-600" />
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold flex items-center gap-1">
                  ↓ 62% faster
                </span>
              </div>

              {/* Big Stat & Title */}
              <div className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mb-2">
                24s
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Response Time</h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                The average time a guest waits for an answer — down sharply since adding AI voice support.
              </p>
            </div>

            {/* Visual Bar Chart */}
            <div className="pt-4 border-t border-slate-100">
              <img
                src={responseTimeImg}
                alt="Response Time bar chart showing 62% faster assistance"
                className="w-full h-auto rounded-xl object-contain max-h-36 mx-auto"
              />
              <div className="text-center text-xs text-slate-500 font-medium mt-3">
                Faster answers, happier guests
              </div>
            </div>
          </motion.div>

          {/* Card 3: Efficiency Boost */}
          <motion.div
            className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-lg hover:shadow-xl transition-all flex flex-col justify-between"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={slideFromBottom}
          >
            <div>
              {/* Header Icon + Delta Badge */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold flex items-center gap-1">
                  ↑ +73%
                </span>
              </div>

              {/* Big Stat & Title */}
              <div className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mb-2">
                73%
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Efficiency Boost</h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                More done with the same team — freeing staff for the high-value, face-to-face guest moments.
              </p>
            </div>

            {/* Visual Efficiency Chart */}
            <div className="pt-4 border-t border-slate-100">
              <img
                src={efficiencyBoostImg}
                alt="Efficiency Boost upward trend line visual"
                className="w-full h-auto rounded-xl object-contain max-h-36 mx-auto"
              />
              <div className="text-center text-xs text-slate-500 font-medium mt-3">
                Do more with less effort
              </div>
            </div>
          </motion.div>
        </div>

        {/* Benefit Row (below the cards, matching reference design) */}
        <motion.div
          className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <div className="grid md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-200">
            <div className="flex items-center gap-4 pt-4 md:pt-0 md:px-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <div className="text-base font-bold text-slate-900">Happier Guests</div>
                <div className="text-sm text-slate-600">Build lasting loyalty</div>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4 md:pt-0 md:px-6">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <div className="text-base font-bold text-slate-900">Smoother Operations</div>
                <div className="text-sm text-slate-600">Reduce manual workload</div>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4 md:pt-0 md:px-6">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <div className="text-base font-bold text-slate-900">Stronger Business</div>
                <div className="text-sm text-slate-600">Drive sustainable growth</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*  SECTION 6 — TESTIMONIAL (Matches Panoramic Banner Reference)      */
/* ------------------------------------------------------------------ */

const TestimonialSection: React.FC = () => {
  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="relative rounded-3xl overflow-hidden shadow-2xl border border-blue-900/20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={slideFromBottom}
        >
          {/* Panoramic Review Asset Image */}
          <img
            src={reviewBannerImg}
            alt="Review by Jennifer Martinez, General Manager at Luxury Resort & Spa: Our AI Voice Receptionist now handles 80% of guest inquiries automatically."
            className="w-full h-auto object-cover"
          />

          {/* Fallback accessible banner container (ensures clean presentation on all viewports) */}
          <div className="sr-only">
            <blockquote>
              "Our AI Voice Receptionist now handles 80% of guest inquiries automatically. Our team can finally focus on what matters most — delivering exceptional, in-person hospitality."
            </blockquote>
            <cite>
              Jennifer Martinez — General Manager, Luxury Resort & Spa (5/5 Stars)
            </cite>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*  SECTION 7 — HOW IT WORKS (Suggested Addition)                     */
/* ------------------------------------------------------------------ */

const HowItWorksSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-24 bg-slate-50/60 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={slideFromTop}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-900 text-xs font-bold tracking-wider uppercase mb-3">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            <span>Fast Setup</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Live in Days, <span className="text-blue-600">Not Months</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            No hardware to buy. No disruption to your existing front-desk operations. Plug directly into your existing setup and start capturing bookings immediately.
          </p>
        </motion.div>

        {/* 3 Step Cards */}
        <motion.div
          className="grid md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          {/* Step 1 */}
          <div className="relative bg-white rounded-2xl p-8 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black text-xl mb-6 shadow-md shadow-blue-500/20">
              1
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">Connect</h3>
            <p className="text-slate-600 leading-relaxed">
              Plug into your existing phone line, front desk, or restaurant reservation system. No new hardware needed.
            </p>
          </div>

          {/* Step 2 */}
          <div className="relative bg-white rounded-2xl p-8 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black text-xl mb-6 shadow-md shadow-blue-500/20">
              2
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">Configure</h3>
            <p className="text-slate-600 leading-relaxed">
              Train your AI receptionist on your brand voice, room types, policies, menus, and FAQs.
            </p>
          </div>

          {/* Step 3 */}
          <div className="relative bg-white rounded-2xl p-8 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black text-xl mb-6 shadow-md shadow-blue-500/20">
              3
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">Go Live</h3>
            <p className="text-slate-600 leading-relaxed">
              Start answering every guest call 24/7, in 50+ languages, from day one.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*  SECTION 8 — INTEGRATIONS (Suggested Addition)                     */
/* ------------------------------------------------------------------ */

const IntegrationsSection: React.FC = () => {
  const integrations = [
    { name: 'Opera PMS', category: 'Property Management' },
    { name: 'Mews', category: 'Cloud PMS' },
    { name: 'Cloudbeds', category: 'Hospitality Management' },
    { name: 'RoomRaccoon', category: 'Hotel Management' },
    { name: 'StayNTouch', category: 'Mobile PMS' },
    { name: 'OpenTable', category: 'Dining Reservations' },
    { name: 'ResDiary', category: 'Table Management' },
    { name: 'SevenRooms', category: 'Guest Experience' },
  ];

  return (
    <section className="py-20 lg:py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={slideFromTop}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-900 text-xs font-bold tracking-wider uppercase mb-3">
            <Layers className="w-3.5 h-3.5 text-blue-600" />
            <span>Hospitality Ecosystem</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Works With the Systems <span className="text-blue-600">You Already Run</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            <strong className="text-slate-900 font-semibold">Teeny Tech Trek</strong> connects to the property management and booking tools your team already uses — no rip-and-replace required.
          </p>
        </motion.div>

        {/* Integrations Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {integrations.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70 hover:bg-white hover:border-blue-400 hover:shadow-md transition-all text-center group"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 mx-auto mb-3 flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform">
                {item.name[0]}
              </div>
              <div className="font-bold text-slate-900 text-base">{item.name}</div>
              <div className="text-xs text-slate-500 mt-0.5">{item.category}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*  SECTION 9 — SECURITY & COMPLIANCE (Suggested Addition)            */
/* ------------------------------------------------------------------ */

const SecurityComplianceSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-24 bg-slate-50/70 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={slideFromTop}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-900 text-xs font-bold tracking-wider uppercase mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>Trust & Compliance</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Enterprise-Grade Security, <br className="hidden sm:block" />
            <span className="text-blue-600">Built for Guest Trust</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Guest data is sensitive — and your guests, and regulators, know it. <strong className="text-slate-900 font-semibold">Teeny Tech Trek</strong> is built with data privacy and payment security as a foundation, not an afterthought.
          </p>
        </motion.div>

        {/* 4 Compliance Pillars */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">GDPR-Aligned</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Strict European & UK privacy standards with comprehensive consent and right-to-be-forgotten controls.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">CCPA Compliant</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Full adherence to US consumer privacy mandates, ensuring complete transparency over guest profiles.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">PIPEDA Aligned</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Canadian personal information protection and electronic documents adherence across all property stays.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <CreditCard className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">PCI-DSS Standards</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Bank-grade tokenization and encryption whenever handling payment card details for room reservations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*  SECTION 10 — FAQ (Suggested Addition, Clean Minimal Accordion)    */
/* ------------------------------------------------------------------ */

const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(0);

  const faqs = [
    {
      id: 0,
      question: 'Will this replace my front desk team?',
      answer:
        'No. Teeny Tech Trek handles routine, repetitive calls — bookings, FAQs, simple requests — so your team can spend more time on the guests and moments that need a human touch.',
    },
    {
      id: 1,
      question: 'What languages does it support?',
      answer:
        '50+ languages, so international guests get answered in their own language, not routed to a translator or put on hold.',
    },
    {
      id: 2,
      question: 'Does it work with my existing phone number and booking system?',
      answer:
        'Yes — it integrates with your current setup. No new hardware, no forwarding headaches.',
    },
    {
      id: 3,
      question: 'Is guest data secure?',
      answer:
        'Yes. Teeny Tech Trek is built with end-to-end encryption, strict access isolation, and adherence to GDPR, CCPA, and PCI-DSS compliance standards.',
    },
    {
      id: 4,
      question: 'How long does it take to get up and running?',
      answer:
        'Most properties are live within days, not months.',
    },
  ];

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-20 lg:py-24 bg-white border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={slideFromTop}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-900 text-xs font-bold tracking-wider uppercase mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
            <span>Frequently Asked Questions</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Questions Hoteliers <span className="text-blue-600">Ask Us First</span>
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Everything you need to know about setup, language support, and front-desk workflows.
          </p>
        </motion.div>

        {/* Accordion list */}
        <div className="border border-slate-200 divide-y divide-slate-200 bg-white rounded-2xl shadow-xs px-6 sm:px-8">
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
/*  SECTION 11 — CLOSING CTA SECTION                                  */
/* ------------------------------------------------------------------ */

const ClosingCTASection: React.FC = () => {
  return (
    <section className="py-20 lg:py-24 bg-gradient-to-b from-white to-blue-50/50 border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.div variants={slideFromTop} className="mb-4">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              Get Started Today
            </span>
          </motion.div>

          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-4"
            variants={slideFromTop}
          >
            Ready for a Front Desk That{' '}
            <span className="text-blue-600">Never Closes?</span>
          </motion.h2>

          <motion.p
            className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto mb-8"
            variants={slideFromBottom}
          >
            See how <strong className="text-slate-900 font-semibold">Teeny Tech Trek</strong> helps properties like yours capture more direct bookings, answer every guest instantly, and give your team room to focus on hospitality — not the phone.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            variants={slideFromBottom}
          >
            <HashLink
              to="/book-consultation"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl bg-blue-600 text-white font-bold text-base hover:bg-blue-700 transition-all shadow-md group"
            >
              <span>Book a Free Demo</span>
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </HashLink>

            <a
              href="#voice-demo"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white border border-slate-300 text-slate-800 font-semibold text-base hover:border-blue-600 hover:text-blue-600 transition-all shadow-2xs group"
            >
              <Play className="w-4 h-4 mr-2 text-blue-600 fill-blue-600 transition-transform group-hover:scale-110" />
              <span>See It in Action</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*  MAIN INDEX COMPONENT FOR /hospitality                             */
/* ------------------------------------------------------------------ */

const HospitalityIndex: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <HospitalitySolutionsSection />
      <SmartDataManagementSection />
      <RealResultsSection />
      <TestimonialSection />
      <HowItWorksSection />
      <IntegrationsSection />
      <SecurityComplianceSection />
      <FAQSection />
      <ClosingCTASection />
    </div>
  );
};

export default HospitalityIndex;