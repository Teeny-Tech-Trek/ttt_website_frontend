import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, CheckCircle2, Bot, Sparkles, Zap, ArrowRight, Users, Clock, Target, Eye, Brain, TrendingUp, DollarSign, BarChart3, Shield, FileText, Headphones, Play, Calendar, Phone, MessageCircle, Settings, Database, GitBranch, Workflow, Search, CheckSquare, AlertTriangle, Activity, Layers, Mail, Upload, Bell, Slack, Filter, AlertCircle, RefreshCw, Lock, RotateCcw } from 'lucide-react';

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

const ProcessAutomationPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const automationFlow = [
    { step: "Email/CSV", icon: Mail, desc: "Incoming data", status: "completed" },
    { step: "Parse & Normalize", icon: Filter, desc: "Clean & structure", status: "completed" },
    { step: "Rules/Flags", icon: AlertCircle, desc: "Apply business logic", status: "current" },
    { step: "Slack Alert", icon: Bell, desc: "Notify team", status: "pending" },
    { step: "Customer Update", icon: MessageSquare, desc: "Send status", status: "pending" },
    { step: "Daily Digest", icon: FileText, desc: "Summary report", status: "pending" }
  ];

  const demoPrompts = [
    "Parse this carrier CSV and flag late shipments",
    "Send a friendly update to customers about delays", 
    "Show me today's exceptions digest"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < automationFlow.length - 1) {
          setIsProcessing(true);
          setTimeout(() => setIsProcessing(false), 1200);
          return prev + 1;
        }
        return 0;
      });
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  const problems = [
    { title: "Status buried in emails/attachments", desc: "Important updates lost in inbox clutter" },
    { title: "Manual copy-paste into trackers", desc: "Hours wasted on repetitive data entry" },
    { title: "Late exception alerts; SLA penalties", desc: "Missing deadlines due to delayed notifications" }
  ];

  const deliverables = [
    { 
      title: "Ingestors", 
      desc: "Email/CSV/parser with normalization to consistent schema", 
      icon: Upload,
      features: ["Multi-format parsing", "Data validation", "Error handling"]
    },
    { 
      title: "Rules Engine", 
      desc: "Delay/damage/lost or your business rules", 
      icon: Settings,
      features: ["Custom logic", "Threshold alerts", "Escalation paths"]
    },
    { 
      title: "Notifications", 
      desc: "Slack/Email with next-best actions; day-end digest", 
      icon: Bell,
      features: ["Smart routing", "Action buttons", "Daily summaries"]
    },
    { 
      title: "Customer Updates", 
      desc: "Friendly, templated status emails/pages", 
      icon: MessageSquare,
      features: ["Branded templates", "Auto-personalization", "Delivery tracking"]
    }
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
                <Zap className="w-5 h-5" />
                <span className="font-medium">Smart Process Automation</span>
              </motion.div>
              
              <motion.h1 
                className="text-6xl font-bold leading-tight text-black lg:text-7xl"
                variants={fadeInUp}
              >
                Kill the busywork. <span className="text-blue-900">Keep control.</span>
              </motion.h1>
              
              <motion.p 
                className="text-2xl leading-relaxed text-gray-700"
                variants={fadeInUp}
              >
                Turn emails/CSVs/sheets into clean data, rules, and alerts—so your team handles exceptions, not drudgery.
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
                  <Activity className="w-6 h-6" />
                  See automation patterns
                </motion.button>
                <motion.button 
                  className="flex items-center justify-center gap-3 px-10 py-5 text-xl font-semibold text-blue-900 transition-colors bg-white border-2 border-blue-900 rounded-2xl hover:bg-blue-50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Play className="w-6 h-6" />
                  Try the ops demo
                </motion.button>
              </motion.div>
            </motion.div>
            
            {/* Pipeline Visualization */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            >
              <div className="p-8 bg-white border border-gray-200 shadow-2xl rounded-3xl">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-blue-900">Automation Pipeline</h3>
                  <p className="text-black">Live processing flow</p>
                </div>
                <div className="space-y-3">
                  {automationFlow.map((step, index) => (
                    <motion.div 
                      key={index}
                      className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${
                        index <= currentStep ? 'bg-blue-100 border-2 border-blue-200' : 'bg-gray-50 border-2 border-gray-200'
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className={`flex items-center justify-center w-12 h-12 rounded-2xl ${
                        index < currentStep ? 'bg-blue-900' : 
                        index === currentStep ? 'bg-blue-700 animate-pulse' : 'bg-gray-300'
                      }`}>
                        <step.icon className={`w-6 h-6 ${index <= currentStep ? 'text-white' : 'text-gray-600'}`} />
                      </div>
                      <div className="flex-1">
                        <div className={`font-semibold ${index <= currentStep ? 'text-blue-900' : 'text-gray-500'}`}>
                          {step.step}
                        </div>
                        <div className={`text-sm ${index <= currentStep ? 'text-black' : 'text-gray-400'}`}>
                          {step.desc}
                        </div>
                      </div>
                      {index < automationFlow.length - 1 && (
                        <ArrowRight className="w-5 h-5 text-gray-400" />
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problems We Solve */}
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
              Problems We <span className="text-blue-900">Solve</span>
            </h2>
            <p className="text-2xl text-gray-700">Common pain points that eat up your team's time</p>
          </motion.div>
          
          <div className="grid gap-12 lg:grid-cols-3">
            {problems.map((problem, index) => (
              <motion.div 
                key={index}
                className="relative p-8 transition-all duration-300 bg-white rounded-3xl hover:bg-blue-50 hover:shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <div className="flex items-center justify-center w-16 h-16 mb-6 bg-red-100 rounded-3xl">
                  <AlertCircle className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="mb-4 text-2xl font-bold text-blue-900">{problem.title}</h3>
                <p className="text-lg leading-relaxed text-black">{problem.desc}</p>
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
            <p className="text-2xl text-gray-700">Complete automation solution with all components</p>
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

      {/* Interactive Demo */}
      <section className="py-24 bg-gray-50">
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
                Try These <span className="text-blue-900">Automations</span>
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
                        <Activity className="w-6 h-6 text-blue-900" />
                      </div>
                      <div>
                        <p className="text-xl font-medium text-black">"{prompt}"</p>
                        <p className="mt-2 text-gray-700">Click to see automation in action</p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
            
            {/* Slack Alert Demo */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="mb-10 text-4xl font-bold text-black">
                Smart <span className="text-blue-900">Notifications</span>
              </h2>
              <div className="p-8 bg-white border-2 border-gray-200 shadow-xl rounded-3xl">
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-2xl">
                    <Slack className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-blue-900">#operations</div>
                    <div className="text-black">Today at 2:34 PM</div>
                  </div>
                </div>
                
                <div className="p-6 border-l-4 border-amber-400 bg-amber-50 rounded-2xl">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="text-xl font-bold text-amber-800">⚠️ Delayed Shipment Alert</div>
                      <div className="mt-2 text-amber-700">Order #ABC123 is 2 days behind schedule</div>
                    </div>
                  </div>
                  
                  <div className="p-4 mb-6 bg-white rounded-xl">
                    <div className="space-y-2 text-sm">
                      <div className="text-black"><strong>Customer:</strong> Acme Corp</div>
                      <div className="text-black"><strong>Expected:</strong> Dec 15, 2024</div>
                      <div className="text-black"><strong>Current ETA:</strong> Dec 17, 2024</div>
                      <div className="text-black"><strong>Reason:</strong> Weather delay at hub</div>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <button className="px-6 py-3 font-semibold text-white transition-colors bg-blue-900 rounded-xl hover:bg-blue-800">
                      Notify Customer
                    </button>
                    <button className="px-6 py-3 font-semibold text-gray-600 transition-colors bg-gray-100 rounded-xl hover:bg-gray-200">
                      Snooze 1hr
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Integrations & Features */}
      <section className="py-24 bg-white">
        <div className="px-6 mx-auto max-w-7xl">
          <div className="grid gap-20 lg:grid-cols-2">
            {/* Integrations */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="mb-10 text-4xl font-bold text-blue-900">
                Integrations
              </h2>
              <p className="mb-8 text-xl text-gray-700">Connect with your existing tools seamlessly</p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {["Gmail/Outlook", "Slack", "Google Sheets", "BigQuery", "S3", "Webhooks", "CSV Portals", "Custom APIs", "Zapier"].map((integration, index) => (
                  <motion.div 
                    key={index}
                    className="p-4 font-semibold text-center text-black bg-white border-2 border-gray-200 rounded-2xl hover:border-blue-300 hover:bg-blue-50"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {integration}
                  </motion.div>
                ))}
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
              <p className="mb-8 text-xl text-gray-700">Built-in safety and reliability features</p>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {[
                  { title: "Replayable runs", desc: "Every process can be re-executed safely" },
                  { title: "Idempotent writes", desc: "No duplicate data or duplicate actions" },
                  { title: "Immutable logs", desc: "Complete audit trail for compliance" },
                  { title: "Template locks", desc: "Customer communications stay on-brand" }
                ].map((guardrail, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-start gap-4 p-6 transition-all duration-300 bg-white border-2 border-gray-200 rounded-2xl hover:border-blue-300 hover:shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
                    whileHover={{ x: 8 }}
                  >
                    <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-2xl">
                      <Shield className="w-6 h-6 text-blue-900" />
                    </div>
                    <div>
                      <h3 className="mb-2 text-xl font-bold text-blue-900">{guardrail.title}</h3>
                      <p className="text-black">{guardrail.desc}</p>
                    </div>
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
              <Zap className="w-6 h-6 text-blue-900" />
              <span className="font-semibold text-blue-900">Ready to eliminate busywork?</span>
            </motion.div>
            
            <motion.h2 
              className="mb-8 text-6xl font-bold text-black lg:text-7xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            >
              Cut busywork by <span className="text-blue-900">20-40%</span>
            </motion.h2>
            
            <motion.p 
              className="max-w-3xl mx-auto mb-12 text-2xl leading-relaxed text-gray-700"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
            >
              Transform manual processes into smart automation with human oversight and clear ROI tracking.
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
              Automate the top 3 processes
            </motion.button>
            <motion.button 
              className="flex items-center justify-center gap-3 px-12 py-6 text-2xl font-bold text-blue-900 transition-all duration-300 bg-white border-2 border-blue-900 shadow-xl rounded-2xl hover:bg-blue-50 hover:border-blue-800"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Calendar className="w-6 h-6" />
              Book a working session
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
              <span>20-40% time savings</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-lg text-black">
              <CheckCircle2 className="w-6 h-6 text-blue-900" />
              <span>Exception handling</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-lg text-black">
              <CheckCircle2 className="w-6 h-6 text-blue-900" />
              <span>Clear ROI tracking</span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ProcessAutomationPage;