import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, CheckCircle2, Bot, Sparkles, Zap,Star, ArrowRight, Users, Clock, Target, Eye, Brain, TrendingUp, DollarSign, BarChart3, Shield, FileText, Headphones, Play, Calendar, Phone, MessageCircle, Settings, Database } from 'lucide-react';

import heroImage from "../../../Images/Case Studies/Chatbots/ChatGPT Image Aug 12, 2025, 04_06_26 PM.png"

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

const ChatbotsPage = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [activeDemo, setActiveDemo] = useState(0);
  
  const demoMessages = [
    { type: 'bot', text: "Hi! I can help you with our return policy. What specific question do you have?" },
    { type: 'user', text: "What's your return policy for electronics?" },
    { type: 'bot', text: "Based on our policy documentation, electronics can be returned within 30 days of purchase with original receipt and packaging. Items must be in unused condition.\n\n**Source:** Return Policy v2.1, Section 3.2", citations: true },
    { type: 'user', text: "I need to speak to a human about a warranty issue" },
    { type: 'bot', text: "I'll escalate this warranty case to our support team with full context. You'll be connected within 2 minutes.", action: "escalate" }
  ];

  const demoPrompts = [
    "Summarize our return policy with citations",
    "Escalate this warranty case to a human with context", 
    "What's the 4-week plan for a chatbot pilot?"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => {
        if (prev < demoMessages.length - 1) {
          setIsTyping(true);
          setTimeout(() => setIsTyping(false), 1000);
          return prev + 1;
        }
        return 0;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const outcomes = [
    { icon: TrendingUp, value: "40-55%", label: "FAQ deflection with source-cited answers" },
    { icon: Clock, value: "Seconds", label: "First-response time for repetitive queries" },
    { icon: Headphones, value: "Full context", label: "Handoffs with intent, facts, screenshots" }
  ];

  const deliverables = [
    { icon: MessageSquare, title: "Website & WhatsApp Bot", desc: "Trained on your policies and docs" },
    { icon: Headphones, title: "Helpdesk Handoff", desc: "Zendesk/Intercom/HubSpot with transcript + attachments" },
    { icon: Settings, title: "Action Skills", desc: "Order lookup, ticket update, appointment booking" },
    { icon: BarChart3, title: "Analytics", desc: "Deflection %, FRT, source-cited %, fallback rate" }
  ];

  const integrations = [
    "Zendesk", "Intercom", "HubSpot", "Freshdesk", "Shopify", "WooCommerce", 
    "Gmail", "Slack", "Google Sheets", "Calendly", "Google Calendar"
  ];

  const steps = [
    { title: "Connect & Train", desc: "Ingest policies/FAQs/Notion/Drive; build retrieval with citations" },
    { title: "Wire Actions", desc: "Safe tool-calling for lookups and updates" },
    { title: "Guardrails", desc: "Refusals, PI redaction, thresholds; human handoff" },
    { title: "Launch & Measure", desc: "Dashboards + weekly tuning" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white">
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
        
        <div className="relative px-6 pt-8 mx-auto max-w-7xl sm:pt-12 lg:pt-10">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div 
              className="space-y-8"
              initial="initial"
              animate="animate"
              variants={staggerContainer}
            >
              <motion.div 
              className="items-center hidden gap-2 px-4 py-2 text-blue-900 bg-gray-100 rounded-full lg:inline-flex"
              variants={scaleIn}
            >
              <Bot className="w-4 h-4" />
              <span className="text-sm font-medium">AI Chatbots & Virtual Assistants</span>
            </motion.div>
              
              <motion.h1 
                className="text-5xl font-bold leading-tight text-black lg:text-6xl"
                variants={fadeInUp}
              >
                AI chat that actually <span className="text-blue-900">helps</span>—on web, WhatsApp, and helpdesk
              </motion.h1>
              
              <motion.p 
                className="text-xl leading-relaxed text-gray-700"
                variants={fadeInUp}
              >
                Retrieval-first answers from your docs and systems, with clean escalation to humans and real analytics.
              </motion.p>
              
              <motion.div 
                className="flex flex-col gap-4 sm:flex-row"
                variants={fadeInUp}
              >
                <motion.button 
                  className="flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-white transition-colors bg-blue-900 rounded-lg hover:bg-blue-800"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Play className="w-5 h-5" />
                  Try the live demo
                </motion.button>
                <motion.button 
                  className="flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-blue-900 transition-colors bg-white border-2 border-blue-900 rounded-lg hover:bg-blue-50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Calendar className="w-5 h-5" />
                  See a 4-week pilot plan
                </motion.button>
              </motion.div>
              
              <motion.div 
                className="p-4 border border-blue-200 rounded-lg bg-blue-50"
                variants={fadeInUp}
              >
                <p className="text-sm text-black">
                  <span className="font-semibold text-blue-900">For:</span> Support, sales, and ops teams that want instant, brand-safe answers with human-in-the-loop and portable tech.
                </p>
              </motion.div>
            </motion.div>
            
            {/* Hero Image Placeholder */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          >
            <motion.div 
              className="p-8 rounded-2xl"
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <img 
                src={heroImage}
                alt="AI Assistant retrieves policy and creates a helpdesk ticket"
                className="object-cover w-3/4 mx-auto rounded-lg h-fit"
              />
              <div className="mt-4 text-center">
                <div className="text-sm text-gray-600">Hero diagram: Docs → Agent → Actions</div>
              </div>
            </motion.div>
          </motion.div>
          </div>
        </div>
      </section>

     {/* Live Demo Section */}
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
        See It In <span className="text-blue-900">Action</span>
      </h2>
      <p className="text-xl text-gray-700">Watch how our AI chatbot handles real conversations</p>
    </motion.div>
    
    <div className="grid gap-12 lg:grid-cols-2">
      {/* Demo Chat Interface */}
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
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <div className="text-lg font-bold">TeenyBot Assistant</div>
                <div className="text-sm text-blue-100">AI Helper • Online</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-300 rounded-full animate-pulse"></div>
              <span className="text-sm">Live Demo</span>
            </div>
          </div>
        </motion.div>
        
        <div className="p-6 overflow-y-auto min-h-96 max-h-96 bg-gray-50">
          <div className="space-y-4">
            {demoMessages.slice(0, currentMessageIndex + 1).map((message, index) => (
              <motion.div 
                key={index} 
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
              >
                <div className={`max-w-md ${message.type === 'user' ? 'ml-12' : 'mr-12'}`}>
                  <div className={`p-4 rounded-2xl ${
                    message.type === 'user' 
                      ? 'bg-gray-200 text-black rounded-tr-md' 
                      : 'bg-blue-900 text-white rounded-tl-md'
                  }`}>
                    <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                    {message.citations && (
                      <div className="px-2 py-1 mt-2 text-xs rounded bg-blue-400/20">
                        📄 Source cited
                      </div>
                    )}
                    {message.action && (
                      <div className="mt-2">
                        <button className="px-3 py-1 text-xs rounded-full bg-blue-400/20">
                          🎫 Creating ticket...
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="px-2 mt-1 text-xs text-gray-500">
                    {message.type === 'bot' ? 'TeenyBot' : 'Customer'} • Just now
                  </div>
                </div>
              </motion.div>
            ))}
            
            {isTyping && (
              <motion.div 
                className="flex justify-start mr-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-4 text-white bg-blue-900 rounded-2xl rounded-tl-md">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-white/60 animate-bounce"></div>
                    <div className="w-2 h-2 rounded-full bg-white/60 animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 rounded-full bg-white/60 animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
      
      {/* Demo Prompts & Features */}
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
          Try these prompts:
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
                <MessageCircle className="w-5 h-5 text-blue-900 mt-0.5" />
                <span className="text-black">"{prompt}"</span>
              </div>
            </motion.button>
          ))}
        </motion.div>
        
        {/* Real-time Analytics Dashboard */}
       <motion.div 
  className="p-6 bg-white border border-gray-200 shadow-lg rounded-xl"
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.3 }}
  transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
>
  <div className="flex items-center gap-3 mb-4">
    <Star className="w-6 h-6 text-yellow-500" />
    <h4 className="text-lg font-semibold text-gray-900">What Users Say</h4>
  </div>
  
  <motion.div 
    className="space-y-4"
    animate={{ y: [-10, 0, -10] }}
    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
  >
    <div className="p-4 rounded-lg bg-gray-50">
      <div className="flex items-center gap-1 mb-2">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
        ))}
      </div>
      <p className="text-sm italic text-gray-700">
        "TeenyBot resolved my issue in seconds. It's like having a super-smart assistant available 24/7!"
      </p>
      <div className="flex items-center gap-3 mt-3">
        <div className="flex items-center justify-center w-8 h-8 text-sm font-bold text-white bg-blue-500 rounded-full">
          S
        </div>
        <div>
          <div className="text-sm font-medium text-gray-900">Sarah Chen</div>
          <div className="text-xs text-gray-600">Product Manager</div>
        </div>
      </div>
    </div>
  </motion.div>
</motion.div>
      </motion.div>
    </div>
  </div>
</section>

      {/* Outcomes Section */}
                
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
                What <span className="text-blue-900">Changes</span>
              </h2>
              <p className="text-xl text-gray-700">Measurable improvements for your support operations</p>
            </motion.div>
            
            <motion.div 
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.3 }}
            >
              {/* Speed Card */}
              <motion.div 
                className="relative p-8 transition-shadow duration-300 bg-white rounded-2xl hover:shadow-lg"
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
                    Results
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-black">40-55% FAQ Deflection</h3>
                  <p className="leading-relaxed text-gray-600">
                    Instant answers to repetitive questions with source citations, reducing agent workload significantly.
                  </p>
                </div>
              </motion.div>

              {/* Intelligence Card */}
              <motion.div 
                className="relative p-8 transition-shadow duration-300 bg-white rounded-2xl hover:shadow-lg"
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
                    <Clock className="w-8 h-8 text-blue-900" />
                  </motion.div>
                  <div className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium text-blue-900 bg-blue-100 rounded-full">
                    Speed
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-black">Seconds Response Time</h3>
                  <p className="leading-relaxed text-gray-600">
                    Lightning-fast first responses for common queries, eliminating wait times for customers.
                  </p>
                </div>
              </motion.div> 

              {/* Clarity Card */}
              <motion.div 
                className="relative p-8 transition-shadow duration-300 bg-white rounded-2xl hover:shadow-lg"
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
                    <Headphones className="w-8 h-8 text-blue-900" />
                  </motion.div>
                  <div className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium text-blue-900 bg-blue-100 rounded-full">
                    Quality
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-black">Smart Handoffs</h3>
                  <p className="leading-relaxed text-gray-600">
                    Complete context transfer to human agents with conversation history and relevant documentation.
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
      <p className="text-xl text-gray-700">Complete AI chatbot solution with powerful integrations</p>
    </motion.div>
    
    <motion.div 
      className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Chat Interface */}
      <motion.div 
        className="relative p-8 hover:bg-white rounded-2xl"
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
            <MessageSquare className="w-8 h-8 text-blue-900" />
          </motion.div>
          <div className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium text-blue-900 bg-blue-100 rounded-full">
            Interface
          </div>
          <h3 className="mb-3 text-xl font-bold text-black">Multi-Channel Bot</h3>
          <p className="leading-relaxed text-gray-600">
            Deploy on website, WhatsApp, and social platforms with unified training and responses.
          </p>
        </div>
      </motion.div>

      {/* Integrations */}
      <motion.div 
        className="relative p-8 hover:bg-white rounded-2xl"
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
            <Headphones className="w-8 h-8 text-blue-900" />
          </motion.div>
          <div className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium text-blue-900 bg-blue-100 rounded-full">
            Integration
          </div>
          <h3 className="mb-3 text-xl font-bold text-black">Helpdesk Connection</h3>
          <p className="leading-relaxed text-gray-600">
            Seamless handoffs to Zendesk, Intercom, or HubSpot with full conversation context.
          </p>
        </div>
      </motion.div>

      {/* Actions */}
      <motion.div 
        className="relative p-8 hover:bg-white rounded-2xl"
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
            <Settings className="w-8 h-8 text-blue-900" />
          </motion.div>
          <div className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium text-blue-900 bg-blue-100 rounded-full">
            Automation
          </div>
          <h3 className="mb-3 text-xl font-bold text-black">Smart Actions</h3>
          <p className="leading-relaxed text-gray-600">
            Order lookups, ticket creation, appointment booking, and system updates automatically.
          </p>
        </div>
      </motion.div>

      {/* Analytics */}
      <motion.div 
        className="relative p-8 hover:bg-white rounded-2xl"
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
            <BarChart3 className="w-8 h-8 text-blue-900" />
          </motion.div>
          <div className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium text-blue-900 bg-blue-100 rounded-full">
            Analytics
          </div>
          <h3 className="mb-3 text-xl font-bold text-black">Performance Tracking</h3>
          <p className="leading-relaxed text-gray-600">
            Real-time dashboards showing deflection rates, response times, and customer satisfaction.
          </p>
        </div>
      </motion.div>
    </motion.div>
  </div>
</section>

      {/* How It Works */}
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
        How It <span className="text-blue-900">Works</span>
      </h2>
      <p className="text-xl text-gray-700">Simple 4-step process to deploy your AI assistant</p>
    </motion.div>
    
    <motion.div 
      className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Step 1 */}
      <motion.div 
        className="relative p-8 hover:bg-white hover:border hover:border-gray-200 rounded-2xl"
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
            <Database className="w-8 h-8 text-blue-900" />
          </motion.div>
          <div className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium text-blue-900 bg-blue-100 rounded-full">
            Setup
          </div>
          <h3 className="mb-3 text-xl font-bold text-black">Connect & Train</h3>
          <p className="leading-relaxed text-gray-600">
            We ingest your policies, FAQs, and documentation to build intelligent retrieval with citations.
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

      {/* Step 2 */}
      <motion.div 
        className="relative p-8 hover:bg-white hover:border hover:border-gray-200 rounded-2xl"
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
            <Zap className="w-8 h-8 text-blue-900" />
          </motion.div>
          <div className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium text-blue-900 bg-blue-100 rounded-full">
            Integration
          </div>
          <h3 className="mb-3 text-xl font-bold text-black">Wire Actions</h3>
          <p className="leading-relaxed text-gray-600">
            Configure safe tool-calling for order lookups, ticket updates, and system integrations.
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

      {/* Step 3 */}
      <motion.div 
        className="relative p-8 hover:bg-white hover:border hover:border-gray-200 rounded-2xl"
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
            <Shield className="w-8 h-8 text-blue-900" />
          </motion.div>
          <div className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium text-blue-900 bg-blue-100 rounded-full">
            Security
          </div>
          <h3 className="mb-3 text-xl font-bold text-black">Set Guardrails</h3>
          <p className="leading-relaxed text-gray-600">
            Implement safety measures, privacy protection, and smart human handoff triggers.
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

      {/* Step 4 */}
      <motion.div 
        className="relative p-8 hover:bg-white hover:border hover:border-gray-200 rounded-2xl"
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
            <Target className="w-8 h-8 text-blue-900" />
          </motion.div>
          <div className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium text-blue-900 bg-blue-100 rounded-full">
            Launch
          </div>
          <h3 className="mb-3 text-xl font-bold text-black">Launch & Optimize</h3>
          <p className="leading-relaxed text-gray-600">
            Go live with comprehensive dashboards and weekly performance tuning sessions.
          </p>
        </div>
      </motion.div>
    </motion.div>
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
            <p className="text-xl text-gray-700">Works with the tools you already use</p>
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

      {/* Guardrails & Privacy */}
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
                <span className="text-blue-900">Guardrails</span> & Privacy
              </motion.h2>
              <motion.div 
                className="space-y-6"
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.3 }}
              >
                {[
                  { icon: Shield, title: "Safe Responses", desc: "Refuses medical/legal/financial advice" },
                  { icon: FileText, title: "Full Logging", desc: "Logs every tool call for audit trail" },
                  { icon: Eye, title: "PII Protection", desc: "Redacts personal information in transcripts" }
                ].map((item, index) => (
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
                {['Deflection %', 'FRT', 'Source-cited %', 'Safe fallback %', 'CSAT impact', 'Handoff quality %'].map((kpi, index) => (
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

      {/* FAQs */}
      <section className="py-20 bg-gray-50">
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
              { q: "Will it replace agents?", a: "No—It handles repetitive work and escalates the rest." },
              { q: "Can it use our tone?", a: "Yes—style and vocabulary are configurable." },
              { q: "Do we need new tools?", a: "No—start with what you have." }
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
              <Bot className="w-5 h-5 text-blue-900" />
              <span className="text-sm font-medium text-blue-900">Ready to get started?</span>
            </motion.div>
            
            <motion.h2 
              className="mb-6 text-4xl font-bold text-black lg:text-5xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            >
              Start a <span className="text-blue-900">4-week pilot</span>
            </motion.h2>
            
            <motion.p 
              className="max-w-2xl mx-auto mb-8 text-xl leading-relaxed text-gray-700"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
            >
              Get your AI assistant up and running with measurable results. No long commitments, just proven outcomes.
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
            <motion.button 
              className="flex items-center justify-center gap-2 px-8 py-4 text-lg font-bold text-blue-900 transition-all duration-300 bg-white border-2 border-blue-900 shadow-lg rounded-xl hover:bg-blue-50 hover:border-blue-800"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Phone className="w-5 h-5" />
              Book a 45-min call
            </motion.button>
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
              <span className="text-sm">No setup fees</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-black">
              <CheckCircle2 className="w-5 h-5 text-blue-900" />
              <span className="text-sm">Quick deployment</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-black">
              <CheckCircle2 className="w-5 h-5 text-blue-900" />
              <span className="text-sm">Proven results</span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ChatbotsPage;