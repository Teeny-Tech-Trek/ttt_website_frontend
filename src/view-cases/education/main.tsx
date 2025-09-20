import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Database, 
  Users, 
  BarChart3, 
  BookOpen, 
  School, 
  ArrowRight, 
  Building2,
  Target,
  Clock,
  DollarSign,
  Eye,
  Sparkles,
  Brain,
  Rocket,
  Globe,
  Activity,
  MessageCircle,
  Zap,
  FileText,
  TrendingUp,
  Settings,
  Shield,
  Calendar,
  Headphones,
  Star,
  Wifi,
  MapPin,
  CheckCircle,
  Home,
  Award,
  Lightbulb,
  Presentation,
  Video,
  Laptop
} from 'lucide-react';

import educationImage from "../../Images/Case Studies/Education.png"

// Animation variants
const slideFromLeft = {
  hidden: { x: -100, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const slideFromRight = {
  hidden: { x: 100, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const slideFromTop = {
  hidden: { y: -80, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const slideFromBottom = {
  hidden: { y: 80, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const fadeIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" }
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

// Clean Split-Screen Hero for Education
const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-white">
      <div className="px-6 py-20 mx-auto max-w-7xl">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left Content */}
          <motion.div 
            className="space-y-8"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h1 
              className="text-5xl font-black leading-tight text-black md:text-6xl lg:text-7xl"
              variants={slideFromLeft}
            >
              AI-Powered 
              <br />
              <span className="text-blue-900">Education Solutions</span>
            </motion.h1>
            
            <motion.p 
              className="max-w-lg text-xl leading-relaxed text-gray-700"
              variants={slideFromLeft}
            >
              Transform educational institutions through intelligent 
              collaboration platforms and comprehensive AI workshops 
              that empower educators and students.
            </motion.p>

            <motion.div 
              className="flex flex-col gap-4 sm:flex-row"
              variants={slideFromLeft}
            >
              <button className="flex items-center justify-center px-8 py-4 font-semibold text-white transition-colors bg-blue-900 rounded-lg hover:bg-blue-800 group">
                Start Collaboration
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </button>
              
              <button className="flex items-center justify-center px-8 py-4 font-semibold text-gray-700 transition-colors border-2 border-gray-300 rounded-lg hover:border-blue-900 hover:text-blue-900">
                <Video className="w-5 h-5 mr-2" />
                View Workshop Demo
              </button>
            </motion.div>
          </motion.div>

          {/* Right Visual - Simple Education Image */}
          <motion.div 
            className="relative"
            initial="hidden"
            animate="visible"
            variants={slideFromRight}
          >
            <img 
              src={educationImage}
              className="w-full h-[500px] object-cover rounded-2xl shadow-xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Side-by-Side Service Layout
const EducationServices: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="px-6 mx-auto max-w-7xl">
        <motion.div 
          className="mb-16 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={slideFromTop}
        >
          <h2 className="mb-6 text-4xl font-bold text-black md:text-5xl">
            Education Solutions
          </h2>
          <p className="max-w-3xl mx-auto text-xl text-gray-700">
            Comprehensive AI solutions designed to enhance educational collaboration and learning outcomes
          </p>
        </motion.div>

        {/* Side-by-Side Cards Layout */}
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Institutional Collaboration */}
          <motion.div 
            className="h-full p-8 bg-white border border-gray-200 rounded-3xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={slideFromLeft}
          >
            <div className="mb-8 text-center">
              <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-blue-900 rounded-2xl">
                <School className="w-10 h-10 text-white" />
              </div>
              <h3 className="mb-4 text-3xl font-bold text-blue-900">
                Institutional Collaboration
              </h3>
              <p className="text-lg leading-relaxed text-black">
                Connect educational institutions globally through intelligent collaboration platforms that enhance learning and research.
              </p>
            </div>

            <div className="mb-8 space-y-6">
              <div className="p-4 shadow-sm bg-blue-50 rounded-xl">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-10 h-10 mr-4 bg-blue-100 rounded-lg">
                    <Globe className="w-6 h-6 text-blue-900" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900">Global Network</h4>
                    <p className="text-sm text-black">Connect with institutions worldwide</p>
                  </div>
                </div>
              </div>

              <div className="p-4 shadow-sm bg-blue-50 rounded-xl">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-10 h-10 mr-4 bg-blue-100 rounded-lg">
                    <Users className="w-6 h-6 text-blue-900" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900">Faculty Exchange</h4>
                    <p className="text-sm text-black">Facilitate knowledge sharing programs</p>
                  </div>
                </div>
              </div>

              <div className="p-4 shadow-sm bg-blue-50 rounded-xl">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-10 h-10 mr-4 bg-blue-100 rounded-lg">
                    <BookOpen className="w-6 h-6 text-blue-900" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900">Resource Sharing</h4>
                    <p className="text-sm text-black">Access shared academic resources</p>
                  </div>
                </div>
              </div>
            </div>

            <button className="flex items-center justify-center w-full px-6 py-3 font-semibold text-white transition-colors bg-blue-900 rounded-xl hover:bg-blue-800 group">
              Explore Collaboration
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>

          {/* AI Workshops */}
          <motion.div 
            className="h-full p-8 bg-white border border-gray-200 rounded-3xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={slideFromRight}
          >
            <div className="mb-8 text-center">
              <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-blue-900 rounded-2xl">
                <Presentation className="w-10 h-10 text-white" />
              </div>
              <h3 className="mb-4 text-3xl font-bold text-blue-900">
                AI Workshops
              </h3>
              <p className="text-lg leading-relaxed text-black">
                Comprehensive training programs that equip educators and students with cutting-edge AI knowledge and practical skills.
              </p>
            </div>

            <div className="mb-8 space-y-6">
              <div className="p-4 shadow-sm bg-blue-50 rounded-xl">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-10 h-10 mr-4 bg-blue-100 rounded-lg">
                    <Brain className="w-6 h-6 text-blue-900" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900">AI Fundamentals</h4>
                    <p className="text-sm text-black">Comprehensive AI literacy programs</p>
                  </div>
                </div>
              </div>

              <div className="p-4 shadow-sm bg-blue-50 rounded-xl">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-10 h-10 mr-4 bg-blue-100 rounded-lg">
                    <Laptop className="w-6 h-6 text-blue-900" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900">Hands-on Training</h4>
                    <p className="text-sm text-black">Practical AI tool implementation</p>
                  </div>
                </div>
              </div>

              <div className="p-4 shadow-sm bg-blue-50 rounded-xl">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-10 h-10 mr-4 bg-blue-100 rounded-lg">
                    <Award className="w-6 h-6 text-blue-900" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900">Certification</h4>
                    <p className="text-sm text-black">Industry-recognized credentials</p>
                  </div>
                </div>
              </div>
            </div>

            <button className="flex items-center justify-center w-full px-6 py-3 font-semibold text-white transition-colors bg-blue-900 rounded-xl hover:bg-blue-800 group">
              Book Workshop
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Circular Progress Layout
const EducationImpact: React.FC = () => {
  const [progress, setProgress] = useState({ institutions: 0, students: 0, workshops: 0 });

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setProgress(prev => ({
          institutions: Math.min(prev.institutions + 1, 150),
          students: Math.min(prev.students + 50, 5000),
          workshops: Math.min(prev.workshops + 1, 89)
        }));
      }, 30);
      
      setTimeout(() => clearInterval(interval), 3000);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="px-6 mx-auto max-w-7xl">
        <motion.div 
          className="mb-16 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={slideFromTop}
        >
          <h2 className="mb-6 text-4xl font-bold text-black md:text-5xl">
            Transforming 
            <span className="text-blue-900"> Education Globally</span>
          </h2>
          <p className="max-w-3xl mx-auto text-xl text-gray-700">
            Measurable impact across educational institutions worldwide
          </p>
        </motion.div>

        {/* Circular Stats Layout */}
        <motion.div 
          className="grid gap-12 mb-20 md:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.div className="text-center" variants={slideFromBottom}>
            <div className="relative w-32 h-32 mx-auto mb-6">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 128 128">
                <circle cx="64" cy="64" r="56" fill="none" stroke="#e5e7eb" strokeWidth="8"/>
                <circle 
                  cx="64" cy="64" r="56" fill="none" 
                  stroke="#1e3a8a" strokeWidth="8"
                  strokeDasharray={`${(progress.institutions / 150) * 351.86} 351.86`}
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-900">{progress.institutions}+</div>
                  <div className="text-xs text-gray-600">Institutions</div>
                </div>
              </div>
            </div>
            <h3 className="mb-2 text-xl font-semibold text-blue-900">Partner Institutions</h3>
            <p className="text-black">Universities and schools in our network</p>
          </motion.div>

          <motion.div className="text-center" variants={slideFromBottom}>
            <div className="relative w-32 h-32 mx-auto mb-6">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 128 128">
                <circle cx="64" cy="64" r="56" fill="none" stroke="#e5e7eb" strokeWidth="8"/>
                <circle 
                  cx="64" cy="64" r="56" fill="none" 
                  stroke="#10b981" strokeWidth="8"
                  strokeDasharray={`${(progress.students / 5000) * 351.86} 351.86`}
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{progress.students.toLocaleString()}+</div>
                  <div className="text-xs text-gray-600">Students</div>
                </div>
              </div>
            </div>
            <h3 className="mb-2 text-xl font-semibold text-blue-900">Students Trained</h3>
            <p className="text-black">Learners empowered with AI skills</p>
          </motion.div>

          <motion.div className="text-center" variants={slideFromBottom}>
            <div className="relative w-32 h-32 mx-auto mb-6">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 128 128">
                <circle cx="64" cy="64" r="56" fill="none" stroke="#e5e7eb" strokeWidth="8"/>
                <circle 
                  cx="64" cy="64" r="56" fill="none" 
                  stroke="#8b5cf6" strokeWidth="8"
                  strokeDasharray={`${(progress.workshops / 89) * 351.86} 351.86`}
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{progress.workshops}%</div>
                  <div className="text-xs text-gray-600">Success Rate</div>
                </div>
              </div>
            </div>
            <h3 className="mb-2 text-xl font-semibold text-blue-900">Workshop Success</h3>
            <p className="text-black">Completion and satisfaction rate</p>
          </motion.div>
        </motion.div>

        {/* Feature Highlights */}
        <div className="grid gap-8 md:grid-cols-2">
          <motion.div 
            className="p-8 bg-white border border-gray-200 shadow-lg rounded-2xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={slideFromLeft}
          >
            <div className="flex items-center mb-6">
              <div className="flex items-center justify-center w-12 h-12 mr-4 bg-blue-100 rounded-xl">
                <Lightbulb className="w-6 h-6 text-blue-900" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-blue-900">Innovation Hub</h3>
                <p className="text-black">Cutting-edge AI research collaboration</p>
              </div>
            </div>
            <p className="leading-relaxed text-black">
              Foster innovation through cross-institutional research projects and AI development initiatives that push the boundaries of educational technology.
            </p>
          </motion.div>

          <motion.div 
            className="p-8 bg-white border border-gray-200 shadow-lg rounded-2xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={slideFromRight}
          >
            <div className="flex items-center mb-6">
              <div className="flex items-center justify-center w-12 h-12 mr-4 bg-green-100 rounded-xl">
                <Target className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-blue-900">Skill Development</h3>
                <p className="text-black">Comprehensive AI competency building</p>
              </div>
            </div>
            <p className="leading-relaxed text-black">
              Develop practical AI skills through hands-on workshops, real-world projects, and industry-standard certification programs.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Light Background CTA
const LightCTA: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl px-6 mx-auto text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.h2 
            className="mb-6 text-4xl font-bold text-black md:text-5xl"
            variants={slideFromTop}
          >
            Ready to Transform Education with AI?
          </motion.h2>
          
          <motion.p 
            className="mb-12 text-xl leading-relaxed text-gray-700"
            variants={slideFromBottom}
          >
            Join educational institutions worldwide already leveraging AI collaboration and workshops to enhance learning outcomes with Teeny Tech Trek.
          </motion.p>

          <motion.div 
            className="flex flex-col justify-center gap-4 mb-8 sm:flex-row"
            variants={slideFromBottom}
          >
            <button className="flex items-center justify-center px-10 py-4 text-lg font-semibold text-white transition-colors bg-blue-900 rounded-lg hover:bg-blue-800 group">
              <School className="w-5 h-5 mr-2" />
              Start Institutional Partnership
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </button>
            
            <button className="flex items-center justify-center px-10 py-4 text-lg font-semibold text-blue-900 transition-colors border-2 border-blue-900 rounded-lg hover:bg-blue-900 hover:text-white">
              <Presentation className="w-5 h-5 mr-2" />
              Schedule Workshop
            </button>
          </motion.div>

          {/* Feature Pills */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4"
            variants={fadeIn}
          >
            <span className="px-4 py-2 text-sm font-medium text-black bg-white border border-gray-200 rounded-full">
              🏫 Institutional Collaboration
            </span>
            <span className="px-4 py-2 text-sm font-medium text-black bg-white border border-gray-200 rounded-full">
              🎓 AI Workshops & Training
            </span>
            <span className="px-4 py-2 text-sm font-medium text-black bg-white border border-gray-200 rounded-full">
              🌐 Global Network Access
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Main Index
const EducationIndex: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <EducationServices />
      <EducationImpact />
      <LightCTA />
    </div>
  );
};

export default EducationIndex;