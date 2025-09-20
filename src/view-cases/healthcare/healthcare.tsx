import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageCircle, 
  ArrowRight, 
  Phone, 
  Shield, 
  RefreshCw, 
  Handshake, 
  DollarSign, 
  BarChart3, 
  Users, 
  CheckCircle,
  List,
  Settings,
  Monitor,
  Database,
  TrendingUp,
  Clock,
  Target
} from 'lucide-react';

import healthcareImage from "../../Images/Case Studies/Healthcare.png"


// Animation variants
const slideFromLeft = {
  hidden: { x: -100, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const slideFromRight = {
  hidden: { x: 100, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const slideFromTop = {
  hidden: { y: -80, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const slideFromBottom = {
  hidden: { y: 80, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const fadeIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

// Hero Section
const HeroSection = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bg-blue-100 rounded-full -top-40 -right-40 w-80 h-80 opacity-20"></div>
        <div className="absolute bg-gray-100 rounded-full -bottom-40 -left-40 w-80 h-80 opacity-20"></div>
      </div>
      
      <div className="relative px-6 py-20 mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left side content */}
          <motion.div 
            className="space-y-8"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h1 
              className="text-6xl font-bold leading-tight text-black"
              variants={slideFromLeft}
            >
              Your AI Workforce
              <span className="block text-blue-900">for Healthcare</span>
            </motion.h1>
            
            <motion.p 
              className="max-w-lg text-xl leading-relaxed text-gray-700"
              variants={slideFromLeft}
            >
              Digital workers capable of engaging patients, empowering your human 
              workforce, and enhancing health outcomes
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4"
              variants={slideFromLeft}
            >
              <button className="flex items-center gap-2 px-8 py-4 font-semibold text-white transition-colors bg-blue-900 rounded-lg hover:bg-blue-800">
                Get Started
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <button className="flex items-center gap-2 px-8 py-4 font-semibold text-blue-900 transition-colors border-2 border-blue-900 rounded-lg hover:bg-blue-50">
                Talk with an AI Agent
                <MessageCircle className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
          
          {/* Right side visualization */}
          <motion.div 
            className="relative"
            initial="hidden"
            animate="visible"
            variants={slideFromRight}
          >
            <div className="relative pt-8 bg-white shadow-2xl rounded-2xl">
              {/* Chat bubble */}
              <div className="absolute px-6 py-3 text-white bg-blue-900 rounded-bl-none shadow-lg -top-4 left-8 rounded-2xl">
                <p className="text-sm font-medium">How are you feeling since your last visit?</p>
              </div>
              
              {/* Dashboard mockup */}
              <div className="mt-2 space-y-6">
                {/* <div className="flex items-center justify-between">
                  <div className="w-32 h-4 bg-gray-200 rounded"></div>
                  <div className="w-20 h-4 bg-gray-200 rounded"></div>
                </div> */}
                
                {/* Chart area with image */}
                <div className="relative overflow-hidden rounded-lg h-72 bg-gradient-to-br from-blue-100 to-gray-100">
                  <img 
                    src={healthcareImage}
                    alt="Healthcare professional with patient" 
                    className="object-cover w-full h-full rounded-lg"
                  />
                  
                  {/* Floating metrics */}
                  <div className="absolute p-3 bg-white rounded-lg shadow-md top-4 right-4">
                    <div className="text-2xl font-bold text-blue-900">98%</div>
                    <div className="text-xs text-gray-500">Satisfaction</div>
                  </div>
                  
                  <div className="absolute p-3 bg-white rounded-lg shadow-md bottom-4 left-4">
                    <div className="text-2xl font-bold text-green-600">-65%</div>
                    <div className="text-xs text-gray-500">Response Time</div>
                  </div>
                </div>
                
                {/* Bottom metrics */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col items-center justify-center h-16 rounded-lg bg-blue-50">
                    <div className="text-lg font-bold text-blue-900">1,247</div>
                    <div className="text-xs text-gray-500">Patients</div>
                  </div>
                  <div className="flex flex-col items-center justify-center h-16 rounded-lg bg-green-50">
                    <div className="text-lg font-bold text-green-600">24/7</div>
                    <div className="text-xs text-gray-500">Available</div>
                  </div>
                  <div className="flex flex-col items-center justify-center h-16 rounded-lg bg-purple-50">
                    <div className="text-lg font-bold text-purple-600">5.2s</div>
                    <div className="text-xs text-gray-500">Avg Response</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Core Services Section (Voice Receptionist & Data Management)
const CoreServicesSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="px-6 mx-auto max-w-7xl">
        <motion.div 
          className="mb-16 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={slideFromTop}
        >
          <h2 className="mb-6 text-4xl font-bold text-blue-900">
            Healthcare Solutions
          </h2>
          <p className="max-w-4xl mx-auto text-xl leading-relaxed text-gray-700">
            AI-powered tools designed specifically for healthcare providers
          </p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Voice Receptionist */}
          <motion.div 
            className="h-full p-8 bg-white border border-gray-200 rounded-3xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={slideFromLeft}
          >
            <div className="mb-8 text-center">
              <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-blue-900 rounded-2xl">
                <Phone className="w-10 h-10 text-white" />
              </div>
              <h3 className="mb-4 text-3xl font-bold text-blue-900">
                Voice Receptionist
              </h3>
              <p className="text-lg leading-relaxed text-black">
                AI-powered voice assistance that handles patient calls, appointments, and inquiries with professional healthcare expertise.
              </p>
            </div>

            <div className="mb-8 space-y-6">
              <div className="p-4 shadow-sm bg-blue-50 rounded-xl">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-10 h-10 mr-4 bg-blue-100 rounded-lg">
                    <Clock className="w-6 h-6 text-blue-900" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900">24/7 Availability</h4>
                    <p className="text-sm text-black">Round-the-clock patient support</p>
                  </div>
                </div>
              </div>

              <div className="p-4 shadow-sm bg-blue-50 rounded-xl">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-10 h-10 mr-4 bg-blue-100 rounded-lg">
                    <Shield className="w-6 h-6 text-blue-900" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900">HIPAA Compliant</h4>
                    <p className="text-sm text-black">Secure patient information handling</p>
                  </div>
                </div>
              </div>

              <div className="p-4 shadow-sm bg-blue-50 rounded-xl">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-10 h-10 mr-4 bg-blue-100 rounded-lg">
                    <MessageCircle className="w-6 h-6 text-blue-900" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900">Natural Conversations</h4>
                    <p className="text-sm text-black">Human-like patient interactions</p>
                  </div>
                </div>
              </div>
            </div>

            <button className="flex items-center justify-center w-full px-6 py-3 font-semibold text-white transition-colors bg-blue-900 rounded-xl hover:bg-blue-800 group">
              Talk with Voice AI
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>

          {/* Data Management */}
          <motion.div 
            className="h-full p-8 bg-white border border-gray-200 rounded-3xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={slideFromRight}
          >
            <div className="mb-8 text-center">
              <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-blue-900 rounded-2xl">
                <Database className="w-10 h-10 text-white" />
              </div>
              <h3 className="mb-4 text-3xl font-bold text-blue-900">
                Data Management
              </h3>
              <p className="text-lg leading-relaxed text-black">
                Intelligent data organization and insights that help you understand patients better and optimize care delivery.
              </p>
            </div>

            <div className="mb-8 space-y-6">
              <div className="p-4 shadow-sm bg-blue-50 rounded-xl">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-10 h-10 mr-4 bg-blue-100 rounded-lg">
                    <BarChart3 className="w-6 h-6 text-blue-900" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900">Patient Analytics</h4>
                    <p className="text-sm text-black">Real-time health insights</p>
                  </div>
                </div>
              </div>

              <div className="p-4 shadow-sm bg-blue-50 rounded-xl">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-10 h-10 mr-4 bg-blue-100 rounded-lg">
                    <Target className="w-6 h-6 text-blue-900" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900">Care Coordination</h4>
                    <p className="text-sm text-black">Streamlined patient workflows</p>
                  </div>
                </div>
              </div>

              <div className="p-4 shadow-sm bg-blue-50 rounded-xl">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-10 h-10 mr-4 bg-blue-100 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-blue-900" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900">Automated Reports</h4>
                    <p className="text-sm text-black">Intelligent documentation</p>
                  </div>
                </div>
              </div>
            </div>

            <button className="flex items-center justify-center w-full px-6 py-3 font-semibold text-white transition-colors bg-blue-900 rounded-xl hover:bg-blue-800 group">
              View Data Solutions
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Practice Types Section
const PracticeTypesSection = () => {
  const practices = [
    {
      title: "Urgent Care Providers",
      description: "Expand patient relationships with targeted programs",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      title: "Surgery Centers", 
      description: "Enhance patient care while optimizing the procedure calendar",
      image: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      title: "Hospitals & Specialty Practices",
      description: "Support value-based care with personalized patient engagement", 
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      title: "Primary Care Clinics",
      description: "Drive consistency and patient follow-through with treatment plans",
      image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    }
  ];

  return (
    <div className="py-20 bg-white">
      <div className="px-6 mx-auto max-w-7xl">
        {/* Header */}
        <motion.div 
          className="mb-16 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={slideFromTop}
        >
          <h2 className="mb-6 text-4xl font-bold text-blue-900">
            AI Agents for Your Practice
          </h2>
          <p className="max-w-4xl mx-auto text-xl leading-relaxed text-gray-700">
            Our digital workers are designed specifically for your practice, with comprehensive 
            programs tailored to meet your unique patient needs
          </p>
        </motion.div>

        {/* Practice cards grid */}
        <motion.div 
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          {practices.map((practice, index) => (
            <motion.div
              key={index}
              className="overflow-hidden transition-shadow duration-300 bg-white border border-gray-200 shadow-lg rounded-2xl hover:shadow-xl group"
              variants={slideFromBottom}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={practice.image}
                  alt={practice.title}
                  className="object-cover w-full h-48 transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 transition-opacity duration-300 bg-blue-900 opacity-0 group-hover:opacity-20"></div>
              </div>
             
              <div className="p-6">
                <h3 className="mb-3 text-xl font-bold text-blue-900">
                  {practice.title}
                </h3>
                <p className="leading-relaxed text-black">
                  {practice.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

// Benefits Section
const BenefitsSection = () => {
  const benefits = [
    { icon: RefreshCw, text: "Enhance patient outcomes" },
    { icon: Handshake, text: "Strengthen patient relationships" },
    { icon: DollarSign, text: "Accelerate revenue" },
    { icon: BarChart3, text: "Increase efficiency and reduce costs" },
    { icon: Users, text: "Empower your human workforce" }
  ];

  const deliveryPoints = [
    "Role-specific AI agents",
    "Autonomous task execution and results", 
    "AI co-pilot to superpower your humans",
    "Seamless integration with your existing systems",
    "Self-learning and continuous improvement"
  ];

  return (
    <div className="py-20 bg-gray-50">
      <div className="px-6 mx-auto max-w-7xl">
        {/* Header */}
        <motion.div 
          className="mb-16 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={slideFromTop}
        >
          <h2 className="mb-6 text-4xl font-bold text-blue-900">
            How We Help Scale Your Practice
          </h2>
          <p className="max-w-4xl mx-auto text-xl leading-relaxed text-gray-700">
            AI voice, data management, and analytics tools that enhance your patient 
            interactions and streamline your operations
          </p>
        </motion.div>

        {/* Two column layout */}
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Benefits to You */}
          <motion.div 
            className="relative p-8 overflow-hidden bg-white border border-gray-200 rounded-2xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={slideFromLeft}
          >
            {/* Background decoration */}
            <div className="absolute w-40 h-40 bg-blue-100 rounded-full -top-20 -right-20 opacity-30"></div>
                     
            <h3 className="mb-4 text-2xl font-bold text-blue-900">
              Benefits to You
            </h3>
            <p className="mb-8 leading-relaxed text-black">
              We design, customize, and deploy digital workers to transform your practice
            </p>

            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="p-3 bg-blue-900 rounded-lg">
                    <benefit.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-lg text-black">{benefit.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* How We Deliver Them */}
          <motion.div 
            className="relative p-8 overflow-hidden bg-white border border-gray-200 rounded-2xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={slideFromRight}
          >
            {/* Background decoration */}
            <div className="absolute w-40 h-40 bg-blue-100 rounded-full -bottom-20 -left-20 opacity-30"></div>
                     
            <h3 className="mb-4 text-2xl font-bold text-blue-900">
              How We Deliver Them
            </h3>
            <p className="mb-8 leading-relaxed text-black">
              Machine learning, natural language processing, and scalable automation
            </p>

            <div className="space-y-6">
              {deliveryPoints.map((point, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="p-3 bg-blue-900 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-lg text-black">{point}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Getting Started Section
const GettingStartedSection = () => {
  const steps = [
    {
      number: "1)",
      title: "Define Strategy & Scope",
      icon: List,
      points: [
        "We work with you to identify specific healthcare challenges the AI agent will solve",
        "Together, we establish success metrics that align with your practice objectives"
      ]
    },
    {
      number: "2)",
      title: "Customize the AI Agent",
      icon: Settings,
      points: [
        "We define the agent's personality and interaction style to align with your practice",
        "We map out healthcare-specific workflows and patient interaction protocols"
      ]
    },
    {
      number: "3)",
      title: "Develop & Train",
      icon: Monitor,
      points: [
        "We configure HIPAA-compliant systems tailored to your healthcare use cases",
        "We train the agent with medical terminology and patient care protocols"
      ]
    },
    {
      number: "4)",
      title: "Integrate & Deploy",
      icon: Database,
      points: [
        "We seamlessly embed the AI agent into your existing healthcare systems",
        "We conduct pilot testing to ensure patient safety and satisfaction"
      ]
    },
    {
      number: "5)",
      title: "Optimize & Scale",
      icon: TrendingUp,
      points: [
        "We track patient satisfaction and care quality metrics",
        "The AI agent continuously improves using patient feedback and care outcomes"
      ]
    }
  ];

  return (
    <div className="py-20 bg-white">
      <div className="px-6 mx-auto max-w-7xl">
        {/* Header */}
        <motion.div 
          className="mb-16 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={slideFromTop}
        >
          <h2 className="mb-6 text-4xl font-bold text-blue-900">
            Getting Started is Easy
          </h2>
          <p className="max-w-4xl mx-auto text-xl leading-relaxed text-gray-700">
            Our streamlined process gets your AI workforce up and running quickly with minimal 
            disruption to your healthcare operations.
          </p>
        </motion.div>

        {/* Steps grid */}
        <motion.div 
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="p-6 transition-shadow bg-white border border-l-4 border-gray-200 border-blue-900 rounded-2xl hover:shadow-lg"
              variants={slideFromBottom}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-blue-900 rounded-lg">
                  <step.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-blue-900">{step.number}</span>
              </div>
             
              <h3 className="mb-4 text-xl font-bold text-blue-900">
                {step.title}
              </h3>
             
              <div className="space-y-3">
                {step.points.map((point, pointIndex) => (
                  <div key={pointIndex} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-2 h-2 mt-2 bg-blue-900 rounded-full"></div>
                    <p className="text-sm leading-relaxed text-black">{point}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

// Final CTA Section
const FinalCTASection = () => {
  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-4xl px-6 mx-auto text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.h2 
            className="mb-6 text-4xl font-bold text-blue-900"
            variants={slideFromTop}
          >
            Ready to Transform Patient Care?
          </motion.h2>
          
          <motion.p 
            className="mb-10 text-xl leading-relaxed text-gray-700"
            variants={slideFromBottom}
          >
            Join the healthcare providers already using AI agents to engage patients and scale their 
            practice with Teeny Tech Trek.
          </motion.p>
                 
          <motion.button 
            className="inline-flex items-center gap-3 px-10 py-4 text-lg font-bold text-white transition-colors bg-blue-900 rounded-lg shadow-lg hover:bg-blue-800"
            variants={slideFromBottom}
          >
            Hire Your First AI Agent
            <ArrowRight className="w-6 h-6" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

// Main Healthcare Component
const Healthcare = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <CoreServicesSection />
      <PracticeTypesSection />
      <BenefitsSection />
      <GettingStartedSection />
      <FinalCTASection />
    </div>
  );
};

export default Healthcare;