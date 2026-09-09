import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  PlayCircle,
  FileText,
  Zap,
  Target,
  TrendingDown,
  Lock,
  FileCheck,
  Globe,
  Building2,
  Sparkles,
} from 'lucide-react';

const FinancialHeroSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-[#f8fafc] pt-32 sm:pt-36 lg:pt-40 pb-16 sm:pb-20 border-b border-slate-100">
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        {/* Main Grid: Left copy & metrics, Right 3D Visual */}
        <div className="grid items-center gap-10 lg:gap-14 lg:grid-cols-12">
          {/* Left Column (5 Cols) */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-8">
            <div className="space-y-4">
              {/* Eyebrow Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-[#eff6ff] text-[#2563eb] border border-blue-100/80 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#2563eb]" />
                <span>AI-Powered Financial Automation</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-[#0f172a] tracking-tight leading-[1.12]">
                Transform
                <br />
                <span className="text-[#1d4ed8]">Financial</span>
                <br />
                <span className="text-[#1d4ed8]">Operations</span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-lg pt-1">
                Automate KYC onboarding, stay ahead of evolving regulation, and cut operational costs by 80% with our enterprise-grade AI platform designed specifically for financial institutions.
              </p>
            </div>

            {/* 4 Stat Boxes (2x2 Grid) */}
            <div className="grid grid-cols-2 gap-3.5 sm:gap-4 pt-2">
              {/* Stat 1 */}
              <div className="p-4 rounded-2xl bg-white border border-blue-50/80 shadow-[0_4px_20px_rgba(30,58,138,0.04)] flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#eff6ff] text-[#2563eb] flex items-center justify-center shrink-0 shadow-2xs">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-extrabold text-[#0f172a] leading-tight">12,847</div>
                  <div className="text-xs font-medium text-slate-500 mt-0.5 leading-tight">Documents Processed</div>
                  <div className="text-[11px] text-[#2563eb] font-semibold">today</div>
                </div>
              </div>

              {/* Stat 2 */}
              <div className="p-4 rounded-2xl bg-white border border-blue-50/80 shadow-[0_4px_20px_rgba(30,58,138,0.04)] flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#eff6ff] text-[#2563eb] flex items-center justify-center shrink-0 shadow-2xs">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-extrabold text-[#0f172a] leading-tight">2.3s</div>
                  <div className="text-xs font-medium text-slate-500 mt-0.5 leading-tight">Processing Speed</div>
                  <div className="text-[11px] text-[#2563eb] font-semibold">average</div>
                </div>
              </div>

              {/* Stat 3 */}
              <div className="p-4 rounded-2xl bg-white border border-blue-50/80 shadow-[0_4px_20px_rgba(30,58,138,0.04)] flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#eff6ff] text-[#2563eb] flex items-center justify-center shrink-0 shadow-2xs">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-extrabold text-[#0f172a] leading-tight">99.8%</div>
                  <div className="text-xs font-medium text-slate-500 mt-0.5 leading-tight">Accuracy Rate</div>
                  <div className="text-[11px] text-[#2563eb] font-semibold">AI-powered</div>
                </div>
              </div>

              {/* Stat 4 */}
              <div className="p-4 rounded-2xl bg-white border border-blue-50/80 shadow-[0_4px_20px_rgba(30,58,138,0.04)] flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#eff6ff] text-[#2563eb] flex items-center justify-center shrink-0 shadow-2xs">
                  <TrendingDown className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-extrabold text-[#0f172a] leading-tight">80%</div>
                  <div className="text-xs font-medium text-slate-500 mt-0.5 leading-tight">Cost Reduction</div>
                  <div className="text-[11px] text-[#2563eb] font-semibold">operational savings</div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={() => {
                  navigate('/book-consultation');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-7 py-3.5 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 group cursor-pointer"
              >
                <span>Request a Demo</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  navigate('/#services');
                  const el = document.getElementById('services');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm border border-slate-200/90 shadow-2xs transition-all duration-200 flex items-center gap-2 group cursor-pointer"
              >
                <PlayCircle className="w-4 h-4 text-[#2563eb]" />
                <span>See It in Action</span>
              </button>
            </div>
          </div>

          {/* Right Column: Visual Component (7 Cols) */}
          <div className="lg:col-span-7 relative select-none">
            {/* Top-Right Speech Bubble: From Documents to Decisions */}
            <div className="absolute -top-6 right-6 z-20 hidden sm:flex items-center gap-2 px-4 py-2 bg-[#2563eb] text-white rounded-2xl shadow-lg text-xs font-semibold">
              <span>From Documents to Decisions — Smarter, Faster, Safer</span>
              <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-[#2563eb] rotate-45" />
            </div>

            {/* Main Visual Image Card */}
            <div className="relative rounded-3xl overflow-hidden bg-white border border-blue-50/80 shadow-[0_16px_50px_rgba(30,58,138,0.1)]">
              <img
                src="/images/finance/finance.png"
                alt="FinanceAI Pro - Live Financial Operations AI Dashboard"
                className="w-full h-auto object-contain rounded-3xl"
              />
            </div>

            {/* Handwritten Script Accent at bottom-right */}
            <div className="text-right mt-3 pr-2 pointer-events-none">
              <span className="font-serif italic text-lg sm:text-xl text-[#2563eb] tracking-wide inline-block">
                Powering a Smarter Financial Future ⚡
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Trust Row */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-slate-200/70">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
            {/* Trust 1 */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#eff6ff] text-[#2563eb] flex items-center justify-center shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-[#0f172a] leading-tight">Bank-Grade Security</h4>
                <p className="text-[11px] text-slate-500 leading-tight mt-0.5">AES-256 & TLS 1.3</p>
              </div>
            </div>

            {/* Trust 2 */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#eff6ff] text-[#2563eb] flex items-center justify-center shrink-0">
                <FileCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-[#0f172a] leading-tight">Regulatory Compliance</h4>
                <p className="text-[11px] text-slate-500 leading-tight mt-0.5">SOX, GDPR, AML & KYC</p>
              </div>
            </div>

            {/* Trust 3 */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#eff6ff] text-[#2563eb] flex items-center justify-center shrink-0">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-[#0f172a] leading-tight">Scalable for Global Ops</h4>
                <p className="text-[11px] text-slate-500 leading-tight mt-0.5">US, UK, CA & Worldwide</p>
              </div>
            </div>

            {/* Trust 4 */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#eff6ff] text-[#2563eb] flex items-center justify-center shrink-0">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-[#0f172a] leading-tight">Enterprise Ready</h4>
                <p className="text-[11px] text-slate-500 leading-tight mt-0.5">Core banking integrations</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinancialHeroSection;