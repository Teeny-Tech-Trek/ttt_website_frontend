import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Users, Zap, Shield, Code, Star, ArrowRight, Phone, MessageCircle } from 'lucide-react';
import heroImage from "../../Images/Extra Resources - Hero Page/FounderPage-removebg-preview.png"
import characterImage from "../../Images/Extra Resources - Hero Page/Oisha_Character-removebg-preview.png"
import Services from '../home/ServicesList';

const AboutUs = () => {
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.8 }
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

  const milestones = [
    { year: '2024', title: 'Founded', desc: 'First pilots in D2C support and logistics exceptions' },
    { year: '2024-25', title: 'Voice Innovation', desc: 'Voice concierge for real estate; hospitality concierge with contextual upsells' },
    { year: '2025', title: 'Scale & Growth', desc: 'Launched live demos, public playbooks, and ROI tools' }
  ];

  const pillars = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Build Small, Ship Fast',
      desc: 'Value in 14 days—cut scope to essentials and iterate.',
      example: 'D2C support pilot in 2 weeks: policy-aware chat + WhatsApp',
      results: '40–55% FAQ deflection, ~22m → ~7m first-response'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Clarity Over Complexity',
      desc: 'Plain workflows, retrieval-first answers with citations.',
      example: '3PL operations: email/CSV → normalized status → exception rules',
      results: '−30% manual touches/shipment, −27% SLA breaches'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Humans Stay in Control',
      desc: 'AI assists; people decide. Full context escalations.',
      example: 'Hospitality concierge: instant answers + Stripe upsells',
      results: '−32% call volume, +11% upsell attach'
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: 'Portable by Design',
      desc: 'No lock-ins. Swap models/tools without rewrites.',
      example: 'Real-estate voice concierge: voice + chat on HubSpot/Calendly',
      results: '−35–50% speed-to-lead, +22% qualified showings'
    }
  ];

  const benefits = [
    'Value in weeks, not months',
    'Answers with receipts—no hallucinations',
    'Your tools, not lock-ins',
    'Guardrails by default',
    'Complete handover with code ownership',
    'Clear, measurable results'
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <motion.section 
        className="py-20 bg-white"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left Content */}
            <motion.div 
              className="text-left"
              variants={staggerContainer}
            >
              <motion.h1 
                className="mb-6 text-4xl font-bold leading-tight text-black md:text-5xl lg:text-6xl"
                variants={fadeInUp}
              >
                The tiny studio behind 
                <span className="block text-blue-900">
                  outsized results
                </span>
              </motion.h1>
              
              <motion.p 
                className="mb-8 text-lg leading-relaxed text-gray-700 md:text-xl"
                variants={fadeInUp}
              >
                Teeny Tech Trek was founded in 2024 to prove that small, focused teams can ship real AI—chat, voice, and automations that pay back fast.
              </motion.p>
              
              <motion.div 
                className="flex flex-col gap-4 sm:flex-row"
                variants={fadeInUp}
              >
                <motion.button 
                  className="inline-flex items-center px-8 py-4 font-semibold text-white transition-colors duration-200 bg-blue-900 rounded-lg hover:bg-blue-800"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Read the story
                  <ArrowRight className="w-5 h-5 ml-2" />
                </motion.button>
                <motion.button 
                  className="inline-flex items-center px-8 py-4 font-semibold text-blue-900 transition-colors duration-200 border border-blue-900 rounded-lg hover:bg-blue-50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Book 45-min strategy call
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Right Image Space */}
            <motion.div 
              className="relative hidden lg:block"
              variants={fadeInUp}
            >
              <div className="p-2 rounded-2xl">
                <img 
                  src={heroImage}
                  alt="Team collaboration and AI technology"
                  className="object-cover w-full aspect-square rounded-xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Founder's Story */}
      <motion.section 
        className="py-20 bg-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <motion.div variants={fadeInUp}>
              <motion.div 
                className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium text-blue-900 rounded-full bg-blue-50"
                variants={fadeInUp}
              >
                <Star className="w-4 h-4 mr-2" />
                The founder's story
              </motion.div>
              
              <motion.h2 
                className="mb-8 text-4xl font-bold leading-tight text-black lg:text-5xl"
                variants={fadeInUp}
              >
                How the trek began
              </motion.h2>
              
              <motion.div 
                className="space-y-6 text-lg leading-relaxed text-black"
                variants={staggerContainer}
              >
                <motion.p variants={fadeInUp}>
                  I started Teeny Tech Trek in 2024 with a <strong className="text-blue-900">stubborn belief: clarity beats complexity.</strong>
                </motion.p>
                
                <motion.p variants={fadeInUp}>
                  Before TTT, I spent years straddling product, ops, and AI—seeing two patterns everywhere: teams drowning in repetitive work, and "AI projects" that looked great in slide decks but never reached production.
                </motion.p>
                
                <motion.p variants={fadeInUp}>
                  The first wins were scrappy: a support assistant that finally answered with receipts, a logistics workflow that routed exceptions before customers called, a voice concierge that booked property viewings after hours.
                </motion.p>
                
                <motion.p variants={fadeInUp}>
                  <em className="text-blue-900">Ship a small, reliable thing in 14 days, measure honestly, then iterate.</em> That rhythm built trust, momentum, and results you could actually feel.
                </motion.p>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="relative"
              variants={fadeInUp}
            >
              <div className="p-8 text-center rounded-2xl">
                <div className="w-full max-w-md mx-auto">
                  <img 
                    src={characterImage}
                    alt="Founder profile"
                    className="object-cover h-full mx-auto mb-6 rounded-xl"
                  />
                </div>

                <h3 className="flex items-center justify-center gap-2 text-xl font-semibold text-blue-900">
                  Anisha Singla
                  <a 
                    href="https://www.linkedin.com/in/singlaanisha/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center transition bg-gray-200 rounded-full w-7 h-7 hover:bg-gray-300"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </h3>

                <p className="mt-2 text-black">
                  Founder & CEO of Teeny Tech Trek.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* What We Do */}
      <motion.section 
        className="py-20 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
           <Services />
        </div>
      </motion.section>

      {/* Four Pillars */}
        <motion.section 
        className="relative py-12 overflow-hidden sm:py-16 md:py-20 lg:py-24 bg-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        {/* Background Pattern - Responsive */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute w-32 h-32 bg-blue-400 rounded-full top-10 left-5 sm:w-48 sm:h-48 sm:top-20 sm:left-10 md:w-72 md:h-72 mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute w-32 h-32 bg-blue-400 rounded-full top-20 right-5 sm:w-48 sm:h-48 sm:top-40 sm:right-10 md:w-72 md:h-72 mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
          <div className="absolute w-32 h-32 bg-blue-400 rounded-full -bottom-4 left-1/2 sm:w-48 sm:h-48 sm:-bottom-8 md:w-72 md:h-72 mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
        </div>

        <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <motion.div 
            className="mb-8 text-center sm:mb-12 md:mb-16 lg:mb-20"
            variants={fadeInUp}
          >
            <motion.div
              className="inline-flex items-center px-3 py-2 mb-3 text-xs font-semibold text-blue-900 bg-blue-100 rounded-full sm:px-4 sm:py-2 sm:mb-4 sm:text-sm md:px-6 md:py-3 md:mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <Zap className="w-3 h-3 mr-2 sm:w-4 sm:h-4" />
              Our Secret Sauce
            </motion.div>
            <h2 className="mb-3 text-2xl font-bold leading-tight text-black sm:text-3xl sm:mb-4 md:text-4xl md:mb-6 lg:text-5xl xl:text-6xl">
              Why teams pick<span className="text-blue-900">Teeny Tech Trek</span>
            </h2>
            <p className="max-w-3xl px-2 mx-auto text-base leading-relaxed text-gray-700 sm:px-4 sm:text-lg md:text-xl">
              We ship lean, reliable AI—chat, voice, and automations that plug into your tools and start paying back fast.
            </p>
          </motion.div>
          
          {/* Responsive Grid - Stack on mobile, 2-col on tablet, 4-col on desktop */}
          <motion.div 
            className="grid gap-4 sm:gap-6 md:gap-8 md:grid-cols-2 xl:grid-cols-4"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
          >
            {pillars.map((pillar, index) => (
              <motion.div 
                key={index}
                className="relative p-4 transition-all duration-300 sm:p-6 md:p-8 rounded-2xl hover:bg-white hover:border hover:border-gray-200"
                variants={fadeInUp}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                <div className="flex flex-col items-center text-center">
                  <motion.div 
                    className="flex items-center justify-center w-12 h-12 mb-3 bg-blue-100 sm:w-16 sm:h-16 sm:mb-4 md:w-20 md:h-20 rounded-2xl"
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.1 }}
                  >
                    <div className="text-blue-900">
                      {pillar.icon}
                    </div>
                  </motion.div>
                  
                  <div className="inline-flex items-center px-2 py-1 mb-3 text-xs font-medium text-blue-900 bg-blue-100 rounded-full sm:px-3 sm:text-sm sm:mb-4">
                    {['Speed', 'Clarity', 'Control', 'Portable'][index]}
                  </div>
                  
                  <h3 className="mb-2 text-base font-bold text-black sm:text-lg sm:mb-3 md:text-xl">{pillar.title}</h3>
                  <p className="mb-3 text-xs leading-relaxed text-gray-600 sm:text-sm sm:mb-4 md:text-base">
                    {pillar.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Performance Disclaimer - Mobile Optimized */}
          <motion.div 
            className="mt-8 text-center sm:mt-12 md:mt-16"
            variants={fadeInUp}
          >
            <div className="max-w-4xl p-4 mx-auto bg-white border border-gray-200 shadow-lg sm:p-6 md:p-8 rounded-2xl">
              <div className="flex items-center justify-center mb-2 sm:mb-4">
                <div className="w-2 h-2 mr-2 rounded-full sm:w-3 sm:h-3 sm:mr-3 bg-amber-400 animate-pulse"></div>
                <p className="text-xs font-semibold tracking-wide uppercase sm:text-sm text-amber-700">
                  Performance Disclaimer
                </p>
              </div>
              <p className="text-xs leading-relaxed text-black sm:text-sm md:text-base">
                Metrics are typical ranges from recent builds. Actual impact varies by data quality, process, and adoption. 
                Results shown represent real client outcomes but individual performance may differ.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Benefits - Better Mobile Grid */}
      <motion.section 
        className="py-12 bg-white sm:py-16 md:py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
          <motion.div 
            className="mb-8 text-center sm:mb-12 md:mb-16"
            variants={fadeInUp}
          >
            <h2 className="mb-4 text-3xl font-bold text-black sm:text-4xl sm:mb-6">
              What you get 
              <span className="block text-blue-900 sm:inline">
                <span className="hidden sm:inline">(</span>benefits, not buzzwords<span className="hidden sm:inline">)</span>
              </span>
            </h2>
          </motion.div>
          
          <motion.div 
            className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3"
            variants={staggerContainer}
          >
            {benefits.map((benefit, index) => (
              <motion.div 
                key={index} 
                className="flex items-center p-4 bg-white border border-gray-200 rounded-lg sm:p-6"
                variants={fadeInUp}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
                }}
                transition={{ duration: 0.2 }}
              >
                <motion.div 
                  className="flex-shrink-0 w-2 h-2 mr-3 bg-blue-900 rounded-full sm:w-3 sm:h-3 sm:mr-4"
                  whileHover={{ scale: 1.5 }}
                ></motion.div>
                <p className="text-sm font-medium text-black sm:text-base">{benefit}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>


      {/* Timeline */}
      <motion.section 
        className="py-20 bg-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="max-w-4xl px-4 mx-auto sm:px-6 lg:px-8">
          <motion.div 
            className="mb-16 text-center"
            variants={fadeInUp}
          >
            <h2 className="mb-6 text-4xl font-bold text-black">
              A few milestones 
              <span className="text-blue-900">(2024 → present)</span>
            </h2>
          </motion.div>
          
          <div className="relative">
            <motion.div 
              className="absolute left-4 top-0 bottom-0 w-0.5 bg-blue-200"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              style={{ originY: 0 }}
            />
            
            {milestones.map((milestone, index) => (
              <motion.div 
                key={index} 
                className="relative flex items-center mb-12 last:mb-0"
                variants={fadeInUp}
              >
                <motion.div 
                  className="absolute left-0 flex items-center justify-center w-8 h-8 bg-blue-900 rounded-full"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </motion.div>
                
                <motion.div 
                  className="flex-1 p-6 ml-16 bg-blue-50 rounded-xl"
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
                  }}
                >
                  <div className="flex items-center mb-3">
                    <span className="px-3 py-1 text-sm font-semibold text-blue-900 bg-blue-100 rounded-full">
                      {milestone.year}
                    </span>
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-blue-900">{milestone.title}</h3>
                  <p className="text-black">{milestone.desc}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="py-20 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="max-w-4xl px-4 mx-auto text-center sm:px-6 lg:px-8">
          <motion.h2 
            className="mb-8 text-4xl font-bold text-black lg:text-5xl"
            variants={fadeInUp}
          >
            Ready to start your trek?
          </motion.h2>
          
          <motion.p 
            className="max-w-2xl mx-auto mb-12 text-xl text-gray-700"
            variants={fadeInUp}
          >
            Prefer a quick start? Book a ₹1,200 Starter Strategy Call or try the live demo.
          </motion.p>
          
          <motion.div 
            className="flex flex-col justify-center gap-6 sm:flex-row"
            variants={fadeInUp}
          >
            <motion.button 
              className="inline-flex items-center px-8 py-4 font-semibold text-white transition-colors duration-200 bg-blue-900 rounded-lg hover:bg-blue-800"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              Start live demo
              <ArrowRight className="w-5 h-5 ml-2" />
            </motion.button>
            <motion.button 
              className="inline-flex items-center px-8 py-4 font-semibold text-blue-900 transition-colors duration-200 border-2 border-blue-900 rounded-lg hover:bg-blue-50"
              whileHover={{ 
                scale: 1.05,
                borderColor: "#1e3a8a",
                backgroundColor: "#eff6ff"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Phone className="w-5 h-5 mr-2" />
              Book strategy call
            </motion.button>
          </motion.div>
          
          <motion.div 
            className="p-6 mt-12 bg-white border border-blue-200 rounded-xl"
            variants={fadeInUp}
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
            }}
          >
            <p className="text-lg font-medium text-black">
              "TTT is deliberately small. That lets us move fast, keep quality high, and stay close to your outcomes."
            </p>
            <p className="mt-3 font-semibold text-blue-900">— Anisha, Founder</p>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default AboutUs;

// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import { ChevronRight, Users, Zap, Shield, Code, Star, ArrowRight, Phone, MessageCircle } from 'lucide-react';
// import characterImage from "../../Images/Extra Resources - Hero Page/Oisha_Character-removebg-preview.png"
// import Services from '../home/ServicesList';
// import heroImage from "../../Images/Extra Resources - Hero Page/FounderPage-removebg-preview.png"


// const AboutUs = () => {
//   // Animation variants
//   const fadeInUp = {
//     hidden: { opacity: 0, y: 50 },
//     visible: { 
//       opacity: 1, 
//       y: 0,
//       transition: { duration: 0.6, ease: "easeOut" }
//     }
//   };

//   const fadeIn = {
//     hidden: { opacity: 0 },
//     visible: { 
//       opacity: 1,
//       transition: { duration: 0.8 }
//     }
//   };

//   const staggerContainer = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.2,
//         delayChildren: 0.1
//       }
//     }
//   };

//   const milestones = [
//     { year: '2024', title: 'Founded', desc: 'First pilots in D2C support and logistics exceptions' },
//     { year: '2024-25', title: 'Voice Innovation', desc: 'Voice concierge for real estate; hospitality concierge with contextual upsells' },
//     { year: '2025', title: 'Scale & Growth', desc: 'Launched live demos, public playbooks, and ROI tools' }
//   ];

//   const pillars = [
//     {
//       icon: <Zap className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />,
//       title: 'Build Small, Ship Fast',
//       desc: 'Value in 14 days—cut scope to essentials and iterate.'
//     },
//     {
//       icon: <Shield className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />,
//       title: 'Clarity Over Complexity',
//       desc: 'Plain workflows, retrieval-first answers with citations.'
//     },
//     {
//       icon: <Users className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />,
//       title: 'Humans Stay in Control',
//       desc: 'AI assists; people decide. Full context escalations.'
//     },
//     {
//       icon: <Code className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />,
//       title: 'Portable by Design',
//       desc: 'No lock-ins. Swap models/tools without rewrites.'
//     }
//   ];

//   const benefits = [
//     'Value in weeks, not months',
//     'Answers with receipts—no hallucinations',
//     'Your tools, not lock-ins',
//     'Guardrails by default',
//     'Complete handover with code ownership',
//     'Clear, measurable results'
//   ];

//   // Sample services data (since Services component wasn't provided)
//   const services = [
//     {
//       title: 'AI Chat Support',
//       description: 'Policy-aware chatbots that deflect FAQs and escalate intelligently',
//       icon: <MessageCircle className="w-6 h-6" />
//     },
//     {
//       title: 'Voice Automation',
//       description: 'Voice concierges for real estate, hospitality, and customer service',
//       icon: <Phone className="w-6 h-6" />
//     },
//     {
//       title: 'Process Automation',
//       description: 'Streamline logistics, operations, and exception handling',
//       icon: <Zap className="w-6 h-6" />
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Hero Section - Enhanced Mobile Responsiveness */}
//       <motion.section 
//         className="py-8 bg-white sm:py-12 md:py-16 lg:py-20 xl:py-24"
//         initial="hidden"
//         animate="visible"
//         variants={fadeIn}
//       >
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="grid items-center gap-8 sm:gap-10 md:gap-12 lg:grid-cols-2">
//             {/* Left Content */}
//             <motion.div 
//               className="text-left"
//               variants={staggerContainer}
//             >
//               <motion.h1 
//                 className="mb-4 text-2xl font-bold leading-tight text-black sm:text-3xl sm:mb-5 md:text-4xl md:mb-6 lg:text-5xl xl:text-6xl"
//                 variants={fadeInUp}
//               >
//                 The tiny studio behind 
//                 <span className="block text-blue-900">
//                   outsized results
//                 </span>
//               </motion.h1>
              
//               <motion.p 
//                 className="mb-6 text-base leading-relaxed text-gray-700 sm:text-lg sm:mb-7 md:text-xl md:mb-8"
//                 variants={fadeInUp}
//               >
//                 Teeny Tech Trek was founded in 2024 to prove that small, focused teams can ship real AI—chat, voice, and automations that pay back fast.
//               </motion.p>
              
//               <motion.div 
//                 className="flex flex-col gap-3 sm:gap-4 sm:flex-row"
//                 variants={fadeInUp}
//               >
//                 <motion.button 
//                   className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 bg-blue-900 rounded-lg sm:px-8 sm:py-4 sm:text-base hover:bg-blue-800"
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   Read the story
//                   <ArrowRight className="w-4 h-4 ml-2 sm:w-5 sm:h-5" />
//                 </motion.button>
//                 <motion.button 
//                   className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-blue-900 transition-colors duration-200 border border-blue-900 rounded-lg sm:px-8 sm:py-4 sm:text-base hover:bg-blue-50"
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <Phone className="w-4 h-4 mr-2 sm:w-5 sm:h-5" />
//                   <span className="hidden sm:inline">Book 45-min strategy call</span>
//                   <span className="sm:hidden">Strategy call</span>
//                 </motion.button>
//               </motion.div>
//             </motion.div>

//             {/* Right Image Space - Better Mobile Handling */}
//             <motion.div 
//               className="relative order-first lg:order-last"
//               variants={fadeInUp}
//             >
//               <div className="p-2 rounded-2xl">
//                 <div className="flex items-center justify-center w-full h-64 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl sm:h-80 md:h-96 lg:h-full lg:aspect-square">
//                   <div className="text-center text-blue-900">
//                     <Users className="w-16 h-16 mx-auto mb-4 sm:w-20 sm:h-20" />
//                     <p className="text-sm font-medium sm:text-base">Hero Image Placeholder</p>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </motion.section>

//       {/* Founder's Story - Enhanced Mobile Layout */}
//       <motion.section 
//         className="py-12 bg-gray-50 sm:py-16 md:py-20"
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, amount: 0.3 }}
//         variants={staggerContainer}
//       >
//         <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
//           <div className="grid items-center gap-12 sm:gap-14 md:gap-16 lg:grid-cols-2">
//             <motion.div variants={fadeInUp}>
//               <motion.div 
//                 className="inline-flex items-center px-3 py-2 mb-4 text-xs font-medium text-blue-900 rounded-full sm:px-4 sm:text-sm sm:mb-6 bg-blue-50"
//                 variants={fadeInUp}
//               >
//                 <Star className="w-3 h-3 mr-2 sm:w-4 sm:h-4" />
//                 The founder's story
//               </motion.div>
              
//               <motion.h2 
//                 className="mb-6 text-3xl font-bold leading-tight text-black sm:text-4xl sm:mb-8 lg:text-5xl"
//                 variants={fadeInUp}
//               >
//                 How the trek began
//               </motion.h2>
              
//               <motion.div 
//                 className="space-y-4 text-base leading-relaxed text-black sm:space-y-6 sm:text-lg"
//                 variants={staggerContainer}
//               >
//                 <motion.p variants={fadeInUp}>
//                   I started Teeny Tech Trek in 2024 with a <strong className="text-blue-900">stubborn belief: clarity beats complexity.</strong>
//                 </motion.p>
                
//                 <motion.p variants={fadeInUp}>
//                   Before TTT, I spent years straddling product, ops, and AI—seeing two patterns everywhere: teams drowning in repetitive work, and "AI projects" that looked great in slide decks but never reached production.
//                 </motion.p>
                
//                 <motion.p variants={fadeInUp}>
//                   The first wins were scrappy: a support assistant that finally answered with receipts, a logistics workflow that routed exceptions before customers called, a voice concierge that booked property viewings after hours.
//                 </motion.p>
                
//                 <motion.p variants={fadeInUp}>
//                   <em className="text-blue-900">Ship a small, reliable thing in 14 days, measure honestly, then iterate.</em> That rhythm built trust, momentum, and results you could actually feel.
//                 </motion.p>
//               </motion.div>
//             </motion.div>
            
//             <motion.div 
//               className="relative order-first lg:order-last"
//               variants={fadeInUp}
//             >
//               <div className="p-6 text-center sm:p-8 rounded-2xl">
//                 <div className="w-full max-w-xs mx-auto sm:max-w-sm md:max-w-md">
//                   <div className="flex items-center justify-center w-full h-64 mb-4 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl sm:h-80 md:h-96 sm:mb-6">
//                     <div className="text-center text-blue-900">
//                       <Users className="w-16 h-16 mx-auto mb-2 sm:w-20 sm:h-20" />
//                       <p className="text-xs font-medium sm:text-sm">Character Image</p>
//                     </div>
//                   </div>
//                 </div>

//                 <h3 className="flex items-center justify-center gap-2 text-lg font-semibold text-blue-900 sm:text-xl">
//                   Anisha Singla
//                   <a 
//                     href="https://www.linkedin.com/in/singlaanisha/" 
//                     target="_blank" 
//                     rel="noopener noreferrer"
//                     className="inline-flex items-center justify-center w-6 h-6 transition bg-gray-200 rounded-full sm:w-7 sm:h-7 hover:bg-gray-300"
//                   >
//                     <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-gray-700 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
//                       <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
//                     </svg>
//                   </a>
//                 </h3>

//                 <p className="mt-2 text-sm text-black sm:text-base">
//                   Founder & CEO of Teeny Tech Trek.
//                 </p>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </motion.section>

//       {/* Services Section - Improved Mobile Grid */}
//       <motion.section 
//         className="py-12 bg-white sm:py-16 md:py-20"
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, amount: 0.3 }}
//         variants={staggerContainer}
//       >
//         <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
//           <motion.div 
//             className="mb-8 text-center sm:mb-12 md:mb-16"
//             variants={fadeInUp}
//           >
//             <h2 className="mb-4 text-3xl font-bold text-black sm:text-4xl sm:mb-6 lg:text-5xl">
//               What we build
//             </h2>
//             <p className="max-w-3xl mx-auto text-base text-gray-700 sm:text-lg md:text-xl">
//               AI solutions that integrate with your existing tools and deliver measurable results
//             </p>
//           </motion.div>
          
//           <motion.div 
//             className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3"
//             variants={staggerContainer}
//           >
//             {services.map((service, index) => (
//               <motion.div 
//                 key={index}
//                 className="p-6 transition-shadow duration-300 bg-white border border-gray-200 rounded-xl sm:p-8 hover:shadow-lg"
//                 variants={fadeInUp}
//                 whileHover={{ y: -5 }}
//               >
//                 <div className="flex items-center justify-center w-12 h-12 mb-4 bg-blue-100 rounded-lg sm:w-16 sm:h-16">
//                   <div className="text-blue-900">
//                     {service.icon}
//                   </div>
//                 </div>
//                 <h3 className="mb-3 text-lg font-bold text-black sm:text-xl">{service.title}</h3>
//                 <p className="text-sm text-gray-600 sm:text-base">{service.description}</p>
//               </motion.div>
//             ))}
//           </motion.div>
//         </div>
//       </motion.section>

//       {/* Four Pillars - Major Mobile Improvements */}
//      

//       {/* Timeline - Mobile Optimized */}
//       <motion.section 
//         className="py-12 bg-gray-50 sm:py-16 md:py-20"
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, amount: 0.3 }}
//         variants={staggerContainer}
//       >
//         <div className="max-w-4xl px-4 mx-auto sm:px-6 lg:px-8">
//           <motion.div 
//             className="mb-8 text-center sm:mb-12 md:mb-16"
//             variants={fadeInUp}
//           >
//             <h2 className="mb-4 text-3xl font-bold text-black sm:text-4xl sm:mb-6">
//               A few milestones 
//               <span className="block text-blue-900 sm:inline">
//                 <span className="hidden sm:inline">(</span>2024 → present<span className="hidden sm:inline">)</span>
//               </span>
//             </h2>
//           </motion.div>
          
//           <div className="relative">
//             <motion.div 
//               className="absolute left-3 top-0 bottom-0 w-0.5 bg-blue-200 sm:left-4"
//               initial={{ scaleY: 0 }}
//               whileInView={{ scaleY: 1 }}
//               viewport={{ once: true }}
//               transition={{ duration: 1, delay: 0.2 }}
//               style={{ originY: 0 }}
//             />
            
//             {milestones.map((milestone, index) => (
//               <motion.div 
//                 key={index} 
//                 className="relative flex items-center mb-8 last:mb-0 sm:mb-12"
//                 variants={fadeInUp}
//               >
//                 <motion.div 
//                   className="absolute left-0 flex items-center justify-center w-6 h-6 bg-blue-900 rounded-full sm:w-8 sm:h-8"
//                   whileHover={{ scale: 1.2 }}
//                   whileTap={{ scale: 0.9 }}
//                 >
//                   <div className="w-2 h-2 bg-white rounded-full sm:w-3 sm:h-3"></div>
//                 </motion.div>
                
//                 <motion.div 
//                   className="flex-1 p-4 ml-12 bg-blue-50 sm:p-6 sm:ml-16 rounded-xl"
//                   whileHover={{ 
//                     scale: 1.02,
//                     boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
//                   }}
//                 >
//                   <div className="flex items-center mb-2 sm:mb-3">
//                     <span className="px-2 py-1 text-xs font-semibold text-blue-900 bg-blue-100 rounded-full sm:px-3 sm:text-sm">
//                       {milestone.year}
//                     </span>
//                   </div>
//                   <h3 className="mb-1 text-lg font-bold text-blue-900 sm:mb-2 sm:text-xl">{milestone.title}</h3>
//                   <p className="text-sm text-black sm:text-base">{milestone.desc}</p>
//                 </motion.div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </motion.section>

//       {/* CTA Section - Mobile Enhanced */}
//       <motion.section 
//         className="py-12 bg-white sm:py-16 md:py-20"
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, amount: 0.3 }}
//         variants={staggerContainer}
//       >
//         <div className="max-w-4xl px-4 mx-auto text-center sm:px-6 lg:px-8">
//           <motion.h2 
//             className="mb-6 text-3xl font-bold text-black sm:text-4xl sm:mb-8 lg:text-5xl"
//             variants={fadeInUp}
//           >
//             Ready to start your trek?
//           </motion.h2>
          
//           <motion.p 
//             className="max-w-2xl mx-auto mb-8 text-base text-gray-700 sm:text-lg sm:mb-10 md:text-xl md:mb-12"
//             variants={fadeInUp}
//           >
//             Prefer a quick start? Book a ₹1,200 Starter Strategy Call or try the live demo.
//           </motion.p>
          
//           <motion.div 
//             className="flex flex-col justify-center gap-4 sm:gap-6 sm:flex-row"
//             variants={fadeInUp}
//           >
//             <motion.button 
//               className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 bg-blue-900 rounded-lg sm:px-8 sm:py-4 sm:text-base hover:bg-blue-800"
//               whileHover={{ 
//                 scale: 1.05,
//                 boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)"
//               }}
//               whileTap={{ scale: 0.95 }}
//             >
//               Start live demo
//               <ArrowRight className="w-4 h-4 ml-2 sm:w-5 sm:h-5" />
//             </motion.button>
//             <motion.button 
//               className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-blue-900 transition-colors duration-200 border-2 border-blue-900 rounded-lg sm:px-8 sm:py-4 sm:text-base hover:bg-blue-50"
//               whileHover={{ 
//                 scale: 1.05,
//                 borderColor: "#1e3a8a",
//                 backgroundColor: "#eff6ff"
//               }}
//               whileTap={{ scale: 0.95 }}
//             >
//               <Phone className="w-4 h-4 mr-2 sm:w-5 sm:h-5" />
//               <span className="hidden sm:inline">Book strategy call</span>
//               <span className="sm:hidden">Strategy call</span>
//             </motion.button>
//           </motion.div>
          
//           <motion.div 
//             className="p-4 mt-8 bg-white border border-blue-200 sm:p-6 sm:mt-10 md:mt-12 rounded-xl"
//             variants={fadeInUp}
//             whileHover={{ 
//               scale: 1.02,
//               boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
//             }}
//           >
//             <p className="text-base font-medium text-black sm:text-lg">
//               "TTT is deliberately small. That lets us move fast, keep quality high, and stay close to your outcomes."
//             </p>
//             <p className="mt-2 font-semibold text-blue-900 sm:mt-3">— Anisha, Founder</p>
//           </motion.div>
//         </div>
//       </motion.section>
//     </div>
//   );
// };

// export default AboutUs;