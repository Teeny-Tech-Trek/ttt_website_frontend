import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, CheckCircle2, Bot, Sparkles, Zap, ArrowRight, Users, Clock, Target, Eye, Brain, TrendingUp, DollarSign, BarChart3, Shield, FileText, Headphones, Play, Calendar, Phone, MessageCircle, Settings, Database, GitBranch, Workflow, Search, CheckSquare, AlertTriangle, Activity, Layers } from 'lucide-react';
import AutomationVideo from "../../../videos/AgentHandover.mov"
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

const AgenticWorkflowsPage = ({onOpenChatbot}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeDemo, setActiveDemo] = useState(0);

   // Add click handler for the demo button
  const handleTryDemo = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onOpenChatbot) {
      onOpenChatbot();
    }
  };
  
  const workflowSteps = [
    { step: "Retrieve", desc: "Lead data from CRM", icon: Search, status: "completed" },
    { step: "Analyze", desc: "Score and qualify lead", icon: Brain, status: "completed" },
    { step: "Generate", desc: "Draft personalized email", icon: FileText, status: "current" },
    { step: "Preview", desc: "Human approval required", icon: Eye, status: "pending" },
    { step: "Execute", desc: "Send & log to CRM", icon: Zap, status: "pending" }
  ];

  const demoPrompts = [
    "Qualify this lead and create a HubSpot task for Friday",
    "Summarize this email thread and log a follow-up",
    "Parse this CSV and append normalized rows to our sheet"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < workflowSteps.length - 1) {
          setIsProcessing(true);
          setTimeout(() => setIsProcessing(false), 1200);
          return prev + 1;
        }
        return 0;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const useCases = [
    {
      title: "Sales ops",
      flow: "enrich lead → draft email → log to CRM → set follow-up",
      icon: TrendingUp,
      color: "from-blue-900 to-blue-800"
    },
    {
      title: "Support ops", 
      flow: "diagnose issue → run playbook → create ticket with artifacts",
      icon: Headphones,
      color: "from-blue-900 to-blue-800"
    },
    {
      title: "Internal ops",
      flow: "parse email/CSV → normalize → update sheet → notify Slack",
      icon: Database,
      color: "from-blue-900 to-blue-800"
    }
  ];

  const deliverables = [
    { icon: GitBranch, title: "Agent Blueprint", desc: "Roles, tools, refusal rules, approval gates" },
    { icon: Settings, title: "Tooling", desc: "HTTP, CRM/Helpdesk/Sheets/Slack actions; calendar & doc tools" },
    { icon: Activity, title: "Observability", desc: "Step-by-step logs, retries, alerts, test suite" },
    { icon: CheckSquare, title: "Human-approval Loop", desc: "For sensitive steps with preview and approval" }
  ];

  const patterns = [
    { title: "Retrieve → Answer", desc: "Safe Q&A with receipts", icon: Search },
    { title: "Retrieve → Act", desc: "Answer + action with preview", icon: Zap },
    { title: "Multi-tool Routing", desc: "Choose best tool per step", icon: GitBranch },
    { title: "Human Approval", desc: "Preview → Approve/Decline", icon: CheckSquare }
  ];

  const integrations = [
    "HubSpot", "Salesforce", "Zendesk", "Slack", "Gmail", "Sheets", 
    "Notion", "Calendly", "WhatsApp", "Custom REST", "GraphQL"
  ];

  const guardrails = [
    { icon: Shield, title: "Confidence Thresholds", desc: "Only act when certain about outcomes" },
    { icon: CheckCircle2, title: "Allowlists", desc: "Restricted to approved tools and actions" },
    { icon: Eye, title: "Dry-run Mode", desc: "Preview before execution with approval gates" },
    { icon: FileText, title: "Audit Logs", desc: "Every step recorded with signed webhooks" }
  ];

  const kpis = [
    'Agent success rate %', 'Human approval acceptance %', 'Cycle time', 
    'Error rate', 'Business outcome per workflow', 'Step completion rate'
  ];

  const pilotPlan = [
    { week: "Week 1", title: "Discovery", desc: "Map workflows, identify tools, set success criteria" },
    { week: "Week 2", title: "Tools + Tests", desc: "Build connectors, create test scenarios, validate logic" },
    { week: "Week 3", title: "Approvals + UAT", desc: "Add human gates, user acceptance testing" },
    { week: "Week 4", title: "Launch + Hypercare", desc: "Go live with monitoring and support" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-white">
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
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div 
              className="space-y-8"
              initial="initial"
              animate="animate"
              variants={staggerContainer}
            >
              <motion.div 
                className="inline-flex items-center gap-2 px-4 py-2 text-blue-900 bg-blue-100 rounded-full"
                variants={scaleIn}
              >
                <Workflow className="w-4 h-4" />
                <span className="text-sm font-medium">Agentic AI Workflows</span>
              </motion.div>
              
              <motion.h1 
                className="text-5xl font-bold leading-tight text-black lg:text-6xl"
                variants={fadeInUp}
              >
                Agents that don't just answer—<span className="text-blue-900">they act</span>
              </motion.h1>
              
              <motion.p 
                className="text-xl leading-relaxed text-gray-700"
                variants={fadeInUp}
              >
                Multi-step workflows that retrieve data, call tools, and finish tasks with guardrails and approvals.
              </motion.p>
              
              <motion.div 
                className="flex flex-col gap-4 sm:flex-row"
                variants={fadeInUp}
              >
              {/* <motion.button 
                className="flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white transition-colors bg-blue-900 rounded-lg hover:bg-blue-800"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                    
              >
                <Play className="w-5 h-5" />
                See workflow examples
              </motion.button> */}

              <motion.button 
                className="flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-blue-900 transition-colors bg-white border-2 border-blue-900 rounded-lg hover:bg-blue-50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                 onClick={handleTryDemo} 
              >
                <Bot className="w-5 h-5" />
                Try a workflow demo
              </motion.button>
              </motion.div>
            </motion.div>
            
            {/* Architecture Diagram */}
            
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

      {/* Live Workflow Demo */}
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
              Watch Agents <span className="text-blue-900">Work</span>
            </h2>
            <p className="text-xl text-gray-700">See how multi-step workflows execute with human approval gates</p>
          </motion.div>
          
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Workflow Visualization */}
            <motion.div 
              className="overflow-hidden bg-white border border-gray-200 shadow-xl rounded-2xl"
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div 
                className="p-6 text-white bg-blue-900"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl">
                      <Workflow className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-lg font-bold">Sales Agent Workflow</div>
                      <div className="text-sm text-blue-100">Lead Qualification Pipeline</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-300 rounded-full animate-pulse"></div>
                    <span className="text-sm">Processing</span>
                  </div>
                </div>
              </motion.div>
              
              <div className="p-6 bg-gray-50">
                <div className="space-y-4">
                  {workflowSteps.map((step, index) => (
                    <motion.div 
                      key={index}
                      className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                        index <= currentStep ? 'bg-blue-100 border border-blue-200' : 'bg-white border border-gray-200'
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className={`flex items-center justify-center w-10 h-10 rounded-xl ${
                        index < currentStep ? 'bg-blue-900' : 
                        index === currentStep ? 'bg-blue-700 animate-pulse' : 'bg-gray-300'
                      }`}>
                        <step.icon className={`w-5 h-5 ${index <= currentStep ? 'text-white' : 'text-gray-600'}`} />
                      </div>
                      <div className="flex-1">
                        <div className={`font-semibold ${index <= currentStep ? 'text-blue-900' : 'text-gray-500'}`}>
                          {step.step}
                        </div>
                        <div className={`text-sm ${index <= currentStep ? 'text-black' : 'text-gray-400'}`}>
                          {step.desc}
                        </div>
                      </div>
                      {index < currentStep && (
                        <CheckCircle2 className="w-5 h-5 text-blue-900" />
                      )}
                      {index === currentStep && isProcessing && (
                        <div className="w-5 h-5 border-2 border-blue-900 rounded-full border-t-transparent animate-spin"></div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
            
            {/* Demo Prompts and Approval UI */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.h3 
                className="text-2xl font-bold text-blue-900"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              >
                Try these workflows:
              </motion.h3>
              
              <motion.div 
                className="space-y-4"
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.3 }}
              >
                {demoPrompts.map((prompt, index) => (
                  <motion.button 
                    key={index}
                    className="w-full p-4 text-left transition-colors bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50"
                    variants={fadeInUp}
                    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-start gap-3">
                      <Workflow className="w-5 h-5 text-blue-900 mt-0.5" />
                      <span className="text-black">"{prompt}"</span>
                    </div>
                  </motion.button>
                ))}
              </motion.div>
              
              {/* Approval Card Mock */}
              <motion.div 
                className="p-6 bg-white border border-gray-200 rounded-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
              >
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-amber-500" />
                    <span className="font-semibold text-blue-900">Human Approval Required</span>
                  </div>
                  <p className="text-sm text-black">Agent wants to update CRM record for "Acme Corp"</p>
                </div>
                
                <div className="p-3 mb-4 rounded-lg bg-blue-50">
                  <div className="mb-1 text-xs font-medium text-blue-900">PROPOSED CHANGES</div>
                  <div className="text-sm text-black">
                    • Lead Score: 45 → 85<br/>
                    • Status: New → Qualified<br/>
                    • Next Action: Schedule demo call
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <button className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-900 rounded-lg hover:bg-blue-800">
                    Approve
                  </button>
                  <button className="flex-1 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200">
                    Decline
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
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
            Ideal <span className="text-blue-900">Use Cases</span>
          </h2>
          <p className="text-xl text-gray-700">Multi-step workflows that transform how teams work</p>
        </motion.div>
        
        <motion.div 
          className="grid gap-8 lg:grid-cols-3"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Sales Ops */}
          <motion.div 
            className="relative p-8 rounded-2xl hover:bg-white hover:border hover:border-gray-200"
            variants={scaleIn}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
          >
            <div className="flex flex-col items-center text-center">
              <motion.div 
                className="flex items-center justify-center w-20 h-20 mb-4 bg-blue-100 rounded-2xl"
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <TrendingUp className="w-8 h-8 text-blue-900" />
              </motion.div>
              <div className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium text-blue-900 bg-blue-100 rounded-full">
                Sales
              </div>
              <h3 className="mb-3 text-xl font-bold text-black">Sales Operations</h3>
              <p className="leading-relaxed text-gray-600">
                enrich lead → draft email → log to CRM → set follow-up
              </p>
            </div>
          </motion.div>

          {/* Support Ops */}
          <motion.div 
            className="relative p-8 rounded-2xl hover:bg-white hover:border hover:border-gray-200"
            variants={scaleIn}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
          >
            <div className="flex flex-col items-center text-center">
              <motion.div 
                className="flex items-center justify-center w-20 h-20 mb-4 bg-blue-100 rounded-2xl"
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
              >
                <Headphones className="w-8 h-8 text-blue-900" />
              </motion.div>
              <div className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium text-blue-900 bg-blue-100 rounded-full">
                Support
              </div>
              <h3 className="mb-3 text-xl font-bold text-black">Support Operations</h3>
              <p className="leading-relaxed text-gray-600">
                diagnose issue → run playbook → create ticket with artifacts
              </p>
            </div>
          </motion.div>

          {/* Internal Ops */}
          <motion.div 
            className="relative p-8 rounded-2xl hover:bg-white hover:border hover:border-gray-200"
            variants={scaleIn}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
          >
            <div className="flex flex-col items-center text-center">
              <motion.div 
                className="flex items-center justify-center w-20 h-20 mb-4 bg-blue-100 rounded-2xl"
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              >
                <Database className="w-8 h-8 text-blue-900" />
              </motion.div>
              <div className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium text-blue-900 bg-blue-100 rounded-full">
                Operations
              </div>
              <h3 className="mb-3 text-xl font-bold text-black">Internal Operations</h3>
              <p className="leading-relaxed text-gray-600">
                parse email/CSV → normalize → update sheet → notify Slack
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>

      {/* What We Deliver */}
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
              What We <span className="text-blue-900">Deliver</span>
            </h2>
            <p className="text-xl text-gray-700">Complete agentic workflow solution with human oversight</p>
          </motion.div>
          
          <motion.div 
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* Agent Blueprint */}
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
                  <GitBranch className="w-8 h-8 text-blue-900" />
                </motion.div>
                <div className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium text-blue-900 bg-blue-100 rounded-full">
                  Blueprint
                </div>
                <h3 className="mb-3 text-xl font-bold text-black">Agent Blueprint</h3>
                <p className="leading-relaxed text-gray-600">
                  Roles, tools, refusal rules, approval gates for safe automation.
                </p>
              </div>
            </motion.div>

            {/* Tooling */}
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
                  Integration
                </div>
                <h3 className="mb-3 text-xl font-bold text-black">Smart Tooling</h3>
                <p className="leading-relaxed text-gray-600">
                  HTTP, CRM/Helpdesk/Sheets/Slack actions; calendar & doc tools.
                </p>
              </div>
            </motion.div>

            {/* Observability */}
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
                  <Activity className="w-8 h-8 text-blue-900" />
                </motion.div>
                <div className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium text-blue-900 bg-blue-100 rounded-full">
                  Monitoring
                </div>
                <h3 className="mb-3 text-xl font-bold text-black">Full Observability</h3>
                <p className="leading-relaxed text-gray-600">
                  Step-by-step logs, retries, alerts, test suite for reliability.
                </p>
              </div>
            </motion.div>

            {/* Human Approval */}
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
                  <CheckSquare className="w-8 h-8 text-blue-900" />
                </motion.div>
                <div className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium text-blue-900 bg-blue-100 rounded-full">
                  Approval
                </div>
                <h3 className="mb-3 text-xl font-bold text-black">Human Oversight</h3>
                <p className="leading-relaxed text-gray-600">
                  For sensitive steps with preview and approval workflow gates.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Patterns We Ship */}
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
              Patterns We <span className="text-blue-900">Ship</span>
            </h2>
            <p className="text-xl text-gray-700">Proven workflow templates ready for your use case</p>
          </motion.div>
          
          <motion.div 
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* Retrieve → Answer */}
            <motion.div 
              className="relative p-8 rounded-2xl hover:bg-white hover:border hover:border-gray-200"
              variants={fadeInUp}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <div className="flex flex-col items-center text-center">
                <motion.div 
                  className="flex items-center justify-center w-20 h-20 mb-4 bg-blue-100 rounded-2xl"
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <Search className="w-8 h-8 text-blue-900" />
                </motion.div>
                <div className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium text-blue-900 bg-blue-100 rounded-full">
                  Basic
                </div>
                <h3 className="mb-3 text-xl font-bold text-black">Retrieve → Answer</h3>
                <p className="leading-relaxed text-gray-600">
                  Safe Q&A with receipts and source citations for accuracy.
                </p>
              </div>
            </motion.div>

            {/* Retrieve → Act */}
            <motion.div 
              className="relative p-8 rounded-2xl hover:bg-white hover:border hover:border-gray-200"
              variants={fadeInUp}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <div className="flex flex-col items-center text-center">
                <motion.div 
                  className="flex items-center justify-center w-20 h-20 mb-4 bg-blue-100 rounded-2xl"
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                >
                  <Zap className="w-8 h-8 text-blue-900" />
                </motion.div>
                <div className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium text-blue-900 bg-blue-100 rounded-full">
                  Action
                </div>
                <h3 className="mb-3 text-xl font-bold text-black">Retrieve → Act</h3>
                <p className="leading-relaxed text-gray-600">
                  Answer + action with preview for safe execution workflows.
                </p>
              </div>
            </motion.div>

            {/* Multi-tool Routing */}
            <motion.div 
              className="relative p-8 rounded-2xl hover:bg-white hover:border hover:border-gray-200"
              variants={fadeInUp}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <div className="flex flex-col items-center text-center">
                <motion.div 
                  className="flex items-center justify-center w-20 h-20 mb-4 bg-blue-100 rounded-2xl"
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                >
                  <GitBranch className="w-8 h-8 text-blue-900" />
                </motion.div>
                <div className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium text-blue-900 bg-blue-100 rounded-full">
                  Smart
                </div>
                <h3 className="mb-3 text-xl font-bold text-black">Multi-tool Routing</h3>
                <p className="leading-relaxed text-gray-600">
                  Choose best tool per step with intelligent decision making.
                </p>
              </div>
            </motion.div>

            {/* Human Approval */}
            <motion.div 
              className="relative p-8 rounded-2xl hover:bg-white hover:border hover:border-gray-200"
              variants={fadeInUp}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <div className="flex flex-col items-center text-center">
                <motion.div 
                  className="flex items-center justify-center w-20 h-20 mb-4 bg-blue-100 rounded-2xl"
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                >
                  <CheckSquare className="w-8 h-8 text-blue-900" />
                </motion.div>
                <div className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium text-blue-900 bg-blue-100 rounded-full">
                  Oversight
                </div>
                <h3 className="mb-3 text-xl font-bold text-black">Human Approval</h3>
                <p className="leading-relaxed text-gray-600">
                  Preview → Approve/Decline for sensitive operations control.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 4-Week Pilot Plan */}
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
        4-Week <span className="text-blue-900">Pilot</span>
      </h2>
      <p className="text-xl text-gray-700">From discovery to launch with proven methodology</p>
    </motion.div>
    
    <motion.div 
      className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Week 1 */}
      <motion.div 
        className="relative p-8 rounded-2xl hover:bg-white hover:border hover:border-gray-200"
        variants={fadeInUp}
        whileHover={{ y: -8, transition: { duration: 0.3 } }}
      >
        <div className="flex flex-col items-center text-center">
          <motion.div 
            className="flex items-center justify-center w-20 h-20 mb-4 bg-blue-100 rounded-2xl"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Search className="w-8 h-8 text-blue-900" />
          </motion.div>
          <div className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium text-blue-900 bg-blue-100 rounded-full">
            Week 1
          </div>
          <h3 className="mb-3 text-xl font-bold text-black">Discovery</h3>
          <p className="leading-relaxed text-gray-600">
            Map workflows, identify tools, set success criteria.
          </p>
        </div>
        {/* Arrow for desktop */}
        <motion.div 
          className="absolute hidden transform -translate-y-1/2 lg:block top-1/2 -right-4"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
        >
          <ArrowRight className="w-6 h-6 text-gray-300" />
        </motion.div>
      </motion.div>

      {/* Week 2 */}
      <motion.div 
        className="relative p-8 rounded-2xl hover:bg-white hover:border hover:border-gray-200"
        variants={fadeInUp}
        whileHover={{ y: -8, transition: { duration: 0.3 } }}
      >
        <div className="flex flex-col items-center text-center">
          <motion.div 
            className="flex items-center justify-center w-20 h-20 mb-4 bg-blue-100 rounded-2xl"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          >
            <Settings className="w-8 h-8 text-blue-900" />
          </motion.div>
          <div className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium text-blue-900 bg-blue-100 rounded-full">
            Week 2
          </div>
          <h3 className="mb-3 text-xl font-bold text-black">Tools + Tests</h3>
          <p className="leading-relaxed text-gray-600">
            Build connectors, create test scenarios, validate logic.
          </p>
        </div>
        <motion.div 
          className="absolute hidden transform -translate-y-1/2 lg:block top-1/2 -right-4"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
        >
          <ArrowRight className="w-6 h-6 text-gray-300" />
        </motion.div>
      </motion.div>

      {/* Week 3 */}
      <motion.div 
        className="relative p-8 rounded-2xl hover:bg-white hover:border hover:border-gray-200"
        variants={fadeInUp}
        whileHover={{ y: -8, transition: { duration: 0.3 } }}
      >
        <div className="flex flex-col items-center text-center">
          <motion.div 
            className="flex items-center justify-center w-20 h-20 mb-4 bg-blue-100 rounded-2xl"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          >
            <CheckSquare className="w-8 h-8 text-blue-900" />
          </motion.div>
          <div className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium text-blue-900 bg-blue-100 rounded-full">
            Week 3
          </div>
          <h3 className="mb-3 text-xl font-bold text-black">Approvals + UAT</h3>
          <p className="leading-relaxed text-gray-600">
            Add human gates, user acceptance testing.
          </p>
        </div>
        <motion.div 
          className="absolute hidden transform -translate-y-1/2 lg:block top-1/2 -right-4"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
        >
          <ArrowRight className="w-6 h-6 text-gray-300" />
        </motion.div>
      </motion.div>

      {/* Week 4 */}
      <motion.div 
        className="relative p-8 rounded-2xl hover:bg-white hover:border hover:border-gray-200"
        variants={fadeInUp}
        whileHover={{ y: -8, transition: { duration: 0.3 } }}
      >
        <div className="flex flex-col items-center text-center">
          <motion.div 
            className="flex items-center justify-center w-20 h-20 mb-4 bg-blue-100 rounded-2xl"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
          >
            <Zap className="w-8 h-8 text-blue-900" />
          </motion.div>
          <div className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium text-blue-900 bg-blue-100 rounded-full">
            Week 4
          </div>
          <h3 className="mb-3 text-xl font-bold text-black">Launch + Hypercare</h3>
          <p className="leading-relaxed text-gray-600">
            Go live with monitoring and support.
          </p>
        </div>
      </motion.div>
    </motion.div>
  </div>
</section>

      {/* Guardrails & KPIs */}
      <section className="py-20 bg-white">
        <div className="px-6 mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2">
            <motion.div 
              className="p-8 border border-blue-200 bg-blue-50 rounded-2xl"
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.h2 
                className="mb-8 text-3xl font-bold text-black"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              >
                <span className="text-blue-900">Guardrails</span>
              </motion.h2>
              <motion.div 
                className="space-y-6"
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.3 }}
              >
                {guardrails.map((item, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-start gap-4 p-4 bg-white border border-blue-100 rounded-xl"
                    variants={fadeInLeft}
                    whileHover={{ x: 8, transition: { duration: 0.3 } }}
                  >
                    <motion.div 
                      className="flex items-center justify-center flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl"
                      initial={{ scale: 0, rotate: -90 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 * index }}
                    >
                      <item.icon className="w-6 h-6 text-blue-900" />
                    </motion.div>
                    <div>
                      <h3 className="mb-1 font-bold text-blue-900">{item.title}</h3>
                      <p className="text-black">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="p-8 border border-blue-200 bg-blue-50 rounded-2xl"
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.h2 
                className="mb-8 text-3xl font-bold text-black"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              >
                KPIs We <span className="text-blue-900">Track</span>
              </motion.h2>
              <motion.div 
                className="space-y-4"
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.3 }}
              >
                {kpis.map((kpi, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-center gap-4 p-4 bg-white border border-blue-100 rounded-xl"
                    variants={fadeInRight}
                    whileHover={{ x: -8, transition: { duration: 0.3 } }}
                  >
                    <motion.div 
                      className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg"
                      initial={{ scale: 0, rotate: 90 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 * index }}
                    >
                      <BarChart3 className="w-5 h-5 text-blue-900" />
                    </motion.div>
                    <span className="font-medium text-black">{kpi}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="py-20 bg-gray-50">
        <div className="px-6 mx-auto max-w-7xl">
          <motion.div 
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="mb-4 text-4xl font-bold text-blue-900">
              Integrations
            </h2>
            <p className="text-xl text-gray-700">Connect with your existing tools and systems</p>
          </motion.div>
          
          <motion.div 
            className="flex flex-wrap justify-center gap-4"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
          >
            {integrations.map((integration, index) => (
              <motion.div 
                key={index} 
                className="px-6 py-3 font-medium text-black bg-white border border-gray-200 rounded-full"
                variants={scaleIn}
                whileHover={{ scale: 1.05, backgroundColor: '#f0f9ff', borderColor: '#3b82f6', transition: { duration: 0.2 } }}
              >
                {integration}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl px-6 mx-auto">
          <motion.div 
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="mb-4 text-4xl font-bold text-black">
              Frequently Asked <span className="text-blue-900">Questions</span>
            </h2>
          </motion.div>
          
          <motion.div 
            className="space-y-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
          >
            {[
              { q: "Can we see each step?", a: "Yes—every step is logged with inputs/outputs." },
              { q: "What if a step is risky?", a: "It goes to preview and requires human approval." },
              { q: "Do you support our custom API?", a: "Yes—HTTP tool or custom connector." }
            ].map((faq, index) => (
              <motion.div 
                key={index} 
                className="p-6 bg-white border border-gray-200 rounded-xl"
                variants={fadeInUp}
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
              >
                <motion.h3 
                  className="mb-2 font-bold text-blue-900"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 * index }}
                >
                  {faq.q}
                </motion.h3>
                <motion.p 
                  className="text-black"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 + 0.1 * index }}
                >
                  {faq.a}
                </motion.p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-20 overflow-hidden text-black bg-white">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 bg-blue-100 rounded-full w-96 h-96 opacity-20 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 rounded-full w-80 h-80 bg-blue-50 opacity-10 blur-3xl"></div>
        </div>
        
        <div className="relative max-w-4xl px-6 mx-auto text-center">
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div 
              className="inline-flex items-center gap-3 px-6 py-3 mb-6 bg-blue-100 border border-blue-200 rounded-full backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            >
              <Workflow className="w-5 h-5 text-blue-900" />
              <span className="text-sm font-medium text-blue-900">Ready to automate?</span>
            </motion.div>
            
            <motion.h2 
              className="mb-6 text-4xl font-bold text-black lg:text-5xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            >
              Start a <span className="text-blue-900">4-week agent pilot</span>
            </motion.h2>
            
            <motion.p 
              className="max-w-2xl mx-auto mb-8 text-xl leading-relaxed text-gray-700"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
            >
              Get multi-step AI workflows running with human oversight and measurable business outcomes.
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="flex flex-col justify-center gap-4 mb-8 sm:flex-row"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
          >
            <motion.button 
              className="flex items-center justify-center gap-2 px-8 py-4 text-lg font-bold text-white transition-all duration-300 bg-blue-900 shadow-lg rounded-xl hover:bg-blue-800 hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Zap className="w-5 h-5" />
              Start a 4-week pilot
            </motion.button>
            
            <HashLink 
            smooth 
            to="/#contact"
            className="flex items-center justify-center gap-2 px-8 py-4 text-lg font-bold text-blue-900 transition-all duration-300 bg-white border-2 border-blue-900 shadow-lg rounded-xl hover:bg-blue-50 hover:border-blue-800"
          >
            <Phone className="w-5 h-5" />
             Talk to an architect
          </HashLink>
             
          </motion.div>
          
          <motion.div 
            className="grid max-w-2xl gap-6 mx-auto sm:grid-cols-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 1.0 }}
          >
            <div className="flex items-center justify-center gap-2 text-black">
              <CheckCircle2 className="w-5 h-5 text-blue-900" />
              <span className="text-sm">Human oversight</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-black">
              <CheckCircle2 className="w-5 h-5 text-blue-900" />
              <span className="text-sm">Full observability</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-black">
              <CheckCircle2 className="w-5 h-5 text-blue-900" />
              <span className="text-sm">Proven outcomes</span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AgenticWorkflowsPage;