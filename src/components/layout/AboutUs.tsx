import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Users, Zap, Shield, Code, Star, ArrowRight, Phone, MessageCircle } from 'lucide-react';

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
              <div className="p-8 bg-blue-50 rounded-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=500&h=500&fit=crop&crop=center" 
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
              <div className="p-8 text-center shadow-md bg-blue-50 rounded-2xl">
                <div className="w-full max-w-md mx-auto">
                  <img 
                    src="https://randomuser.me/api/portraits/men/75.jpg" 
                    alt="Founder profile"
                    className="object-cover w-40 h-40 mx-auto mb-6 rounded-xl"
                  />
                </div>

                <h3 className="flex items-center justify-center gap-2 text-xl font-semibold text-blue-900">
                  Anisha Singla
                  <a 
                    href="https://www.linkedin.com/" 
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
          <motion.div 
            className="mb-16 text-center"
            variants={fadeInUp}
          >
            <h2 className="mb-6 text-4xl font-bold text-black lg:text-5xl">
              What we do 
              <span className="text-blue-900">(in plain English)</span>
            </h2>
          </motion.div>
          
          <motion.div 
            className="grid gap-8 md:grid-cols-2"
            variants={staggerContainer}
          >
            {[
              {
                icon: <MessageCircle className="w-8 h-8" />,
                title: 'AI Chat & Voice',
                desc: 'Answer from your documents/CRMs and hand off cleanly to humans.'
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: 'Agentic Workflows',
                desc: 'Retrieve data, call tools, and complete tasks end-to-end.'
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: 'Ops Automations',
                desc: 'Across email, spreadsheets, and SaaS—tested, observable, and reversible.'
              },
              {
                icon: <Code className="w-8 h-8" />,
                title: 'Lightweight AI Apps',
                desc: 'Internal portals, demos, micro-SaaS that ship in weeks, not quarters.'
              }
            ].map((service, index) => (
              <motion.div 
                key={index} 
                className="p-8 transition-shadow duration-200 bg-white border border-gray-200 rounded-xl hover:shadow-lg"
                variants={fadeInUp}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <motion.div 
                  className="inline-flex items-center justify-center w-16 h-16 mb-6 text-blue-900 bg-blue-100 rounded-xl"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  {service.icon}
                </motion.div>
                <h3 className="mb-4 text-2xl font-bold text-blue-900">{service.title}</h3>
                <p className="leading-relaxed text-black">{service.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Four Pillars */}
      <motion.section 
        className="relative py-20 overflow-hidden bg-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute bg-blue-400 rounded-full top-20 left-10 w-72 h-72 mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute bg-blue-400 rounded-full top-40 right-10 w-72 h-72 mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
          <div className="absolute bg-blue-400 rounded-full -bottom-8 left-1/2 w-72 h-72 mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
        </div>

        <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <motion.div 
            className="mb-20 text-center"
            variants={fadeInUp}
          >
            <motion.div
              className="inline-flex items-center px-6 py-3 mb-6 text-sm font-semibold text-blue-900 bg-blue-100 rounded-full"
              whileHover={{ scale: 1.05 }}
            >
              <Zap className="w-4 h-4 mr-2" />
              Our Secret Sauce
            </motion.div>
            <h2 className="mb-6 text-4xl font-bold text-black lg:text-6xl">
              Why teams pick 
              <span className="text-blue-900">
                Teeny Tech Trek
              </span>
            </h2>
            <p className="max-w-3xl mx-auto text-xl leading-relaxed text-gray-700">
              We ship lean, reliable AI—chat, voice, and automations that plug into your tools and start paying back fast.
            </p>
          </motion.div>
          
          <div className="grid gap-8 lg:grid-cols-2">
            {pillars.map((pillar, index) => (
              <motion.div 
                key={index} 
                className="relative group"
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className="absolute inset-0 transition-opacity duration-300 bg-blue-500 opacity-0 rounded-2xl blur-lg group-hover:opacity-20"></div>
                
                <div className="relative p-8 transition-all duration-300 bg-white border border-gray-200 shadow-xl rounded-2xl hover:shadow-2xl">
                  <div className="flex items-start space-x-6">
                    <motion.div 
                      className="relative flex-shrink-0"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                      <div className="flex items-center justify-center w-16 h-16 text-white bg-blue-900 shadow-lg rounded-2xl">
                        {pillar.icon}
                      </div>
                      <div className="absolute transition-opacity bg-blue-900 -inset-1 rounded-2xl blur opacity-30 group-hover:opacity-60"></div>
                    </motion.div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="mb-3 text-2xl font-bold text-black transition-colors group-hover:text-blue-900">
                        {pillar.title}
                      </h3>
                      <p className="mb-6 leading-relaxed text-gray-700">
                        {pillar.desc}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-6 space-y-4">
                    <motion.div 
                      className="relative p-5 overflow-hidden border-l-4 border-blue-900 rounded-xl bg-blue-50"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-center mb-2">
                        <div className="w-2 h-2 mr-3 bg-blue-900 rounded-full"></div>
                        <p className="text-sm font-semibold tracking-wide text-blue-900 uppercase">
                          Example
                        </p>
                      </div>
                      <p className="leading-relaxed text-black">
                        {pillar.example}
                      </p>
                    </motion.div>
                    
                    <motion.div 
                      className="relative p-5 overflow-hidden border-l-4 border-green-400 rounded-xl bg-green-50"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-center mb-2">
                        <div className="w-2 h-2 mr-3 bg-green-500 rounded-full animate-pulse"></div>
                        <p className="text-sm font-semibold tracking-wide text-green-800 uppercase">
                          Typical Results
                        </p>
                      </div>
                      <p className="text-lg font-semibold text-black">
                        {pillar.results}
                      </p>
                    </motion.div>
                  </div>
                  
                  {/* Decorative corner gradient */}
                  <div className="absolute top-0 right-0 w-20 h-20 transition-opacity bg-blue-400 rounded-bl-full opacity-10 group-hover:opacity-20"></div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="mt-16 text-center"
            variants={fadeInUp}
          >
            <div className="max-w-4xl p-8 mx-auto bg-white border border-gray-200 shadow-lg rounded-2xl">
              <div className="flex items-center justify-center mb-4">
                <div className="w-3 h-3 mr-3 rounded-full bg-amber-400 animate-pulse"></div>
                <p className="text-sm font-semibold tracking-wide uppercase text-amber-700">
                  Performance Disclaimer
                </p>
              </div>
              <p className="leading-relaxed text-black">
                Metrics are typical ranges from recent builds. Actual impact varies by data quality, process, and adoption. 
                Results shown represent real client outcomes but individual performance may differ.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Benefits */}
      <motion.section 
        className="py-20 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
          <motion.div 
            className="mb-16 text-center"
            variants={fadeInUp}
          >
            <h2 className="mb-6 text-4xl font-bold text-black">
              What you get 
              <span className="text-blue-900">(benefits, not buzzwords)</span>
            </h2>
          </motion.div>
          
          <motion.div 
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            variants={staggerContainer}
          >
            {benefits.map((benefit, index) => (
              <motion.div 
                key={index} 
                className="flex items-center p-6 bg-white border border-gray-200 rounded-lg"
                variants={fadeInUp}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
                }}
                transition={{ duration: 0.2 }}
              >
                <motion.div 
                  className="flex-shrink-0 w-3 h-3 mr-4 bg-blue-900 rounded-full"
                  whileHover={{ scale: 1.5 }}
                ></motion.div>
                <p className="font-medium text-black">{benefit}</p>
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