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
  RotateCcw,
  Plus,
  Eye,
  ShieldCheck,
  Shield,
  Lock,
  Database,
  Users,
  TrendingUp,
  Sparkles,
  Activity,
  Layers,
  AlertTriangle,
  Search,
  Settings,
  Server,
  Copy,
  Terminal,
  ExternalLink,
  MessageCircle,
  ChevronRight
} from 'lucide-react';
import HashLink from '../../../components/ui/SectionLink';

interface CustomAiIntegrationsPageProps {
  onOpenChatbot?: () => void;
}

const CustomAiIntegrationsPage: React.FC<CustomAiIntegrationsPageProps> = ({ onOpenChatbot }) => {
  const navigate = useNavigate();

  // RAG Query Demo State
  const [activeRagQueryIndex, setActiveRagQueryIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'response' | 'json'>('response');
  const [copiedJson, setCopiedJson] = useState(false);
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

  const ragQueries = [
    {
      query: "What's our current enterprise pricing tier?",
      latency: "193ms",
      steps: [
        { label: "1. Embedding query", detail: "text-embedding-3-small (1536 dims)", time: "24ms" },
        { label: "2. Vector index search", detail: "Pinecone enterprise-prod (2,847 docs)", time: "42ms" },
        { label: "3. Retrieved top 4 chunks", detail: "Cosine similarity threshold > 0.88", time: "15ms" },
        { label: "4. Grounded synthesis", detail: "Claude 3.5 Sonnet with JSON schema validation", time: "112ms" }
      ],
      response: "Our current Enterprise tier starts at $2,499/month billed annually. It includes dedicated vector index partitions, 99.99% uptime SLA, SOC2 Type II compliance reports, and custom MCP connectors for internal ERP databases. Volume discounts apply past 10M monthly embedding tokens.",
      sources: [
        { title: "pricing-sheet-2026-v4.pdf", chunk: "Chunk #18", score: "94.2% match", excerpt: "Enterprise Tier pricing structure, dedicated vector namespace allocations, and custom connector licensing..." },
        { title: "notion/sales/enterprise-agreements.md", chunk: "Chunk #03", score: "91.8% match", excerpt: "Standard SLA terms: 99.99% uptime commitment with SOC2 Type II compliance documentation..." },
        { title: "postgres://contracts_prod (Table: tiers)", chunk: "Row #482", score: "89.4% match", excerpt: "Active SKU: ENT-ANNUAL-2026 at $2,499/mo base with volume token tiering past 10M tokens." }
      ],
      rawJson: {
        query: "What's our current enterprise pricing tier?",
        execution_time_ms: 193,
        retrieval: {
          strategy: "hybrid_bm25_dense",
          index: "pinecone-prod-enterprise",
          total_docs_indexed: 2847,
          retrieved_chunks: 4,
          reranker: "cohere-rerank-v3"
        },
        sources: [
          { id: "doc_8492", title: "pricing-sheet-2026-v4.pdf", score: 0.942 },
          { id: "notion_319", title: "enterprise-agreements.md", score: 0.918 },
          { id: "pg_row_482", title: "contracts_prod.tiers", score: 0.894 }
        ],
        response: "Our current Enterprise tier starts at $2,499/month billed annually. It includes dedicated vector index partitions, 99.99% uptime SLA...",
        token_usage: { prompt_tokens: 842, completion_tokens: 94, total_tokens: 936 }
      }
    },
    {
      query: "How does our API authentication handle token revocation?",
      latency: "164ms",
      steps: [
        { label: "1. Embedding query", detail: "text-embedding-3-small (1536 dims)", time: "21ms" },
        { label: "2. Vector index search", detail: "Pgvector security-knowledgebase (1,420 docs)", time: "38ms" },
        { label: "3. Retrieved top 3 chunks", detail: "Cosine similarity threshold > 0.91", time: "12ms" },
        { label: "4. Grounded synthesis", detail: "Claude 3.5 Sonnet with strict code formatting", time: "93ms" }
      ],
      response: "API tokens use an asymmetric JWT structure with a centralized Redis blocklist. When a token is revoked via the /v1/auth/revoke endpoint, its unique jti claim is written to Redis with a TTL matching the token expiry, causing immediate rejection across all edge gateways.",
      sources: [
        { title: "docs/architecture/auth-specification.md", chunk: "Section 4.2", score: "96.5% match", excerpt: "Token revocation strategy: Asymmetric JWT verification paired with Redis Bloom filter and blacklist cache..." },
        { title: "api-gateway/middleware/token_verifier.go", chunk: "Lines 44-78", score: "93.1% match", excerpt: "Redis client check on claims.JTI; immediately returns 401 Unauthorized if key is present..." }
      ],
      rawJson: {
        query: "How does our API authentication handle token revocation?",
        execution_time_ms: 164,
        retrieval: {
          strategy: "dense_semantic_search",
          index: "pgvector-security-kb",
          total_docs_indexed: 1420,
          retrieved_chunks: 3,
          reranker: "none"
        },
        sources: [
          { id: "auth_spec_sec4", title: "auth-specification.md", score: 0.965 },
          { id: "go_middleware_78", title: "token_verifier.go", score: 0.931 }
        ],
        response: "API tokens use an asymmetric JWT structure with a centralized Redis blocklist...",
        token_usage: { prompt_tokens: 680, completion_tokens: 78, total_tokens: 758 }
      }
    },
    {
      query: "What is our SLA for database replication latency?",
      latency: "148ms",
      steps: [
        { label: "1. Embedding query", detail: "text-embedding-3-small (1536 dims)", time: "19ms" },
        { label: "2. Vector index search", detail: "Qdrant devops-runbooks (3,120 docs)", time: "31ms" },
        { label: "3. Retrieved top 3 chunks", detail: "Cosine similarity threshold > 0.89", time: "14ms" },
        { label: "4. Grounded synthesis", detail: "Claude 3.5 Sonnet grounded in SLA runbooks", time: "84ms" }
      ],
      response: "Our production cross-region replication latency SLA is strictly under 500ms for 99.9% of transactions, with active p99 alerting triggered if replication lag exceeds 1.2 seconds across replica clusters.",
      sources: [
        { title: "runbooks/database-replication-sla.md", chunk: "Chunk #08", score: "95.8% match", excerpt: "Primary-replica lag thresholds: target <500ms, alert trigger at 1.2s, automated failover at 5.0s..." },
        { title: "compliance/service-level-agreements.pdf", chunk: "Page 14", score: "92.4% match", excerpt: "Guaranteed recovery point objective (RPO) < 1 sec based on streaming WAL replication..." }
      ],
      rawJson: {
        query: "What is our SLA for database replication latency?",
        execution_time_ms: 148,
        retrieval: {
          strategy: "hybrid_bm25_dense",
          index: "qdrant-devops-runbooks",
          total_docs_indexed: 3120,
          retrieved_chunks: 3,
          reranker: "cohere-rerank-v3"
        },
        sources: [
          { id: "db_sla_08", title: "database-replication-sla.md", score: 0.958 },
          { id: "sla_pdf_14", title: "service-level-agreements.pdf", score: 0.924 }
        ],
        response: "Our production cross-region replication latency SLA is strictly under 500ms for 99.9% of transactions...",
        token_usage: { prompt_tokens: 540, completion_tokens: 65, total_tokens: 605 }
      }
    }
  ];

  const currentRag = ragQueries[activeRagQueryIndex];

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(currentRag.rawJson, null, 2));
    setCopiedJson(true);
    showToast("JSON response copied to clipboard!");
    setTimeout(() => setCopiedJson(false), 2000);
  };

  // Section 2: Problems We Solve
  const problems = [
    {
      badge: "Infrastructure",
      title: "Siloed Corporate Data",
      desc: "Valuable business insights stay locked away in legacy databases, PDFs, and internal drives where AI cannot reach them."
    },
    {
      badge: "Accuracy",
      title: "Hallucinations & Generic Answers",
      desc: "Standard LLM APIs generate false information because they lack access to your real-time inventory, user profiles, or catalog context."
    },
    {
      badge: "Engineering",
      title: "Fragile Pipeline Infrastructure",
      desc: "Writing and hosting scripts to constantly parse, clean, embed, and sync data into a vector search database is difficult to build and scale."
    }
  ];

  // Section 3: What We Deliver
  const deliverables = [
    {
      title: "Advanced ETL & Ingestion",
      desc: "Robust pipelines to parse, chunk, and embed structured or unstructured databases in real-time.",
      icon: Database,
      features: ["Auto chunking algorithms", "Metadata tagging", "Real-time sync listeners"]
    },
    {
      title: "Vector Index Setup",
      desc: "Optimized indexing on databases like Pinecone, Pgvector, or Qdrant for semantic search matching.",
      icon: Layers,
      features: ["Cosine similarity tuning", "Hybrid search indexing", "Scalable namespace partitions"]
    },
    {
      title: "API Middleware & Routing",
      desc: "Secure API middleware wrapping model pipelines, prompting schemas, and validation logic.",
      icon: Settings,
      features: ["Rate limiting & caching", "Input prompt sanitization", "JSON schema validation"]
    },
    {
      title: "Hybrid Search Logic",
      desc: "Combining keyword (BM25) and semantic vector search to return contextually relevant answers.",
      icon: Search,
      features: ["Re-ranking models (cohere/cross-encoders)", "Precision tuning", "Fallback search logic"]
    }
  ];

  // Section 5: Integrations (3 Labeled Groups)
  const integrationGroups = [
    {
      group: "LLM Providers",
      items: [
        { name: "OpenAI", sub: "GPT-4o, o3-mini & Embeddings", icon: "🤖" },
        { name: "Anthropic", sub: "Claude 3.5 Sonnet & Haiku", icon: "🧠" },
        { name: "Google Vertex AI", sub: "Gemini 1.5 Pro & Flash", icon: "☁️" },
        { name: "Mistral & vLLM", sub: "Open-weights & Custom Host", icon: "⚡" }
      ]
    },
    {
      group: "Vector Databases",
      items: [
        { name: "Pinecone", sub: "Serverless & Pod Vector Indexes", icon: "🌲" },
        { name: "Pgvector", sub: "PostgreSQL Native Vector Extensions", icon: "🐘" },
        { name: "Qdrant", sub: "High-Throughput Hybrid Search", icon: "🎯" },
        { name: "Milvus", sub: "Distributed Scale Vector Clusters", icon: "📦" }
      ]
    },
    {
      group: "Data Sources & Destinations",
      items: [
        { name: "PostgreSQL / MySQL", sub: "Relational & Document DBs", icon: "🗄️" },
        { name: "Files & Documents", sub: "PDF, DOCX, CSV, Markdown", icon: "📄" },
        { name: "Cloud Storage", sub: "AWS S3, GCS, Azure Blob", icon: "☁️" },
        { name: "SaaS Tools", sub: "Slack, Notion, HubSpot, Zendesk", icon: "🔗" }
      ]
    }
  ];

  // Section 6: Security & Data Handling (CHANGE 3)
  const securityFeatures = [
    {
      icon: ShieldCheck,
      title: "Input sanitization",
      desc: "Every prompt is sanitized before it reaches a model.",
      badge: "Zero Injection Risk"
    },
    {
      icon: Lock,
      title: "No training on your data",
      desc: "Your data is never used to train public LLM models.",
      badge: "Zero-Retention Agreement"
    },
    {
      icon: Server,
      title: "Deploy in your own cloud",
      desc: "Run entirely within your own cloud environment if required, rather than shared infrastructure.",
      badge: "VPC / On-Premise"
    },
    {
      icon: CheckCircle2,
      title: "Enterprise-grade access control",
      desc: "Secure, permission-based connections to every data source and destination.",
      badge: "RBAC & Audit Trail"
    }
  ];

  // Section 7: FAQs (Website Default Accordion)
  const faqItems = [
    {
      q: "How is our data kept secure?",
      a: "We sanitize input prompts, query local vector stores, and ensure customer data is never used to train public LLM models. We can also deploy within your own cloud environment if required."
    },
    {
      q: "Which vector databases do you use?",
      a: "We build on Pinecone, Pgvector, Qdrant, or Milvus depending on your latency, scale, and database requirements. We can also integrate with existing databases in your infrastructure."
    },
    {
      q: "Will we own the code?",
      a: "Yes—repos, code, custom prompt logic, and vector setup configuration belong entirely to you. We provide full documentation and handover support."
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Toast Notification */}
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
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 right-1/4 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-3xl" />
          <div className="absolute top-1/3 -left-20 w-[420px] h-[420px] bg-indigo-50/50 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            
            {/* Left Column: Hero Text */}
            <div className="lg:col-span-6 space-y-7 text-left">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/70 text-[#2563eb] text-xs sm:text-sm font-semibold tracking-wide"
              >
                <Code className="w-4 h-4 text-[#2563eb]" />
                <span>Custom AI Integrations & API Pipelines</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-slate-950 tracking-tight leading-[1.08]"
              >
                AI in your apps. <br className="hidden sm:inline" />
                <span className="text-[#2563eb]">Secure & Seamless.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg sm:text-xl text-slate-600 max-w-xl font-normal leading-relaxed"
              >
                Connect LLMs directly to your software infrastructure, APIs, and databases. We build custom RAG pipelines and semantic engines tailored to your data.
              </motion.p>

              {/* CTA Button: Talk to our team */}
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
                    <span>Talk to our team</span>
                    <ArrowRight className="w-5 h-5 text-white/90 shrink-0" />
                  </HashLink>
                </motion.div>
              </motion.div>

              {/* 3 Value Pillars below CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-6 border-t border-slate-100"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2563eb] shrink-0">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Enterprise-grade</h4>
                    <p className="text-xs text-slate-500">Security & compliance</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2563eb] shrink-0">
                    <Database className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Existing stack</h4>
                    <p className="text-xs text-slate-500">Works with your DBs</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2563eb] shrink-0">
                    <Zap className="w-5 h-5 fill-[#2563eb]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Built for prod</h4>
                    <p className="text-xs text-slate-500">Low latency & high scale</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Hero Graphic (pipeline-orchestrator.io illustration) */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-6 relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-100/90 bg-white group hover:shadow-3xl transition-shadow duration-500 aspect-[1716/916]">
                <img
                  src="/images/services/custom-ai/hero-pipeline-mockup.webp"
                  alt="Custom AI Pipeline orchestrator with OpenAI, Claude, Vector DB, Google Cloud Vertex, Slack, Notion, and HubSpot"
                  className="w-full h-full object-contain block group-hover:scale-[1.01] transition-transform duration-500"
                  loading="eager"
                />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: PROBLEMS WE SOLVE (Image 2 Reference)                           */}
      {/* ========================================================================= */}
      <section className="py-24 bg-[#f8faff] border-t border-slate-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100/70 border border-blue-200/60 text-[#2563eb] text-xs font-bold uppercase tracking-wider mb-4">
            <Activity className="w-3.5 h-3.5" />
            <span>REAL CHALLENGES. REAL SOLUTIONS.</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight mb-4">
            Problems We <span className="text-[#2563eb]">Solve</span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-16">
            Connecting your core data to modern AI models safely
          </p>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            {problems.map((prob, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-8 sm:p-9 border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col items-center group"
              >
                <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {idx === 0 && <Database className="w-7 h-7" />}
                  {idx === 1 && <Shield className="w-7 h-7" />}
                  {idx === 2 && <Settings className="w-7 h-7" />}
                </div>

                <span className="px-3 py-1 rounded-full bg-red-50 text-red-700 text-xs font-bold uppercase tracking-wider mb-4">
                  {prob.badge}
                </span>

                <h3 className="text-2xl font-bold text-slate-950 mb-3 leading-snug">
                  {prob.title}
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed">
                  {prob.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: WHAT WE DELIVER (Image 3 Reference)                             */}
      {/* ========================================================================= */}
      <section className="py-24 bg-white border-t border-slate-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-start">
            
            {/* Left Column: Heading + 3D Pipeline Cube Illustration */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="inline-block px-3.5 py-1 mb-4 text-xs font-bold uppercase tracking-wider text-[#2563eb] bg-blue-50 border border-blue-200/70 rounded-full">
                  What We Deliver
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
                  Production-ready <br className="hidden sm:inline" />
                  <span className="text-[#2563eb]">AI pipes.</span>
                </h2>
                <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
                  We design and build clean ETL ingestion, secure database sync modules, and middleware API endpoints that seamlessly integrate AI into your products.
                </p>
              </div>

              {/* High-res 3D Cube Graphic from deliver-pipeline-cube.webp */}
              <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-200/80 bg-white group hover:shadow-2xl transition-shadow duration-300 aspect-[1679/937]">
                <img
                  src="/images/services/custom-ai/deliver-pipeline-cube.webp"
                  alt="AI Pipeline architecture with multi-source ingestion and output routing"
                  className="w-full h-full object-contain block group-hover:scale-[1.01] transition-transform duration-300"
                  loading="lazy"
                />
              </div>

              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200/70 flex items-center justify-between text-xs font-semibold text-blue-950">
                <span>Secure • Scalable • Production Ready</span>
                <CheckCircle2 className="w-4 h-4 text-[#2563eb]" />
              </div>
            </div>

            {/* Right Column: 4 Deliverable Cards */}
            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
              {deliverables.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={index}
                    className="p-7 rounded-3xl border border-slate-200/80 bg-[#fcfdff] hover:bg-white hover:border-blue-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-[#1d4ed8] text-white flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-950 mb-2 leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>

                    <ul className="space-y-2 pt-4 border-t border-slate-100">
                      {item.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                          <CheckCircle2 className="w-4 h-4 text-[#2563eb] shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: SEE A RAG QUERY IN ACTION (CHANGE 1 - 🆕 Live Demo)              */}
      {/* ========================================================================= */}
      <section className="py-24 bg-[#f8faff] border-t border-slate-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100/70 border border-blue-200/60 text-[#2563eb] text-xs font-bold uppercase tracking-wider mb-4">
              <Zap className="w-3.5 h-3.5 fill-[#2563eb]" />
              <span>LIVE DEMO</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight mb-4">
              See a RAG Query <span className="text-[#2563eb]">in Action</span>
            </h2>
            <p className="text-lg sm:text-xl text-slate-600">
              Watch a query go from question to grounded answer, with the retrieval step visible.
            </p>
          </div>

          {/* Interactive Query Selector Chips */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10 max-w-4xl mx-auto">
            {ragQueries.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveRagQueryIndex(idx);
                }}
                className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all cursor-pointer border ${
                  activeRagQueryIndex === idx
                    ? 'bg-[#1d4ed8] text-white border-[#1d4ed8] shadow-md shadow-blue-500/15'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300 hover:bg-blue-50/50'
                }`}
              >
                "{item.query}"
              </button>
            ))}
          </div>

          {/* Demo Terminal / Inspector Window */}
          <div className="max-w-5xl mx-auto rounded-3xl border border-slate-200/90 shadow-2xl overflow-hidden bg-white">
            
            {/* Top Chrome Bar */}
            <div className="px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/80">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-400 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
                </div>
                <span className="font-mono text-xs text-slate-500 pl-2">
                  rag-pipeline-inspector.internal
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {currentRag.latency}
                </span>
              </div>

              {/* Tab Switcher */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('response')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'response'
                      ? 'bg-[#1d4ed8] text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Grounded Output & Sources
                </button>
                <button
                  onClick={() => setActiveTab('json')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'json'
                      ? 'bg-[#1d4ed8] text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>View API Response</span>
                </button>
              </div>
            </div>

            {/* Content Body */}
            {activeTab === 'response' ? (
              <div className="p-6 sm:p-8 space-y-8">
                
                {/* Step-by-Step Retrieval Execution Log */}
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-[#2563eb]" />
                    <span>Real-Time Execution Trace</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {currentRag.steps.map((st, i) => (
                      <div key={i} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1 text-xs">
                        <div className="flex items-center justify-between font-bold text-slate-900">
                          <span>{st.label}</span>
                          <span className="text-blue-600 font-mono text-[11px]">{st.time}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 truncate">{st.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Grounded Response Box */}
                <div className="p-6 rounded-2xl bg-[#f0f7ff] border border-blue-200/80 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-[#1d4ed8] uppercase tracking-wider">
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      Grounded Answer (Zero Hallucination)
                    </span>
                    <span className="text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/80 text-[11px]">
                      ✓ 100% Verified Citations
                    </span>
                  </div>
                  <p className="text-sm sm:text-base text-slate-900 leading-relaxed font-medium">
                    "{currentRag.response}"
                  </p>
                </div>

                {/* Sources Citation List (Reuse Citation UI Pattern) */}
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Grounding Sources ({currentRag.sources.length} Documents Retrieved)
                  </div>
                  <div className="space-y-2.5">
                    {currentRag.sources.map((src, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-white border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 font-bold text-slate-900">
                            <FileText className="w-4 h-4 text-[#2563eb]" />
                            <span>{src.title}</span>
                            <span className="text-slate-400 font-normal">({src.chunk})</span>
                          </div>
                          <p className="text-slate-500 italic text-[11px]">"{src.excerpt}"</p>
                        </div>
                        <span className="inline-block px-2.5 py-1 rounded-full bg-blue-50 text-[#1d4ed8] font-mono font-bold text-[11px] shrink-0">
                          {src.score}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ) : (
              /* Raw JSON View Tab */
              <div className="p-6 sm:p-8 bg-slate-950 text-slate-100 font-mono text-xs overflow-x-auto relative">
                <button
                  onClick={handleCopyJson}
                  className="absolute top-6 right-6 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center gap-1.5 text-xs transition-colors cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedJson ? "Copied!" : "Copy JSON"}</span>
                </button>
                <pre className="text-emerald-400 max-w-full overflow-x-auto whitespace-pre-wrap break-words">
                  {JSON.stringify(currentRag.rawJson, null, 2)}
                </pre>
              </div>
            )}

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: STANDALONE INTEGRATIONS (CHANGE 2 - 3 Labeled Groups)           */}
      {/* ========================================================================= */}
      <section className="py-24 bg-white border-t border-slate-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100/70 border border-blue-200/60 text-[#2563eb] text-xs font-bold uppercase tracking-wider mb-4">
              <Layers className="w-3.5 h-3.5" />
              <span>COMPATIBILITY</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight mb-4">
              Integrations
            </h2>
            <p className="text-lg sm:text-xl text-slate-600">
              Works with the LLM providers, vector databases, and data sources you already use.
            </p>
          </div>

          {/* 3 Labeled Groups */}
          <div className="space-y-12 max-w-6xl mx-auto">
            {integrationGroups.map((grp, gIdx) => (
              <div key={gIdx} className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#2563eb]" />
                  <span>{grp.group}</span>
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {grp.items.map((item, iIdx) => (
                    <div
                      key={iIdx}
                      className="p-3.5 sm:p-5 rounded-2xl bg-[#fcfdff] border border-slate-200/80 hover:border-blue-300 hover:bg-white hover:shadow-md transition-all flex flex-col justify-between group"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl group-hover:scale-110 transition-transform">{item.icon}</span>
                        <span className="font-bold text-slate-900 text-sm sm:text-base">{item.name}</span>
                      </div>
                      <p className="text-[11px] text-slate-500">{item.sub}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Checklist Banner */}
          <div className="mt-14 max-w-4xl mx-auto p-5 rounded-2xl bg-blue-50/60 border border-blue-200/70 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm font-semibold text-blue-950">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#2563eb]" />
              <span>Secure, permission-based access</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#2563eb]" />
              <span>Works with your existing infrastructure</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#2563eb]" />
              <span>Custom integrations via API</span>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6: SECURITY & DATA HANDLING (CHANGE 3 - 🆕 Section)                */}
      {/* ========================================================================= */}
      <section className="py-24 bg-[#f8faff] border-t border-slate-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100/70 border border-blue-200/60 text-[#2563eb] text-xs font-bold uppercase tracking-wider mb-4">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>ENTERPRISE SECURITY</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight mb-4">
              Security & Data Handling
            </h2>
            <p className="text-lg sm:text-xl text-slate-600">
              Your data stays yours — in your infrastructure, never used to train anyone else's model.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {securityFeatures.map((sec, idx) => {
              const Icon = sec.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2563eb] mb-5 group-hover:scale-110 group-hover:bg-[#1d4ed8] group-hover:text-white transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[11px] font-semibold tracking-wide uppercase mb-3">
                      {sec.badge}
                    </span>
                    <h3 className="text-xl font-bold text-slate-950 mb-2.5 leading-snug">
                      {sec.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {sec.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 7: KPIS WE TRACK + FAQS (Image 4 Reference)                        */}
      {/* ========================================================================= */}
      <section className="py-24 bg-white border-t border-slate-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-start">
            
            {/* Left Column: KPIs We Track Graphic */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100/70 border border-blue-200/60 text-[#2563eb] text-xs font-bold uppercase tracking-wider mb-3">
                  <Activity className="w-3.5 h-3.5" />
                  <span>MEASURE WHAT MATTERS</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
                  KPIs We <span className="text-[#2563eb]">Track</span>
                </h2>
                <p className="text-base sm:text-lg text-slate-600 mt-2 font-normal">
                  End-to-end visibility into performance, reliability, and security.
                </p>
              </div>

              {/* High-res Graphic Card for KPIs */}
              <div className="rounded-3xl overflow-hidden border border-slate-200/80 shadow-lg bg-white group hover:shadow-xl transition-shadow duration-300 aspect-[1241/1268]">
                <img
                  src="/images/services/custom-ai/kpis-we-track.webp"
                  alt="KPIs We Track: Query Latency <200ms, Retrieval Accuracy 98.5%, Data Sync Uptime 99.9%, API Security 99.9%"
                  className="w-full h-full object-contain block group-hover:scale-[1.01] transition-transform duration-300"
                  loading="lazy"
                />
              </div>

              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200/70 flex items-center justify-between text-xs text-blue-900 font-semibold">
                <span>Real-time Datadog / OpenTelemetry metrics exported natively.</span>
                <CheckCircle2 className="w-4 h-4 text-[#2563eb]" />
              </div>
            </div>

            {/* Right Column: Frequently Asked Questions */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100/70 border border-blue-200/60 text-[#2563eb] text-xs font-bold uppercase tracking-wider mb-3">
                  <span>❓ ANSWERS YOU NEED</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
                  Frequently Asked <span className="text-[#2563eb]">Questions</span>
                </h2>
                <p className="text-base sm:text-lg text-slate-600 mt-2 font-normal">
                  Quick answers to common questions
                </p>
              </div>

              {/* Website Default Accordion with Rotating + */}
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

              {/* Bottom Support Banner */}
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
      {/* SECTION 8: PROTOTYPE AN APP IN 4-6 WEEKS (Image 5 Reference + Final Closer)*/}
      {/* ========================================================================= */}
      <section className="relative py-20 sm:py-28 overflow-hidden bg-[#f8faff] border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          
          {/* Shared Prototype Closer Graphic with Interactive Clickable Hotspots */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 bg-white group aspect-[1944/809]">
            <img
              src="/images/services/lightweight-apps/prototype.png"
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

            {/* Mobile Fallback Buttons */}
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

export default CustomAiIntegrationsPage;
