import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Database, 
  Users, 
  MapPin, 
  Zap, 
  ArrowRight, 
  Target,
  Clock,
  DollarSign,
  MessageCircle,
  PieChart,
  Calendar
} from 'lucide-react';
import { motion } from "framer-motion";

import realStateImg from "../../Images/Case Studies/RealEstate.png"
import { HashLink } from 'react-router-hash-link';

// Animation variants with responsive considerations
const slideFromLeft = {
  hidden: { x: -50, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const slideFromRight = {
  hidden: { x: 50, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const slideFromTop = {
  hidden: { y: -30, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const slideFromBottom = {
  hidden: { y: 30, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const fadeIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

// Hero Section - Ultra Responsive with Fixed Spacing
const Hero: React.FC = ({onOpenChatbot}) => {
  const handleTryDemo = (e) => {
  e.preventDefault();
  e.stopPropagation();
  if (onOpenChatbot) {
    onOpenChatbot();
  }
};
  return (
    <section className="relative min-h-screen overflow-hidden bg-white">
      <div className="px-6 py-20 mx-auto max-w-7xl">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left Content */}
          <motion.div 
            className="space-y-8"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h1 
              className="text-5xl font-black leading-tight text-black md:text-6xl lg:text-7xl"
              variants={slideFromLeft}
            >
              Your AI Workforce
              <br />
              <span className="text-blue-900">for Real Estate</span>
            </motion.h1>
            
            <motion.p 
              className="max-w-lg text-xl leading-relaxed text-black"
              variants={slideFromLeft}
            >
              Intelligent systems capable of analyzing markets, 
              empowering your sales team, and enhancing 
              property outcomes
            </motion.p>

            <motion.div 
              className="flex flex-col gap-4 sm:flex-row"
              variants={slideFromLeft}
            >
             
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <HashLink 
                                smooth 
                                to="/#contact"
                                className="flex items-center justify-center px-8 py-4 font-semibold text-white transition-colors bg-blue-900 rounded-lg hover:bg-blue-950 group"
                              >
                                Get Started
                                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                              </HashLink>
                            </motion.div>
              
              <button
               onClick={handleTryDemo}
              className="flex items-center justify-center px-8 py-4 font-semibold text-black transition-colors border-2 border-black rounded-lg hover:border-blue-900 hover:text-blue-900">
                <MessageCircle className="w-5 h-5 mr-2" />
                Talk with an AI Agent
              </button>
            </motion.div>
          </motion.div>

          {/* Right Visual Dashboard */}
          <motion.div 
            className="relative"
            initial="hidden"
            animate="visible"
            variants={slideFromRight}
          >
            <div className="overflow-hidden bg-white border border-black shadow-xl rounded-2xl">
              <div className="px-6 py-4 bg-blue-900">
                <div className="inline-block px-4 py-2 text-sm font-medium text-white bg-blue-800 rounded-full">
                  How is your portfolio performing this quarter?
                </div>
              </div>

              <div className="relative overflow-hidden h-80">
                <img 
                  src={realStateImg}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-black/20"></div>
                
                <div className="absolute px-4 py-2 rounded-lg shadow-lg top-4 left-4 bg-white/95">
                  <div className="text-lg font-bold text-blue-900">+47%</div>
                  <div className="text-sm text-black">Portfolio Growth</div>
                </div>
                
                <div className="absolute px-4 py-2 rounded-lg shadow-lg top-4 right-4 bg-white/95">
                  <div className="text-lg font-bold text-blue-900">98%</div>
                  <div className="text-sm text-black">Accuracy</div>
                </div>

                <div className="absolute px-4 py-2 rounded-lg shadow-lg bottom-4 left-4 bg-white/95">
                  <div className="text-lg font-bold text-blue-900">-65%</div>
                  <div className="text-sm text-black">Analysis Time</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6 p-6 bg-white">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-900">2,847</div>
                  <div className="text-sm text-black">Properties</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-900">24/7</div>
                  <div className="text-sm text-black">Available</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-900">3.2s</div>
                  <div className="text-sm text-black">Avg Response</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Clean Solutions Section - Ultra Responsive with Better Spacing
const CleanSolutions = () => {
  const [activeTab, setActiveTab] = useState('analytics');

  const solutions = {
    analytics: {
      title: "Advanced Analytics Tool",
      description: "Transform raw market data into actionable insights with AI-powered analytics",
      features: [
        { icon: TrendingUp, title: "Market Prediction", desc: "Forecast trends 6 months ahead with 94% accuracy" },
        { icon: MapPin, title: "Location Intelligence", desc: "Geographic insights for optimal property decisions" },
        { icon: PieChart, title: "Portfolio Analysis", desc: "Comprehensive performance tracking and optimization" },
        { icon: Target, title: "Lead Scoring", desc: "AI-powered qualification and ranking system" }
      ]
    },
    crm: {
      title: "Custom CRM Solutions",
      description: "Tailored relationship management built specifically for real estate professionals",
      features: [
        { icon: Users, title: "Client Intelligence", desc: "Deep insights into client preferences and behavior" },
        { icon: Calendar, title: "Smart Scheduling", desc: "AI-optimized appointment and follow-up management" },
        { icon: Database, title: "Property Matching", desc: "Intelligent property-client pairing system" },
        { icon: Zap, title: "Workflow Automation", desc: "Streamlined processes from lead to closing" }
      ]
    }
  };

  const activeSolution = solutions[activeTab];

  return (
    <section className="py-2 bg-white sm:py-3 lg:py-4 xl:py-6">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="mb-8 text-center sm:mb-10 lg:mb-12">
          <h2 className="mb-6 text-xl font-bold text-blue-900 sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl sm:mb-8">
            Our Core Solutions
          </h2>
          <p className="max-w-4xl mx-auto text-sm text-black sm:text-base lg:text-base xl:leading-relaxed">
            Powerful AI tools designed specifically for real estate professionals
          </p>
        </div>

        <div className="flex justify-center mb-8 sm:mb-10 lg:mb-12">
          <div className="p-2 bg-gray-100 rounded-lg">
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-6 py-3 text-base font-semibold transition-all duration-300 rounded-md sm:px-8 sm:py-4 sm:text-lg lg:px-10 ${
                activeTab === 'analytics' 
                ? 'bg-white text-blue-900 shadow-sm' 
                : 'text-black hover:text-blue-900'
              }`}
            >
              <span className="hidden sm:inline">Analytics Tool</span>
              <span className="sm:hidden">Analytics</span>
            </button>
            <button
              onClick={() => setActiveTab('crm')}
              className={`px-6 py-3 text-base font-semibold transition-all duration-300 rounded-md sm:px-8 sm:py-4 sm:text-lg lg:px-10 ${
                activeTab === 'crm' 
                ? 'bg-white text-blue-900 shadow-sm' 
                : 'text-black hover:text-blue-900'
              }`}
            >
              <span className="hidden sm:inline">Custom CRM</span>
              <span className="sm:hidden">CRM</span>
            </button>
          </div>
        </div>

        <div className="grid items-center gap-12 sm:gap-16 lg:gap-20 xl:gap-24 lg:grid-cols-2">
          <div className="order-2 space-y-6 lg:order-1 sm:space-y-8">
            <h3 className="text-lg font-bold text-blue-900 sm:text-xl lg:text-2xl xl:text-2xl">
              {activeSolution.title}
            </h3>
            <p className="text-xs leading-relaxed text-black sm:text-sm lg:text-base xl:text-base xl:leading-relaxed">
              {activeSolution.description}
            </p>

            <div className="pt-4 sm:pt-6">
              <button className="flex items-center justify-center w-full px-8 py-4 text-lg font-semibold text-white transition-colors bg-blue-900 rounded-lg sm:w-auto sm:px-10 sm:py-5 hover:bg-blue-950 group">
                Learn More
                <ArrowRight className="w-5 h-5 ml-3 transition-transform sm:w-6 sm:h-6 group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          <div className="grid order-1 gap-6 sm:gap-8 lg:gap-10 sm:grid-cols-2 lg:order-2">
            {activeSolution.features.map((feature, index) => (
              <div 
                key={index}
                className="p-6 transition-colors bg-gray-50 rounded-xl hover:bg-gray-100 group sm:p-8"
              >
                <div className="flex items-center justify-center w-12 h-12 mb-4 transition-colors bg-blue-100 rounded-lg sm:w-16 sm:h-16 sm:mb-6 group-hover:bg-blue-200">
                  <feature.icon className="w-6 h-6 text-blue-900 sm:w-8 sm:h-8" />
                </div>
                <h4 className="mb-3 text-lg font-semibold text-blue-900 sm:text-xl lg:text-2xl sm:mb-4">
                  {feature.title}
                </h4>
                <p className="text-sm leading-relaxed text-black sm:text-base lg:text-lg xl:leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Clean Metrics - Ultra Responsive with Proper Spacing
const CleanMetrics = () => {
  const [counters, setCounters] = useState({ revenue: 0, time: 0, conversion: 0 });

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setCounters(prev => ({
          revenue: Math.min(prev.revenue + 2, 47),
          time: Math.min(prev.time + 1, 23),
          conversion: Math.min(prev.conversion + 0.1, 3.8)
        }));
      }, 50);
      
      setTimeout(() => clearInterval(interval), 2000);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-6 bg-white sm:py-8 lg:py-10 xl:py-12">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="mb-8 text-center sm:mb-10 lg:mb-12">
          <h2 className="mb-6 text-xl font-bold text-blue-900 sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl sm:mb-8">
            Proven Results
          </h2>
          <p className="max-w-4xl mx-auto text-sm text-black sm:text-base lg:text-base xl:leading-relaxed">
            Real outcomes from real estate professionals using our platform
          </p>
        </div>

        <div className="grid gap-4 mb-8 sm:gap-6 md:grid-cols-3 sm:mb-10 lg:gap-8 lg:mb-12">
          <div className="p-8 text-center bg-white border border-black shadow-sm rounded-xl sm:p-10 lg:p-12">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-blue-100 rounded-full sm:w-20 sm:h-20 sm:mb-8">
              <DollarSign className="w-8 h-8 text-blue-900 sm:w-10 sm:h-10" />
            </div>
            <div className="mb-3 text-2xl font-bold text-blue-900 sm:text-3xl lg:text-3xl xl:text-4xl sm:mb-4">
              {counters.revenue}%
            </div>
            <h3 className="mb-3 text-base font-semibold text-blue-900 sm:text-lg lg:text-lg xl:text-xl sm:mb-4">
              Revenue Growth
            </h3>
            <p className="text-xs text-black sm:text-sm lg:text-sm xl:text-base">
              Average increase in first quarter
            </p>
          </div>

          <div className="p-8 text-center bg-white border border-black shadow-sm rounded-xl sm:p-10 lg:p-12">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-blue-100 rounded-full sm:w-20 sm:h-20 sm:mb-8">
              <Clock className="w-8 h-8 text-blue-900 sm:w-10 sm:h-10" />
            </div>
            <div className="mb-3 text-2xl font-bold text-blue-900 sm:text-3xl lg:text-3xl xl:text-4xl sm:mb-4">
              {counters.time}h
            </div>
            <h3 className="mb-3 text-base font-semibold text-blue-900 sm:text-lg lg:text-lg xl:text-xl sm:mb-4">
              Time Saved Weekly
            </h3>
            <p className="text-xs text-black sm:text-sm lg:text-sm xl:text-base">
              Through intelligent automation
            </p>
          </div>

          <div className="p-8 text-center bg-white border border-black shadow-sm md:col-span-1 rounded-xl sm:p-10 lg:p-12">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-blue-100 rounded-full sm:w-20 sm:h-20 sm:mb-8">
              <Target className="w-8 h-8 text-blue-900 sm:w-10 sm:h-10" />
            </div>
            <div className="mb-3 text-2xl font-bold text-blue-900 sm:text-3xl lg:text-3xl xl:text-4xl sm:mb-4">
              {counters.conversion.toFixed(1)}x
            </div>
            <h3 className="mb-3 text-base font-semibold text-blue-900 sm:text-lg lg:text-lg xl:text-xl sm:mb-4">
              Conversion Rate
            </h3>
            <p className="text-xs text-black sm:text-sm lg:text-sm xl:text-base">
              Lead-to-client improvement
            </p>
          </div>
        </div>

        <div className="text-center">
          <div className="max-w-5xl p-8 mx-auto bg-white border border-black shadow-sm rounded-xl sm:p-10 lg:p-12">
            <blockquote className="mb-8 text-base italic text-black sm:text-lg lg:text-lg xl:text-xl sm:mb-10 xl:leading-relaxed">
              "The AI analytics completely transformed how we approach market analysis. We're making data-driven decisions that consistently outperform our competition."
            </blockquote>
            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className="text-sm font-semibold text-blue-900 sm:text-base lg:text-base xl:text-lg">Sarah Johnson</div>
                <div className="text-xs text-black sm:text-sm lg:text-sm xl:text-base">CEO, Premier Properties</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// CTA Section - Ultra Responsive with Better Spacing
const LightCTA = () => {
  return (
    <section className="py-6 bg-white sm:py-8 lg:py-10 xl:py-12">
      <div className="max-w-5xl px-4 mx-auto text-center sm:px-6 lg:px-8">
        <h2 className="mb-8 text-xl font-bold text-blue-900 sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl sm:mb-10">
          Ready to Transform Real Estate?
        </h2>
        
        <p className="mb-12 text-sm leading-relaxed text-black sm:text-base lg:text-base xl:text-lg sm:mb-16 xl:leading-relaxed">
          Join the companies already using AI agents to engage clients and scale their practice with Teeny Tech Trek.
        </p>

     
      <div className="flex justify-center">
        <HashLink
          smooth
          to="/#contact"
          className="flex items-center justify-center px-10 py-5 text-lg font-semibold text-white transition-colors bg-blue-900 rounded-lg sm:px-12 sm:py-6 sm:text-xl hover:bg-blue-950 group w-96 sm:w-auto"
        >
          <span className="hidden sm:inline">Hire Your First AI Agent</span>
          <span className="sm:hidden">Get Started</span>
          <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1 sm:w-6 sm:h-6" />
        </HashLink>
      </div>

      </div>
    </section>
  );
};

// Main Index - Ultra Responsive
const RealEstateIndex = ({onOpenChatbot}) => {
  return (
    <div className="min-h-screen bg-white">
      <Hero onOpenChatbot={onOpenChatbot}/>
      <CleanSolutions />
      <CleanMetrics />
      <LightCTA />
    </div>
  );
};

export default RealEstateIndex;