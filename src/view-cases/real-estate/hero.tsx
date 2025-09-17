import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
const Hero: React.FC = () => {
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
              <button className="flex items-center justify-center px-8 py-4 font-semibold text-white transition-colors bg-blue-900 rounded-lg hover:bg-blue-950 group">
                Get Started
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </button>
              
              <button className="flex items-center justify-center px-8 py-4 font-semibold text-black transition-colors border-2 border-black rounded-lg hover:border-blue-900 hover:text-blue-900">
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

              <div className="relative h-64 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Modern real estate property"
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

// Clean Solutions Section
const CleanSolutions: React.FC = () => {
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

  const activeSolution = solutions[activeTab as keyof typeof solutions];

  return (
    <section className="py-20 bg-white">
      <div className="px-6 mx-auto max-w-7xl">
        <motion.div 
          className="mb-16 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={slideFromTop}
        >
          <h2 className="mb-6 text-4xl font-bold text-blue-900 md:text-5xl">
            Our Core Solutions
          </h2>
          <p className="max-w-3xl mx-auto text-xl text-black">
            Powerful AI tools designed specifically for real estate professionals
          </p>
        </motion.div>

        <motion.div 
          className="flex justify-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={slideFromBottom}
        >
          <div className="p-1 bg-gray-100 rounded-lg">
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-8 py-3 rounded-md font-semibold transition-all duration-300 ${
                activeTab === 'analytics' 
                ? 'bg-white text-blue-900 shadow-sm' 
                : 'text-black hover:text-blue-900'
              }`}
            >
              Analytics Tool
            </button>
            <button
              onClick={() => setActiveTab('crm')}
              className={`px-8 py-3 rounded-md font-semibold transition-all duration-300 ${
                activeTab === 'crm' 
                ? 'bg-white text-blue-900 shadow-sm' 
                : 'text-black hover:text-blue-900'
              }`}
            >
              Custom CRM
            </button>
          </div>
        </motion.div>

        <div className="grid items-center gap-16 lg:grid-cols-2">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={slideFromLeft}
          >
            <h3 className="mb-4 text-3xl font-bold text-blue-900">
              {activeSolution.title}
            </h3>
            <p className="mb-8 text-lg leading-relaxed text-black">
              {activeSolution.description}
            </p>

            <button className="flex items-center px-8 py-4 font-semibold text-white transition-colors bg-blue-900 rounded-lg hover:bg-blue-950 group">
              Learn More
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>

          <motion.div 
            className="grid gap-6 sm:grid-cols-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            {activeSolution.features.map((feature, index) => (
              <motion.div 
                key={index}
                className="p-6 transition-colors bg-gray-50 rounded-xl hover:bg-gray-100 group"
                variants={slideFromRight}
              >
                <div className="flex items-center justify-center w-12 h-12 mb-4 transition-colors bg-blue-100 rounded-lg group-hover:bg-blue-200">
                  <feature.icon className="w-6 h-6 text-blue-900" />
                </div>
                <h4 className="mb-2 text-lg font-semibold text-blue-900">
                  {feature.title}
                </h4>
                <p className="text-sm leading-relaxed text-black">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Clean Metrics
const CleanMetrics: React.FC = () => {
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
    <section className="py-20 bg-white">
      <div className="px-6 mx-auto max-w-7xl">
        <motion.div 
          className="mb-16 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={slideFromTop}
        >
          <h2 className="mb-6 text-4xl font-bold text-blue-900 md:text-5xl">
            Proven Results
          </h2>
          <p className="max-w-3xl mx-auto text-xl text-black">
            Real outcomes from real estate professionals using our platform
          </p>
        </motion.div>

        <motion.div 
          className="grid gap-8 mb-16 md:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.div 
            className="p-8 text-center bg-white border border-black shadow-sm rounded-xl"
            variants={slideFromBottom}
          >
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-blue-100 rounded-full">
              <DollarSign className="w-8 h-8 text-blue-900" />
            </div>
            <div className="mb-2 text-4xl font-bold text-blue-900">
              {counters.revenue}%
            </div>
            <h3 className="mb-2 text-xl font-semibold text-blue-900">
              Revenue Growth
            </h3>
            <p className="text-black">
              Average increase in first quarter
            </p>
          </motion.div>

          <motion.div 
            className="p-8 text-center bg-white border border-black shadow-sm rounded-xl"
            variants={slideFromBottom}
          >
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-blue-100 rounded-full">
              <Clock className="w-8 h-8 text-blue-900" />
            </div>
            <div className="mb-2 text-4xl font-bold text-blue-900">
              {counters.time}h
            </div>
            <h3 className="mb-2 text-xl font-semibold text-blue-900">
              Time Saved Weekly
            </h3>
            <p className="text-black">
              Through intelligent automation
            </p>
          </motion.div>

          <motion.div 
            className="p-8 text-center bg-white border border-black shadow-sm rounded-xl"
            variants={slideFromBottom}
          >
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-blue-100 rounded-full">
              <Target className="w-8 h-8 text-blue-900" />
            </div>
            <div className="mb-2 text-4xl font-bold text-blue-900">
              {counters.conversion.toFixed(1)}x
            </div>
            <h3 className="mb-2 text-xl font-semibold text-blue-900">
              Conversion Rate
            </h3>
            <p className="text-black">
              Lead-to-client improvement
            </p>
          </motion.div>
        </motion.div>

        <motion.div 
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
        >
          <div className="max-w-4xl p-8 mx-auto bg-white border border-black shadow-sm rounded-xl">
            <blockquote className="mb-6 text-xl italic text-black">
              "The AI analytics completely transformed how we approach market analysis. We're making data-driven decisions that consistently outperform our competition."
            </blockquote>
            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className="font-semibold text-blue-900">Sarah Johnson</div>
                <div className="text-black">CEO, Premier Properties</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// CTA Section
const LightCTA: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl px-6 mx-auto text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.h2 
            className="mb-6 text-4xl font-bold text-blue-900 md:text-5xl"
            variants={slideFromTop}
          >
            Ready to Transform Real Estate?
          </motion.h2>
          
          <motion.p 
            className="mb-12 text-xl leading-relaxed text-black"
            variants={slideFromBottom}
          >
            Join the companies already using AI agents to engage clients and scale their practice with Teeny Tech Trek.
          </motion.p>

          <motion.button 
            className="flex items-center justify-center px-12 py-4 mx-auto text-lg font-semibold text-white transition-colors bg-blue-900 rounded-lg hover:bg-blue-950 group"
            variants={slideFromBottom}
          >
            Hire Your First AI Agent
            <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

// Main Index
const RealEstateIndex: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <CleanSolutions />
      <CleanMetrics />
      <LightCTA />
    </div>
  );
};

export default RealEstateIndex;
