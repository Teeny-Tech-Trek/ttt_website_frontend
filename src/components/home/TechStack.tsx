import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Code, Database, Cloud, Smartphone, Cpu, Globe, ArrowRight, Sparkles, Zap } from 'lucide-react';
import Container from '../ui/Container';

const TechStack = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const headerY = useTransform(scrollYProgress, [0, 0.3], [0, -50]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      };
    };

    const animateFloatingElements = () => {
      const floatingElements = document.querySelectorAll('.floating-element');
      floatingElements.forEach((element, index) => {
        const htmlElement = element as HTMLElement;
        const intensity = (index + 1) * 0.3;
        const offsetX = mouseRef.current.x * intensity * 15;
        const offsetY = mouseRef.current.y * intensity * 15;
        
        htmlElement.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0) rotate(${mouseRef.current.x * 2}deg)`;
      });

      requestAnimationFrame(animateFloatingElements);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animateFloatingElements();

    // Auto-cycle active category
    const interval = setInterval(() => {
      setActiveCategory(prev => (prev + 1) % 6);
    }, 3000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, []);

  const technologies = [
    {
      category: 'Web Development',
      icon: Globe,
      items: ['MERN Stack', 'React.js', 'Node.js', 'Next.js'],
      gradient: 'from-blue-500 to-blue-600',
      bgGradient: 'from-blue-50 to-blue-100',
      description: 'Modern web applications with cutting-edge frameworks'
    },
    {
      category: 'Backend & APIs',
      icon: Code,
      items: ['.NET Core', 'ASP.NET', 'REST APIs', 'GraphQL','Fast API','JAVA'],
      gradient: 'from-indigo-500 to-indigo-600',
      bgGradient: 'from-indigo-50 to-indigo-100',
      description: 'Robust server-side solutions and API development'
    },
    {
      category: 'AI & Automation',
      icon: Cpu,
      items: ['AI Automation', 'Machine Learning', 'Python', 'TensorFlow'],
      gradient: 'from-purple-500 to-purple-600',
      bgGradient: 'from-purple-50 to-purple-100',
      description: 'Intelligent automation and machine learning solutions'
    },
    {
      category: 'Mobile Development',
      icon: Smartphone,
      items: ['React Native', 'Flutter', 'iOS', 'Android'],
      gradient: 'from-green-500 to-green-600',
      bgGradient: 'from-green-50 to-green-100',
      description: 'Cross-platform mobile applications'
    },
    {
      category: 'Databases',
      icon: Database,
      items: ['MongoDB', 'SQL Server', 'PostgreSQL', 'MySQL'],
      gradient: 'from-orange-500 to-orange-600',
      bgGradient: 'from-orange-50 to-orange-100',
      description: 'Scalable data storage and management solutions'
    },
    {
      category: 'Cloud & DevOps',
      icon: Cloud,
      items: ['AWS Cloud', 'Azure', 'Docker', 'Kubernetes'],
      gradient: 'from-cyan-500 to-cyan-600',
      bgGradient: 'from-cyan-50 to-cyan-100',
      description: 'Cloud infrastructure and deployment automation'
    },
  ];

  return (
    <section 
      ref={containerRef}
      id="tech-stack" 
      className="min-h-screen py-20 relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40"
      style={{ perspective: '1500px' }}
    >
      {/* Enhanced 3D Background */}
      <motion.div 
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ y: backgroundY }}
      >
        {/* Dynamic gradient shapes */}
        <div className="floating-element absolute top-1/4 left-1/6 w-96 h-96 rounded-full bg-gradient-to-br from-blue-200/40 to-blue-300/30 blur-3xl opacity-70"></div>
        <div className="floating-element absolute bottom-1/3 right-1/5 w-[500px] h-[500px] rounded-full bg-gradient-to-tl from-indigo-200/35 to-blue-200/40 blur-3xl opacity-60"></div>
        <div className="floating-element absolute top-1/2 left-1/2 w-80 h-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-blue-100/30 to-indigo-100/35 blur-3xl opacity-50"></div>
        
        {/* Floating particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="floating-element absolute w-2 h-2 bg-blue-400/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,0.08)_1px,transparent_0)] bg-[size:40px_40px] opacity-40" />
      </motion.div>

      <Container className="relative z-10">
        {/* Enhanced Header */}
        <motion.div
          style={{ y: headerY }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative inline-block"
          >
            <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 relative z-10">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600">
                Our Technology Stack
              </span>
            </h2>
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 blur-xl rounded-full"></div>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Cutting-edge technologies and frameworks that power innovation and deliver exceptional digital solutions for modern businesses.
          </motion.p>
        </motion.div>

        {/* Interactive Technology Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {technologies.map((tech, index) => {
            const IconComponent = tech.icon;
            const isActive = activeCategory === index;
            
            return (
              <motion.div
                key={index}
                className="relative group  transform-gpu h-80"
                style={{ perspective: '1000px' }}
                onHoverStart={() => setHoveredCard(tech.category)}
                onHoverEnd={() => setHoveredCard(null)}
                onMouseEnter={() => setActiveCategory(index)}
                whileHover={{ 
                  scale: 1.05,
                  rotateX: 5,
                  rotateY: hoveredCard === tech.category ? 10 : 0,
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <div className={`bg-white/80 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-white/50 relative transition-all duration-500 h-full flex flex-col ${
                  isActive ? 'ring-2 ring-blue-500/50' : ''
                }`}>
                  {/* Header Section */}
                  <div className={`relative h-32 bg-gradient-to-br ${tech.bgGradient} overflow-hidden flex-shrink-0`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                    
                    {/* Floating icon */}
                    <motion.div
                      className={`absolute top-6 left-6 w-16 h-16 bg-gradient-to-br ${tech.gradient} rounded-2xl flex items-center justify-center shadow-lg`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <IconComponent className="w-8 h-8 text-white" strokeWidth={1.5} />
                    </motion.div>

                    {/* Interactive sparkles */}
                    {hoveredCard === tech.category && (
                      <>
                        {Array.from({ length: 4 }).map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute"
                            style={{
                              right: `${20 + Math.random() * 40}%`,
                              top: `${20 + Math.random() * 60}%`,
                            }}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ 
                              opacity: [0, 1, 0],
                              scale: [0, 1, 0],
                              rotate: [0, 180, 360]
                            }}
                            transition={{
                              duration: 1.5,
                              delay: i * 0.2,
                              repeat: Infinity,
                              repeatDelay: 2
                            }}
                          >
                            <Sparkles size={14} className="text-white/70" />
                          </motion.div>
                        ))}
                      </>
                    )}

                    {/* Category indicator */}
                    <div className="absolute bottom-4 right-6">
                      <div className="w-3 h-3 bg-white/50 rounded-full animate-pulse"></div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 flex-1 flex flex-col">
                    <motion.h3
                      className="text-xl font-bold text-gray-900 mb-2"
                      layoutId={`title-${tech.category}`}
                    >
                      {tech.category}
                    </motion.h3>
                    
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {tech.description}
                    </p>

                    {/* Technology Tags */}
                    <div className="flex flex-wrap gap-2 flex-1">
                      {tech.items.map((item, i) => (
                        <motion.span
                          key={i}
                          className={`px-3 py-1.5 rounded-xl text-xs font-medium bg-gradient-to-r ${tech.bgGradient} text-gray-700 border border-white/50 h-fit`}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.1 * i }}
                          whileHover={{ scale: 1.05, y: -2 }}
                        >
                          {item}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Gradient border */}
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${tech.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none`}></div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Enhanced CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <motion.div
            className="bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 p-12 rounded-3xl text-white shadow-2xl relative overflow-hidden"
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            {/* Background effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.1)_1px,transparent_0)] bg-[size:40px_40px] opacity-30"></div>
            
            {/* Floating elements */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute top-8 right-8 w-16 h-16 border-2 border-white/20 rounded-full"
            />
            
            <motion.div
              animate={{
                scale: [1, 0.8, 1],
                rotate: [360, 180, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute bottom-8 left-8 w-12 h-12 bg-white/10 rounded-full"
            />

            <div className="max-w-4xl mx-auto text-center relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-center justify-center gap-3 mb-6"
              >
                <Zap className="w-8 h-8 text-yellow-300" />
                <h3 className="text-3xl md:text-4xl font-bold tracking-tight">
                  Ready to Build Something Amazing?
                </h3>
                <Zap className="w-8 h-8 text-yellow-300" />
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-blue-100 text-lg leading-relaxed mb-8 max-w-2xl mx-auto"
              >
                Our expertise spans across the entire technology spectrum. Let's collaborate to bring your vision to life with the perfect tech stack for your project.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <motion.a
                  href="#contact"
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-blue-600 font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10">Start Your Project</span>
                  <ArrowRight size={20} className="relative z-10 transition-transform group-hover:translate-x-2" strokeWidth={1.5} />
                </motion.a>
                
                <motion.a
                  href="#services"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 border-2 border-white/30 text-white rounded-2xl font-medium hover:bg-white/10 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  View Our Services
                </motion.a>
              </motion.div>
            </div>

            {/* Additional floating effects */}
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"
            />
            <motion.div
              animate={{
                scale: [1, 0.7, 1],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -bottom-10 -left-10 w-60 h-60 bg-white/10 rounded-full blur-2xl"
            />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};

export default TechStack;