import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageSquare, CheckCircle2, Sparkles, Zap, Phone, Settings, Database, Search, Layers, Shield, BarChart3, Code, Monitor, Star, Upload } from 'lucide-react';
import CustomAiIntegrationsRichCard from "../../../components/home/CustomAiIntegrationsRichCard";
import HashLink from '../../../components/ui/SectionLink';

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: "easeOut" }
};

interface CustomAiIntegrationsPageProps {
  onOpenChatbot?: () => void;
}

const CustomAiIntegrationsPage: React.FC<CustomAiIntegrationsPageProps> = ({ onOpenChatbot }) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handle4WeekPilotBtn = () => {
    navigate("/pilot");
  };

  const handleTryDemo = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onOpenChatbot) {
      onOpenChatbot();
    }
  };

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

  const kpis = [
    "Query Latency (< 200ms)", "Retrieval Accuracy", "Data Sync Uptime", "API Security & Uptime"
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden bg-white">
        <div className="absolute inset-0">
          <motion.div 
            className="absolute top-0 right-0 bg-gray-100 rounded-full w-96 h-96 blur-3xl opacity-30"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.3, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          <motion.div 
            className="absolute bottom-0 left-0 rounded-full w-80 h-80 bg-gray-50 blur-3xl opacity-20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.2, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
          />
        </div>
        
        <div className="relative px-6 mx-auto max-w-7xl">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <motion.div 
              className="space-y-10"
              initial="initial"
              animate="animate"
              variants={staggerContainer}
            >
              <motion.div 
                className="inline-flex items-center gap-2 px-6 py-3 text-blue-900 bg-blue-100 rounded-full"
                variants={scaleIn}
              >
                <Code className="w-5 h-5" />
                <span className="font-medium">Custom AI Integrations & API Pipelines</span>
              </motion.div>
              
              <motion.h1 
                className="text-6xl font-bold leading-tight text-black lg:text-7xl"
                variants={fadeInUp}
              >
                AI in your apps. <span className="text-blue-900">Secure & Seamless.</span>
              </motion.h1>
              
              <motion.p 
                className="text-2xl leading-relaxed text-gray-700"
                variants={fadeInUp}
              >
                Connect LLMs directly to your software infrastructure, APIs, and databases. We build custom RAG pipelines and semantic engines tailored to your data.
              </motion.p>
              
              <motion.div 
                className="flex flex-col gap-4 sm:flex-row"
                variants={fadeInUp}
              >
                <motion.div 
                  className="flex flex-col gap-4 sm:flex-row"
                  variants={fadeInUp}
                >
                  <div className="flex flex-col items-center">
                    <div className="relative flex flex-col items-center">
                      {message && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                          className="absolute max-w-md px-4 py-2 mt-20 text-sm text-center text-gray-700 bg-gray-100 rounded-lg shadow-md ml-52 w-max"
                        >
                          {message}
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
            
            {/* Live custom AI integration card preview */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            >
              <CustomAiIntegrationsRichCard className="w-full max-w-xl mx-auto" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problems We Solve */}
      <section className="py-20 bg-gray-50">
        <div className="px-6 mx-auto max-w-7xl">
          <motion.div 
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="mb-4 text-4xl font-bold text-black">
              Problems We <span className="text-blue-900">Solve</span>
            </h2>
            <p className="text-xl text-gray-700">Connecting your core data to modern AI models safely</p>
          </motion.div>
          
          <motion.div 
            className="grid gap-8 lg:grid-cols-3"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* Siloed Data */}
            <motion.div 
              className="relative p-8 rounded-2xl hover:bg-white hover:border hover:border-gray-200"
              variants={scaleIn}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <div className="flex flex-col items-center text-center">
                <motion.div 
                  className="flex items-center justify-center w-20 h-20 mb-4 bg-red-100 rounded-2xl"
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <Database className="w-8 h-8 text-red-500" />
                </motion.div>
                <div className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium text-red-700 bg-red-100 rounded-full">
                  Infrastructure
                </div>
                <h3 className="mb-3 text-xl font-bold text-black">Siloed Corporate Data</h3>
                <p className="leading-relaxed text-gray-600">
                  Valuable business insights stay locked away in legacy databases, PDFs, and internal drives where AI cannot reach them.
                </p>
              </div>
            </motion.div>

            {/* Hallucinations */}
            <motion.div 
              className="relative p-8 rounded-2xl hover:bg-white hover:border hover:border-gray-200"
              variants={scaleIn}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <div className="flex flex-col items-center text-center">
                <motion.div 
                  className="flex items-center justify-center w-20 h-20 mb-4 bg-red-100 rounded-2xl"
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <Shield className="w-8 h-8 text-red-500" />
                </motion.div>
                <div className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium text-red-700 bg-red-100 rounded-full">
                  Accuracy
                </div>
                <h3 className="mb-3 text-xl font-bold text-black">Hallucinations & Generic Answers</h3>
                <p className="leading-relaxed text-gray-600">
                  Standard LLM APIs generate false information because they lack access to your real-time inventory, user profiles, or catalog context.
                </p>
              </div>
            </motion.div>

            {/* Pipeline Maintenance */}
            <motion.div 
              className="relative p-8 rounded-2xl hover:bg-white hover:border hover:border-gray-200"
              variants={scaleIn}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <div className="flex flex-col items-center text-center">
                <motion.div 
                  className="flex items-center justify-center w-20 h-20 mb-4 bg-red-100 rounded-2xl"
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <Settings className="w-8 h-8 text-red-500" />
                </motion.div>
                <div className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium text-red-700 bg-red-100 rounded-full">
                  Engineering
                </div>
                <h3 className="mb-3 text-xl font-bold text-black">Fragile Pipeline Infrastructure</h3>
                <p className="leading-relaxed text-gray-600">
                  Writing and hosting scripts to constantly parse, clean, embed, and sync data into a vector search database is difficult to build and scale.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Deliverables Section */}
      <section className="py-24 bg-white">
        <div className="px-6 mx-auto max-w-7xl">
          <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col justify-center"
            >
              <span className="inline-block px-4 py-2 mb-6 text-sm font-bold text-blue-900 bg-blue-100 rounded-full w-fit">
                What We Deliver
              </span>
              <h2 className="mb-6 text-5xl font-bold leading-tight text-black">
                Production-ready <span className="text-blue-900">AI pipes.</span>
              </h2>
              <p className="text-xl leading-relaxed text-gray-700">
                We design and build clean ETL ingestion, secure database sync modules, and middleware API endpoints that seamlessly integrate AI into your products.
              </p>
            </motion.div>

            <div className="grid gap-8 sm:grid-cols-2">
              {deliverables.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <motion.div 
                    key={index}
                    className="p-8 border-2 border-gray-100 bg-gray-50/50 rounded-3xl hover:border-blue-200 hover:bg-white hover:shadow-xl transition-all duration-300"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
                  >
                    <div className="flex items-center justify-center w-12 h-12 mb-6 text-white rounded-xl bg-blue-900">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h3 className="mb-3 text-2xl font-bold text-black">{item.title}</h3>
                    <p className="mb-6 text-gray-600">{item.desc}</p>
                    <ul className="space-y-2">
                      {item.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-blue-900 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* KPIs & FAQs */}
      <section className="py-24 bg-gray-50">
        <div className="px-6 mx-auto max-w-7xl">
          <div className="grid gap-20 lg:grid-cols-2">
            {/* KPIs */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="mb-10 text-4xl font-bold text-black">
                KPIs We <span className="text-blue-900">Track</span>
              </h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {kpis.map((kpi, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-center gap-4 p-6 transition-all duration-300 bg-white border-2 border-gray-200 rounded-2xl hover:border-blue-300 hover:shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
                    whileHover={{ x: 8 }}
                  >
                    <BarChart3 className="w-6 h-6 text-blue-900" />
                    <span className="font-medium text-black">{kpi}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* FAQs */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="mb-10 text-4xl font-bold text-black">
                Frequently Asked <span className="text-blue-900">Questions</span>
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {[
                  { q: "How is our data kept secure?", a: "We sanitize input prompts, query local vector stores, and ensure customer data is never used to train public LLM models." },
                  { q: "Which vector databases do you use?", a: "We build on Pinecone, Pgvector, Qdrant, or Milvus depending on your latency and database requirements." },
                  { q: "Will we own the code?", a: "Yes—repos, code, custom prompt logic, and vector setup configuration belong entirely to you." }
                ].map((faq, index) => (
                  <motion.div 
                    key={index}
                    className="p-6 bg-white border-2 border-gray-200 rounded-2xl hover:shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
                    whileHover={{ y: -4 }}
                  >
                    <h3 className="mb-2 text-xl font-bold text-blue-900">{faq.q}</h3>
                    <p className="text-black">{faq.a}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-24 overflow-hidden text-black bg-white">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 bg-blue-100 rounded-full w-96 h-96 opacity-20 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 rounded-full w-80 h-80 bg-blue-50 opacity-10 blur-3xl"></div>
        </div>
        
        <div className="relative max-w-5xl px-6 mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div 
              className="inline-flex items-center gap-3 px-8 py-4 mb-8 bg-blue-100 border-2 border-blue-200 rounded-full backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            >
              <Code className="w-6 h-6 text-blue-900" />
              <span className="font-semibold text-blue-900">Ready to build?</span>
            </motion.div>
            
            <motion.h2 
              className="mb-8 text-4xl font-bold text-black lg:text-5xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            >
              Integrate custom AI in <span className="text-blue-900">4–6 weeks</span>
            </motion.h2>
            
            <motion.p 
              className="max-w-3xl mx-auto mb-12 text-xl leading-relaxed text-gray-700"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
            >
              Connect models to your database catalog, customer service, or internal wikis with production-grade vector search and APIs.
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="flex flex-col justify-center gap-6 mb-12 sm:flex-row"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <button
                type="button"
                onClick={handle4WeekPilotBtn}
                className="flex items-center justify-center w-auto gap-3 px-10 py-5 text-lg font-semibold text-white transition-colors bg-blue-900 rounded-2xl hover:bg-blue-800"
              >
                <Zap className="w-5 h-5" />
                Prototype an integration in 4–6 weeks
              </button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <HashLink 
                smooth 
                to="/book-consultation"
                className="flex items-center justify-center gap-2 px-8 py-4 text-lg font-bold text-blue-900 transition-all duration-300 bg-white border-2 border-blue-900 shadow-lg rounded-xl hover:bg-blue-50 hover:border-blue-800"
              >
                <Phone className="w-5 h-5" />
                Book a scoping call
              </HashLink>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="grid max-w-3xl gap-8 mx-auto sm:grid-cols-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 1.0 }}
          >
            <div className="flex items-center justify-center gap-3 text-lg text-black">
              <CheckCircle2 className="w-6 h-6 text-blue-900" />
              <span>Secure pipeline sync</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-lg text-black">
              <CheckCircle2 className="w-6 h-6 text-blue-900" />
              <span>100% Code ownership</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-lg text-black">
              <CheckCircle2 className="w-6 h-6 text-blue-900" />
              <span>Enterprise-ready</span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CustomAiIntegrationsPage;
