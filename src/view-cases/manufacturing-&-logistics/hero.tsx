// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { 
//   Phone, Database, Users, BarChart3, Truck, Factory, 
//   ArrowRight, Target, Clock, DollarSign, Rocket, TrendingUp, 
//   Settings, FileText 
// } from 'lucide-react';

// // Animation variants
// const slideFromLeft = { hidden: { x: -100, opacity: 0 }, visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } } };
// const slideFromRight = { hidden: { x: 100, opacity: 0 }, visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } } };
// const slideFromTop = { hidden: { y: -80, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } } };
// const slideFromBottom = { hidden: { y: 80, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } } };
// const fadeIn = { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } } };
// const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } } };

// // Hero
// const Hero: React.FC = () => (
//   <section className="relative min-h-screen overflow-hidden bg-white">
//     <div className="px-6 py-20 mx-auto max-w-7xl">
//       <div className="grid items-center gap-16 lg:grid-cols-2">
//         {/* Left */}
//         <motion.div className="space-y-8" initial="hidden" animate="visible" variants={staggerContainer}>
//           <motion.h1 className="text-5xl font-black leading-tight text-black md:text-6xl lg:text-7xl" variants={slideFromLeft}>
//             Your AI Call Agent
//             <br />
//             <span className="text-blue-900">for Manufacturing & Logistics</span>
//           </motion.h1>

//           <motion.p className="max-w-lg text-xl leading-relaxed text-black" variants={slideFromLeft}>
//             AI-powered lead generation that never sleeps. Transform your sales process with intelligent calling that connects you to quality prospects 24/7.
//           </motion.p>

//           <motion.div className="flex flex-col gap-4 sm:flex-row" variants={slideFromLeft}>
//             <button className="flex items-center justify-center px-8 py-4 font-semibold text-white transition-colors bg-blue-900 rounded-lg hover:bg-blue-800 group">
//               Start Generating Leads
//               <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
//             </button>
            
//             <button className="flex items-center justify-center px-8 py-4 font-semibold text-black transition-colors border-2 border-black rounded-lg hover:border-blue-900 hover:text-blue-900">
//               <Phone className="w-5 h-5 mr-2" />
//               Demo AI Call Agent
//             </button>
//           </motion.div>
//         </motion.div>

//         {/* Right */}
//         <motion.div className="relative" initial="hidden" animate="visible" variants={slideFromRight}>
//           <img 
//             src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
//             alt="Manufacturing and logistics facility"
//             className="w-full h-[500px] object-cover rounded-2xl shadow-xl"
//           />
//         </motion.div>
//       </div>
//     </div>
//   </section>
// );

// // Features
// const AICallFeatures: React.FC = () => {
//   const [activeFeature, setActiveFeature] = useState('ai-calls');

//   const features = {
//     'ai-calls': { title: "AI-Powered Calls", description: "Human-like voice conversations that engage prospects naturally", icon: Phone },
//     'crm-integration': { title: "CRM Integration", description: "Sync leads and data effortlessly with your CRM", icon: Database },
//     'ivr-integration': { title: "IVR Integration", description: "Works seamlessly with your existing infrastructure", icon: Settings },
//     'call-summary': { title: "Call Summary", description: "Concise summaries after every call with key insights", icon: FileText },
//     'call-analysis': { title: "Call Analysis Report", description: "Performance metrics to improve results", icon: BarChart3 },
//     'always-available': { title: "24/7 Available", description: "Never miss a lead - works around the clock", icon: Clock }
//   };

//   const featureList = Object.entries(features);

//   return (
//     <section className="py-20 bg-white">
//       <div className="px-6 mx-auto max-w-7xl">
//         <motion.div className="mb-16 text-center" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={slideFromTop}>
//           <h2 className="mb-6 text-4xl font-bold text-blue-900 md:text-5xl">Supercharge Your Business Calls</h2>
//           <p className="max-w-3xl mx-auto text-xl text-black">Say goodbye to missed opportunities and hello to smarter calling with our AI Call Agent</p>
//         </motion.div>

//         {/* Grid */}
//         <motion.div className="grid gap-8 mb-16 md:grid-cols-2 lg:grid-cols-3" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={staggerContainer}>
//           {featureList.map(([key, feature]) => (
//             <motion.div 
//               key={key}
//               className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
//                 activeFeature === key ? 'border-blue-900 bg-blue-50' : 'border-gray-200 hover:border-blue-900 bg-white'
//               }`}
//               onClick={() => setActiveFeature(key)}
//               variants={slideFromBottom}
//             >
//               <div className={`w-12 h-12 flex items-center justify-center mb-4 rounded-lg ${
//                 activeFeature === key ? 'bg-blue-900' : 'bg-gray-200'
//               }`}>
//                 <feature.icon className={`w-6 h-6 ${activeFeature === key ? 'text-white' : 'text-black'}`} />
//               </div>
//               <h3 className="mb-2 text-lg font-semibold text-blue-900">{feature.title}</h3>
//               <p className="text-sm text-black">{feature.description}</p>
//             </motion.div>
//           ))}
//         </motion.div>

//         {/* CTA */}
//         <motion.div className="text-center" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={slideFromBottom}>
//           <button className="flex items-center justify-center px-12 py-4 mx-auto text-lg font-semibold text-white transition-colors bg-blue-900 rounded-lg hover:bg-blue-800 group">
//             <Rocket className="w-6 h-6 mr-3" />
//             Start Your AI Call Campaign
//             <ArrowRight className="w-6 h-6 ml-3 transition-transform group-hover:translate-x-1" />
//           </button>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// // Lead Generation
// const LeadGeneration: React.FC = () => {
//   const [counters, setCounters] = useState({ leads: 0, conversion: 0, cost: 0 });

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       const interval = setInterval(() => {
//         setCounters(prev => ({
//           leads: Math.min(prev.leads + 5, 340),
//           conversion: Math.min(prev.conversion + 1, 67),
//           cost: Math.min(prev.cost + 2, 78)
//         }));
//       }, 50);
//       setTimeout(() => clearInterval(interval), 2000);
//     }, 500);
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <section className="py-20 bg-white">
//       <div className="px-6 mx-auto max-w-7xl">
//         <motion.div className="mb-16 text-center" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={slideFromTop}>
//           <h2 className="mb-6 text-4xl font-bold text-blue-900 md:text-5xl">
//             Manufacturing & Logistics <span className="text-blue-900">Lead Generation</span>
//           </h2>
//           <p className="max-w-3xl mx-auto text-xl text-black">Specialized AI calling designed for the manufacturing and logistics industry</p>
//         </motion.div>

//         {/* Success Metrics */}
//         <div className="grid gap-6 md:grid-cols-3">
//           <motion.div className="p-6 text-center bg-white border border-gray-200 shadow-sm rounded-xl" variants={slideFromLeft}>
//             <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full">
//               <Users className="w-8 h-8 text-blue-900" />
//             </div>
//             <div className="mb-2 text-3xl font-bold text-blue-900">{counters.leads}+</div>
//             <h3 className="mb-2 font-semibold text-blue-900">Quality Leads/Month</h3>
//             <p className="text-black">Pre-qualified manufacturing prospects</p>
//           </motion.div>

//           <motion.div className="p-6 text-center bg-white border border-gray-200 shadow-sm rounded-xl" variants={slideFromLeft}>
//             <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full">
//               <TrendingUp className="w-8 h-8 text-blue-900" />
//             </div>
//             <div className="mb-2 text-3xl font-bold text-blue-900">{counters.conversion}%</div>
//             <h3 className="mb-2 font-semibold text-blue-900">Conversion Rate</h3>
//             <p className="text-black">From lead to qualified prospect</p>
//           </motion.div>

//           <motion.div className="p-6 text-center bg-white border border-gray-200 shadow-sm rounded-xl" variants={slideFromLeft}>
//             <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full">
//               <DollarSign className="w-8 h-8 text-blue-900" />
//             </div>
//             <div className="mb-2 text-3xl font-bold text-blue-900">{counters.cost}%</div>
//             <h3 className="mb-2 font-semibold text-blue-900">Lower Cost Per Lead</h3>
//             <p className="text-black">Compared to traditional methods</p>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// };

// // CTA
// const LightCTA: React.FC = () => (
//   <section className="py-20 bg-white">
//     <div className="max-w-4xl px-6 mx-auto text-center">
//       <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={staggerContainer}>
//         <motion.h2 className="mb-6 text-4xl font-bold text-blue-900 md:text-5xl" variants={slideFromTop}>
//           Ready to Supercharge Your Manufacturing Sales?
//         </motion.h2>
//         <motion.p className="mb-12 text-xl leading-relaxed text-black" variants={slideFromBottom}>
//           Join manufacturing and logistics companies already using AI call agents to generate leads and scale their business with Teeny Tech Trek.
//         </motion.p>
//         <motion.button className="flex items-center justify-center px-12 py-4 mx-auto text-lg font-semibold text-white transition-colors bg-blue-900 rounded-lg hover:bg-blue-800 group" variants={slideFromBottom}>
//           <Phone className="w-5 h-5 mr-2" />
//           Start Your AI Call Campaign
//           <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
//         </motion.button>
//       </motion.div>
//     </div>
//   </section>
// );

// // Main Index
// const ManufacturingLogisticsIndex: React.FC = () => (
//   <div className="min-h-screen bg-white">
//     <Hero />
//     <AICallFeatures />
//     <LeadGeneration />
//     <LightCTA />
//   </div>
// );

// export default ManufacturingLogisticsIndex;


import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, Database, Users, BarChart3, Truck, Factory, 
  ArrowRight, Target, Clock, DollarSign, Rocket, TrendingUp, 
  Settings, FileText 
} from 'lucide-react';

import heroImage from "../../Images/Case Studies/Logistics_Manufacturing.png"

// Animation variants
const slideFromLeft = { hidden: { x: -100, opacity: 0 }, visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } } };
const slideFromRight = { hidden: { x: 100, opacity: 0 }, visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } } };
const slideFromTop = { hidden: { y: -80, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } } };
const slideFromBottom = { hidden: { y: 80, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } } };
const fadeIn = { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } } };
const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } } };

// Hero
const Hero: React.FC = () => (
  <section className="relative min-h-screen overflow-hidden bg-white">
    <div className="px-6 py-20 mx-auto max-w-7xl">
      <div className="grid items-center gap-16 lg:grid-cols-2">
        {/* Left */}
        <motion.div className="space-y-8" initial="hidden" animate="visible" variants={staggerContainer}>
          <motion.h1 className="text-5xl font-black leading-tight text-black md:text-6xl lg:text-7xl" variants={slideFromLeft}>
            Your AI Call Agent
            <br />
            <span className="text-blue-900">for Manufacturing & Logistics</span>
          </motion.h1>

          <motion.p className="max-w-lg text-xl leading-relaxed text-black" variants={slideFromLeft}>
            AI-powered lead generation that never sleeps. Transform your sales process with intelligent calling that connects you to quality prospects 24/7.
          </motion.p>

          <motion.div className="flex flex-col gap-4 sm:flex-row" variants={slideFromLeft}>
            <button className="flex items-center justify-center px-8 py-4 font-semibold text-white transition-colors bg-blue-900 rounded-lg hover:bg-blue-800 group">
              Start Generating Leads
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </button>
            
            <button className="flex items-center justify-center px-8 py-4 font-semibold text-black transition-colors border-2 border-black rounded-lg hover:border-blue-900 hover:text-blue-900">
              <Phone className="w-5 h-5 mr-2" />
              Demo AI Call Agent
            </button>
          </motion.div>
        </motion.div>

        {/* Right */}
        <motion.div className="relative" initial="hidden" animate="visible" variants={slideFromRight}>
          <img 
            src={heroImage}
            alt="Manufacturing and logistics facility"
            className="w-full h-[500px] object-cover rounded-2xl shadow-xl"
          />
        </motion.div>
      </div>
    </div>
  </section>
);

// Features
const AICallFeatures: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState('ai-calls');

  const features = {
    'ai-calls': { title: "AI-Powered Calls", description: "Human-like voice conversations that engage prospects naturally", icon: Phone },
    'crm-integration': { title: "CRM Integration", description: "Sync leads and data effortlessly with your CRM", icon: Database },
    'ivr-integration': { title: "IVR Integration", description: "Works seamlessly with your existing infrastructure", icon: Settings },
    'call-summary': { title: "Call Summary", description: "Concise summaries after every call with key insights", icon: FileText },
    'call-analysis': { title: "Call Analysis Report", description: "Performance metrics to improve results", icon: BarChart3 },
    'always-available': { title: "24/7 Available", description: "Never miss a lead - works around the clock", icon: Clock }
  };

  const featureList = Object.entries(features);

  return (
    <section className="py-20 bg-white">
      <div className="px-6 mx-auto max-w-7xl">
        <motion.div className="mb-16 text-center" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={slideFromTop}>
          <h2 className="mb-6 text-4xl font-bold text-blue-900 md:text-5xl">Supercharge Your Business Calls</h2>
          <p className="max-w-3xl mx-auto text-xl text-black">Say goodbye to missed opportunities and hello to smarter calling with our AI Call Agent</p>
        </motion.div>

        {/* Grid */}
        <motion.div className="grid gap-8 mb-16 md:grid-cols-2 lg:grid-cols-3" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={staggerContainer}>
          {featureList.map(([key, feature]) => (
            <motion.div 
              key={key}
              className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                activeFeature === key ? 'border-blue-900 bg-blue-50' : 'border-gray-200 hover:border-blue-900 bg-white'
              }`}
              onClick={() => setActiveFeature(key)}
              variants={slideFromBottom}
            >
              <div className={`w-12 h-12 flex items-center justify-center mb-4 rounded-lg ${
                activeFeature === key ? 'bg-blue-900' : 'bg-gray-200'
              }`}>
                <feature.icon className={`w-6 h-6 ${activeFeature === key ? 'text-white' : 'text-black'}`} />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-blue-900">{feature.title}</h3>
              <p className="text-sm text-black">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div className="text-center" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={slideFromBottom}>
          <button className="flex items-center justify-center px-12 py-4 mx-auto text-lg font-semibold text-white transition-colors bg-blue-900 rounded-lg hover:bg-blue-800 group">
            <Rocket className="w-6 h-6 mr-3" />
            Start Your AI Call Campaign
            <ArrowRight className="w-6 h-6 ml-3 transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

// Lead Generation
const LeadGeneration: React.FC = () => {
  const [counters, setCounters] = useState({ leads: 0, conversion: 0, cost: 0 });

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setCounters(prev => ({
          leads: Math.min(prev.leads + 5, 340),
          conversion: Math.min(prev.conversion + 1, 67),
          cost: Math.min(prev.cost + 2, 78)
        }));
      }, 50);
      setTimeout(() => clearInterval(interval), 2000);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="px-6 mx-auto max-w-7xl">
        <motion.div className="mb-16 text-center" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={slideFromTop}>
          <h2 className="mb-6 text-4xl font-bold text-blue-900 md:text-5xl">
            Manufacturing & Logistics <span className="text-blue-900">Lead Generation</span>
          </h2>
          <p className="max-w-3xl mx-auto text-xl text-black">Specialized AI calling designed for the manufacturing and logistics industry</p>
        </motion.div>

        {/* Success Metrics */}
        <div className="grid gap-6 md:grid-cols-3">
          <motion.div className="p-6 text-center bg-white border border-gray-200 shadow-sm rounded-xl" variants={slideFromLeft}>
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full">
              <Users className="w-8 h-8 text-blue-900" />
            </div>
            <div className="mb-2 text-3xl font-bold text-blue-900">{counters.leads}+</div>
            <h3 className="mb-2 font-semibold text-blue-900">Quality Leads/Month</h3>
            <p className="text-black">Pre-qualified manufacturing prospects</p>
          </motion.div>

          <motion.div className="p-6 text-center bg-white border border-gray-200 shadow-sm rounded-xl" variants={slideFromLeft}>
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full">
              <TrendingUp className="w-8 h-8 text-blue-900" />
            </div>
            <div className="mb-2 text-3xl font-bold text-blue-900">{counters.conversion}%</div>
            <h3 className="mb-2 font-semibold text-blue-900">Conversion Rate</h3>
            <p className="text-black">From lead to qualified prospect</p>
          </motion.div>

          <motion.div className="p-6 text-center bg-white border border-gray-200 shadow-sm rounded-xl" variants={slideFromLeft}>
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full">
              <DollarSign className="w-8 h-8 text-blue-900" />
            </div>
            <div className="mb-2 text-3xl font-bold text-blue-900">{counters.cost}%</div>
            <h3 className="mb-2 font-semibold text-blue-900">Lower Cost Per Lead</h3>
            <p className="text-black">Compared to traditional methods</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// CTA
const LightCTA: React.FC = () => (
  <section className="py-20 bg-white">
    <div className="max-w-4xl px-6 mx-auto text-center">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={staggerContainer}>
        <motion.h2 className="mb-6 text-4xl font-bold text-blue-900 md:text-5xl" variants={slideFromTop}>
          Ready to Supercharge Your Manufacturing Sales?
        </motion.h2>
        <motion.p className="mb-12 text-xl leading-relaxed text-black" variants={slideFromBottom}>
          Join manufacturing and logistics companies already using AI call agents to generate leads and scale their business with Teeny Tech Trek.
        </motion.p>
        <motion.button className="flex items-center justify-center px-12 py-4 mx-auto text-lg font-semibold text-white transition-colors bg-blue-900 rounded-lg hover:bg-blue-800 group" variants={slideFromBottom}>
          <Phone className="w-5 h-5 mr-2" />
          Start Your AI Call Campaign
          <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
        </motion.button>
      </motion.div>
    </div>
  </section>
);

// Main Index
const ManufacturingLogisticsIndex: React.FC = () => (
  <div className="min-h-screen bg-white">
    <Hero />
    <AICallFeatures />
    <LeadGeneration />
    <LightCTA />
  </div>
);

export default ManufacturingLogisticsIndex;
