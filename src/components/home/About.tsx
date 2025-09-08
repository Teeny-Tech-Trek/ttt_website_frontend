import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Rocket, Brain, Zap, ShieldCheck } from 'lucide-react';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import React from 'react';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3, // Trigger when 30% of section is visible
    rootMargin: '200px 0px', // Start animations 200px before section enters viewport
  });

  // Scroll-based effects
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const missions = [
    {
      icon: <Rocket className="text-blue-600" size={28} />,
      title: "Build Small. Launch Fast.",
      description: "We create lean AI solutions that get to market quickly without sacrificing quality.",
    },
    {
      icon: <Brain className="text-blue-600" size={28} />,
      title: "Intelligent Integration.",
      description: "Our AI systems integrate seamlessly with your existing tools and workflows.",
    },
    {
      icon: <Zap className="text-blue-600" size={28} />,
      title: "Scale Smart.",
      description: "Solutions designed to grow efficiently alongside your business needs.",
    },
    {
  icon: <ShieldCheck className="text-blue-600" size={28} />,
  title: "Trust by Design.",
  description: "We prioritize security, privacy, and transparency in every AI solution we build.",
}

  ];

  return (
    <motion.section
      id="about"
      className=" relative overflow-hidden bg-gray-50  font-sans"
      style={{ opacity }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/5 left-1/4 w-96 h-96 rounded-full bg-blue-100 blur-3xl opacity-15"
          animate={{ x: [0, 50, 0], y: [0, 70, 0] }}
          transition={{ duration: 18, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
          style={{ y: y1 }}
        />
        <motion.div
          className="absolute bottom-1/5 right-1/4 w-80 h-80 rounded-full bg-blue-200 blur-3xl opacity-10"
          animate={{ x: [0, -40, 0], y: [0, -60, 0] }}
          transition={{ duration: 22, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
          style={{ y: y2 }}
        />
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2390cdf4' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 10, repeat: Infinity, repeatType: 'mirror' }}
        />
      </div>

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeading
            title="Our Mission"
            subtitle="Empowering visionary teams with AI solutions that simplify complexity and amplify impact."
          />
        </motion.div>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{
            visible: { transition: { staggerChildren: 0.15 } },
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12"
        >
          {missions.map((mission, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="relative bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100/20 group overflow-hidden flex flex-col items-center text-center transition-all duration-300"
              whileHover={{
                scale: 1.04,
                boxShadow: '0 10px 30px rgba(59, 130, 246, 0.2)',
                transition: { duration: 0.3 },
              }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ borderRadius: 'inherit' }}
              />
              <motion.div
                className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600/20 transition-colors"
                animate={{ rotate: [0, 5, 0] }}
                transition={{ duration: 8, repeat: Infinity, repeatType: 'loop' }}
                whileHover={{ rotate: 15, scale: 1.1 }}
              >
                {React.cloneElement(mission.icon, {
                  className: 'h-7 w-7 text-blue-600 group-hover:text-blue-700 transition-colors',
                })}
              </motion.div>
              <h3 className="text-xl font-bold text-blue-900 mb-4 tracking-tight">{mission.title}</h3>
              <p className="text-blue-900/70 leading-relaxed">{mission.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-100/20 p-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="text-3xl font-bold text-blue-900 mb-4 tracking-tight">
                Lean Teams, Big Impact
              </h3>
              <p className="text-blue-900/70 mb-6 leading-relaxed">
                At Teeny Tech Trek, we harness AI to empower focused teams. Our custom AI chatbots, autonomous agents, and automation systems enable startups, solopreneurs, and product teams to achieve more without the need for extensive engineering resources.
              </p>
              <div className="flex flex-wrap gap-6">
                {[
                  { text: 'Speed with Intention', color: 'bg-blue-500' },
                  { text: 'Clarity over Complexity', color: 'bg-blue-600' },
                  { text: 'True Collaboration', color: 'bg-blue-700' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.1, duration: 0.4 }}
                  >
                    <motion.div
                      className={`w-3 h-3 rounded-full ${item.color}`}
                      whileHover={{ scale: 1.5 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                    />
                    <span className="text-sm font-semibold text-blue-900/80">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="relative group">
                <div className="aspect-square bg-blue-100/50 rounded-xl flex items-center justify-center overflow-hidden">
                  <img
                    src="/mission.svg"
                    alt="AI Neural Network"
                    className="w-5/6 h-5/6 object-contain"
                  />
                  <motion.div
                    className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 6, repeat: Infinity, repeatType: 'mirror' }}
                  />
                </div>
                <motion.div
                  className="absolute -bottom-4 -right-4 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-semibold"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  Innovation at the Edge
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div> */}
      </Container>
    </motion.section>
  );
};

export default About;