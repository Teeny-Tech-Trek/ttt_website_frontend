import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import { Code, Database, Cloud, Smartphone, Cpu, Globe } from 'lucide-react';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';

const TechStack = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const technologies = [
    {
      category: 'Web Development',
      icon: Globe,
      items: ['MERN Stack', 'React.js', 'Node.js', 'Next.js'],
      color: 'bg-blue-50',
      hoverColor: 'hover:bg-blue-100',
      textColor: 'text-blue-700',
      iconColor: 'text-blue-600',
      borderColor: 'border-blue-200',
    },
    {
      category: 'Backend & APIs',
      icon: Code,
      items: ['.NET Core', 'ASP.NET', 'REST APIs', 'GraphQL'],
      color: 'bg-purple-50',
      hoverColor: 'hover:bg-purple-100',
      textColor: 'text-purple-700',
      iconColor: 'text-purple-600',
      borderColor: 'border-purple-200',
    },
    {
      category: 'AI & Automation',
      icon: Cpu,
      items: ['AI Automation', 'Machine Learning', 'Python', 'TensorFlow'],
      color: 'bg-emerald-50',
      hoverColor: 'hover:bg-emerald-100',
      textColor: 'text-emerald-700',
      iconColor: 'text-emerald-600',
      borderColor: 'border-emerald-200',
    },
    {
      category: 'Mobile Development',
      icon: Smartphone,
      items: ['React Native', 'Flutter', 'iOS', 'Android'],
      color: 'bg-orange-50',
      hoverColor: 'hover:bg-orange-100',
      textColor: 'text-orange-700',
      iconColor: 'text-orange-600',
      borderColor: 'border-orange-200',
    },
    {
      category: 'Databases',
      icon: Database,
      items: ['MongoDB', 'SQL Server', 'PostgreSQL', 'Redis'],
      color: 'bg-rose-50',
      hoverColor: 'hover:bg-rose-100',
      textColor: 'text-rose-700',
      iconColor: 'text-rose-600',
      borderColor: 'border-rose-200',
    },
    {
      category: 'Cloud & DevOps',
      icon: Cloud,
      items: ['AWS Cloud', 'Azure', 'Docker', 'Kubernetes'],
      color: 'bg-cyan-50',
      hoverColor: 'hover:bg-cyan-100',
      textColor: 'text-cyan-700',
      iconColor: 'text-cyan-600',
      borderColor: 'border-cyan-200',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateX: -15,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: { 
        duration: 0.8, 
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        damping: 20,
        stiffness: 100
      } 
    },
  };

  const tagVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.4,
        ease: "backOut"
      }
    },
  };

  const cardHoverVariants = {
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const iconVariants = {
    hover: {
      scale: 1.2,
      rotate: 5,
      transition: {
        duration: 0.3,
        ease: "backOut"
      }
    }
  };

  const ctaVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.8, 
        delay: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94]
      } 
    },
  };

  return (
    <section id="tech-stack" className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
      {/* Enhanced background patterns */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,0.08)_1px,transparent_0)] bg-[size:60px_60px] opacity-40" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_35%,rgba(59,130,246,0.03)_50%,transparent_65%)] bg-[size:100px_100px]" />
      </div>

      {/* Floating geometric shapes */}
      <motion.div
        animate={{ 
          rotate: 360,
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: "linear",
          scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-blue-200/30 to-purple-200/30 rounded-full blur-xl"
      />
      <motion.div
        animate={{ 
          rotate: -360,
          scale: [1, 0.8, 1]
        }}
        transition={{ 
          duration: 25, 
          repeat: Infinity, 
          ease: "linear",
          scale: { duration: 6, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-r from-emerald-200/30 to-cyan-200/30 rounded-full blur-xl"
      />

      <Container className="relative z-10">
        <SectionHeading
          title="Our Technology Stack"
          subtitle="Cutting-edge technologies and frameworks that power innovation and deliver exceptional digital solutions for modern businesses."
        />

        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-20"
        >
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover="hover"
              className="group"
            >
              <motion.div
                variants={cardHoverVariants}
                className={`bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg ${tech.borderColor} border-2 hover:shadow-2xl transition-all duration-500 relative overflow-hidden`}
              >
                {/* Card gradient overlay */}
                <div className={`absolute inset-0 ${tech.color} opacity-0 group-hover:opacity-50 transition-opacity duration-500 rounded-3xl`} />
                
                {/* Icon and category */}
                <div className="relative z-10">
                  <motion.div
                    variants={iconVariants}
                    className="flex items-center gap-4 mb-6"
                  >
                    <div className={`p-3 ${tech.color} rounded-2xl border ${tech.borderColor} group-hover:shadow-lg transition-all duration-300`}>
                      <tech.icon className={`w-7 h-7 ${tech.iconColor}`} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 tracking-tight group-hover:text-gray-900 transition-colors duration-300">
                      {tech.category}
                    </h3>
                  </motion.div>
                  
                  {/* Technology tags */}
                  <div className="flex flex-wrap gap-3">
                    {tech.items.map((item, i) => (
                      <motion.div
                        key={i}
                        variants={tagVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.3 + (i * 0.1) }}
                        whileHover={{ 
                          scale: 1.05,
                          y: -2,
                          transition: { duration: 0.2 }
                        }}
                        className={`px-4 py-2.5 rounded-2xl ${tech.color} ${tech.hoverColor} ${tech.textColor} text-sm font-semibold transition-all duration-300 cursor-default border ${tech.borderColor} shadow-sm hover:shadow-md`}
                      >
                        {item}
                      </motion.div>
                    ))}
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

        {/* Enhanced CTA Section */}
        <motion.div
          variants={ctaVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mt-20"
        >
          <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ duration: 0.3 }}
            className="bg-primary p-12 rounded-3xl text-white shadow-2xl relative overflow-hidden"
          >
            {/* Background pattern */}
            <div className="absolute inset-0 bg-primary bg-[size:40px_40px] opacity-30" />
            
            <div className="max-w-3xl mx-auto text-center relative z-10">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-3xl md:text-4xl font-bold mb-6 tracking-tight"
              >
                Ready to Build Something Amazing?
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-blue-100 text-lg leading-relaxed mb-8"
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
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-block px-10 py-4 bg-white text-blue-600 font-bold rounded-2xl hover:bg-gray-50 transition-all duration-300 shadow-xl hover:shadow-2xl"
                >
                  Start Your Project
                </motion.a>
              
              </motion.div>
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
              className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"
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
              className="absolute -bottom-10 -left-10 w-60 h-60 bg-cyan-400/10 rounded-full blur-2xl"
            />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};

export default TechStack;