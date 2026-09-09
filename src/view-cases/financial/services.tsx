import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  Lock,
  Eye,
  FileCheck2,
  Server,
  Globe2,
  AlertOctagon,
  RefreshCw,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Shield,
  Key,
  Database,
  Building,
} from 'lucide-react';

const SecuritySection: React.FC = () => {
  const navigate = useNavigate();

  const securityPillars = [
    {
      icon: Lock,
      title: 'End-to-End Encryption',
      desc: 'AES-256 encryption at rest, TLS 1.3 in transit, and dedicated Hardware Security Modules (HSMs) for cryptographic key vaulting.',
    },
    {
      icon: Shield,
      title: 'Zero-Trust Architecture',
      desc: 'Mandatory MFA, granular Role-Based Access Control (RBAC), and continuous session validation for every internal and external API call.',
    },
    {
      icon: Eye,
      title: 'Real-Time Monitoring',
      desc: '24/7 Security Operations Center (SOC) with AI-powered behavioral anomaly detection and automated incident quarantine protocols.',
    },
    {
      icon: FileCheck2,
      title: 'Continuous Compliance Auditing',
      desc: 'Immutable, tamper-evident audit trails with cryptographic hash verification ready for immediate regulatory inspector submission.',
    },
  ];

  const infraPillars = [
    {
      icon: Server,
      title: 'Secure Cloud Infrastructure',
      desc: 'AWS & Azure GovCloud deployment options with single-tenant VPC isolation, strict boundary ingress controls, and DDoS mitigation.',
    },
    {
      icon: Globe2,
      title: 'Global Data Sovereignty',
      desc: 'Guaranteed local data residency within your legal jurisdiction — US, UK, Canada, or EU — preventing unauthorized cross-border transfers.',
    },
    {
      icon: AlertOctagon,
      title: 'Threat Detection & Response',
      desc: 'Integrated SIEM telemetry with rapid incident response SLAs under 15 minutes, overseen by certified defensive security personnel.',
    },
    {
      icon: RefreshCw,
      title: 'Disaster Recovery & Redundancy',
      desc: 'Active-active multi-region failover with RPO < 1 min, RTO < 15 min, and verified 99.99% operational uptime SLA.',
    },
  ];

  const certifications = [
    { name: 'SOC 2 Type II', status: 'Certified', org: 'AICPA Audited' },
    { name: 'ISO 27001', status: 'Certified', org: 'Information Security' },
    { name: 'PCI DSS Level 1', status: 'Compliant', org: 'Payment Security' },
    { name: 'EU & UK GDPR', status: 'Compliant', org: 'Privacy & Sovereignty' },
    { name: 'HIPAA', status: 'Ready', org: 'Data Safeguards' },
    { name: 'US FedRAMP', status: 'In Progress', org: 'Gov Standards' },
  ];

  return (
    <div className="bg-white text-slate-900 overflow-hidden">
      {/* ========================================================================= */}
      {/* SECTION 9: BANK-GRADE SECURITY & COMPLIANCE                               */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 lg:py-24 border-b border-slate-200/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-14 sm:mb-18">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-[#eff6ff] text-[#2563eb] border border-blue-100/80 shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-[#2563eb]" />
              <span>Security First · Built for Trust</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f172a] tracking-tight">
              Bank-Grade Security & <span className="text-[#1d4ed8]">Compliance</span>
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Enterprise-level security infrastructure engineered specifically for tier-1 financial institutions with the most exacting risk and regulatory standards.
            </p>
          </div>

          {/* 4 Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
            {securityPillars.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#f8fafc] border border-slate-200/80 hover:bg-white hover:border-blue-200 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[#eff6ff] text-[#2563eb] flex items-center justify-center mb-4 shadow-2xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-[#0f172a] mb-2">{p.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Two-Column: Left Infrastructure Info, Right Visual Dashboard */}
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-16">
            {/* Left Column: Infrastructure Breakdown (6 Cols) */}
            <div className="lg:col-span-6 space-y-5">
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] tracking-tight mb-2">
                  Enterprise Security Infrastructure
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Multi-layered defense architecture with automated failover and sovereign data boundaries to safeguard your most sensitive institutional assets.
                </p>
              </div>

              <div className="space-y-3.5">
                {infraPillars.map((inf) => {
                  const Icon = inf.icon;
                  return (
                    <div
                      key={inf.title}
                      className="p-4 rounded-xl bg-slate-50/70 border border-slate-100 flex items-start gap-3.5"
                    >
                      <div className="w-9 h-9 rounded-lg bg-[#eff6ff] text-[#2563eb] flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-[#0f172a]">{inf.title}</h4>
                        <p className="text-xs text-slate-500 leading-relaxed mt-0.5">{inf.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Visual bank grade - security dashboard.png (6 Cols) */}
            <div className="lg:col-span-6 flex items-center justify-center">
              <div className="relative w-full max-w-[500px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(15,23,42,0.16)] border border-slate-200/80 bg-[#071330] group">
                <img
                  src="/images/finance/bank grade - security dashboard.png"
                  alt="Bank Grade Security Dashboard showing live encryption status, SOC telemetry, and access logs"
                  className="w-full h-auto block object-contain transform group-hover:scale-[1.01] transition-transform duration-500 select-none"
                />
              </div>
            </div>
          </div>

          {/* Security Status & Telemetry Metrics Strip */}
          <div className="bg-[#f8fafc] rounded-2xl border border-slate-200/80 p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#0f172a]">3</div>
                <div className="text-xs text-slate-500 mt-0.5">Global Regions (US, UK, EU)</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#1d4ed8]">99.99%</div>
                <div className="text-xs text-slate-500 mt-0.5">Security Uptime SLA</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#0f172a]">&lt; 15 min</div>
                <div className="text-xs text-slate-500 mt-0.5">Incident Response SLA</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600">0</div>
                <div className="text-xs text-slate-500 mt-0.5">Security Incidents to Date</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 10: COMPLIANCE & CERTIFICATIONS                                  */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#f8fafc] border-b border-slate-200/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-14 sm:mb-18">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-[#eff6ff] text-[#2563eb] border border-blue-100/80 shadow-2xs">
              <Building className="w-3.5 h-3.5 text-[#2563eb]" />
              <span>Globally Compliant</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f172a] tracking-tight">
              Compliance & <span className="text-[#1d4ed8]">Certifications</span>
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Comprehensive third-party validated compliance coverage across the highest global financial security and data governance standards.
            </p>
          </div>

          {/* Two-Column Grid: Left Visual, Right Certification Badges */}
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-12">
            {/* Left Column: Visual compliance and certificates.png (7 Cols) */}
            <div className="lg:col-span-7">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-white border border-slate-200/90 shadow-[0_20px_50px_rgba(30,58,138,0.08)] group">
                <img
                  src="/images/finance/compliance and certificates.png"
                  alt="Compliance & Certifications badges showing SOC 2, ISO 27001, PCI DSS, GDPR, HIPAA, and FedRAMP"
                  className="w-full h-auto block object-contain transform group-hover:scale-[1.01] transition-transform duration-500 select-none"
                />
              </div>
            </div>

            {/* Right Column: Badges & Continuous Monitoring Card (5 Cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {certifications.map((c) => (
                  <div
                    key={c.name}
                    className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs hover:border-blue-200 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-[#0f172a]">{c.name}</span>
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${
                          c.status === 'Certified'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : c.status === 'Compliant'
                            ? 'bg-blue-50 text-[#1d4ed8] border-blue-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}
                      >
                        {c.status}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500">{c.org}</div>
                  </div>
                ))}
              </div>

              {/* Continuous Compliance Monitoring Callout */}
              <div className="p-5 rounded-2xl bg-white border border-blue-100 shadow-sm space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <h4 className="text-sm font-bold text-[#0f172a]">
                    Continuous Compliance Monitoring
                  </h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Automated compliance checks ensure ongoing adherence to all regulatory requirements with real-time telemetry, automated auditor-ready reports, and instant policy divergence alerts.
                </p>
              </div>

              {/* Regulatory Alignment Badges */}
              <div className="p-3.5 rounded-xl bg-slate-100/70 border border-slate-200/80 flex items-center justify-between text-xs font-semibold text-slate-600">
                <span>FFIEC Guidelines</span>
                <span>•</span>
                <span>OCC Standards</span>
                <span>•</span>
                <span>FINRA Compliant</span>
                <span>•</span>
                <span>FCA Aligned</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SecuritySection;
