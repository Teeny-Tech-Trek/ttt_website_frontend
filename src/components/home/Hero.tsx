import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Zap, Cpu } from 'lucide-react';
import Container from '../ui/Container';

const Hero = () => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);

  return (
    <motion.section 
      id="home" 
      className="min-h-screen flex items-center relative overflow-hidden bg-white"
      style={{ opacity }}
    >
      {/* Subtle animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-blue-50 blur-3xl opacity-30"
          animate={{
            x: [0, 40, 0],
            y: [0, 60, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-blue-100 blur-3xl opacity-20"
          animate={{
            x: [0, -60, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut"
          }}
        />
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 1, 
              ease: [0.16, 1, 0.3, 1] 
            }}
            className="text-center lg:text-left"
          >
            <h1 className="font-bold mb-10">
              <motion.span 
                className="block text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 text-gray-900"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                Small Teams.
              </motion.span>
              <motion.span 
                className="block text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 text-gray-800"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Big Impact.
              </motion.span>
              <motion.span 
                className="block text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Powered by AI.
              </motion.span>
            </h1>
            
            <motion.p 
              className="text-xl text-gray-600 mb-12 max-w-lg mx-auto lg:mx-0 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              We build nimble, intelligent AI solutions designed for clarity, speed, and real-world results.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              <motion.a 
                href="#services" 
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl font-medium flex items-center justify-center gap-3 group transition-all hover:shadow-lg hover:shadow-blue-100/50 hover:from-blue-700 hover:to-blue-600"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Explore Our Services
                <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
              </motion.a>
              <motion.a 
                href="#contact" 
                className="px-8 py-4 border-2 border-blue-500 text-blue-600 rounded-xl font-medium transition-all hover:bg-blue-50/50 hover:shadow-sm"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Get in Touch
              </motion.a>
            </motion.div>
          </motion.div>
          
          {/* Image Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.4, 
              ease: [0.16, 1, 0.3, 1] 
            }}
            className="relative"
          >
            <motion.div 
              className="relative z-10"
              style={{ y: y1 }}
            >
              <motion.div
                className="bg-white p-8 rounded-3xl shadow-2xl max-w-md mx-auto border border-gray-100/50 overflow-hidden"
                whileHover={{ y: -8 }}
              >
                <div className="h-80 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl flex items-center justify-center mb-6 relative overflow-hidden">
                  <img 
                    src="https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="AI Technology Visualization" 
                    className="w-full h-full object-cover rounded-2xl opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-blue-400/30 rounded-2xl flex items-center justify-center">
                    <Cpu className="h-20 w-20 text-blue-600 animate-pulse" strokeWidth={1.5} />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="h-4 bg-gray-100 rounded-full w-3/4"></div>
                  <div className="h-4 bg-gray-100 rounded-full w-1/2"></div>
                  <div className="h-4 bg-gray-100 rounded-full w-5/6"></div>
                </div>
              </motion.div>
              
              {/* Floating Cards */}
              <motion.div 
                className="absolute -bottom-8 -right-8 bg-gradient-to-r from-blue-600 to-blue-500 text-white p-6 rounded-2xl shadow-xl w-64 backdrop-blur-sm"
                initial={{ x: 50, y: 50, opacity: 0 }}
                animate={{ x: 0, y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
                whileHover={{ y: -8 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <Cpu className="h-5 w-5" strokeWidth={1.5} />
                  <div className="text-sm font-semibold">AI-Powered Solutions</div>
                </div>
                <div className="h-px bg-white/30 rounded-full mb-3"></div>
                <div className="h-2 bg-white/40 rounded-full mb-2"></div>
                <div className="h-2 bg-white/40 rounded-full w-2/3"></div>
              </motion.div>
              
              <motion.div 
                className="absolute -top-8 -left-8 bg-white p-6 rounded-2xl shadow-xl w-56 border border-gray-100/50"
                initial={{ x: -50, y: -50, opacity: 0 }}
                animate={{ x: 0, y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.6, ease: "easeOut" }}
                whileHover={{ y: -8 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <Zap className="h-5 w-5 text-blue-600" strokeWidth={1.5} />
                  <div className="text-sm font-semibold text-gray-800">Fast Implementation</div>
                </div>
                <div className="h-px bg-gray-200 rounded-full mb-3"></div>
                <div className="h-2 bg-blue-100 rounded-full mb-2"></div>
                <div className="h-2 bg-blue-100 rounded-full w-3/4"></div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </motion.section>
  );
};

export default Hero;