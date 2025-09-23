import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, CheckCircle2, Bot, Sparkles, Zap, ArrowRight, Users, Clock, Target, Eye, Brain, TrendingUp, DollarSign, BarChart3, Shield, FileText, Headphones, Play, Calendar, Phone, MessageCircle, Settings, Database, GitBranch, Workflow, Search, CheckSquare, AlertTriangle, Activity, Layers, Mail, Upload, Bell, Slack, Filter, AlertCircle, RefreshCw, Lock, RotateCcw, Monitor, Code, Star, CreditCard } from 'lucide-react';
import LightweightAIAppsVideo from "../../../videos/LightweightAIApps.mp4"

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, ease: "easeOut" }
};

const fadeInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 1, ease: "easeOut" }
};

const fadeInRight = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
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

const AiAppsPage = () => {
  const [currentModule, setCurrentModule] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const appModules = [
    { 
      title: "Docs → Insights", 
      flow: "Upload → Summarise → Tag → Export",
      icon: FileText,
      color: "from-blue-900 to-blue-800" 
    },
    { 
      title: "Leads → Outreach", 
      flow: "Enrich → Draft → Approve → Send/Log",
      icon: TrendingUp,
      color: "from-blue-900 to-blue-800" 
    },
    { 
      title: "Support Triage", 
      flow: "Cluster → Prioritise → Route → Report",
      icon: Headphones,
      color: "from-blue-900 to-blue-800" 
    }
  ];

  const demoPrompts = [
    "Upload three PDFs and extract a 10-point brief",
    "Draft a personalised email and log to CRM for review",
    "Approve these five actions and export a CSV"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentModule((prev) => {
        if (prev < appModules.length - 1) {
          setIsProcessing(true);
          setTimeout(() => setIsProcessing(false), 800);
          return prev + 1;
        }
        return 0;
      });
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const whenThisShines = [
    { 
      title: "Portal or internal app", 
      desc: "For one job: summarise, tag, route, approve",
      icon: Monitor 
    },
    { 
      title: "Demo product", 
      desc: "To validate demand (micro-SaaS)",
      icon: Star 
    },
    { 
      title: "Clean front-end", 
      desc: "On top of messy processes",
      icon: Code 
    }
  ];

  const deliverables = [
    { 
      title: "UI", 
      desc: "Clean dashboard with auth, roles, and audit logs", 
      icon: Monitor,
      features: ["User authentication", "Role-based access", "Activity tracking"]
    },
    { 
      title: "Core Actions", 
      desc: "The 2–3 things staff must do in one click", 
      icon: Zap,
      features: ["One-click workflows", "Bulk operations", "Quick approvals"]
    },
    { 
      title: "Content Ops", 
      desc: "Doc prep pipelines, tagging, status states", 
      icon: FileText,
      features: ["Document processing", "Auto-tagging", "Status tracking"]
    },
    { 
      title: "Billing (Optional)", 
      desc: "Stripe for paid tiers; feature flags", 
      icon: CreditCard,
      features: ["Payment processing", "Subscription tiers", "Usage limits"]
    }
  ];

  const guardrails = [
    "User roles", "Action previews", "Rate limits", "Rollback plan", "Health checks"
  ];

  const kpis = [
    "Task completion time", "Adoption %", "Weekly active users", "Error rate"
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
                <span className="font-medium">Lightweight AI Apps & Micro-SaaS</span>
              </motion.div>
              
              <motion.h1 
                className="text-6xl font-bold leading-tight text-black lg:text-7xl"
                variants={fadeInUp}
              >
                Small apps. <span className="text-blue-900">Real impact.</span>
              </motion.h1>
              
              <motion.p 
                className="text-2xl leading-relaxed text-gray-700"
                variants={fadeInUp}
              >
                Internal tools and micro-SaaS that ship in weeks—with the exact actions your team needs and nothing you don't.
              </motion.p>
              
              <motion.div 
                className="flex flex-col gap-4 sm:flex-row"
                variants={fadeInUp}
              >
                <motion.button 
                  className="flex items-center justify-center gap-3 px-10 py-5 text-xl font-semibold text-white transition-colors bg-blue-900 rounded-2xl hover:bg-blue-800"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Monitor className="w-6 h-6" />
                  See app examples
                </motion.button>
                <motion.button 
                  className="flex items-center justify-center gap-3 px-10 py-5 text-xl font-semibold text-blue-900 transition-colors bg-white border-2 border-blue-900 rounded-2xl hover:bg-blue-50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Phone className="w-6 h-6" />
                  Start a scoping call
                </motion.button>
              </motion.div>
            </motion.div>
            
            {/* App Dashboard Mock */}
          {/* Video Demo Section */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            >
              <div className="relative overflow-hidden bg-black shadow-2xl rounded-3xl aspect-video">
                <video
                  className="object-cover w-full h-full"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src={LightweightAIAppsVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* When This Shines */}
      <section className="py-24 bg-gray-50">
        <div className="px-6 mx-auto max-w-7xl">
          <motion.div 
            className="mb-20 text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="mb-6 text-5xl font-bold text-black">
              When This <span className="text-blue-900">Shines</span>
            </h2>
            <p className="text-2xl text-gray-700">Perfect scenarios for lightweight AI applications</p>
          </motion.div>
          
          <div className="grid gap-12 lg:grid-cols-3">
            {whenThisShines.map((item, index) => (
              <motion.div 
                key={index}
                className="p-8 transition-all duration-300 bg-white rounded-3xl hover:bg-blue-50 hover:shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <div className="flex items-center justify-center w-16 h-16 mb-6 bg-blue-900 rounded-3xl">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="mb-4 text-2xl font-bold text-blue-900">{item.title}</h3>
                <p className="text-lg leading-relaxed text-black">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Deliver */}
      <section className="py-24 bg-white">
        <div className="px-6 mx-auto max-w-7xl">
          <motion.div 
            className="mb-20 text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="mb-6 text-5xl font-bold text-black">
              What We <span className="text-blue-900">Deliver</span>
            </h2>
            <p className="text-2xl text-gray-700">Complete app solution with all essential components</p>
          </motion.div>
          
          <div className="grid gap-12 lg:grid-cols-2">
            {deliverables.map((item, index) => (
              <motion.div 
                key={index}
                className="p-10 transition-all duration-300 bg-white border border-gray-200 rounded-3xl hover:shadow-xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <div className="flex items-start gap-6">
                  <div className="flex items-center justify-center w-16 h-16 bg-blue-900 rounded-3xl">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-4 text-3xl font-bold text-blue-900">{item.title}</h3>
                    <p className="mb-6 text-lg leading-relaxed text-black">{item.desc}</p>
                    <ul className="space-y-2">
                      {item.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-blue-900" />
                          <span className="text-black">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Example Modules */}
      <section className="py-24 bg-gray-50">
        <div className="px-6 mx-auto max-w-7xl">
          <motion.div 
            className="mb-20 text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="mb-6 text-5xl font-bold text-black">
              Example <span className="text-blue-900">Modules</span>
            </h2>
            <p className="text-2xl text-gray-700">Ready-to-ship workflow templates</p>
          </motion.div>
          
          <div className="grid gap-8 lg:grid-cols-3">
            {appModules.map((module, index) => (
              <motion.div 
                key={index}
                className="overflow-hidden bg-white border border-gray-200 rounded-3xl hover:shadow-xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <div className={`p-8 text-white bg-gradient-to-r ${module.color}`}>
                  <div className="flex items-center gap-4 mb-4">
                    <module.icon className="w-10 h-10" />
                    <h3 className="text-2xl font-bold">{module.title}</h3>
                  </div>
                </div>
                <div className="p-8">
                  <div className="p-4 rounded-2xl bg-blue-50">
                    <p className="font-medium text-black">{module.flow}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo & Preview */}
      <section className="py-24 bg-white">
        <div className="px-6 mx-auto max-w-7xl">
          <div className="grid gap-16 lg:grid-cols-2">
            {/* Demo Prompts */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="mb-10 text-4xl font-bold text-black">
                Try These <span className="text-blue-900">Workflows</span>
              </h2>
              <div className="space-y-6">
                {demoPrompts.map((prompt, index) => (
                  <motion.button 
                    key={index}
                    className="w-full p-8 text-left transition-all duration-300 border-2 border-gray-200 rounded-3xl hover:border-blue-300 hover:bg-blue-50 hover:shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-start gap-6">
                      <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-2xl">
                        <Play className="w-6 h-6 text-blue-900" />
                      </div>
                      <div>
                        <p className="text-xl font-medium text-black">"{prompt}"</p>
                        <p className="mt-2 text-gray-700">Click to see app workflow</p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
            
            {/* Action Preview UI */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="mb-10 text-4xl font-bold text-black">
                Preview <span className="text-blue-900">Actions</span>
              </h2>
              <div className="p-8 bg-white border-2 border-gray-200 shadow-xl rounded-3xl">
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Eye className="w-6 h-6 text-blue-900" />
                    <span className="text-xl font-bold text-blue-900">Action Preview</span>
                  </div>
                  <p className="text-black">Review before executing</p>
                </div>
                
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="p-4 border rounded-2xl bg-gray-50">
                    <h4 className="mb-2 font-semibold text-black">Before</h4>
                    <div className="text-sm text-gray-700">
                      Raw document text...<br/>
                      Unstructured data...<br/>
                      Multiple formats...
                    </div>
                  </div>
                  <div className="p-4 border border-blue-200 rounded-2xl bg-blue-50">
                    <h4 className="mb-2 font-semibold text-blue-900">After</h4>
                    <div className="text-sm text-black">
                      • Summary: 3 key points<br/>
                      • Tags: urgent, finance<br/>
                      • Status: ready for review
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <button className="flex-1 px-6 py-4 font-semibold text-white transition-colors bg-blue-900 rounded-2xl hover:bg-blue-800">
                    ✓ Approve Action
                  </button>
                  <button className="px-6 py-4 font-semibold text-gray-600 transition-colors bg-gray-100 rounded-2xl hover:bg-gray-200">
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Build Plan & Guardrails */}
      <section className="py-24 bg-gray-50">
        <div className="px-6 mx-auto max-w-7xl">
          <div className="grid gap-20 lg:grid-cols-2">
            {/* Build Plan */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="mb-10 text-4xl font-bold text-black">
                Build Plan <span className="text-blue-900">(4–6 weeks)</span>
              </h2>
              <div className="p-8 border-2 border-blue-200 rounded-3xl bg-blue-50">
                <div className="space-y-6">
                  <div className="p-6 bg-white rounded-2xl">
                    <h3 className="mb-2 text-xl font-bold text-blue-900">Sprint 1-2: MVP</h3>
                    <p className="text-black">Core functionality and basic UI</p>
                  </div>
                  <div className="p-6 bg-white rounded-2xl">
                    <h3 className="mb-2 text-xl font-bold text-blue-900">Sprint 3 (Optional): Polish</h3>
                    <p className="text-black">Billing, advanced roles, detailed reports</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Guardrails */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="mb-10 text-4xl font-bold text-blue-900">
                Guardrails
              </h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {guardrails.map((guardrail, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-center gap-4 p-6 transition-all duration-300 bg-white rounded-2xl hover:bg-blue-50 hover:shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
                    whileHover={{ x: 8 }}
                  >
                    <Shield className="w-6 h-6 text-blue-900" />
                    <span className="font-medium text-black">{guardrail}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* KPIs & FAQs */}
      <section className="py-24 bg-white">
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
                  { q: "Can this become a product?", a: "Yes—start internal; externalise when ready." },
                  { q: "Does it support SSO?", a: "We can wire SSO/OAuth as needed." },
                  { q: "Will we own it?", a: "Yes—repos, infra notes, and handover included." }
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
              className="mb-8 text-6xl font-bold text-black lg:text-7xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            >
              Prototype an app in <span className="text-blue-900">4–6 weeks</span>
            </motion.h2>
            
            <motion.p 
              className="max-w-3xl mx-auto mb-12 text-2xl leading-relaxed text-gray-700"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
            >
              Get a working internal tool or micro-SaaS with the exact features you need, nothing more.
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="flex flex-col justify-center gap-6 mb-12 sm:flex-row"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
          >
            <motion.button 
              className="flex items-center justify-center gap-3 px-12 py-6 text-2xl font-bold text-white transition-all duration-300 bg-blue-900 shadow-xl rounded-2xl hover:bg-blue-800 hover:shadow-2xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Zap className="w-6 h-6" />
              Prototype an app in 4–6 weeks
            </motion.button>
            <motion.button 
              className="flex items-center justify-center gap-3 px-12 py-6 text-2xl font-bold text-blue-900 transition-all duration-300 bg-white border-2 border-blue-900 shadow-xl rounded-2xl hover:bg-blue-50 hover:border-blue-800"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Phone className="w-6 h-6" />
              Book a scoping call
            </motion.button>
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
              <span>Ships in weeks</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-lg text-black">
              <CheckCircle2 className="w-6 h-6 text-blue-900" />
              <span>Full ownership</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-lg text-black">
              <CheckCircle2 className="w-6 h-6 text-blue-900" />
              <span>Ready to scale</span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AiAppsPage;