import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Zap, Target, Users, Shield, Quote } from 'lucide-react';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';



const WhyUs = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [quoteRef, quoteInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const reasons = [
    {
      icon: Zap,
      title: "Speed with intention",
      description: "MVPs and workflows delivered fast, but with thoughtful planning and execution.",
      color: 'bg-blue-50',
      hoverColor: 'hover:bg-blue-100',
      textColor: 'text-blue-700',
      iconColor: 'text-blue-600',
      borderColor: 'border-blue-200',
    },
    {
      icon: Target,
      title: "Clarity over complexity",
      description: "No black boxes, just clean, understandable systems that make sense for your business.",
      color: 'bg-purple-50',
      hoverColor: 'hover:bg-purple-100',
      textColor: 'text-purple-700',
      iconColor: 'text-purple-600',
      borderColor: 'border-purple-200',
    },
    {
      icon: Users,
      title: "True collaboration",
      description: "We integrate like a teammate, not a vendor, focusing on your goals and processes.",
      color: 'bg-emerald-50',
      hoverColor: 'hover:bg-emerald-100',
      textColor: 'text-emerald-700',
      iconColor: 'text-emerald-600',
      borderColor: 'border-emerald-200',
    },
    {
      icon: Shield,
      title: "Innovation at the edge",
      description: "Every solution is custom-crafted and future-ready using the latest AI advancements.",
      color: 'bg-orange-50',
      hoverColor: 'hover:bg-orange-100',
      textColor: 'text-orange-700',
      iconColor: 'text-orange-600',
      borderColor: 'border-orange-200',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      scale: 0.95,
      rotateX: -10
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: { 
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        damping: 20,
        stiffness: 100
      } 
    },
  };

  const cardHoverVariants = {
    hover: {
      y: -8,
      scale: 1.02,
      rotateY: 2,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const iconVariants = {
    hover: {
      scale: 1.2,
      rotate: 10,
      transition: {
        duration: 0.3,
        ease: "backOut"
      }
    }
  };

  const quoteVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.3
      } 
    },
  };

  return (
    <section id="why-us" className="py-24 bg-white relative overflow-hidden">
      {/* Enhanced background patterns */}
     

      {/* Floating geometric shapes */}
      <motion.div
        animate={{ 
          rotate: 360,
          scale: [1, 1.1, 1],
          x: [0, 20, 0]
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: "linear",
          scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
          x: { duration: 12, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute top-20 right-10 w-24 h-24 bg-gradient-to-r from-blue-200/30 to-purple-200/30 rounded-full blur-xl"
      />
      <motion.div
        animate={{ 
          rotate: -360,
          scale: [1, 0.8, 1],
          y: [0, -30, 0]
        }}
        transition={{ 
          duration: 25, 
          repeat: Infinity, 
          ease: "linear",
          scale: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 10, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute bottom-20 left-10 w-32 h-32 bg-gradient-to-r from-emerald-200/30 to-cyan-200/30 rounded-full blur-xl"
      />

      <Container className="relative z-10">
        <SectionHeading
          title="Why Teeny Tech Trek?"
          subtitle="Because we don't just build tech — we build momentum."
        />

        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-20"
        >
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover="hover"
              className="group"
            >
              <motion.div
                variants={cardHoverVariants}
                className={`bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg ${reason.borderColor} border-2 hover:shadow-2xl transition-all duration-500 relative overflow-hidden`}
              >
                {/* Card gradient overlay */}
                <div className={`absolute inset-0 ${reason.color} opacity-0 group-hover:opacity-50 transition-opacity duration-500 rounded-3xl`} />
                
                <div className="flex items-start gap-6 relative z-10">
                  <motion.div
                    variants={iconVariants}
                    className={`w-14 h-14 flex items-center justify-center ${reason.color} rounded-2xl border ${reason.borderColor} group-hover:shadow-lg transition-all duration-300 shrink-0`}
                  >
                    <reason.icon size={28} className={reason.iconColor} />
                  </motion.div>
                  
                  <div className="flex-1">
                    <motion.h3 
                      className="text-xl font-bold mb-3 text-gray-800 tracking-tight group-hover:text-gray-900 transition-colors duration-300"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {reason.title}
                    </motion.h3>
                    <motion.p 
                      className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300"
                      initial={{ opacity: 0.8 }}
                      whileHover={{ opacity: 1 }}
                    >
                      {reason.description}
                    </motion.p>
                  </div>
                </div>

                {/* Hover effect overlay */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 0.1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl"
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Quote Section */}
        <motion.div
          ref={quoteRef}
          initial="hidden"
          animate={quoteInView ? "visible" : "hidden"}
          variants={quoteVariants}
          className="mt-20"
        >
          <motion.div
            whileHover={{ scale: 1.01, y: -5 }}
            transition={{ duration: 0.3 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-blue-50/50 to-purple-50/30 shadow-2xl border border-blue-100/50"
          >
            {/* Background pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-60" />
            
            <div className="p-12 md:p-16 relative z-10">
              <div className="max-w-4xl mx-auto">
                {/* Logo section */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex items-center justify-center mb-10"
                >
                  <div className="relative">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-lg"
                    />
                           <img src="/logo.svg" alt="Teeny Tech Trek Logo" className="w-auto h-50" />
                  </div>
                </motion.div>
                
                {/* Quote icon */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex justify-center mb-8"
                >
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <Quote className="w-8 h-8 text-blue-600" />
                  </div>
                </motion.div>
                
                {/* Quote text */}
                <motion.blockquote
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="text-2xl md:text-3xl text-center text-gray-700 font-medium leading-relaxed mb-10 tracking-tight"
                >
                  "We believe that lean teams can move mountains when empowered by the right tools. That's why we build nimble, intelligent AI solutions designed for clarity, speed, and real-world results."
                </motion.blockquote>
                
                {/* Attribution */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="text-center"
                >
                  <p className="font-bold text-xl text-blue-700 mb-2">The Teeny Tech Trek Team</p>
                  <p className="text-blue-600/80 text-lg">Building small. Launching fast. Scaling smart.</p>
                </motion.div>
              </div>
            </div>
            
            {/* Floating elements */}
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 20, 
                repeat: Infinity, 
                ease: "linear",
                scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
              }}
              className="absolute -top-10 -right-10 w-40 h-40 bg-blue-200/20 rounded-full blur-2xl"
            />
            <motion.div
              animate={{ 
                rotate: -360,
                scale: [1, 0.8, 1]
              }}
              transition={{ 
                duration: 15, 
                repeat: Infinity, 
                ease: "linear",
                scale: { duration: 6, repeat: Infinity, ease: "easeInOut" }
              }}
              className="absolute -bottom-10 -left-10 w-60 h-60 bg-purple-200/20 rounded-full blur-2xl"
            />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};

export default WhyUs;