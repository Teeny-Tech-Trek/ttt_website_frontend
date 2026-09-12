import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  Shield, 
  Calendar, 
  Play, 
  Plus, 
  ChevronRight, 
  Activity, 
  Mail, 
  AlertTriangle, 
  FileText, 
  Database, 
  Clock, 
  Check, 
  ExternalLink,
  HelpCircle
} from 'lucide-react';
import HashLink from '../../../components/ui/SectionLink';

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

interface ProcessAutomationPageProps {
  onOpenChatbot?: () => void;
}

export default function ProcessAutomationPage({ onOpenChatbot }: ProcessAutomationPageProps) {
  const navigate = useNavigate();
  const [activePromptIndex, setActivePromptIndex] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleOpenChat = () => {
    if (onOpenChatbot) {
      onOpenChatbot();
    } else {
      navigate('/book-consultation');
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Section 3 interactive prompts
  const demoPrompts = [
    {
      id: 0,
      title: "Parse this carrier CSV and flag late shipments",
      hint: "Click to see automation in action",
      icon: FileText
    },
    {
      id: 1,
      title: "Send a friendly update to customers about delays",
      hint: "Click to see automation in action",
      icon: Mail
    },
    {
      id: 2,
      title: "Show me today's exceptions digest",
      hint: "Click to see automation in action",
      icon: Activity
    },
    {
      id: 3,
      title: "Match these invoices against our PO system and flag mismatches",
      hint: "Click to see automation in action",
      icon: Database
    },
    {
      id: 4,
      title: "Alert us if any vendor SLA is at risk this week",
      hint: "Click to see automation in action",
      icon: AlertTriangle
    }
  ];

  // Integrations items (10 tiles)
  const integrations = [
    { 
      name: "Gmail / Outlook", 
      icon: (
        <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
          <path fill="#EA4335" d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z" opacity=".2"/>
          <path fill="#EA4335" d="M4 6l8 5 8-5v12H4V6z"/>
          <path fill="#4285F4" d="M20 6l-8 5-8-5v2l8 5 8-5V6z"/>
        </svg>
      )
    },
    { 
      name: "Slack", 
      icon: (
        <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
          <path fill="#E01E5A" d="M6 15a2 2 0 1 1-2-2h2v2zm1 0a2 2 0 1 1 4 0v5a2 2 0 1 1-4 0v-5z"/>
          <path fill="#36C5F0" d="M9 6a2 2 0 1 1 2 2H9V6zm0 1a2 2 0 1 1 0 4H4a2 2 0 1 1 0-4h5z"/>
          <path fill="#2EB67D" d="M18 9a2 2 0 1 1 2 2h-2V9zm-1 0a2 2 0 1 1-4 0V4a2 2 0 1 1 4 0v5z"/>
          <path fill="#ECB22E" d="M15 18a2 2 0 1 1-2-2h2v2zm0-1a2 2 0 1 1 0-4h5a2 2 0 1 1 0 4h-5z"/>
        </svg>
      )
    },
    { 
      name: "Google Sheets", 
      icon: (
        <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
          <path fill="#0F9D58" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v-2h4v2zm0-4h-4V7h4v2zM7 7h4v2H7V7zm0 4h4v2H7v-2zm0 4h4v2H7v-2zm10 2h-4v-2h4v2z"/>
        </svg>
      )
    },
    { 
      name: "BigQuery", 
      icon: (
        <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.93V18h-2v-1.07c-2.83-.48-5-2.94-5-5.93s2.17-5.45 5-5.93V4h2v1.07c2.83.48 5 2.94 5 5.93s-2.17 5.45-5 5.93z"/>
        </svg>
      )
    },
    { 
      name: "AWS S3", 
      icon: (
        <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
          <path fill="#FF9900" d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/>
        </svg>
      )
    },
    { 
      name: "Webhooks", 
      icon: (
        <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
          <path fill="#E11D48" d="M12 2a4 4 0 0 0-4 4c0 1.61.96 3 2.34 3.65l-2.06 4.12A3.99 3.99 0 0 0 6 13a4 4 0 1 0 3.86 5h4.28A4 4 0 1 0 18 13a3.99 3.99 0 0 0-2.28.77l-2.06-4.12C15.04 9 16 7.61 16 6a4 4 0 0 0-4-4z"/>
        </svg>
      )
    },
    { 
      name: "CSV Portals", 
      icon: (
        <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
          <path fill="#2563EB" d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
        </svg>
      )
    },
    { 
      name: "Custom APIs", 
      icon: (
        <span className="font-mono font-black text-[#2563eb] text-base leading-none tracking-tight">
          &#123; &#125;
        </span>
      )
    },
    { 
      name: "Zapier", 
      icon: (
        <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
          <path fill="#FF4A00" d="M11 2h2v7h7v2h-7v9h-2v-9H4v-2h7V2z"/>
        </svg>
      )
    },
    { 
      name: "And 200+ more", 
      icon: (
        <div className="w-5 h-5 rounded-md bg-[#2563eb] text-white flex items-center justify-center text-xs font-black">
          +
        </div>
      ), 
      isHighlight: true 
    }
  ];

  // FAQ Items (Analyzed & tailored to Smart Process Automation)
  const faqItems = [
    {
      q: "How is Smart Process Automation different from basic Zapier zaps or simple scripts?",
      a: "Basic zaps and simple scripts break silently whenever data formats change or third-party APIs hiccup. Our Smart Process Automation pipelines include pre-flight validation, automatic schema normalization, deduplication (idempotent writes), and human-in-the-loop exception routing. When an anomalous record or missing field is detected, the system safely routes it to your team with full context instead of failing silently or polluting your databases."
    },
    {
      q: "What happens if our input data is messy, unstructured, or formatted inconsistently?",
      a: "Our Smart Ingestors automatically clean and normalize messy inputs before processing. Whether handling multi-format vendor invoices, carrier CSVs with shifting column headers, or unstructured customer email requests, the system parses dates, extracts key fields, standardizes currency values, and validates entries against your master records before triggering downstream actions."
    },
    {
      q: "What’s an “idempotent write,” and why is it essential for reliable automation?",
      a: "In plain English: if a network glitch, webhook retry, or accidental double-click triggers the automation twice on the exact same email, order, or CSV row, it will never create duplicate records or charge someone twice. The engine computes a unique cryptographic fingerprint for every event and safely ignores redundant runs."
    },
    {
      q: "Can we see exactly what an automation did and replay past executions?",
      a: "Yes. Every single run produces an immutable, step-by-step audit log detailing the exact input payload, which business rules were evaluated, any transformations applied, and the final actions taken. You can inspect runs in real time, audit historical operations, and replay any execution with a single click."
    },
    {
      q: "How do approval gates work for sensitive or customer-facing operations?",
      a: "You stay in total control. For internal, low-risk operations (such as syncing spreadsheets or updating status digests), the pipeline runs autonomously. For sensitive actions (like issuing refunds, altering ERP inventory, or sending customer delay notices), the system pauses at an approval gate and pings your designated team members via Slack, Teams, or email with one-click approve/reject actions."
    },
    {
      q: "Do our customers ever see anything unbranded, generic, or robotic?",
      a: "Never. Customer-facing communications utilize strict template locks, verified company domains, and personalized context variables that mirror your exact brand voice. Output guardrails ensure tone consistency and eliminate hallucinated or robotic phrasing."
    },
    {
      q: "Can you connect with our custom internal tools, legacy databases, and ERPs?",
      a: "Yes. In addition to 200+ native SaaS integrations (Slack, Gmail/Outlook, Google Sheets, HubSpot, Salesforce, QuickBooks), we build direct connections to proprietary APIs, legacy SQL/NoSQL databases (PostgreSQL, MySQL, MongoDB, BigQuery), cloud storage (AWS S3), and internal webhook listeners."
    },
    {
      q: "How long does a smart automation project take from discovery to live deployment?",
      a: "Most production automation pipelines go live within 2 to 4 weeks. We start by mapping your highest-friction manual bottlenecks, build a working prototype in staging with test data, validate safety guardrails with your team, and deploy with end-to-end monitoring and documentation."
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8faff] text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-slate-700 text-sm"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* SECTION 1: HERO SECTION                                                   */}
      {/* ========================================================================= */}
      <section className="relative pt-28 sm:pt-36 pb-20 sm:pb-28 overflow-hidden bg-white border-b border-slate-100">
        <div className="absolute top-0 right-0 w-96 sm:w-[500px] h-96 sm:h-[500px] bg-blue-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-1/2 left-0 w-72 sm:w-96 h-72 sm:h-96 bg-indigo-50/50 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            
            {/* Left Hero Content */}
            <motion.div 
              className="lg:col-span-5 space-y-6 sm:space-y-8 text-left"
              initial="initial"
              animate="animate"
              variants={fadeInUp}
            >
              {/* Pill Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#eef4ff] border border-[#dbeafe] text-[#2563eb] text-sm font-semibold shadow-xs">
                <Zap className="w-4 h-4 text-[#2563eb] fill-[#2563eb]" />
                <span>Smart Process Automation</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 tracking-tight leading-[1.12]">
                Kill the busywork.<br />
                <span className="text-[#2563eb]">Keep control.</span>
              </h1>

              {/* Subheadline */}
              <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-xl font-normal">
                Turn emails/CSVs/sheets into clean data, rules, and alerts—so your team handles exceptions, not drudgery.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  href="#demo-section"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-4 text-base font-bold text-white bg-[#1e40af] hover:bg-[#1d4ed8] rounded-xl shadow-md shadow-blue-900/15 hover:shadow-lg transition-all duration-200 group cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-white transition-transform group-hover:scale-110" />
                  <span>See it in action</span>
                </motion.a>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <HashLink
                    smooth
                    to="/book-consultation"
                    className="inline-flex items-center justify-center gap-2.5 px-7 py-4 text-base font-bold text-[#1e40af] bg-white border-2 border-[#1e40af] hover:bg-blue-50/60 rounded-xl transition-all duration-200 cursor-pointer w-full"
                  >
                    <Calendar className="w-4 h-4 text-[#1e40af]" />
                    <span>Book a 45-min call</span>
                  </HashLink>
                </motion.div>
              </div>

              {/* Trust Checkmarks */}
              <div className="flex flex-wrap items-center gap-y-2 gap-x-6 pt-3 text-sm text-slate-700 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2563eb]" />
                  <span>Connects to your tools</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2563eb]" />
                  <span>Runs in the background</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2563eb]" />
                  <span>You stay in control</span>
                </div>
              </div>
            </motion.div>

            {/* Right Hero Diagram (Using newly uploaded kill the busy work.png) */}
            <motion.div 
              className="lg:col-span-7 relative flex justify-center items-center"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            >
              <div className="relative w-full rounded-3xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(37,99,235,0.12)] border border-slate-200/80 bg-white aspect-[1627/967]">
                <img 
                  src="/images/services/smart-process/kill-the-busy-work.webp" 
                  alt="Smart Automation pipeline connecting triggers, process logic, and actions"
                  className="w-full h-full object-contain block"
                  loading="eager"
                />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: PROBLEMS WE SOLVE (3 Challenge Cards)                          */}
      {/* ========================================================================= */}
      <section className="py-24 bg-[#f8faff] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100/70 border border-blue-200/60 text-[#2563eb] text-xs font-bold uppercase tracking-wider mb-4">
            <span>⚠️ THE CHALLENGE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight mb-4">
            Problems We <span className="text-[#2563eb]">Solve</span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-16">
            Common pain points that eat up your team's time
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Card 1: Status Buried in Emails */}
            <motion.div 
              className="bg-white rounded-3xl p-8 sm:p-9 border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col items-center text-center group"
              whileHover={{ y: -6 }}
            >
              <div className="w-full h-44 flex items-center justify-center mb-6">
                <img 
                  src="/images/services/smart-process/status-buried-in-emails.webp" 
                  alt="Status Buried in Emails" 
                  className="max-h-40 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-200/60 text-red-500 text-xs font-semibold mb-4">
                <Mail className="w-3.5 h-3.5" />
                <span>Communication</span>
              </span>
              <h3 className="text-xl font-bold text-slate-900 mb-2.5">
                Status Buried in Emails
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Important updates lost in inbox clutter, making tracking impossible.
              </p>
            </motion.div>

            {/* Card 2: Manual Copy-Paste */}
            <motion.div 
              className="bg-white rounded-3xl p-8 sm:p-9 border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col items-center text-center group"
              whileHover={{ y: -6 }}
            >
              <div className="w-full h-44 flex items-center justify-center mb-6">
                <img 
                  src="/images/services/smart-process/manual-copy-paste.webp" 
                  alt="Manual Copy-Paste" 
                  className="max-h-40 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-200/60 text-red-500 text-xs font-semibold mb-4">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Manual Work</span>
              </span>
              <h3 className="text-xl font-bold text-slate-900 mb-2.5">
                Manual Copy-Paste
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Hours wasted on repetitive data entry into tracking systems.
              </p>
            </motion.div>

            {/* Card 3: Late Exception Alerts */}
            <motion.div 
              className="bg-white rounded-3xl p-8 sm:p-9 border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col items-center text-center group"
              whileHover={{ y: -6 }}
            >
              <div className="w-full h-44 flex items-center justify-center mb-6">
                <img 
                  src="/images/services/smart-process/late-exception-alerts.webp" 
                  alt="Late Exception Alerts" 
                  className="max-h-40 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-200/60 text-red-500 text-xs font-semibold mb-4">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Penalties</span>
              </span>
              <h3 className="text-xl font-bold text-slate-900 mb-2.5">
                Late Exception Alerts
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Missing deadlines due to delayed notifications and SLA penalties.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: TRY THESE AUTOMATIONS + NOTIFICATIONS                          */}
      {/* ========================================================================= */}
      <section id="demo-section" className="py-24 bg-white border-y border-slate-100 relative scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-start">
            
            {/* Left Column: Try These Automations */}
            <div className="lg:col-span-6 space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100/70 border border-blue-200/60 text-[#2563eb] text-xs font-bold uppercase tracking-wider mb-3">
                  <Zap className="w-3.5 h-3.5 fill-[#2563eb]" />
                  <span>SEE IT IN ACTION</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
                  Try These <span className="text-[#2563eb]">Automations</span>
                </h2>
                <p className="text-base sm:text-lg text-slate-600 mt-2 font-normal">
                  Real workflows. Real outcomes. Click to see them in action.
                </p>
              </div>

              {/* Prompt buttons */}
              <div className="space-y-4">
                {demoPrompts.map((prompt, idx) => {
                  const isActive = activePromptIndex === idx;
                  const Icon = prompt.icon;
                  return (
                    <motion.button
                      key={prompt.id}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActivePromptIndex(idx)}
                      className={`w-full p-5 sm:p-6 rounded-2xl text-left transition-all duration-200 flex items-center justify-between gap-4 border cursor-pointer ${
                        isActive 
                          ? 'bg-[#1e40af] text-white border-[#1e40af] shadow-lg shadow-blue-900/20' 
                          : 'bg-white text-slate-800 border-slate-200 hover:border-blue-300 hover:bg-slate-50/70 shadow-xs'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                          isActive ? 'bg-white/20 text-white' : 'bg-blue-50 text-[#2563eb]'
                        }`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <p className={`font-semibold text-base sm:text-lg leading-snug ${
                            isActive ? 'text-white' : 'text-slate-900'
                          }`}>
                            "{prompt.title}"
                          </p>
                          <p className={`text-xs mt-1 font-medium ${
                            isActive ? 'text-blue-100' : 'text-slate-500'
                          }`}>
                            {prompt.hint}
                          </p>
                        </div>
                      </div>

                      <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                        isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                      }`}>
                        <ChevronRight className="w-5 h-5" />
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Smart Notifications Card */}
            <div className="lg:col-span-6 space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100/70 border border-blue-200/60 text-[#2563eb] text-xs font-bold uppercase tracking-wider mb-3">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>STAY AHEAD</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
                  Smart <span className="text-[#2563eb]">Notifications</span>
                </h2>
                <p className="text-base sm:text-lg text-slate-600 mt-2 font-normal">
                  Get the right alerts, at the right time, in the right channel.
                </p>
              </div>

              {/* Dynamic Notification Card Display */}
              {activePromptIndex === 0 ? (
                /* 1:1 image representation for the primary scenario with direct interactive hotspots */
                <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200/90 bg-white group aspect-[1444/1089]">
                  <img 
                    src="/images/services/smart-process/try-these-automations.webp" 
                    alt="Delayed Shipment Alert Notification in #operations"
                    className="w-full h-full object-contain block"
                    loading="lazy"
                  />
                  {/* Clickable interactive hotspots with tactile click animation */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => showToast("Dispatched proactive delay updates to 3 customers via email & SMS.")}
                    title="Click to Notify Customers"
                    className="absolute top-[61.5%] left-[7.5%] w-[33.5%] h-[15%] rounded-xl transition-all duration-150 cursor-pointer hover:bg-white/10"
                    aria-label="Notify Customers"
                  />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => showToast("Alert snoozed for 1 hour. Will re-check carrier API at 3:34 PM.")}
                    title="Click to Snooze 1 hr"
                    className="absolute top-[61.5%] left-[43%] w-[25.5%] h-[15%] rounded-xl transition-all duration-150 cursor-pointer hover:bg-blue-500/10"
                    aria-label="Snooze 1 hr"
                  />
                </div>
              ) : (
                /* Dynamic interactive preview for prompts 1, 2, 3, 4 */
                <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden">
                  <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
                        #
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-sm">operations</span>
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 font-semibold text-[11px] border border-emerald-200/60">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Live
                          </span>
                        </div>
                        <span className="text-xs text-slate-400">Today at 2:34 PM</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
                      <span className="px-2 py-1 bg-slate-100 rounded text-slate-600 font-mono text-[11px]">Slack</span>
                      <span className="px-2 py-1 bg-slate-100 rounded text-slate-600 font-mono text-[11px]">Email</span>
                      <span className="px-2 py-1 bg-slate-100 rounded text-slate-600 font-mono text-[11px]">Teams</span>
                    </div>
                  </div>

                  <div className="p-6 sm:p-7 space-y-6">
                    {activePromptIndex === 1 && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                        <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/80">
                          <div className="flex items-center gap-2 text-blue-900 font-bold text-base mb-1">
                            <Mail className="w-5 h-5 text-blue-600" />
                            <span>Customer Notification Dispatched</span>
                          </div>
                          <p className="text-blue-700 text-xs sm:text-sm">
                            Friendly delay notices sent to 3 accounts with live tracking links.
                          </p>
                        </div>
                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-sm space-y-2">
                          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Preview Template</div>
                          <p className="text-slate-800 italic bg-white p-3 rounded-xl border border-slate-200/60 leading-relaxed text-xs sm:text-sm">
                            "Hi Acme Corp team, we noticed your carrier run #ABC123 is delayed by 2 days due to regional weather. Your revised delivery window is tomorrow by 11:00 AM."
                          </p>
                          <div className="flex items-center gap-3 text-xs text-slate-600 pt-1">
                            <span className="text-emerald-600 font-bold flex items-center gap-1">
                              <Check className="w-3.5 h-3.5" /> 3 / 3 Sent
                            </span>
                            <span>• Channel: SendGrid & WhatsApp</span>
                          </div>
                        </div>
                        <div className="flex gap-3 pt-2">
                          <button onClick={() => showToast("Opened delivery audit log.")} className="px-5 py-2.5 bg-[#2563eb] text-white text-sm font-semibold rounded-xl hover:bg-[#1d4ed8] transition-colors">
                            View Logs
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {activePromptIndex === 2 && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                        <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80">
                          <div className="flex items-center gap-2 text-emerald-900 font-bold text-base mb-1">
                            <Activity className="w-5 h-5 text-emerald-600" />
                            <span>Today’s Operations Exceptions Digest</span>
                          </div>
                          <p className="text-emerald-700 text-xs sm:text-sm">
                            Daily executive summary generated automatically at 2:34 PM
                          </p>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
                            <div className="text-xl font-extrabold text-slate-900">847</div>
                            <div className="text-[11px] text-slate-500 font-medium">Processed</div>
                          </div>
                          <div className="p-3 bg-red-50 rounded-xl border border-red-200/60">
                            <div className="text-xl font-extrabold text-red-600">3</div>
                            <div className="text-[11px] text-red-600 font-medium">Exceptions</div>
                          </div>
                          <div className="p-3 bg-blue-50 rounded-xl border border-blue-200/60">
                            <div className="text-xl font-extrabold text-blue-600">99.6%</div>
                            <div className="text-[11px] text-blue-600 font-medium">SLA Health</div>
                          </div>
                          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200/60">
                            <div className="text-xl font-extrabold text-emerald-600">0</div>
                            <div className="text-[11px] text-emerald-600 font-medium">Lost Cargo</div>
                          </div>
                        </div>
                        <div className="flex gap-3 pt-2">
                          <button onClick={() => showToast("Exported exceptions digest CSV to downloads.")} className="px-5 py-2.5 bg-[#2563eb] text-white text-sm font-semibold rounded-xl hover:bg-[#1d4ed8] transition-colors">
                            Export CSV Digest
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {activePromptIndex === 3 && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                        <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/80">
                          <div className="flex items-center gap-2 text-blue-900 font-bold text-base mb-1">
                            <Database className="w-5 h-5 text-blue-600" />
                            <span>PO & Invoice Reconciliation</span>
                          </div>
                          <p className="text-blue-700 text-xs sm:text-sm">
                            Comparing 12 incoming vendor bills against approved NetSuite Purchase Orders
                          </p>
                        </div>
                        <div className="space-y-2 text-xs sm:text-sm">
                          <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-200">
                            <span className="font-mono font-bold">INV-2024-881 (Apex Packaging)</span>
                            <span className="text-emerald-600 font-bold">✓ 100% Match ($14,200)</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-amber-50 rounded-xl border border-amber-200">
                            <span className="font-mono font-bold">INV-2024-882 (Global Air)</span>
                            <span className="text-amber-700 font-bold">⚠️ Line item qty mismatch (+2 units)</span>
                          </div>
                        </div>
                        <div className="flex gap-3 pt-2">
                          <button onClick={() => showToast("Auto-approved 11 matching invoices into ERP.")} className="px-5 py-2.5 bg-[#2563eb] text-white text-sm font-semibold rounded-xl hover:bg-[#1d4ed8] transition-colors">
                            Approve Matched (11)
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {activePromptIndex === 4 && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                        <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80">
                          <div className="flex items-center gap-2 text-amber-900 font-bold text-base mb-1">
                            <AlertTriangle className="w-5 h-5 text-amber-600" />
                            <span>Vendor SLA Risk Detected</span>
                          </div>
                          <p className="text-amber-700 text-xs sm:text-sm">
                            Apex Logistics turnaround is 4.4 hrs (Threshold: 3.0 hrs)
                          </p>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs sm:text-sm space-y-2">
                          <div className="flex justify-between text-slate-700">
                            <span>Contracted SLA:</span>
                            <span className="font-bold">98.5% 24hr Turnaround</span>
                          </div>
                          <div className="flex justify-between text-slate-700">
                            <span>Current Week Performance:</span>
                            <span className="font-bold text-red-600">92.1% (Penalty threshold triggered)</span>
                          </div>
                        </div>
                        <div className="flex gap-3 pt-2">
                          <button onClick={() => showToast("Escalated SLA claim to carrier.")} className="px-5 py-2.5 bg-[#2563eb] text-white text-sm font-semibold rounded-xl hover:bg-[#1d4ed8] transition-colors">
                            File SLA Claim
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  <div className="px-6 py-4 bg-blue-50/50 border-t border-blue-100/60 flex items-center justify-between text-xs sm:text-sm font-medium text-blue-900">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-[#2563eb]" />
                      <span>Reduce response time, avoid penalties, and keep customers informed.</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#2563eb]" />
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: WHAT WE DELIVER (4 Pillars)                                    */}
      {/* ========================================================================= */}
      <section className="py-24 bg-[#f8faff] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100/70 border border-blue-200/60 text-[#2563eb] text-xs font-bold uppercase tracking-wider mb-4">
            <span>📦 COMPLETE SOLUTION</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight mb-4">
            What We <span className="text-[#2563eb]">Deliver</span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-16">
            Complete automation solution with all components
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            
            {/* Pillar 1: Smart Ingestors */}
            <div className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col items-center text-center group">
              <div className="w-full h-44 flex items-center justify-center mb-6">
                <img 
                  src="/images/services/smart-process/smart-ingestors.webp" 
                  alt="Smart Ingestors" 
                  className="max-h-40 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span className="px-3 py-1 rounded-full bg-[#eff6ff] text-[#2563eb] border border-[#dbeafe]/80 text-xs font-semibold mb-3">
                Input
              </span>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Smart Ingestors</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Email/CSV parser with normalization to consistent data schema.
              </p>
            </div>

            {/* Pillar 2: Rules Engine (Active Blue Border) */}
            <div className="bg-white rounded-3xl p-7 border-2 border-[#2563eb] shadow-xl shadow-blue-500/10 transition-all duration-300 flex flex-col items-center text-center relative group">
              <div className="w-full h-44 flex items-center justify-center mb-6">
                <img 
                  src="/images/services/smart-process/rules-engine.webp" 
                  alt="Rules Engine" 
                  className="max-h-40 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span className="px-3.5 py-1 rounded-full bg-[#eff6ff] text-[#2563eb] border border-[#dbeafe]/80 text-xs font-semibold mb-3 shadow-xs">
                Logic
              </span>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Rules Engine</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Delay/damage/lost detection with your custom business rules.
              </p>
            </div>

            {/* Pillar 3: Smart Notifications */}
            <div className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col items-center text-center group">
              <div className="w-full h-44 flex items-center justify-center mb-6">
                <img 
                  src="/images/services/smart-process/smart-notifications.webp" 
                  alt="Smart Notifications" 
                  className="max-h-40 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span className="px-3 py-1 rounded-full bg-[#eff6ff] text-[#2563eb] border border-[#dbeafe]/80 text-xs font-semibold mb-3">
                Alerts
              </span>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Smart Notifications</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Slack/Email alerts with next-best actions and daily digest summaries.
              </p>
            </div>

            {/* Pillar 4: Customer Updates */}
            <div className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col items-center text-center group">
              <div className="w-full h-44 flex items-center justify-center mb-6">
                <img 
                  src="/images/services/smart-process/customer-updates.webp" 
                  alt="Customer Updates" 
                  className="max-h-40 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span className="px-3 py-1 rounded-full bg-[#eff6ff] text-[#2563eb] border border-[#dbeafe]/80 text-xs font-semibold mb-3">
                Communication
              </span>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Customer Updates</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Friendly, templated status emails with branded customer pages.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: INTEGRATIONS + GUARDRAILS                                      */}
      {/* ========================================================================= */}
      <section className="py-24 bg-white border-b border-slate-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-start">
            
            {/* Left Column: Integrations */}
            <div className="lg:col-span-6 space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100/70 border border-blue-200/60 text-[#2563eb] text-xs font-bold uppercase tracking-wider mb-3">
                  <span>🔗 INTEGRATIONS</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
                  Integrations
                </h2>
                <p className="text-base sm:text-lg text-slate-600 mt-2 font-normal">
                  Connect with your existing tools seamlessly
                </p>
              </div>

              {/* 10 Integration Tiles */}
              <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
                {integrations.map((tool, idx) => (
                  <div
                    key={idx}
                    className={`p-2.5 sm:p-4 rounded-2xl flex items-center justify-between transition-all duration-200 font-bold text-xs sm:text-base ${
                      tool.isHighlight 
                        ? 'bg-[#eff6ff] text-[#2563eb] border border-[#bfdbfe] hover:bg-[#dbeafe] shadow-xs' 
                        : 'bg-white border border-slate-200 text-slate-800 hover:border-blue-300 hover:shadow-xs'
                    }`}
                  >
                    <div className="flex items-center gap-2 sm:gap-3 truncate">
                      <span className="flex items-center justify-center shrink-0">{tool.icon}</span>
                      <span className={`truncate ${tool.isHighlight ? 'text-[#2563eb]' : 'text-slate-800'}`}>{tool.name}</span>
                    </div>
                    <ArrowRight className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 ${tool.isHighlight ? 'text-[#2563eb]' : 'text-slate-400'}`} />
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Guardrails (Using newly uploaded guardrails.png) */}
            <div className="lg:col-span-6 space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100/70 border border-blue-200/60 text-[#2563eb] text-xs font-bold uppercase tracking-wider mb-3">
                  <Shield className="w-3.5 h-3.5" />
                  <span>BUILT FOR TRUST</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
                  Guardrails
                </h2>
                <p className="text-base sm:text-lg text-slate-600 mt-2 font-normal">
                  Built-in safety and reliability features
                </p>
              </div>

              {/* Guardrails Image Card */}
              <div className="rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs bg-white aspect-[1788/880]">
                <img 
                  src="/images/services/smart-process/guardrails.webp" 
                  alt="Replayable runs, Idempotent writes, Immutable logs, Template locks" 
                  className="w-full h-full object-contain block"
                  loading="lazy"
                />
              </div>

              {/* Bottom Enterprise Banner */}
              <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/60 border border-blue-200/70 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-sm font-semibold text-blue-950">
                  <Shield className="w-5 h-5 text-[#2563eb] shrink-0" />
                  <span>Enterprise-ready automation with security, auditability, and control.</span>
                </div>
                <ArrowRight className="w-5 h-5 text-[#2563eb] shrink-0" />
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6: HOW WE WORK / TIMELINE                                         */}
      {/* ========================================================================= */}
      <section className="py-24 bg-[#f8faff] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100/70 border border-blue-200/60 text-[#2563eb] text-xs font-bold uppercase tracking-wider mb-4">
            <Zap className="w-3.5 h-3.5 fill-[#2563eb]" />
            <span>HOW WE WORK</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight mb-4">
            From Busywork to Automated — <span className="text-[#2563eb]">Fast</span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-16">
            A focused path to automating your highest-friction processes first.
          </p>

          <div className="grid md:grid-cols-3 gap-8 text-left">
            
            {/* Step 1 */}
            <div className="bg-white rounded-3xl p-8 sm:p-9 border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-blue-200 transition-all duration-300 relative">
              <div className="text-4xl font-extrabold text-[#2563eb] mb-4">01</div>
              <h3 className="text-2xl font-bold text-slate-950 mb-3">Find the Top 3</h3>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                We look at where your team loses the most time to manual copy-paste and buried status updates, and pick the three processes worth automating first.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-3xl p-8 sm:p-9 border-2 border-[#2563eb] shadow-xl shadow-blue-500/10 transition-all duration-300 relative">
              <div className="text-4xl font-extrabold text-[#2563eb] mb-4">02</div>
              <h3 className="text-2xl font-bold text-slate-950 mb-3">Build & Test</h3>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                We build the ingestion, rules, and alerting for those three processes and test them against real data before anything goes live.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-3xl p-8 sm:p-9 border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-blue-200 transition-all duration-300 relative">
              <div className="text-4xl font-extrabold text-[#2563eb] mb-4">03</div>
              <h3 className="text-2xl font-bold text-slate-950 mb-3">Launch & Monitor</h3>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Automations go live with full audit logs and replay safety — you watch it work, not just take our word for it.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 7: FREQUENTLY ASKED QUESTIONS (Website Default Signature Design)   */}
      {/* ========================================================================= */}
      <section className="relative py-24 bg-gradient-to-b from-slate-50/60 via-white to-slate-50/80 border-t border-slate-100 overflow-hidden">
        {/* Decorative ambient background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.06),transparent_70%)] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-14 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-blue-50 text-blue-700 border border-blue-100 shadow-xs mb-4">
              <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
              <span>Frequently Asked Questions</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight mb-4">
              Frequently Asked <span className="text-[#2563eb]">Questions</span>
            </h2>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
              Plain-English answers about our smart automation architecture, guardrails, integrations, and deployment timeline.
            </p>
          </div>

          {/* Website-styled Accordion with + button rotating to X */}
          <div className="border-t border-b border-slate-200 divide-y divide-slate-200 bg-white/70 backdrop-blur-xs rounded-2xl p-2 sm:p-4 shadow-xs">
            {faqItems.map((item, idx) => {
              const isOpen = activeFaq === idx;

              return (
                <div key={idx} className="transition-colors">
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="w-full py-5 sm:py-6 px-3 sm:px-4 flex items-center justify-between text-left gap-4 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-xl cursor-pointer"
                  >
                    <span
                      className={`text-base sm:text-lg lg:text-xl font-bold transition-colors duration-200 ${
                        isOpen ? 'text-[#1d4ed8]' : 'text-slate-900 group-hover:text-[#1d4ed8]'
                      }`}
                    >
                      {item.q}
                    </span>

                    <span
                      className={`flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full border flex items-center justify-center transition-all duration-300 ${
                        isOpen
                          ? 'border-[#1d4ed8] bg-[#1d4ed8] text-white rotate-45'
                          : 'border-slate-300 text-slate-400 group-hover:border-[#1d4ed8] group-hover:text-[#1d4ed8] bg-white shadow-xs'
                      }`}
                    >
                      <Plus className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300" />
                    </span>
                  </button>

                  {/* Question Answer - animated via framer-motion */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="faq-content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="overflow-hidden"
                      >
                        <div className="pb-5 px-3 sm:px-4 pr-6 sm:pr-12 text-slate-600 text-sm sm:text-base leading-relaxed">
                          {item.a}
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

      {/* ========================================================================= */}
      {/* SECTION 8: FINAL CTA (Image 6 Reference)                                  */}
      {/* ========================================================================= */}
      <section className="relative py-24 sm:py-32 overflow-hidden bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          
          {/* We display the clean cut-busy-work graphic + interactive actions */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 bg-white aspect-[1942/809]">
            <img 
              src="/images/services/smart-process/cut-busy-work.webp" 
              alt="Cut busywork by 20-40%"
              className="w-full h-full object-contain block"
              loading="lazy"
            />

            {/* Desktop Clickable Buttons directly positioned over image buttons with tactile click animation */}
            <div className="hidden md:block">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpenChat}
                title="Automate the top 3 processes"
                className="absolute top-[54.5%] left-[22.8%] w-[28.8%] h-[13.8%] bg-[#1d4ed8] hover:bg-[#1e40af] text-white font-bold text-xs md:text-sm lg:text-base rounded-xl md:rounded-2xl shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-colors"
                aria-label="Automate the top 3 processes"
              >
                <Zap className="w-4 h-4 fill-white shrink-0" />
                <span>Automate the top 3 processes</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </motion.button>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                className="absolute top-[54.5%] left-[52.4%] w-[24.2%] h-[13.8%]"
              >
                <HashLink
                  smooth
                  to="/book-consultation"
                  title="Book a working session"
                  className="w-full h-full bg-white hover:bg-blue-50/80 text-[#1d4ed8] border-2 border-[#1d4ed8] font-bold text-xs md:text-sm lg:text-base rounded-xl md:rounded-2xl shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-colors"
                  aria-label="Book a working session"
                >
                  <Calendar className="w-4 h-4 text-[#1d4ed8] shrink-0" />
                  <span>Book a working session</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </HashLink>
              </motion.div>
            </div>

            {/* Mobile Touch Action Buttons underneath with tactile click animation */}
            <div className="md:hidden py-5 px-4 bg-white/95 border-t border-slate-100 flex flex-col gap-3">
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={handleOpenChat}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-[#1e40af] hover:bg-[#1d4ed8] active:bg-blue-900 rounded-xl shadow-md transition-all duration-200 cursor-pointer"
              >
                <Zap className="w-4 h-4 fill-white" />
                <span>Automate the top 3 processes</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              <motion.div whileTap={{ scale: 0.96 }}>
                <HashLink
                  smooth
                  to="/book-consultation"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-[#1e40af] bg-white border-2 border-[#1e40af] hover:bg-blue-50 active:bg-blue-100 rounded-xl transition-all duration-200 cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-[#1e40af]" />
                  <span>Book a working session</span>
                  <ArrowRight className="w-4 h-4" />
                </HashLink>
              </motion.div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}