import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Play, CheckCircle, TrendingUp, Shield, Zap, Brain, Globe, Users, Award } from 'lucide-react';

// Placeholder for Container component
const Container = ({ children, className }) => (
  <div className={className}>{children}</div>
);

// Placeholder for ChatbotModal component
const ChatbotModal = ({ isOpen, onClose }) => (
  isOpen ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md p-8 mx-4 bg-white rounded-lg">
        <h2 className="mb-4 text-xl font-bold">AI Chatbot</h2>
        <p className="mb-4">This is where the chatbot would appear.</p>
        <button 
          onClick={onClose}
          className="px-4 py-2 text-white bg-blue-900 rounded hover:bg-blue-800"
        >
          Close
        </button>
      </div>
    </div>
  ) : null
);

const Hero = () => {
  const heroRef = useRef(null);
  const [activeFeature, setActiveFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % 4);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Function to open chatbot modal
  const openChatbot = (e) => {
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

  // Responsive calculations remain the same
  const getResponsiveRadius = () => {
    if (typeof window === 'undefined') return 120;
    if (window.innerWidth >= 3840) return 280; // 4K displays
    if (window.innerWidth >= 2560) return 240; // 2560px+ displays
    if (window.innerWidth >= 1920) return 220; // 1920px displays  
    if (window.innerWidth >= 1440) return 200; // XL displays
    if (window.innerWidth >= 1024) return 180; // Large displays
    if (window.innerWidth >= 768) return 160;  // Tablet landscape
    if (window.innerWidth >= 640) return 140;  // Medium displays
    return 120; // Small displays
  };

  const getResponsiveLineWidth = () => {
    if (typeof window === 'undefined') return 100;
    if (window.innerWidth >= 3840) return 220;
    if (window.innerWidth >= 2560) return 200;
    if (window.innerWidth >= 1920) return 180;
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
        className="relative flex items-center min-h-screen pt-8 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/30 sm:pt-12 md:pt-16 lg:pt-20 xl:pt-24 2xl:pt-28 3xl:pt-32 4xl:pt-36"
      >
        {/* Background Elements - Enhanced for all screen sizes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Grid Pattern - Scales with screen size */}
          <div 
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }}
          ></div>
          
          {/* Gradient Orbs - Ultra responsive */}
          <div className="absolute rounded-full bg-gradient-to-br from-blue-100/30 to-indigo-100/20 blur-3xl opacity-60
                          w-32 h-32 top-20 -right-20
                          sm:w-40 sm:h-40 sm:-right-32
                          md:w-64 md:h-64 md:-right-40
                          lg:w-80 lg:h-80
                          xl:w-96 xl:h-96
                          2xl:w-[32rem] 2xl:h-[32rem] 2xl:-right-48
                          3xl:w-[40rem] 3xl:h-[40rem] 3xl:-right-56
                          4xl:w-[48rem] 4xl:h-[48rem] 4xl:-right-64"></div>
          <div className="absolute rounded-full bg-gradient-to-tr from-indigo-100/25 to-blue-100/30 blur-3xl opacity-50
                          w-40 h-40 bottom-40 -left-20
                          sm:w-48 sm:h-48 sm:-left-32
                          md:w-72 md:h-72 md:-left-40
                          lg:w-96 lg:h-96
                          xl:w-[28rem] xl:h-[28rem]
                          2xl:w-[36rem] 2xl:h-[36rem] 2xl:-left-48
                          3xl:w-[44rem] 3xl:h-[44rem] 3xl:-left-56
                          4xl:w-[52rem] 4xl:h-[52rem] 4xl:-left-64"></div>
          
          {/* Floating Data Points - Same pattern, enhanced sizing */}
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-blue-400/30
                         w-0.5 h-0.5
                         sm:w-1 sm:h-1
                         lg:w-1.5 lg:h-1.5
                         2xl:w-2 2xl:h-2
                         4xl:w-3 4xl:h-3"
              style={{
                left: `${20 + (i * 8)}%`,
                top: `${15 + (i * 7)}%`,
                animation: `float ${3 + (i * 0.2)}s ease-in-out infinite alternate`,
                animationDelay: `${i * 0.3}s`
              }}
            ></div>
          ))}
        </div>

        <Container className="relative z-10 w-full px-3 mx-auto sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 3xl:px-20 4xl:px-24 max-w-none">
          <div className="max-w-7xl mx-auto
                          2xl:max-w-[1600px]
                          3xl:max-w-[1800px]
                          4xl:max-w-[2000px]">
            <div className="grid items-center grid-cols-1 gap-8 sm:gap-10 md:gap-12 xl:gap-16 2xl:gap-20 3xl:gap-24 4xl:gap-28 md:grid-cols-12">
              {/* Main Content - Loads in left column immediately on md+ screens */}
              <div className="order-1 text-center md:text-left md:col-span-7">
                {/* Main Headline - Conservative mobile sizing */}
                <h1 className={`font-bold transition-all duration-1000 delay-200 
                                mb-4 sm:mb-5 md:mb-6 
                                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                  <span className="block mb-1 text-lg font-bold tracking-tight text-gray-900 sm:text-2xl sm:mb-2 md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl 3xl:text-7xl 4xl:text-8xl">
                    Transform Your Business
                  </span>
                  <span className="block mb-1 text-lg font-bold tracking-tight text-gray-900 sm:text-2xl sm:mb-2 md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl 3xl:text-7xl 4xl:text-8xl">
                    with Enterprise
                  </span>
                  <span className="block text-lg font-bold tracking-tight text-transparent bg-blue-900 bg-clip-text sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl 3xl:text-7xl 4xl:text-8xl">
                    AI Solutions
                  </span>
                </h1>
                
                {/* Subtitle - More conservative mobile sizing */}
                <p className={`text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed transition-all duration-1000 delay-300 
                              mb-5 sm:mb-6 md:mb-8
                              text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl 
                              2xl:text-2xl 2xl:max-w-3xl
                              3xl:text-3xl 3xl:max-w-4xl 4xl:text-4xl 4xl:max-w-5xl
                              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                  Deploy intelligent automation, predictive analytics, and AI-driven insights that deliver measurable ROI. 
                  Purpose-built for enterprise scale, security, and compliance.
                </p>

                {/* Key Benefits - Improved mobile layout */}
                <div className={`grid gap-3 mb-6 sm:mb-7 md:mb-8 transition-all duration-1000 delay-400 
                                grid-cols-1 sm:grid-cols-2 
                                2xl:gap-6 3xl:gap-8 4xl:gap-10
                                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                  {[
                    'Deploy in 30 days or less',
                    '99.9% uptime SLA guarantee',
                    'SOC2 & ISO certified security',
                    '24/7 dedicated support'
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-center gap-2 sm:gap-3 2xl:gap-4 3xl:gap-5 4xl:gap-6">
                      <CheckCircle className="flex-shrink-0 w-4 h-4 text-blue-900 sm:w-4 sm:h-4 md:w-5 md:h-5 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7 3xl:w-8 3xl:h-8 4xl:w-10 4xl:h-10" />
                      <span className="text-sm font-medium text-gray-700 sm:text-sm md:text-base xl:text-lg 2xl:text-xl 3xl:text-2xl 4xl:text-3xl">{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* Stats - Better mobile grid - Moved before buttons */}
                <div className={`grid gap-4 sm:gap-5 md:gap-6 mb-6 sm:mb-7 md:mb-8 transition-all duration-1000 delay-500 
                                grid-cols-2 lg:grid-cols-4 
                                2xl:gap-8 3xl:gap-10 4xl:gap-12
                                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center lg:text-left">
                      <div className="mb-1 text-xl font-bold text-gray-900 sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl 3xl:text-6xl 4xl:text-7xl">{stat.value}</div>
                      <div className="text-xs text-gray-600 sm:text-sm md:text-sm lg:text-base xl:text-lg 2xl:text-xl 3xl:text-2xl 4xl:text-3xl">{stat.label}</div>
                    </div>
                  ))}
                </div>
                
                {/* CTA Buttons - Moved to the end */}
                <div className={`flex gap-3 transition-all duration-1000 delay-600 
                                flex-col sm:flex-row 
                                2xl:gap-6 3xl:gap-8 4xl:gap-10
                                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                 <button
                    onClick={openChatbot}
                    className="relative flex items-center justify-center gap-2 px-8 py-4 overflow-hidden text-lg font-semibold text-white transition-all duration-300 bg-blue-900 rounded-lg group hover:shadow-xl hover:shadow-blue-500/25 hover:scale-105"
                  >
                    <div className="absolute inset-0 transition-opacity duration-300 bg-blue-900 opacity-0 group-hover:opacity-100"></div>
                    <span className="relative z-10">Chat with AI</span>
                    <ArrowRight className="relative z-10 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </button>

                  <a 
                    href="/#pricing" 
                    className="flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-gray-700 transition-all duration-300 border-2 border-gray-300 rounded-lg group hover:bg-gray-50 hover:border-gray-400 hover:scale-105"
                  >
                    <Play className="w-5 h-5" />
                    <span>Book a Consultation</span>
                  </a>
                </div>
              </div>
              
              {/* Interactive Visualization - Loads in right column immediately on md+ screens */}
              <div className="relative order-2 px-1 mt-8 md:col-span-5 md:mt-0 sm:px-2 md:px-0">
                <div className="relative max-w-sm mx-auto sm:max-w-md md:max-w-lg lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl 3xl:max-w-3xl 4xl:max-w-4xl">
                  {/* Central AI Hub - Conservative mobile sizing */}
                  <div className="relative mx-auto 
                                  w-72 h-72 sm:w-80 sm:h-80 
                                  md:w-80 md:h-80 lg:w-80 lg:h-80 xl:w-96 xl:h-96
                                  2xl:w-[28rem] 2xl:h-[28rem]
                                  3xl:w-[32rem] 3xl:h-[32rem]
                                  4xl:w-[40rem] 4xl:h-[40rem]">
                    <div className="absolute inset-0 overflow-hidden border shadow-2xl rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white to-blue-50 border-gray-200/50 backdrop-blur-xl
                                    4xl:rounded-[3rem]">
                      {/* Content - Ultra responsive */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 2xl:p-12 3xl:p-16 4xl:p-20">
                        <div className="flex items-center justify-center w-12 h-12 mb-3 shadow-lg rounded-xl bg-gradient-to-br from-blue-700 to-indigo-900 sm:w-16 sm:h-16 sm:rounded-2xl sm:mb-4 lg:w-20 lg:h-20 lg:mb-6 2xl:w-24 2xl:h-24 2xl:mb-8 3xl:w-32 3xl:h-32 3xl:mb-10 4xl:w-40 4xl:h-40 4xl:mb-12">
                          <Brain className="w-6 h-6 text-white sm:w-8 sm:h-8 lg:w-10 lg:h-10 2xl:w-12 2xl:h-12 3xl:w-16 3xl:h-16 4xl:w-20 4xl:h-20" />
                        </div>
                        
                        <h3 className="mb-1 text-base font-bold text-center text-gray-900 sm:text-lg sm:mb-2 lg:text-xl 2xl:text-2xl 2xl:mb-3 3xl:text-3xl 3xl:mb-4 4xl:text-4xl 4xl:mb-6">
                          AI Intelligence Hub
                        </h3>
                        <p className="px-2 mb-3 text-xs text-center text-gray-600 sm:text-sm sm:mb-4 lg:mb-6 2xl:text-base 2xl:mb-8 3xl:text-lg 3xl:mb-10 4xl:text-xl 4xl:mb-12">
                          Unified platform for all your AI operations
                        </p>

                        {/* Feature Indicators - Ultra responsive */}
                        <div className="flex gap-1 sm:gap-2 2xl:gap-3 3xl:gap-4 4xl:gap-5">
                          {features.map((_, index) => (
                            <div
                              key={index}
                              className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-500
                                          2xl:w-3 2xl:h-3
                                          3xl:w-4 3xl:h-4
                                          4xl:w-5 4xl:h-5 ${
                                activeFeature === index ? 'bg-blue-900' : 'bg-gray-300'
                              }`}
                            ></div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Animated Border - Same pattern */}
                      <div className="absolute inset-0 border border-blue-200 opacity-50 rounded-2xl sm:rounded-3xl 4xl:rounded-[3rem]">
                        <div 
                          className="absolute inset-0 border-2 border-blue-400 rounded-2xl sm:rounded-3xl 4xl:rounded-[3rem]"
                          style={{
                            animation: 'pulse 2s ease-in-out infinite',
                            clipPath: `circle(${activeFeature * 25 + 25}% at 50% 50%)`
                          }}
                        ></div>
                      </div>
                    </div>

                    {/* Orbiting Features - Enhanced responsive positioning */}
                    {features.map((feature, index) => {
                      const angle = (index * 90) * (Math.PI / 180);
                      const radius = getResponsiveRadius();
                      const x = Math.cos(angle) * radius;
                      const y = Math.sin(angle) * radius;
                      const IconComponent = feature.icon;
                      
                      return (
                        <div
                          key={index}
                          className={`absolute rounded-lg bg-white border-2 flex items-center justify-center transition-all duration-500 shadow-lg 
                                      w-10 h-10 sm:w-12 sm:h-12 sm:rounded-xl 
                                      lg:w-16 lg:h-16 lg:rounded-2xl
                                      2xl:w-20 2xl:h-20
                                      3xl:w-24 3xl:h-24 3xl:rounded-3xl
                                      4xl:w-32 4xl:h-32 ${
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
                            className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-7 lg:h-7 
                                        2xl:w-9 2xl:h-9
                                        3xl:w-11 3xl:h-11
                                        4xl:w-14 4xl:h-14 ${
                              activeFeature === index ? 'text-blue-600' : 'text-gray-600'
                            }`}
                          />
                          
                          {/* Tooltip - Enhanced for large screens */}
                          <div className={`absolute left-1/2 transform -translate-x-1/2 transition-opacity duration-300 hidden sm:block 
                                          -bottom-12 sm:-bottom-16 
                                          2xl:-bottom-20
                                          3xl:-bottom-24
                                          4xl:-bottom-32 ${
                            activeFeature === index ? 'opacity-100' : 'opacity-0'
                          }`}>
                            <div className="px-2 py-1 text-center bg-white border rounded-lg shadow-lg whitespace-nowrap sm:px-3 sm:py-2 2xl:px-4 2xl:py-3 2xl:rounded-xl 3xl:px-6 3xl:py-4 3xl:rounded-2xl 4xl:px-8 4xl:py-6">
                              <div className="text-xs font-semibold text-gray-900 sm:text-sm 2xl:text-base 3xl:text-lg 4xl:text-xl">{feature.title}</div>
                              <div className="hidden text-xs text-gray-600 lg:block 2xl:text-sm 3xl:text-base 4xl:text-lg">{feature.description}</div>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    {/* Connection Lines - Same pattern with responsive width */}
                    {features.map((_, index) => (
                      <div
                        key={`line-${index}`}
                        className="absolute h-px origin-left top-1/2 left-1/2 bg-gradient-to-r from-gray-300 to-transparent"
                        style={{
                          width: `${getResponsiveLineWidth()}px`,
                          transform: `translate(-50%, -50%) rotate(${index * 90}deg)`,
                          opacity: activeFeature === index ? 0.8 : 0.3,
                          transition: 'opacity 0.5s ease'
                        }}
                      ></div>
                    ))}

                    {/* Ambient Glow - Enhanced for large screens */}
                    <div className="absolute inset-0 scale-150 rounded-2xl sm:rounded-3xl 4xl:rounded-[3rem] bg-gradient-to-br from-blue-500/5 to-indigo-500/10 blur-xl -z-10"></div>
                  </div>

                  {/* Mobile Feature Labels - Enhanced typography */}
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

        {/* Custom Animations - Same as original */}
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

          /* Ultra-wide screen utilities */
          @media (min-width: 1920px) {
            .3xl\\:text-8xl { font-size: 6rem; line-height: 1; }
            .3xl\\:text-3xl { font-size: 1.875rem; line-height: 2.25rem; }
            .3xl\\:text-2xl { font-size: 1.5rem; line-height: 2rem; }
            .3xl\\:text-6xl { font-size: 3.75rem; line-height: 1; }
            .3xl\\:max-w-4xl { max-width: 56rem; }
            .3xl\\:gap-8 { gap: 2rem; }
            .3xl\\:gap-10 { gap: 2.5rem; }
            .3xl\\:gap-28 { gap: 7rem; }
            .3xl\\:px-20 { padding-left: 5rem; padding-right: 5rem; }
            .3xl\\:py-10 { padding-top: 2.5rem; padding-bottom: 2.5rem; }
            .3xl\\:pt-36 { padding-top: 9rem; }
            .3xl\\:w-8 { width: 2rem; }
            .3xl\\:h-8 { height: 2rem; }
            .3xl\\:w-32 { width: 8rem; }
            .3xl\\:h-32 { height: 8rem; }
            .3xl\\:mb-10 { margin-bottom: 2.5rem; }
            .3xl\\:mb-16 { margin-bottom: 4rem; }
            .3xl\\:w-24 { width: 6rem; }
            .3xl\\:h-24 { height: 6rem; }
            .3xl\\:w-4 { width: 1rem; }
            .3xl\\:h-4 { height: 1rem; }
            .3xl\\:max-w-3xl { max-width: 48rem; }
            .3xl\\:rounded-3xl { border-radius: 1.5rem; }
            .3xl\\:w-11 { width: 2.75rem; }
            .3xl\\:h-11 { height: 2.75rem; }
            .3xl\\:w-16 { width: 4rem; }
            .3xl\\:h-16 { height: 4rem; }
            .3xl\\:text-lg { font-size: 1.125rem; line-height: 1.75rem; }
            .3xl\\:text-base { font-size: 1rem; line-height: 1.5rem; }
            .3xl\\:px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
            .3xl\\:py-4 { padding-top: 1rem; padding-bottom: 1rem; }
            .3xl\\:rounded-2xl { border-radius: 1rem; }
            .3xl\\:mb-4 { margin-bottom: 1rem; }
            .3xl\\:gap-4 { gap: 1rem; }
            .3xl\\:gap-5 { gap: 1.25rem; }
            .3xl\\:p-16 { padding: 4rem; }
            .3xl\\:mb-12 { margin-bottom: 3rem; }
            .3xl\\:-left-56 { left: -14rem; }
            .3xl\\:-right-56 { right: -14rem; }
          }

          @media (min-width: 2560px) {
            .4xl\\:text-9xl { font-size: 8rem; line-height: 1; }
            .4xl\\:text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
            .4xl\\:text-3xl { font-size: 1.875rem; line-height: 2.25rem; }
            .4xl\\:text-7xl { font-size: 4.5rem; line-height: 1; }
            .4xl\\:max-w-5xl { max-width: 64rem; }
            .4xl\\:gap-10 { gap: 2.5rem; }
            .4xl\\:gap-12 { gap: 3rem; }
            .4xl\\:gap-32 { gap: 8rem; }
            .4xl\\:px-24 { padding-left: 6rem; padding-right: 6rem; }
            .4xl\\:py-12 { padding-top: 3rem; padding-bottom: 3rem; }
            .4xl\\:pt-40 { padding-top: 10rem; }
            .4xl\\:w-10 { width: 2.5rem; }
            .4xl\\:h-10 { height: 2.5rem; }
            .4xl\\:w-40 { width: 10rem; }
            .4xl\\:h-40 { height: 10rem; }
            .4xl\\:mb-12 { margin-bottom: 3rem; }
            .4xl\\:mb-20 { margin-bottom: 5rem; }
            .4xl\\:w-32 { width: 8rem; }
            .4xl\\:h-32 { height: 8rem; }
            .4xl\\:w-5 { width: 1.25rem; }
            .4xl\\:h-5 { height: 1.25rem; }
            .4xl\\:w-3 { width: 0.75rem; }
            .4xl\\:h-3 { height: 0.75rem; }
            .4xl\\:rounded-3xl { border-radius: 1.5rem; }
            .4xl\\:w-14 { width: 3.5rem; }
            .4xl\\:h-14 { height: 3.5rem; }
            .4xl\\:w-20 { width: 5rem; }
            .4xl\\:h-20 { height: 5rem; }
            .4xl\\:text-xl { font-size: 1.25rem; line-height: 1.75rem; }
            .4xl\\:text-lg { font-size: 1.125rem; line-height: 1.75rem; }
            .4xl\\:px-8 { padding-left: 2rem; padding-right: 2rem; }
            .4xl\\:py-6 { padding-top: 1.5rem; padding-bottom: 1.5rem; }
            .4xl\\:gap-6 { gap: 1.5rem; }
            .4xl\\:p-20 { padding: 5rem; }
            .4xl\\:-left-64 { left: -16rem; }
            .4xl\\:-right-64 { right: -16rem; }
            .4xl\\:-bottom-32 { bottom: -8rem; }
            .4xl\\:max-w-4xl { max-width: 56rem; }
          }
        `}</style>
      </section>

      {/* ChatbotModal Component */}
      <ChatbotModal isOpen={isChatbotOpen} onClose={closeChatbot} />
    </>
  );
};

export default Hero;