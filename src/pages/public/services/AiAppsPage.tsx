import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code,
  Phone,
  ArrowRight,
  CheckCircle2,
  Check,
  Zap,
  Play,
  FileText,
  Mail,
  Table,
  RotateCcw,
  Plus,
  Eye,
  ShieldCheck,
  Languages,
  MailCheck,
  Database,
  Clock,
  Users,
  TrendingUp,
  CreditCard,
  MessageSquare,
  AlertCircle,
  Layers,
  Sparkles,
  BarChart3,
  Server,
  MessageCircle,
  Lock,
  ChevronRight
} from 'lucide-react';
import HashLink from '../../../components/ui/SectionLink';

interface AiAppsPageProps {
  onOpenChatbot?: () => void;
}

const AiAppsPage: React.FC<AiAppsPageProps> = ({ onOpenChatbot }) => {
  const navigate = useNavigate();

  // Workflow Interactive State
  const [activeWorkflowIndex, setActiveWorkflowIndex] = useState(0);
  const [actionState, setActionState] = useState<'idle' | 'approved' | 'cancelled'>('idle');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // FAQ Accordion State
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handle4WeekPilotBtn = () => {
    navigate('/pilot');
  };

  const handleWorkflowSelect = (index: number) => {
    setActiveWorkflowIndex(index);
    setActionState('idle');
  };

  const handleApproveAction = () => {
    setActionState('approved');
    showToast('Action approved — changes applied and logged to audit trail.');
  };

  const handleCancelAction = () => {
    setActionState('cancelled');
    showToast('Action cancelled — no changes were executed.');
  };

  // Section 2: Deliverables (What We Deliver)
  const deliverables = [
    {
      image: '/images/services/lightweight-apps/clean-dashboard.webp',
      badge: 'Interface',
      title: 'Clean Dashboard',
      desc: 'Clean dashboard with auth, roles, and comprehensive audit logs.'
    },
    {
      image: '/images/services/lightweight-apps/core-actions.webp',
      badge: 'Actions',
      title: 'Core Actions',
      desc: 'The 2–3 things staff must do in one click with bulk operations.'
    },
    {
      image: '/images/services/lightweight-apps/content-operation.webp',
      badge: 'Processing',
      title: 'Content Operations',
      desc: 'Doc prep pipelines, auto-tagging, and status state management.'
    },
    {
      image: '/images/services/lightweight-apps/billing-and-usage.webp',
      badge: 'Optional',
      title: 'Billing System',
      desc: 'Stripe for paid tiers with feature flags and usage limits — including Canadian tax handling (GST/HST/PST) where needed.'
    }
  ];

  // Section 3: Built for Canadian Teams (Canadian Market Extension)
  const canadianFeatures = [
    {
      icon: ShieldCheck,
      title: 'PIPEDA-aware by default',
      desc: 'Canadian federal privacy requirements built into how we handle your data and your users’ data.',
      badge: 'Privacy'
    },
    {
      icon: Languages,
      title: 'Quebec Law 25 & Bill 96 ready',
      desc: 'Consent management and bilingual EN/FR interfaces available where your business needs them, not just where it’s convenient.',
      badge: 'Bilingual & Consent'
    },
    {
      icon: MailCheck,
      title: 'CASL-aware email workflows',
      desc: 'If your app sends commercial email (like the “Draft a personalized email” example below), consent and unsubscribe handling are built to Canada’s Anti-Spam Legislation from the start.',
      badge: 'Anti-Spam'
    },
    {
      icon: Database,
      title: 'Data residency options',
      desc: 'Canadian cloud regions available for teams that need data to stay in-country.',
      badge: 'In-Country Cloud'
    }
  ];

  // Section 4: Try These Workflows
  const workflows = [
    {
      id: 0,
      title: 'Upload three PDFs and extract a 10-point brief',
      hint: 'Click to see app workflow',
      icon: FileText,
      before: {
        items: ['Q3_Report.pdf', 'Customer_Feedback.pdf', 'Notes.pdf'],
        desc: 'Raw PDFs & docs... Unstructured text... Multiple formats...'
      },
      after: {
        points: ['10-point brief extracted', 'Auto-tagged by topic', 'Ready for review'],
        file: 'summary.docx',
        fileSize: '4.2 KB'
      }
    },
    {
      id: 1,
      title: 'Draft a personalized email and log to CRM for review',
      hint: 'Click to see app workflow',
      icon: Mail,
      before: {
        items: ['Sarah Jenkins (VP Ops)', 'Acme Logistics Ltd.', 'Last contact: 45 days ago'],
        desc: 'Unscored lead in CRM... No email drafted... No follow-up set...'
      },
      after: {
        points: ['Personalized email drafted', 'CASL consent verified', 'CRM task logged & follow-up set'],
        file: 'outreach_email.eml',
        fileSize: '2.8 KB'
      }
    },
    {
      id: 2,
      title: 'Approve these five actions and export a CSV',
      hint: 'Click to see app workflow',
      icon: Table,
      before: {
        items: ['Refund #4892 pending', 'Tier upgrade (Enterprise)', '3 invoice approvals queued'],
        desc: '5 action items pending... Manual review needed... No export ready...'
      },
      after: {
        points: ['5 actions approved', 'CSV exported & ready', 'Audit log updated with timestamp'],
        file: 'actions_export.csv',
        fileSize: '8.4 KB'
      }
    }
  ];

  // Section 5: FAQs (Original 3 + 3 Canadian Market entries, Canadian Press spelling)
  const faqItems = [
    {
      q: 'Can this become a product?',
      a: "Yes—start with internal use. When you're ready, we can help you externalize it as a product with multi-tenant support, billing, and user management."
    },
    {
      q: 'Does it support SSO?',
      a: 'Yes, we can integrate SSO/OAuth (Google, Microsoft, or your IdP) as needed.'
    },
    {
      q: 'Will we own it?',
      a: 'Yes—you get the code, repos, infrastructure notes, and a smooth handover, so you have full ownership.'
    },
    {
      q: 'Do you handle Canadian privacy requirements?',
      a: 'Yes — we build with PIPEDA in mind by default, and can incorporate Quebec’s Law 25 requirements (consent management, data protection impact considerations) if your business operates there or handles Quebec residents’ data.'
    },
    {
      q: 'Can this be bilingual — English and French?',
      a: 'Yes. If your team operates in Quebec or serves French-speaking users, we can build the interface bilingually from the start rather than bolting on a translation later. Quebec’s language requirements (Bill 96) can also make this a practical necessity, not just a nice-to-have, depending on your business.'
    },
    {
      q: 'Does billing handle Canadian tax — GST/HST/PST?',
      a: 'If you’re using the Stripe-based billing system, Canadian tax handling by province (GST/HST/PST) can be configured as part of your build — flag it during scoping and we’ll set it up correctly from the start rather than retrofitting it later.'
    }
  ];

  const currentWorkflow = workflows[activeWorkflowIndex];

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Interactive Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-8 right-8 z-50 flex items-center gap-3 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-slate-700/80 text-sm font-medium"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-ping shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* SECTION 1: HERO SECTION (Image 1 Reference)                                */}
      {/* ========================================================================= */}
      <section className="relative pt-28 sm:pt-32 md:pt-36 pb-20 md:pb-28 overflow-hidden bg-white">
        {/* Subtle Ambient Background Lighting */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 right-1/4 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-3xl" />
          <div className="absolute top-1/3 -left-20 w-[420px] h-[420px] bg-indigo-50/50 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            
            {/* Left Column: Hero Text */}
            <div className="lg:col-span-6 space-y-7 text-left">
              
              {/* Category Pill */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/70 text-[#2563eb] text-xs sm:text-sm font-semibold tracking-wide"
              >
                <Code className="w-4 h-4 text-[#2563eb]" />
                <span>Lightweight AI Apps & Micro-SaaS</span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-slate-950 tracking-tight leading-[1.08]"
              >
                Small apps. <br className="hidden sm:inline" />
                <span className="text-[#2563eb]">Real impact.</span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg sm:text-xl text-slate-600 max-w-xl font-normal leading-relaxed"
              >
                Internal tools and micro-SaaS that ship in weeks—with the exact actions your team needs and nothing you don't.
              </motion.p>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="pt-2"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  className="inline-block w-full sm:w-auto"
                >
                  <HashLink
                    smooth
                    to="/book-consultation"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4.5 bg-[#1d4ed8] hover:bg-[#1e40af] text-white text-base sm:text-lg font-bold rounded-2xl shadow-xl shadow-blue-500/20 transition-all duration-200 cursor-pointer text-center"
                  >
                    <Phone className="w-5 h-5 text-white/90 shrink-0" />
                    <span>Start a scoping call</span>
                    <ArrowRight className="w-5 h-5 text-white/90 shrink-0" />
                  </HashLink>
                </motion.div>
              </motion.div>

              {/* 3 Value Pillars at Hero Base */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-6 border-t border-slate-100"
              >
                {/* Pillar 1 */}
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2563eb] shrink-0">
                    <Zap className="w-5 h-5 fill-[#2563eb]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Built in weeks</h4>
                    <p className="text-xs text-slate-500">Not months</p>
                  </div>
                </div>

                {/* Pillar 2 */}
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2563eb] shrink-0">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Purpose-built</h4>
                    <p className="text-xs text-slate-500">For your team</p>
                  </div>
                </div>

                {/* Pillar 3 */}
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2563eb] shrink-0">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Measurable impact</h4>
                    <p className="text-xs text-slate-500">From day one</p>
                  </div>
                </div>
              </motion.div>

            </div>

            {/* Right Column: Hero Graphic (small-app-real-impact.png) */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-6 relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-100/90 bg-white group hover:shadow-3xl transition-shadow duration-500 aspect-[1473/1068]">
                <img
                  src="/images/services/lightweight-apps/small-app-real-impact.webp"
                  alt="Lightweight AI App interface demo with Google Sheets, Slack, and AI Models"
                  className="w-full h-full object-contain block group-hover:scale-[1.01] transition-transform duration-500"
                  loading="eager"
                />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: WHAT WE DELIVER (Image 2 Reference + CHANGE 4)                  */}
      {/* ========================================================================= */}
      <section className="py-24 bg-[#f8faff] border-t border-slate-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100/70 border border-blue-200/60 text-[#2563eb] text-xs font-bold uppercase tracking-wider mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>COMPLETE SOLUTION</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight mb-4">
            What We <span className="text-[#2563eb]">Deliver</span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-16">
            Complete app solution with all essential components
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center">
            {deliverables.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col items-center group"
              >
                {/* Image Container */}
                <div className="w-full h-44 flex items-center justify-center mb-6 overflow-hidden rounded-2xl bg-slate-50/50">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="max-h-40 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Badge */}
                <span className="px-3.5 py-1 rounded-full bg-[#eff6ff] text-[#2563eb] border border-[#dbeafe]/80 text-xs font-semibold mb-3">
                  {item.badge}
                </span>

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>

                {/* Description */}
                <p className="text-slate-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: BUILT FOR CANADIAN TEAMS (CHANGE 3 - New Trust Section)        */}
      {/* ========================================================================= */}
      <section className="py-24 bg-white border-t border-slate-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100/70 border border-blue-200/60 text-[#2563eb] text-xs font-bold uppercase tracking-wider mb-4">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>CANADIAN MARKET READY</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight mb-4">
              Built for <span className="text-[#2563eb]">Canadian Teams</span>
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed">
              The same fast build process, with Canadian data and language requirements handled from day one, not bolted on after.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {canadianFeatures.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#fcfdff] rounded-3xl p-7 border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-13 h-13 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2563eb] mb-5 group-hover:scale-110 group-hover:bg-[#1d4ed8] group-hover:text-white transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[11px] font-semibold tracking-wide uppercase mb-3">
                      {feat.badge}
                    </span>
                    <h3 className="text-xl font-bold text-slate-950 mb-2.5 leading-snug">
                      {feat.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Compliance Reassurance Notice */}
          <div className="mt-12 p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/70 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-3">
              <Lock className="w-4 h-4 text-[#2563eb] shrink-0" />
              <span>
                Privacy and language compliance frameworks (PIPEDA, Law 25, CASL, Bill 96) are implemented based on your operational scope and configured directly into the architecture.
              </span>
            </div>
            <HashLink
              smooth
              to="/book-consultation"
              className="text-[#2563eb] font-bold hover:underline whitespace-nowrap"
            >
              Discuss requirements →
            </HashLink>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: TRY THESE WORKFLOWS + PREVIEW ACTIONS (Image 3 Reference)      */}
      {/* ========================================================================= */}
      <section className="py-24 bg-[#f8faff] border-t border-slate-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-start">
            
            {/* Left Column: Try These Workflows */}
            <div className="lg:col-span-6 space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100/70 border border-blue-200/60 text-[#2563eb] text-xs font-bold uppercase tracking-wider mb-3">
                  <Play className="w-3.5 h-3.5 fill-[#2563eb]" />
                  <span>EXPLORE IN ACTION</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
                  Try These <span className="text-[#2563eb]">Workflows</span>
                </h2>
                <p className="text-base sm:text-lg text-slate-600 mt-2 font-normal">
                  Real examples. Real outcomes.
                </p>
              </div>

              {/* 3 Interactive Prompt Buttons */}
              <div className="space-y-4">
                {workflows.map((wf, idx) => {
                  const Icon = wf.icon;
                  const isActive = activeWorkflowIndex === idx;

                  return (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.015 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleWorkflowSelect(idx)}
                      className={`w-full p-5 sm:p-6 rounded-2xl sm:rounded-3xl border transition-all duration-300 flex items-center justify-between gap-4 text-left cursor-pointer shadow-xs ${
                        isActive
                          ? 'bg-[#1d4ed8] border-[#1d4ed8] text-white shadow-lg shadow-blue-600/20'
                          : 'bg-white border-slate-200/90 text-slate-900 hover:border-blue-300 hover:bg-blue-50/40'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-colors ${
                            isActive ? 'bg-white/20 text-white' : 'bg-blue-50 text-[#2563eb]'
                          }`}
                        >
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <p
                            className={`font-semibold text-base sm:text-lg leading-snug ${
                              isActive ? 'text-white' : 'text-slate-900'
                            }`}
                          >
                            "{wf.title}"
                          </p>
                          <p
                            className={`text-xs mt-1 font-medium ${
                              isActive ? 'text-blue-100' : 'text-slate-500'
                            }`}
                          >
                            {wf.hint}
                          </p>
                        </div>
                      </div>

                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                          isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        <ChevronRight className="w-5 h-5" />
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Preview Actions Window */}
            <div className="lg:col-span-6 space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100/70 border border-blue-200/60 text-[#2563eb] text-xs font-bold uppercase tracking-wider mb-3">
                  <Eye className="w-3.5 h-3.5" />
                  <span>SEE THE DIFFERENCE</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
                  Preview <span className="text-[#2563eb]">Actions</span>
                </h2>
                <p className="text-base sm:text-lg text-slate-600 mt-2 font-normal">
                  Review before executing
                </p>
              </div>

              {/* Action Preview Window Mockup */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden">
                {/* Browser Top Window Bar */}
                <div className="px-6 py-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-400 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#2563eb] text-xs font-semibold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>AI Assistant</span>
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-6">
                  {/* Action Preview Header */}
                  <div className="flex items-center gap-3 pb-2 border-b border-slate-100">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563eb] flex items-center justify-center">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-950 text-base sm:text-lg">Action Preview</h4>
                      <p className="text-xs text-slate-500">Review the changes before executing.</p>
                    </div>
                  </div>

                  {/* Before & After Comparison Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Before Card */}
                    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                      <h5 className="font-bold text-xs uppercase tracking-wider text-slate-500">Before</h5>
                      <div className="space-y-2">
                        {currentWorkflow.before.items.map((item, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs font-medium text-slate-700 bg-white p-2 rounded-lg border border-slate-200/60">
                            <span className="text-red-500">📄</span>
                            <span className="truncate">{item}</span>
                          </div>
                        ))}
                      </div>
                      <p className="text-[11px] text-slate-400 italic pt-1">
                        {currentWorkflow.before.desc}
                      </p>
                    </div>

                    {/* After Card */}
                    <div className="p-5 rounded-2xl bg-[#eff6ff] border border-[#bfdbfe] space-y-3">
                      <h5 className="font-bold text-xs uppercase tracking-wider text-[#1d4ed8]">After</h5>
                      <div className="space-y-2">
                        {currentWorkflow.after.points.map((pt, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs font-medium text-slate-900">
                            <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                              <Check className="w-3 h-3" />
                            </div>
                            <span>{pt}</span>
                          </div>
                        ))}
                      </div>
                      
                      {/* File Output Pill */}
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-[#bfdbfe] text-xs font-semibold text-slate-800 mt-2">
                        <div className="flex items-center gap-2 truncate">
                          <FileText className="w-4 h-4 text-[#2563eb]" />
                          <span className="truncate">{currentWorkflow.after.file}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                          <span>{currentWorkflow.after.fileSize}</span>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions Buttons / Live Feedback */}
                  {actionState === 'idle' ? (
                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={handleApproveAction}
                        className="flex-1 py-3.5 px-6 bg-[#1d4ed8] hover:bg-[#1e40af] text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-md shadow-blue-500/10 cursor-pointer transition-colors"
                      >
                        <Check className="w-4 h-4" />
                        <span>Approve Action</span>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={handleCancelAction}
                        className="py-3.5 px-6 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm rounded-xl cursor-pointer transition-colors"
                      >
                        <span>Cancel</span>
                      </motion.button>
                    </div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 rounded-2xl flex items-center justify-between gap-4 border ${
                        actionState === 'approved'
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                          : 'bg-slate-100 border-slate-200 text-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {actionState === 'approved' ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-slate-500 shrink-0" />
                        )}
                        <span className="text-sm font-semibold">
                          {actionState === 'approved'
                            ? 'Action approved — changes applied & logged to audit trail.'
                            : 'Action cancelled — no changes were made.'}
                        </span>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setActionState('idle')}
                        className="px-3.5 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-xs font-bold hover:bg-slate-50 flex items-center gap-1 cursor-pointer shrink-0"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Reset</span>
                      </motion.button>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: KPIS WE TRACK + FAQS (Image 4 Reference + Signature Accordion)  */}
      {/* ========================================================================= */}
      <section className="py-24 bg-white border-t border-slate-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-start">
            
            {/* Left Column: KPIs We Track */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100/70 border border-blue-200/60 text-[#2563eb] text-xs font-bold uppercase tracking-wider mb-3">
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>MEASURE WHAT MATTERS</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
                  KPIs We <span className="text-[#2563eb]">Track</span>
                </h2>
                <p className="text-base sm:text-lg text-slate-600 mt-2 font-normal">
                  Clear metrics to show real impact
                </p>
              </div>

              {/* High-res Graphic Card for KPIs */}
              <div className="rounded-3xl overflow-hidden border border-slate-200/80 shadow-lg bg-white group hover:shadow-xl transition-shadow duration-300 aspect-[1617/972]">
                <img
                  src="/images/services/lightweight-apps/kpi-we-use.webp"
                  alt="KPIs We Track: Task completion time -40%, Adoption % 85%, Weekly active users 240+, Error rate <1%"
                  className="w-full h-full object-contain block group-hover:scale-[1.01] transition-transform duration-300"
                  loading="lazy"
                />
              </div>

              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200/70 flex items-center justify-between text-xs text-blue-900 font-semibold">
                <span className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[#2563eb]" />
                  Telemetry dashboards provided on day one with full ownership.
                </span>
              </div>
            </div>

            {/* Right Column: Frequently Asked Questions */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100/70 border border-blue-200/60 text-[#2563eb] text-xs font-bold uppercase tracking-wider mb-3">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>ANSWERS YOU NEED</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
                  Frequently Asked <span className="text-[#2563eb]">Questions</span>
                </h2>
                <p className="text-base sm:text-lg text-slate-600 mt-2 font-normal">
                  Quick answers to common questions
                </p>
              </div>

              {/* Signature Website Accordion with Rotating + */}
              <div className="border-t border-b border-slate-200 divide-y divide-slate-200">
                {faqItems.map((item, idx) => {
                  const isOpen = activeFaq === idx;

                  return (
                    <div key={idx} className="transition-colors">
                      <button
                        onClick={() => setActiveFaq(isOpen ? null : idx)}
                        aria-expanded={isOpen}
                        className="w-full py-5 sm:py-6 flex items-center justify-between text-left gap-4 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg cursor-pointer"
                      >
                        <span
                          className={`text-base sm:text-lg font-bold transition-colors duration-200 ${
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
                          <Plus className="w-4 h-4 transition-transform duration-300" />
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
                            <div className="pb-5 pr-4 sm:pr-10 text-slate-600 text-sm leading-relaxed">
                              {item.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Support Banner matching Image 4 */}
              <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/60 border border-blue-200/70 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-sm font-semibold text-slate-800">
                  <MessageCircle className="w-5 h-5 text-[#2563eb] shrink-0" />
                  <span>Have another question? Let's talk.</span>
                </div>
                <HashLink
                  smooth
                  to="/book-consultation"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-[#1d4ed8] hover:text-[#1e40af] hover:underline"
                >
                  <span>Book a call</span>
                  <ArrowRight className="w-4 h-4" />
                </HashLink>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6: PROTOTYPE AN APP IN 4-6 WEEKS (Image 5 Reference + Final CTA)   */}
      {/* ========================================================================= */}
      <section className="relative py-20 sm:py-28 overflow-hidden bg-[#f8faff] border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          
          {/* High-res Complete Section Graphic with Interactive Clickable Hotspots */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 bg-white group aspect-[1944/809]">
            <img
              src="/images/services/lightweight-apps/prototype.webp"
              alt="Prototype an app in 4-6 weeks with working internal tool or micro-SaaS"
              className="w-full h-full object-contain block"
              loading="lazy"
            />

            {/* Desktop Clickable Hotspots mapped directly over the image buttons */}
            <div className="hidden md:block">
              {/* Primary Button: Prototype an app in 4-6 weeks */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={handle4WeekPilotBtn}
                title="Prototype an app in 4–6 weeks"
                className="absolute top-[59.1%] left-[28.3%] w-[31.6%] h-[10.0%] rounded-xl sm:rounded-2xl transition-all duration-150 cursor-pointer hover:bg-white/10"
                aria-label="Prototype an app in 4–6 weeks"
              />

              {/* Secondary Button: Book a scoping call */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                className="absolute top-[59.1%] left-[60.4%] w-[11.2%] h-[9.9%]"
              >
                <HashLink
                  smooth
                  to="/book-consultation"
                  title="Book a scoping call"
                  className="w-full h-full block rounded-xl sm:rounded-2xl transition-all duration-150 cursor-pointer hover:bg-blue-500/10"
                  aria-label="Book a scoping call"
                />
              </motion.div>
            </div>

            {/* Mobile Fallback Buttons for smaller mobile devices */}
            <div className="md:hidden p-5 bg-white border-t border-slate-100 flex flex-col gap-3">
              <motion.button
                whileTap={{ scale: 0.96 }}
                type="button"
                onClick={handle4WeekPilotBtn}
                className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 text-base font-bold text-white bg-[#1d4ed8] hover:bg-[#1e40af] rounded-2xl shadow-lg cursor-pointer"
              >
                <Zap className="w-5 h-5 fill-white" />
                <span>Prototype an app in 4–6 weeks</span>
              </motion.button>
              <HashLink
                smooth
                to="/book-consultation"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 text-base font-bold text-[#1d4ed8] bg-white border-2 border-[#1d4ed8] rounded-2xl hover:bg-blue-50 cursor-pointer"
              >
                <Phone className="w-5 h-5 text-[#1d4ed8]" />
                <span>Book a scoping call</span>
              </HashLink>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

export default AiAppsPage;