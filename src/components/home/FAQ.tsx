import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, HelpCircle, ArrowRight } from "lucide-react";
import Container from "../ui/Container";

interface FaqItem {
  id: number;
  question: string;
  answer: string;
  category: "General" | "Services" | "Pilots" | "Security" | "ROI";
}

const FAQ_DATA: FaqItem[] = [
  {
    id: 1,
    category: "General",
    question: "What is Teeny Tech Trek?",
    answer:
      "Teeny Tech Trek is an enterprise AI engineering and automation consultancy. We design, engineer, and deploy production-grade AI agents, custom conversational chatbots, and automated workflows tailored to eliminate repetitive manual tasks and accelerate operations for lean, high-performing teams.",
  },
  {
    id: 2,
    category: "General",
    question: "Who is Teeny Tech Trek for?",
    answer:
      "We partner with small-to-midsize businesses, enterprise department heads, and operational leaders who want to leverage practical, reliable AI. If your team spends excessive hours on manual data entry, customer support inquiries, internal reporting, or workflow bottlenecks, we build systems that automate those tasks seamlessly.",
  },
  {
    id: 3,
    category: "General",
    question: "How is Teeny Tech Trek different from other AI companies?",
    answer:
      "Unlike generic SaaS wrappers or bloated IT consultancies, we deliver fully customized, production-ready AI systems integrated directly into your existing infrastructure. We focus on measurable business ROI, strict data privacy, and rapid deployment rather than theoretical AI research.",
  },
  {
    id: 4,
    category: "General",
    question: "Who will we actually be working with?",
    answer:
      "A small senior team on every project—no account managers relaying messages, no junior hand-offs.",
  },
  {
    id: 5,
    category: "Services",
    question: "What services does Teeny Tech Trek offer?",
    answer:
      "Our core service lines include:\n• AI-Powered Chatbots: Domain-trained support and lead qualification assistants with verifiable citations.\n• Agentic AI Workflows: Multi-step autonomous agents that process documents, route requests, and trigger actions.\n• Smart Process Automation: Unifying CRM, ERP, databases, and messaging systems.\n• Lightweight AI Apps: Custom internal tools and dashboards built around your business logic.\n• Claude & LLM Integrations: Secure API integrations with deterministic guardrails.",
  },
  {
    id: 6,
    category: "Services",
    question: "Will you sell us a generic wrapper or build a custom solution?",
    answer:
      "Every solution we deliver is 100% custom-tailored to your stack. We engineer proprietary retrieval-augmented generation (RAG) pipelines, deterministic refusal rules, and business logic pipelines trained exclusively on your internal knowledge base and brand standards.",
  },
  {
    id: 7,
    category: "Services",
    question: "Can you integrate with our existing tools (CRM, ERP, Slack, Zendesk)?",
    answer:
      "Yes. Our systems integrate with your current software stack via secure REST APIs, webhooks, and service accounts. We regularly connect with HubSpot, Salesforce, Zendesk, Slack, WhatsApp, Google Workspace, PostgreSQL, MongoDB, Shopify, and proprietary internal databases.",
  },
  {
    id: 8,
    category: "Pilots",
    question: "What do we need to prepare before the consultation?",
    answer:
      "Nothing extensive—just a short brief on your goals and access to whoever knows your current stack.",
  },
  {
    id: 9,
    category: "Pilots",
    question: "How soon can we start?",
    answer:
      "Most Pilots kick off within a week of your consultation.",
  },
  {
    id: 10,
    category: "Pilots",
    question: "How does the 4-week AI pilot work?",
    answer:
      "Our 4-week pilot is structured into two disciplined 2-week sprints:\n• Sprint 1 (Weeks 1–2): Architecture blueprint, workflow selection, secure data integration, and prototype deployment.\n• Sprint 2 (Weeks 3–4): Accuracy refinement, guardrail validation, user testing, and live team deployment with full documentation.",
  },
  {
    id: 11,
    category: "Pilots",
    question: "Can we apply the consultation fee toward a pilot?",
    answer:
      "Yes—we credit 100% of your initial consultation fee toward your 4-week Pilot sprint if you initiate your project within 30 days of the session.",
  },
  {
    id: 12,
    category: "Pilots",
    question: "What if the Pilot doesn't get us the results we want?",
    answer:
      "You keep everything we've built, and there's no obligation to continue.",
  },
  {
    id: 13,
    category: "Pilots",
    question: "What if we need to reschedule our consultation?",
    answer:
      "You can reschedule your booking up to 24 hours before your slot with a single click using the reschedule link inside your calendar invitation.",
  },
  {
    id: 14,
    category: "Security",
    question: "Do you sign NDAs and keep our business data secure?",
    answer:
      "Yes. We execute mutual non-disclosure agreements (NDAs) before any deep-dive session. We enforce strict zero-data-retention principles with AI providers, ensuring your proprietary data is strictly isolated and never used to train public foundation models.",
  },
  {
    id: 15,
    category: "Security",
    question: "Where is our data processed and hosted?",
    answer:
      "We design all implementations with least-privilege security. Depending on your regulatory constraints, your AI pipelines can be deployed directly inside your private cloud (AWS, GCP, Azure) or hosted in our hardened, encrypted cloud infrastructure.",
  },
  {
    id: 16,
    category: "ROI",
    question: "How quickly can we expect to see measurable ROI?",
    answer:
      "Most clients see quantifiable returns within 30–60 days of deployment. Typical results include a 40–55% deflection of repetitive inquiries, 15+ hours saved weekly per operational employee, and dramatically faster turnaround times for customer communications.",
  },
  {
    id: 17,
    category: "ROI",
    question: "Do you provide ongoing support and model updates?",
    answer:
      "Yes. Following initial deployment, we offer ongoing management packages that include real-time telemetry, accuracy monitoring, prompt engineering adjustments, security patching, and upgrades to new foundation models as frontier AI evolves.",
  },
];

const CATEGORIES = [
  { id: "General", label: "General" },
  { id: "Services", label: "AI Services" },
  { id: "Pilots", label: "Pilots & Process" },
  { id: "Security", label: "Security & Data" },
  { id: "ROI", label: "Pricing & ROI" },
] as const;

type CategoryType = (typeof CATEGORIES)[number]["id"];

const FAQ: React.FC = () => {
  // Only one category open at a time — keeps the list short instead of
  // dumping every question on screen at once.
  const [openCategory, setOpenCategory] = useState<CategoryType | null>(
    CATEGORIES[0].id
  );
  const [openQuestionId, setOpenQuestionId] = useState<number | null>(null);

  const toggleCategory = (id: CategoryType) => {
    setOpenCategory((prev) => (prev === id ? null : id));
    setOpenQuestionId(null);
  };

  const toggleQuestion = (id: number) => {
    setOpenQuestionId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="relative py-24 bg-gradient-to-b from-slate-50/60 via-white to-slate-50/80 overflow-hidden">
      {/* Decorative ambient background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.06),transparent_70%)] pointer-events-none" />

      <Container className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
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
            Clear, transparent answers about our enterprise AI implementations, 4-week pilot sprints, data security standards, and ROI.
          </p>

        </div>

        {/* Foldable Category Index */}
        <div className="border-t border-b border-slate-200 divide-y divide-slate-200">
          {CATEGORIES.map((cat, index) => {
            const questions = FAQ_DATA.filter((faq) => faq.category === cat.id);
            const isCatOpen = openCategory === cat.id;

            return (
              <div key={cat.id}>
                <button
                  onClick={() => toggleCategory(cat.id)}
                  aria-expanded={isCatOpen}
                  className="w-full py-6 sm:py-7 flex items-center justify-between text-left gap-4 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg"
                >
                  <div>
                    <span className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-200">
                      {cat.label}
                    </span>
                  </div>

                  <span
                    className={`flex-shrink-0 w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300 ${
                      isCatOpen
                        ? "border-blue-600 bg-blue-600 text-white rotate-45"
                        : "border-slate-300 text-slate-400 group-hover:border-blue-500 group-hover:text-blue-600 bg-white"
                    }`}
                  >
                    <Plus className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300" />
                  </span>
                </button>

                {/* Category's question list — only rendered while the category is open */}
                <AnimatePresence initial={false}>
                  {isCatOpen && (
                    <motion.div
                      key="category-content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.04, 0.62, 0.23, 0.98] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-4 sm:pb-6 divide-y divide-slate-100">
                        {questions.map((faq) => {
                          const isQOpen = openQuestionId === faq.id;

                          return (
                            <div key={faq.id}>
                              <button
                                onClick={() => toggleQuestion(faq.id)}
                                aria-expanded={isQOpen}
                                className="w-full py-4 sm:py-5 pl-4 sm:pl-8 flex items-center justify-between text-left gap-4 group/question focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg"
                              >
                                <span
                                  className={`text-sm sm:text-base md:text-lg font-medium transition-colors duration-200 ${
                                    isQOpen
                                      ? "text-blue-600"
                                      : "text-slate-800 group-hover/question:text-blue-600"
                                  }`}
                                >
                                  {faq.question}
                                </span>

                                <span
                                  className={`flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 ${
                                    isQOpen
                                      ? "border-blue-600 text-blue-600 rotate-45"
                                      : "border-slate-300 text-slate-400 group-hover/question:border-blue-500 group-hover/question:text-blue-600 bg-white"
                                  }`}
                                >
                                  <Plus className="w-3.5 h-3.5 transition-transform duration-300" />
                                </span>
                              </button>

                              <AnimatePresence initial={false}>
                                {isQOpen && (
                                  <motion.div
                                    key="question-content"
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2, ease: [0.04, 0.62, 0.23, 0.98] }}
                                    className="overflow-hidden"
                                  >
                                    <div className="pb-4 sm:pb-5 pl-4 sm:pl-8 pr-4 sm:pr-10 text-slate-600 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                                      {faq.answer}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Bottom Call to Action Card */}
        <div className="mt-16 sm:mt-20 bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#2563eb] rounded-2xl p-8 sm:p-10 text-white shadow-xl shadow-blue-900/10 border border-blue-400/20 relative overflow-hidden">
          {/* Subtle glow accent */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-xl">
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
                Still have questions?
              </h3>
              <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
                Can't find the exact answer you're looking for? Talk directly with our AI implementation engineers or schedule a free 30-minute scoping consultation.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <a
                href="#book-consultation"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-blue-800 font-semibold text-sm hover:bg-blue-50 transition-all duration-200 shadow-md hover:shadow-lg w-full sm:w-auto text-center"
              >
                <span>Book Free Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-blue-700/50 hover:bg-blue-700/70 text-white border border-blue-400/30 font-medium text-sm transition-all duration-200 w-full sm:w-auto text-center"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default FAQ;
