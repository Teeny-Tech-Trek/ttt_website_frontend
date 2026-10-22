import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle,
  AlertTriangle,
  FileText,
  Globe,
  TrendingUp,
  Layers,
  Sparkles,
  BarChart3,
  Scale,
  Building2,
  Lock,
} from 'lucide-react';

const ComplianceRiskSection: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState('all');

  const frameworks = [
    { name: 'SOX (Sarbanes-Oxley)', score: 99.2, status: 'Compliant' },
    { name: 'AML / KYC Regulations', score: 99.8, status: 'Compliant' },
    { name: 'UK & EU GDPR', score: 98.8, status: 'Compliant' },
    { name: 'PCI DSS Level 1', score: 97.5, status: 'Compliant' },
    { name: 'MiFID II & DORA', score: 96.3, status: 'Compliant' },
    { name: 'Basel III Capital Framework', score: 94.2, status: 'Monitoring' },
  ];

  const riskBreakdown = [
    { label: 'Overall Risk', score: '2.1/10', level: 'Low', badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    { label: 'Market Risk', score: '4.4/10', level: 'Moderate', badgeColor: 'bg-amber-50 text-amber-700 border-amber-200' },
    { label: 'Operational Risk', score: '2.7/10', level: 'Low', badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    { label: 'Credit Risk', score: '2.3/10', level: 'Low', badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    { label: 'Liquidity Risk', score: '1.6/10', level: 'Very Low', badgeColor: 'bg-blue-50 text-blue-700 border-blue-200' },
    { label: 'Compliance Risk', score: '1.2/10', level: 'Minimal', badgeColor: 'bg-blue-50 text-blue-700 border-blue-200' },
  ];

  const jurisdictions = [
    {
      flag: '🇺🇸',
      country: 'United States',
      regulators: 'SEC, FinCEN, OCC, FDIC, CFPB',
      frameworks: 'SOX, Bank Secrecy Act (BSA), OFAC Sanctions, Gramm-Leach-Bliley Act (GLBA)',
    },
    {
      flag: '🇬🇧',
      country: 'United Kingdom',
      regulators: 'Financial Conduct Authority (FCA), PRA',
      frameworks: 'UK Money Laundering Regulations (MLRs), UK GDPR, FCA Senior Managers Regime',
    },
    {
      flag: '🇨🇦',
      country: 'Canada',
      regulators: 'FINTRAC, OSFI, FCAC',
      frameworks: 'Proceeds of Crime (Money Laundering) & Terrorist Financing Act, PIPEDA, OSFI B-10 / B-13',
    },
    {
      flag: '🇪🇺',
      country: 'European Union',
      regulators: 'EBA, ESMA, ECB',
      frameworks: 'EU GDPR, MiFID II, AMLD6, Digital Operational Resilience Act (DORA)',
    },
    {
      flag: '🇸🇬',
      country: 'Singapore',
      regulators: 'Monetary Authority of Singapore (MAS)',
      frameworks: 'MAS Technology Risk Management Guidelines, Notice 626 AML, PDPA',
    },
    {
      flag: '🇦🇺',
      country: 'Australia',
      regulators: 'AUSTRAC, APRA, ASIC',
      frameworks: 'Anti-Money Laundering and Counter-Terrorism Financing Act, CPS 234',
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#f8fafc] border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-[#eff6ff] text-[#2563eb] border border-blue-100/80 shadow-2xs">
            <Scale className="w-3.5 h-3.5 text-[#2563eb]" />
            <span>Advanced Compliance & Risk Management</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f172a] tracking-tight">
            Regulatory Excellence, <span className="text-[#1d4ed8]">By Design</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Stay ahead of evolving regulation with AI-powered compliance monitoring across every jurisdiction you operate in — without the manual tracking.
          </p>
        </div>

        {/* Two-Column Grid: Left Analytics & Scores, Right Global Coverage Visual */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-14">
          {/* Left Column (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Compliance Score Gauge Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-blue-100/80 shadow-[0_4px_20px_rgba(30,58,138,0.04)]">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-[#0f172a]">Real-Time Compliance Score</h3>
                  <p className="text-xs text-slate-500">Live regulatory posture calculation</p>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Audit Ready
                </span>
              </div>

              {/* Score Display */}
              <div className="flex items-center gap-6 py-3 border-y border-slate-100 my-4">
                <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" stroke="#f1f5f9" strokeWidth="8" fill="none" />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#2563eb"
                      strokeWidth="8"
                      strokeDasharray="251"
                      strokeDashoffset="7.5"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xl font-extrabold text-[#0f172a]">98.6%</span>
                    <span className="text-[10px] uppercase font-bold text-emerald-600">Excellent</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="text-xs font-semibold text-slate-700">Audit-Ready Telemetry</div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Zero gaps detected across AML screening, record keeping, PEP validation, and transaction audit trails.
                  </p>
                </div>
              </div>

              {/* Monitored Frameworks */}
              <div className="space-y-2.5 pt-1">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Monitored Frameworks
                </div>
                {frameworks.map((fw) => (
                  <div key={fw.name} className="flex items-center justify-between text-xs py-1">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#2563eb]"></div>
                      <span className="font-semibold text-slate-700">{fw.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{fw.score}%</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          fw.status === 'Compliant'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}
                      >
                        {fw.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Risk Assessment Breakdown Grid */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-blue-100/80 shadow-[0_4px_20px_rgba(30,58,138,0.04)]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-[#0f172a]">Risk Assessment Breakdown</h3>
                <span className="text-xs text-[#2563eb] font-semibold">Sub-second dynamic scoring</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {riskBreakdown.map((item) => (
                  <div
                    key={item.label}
                    className="p-3 rounded-xl bg-slate-50/70 border border-slate-100 hover:bg-white hover:border-blue-100 transition-all"
                  >
                    <div className="text-[11px] font-medium text-slate-500">{item.label}</div>
                    <div className="flex items-baseline justify-between mt-1">
                      <div className="text-lg font-extrabold text-[#0f172a]">{item.score}</div>
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${item.badgeColor}`}
                      >
                        {item.level}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (7 Cols): Global Regulatory Coverage Visual & Matrix */}
          <div className="lg:col-span-7 space-y-6">
            {/* Visual: global regulatory coverage.png */}
            <div className="rounded-3xl overflow-hidden bg-white border border-blue-100/80 shadow-[0_20px_50px_rgba(30,58,138,0.08)] p-3 sm:p-5">
              <div className="rounded-2xl overflow-hidden aspect-[16/9] flex items-center justify-center bg-slate-50">
                <img
                  src="/images/finance/global regulatory coverage.webp"
                  alt="Global Regulatory Coverage Matrix and AI telemetry"
                  className="w-full h-full object-contain rounded-xl hover:scale-[1.01] transition-transform duration-500"
                />
              </div>
            </div>

            {/* 4 Stat Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              <div className="p-4 rounded-2xl bg-white border border-blue-50/80 shadow-2xs text-center">
                <div className="text-xl sm:text-2xl font-extrabold text-[#0f172a]">247</div>
                <div className="text-xs text-slate-500 mt-0.5">Active Regulations</div>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-blue-50/80 shadow-2xs text-center">
                <div className="text-xl sm:text-2xl font-extrabold text-[#1d4ed8]">50+</div>
                <div className="text-xs text-slate-500 mt-0.5">Jurisdictions</div>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-blue-50/80 shadow-2xs text-center">
                <div className="text-xl sm:text-2xl font-extrabold text-[#0f172a]">99.9%</div>
                <div className="text-xs text-slate-500 mt-0.5">Accuracy Rate</div>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-blue-50/80 shadow-2xs text-center">
                <div className="text-xl sm:text-2xl font-extrabold text-[#1d4ed8]">24/7</div>
                <div className="text-xs text-slate-500 mt-0.5">Live Monitoring</div>
              </div>
            </div>

            {/* Jurisdictions Accordion / Cards */}
            <div className="bg-white rounded-3xl p-6 border border-blue-100/80 shadow-sm">
              <h4 className="text-sm font-bold text-[#0f172a] uppercase tracking-wider mb-4 flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#2563eb]" />
                Target Market Regulatory Alignment
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {jurisdictions.map((j) => (
                  <div
                    key={j.country}
                    className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-white hover:border-blue-200 transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xl">{j.flag}</span>
                      <span className="text-sm font-bold text-[#0f172a]">{j.country}</span>
                    </div>
                    <div className="text-[11px] font-semibold text-[#2563eb] mb-1">
                      {j.regulators}
                    </div>
                    <div className="text-xs text-slate-500 leading-snug">
                      {j.frameworks}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComplianceRiskSection;