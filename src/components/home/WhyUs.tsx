import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Rocket, Brain, Zap, ShieldCheck, Quote, Target, Users } from 'lucide-react';
import React from 'react';

// Mock Container and SectionHeading components
const Container = ({ children, className = "" }) => (
  <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
    {children}
  </div>
);

const SectionHeading = ({ title, subtitle }) => (
  <div className="mb-16 text-center">
    <motion.h2 
      className="mb-4 text-4xl font-bold text-black md:text-5xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {title}
    </motion.h2>
    <motion.p 
      className="max-w-3xl mx-auto text-xl leading-relaxed text-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {subtitle}
    </motion.p>
  </div>
);

const WhyUs = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
    rootMargin: '100px 0px',
  });

  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5], [0.05, 0.15]);

  const allFeatures = [
    {
      icon: <Rocket className="text-blue-900" size={32} />,
      title: "Build Small. Launch Fast.",
      description: "We create lean AI solutions that get to market quickly without sacrificing quality.",
      category: "Speed"
    },
    {
      icon: <Brain className="text-blue-900" size={32} />,
      title: "Intelligent Integration.",
      description: "Our AI systems integrate seamlessly with your existing tools and workflows.",
      category: "Intelligence"
    },
    {
      icon: <Target className="text-blue-900" size={32} />,
      title: "Clarity over Complexity",
      description: "No black boxes, just clean, understandable systems that make sense for your business.",
      category: "Clarity"
    },
    {
      icon: <Zap className="text-blue-900" size={32} />,
      title: "Scale Smart.",
      description: "Solutions designed to grow efficiently alongside your business needs.",
      category: "Scale"
    },
    {
      icon: <Users className="text-blue-900" size={32} />,
      title: "True Collaboration",
      description: "We integrate like a teammate, not a vendor, focusing on your goals and processes.",
      category: "Partnership"
    },
    {
      icon: <ShieldCheck className="text-blue-900" size={32} />,
      title: "Trust by Design.",
      description: "We prioritize security, privacy, and transparency in every AI solution we build.",
      category: "Security"
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const featureVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section 
      id="why-us" 
      className="relative min-h-screen py-24 bg-white"
    >

      <Container className="relative z-10">
        <SectionHeading
          title="Why Teeny Tech Trek?"
          subtitle="Empowering visionary teams with AI solutions that simplify complexity and amplify impact through speed, clarity, and true collaboration."
        />

        {/* Main Content Area */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="relative"
        >
          {/* Main Features Container */}
          <motion.div 
            className="relative overflow-hidden bg-white border border-gray-200 shadow-2xl rounded-3xl"
            whileHover={{ 
              boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)" 
            }}
            transition={{ duration: 0.4 }}
          >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-blue-50/30" />
            
            {/* Features Grid */}
            <div className="relative z-10 p-8 md:p-12">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 md:gap-12">
                {allFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    variants={featureVariants}
                    className="relative group"
                  >
                    {/* Feature Content */}
                    <div className="flex flex-col items-center space-y-4 text-center">
                      {/* Icon Container */}
                      <motion.div
                        className="relative flex items-center justify-center w-20 h-20 transition-all duration-300 bg-blue-100 border border-blue-200 rounded-2xl group-hover:bg-blue-200"
                        whileHover={{ 
                          scale: 1.1,
                          rotate: [0, -5, 5, 0],
                        }}
                        transition={{ 
                          duration: 0.3,
                          rotate: { duration: 0.6 }
                        }}
                      >
                        {React.cloneElement(feature.icon, {
                          className: 'text-blue-900 group-hover:text-blue-800 transition-colors duration-300',
                        })}
                        
                        {/* Icon Glow Effect */}
                        <motion.div
                          className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-blue-500/20 rounded-2xl blur-xl group-hover:opacity-100"
                          animate={{
                            scale: [1, 1.2, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                      </motion.div>

                      {/* Category Badge */}
                      <motion.span
                        className="px-3 py-1 text-xs font-semibold text-blue-900 bg-blue-100 border border-blue-200 rounded-full"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + index * 0.05 }}
                      >
                        {feature.category}
                      </motion.span>

                      {/* Title */}
                      <motion.h3
                        className="text-xl font-bold text-blue-900 transition-colors duration-300 group-hover:text-blue-800"
                        whileHover={{ y: -2 }}
                      >
                        {feature.title}
                      </motion.h3>

                      {/* Description */}
                      <motion.p
                        className="max-w-xs leading-relaxed text-black transition-colors duration-300 group-hover:text-gray-900"
                        initial={{ opacity: 0.8 }}
                        whileHover={{ opacity: 1 }}
                      >
                        {feature.description}
                      </motion.p>
                    </div>

                    {/* Hover Effect Lines */}
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="absolute inset-0 border-2 border-blue-300 rounded-2xl" />
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Decorative Elements */}
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute w-32 h-32 bg-blue-100 rounded-full opacity-50 -top-10 -right-10 blur-2xl"
            />
            <motion.div
              animate={{
                rotate: -360,
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute w-40 h-40 rounded-full opacity-50 -bottom-10 -left-10 bg-blue-50 blur-2xl"
            />
          </motion.div>

          {/* Separate Quote Section */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="relative mt-12"
          >
            {/* Quote Container */}
            <motion.div 
              className="relative overflow-hidden bg-[#1e40af] shadow-2xl rounded-3xl"
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 30px 60px rgba(37, 99, 235, 0.25)" 
              }}
              transition={{ duration: 0.4 }}
            >

              <div className="relative z-10 p-8 md:p-12 lg:p-16">
                <div className="max-w-4xl mx-auto text-center">
                  {/* Quote Icon */}
                  <motion.div
                    className="flex justify-center mb-8"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative flex items-center justify-center w-20 h-20 border rounded-full shadow-2xl bg-white/20 backdrop-blur-sm border-white/30">
                      <Quote className="w-10 h-10 text-white" />
                      <div className="absolute inset-0 scale-150 rounded-full bg-white/20 blur-xl" />
                    </div>
                  </motion.div>

                  {/* Main Quote */}
                  <motion.blockquote
                    className="mb-10 text-2xl font-bold leading-tight tracking-tight text-white md:text-4xl lg:text-5xl"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    style={{
                      textShadow: '0 2px 20px rgba(0, 0, 0, 0.3)'
                    }}
                  >
                    "We believe that <span className="text-blue-200">lean teams</span> can move mountains when empowered by the <span className="text-blue-200">right tools</span>. 
                    That's why we build nimble, intelligent AI solutions designed for <span className="text-blue-200">clarity, speed, and real-world results</span>."
                  </motion.blockquote>

                  {/* Attribution */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6"
                  >
                    {/* Logo/Avatar */}
                    <motion.div 
                      className="relative flex items-center justify-center w-16 h-16 border rounded-full shadow-xl bg-white/20 backdrop-blur-sm border-white/30"
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="text-xl font-bold text-white">T³</span>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                        className="absolute inset-0 border-2 rounded-full border-white/20 border-t-white/60"
                      />
                    </motion.div>
                    
                    {/* Team Info */}
                    <div className="text-center sm:text-left">
                      <p className="mb-1 text-xl font-bold text-white">The Teeny Tech Trek Team</p>
                      <div className="flex flex-wrap justify-center gap-2 text-blue-200 sm:justify-start">
                        <span className="px-3 py-1 text-sm font-medium border rounded-full bg-white/10 backdrop-blur-sm border-white/20">
                          Building small
                        </span>
                        <span className="px-3 py-1 text-sm font-medium border rounded-full bg-white/10 backdrop-blur-sm border-white/20">
                          Launching fast
                        </span>
                        <span className="px-3 py-1 text-sm font-medium border rounded-full bg-white/10 backdrop-blur-sm border-white/20">
                          Scaling smart
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};

export default WhyUs;