import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  HelpCircle,
  Lock,
  CheckCircle2,
} from 'lucide-react';

const CTASection: React.FC = () => {
  const navigate = useNavigate();
  const [openId, setOpenId] = useState<number | null>(1);

  const toggleFAQ = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const faqs = [
    {
      id: 1,
      question: 'How does Teeny Tech Trek ensure zero hallucination and 100% auditability for bank regulators?',
      answer:
        'Our financial models do not generate unverified text. We utilize deterministic extraction anchored strictly to source document pixels, paired with multi-layer confidence scoring and cryptographic provenance tracking. Every extracted field links directly to its source bounding box, making every decision 100% auditable for SEC, FCA, and FINTRAC examiners.',
    },
    {
      id: 2,
      question: 'Which core banking systems and compliance databases are natively supported?',
      answer:
        'We offer pre-built certified connectors for Temenos, FIS, Oracle FSS, and SAP Banking, alongside CRM platforms like Salesforce FSC. On the compliance side, our engines query global PEP/Sanctions registries, Dow Jones Risk & Compliance, Refinitiv World-Check, and OFAC lists in real time.',
    },
    {
      id: 3,
      question: 'How does Teeny Tech Trek handle data sovereignty across US, UK, Canada, and EU jurisdictions?',
      answer:
        'Data sovereignty is enforced at the network architecture level. Customer documents and extracted PII never leave their designated regional cloud enclave (AWS US GovCloud, AWS London, AWS Frankfurt, or AWS Montreal). We strictly enforce zero cross-border data replication and adhere to UK GDPR, EU GDPR, and PIPEDA mandates.',
    },
    {
      id: 4,
      question: 'What is the implementation timeline and resource requirement from our internal IT team?',
      answer:
        'Most financial institutions achieve initial sandbox integration within 1–2 weeks and full production deployment within 6–8 weeks. We assign a dedicated Implementation Architect who manages configuration, model training, and API integration, requiring minimal engineering overhead from your internal team.',
    },
    {
      id: 5,
      question: 'Can the suite be deployed inside our institutional private VPC or hybrid cloud?',
      answer:
        'Yes. In addition to our single-tenant SOC 2 Type II SaaS environment, we provide customer-managed private VPC deployments (AWS VPC, Azure Private Link) as well as air-gapped hybrid container images for institutions with strict internal hosting requirements.',
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* ========================================================================= */}
      {/* FAQ SECTION (Website's Clean Native Accordion Design with Framer Motion)  */}
      {/* ========================================================================= */}
      <section className="relative py-20 sm:py-24 bg-gradient-to-b from-slate-50/60 via-white to-slate-50/80 overflow-hidden border-b border-slate-200/80">
        {/* Decorative ambient background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.06),transparent_70%)] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-blue-50 text-blue-700 border border-blue-100 shadow-sm mb-4">
              <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
              <span>Frequently Asked Questions</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Everything You Need to Know
            </h2>

            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Clear, transparent answers about our enterprise financial AI architecture, zero-hallucination controls, regulatory adherence, and implementation.
            </p>
          </div>

          {/* Website-styled Accordion with + button rotating to X */}
          <div className="border-t border-b border-slate-200 divide-y divide-slate-200">
            {faqs.map((faq) => {
              const isOpen = openId === faq.id;

              return (
                <div key={faq.id}>
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    aria-expanded={isOpen}
                    className="w-full py-6 sm:py-7 flex items-center justify-between text-left gap-4 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg cursor-pointer"
                  >
                    <span
                      className={`text-lg sm:text-xl md:text-2xl font-bold transition-colors duration-200 ${
                        isOpen ? 'text-[#1d4ed8]' : 'text-slate-900 group-hover:text-[#1d4ed8]'
                      }`}
                    >
                      {faq.question}
                    </span>

                    <span
                      className={`flex-shrink-0 w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300 ${
                        isOpen
                          ? 'border-[#1d4ed8] bg-[#1d4ed8] text-white rotate-45'
                          : 'border-slate-300 text-slate-400 group-hover:border-[#1d4ed8] group-hover:text-[#1d4ed8] bg-white'
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
                        <div className="pb-6 pr-4 sm:pr-12 text-slate-600 text-sm sm:text-base leading-relaxed">
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

      {/* ========================================================================= */}
      {/* FINAL CTA BANNER — WHITE THEME (Clean, elegant, premium financial look)   */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-24 lg:py-28 relative overflow-hidden bg-slate-50/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl bg-white border border-blue-100/80 shadow-[0_20px_50px_rgba(30,58,138,0.06)] p-8 sm:p-14 lg:p-16 text-center overflow-hidden">
            {/* Soft Ambient Accents */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-blue-50/80 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-50/60 rounded-full blur-3xl -ml-16 -mb-16 pointer-events-none"></div>

            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              {/* Eyebrow badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-[#eff6ff] text-[#2563eb] border border-blue-100/80 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#2563eb]" />
                <span>Modernize Your Institution Today</span>
              </div>

              {/* Headline in dark slate + royal blue */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f172a] tracking-tight leading-tight">
                Ready to Modernize Your{' '}
                <span className="text-[#1d4ed8]">Compliance Operations?</span>
              </h2>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
                See how Teeny Tech Trek helps financial institutions like yours automate KYC, stay ahead of regulation, and cut operational costs by 80% — without cutting corners on accuracy or auditability.
              </p>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={() => navigate('/book-consultation')}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-base text-white bg-[#1d4ed8] hover:bg-[#1e40af] shadow-[0_4px_16px_rgba(29,78,216,0.25)] hover:shadow-[0_6px_20px_rgba(29,78,216,0.35)] transition-all cursor-pointer"
                >
                  <span>Request a Demo</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  onClick={() => navigate('/book-consultation')}
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-bold text-base text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 shadow-2xs hover:border-slate-400 transition-all cursor-pointer"
                >
                  <span>Talk to Our Team</span>
                </button>
              </div>

              {/* Trust Markers in Light Theme */}
              <div className="pt-8 border-t border-slate-100 flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-600">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>No Long-Term Lock-in</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>SOC 2 Type II Certified</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>2-Week Pilot Available</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Dedicated Implementation Architect</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CTASection;