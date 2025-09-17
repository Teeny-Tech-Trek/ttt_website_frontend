import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  ShieldCheck, 
  Globe, 
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
  visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
};
const slideFromRight = {
  hidden: { x: 100, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
};
const slideFromTop = {
  hidden: { y: -80, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
};
const slideFromBottom = {
  hidden: { y: 80, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
};
const fadeIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } }
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } }
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
              AI-Powered Compliance  
              <br />
              <span className="text-blue-900">for AEO / GEO</span>
            </motion.h1>
            
            <motion.p 
              className="max-w-lg text-xl leading-relaxed text-black"
              variants={slideFromLeft}
            >
              Secure, reliable, and globally recognized AI systems  
              streamlining customs clearance, supply chain monitoring,  
              and international compliance.
            </motion.p>

            <motion.div 
              className="flex flex-col gap-4 sm:flex-row"
              variants={slideFromLeft}
            >
              <button className="flex items-center justify-center px-8 py-4 font-semibold text-white transition-colors bg-blue-900 rounded-lg hover:bg-blue-950 group">
                Get Certified Faster
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </button>
              
              <button className="flex items-center justify-center px-8 py-4 font-semibold text-black transition-colors border-2 border-black rounded-lg hover:border-blue-900 hover:text-blue-900">
                <MessageCircle className="w-5 h-5 mr-2" />
                Talk to Compliance AI
              </button>
            </motion.div>
          </motion.div>

          {/* Right Visual */}
          <motion.div 
            className="relative"
            initial="hidden"
            animate="visible"
            variants={slideFromRight}
          >
            <div className="overflow-hidden bg-white border border-black shadow-xl rounded-2xl">
              <div className="px-6 py-4 bg-blue-900">
                <div className="inline-block px-4 py-2 text-sm font-medium text-white bg-blue-800 rounded-full">
                  How secure is your global supply chain?
                </div>
              </div>

              <div className="relative h-64 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1581092918380-22c83a69ad70?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Global supply chain"
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-black/20"></div>
                
                <div className="absolute px-4 py-2 rounded-lg shadow-lg top-4 left-4 bg-white/95">
                  <div className="text-lg font-bold text-blue-900">99.8%</div>
                  <div className="text-sm text-black">Compliance Accuracy</div>
                </div>
                
                <div className="absolute px-4 py-2 rounded-lg shadow-lg bottom-4 right-4 bg-white/95">
                  <div className="text-lg font-bold text-blue-900">60%</div>
                  <div className="text-sm text-black">Faster Clearance</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Solutions Section
const Solutions: React.FC = () => {
  const [activeTab, setActiveTab] = useState('compliance');

  const solutions = {
    compliance: {
      title: "AI Compliance Monitoring",
      description: "Automated validation for customs, trade, and logistics documentation.",
      features: [
        { icon: ShieldCheck, title: "Regulatory Checks", desc: "Automatic validation against customs regulations" },
        { icon: Globe, title: "Global Integration", desc: "Multi-region compliance intelligence" },
        { icon: PieChart, title: "Risk Scoring", desc: "AI-driven risk profiling for shipments" },
        { icon: Zap, title: "Real-Time Alerts", desc: "Instant notifications on discrepancies" }
      ]
    },
    operations: {
      title: "Global Operations Dashboard",
      description: "Unified view for shipments, partners, and supply chain efficiency.",
      features: [
        { icon: MapPin, title: "Smart Routing", desc: "Optimized shipment paths with AI" },
        { icon: Users, title: "Partner Management", desc: "Monitor authorized partners globally" },
        { icon: Calendar, title: "Automated Scheduling", desc: "Reduce delays with AI planning" },
        { icon: Target, title: "Performance KPIs", desc: "Track customs clearance & delivery speed" }
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
            AEO/GEO Solutions
          </h2>
          <p className="max-w-3xl mx-auto text-xl text-black">
            Accelerate global trade compliance and secure supply chains.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center mb-16">
          <div className="p-1 bg-gray-100 rounded-lg">
            <button
              onClick={() => setActiveTab('compliance')}
              className={`px-8 py-3 rounded-md font-semibold transition-all duration-300 ${
                activeTab === 'compliance' ? 'bg-white text-blue-900 shadow-sm' : 'text-black hover:text-blue-900'
              }`}
            >
              Compliance
            </button>
            <button
              onClick={() => setActiveTab('operations')}
              className={`px-8 py-3 rounded-md font-semibold transition-all duration-300 ${
                activeTab === 'operations' ? 'bg-white text-blue-900 shadow-sm' : 'text-black hover:text-blue-900'
              }`}
            >
              Operations
            </button>
          </div>
        </div>

        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left */}
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

          {/* Right */}
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
                <h4 className="mb-2 text-lg font-semibold text-blue-900">{feature.title}</h4>
                <p className="text-sm leading-relaxed text-black">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Metrics Section
const Metrics: React.FC = () => {
  const [counters, setCounters] = useState({ clearance: 0, time: 0, trust: 0 });

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setCounters(prev => ({
          clearance: Math.min(prev.clearance + 1, 99),
          time: Math.min(prev.time + 2, 60),
          trust: Math.min(prev.trust + 1, 100)
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
            Proven Global Impact
          </h2>
          <p className="max-w-3xl mx-auto text-xl text-black">
            Trusted by logistics and trade leaders across the world.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          <motion.div className="p-8 text-center bg-white border border-black shadow-sm rounded-xl" variants={slideFromBottom}>
            <div className="text-4xl font-bold text-blue-900">{counters.clearance}%</div>
            <p className="mt-2 text-black">Faster Customs Clearance</p>
          </motion.div>
          <motion.div className="p-8 text-center bg-white border border-black shadow-sm rounded-xl" variants={slideFromBottom}>
            <div className="text-4xl font-bold text-blue-900">{counters.time}%</div>
            <p className="mt-2 text-black">Reduced Processing Time</p>
          </motion.div>
          <motion.div className="p-8 text-center bg-white border border-black shadow-sm rounded-xl" variants={slideFromBottom}>
            <div className="text-4xl font-bold text-blue-900">{counters.trust}%</div>
            <p className="mt-2 text-black">Trusted by Enterprises</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// CTA
const CTA: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl px-6 mx-auto text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={staggerContainer}>
          <motion.h2 className="mb-6 text-4xl font-bold text-blue-900 md:text-5xl" variants={slideFromTop}>
            Ready for AEO/GEO Compliance?
          </motion.h2>
          
          <motion.p className="mb-12 text-xl leading-relaxed text-black" variants={slideFromBottom}>
            Let AI streamline your certification process and strengthen global trust in your supply chain.
          </motion.p>

          <motion.button 
            className="flex items-center justify-center px-12 py-4 mx-auto text-lg font-semibold text-white transition-colors bg-blue-900 rounded-lg hover:bg-blue-950 group"
            variants={slideFromBottom}
          >
            Start Your Journey
            <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

// Main Index
const AEOIndex: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Solutions />
      <Metrics />
      <CTA />
    </div>
  );
};

export default AEOIndex;
