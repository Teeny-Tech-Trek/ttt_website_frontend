import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, CheckCircle2, Bot, Sparkles, Zap, ArrowRight, Users, Clock, Target, Eye, Brain, TrendingUp, DollarSign, BarChart3, Shield, FileText, Headphones, Play, Calendar, Phone, MessageCircle, Settings, Database, GitBranch, Workflow, Search, CheckSquare, AlertTriangle, Activity, Layers, Mail, Upload, Bell, Slack, Filter, AlertCircle, RefreshCw, Lock, RotateCcw } from 'lucide-react';
import AutomationVideo from "../../../videos/SmartAutomations.mp4"
import { HashLink } from 'react-router-hash-link';

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

const ProcessAutomationPage = ({ onOpenChatbot }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState("");

    const handleClick = () => {
    setMessage("Thank you for your interest! Please proceed by clicking on 'Call with AI' to explore the live demo.");
    setTimeout(() => setMessage(""), 5000); // Auto-hide after 5s
  };

  const handleTryDemo = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (onOpenChatbot) {
        onOpenChatbot();
      }
    };

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
                className="text-5xl font-bold leading-tight text-black lg:text-6xl"
                variants={fadeInUp}
              >
                Kill the busywork. <span className="text-blue-900 ">Keep control.</span>
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
                <motion.div 
                  className="flex flex-col gap-3 sm:flex-row"
                  variants={fadeInUp}
                >
                  <motion.div 
                    className="flex flex-col gap-4 sm:flex-row"
                    variants={fadeInUp}
                  >
                <div className="flex flex-col items-center">
                  {/* Wrap in relative container */}
                  <div className="relative flex flex-col items-center">
                    <motion.button 
                      className="flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-white transition-colors bg-blue-900 rounded-lg hover:bg-blue-800"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleClick}
                    >
                      <Play className="w-5 h-5" />
                      Try the ops demo
                    </motion.button>

                    {/* Absolutely positioned message */}
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

                    {/* <motion.button 
                      className="flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-blue-900 transition-colors bg-white border border-blue-900 rounded-xl hover:bg-blue-50"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                     <Activity className="w-5 h-5" />
                            See automation patterns
                    </motion.button> */}
                  </motion.div>

              </motion.div>

              </motion.div>
            </motion.div>
            
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
                <source src={AutomationVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
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
      <p className="text-xl text-gray-700">Common pain points that eat up your team's time</p>
    </motion.div>
    
    <motion.div 
      className="grid gap-8 lg:grid-cols-3"
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Status buried in emails */}
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
            <Mail className="w-8 h-8 text-red-500" />
          </motion.div>
          <div className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium text-red-700 bg-red-100 rounded-full">
            Communication
          </div>
          <h3 className="mb-3 text-xl font-bold text-black">Status Buried in Emails</h3>
          <p className="leading-relaxed text-gray-600">
            Important updates lost in inbox clutter, making tracking impossible.
          </p>
        </div>
      </motion.div>

      {/* Manual copy-paste */}
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
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          >
            <RotateCcw className="w-8 h-8 text-red-500" />
          </motion.div>
          <div className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium text-red-700 bg-red-100 rounded-full">
            Manual Work
          </div>
          <h3 className="mb-3 text-xl font-bold text-black">Manual Copy-Paste</h3>
          <p className="leading-relaxed text-gray-600">
            Hours wasted on repetitive data entry into tracking systems.
          </p>
        </div>
      </motion.div>

      {/* Late exception alerts */}
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
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </motion.div>
          <div className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium text-red-700 bg-red-100 rounded-full">
            Penalties
          </div>
          <h3 className="mb-3 text-xl font-bold text-black">Late Exception Alerts</h3>
          <p className="leading-relaxed text-gray-600">
            Missing deadlines due to delayed notifications and SLA penalties.
          </p>
        </div>
      </motion.div>
    </motion.div>
  </div>
</section>

      {/* What We Deliver */}
      <section className="py-20 bg-white">
  <div className="px-6 mx-auto max-w-7xl">
    <motion.div 
      className="mb-16 text-center"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h2 className="mb-4 text-4xl font-bold text-black">
        What We <span className="text-blue-900">Deliver</span>
      </h2>
      <p className="text-xl text-gray-700">Complete automation solution with all components</p>
    </motion.div>
    
    <motion.div 
      className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Ingestors */}
      <motion.div 
        className="relative p-8 rounded-2xl hover:bg-white hover:border hover:border-gray-200"
        variants={fadeInUp}
        whileHover={{ y: -8, transition: { duration: 0.3 } }}
      >
        <div className="flex flex-col items-center text-center">
          <motion.div 
            className="flex items-center justify-center w-20 h-20 mb-4 bg-blue-100 rounded-2xl"
            initial={{ scale: 0, rotate: 180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Upload className="w-8 h-8 text-blue-900" />
          </motion.div>
          <div className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium text-blue-900 bg-blue-100 rounded-full">
            Input
          </div>
          <h3 className="mb-3 text-xl font-bold text-black">Smart Ingestors</h3>
          <p className="leading-relaxed text-gray-600">
            Email/CSV parser with normalization to consistent data schema.
          </p>
        </div>
      </motion.div>

      {/* Rules Engine */}
      <motion.div 
        className="relative p-8 rounded-2xl hover:bg-white hover:border hover:border-gray-200"
        variants={fadeInUp}
        whileHover={{ y: -8, transition: { duration: 0.3 } }}
      >
        <div className="flex flex-col items-center text-center">
          <motion.div 
            className="flex items-center justify-center w-20 h-20 mb-4 bg-blue-100 rounded-2xl"
            initial={{ scale: 0, rotate: 180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          >
            <Settings className="w-8 h-8 text-blue-900" />
          </motion.div>
          <div className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium text-blue-900 bg-blue-100 rounded-full">
            Logic
          </div>
          <h3 className="mb-3 text-xl font-bold text-black">Rules Engine</h3>
          <p className="leading-relaxed text-gray-600">
            Delay/damage/lost detection with your custom business rules.
          </p>
        </div>
      </motion.div>

      {/* Notifications */}
      <motion.div 
        className="relative p-8 rounded-2xl hover:bg-white hover:border hover:border-gray-200"
        variants={fadeInUp}
        whileHover={{ y: -8, transition: { duration: 0.3 } }}
      >
        <div className="flex flex-col items-center text-center">
          <motion.div 
            className="flex items-center justify-center w-20 h-20 mb-4 bg-blue-100 rounded-2xl"
            initial={{ scale: 0, rotate: 180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            <Bell className="w-8 h-8 text-blue-900" />
          </motion.div>
          <div className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium text-blue-900 bg-blue-100 rounded-full">
            Alerts
          </div>
          <h3 className="mb-3 text-xl font-bold text-black">Smart Notifications</h3>
          <p className="leading-relaxed text-gray-600">
            Slack/Email alerts with next-best actions and daily digest summaries.
          </p>
        </div>
      </motion.div>

      {/* Customer Updates */}
      <motion.div 
        className="relative p-8 rounded-2xl hover:bg-white hover:border hover:border-gray-200"
        variants={fadeInUp}
        whileHover={{ y: -8, transition: { duration: 0.3 } }}
      >
        <div className="flex flex-col items-center text-center">
          <motion.div 
            className="flex items-center justify-center w-20 h-20 mb-4 bg-blue-100 rounded-2xl"
            initial={{ scale: 0, rotate: 180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          >
            <MessageSquare className="w-8 h-8 text-blue-900" />
          </motion.div>
          <div className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium text-blue-900 bg-blue-100 rounded-full">
            Communication
          </div>
          <h3 className="mb-3 text-xl font-bold text-black">Customer Updates</h3>
          <p className="leading-relaxed text-gray-600">
            Friendly, templated status emails with branded customer pages.
          </p>
        </div>
      </motion.div>
    </motion.div>
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
              className="mb-8 text-4xl font-bold text-black lg:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            >
              Cut busywork by <span className="text-blue-900">20-40%</span>
            </motion.h2>
            
            <motion.p 
              className="max-w-3xl mx-auto mb-12 text-xl leading-relaxed text-gray-700"
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
            
              <motion.div 
                    className="flex flex-col gap-4 sm:flex-row"
                    variants={fadeInUp}
                  >
                    

                    <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <HashLink 
                      smooth 
                      to="/#pricing"
                      className="flex items-center justify-center gap-2 px-10 py-6 text-base font-semibold text-white transition-colors bg-blue-900 rounded-xl hover:bg-blue-800"
                    >
                      <Zap className="w-5 h-5" />
                         Automate the top 3 processes
                    </HashLink>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <HashLink 
                      smooth 
                      to="/#pricing"
                      className="flex items-center justify-center gap-2 px-8 py-4 text-lg font-bold text-blue-900 transition-all duration-300 bg-white border-2 border-blue-900 shadow-lg rounded-xl hover:bg-blue-50 hover:border-blue-800"
                    >
                        <Calendar className="w-5 h-5" />
                          Book a working session
                    </HashLink>
                  </motion.div>
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