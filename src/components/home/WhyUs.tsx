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
      title: 'Speed with Intention',
      description: 'MVPs and workflows delivered fast, but with thoughtful planning and execution.',
      color: 'bg-[#93c5fd]/20',
      hoverColor: 'hover:bg-[#93c5fd]/30',
      textColor: 'text-[#1e40af]',
      iconColor: 'text-[#3b82f6]',
      borderColor: 'border-[#93c5fd]/50',
    },
    {
      icon: Target,
      title: 'Clarity over Complexity',
      description: 'No black boxes, just clean, understandable systems that make sense for your business.',
      color: 'bg-[#93c5fd]/20',
      hoverColor: 'hover:bg-[#93c5fd]/30',
      textColor: 'text-[#1e40af]',
      iconColor: 'text-[#3b82f6]',
      borderColor: 'border-[#93c5fd]/50',
    },
    {
      icon: Users,
      title: 'True Collaboration',
      description: 'We integrate like a teammate, not a vendor, focusing on your goals and processes.',
      color: 'bg-[#93c5fd]/20',
      hoverColor: 'hover:bg-[#93c5fd]/30',
      textColor: 'text-[#1e40af]',
      iconColor: 'text-[#3b82f6]',
      borderColor: 'border-[#93c5fd]/50',
    },
    {
      icon: Shield,
      title: 'Innovation at the Edge',
      description: 'Every solution is custom-crafted and future-ready using the latest AI advancements.',
      color: 'bg-[#93c5fd]/20',
      hoverColor: 'hover:bg-[#93c5fd]/30',
      textColor: 'text-[#1e40af]',
      iconColor: 'text-[#3b82f6]',
      borderColor: 'border-[#93c5fd]/50',
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
      rotateX: -10,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
        type: 'spring',
        damping: 20,
        stiffness: 100,
      },
    },
  };

  const cardHoverVariants = {
    hover: {
      y: -10,
      scale: 1.03,
      rotateY: 3,
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  };

  const iconVariants = {
    hover: {
      scale: 1.3,
      rotate: [0, 10, -10, 0],
      transition: {
        duration: 0.4,
        ease: 'backOut',
        rotate: { duration: 0.6, times: [0, 0.3, 0.7, 1] },
      },
    },
  };

  const quoteVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.3,
      },
    },
  };

  const textRevealVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.4 + i * 0.1,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <section id="why-us" className="py-24 bg-[#f8fafc] relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,0.08)_1px,transparent_0)] bg-[size:60px_60px] opacity-40" />
      </div>

      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          x: [0, 20, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
          x: { duration: 12, repeat: Infinity, ease: 'easeInOut' },
        }}
        className="absolute top-20 right-10 w-24 h-24 bg-[#93c5fd]/30 rounded-full blur-xl"
      />
      <motion.div
        animate={{
          scale: [1, 0.8, 1],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
          y: { duration: 10, repeat: Infinity, ease: 'easeInOut' },
        }}
        className="absolute bottom-20 left-10 w-32 h-32 bg-[#3b82f6]/30 rounded-full blur-xl"
      />

      <Container className="relative z-10">
        <SectionHeading
          title="Why Teeny Tech Trek?"
          subtitle="We don't just build tech — we build momentum with purpose and precision."
        />

        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-20"
        >
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover="hover"
              className="group perspective-1000"
            >
              <motion.div
                variants={cardHoverVariants}
                className={`bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-lg ${reason.borderColor} border-2 hover:shadow-2xl transition-all duration-500 relative overflow-hidden transform-gpu`}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className={`absolute inset-0 ${reason.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`} />

                <div className="flex items-start gap-6 relative z-10">
                  <motion.div
                    variants={iconVariants}
                    className={`w-14 h-14 flex items-center justify-center ${reason.color} rounded-2xl border ${reason.borderColor} group-hover:shadow-lg transition-all duration-300 shrink-0`}
                  >
                    <reason.icon size={28} className={`${reason.iconColor} animate-pulse-slow`} />
                  </motion.div>

                  <div className="flex-1">
                    <motion.h3
                      className={`text-xl font-bold mb-3 ${reason.textColor} tracking-tight group-hover:${reason.textColor}/90 transition-colors duration-300`}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {reason.title}
                    </motion.h3>
                    <motion.p
                      className="text-[#1e40af]/80 leading-relaxed group-hover:text-[#1e40af]/90 transition-colors duration-300"
                      initial={{ opacity: 0.8 }}
                      whileHover={{ opacity: 1 }}
                    >
                      {reason.description}
                    </motion.p>
                  </div>
                </div>

                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.15 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    background: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.2), transparent 70%)',
                  }}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          ref={quoteRef}
          initial="hidden"
          animate={quoteInView ? 'visible' : 'hidden'}
          variants={quoteVariants}
          className="mt-20"
        >
          <motion.div
            whileHover={{ scale: 1.01, y: -5 }}
            transition={{ duration: 0.3 }}
            className="relative overflow-hidden rounded-3xl bg-white/95 backdrop-blur-md shadow-2xl border border-[#93c5fd]/50"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-60" />

            <div className="p-12 md:p-16 relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex items-center justify-center mb-10 relative"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0 bg-[#93c5fd]/20 rounded-full blur-lg w-32 h-32"
                  />
                  <img
                    src="/logo.svg"
                    alt="Teeny Tech Trek Logo"
                    className="relative w-16 h-16 rounded-lg shadow-md"
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/64';
                    }}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex justify-center mb-8"
                >
                  <div className="w-16 h-16 bg-[#93c5fd]/20 rounded-full flex items-center justify-center border border-[#93c5fd]/50">
                    <Quote className="w-8 h-8 text-[#3b82f6]" />
                  </div>
                </motion.div>

                <motion.blockquote
                  initial="hidden"
                  animate="visible"
                  className="text-2xl md:text-3xl text-center text-[#1e40af] font-medium leading-relaxed mb-10 tracking-tight"
                >
                  {`"We believe that lean teams can move mountains when empowered by the right tools. That's why we build nimble, intelligent AI solutions designed for clarity, speed, and real-world results."`
                    .split(' ')
                    .map((word, i) => (
                      <motion.span
                        key={i}
                        custom={i}
                        variants={textRevealVariants}
                        className="inline-block mx-1"
                      >
                        {word}
                      </motion.span>
                    ))}
                </motion.blockquote>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="text-center"
                >
                  <p className="font-bold text-xl text-[#1e40af] mb-2">The Teeny Tech Trek Team</p>
                  <p className="text-[#1e40af]/80 text-lg">Building small. Launching fast. Scaling smart.</p>
                </motion.div>
              </div>
            </div>

            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: 360,
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
                scale: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
              }}
              className="absolute -top-10 -right-10 w-40 h-40 bg-[#93c5fd]/20 rounded-full blur-2xl"
            />
            <motion.div
              animate={{
                scale: [1, 0.8, 1],
                rotate: -360,
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: 'linear',
                scale: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
              }}
              className="absolute -bottom-10 -left-10 w-60 h-60 bg-[#93c5fd]/20 rounded-full blur-2xl"
            />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};

export default WhyUs;