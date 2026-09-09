import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  AlertTriangle,
  ShieldCheck,
  Activity,
  ArrowRight,
  PlayCircle,
  Sparkles,
  Zap,
  Target,
  TrendingDown,
  Users,
  Fingerprint,
  FileCheck2,
  Lock,
} from 'lucide-react';

const AutomationFeaturesSection: React.FC = () => {
  const navigate = useNavigate();
  const [activeEngine, setActiveEngine] = useState(0);

  const handleServicesClick = () => {
    navigate('/#services');
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookingClick = () => {
    navigate('/book-consultation');
  };

  const engines = [
    {
      id: 'kyc',
      name: 'KYC Document Intelligence',
      tagline: 'Verify identities and documents in seconds, not days',
      description:
        'AI that reads, extracts, and cross-validates passports, IDs, and utility bills with 99.94% accuracy and automated fraud tampering detection.',
      icon: FileText,
      badge: 'Identity & KYC',
      stats: '1.2s avg speed',
    },
    {
      id: 'risk',
      name: 'Predictive Risk Engine',
      tagline: 'Score risk in real time, before it becomes exposure',
      description:
        'Machine learning models that predict credit, market, and operational risks before they materialize, protecting your balance sheet proactively.',
      icon: AlertTriangle,
      badge: 'Real-Time Risk',
      stats: '2.1/10 low risk',
    },
    {
      id: 'compliance',
      name: 'Intelligent Compliance Hub',
      tagline: 'Track regulatory adherence across every jurisdiction',
      description:
        'Continuous automated compliance monitoring across US (SOX, OFAC), UK (FCA, MLRs), Canada (FINTRAC, OSFI), and EU (GDPR, MiFID II).',
      icon: ShieldCheck,
      badge: '50+ Jurisdictions',
      stats: '98.6% score',
    },
    {
      id: 'fraud',
      name: 'Advanced Fraud Defense',
      tagline: 'Catch fraud patterns before they cost you',
      description:
        'AI sentinels that inspect transactional patterns, synthetic identities, and device velocity to stop sophisticated fraud in sub-second latency.',
      icon: Activity,
      badge: 'Active Defense',
      stats: '99.91% caught',
    },
  ];

  return (
    <div className="bg-[#f8fafc] text-slate-900 overflow-hidden">
      {/* ========================================================================= */}
      {/* SECTION 2: SUITE OVERVIEW (One Platform. Four Specialized AI Engines)     */}
      {/* ========================================================================= */}
      <section id="suite-overview" className="py-20 sm:py-24 lg:py-28 border-b border-slate-200/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-[#eff6ff] text-[#2563eb] border border-blue-100/80 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#2563eb]" />
              <span>AI-Powered Financial Automation Suite</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f172a] tracking-tight">
              One Platform. <span className="text-[#1d4ed8]">Four Specialized AI Engines.</span>
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Purpose-built AI systems for every stage of financial operations — engineered for the accuracy and auditability regulators expect, not bolted on after the fact.
            </p>
          </div>

          {/* 4 Engine Selector Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {engines.map((engine, idx) => {
              const Icon = engine.icon;
              const isActive = activeEngine === idx;
              return (
                <button
                  key={engine.id}
                  onClick={() => setActiveEngine(idx)}
                  className={`p-5 rounded-2xl text-left transition-all duration-300 border flex flex-col justify-between cursor-pointer ${
                    isActive
                      ? 'bg-white border-[#2563eb] shadow-[0_8px_30px_rgba(37,99,235,0.12)] ring-2 ring-blue-500/20 scale-[1.02]'
                      : 'bg-white/80 border-slate-200/80 hover:bg-white hover:border-blue-200 hover:shadow-md'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                          isActive
                            ? 'bg-[#1d4ed8] text-white shadow-md'
                            : 'bg-[#eff6ff] text-[#2563eb]'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <span
                        className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          isActive
                            ? 'bg-blue-50 text-[#1d4ed8]'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {engine.badge}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-[#0f172a] mb-1">
                      {engine.name}
                    </h3>
                    <p className="text-xs font-semibold text-[#2563eb] mb-2 leading-snug">
                      {engine.tagline}
                    </p>
                    <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                      {engine.description}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-700">{engine.stats}</span>
                    <span
                      className={`font-bold inline-flex items-center gap-1 ${
                        isActive ? 'text-[#1d4ed8]' : 'text-slate-400'
                      }`}
                    >
                      Active <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Engine Showcase Visual: ai doc intelligent.png */}
          <div className="relative rounded-3xl overflow-hidden bg-white border border-blue-100/80 shadow-[0_20px_50px_rgba(30,58,138,0.08)] p-3 sm:p-5 lg:p-6 mb-12">
            <div className="relative rounded-2xl overflow-hidden bg-slate-900/5 aspect-[16/9] max-h-[580px] flex items-center justify-center">
              <img
                src="/images/finance/ai doc intelligent.png"
                alt="AI Document Intelligence 4-Engine Architecture"
                className="w-full h-full object-contain rounded-xl hover:scale-[1.01] transition-transform duration-500"
              />
            </div>
          </div>

          {/* Stat Strip */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-7">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 text-center">
              <div className="px-2 pt-2 sm:pt-0">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#0f172a]">12,847</div>
                <div className="text-xs font-medium text-slate-500 mt-1">Documents Processed Today</div>
              </div>
              <div className="px-2 pt-4 sm:pt-0">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#1d4ed8]">99.8%</div>
                <div className="text-xs font-medium text-slate-500 mt-1">Accuracy Rate</div>
              </div>
              <div className="px-2 pt-4 sm:pt-0">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#0f172a]">80%</div>
                <div className="text-xs font-medium text-slate-500 mt-1">Cost Reduction</div>
              </div>
              <div className="px-2 pt-4 sm:pt-0">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#1d4ed8]">2.3s</div>
                <div className="text-xs font-medium text-slate-500 mt-1">Average Processing Speed</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: KYC DOCUMENT INTELLIGENCE (Turn Documents into Trusted Identities) */}
      {/* ========================================================================= */}
      <section
        id="kyc-verification"
        className="scroll-mt-28 py-20 sm:py-24 lg:py-28 relative overflow-hidden bg-white border-b border-slate-200/80"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Copy & Feature List (5 Cols) */}
            <div className="lg:col-span-5 space-y-6 sm:space-y-8">
              <div className="space-y-4">
                {/* Eyebrow badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-[#eff6ff] text-[#2563eb] border border-blue-100/80 shadow-2xs">
                  <FileText className="w-3.5 h-3.5 text-[#2563eb]" />
                  <span>KYC & Identity Verification</span>
                </div>

                {/* Headline */}
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f172a] tracking-tight leading-[1.14]">
                  Turn Documents into{' '}
                  <span className="text-[#1d4ed8]">Trusted Identities</span>
                </h2>

                {/* Body Copy */}
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                  Our AI reads, understands, and verifies documents with human-like accuracy — helping financial institutions reduce risk, prevent fraud, and onboard customers faster.
                </p>
              </div>

              {/* 4 Feature Items with light blue icons */}
              <div className="space-y-3.5 pt-1">
                {/* Feature 1 */}
                <div className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-slate-50/80 transition-colors">
                  <div className="w-11 h-11 rounded-xl bg-[#eff6ff] text-[#2563eb] flex items-center justify-center shrink-0 shadow-2xs">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-[#0f172a]">
                      Multi-Document Support
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-500 mt-0.5 leading-relaxed">
                      Passports, national IDs, driver&apos;s licenses, utility bills, and proof of address.
                    </p>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-slate-50/80 transition-colors">
                  <div className="w-11 h-11 rounded-xl bg-[#eff6ff] text-[#2563eb] flex items-center justify-center shrink-0 shadow-2xs">
                    <Fingerprint className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-[#0f172a]">
                      Advanced Identity Verification
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-500 mt-0.5 leading-relaxed">
                      High-precision OCR, facial biometric matching, and liveness checks.
                    </p>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-slate-50/80 transition-colors">
                  <div className="w-11 h-11 rounded-xl bg-[#eff6ff] text-[#2563eb] flex items-center justify-center shrink-0 shadow-2xs">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-[#0f172a]">
                      Real-time Fraud Detection
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-500 mt-0.5 leading-relaxed">
                      Detect manipulated, photoshopped, or suspicious documents instantly.
                    </p>
                  </div>
                </div>

                {/* Feature 4 */}
                <div className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-slate-50/80 transition-colors">
                  <div className="w-11 h-11 rounded-xl bg-[#eff6ff] text-[#2563eb] flex items-center justify-center shrink-0 shadow-2xs">
                    <FileCheck2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-[#0f172a]">
                      Automated Compliance
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-500 mt-0.5 leading-relaxed">
                      Regulatory checks against AML, KYC, PEP, and global sanctions with audit trails.
                    </p>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="pt-2 space-y-3">
                <div className="flex flex-wrap items-center gap-3.5">
                  <button
                    onClick={handleServicesClick}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-[#1d4ed8] hover:bg-[#1e40af] shadow-[0_4px_14px_rgba(29,78,216,0.28)] hover:shadow-[0_6px_20px_rgba(29,78,216,0.36)] transition-all cursor-pointer"
                  >
                    <span>See It in Action</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handleBookingClick}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-sm text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 shadow-2xs hover:border-slate-400 transition-all cursor-pointer"
                  >
                    <PlayCircle className="w-4 h-4 text-[#2563eb]" />
                    <span>Watch Demo</span>
                  </button>
                </div>

                <p className="text-xs text-slate-400 font-medium">
                  Trusted by leading financial institutions worldwide
                </p>
              </div>
            </div>

            {/* Right Column: Visual docs into trusted identites.png (7 Cols) */}
            <div className="lg:col-span-7">
              <div className="relative rounded-3xl overflow-hidden bg-white border border-blue-100/80 shadow-[0_20px_50px_rgba(30,58,138,0.08)] p-2 sm:p-4">
                <div className="relative rounded-2xl overflow-hidden aspect-[16/9] flex items-center justify-center bg-slate-50">
                  <img
                    src="/images/finance/docs into trusted identites.png"
                    alt="Passport scanner, data extraction flow, identity verification monitor, and bottom metric bar"
                    className="w-full h-full object-contain rounded-xl hover:scale-[1.01] transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AutomationFeaturesSection;