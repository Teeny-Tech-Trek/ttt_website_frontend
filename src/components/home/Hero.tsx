import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Play, CheckCircle, TrendingUp, Shield, Zap, Brain, Globe, Users, Award } from 'lucide-react';
import Container from '../ui/Container';
import ChatbotModal from '../../pages/ChatbotModal'; // Import the ChatbotModal component

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [activeFeature, setActiveFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false); // State for chatbot modal

  useEffect(() => {
    setIsVisible(true);
    
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % 4);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Function to open chatbot modal
  const openChatbot = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsChatbotOpen(true);
  };

  // Function to close chatbot modal
  const closeChatbot = () => {
    setIsChatbotOpen(false);
  };

  const features = [
    { icon: Brain, title: 'Advanced AI', description: 'Cutting-edge machine learning solutions' },
    { icon: Shield, title: 'Enterprise Security', description: 'Bank-level security and compliance' },
    { icon: TrendingUp, title: 'Scalable Growth', description: 'Solutions that grow with your business' },
    { icon: Globe, title: 'Global Deployment', description: 'Worldwide infrastructure and support' }
  ];

  const stats = [
    { value: '500+', label: 'Enterprises Served' },
    { value: '99.9%', label: 'Uptime Guarantee' },
    { value: '85%', label: 'Avg. Efficiency Gain' },
    { value: '24/7', label: 'Expert Support' }
  ];

  const getResponsiveRadius = () => {
    if (typeof window === 'undefined') return 120;
    if (window.innerWidth >= 2560) return 200; // 2560px+ displays
    if (window.innerWidth >= 1440) return 180; // XL displays
    if (window.innerWidth >= 1024) return 160; // Large displays
    if (window.innerWidth >= 640) return 140;  // Medium displays
    return 120; // Small displays
  };

  const getResponsiveLineWidth = () => {
    if (typeof window === 'undefined') return 100;
    if (window.innerWidth >= 2560) return 180;
    if (window.innerWidth >= 1440) return 160;
    if (window.innerWidth >= 1024) return 140;
    if (window.innerWidth >= 640) return 120;
    return 100;
  };

  return (
    <>
      <section 
        ref={heroRef}
        id="home" 
        className="relative flex items-center min-h-screen pt-4 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/30 sm:pt-16 md:pt-20 lg:pt-24 xl:pt-28 2xl:pt-32"
      >
        {/* Responsive Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Grid Pattern */}
          <div 
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }}
          ></div>
          
          {/* Gradient Orbs - Fully responsive */}
          <div className="absolute rounded-full bg-gradient-to-br from-blue-100/30 to-indigo-100/20 blur-3xl opacity-60
                          top-20 -right-20 w-32 h-32
                          sm:w-40 sm:h-40 sm:-right-32
                          md:w-64 md:h-64 md:-right-40
                          lg:w-80 lg:h-80
                          xl:w-96 xl:h-96
                          2xl:w-[32rem] 2xl:h-[32rem] 2xl:-right-48"></div>
          <div className="absolute rounded-full bg-gradient-to-tr from-indigo-100/25 to-blue-100/30 blur-3xl opacity-50
                          bottom-40 -left-20 w-40 h-40
                          sm:w-48 sm:h-48 sm:-left-32
                          md:w-72 md:h-72 md:-left-40
                          lg:w-96 lg:h-96
                          xl:w-[28rem] xl:h-[28rem]
                          2xl:w-[36rem] 2xl:h-[36rem] 2xl:-left-48"></div>
          
          {/* Floating Data Points - Responsive count and size */}
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-blue-400/30
                         w-0.5 h-0.5
                         sm:w-1 sm:h-1
                         lg:w-1.5 lg:h-1.5
                         2xl:w-2 2xl:h-2"
              style={{
                left: `${20 + (i * 8)}%`,
                top: `${15 + (i * 7)}%`,
                animation: `float ${3 + (i * 0.2)}s ease-in-out infinite alternate`,
                animationDelay: `${i * 0.3}s`
              }}
            ></div>
          ))}
        </div>

        <Container className="relative z-10 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 max-w-none">
          <div className="max-w-7xl mx-auto
                          2xl:max-w-[1600px]">
            <div className="grid items-center grid-cols-1 gap-8 lg:grid-cols-12 sm:gap-10 md:gap-12 lg:gap-16 xl:gap-20 2xl:gap-24">
              {/* Main Content */}
              <div className="text-center lg:col-span-7 lg:text-left">
                {/* Main Headline - Ultra responsive */}
                <h1 className={`font-bold mb-4 sm:mb-6 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                  <span className="block mb-1 text-2xl font-bold tracking-tight text-gray-900 sm:mb-2 sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl">
                    Transform Your Business
                  </span>
                  <span className="block mb-2 text-2xl font-bold tracking-tight text-gray-900 sm:mb-4 sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl">
                    with Enterprise
                  </span>
                  <span className="block text-2xl font-bold tracking-tight text-transparent bg-blue-900 bg-clip-text sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl">
                    AI Solutions
                  </span>
                </h1>
                
                {/* Subtitle - Responsive text size */}
                <p className={`text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                              text-base
                              sm:text-lg
                              lg:text-xl
                              xl:text-2xl
                              2xl:text-2xl 2xl:max-w-3xl`}>
                  Deploy intelligent automation, predictive analytics, and AI-driven insights that deliver measurable ROI. 
                  Purpose-built for enterprise scale, security, and compliance.
                </p>

                {/* Key Benefits - Responsive grid */}
                <div className={`grid gap-3 sm:gap-4 mb-6 sm:mb-8 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                                grid-cols-1
                                sm:grid-cols-2
                                2xl:gap-6`}>
                  {[
                    'Deploy in 30 days or less',
                    '99.9% uptime SLA guarantee',
                    'SOC2 & ISO certified security',
                    '24/7 dedicated support'
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-center gap-2 sm:gap-3 2xl:gap-4">
                      <CheckCircle className="flex-shrink-0 w-4 h-4 text-green-500 sm:w-5 sm:h-5 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7" />
                      <span className="text-sm font-medium text-gray-700 sm:text-base xl:text-lg 2xl:text-xl">{benefit}</span>
                    </div>
                  ))}
                </div>
                
                {/* CTA Buttons - Responsive sizing */}
                <div className={`flex gap-3 sm:gap-4 mb-6 sm:mb-8 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                                flex-col
                                sm:flex-row
                                2xl:gap-6 2xl:mb-12`}>
                  <button
                    onClick={openChatbot}
                    className="relative flex items-center justify-center gap-2 px-6 py-3 overflow-hidden text-sm font-semibold text-white transition-all duration-300 bg-blue-900 group rounded-xl sm:gap-3 hover:shadow-xl hover:shadow-blue-500/25 hover:scale-105 sm:px-8 sm:py-4 sm:text-base lg:px-10 lg:py-5 xl:px-12 xl:py-6 xl:text-lg 2xl:px-16 2xl:py-8 2xl:text-xl 2xl:rounded-2xl"
                  >
                    <div className="absolute inset-0 transition-opacity duration-300 bg-blue-900 opacity-0 group-hover:opacity-100"></div>
                    <span className="relative z-10">Chat with AI</span>
                    <ArrowRight className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-1 sm:w-5 sm:h-5 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7" />
                  </button>
                  
                  <a 
                    href="/#pricing" 
                    className="flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-gray-700 transition-all duration-300 border-2 border-gray-300 group rounded-xl sm:gap-3 hover:bg-gray-50 hover:border-gray-400 hover:scale-105 sm:px-8 sm:py-4 sm:text-base lg:px-10 lg:py-5 xl:px-12 xl:py-6 xl:text-lg 2xl:px-16 2xl:py-8 2xl:text-xl 2xl:rounded-2xl"
                  >
                    <Play className="w-4 h-4 sm:w-5 sm:h-5 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7" />
                    <span>Book a Consultation.</span>
                  </a>
                </div>

                {/* Stats - Responsive grid */}
                <div className={`grid gap-4 sm:gap-6 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                                grid-cols-2
                                lg:grid-cols-4
                                2xl:gap-8`}>
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center lg:text-left">
                      <div className="mb-1 text-xl font-bold text-gray-900 sm:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl">{stat.value}</div>
                      <div className="text-xs text-gray-600 sm:text-sm lg:text-base xl:text-lg 2xl:text-xl">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Interactive Visualization - Ultra responsive */}
               <div className="relative px-4 mt-8 lg:col-span-5 lg:mt-0 sm:px-0">
            <div className="relative max-w-sm mx-auto sm:max-w-md lg:max-w-lg">
              {/* Central AI Hub - Responsive sizing */}
              <div className="relative w-64 h-64 mx-auto sm:w-80 sm:h-80 lg:w-80 lg:h-80 xl:w-96 xl:h-96">
                <div className="absolute inset-0 overflow-hidden border shadow-2xl rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white to-blue-50 border-gray-200/50 backdrop-blur-xl">
                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
                    <div className="flex items-center justify-center w-12 h-12 mb-3 shadow-lg sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-700 to-indigo-900 sm:mb-4 lg:mb-6">
                      <Brain className="w-6 h-6 text-white sm:w-8 sm:h-8 lg:w-10 lg:h-10" />
                    </div>
                    
                    <h3 className="mb-1 text-base font-bold text-center text-gray-900 sm:text-lg lg:text-xl sm:mb-2">
                      AI Intelligence Hub
                    </h3>
                    <p className="px-2 mb-3 text-xs text-center text-gray-600 sm:text-sm sm:mb-4 lg:mb-6">
                      Unified platform for all your AI operations
                    </p>

                    {/* Feature Indicators */}
                    <div className="flex gap-1 sm:gap-2">
                      {features.map((_, index) => (
                        <div
                          key={index}
                          className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-500 ${
                            activeFeature === index ? 'bg-blue-900' : 'bg-gray-300'
                          }`}
                        ></div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Animated Border */}
                  <div className="absolute inset-0 border border-blue-200 opacity-50 rounded-2xl sm:rounded-3xl">
                    <div 
                      className="absolute inset-0 border-2 border-blue-400 rounded-2xl sm:rounded-3xl"
                      style={{
                        animation: 'pulse 2s ease-in-out infinite',
                        clipPath: `circle(${activeFeature * 25 + 25}% at 50% 50%)`
                      }}
                    ></div>
                  </div>
                </div>

                {/* Orbiting Features - Responsive positioning and sizing */}
                {features.map((feature, index) => {
                  const angle = (index * 90) * (Math.PI / 180);
                  // Responsive radius based on screen size
                  const radius = window.innerWidth < 640 ? 120 : window.innerWidth < 1024 ? 140 : 160;
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;
                  const IconComponent = feature.icon;
                  
                  return (
                    <div
                      key={index}
                      className={`absolute w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 rounded-lg sm:rounded-xl lg:rounded-2xl bg-white border-2 flex items-center justify-center transition-all duration-500 shadow-lg ${
                        activeFeature === index 
                          ? 'border-blue-500 scale-110 shadow-blue-500/25' 
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                      style={{
                        left: '50%',
                        top: '50%',
                        transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`
                      }}
                    >
                      <IconComponent 
                        className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-7 lg:h-7 ${
                          activeFeature === index ? 'text-blue-600' : 'text-gray-600'
                        }`}
                      />
                      
                      {/* Tooltip - Hidden on mobile, visible on larger screens */}
                      <div className={`absolute -bottom-12 sm:-bottom-16 left-1/2 transform -translate-x-1/2 transition-opacity duration-300 hidden sm:block ${
                        activeFeature === index ? 'opacity-100' : 'opacity-0'
                      }`}>
                        <div className="px-2 py-1 text-center bg-white border rounded-lg shadow-lg sm:px-3 sm:py-2 whitespace-nowrap">
                          <div className="text-xs font-semibold text-gray-900 sm:text-sm">{feature.title}</div>
                          <div className="hidden text-xs text-gray-600 lg:block">{feature.description}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Connection Lines - Responsive */}
                {features.map((_, index) => (
                  <div
                    key={`line-${index}`}
                    className="absolute h-px origin-left top-1/2 left-1/2 bg-gradient-to-r from-gray-300 to-transparent"
                    style={{
                      width: window.innerWidth < 640 ? '100px' : window.innerWidth < 1024 ? '120px' : '140px',
                      transform: `translate(-50%, -50%) rotate(${index * 90}deg)`,
                      opacity: activeFeature === index ? 0.8 : 0.3,
                      transition: 'opacity 0.5s ease'
                    }}
                  ></div>
                ))}

                {/* Ambient Glow */}
                <div className="absolute inset-0 scale-150 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-blue-500/5 to-indigo-500/10 blur-xl -z-10"></div>
              </div>

              {/* Mobile Feature Labels - Only visible on small screens */}
              <div className="mt-6 sm:hidden">
                <div className="text-center">
                  <div className="text-sm font-semibold text-gray-900">{features[activeFeature].title}</div>
                  <div className="text-xs text-gray-600">{features[activeFeature].description}</div>
                </div>
              </div>
            </div>
          </div>
            </div>
          </div>
        </Container>

        {/* Custom Animations */}
        <style>{`
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-10px);
            }
          }
          
          @keyframes pulse {
            0%, 100% {
              opacity: 0.4;
            }
            50% {
              opacity: 1;
            }
          }
        `}</style>
      </section>

      {/* ChatbotModal Component */}
      <ChatbotModal isOpen={isChatbotOpen} onClose={closeChatbot} />
    </>
  );
};

export default Hero;