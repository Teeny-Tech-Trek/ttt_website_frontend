import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Play, CheckCircle, TrendingUp, Shield, Zap, Brain, Globe, Users, Award } from 'lucide-react';
import Container from '../ui/Container';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [activeFeature, setActiveFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % 4);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

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

  const trustedBy = [
    'Microsoft', 'Google', 'Amazon', 'IBM', 'Oracle', 'Salesforce'
  ];

  return (
    <section 
      ref={heroRef}
      id="home" 
      className="min-h-screen flex items-center relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/30 pt-20"
    >
      {/* Subtle Background Elements */}
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
        
        {/* Gradient Orbs */}
        <div className="absolute top-20 -right-40 w-80 h-80 rounded-full bg-gradient-to-br from-blue-100/30 to-indigo-100/20 blur-3xl opacity-60"></div>
        <div className="absolute bottom-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-tr from-indigo-100/25 to-blue-100/30 blur-3xl opacity-50"></div>
        
        {/* Floating Data Points */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
            style={{
              left: `${20 + (i * 8)}%`,
              top: `${15 + (i * 7)}%`,
              animation: `float ${3 + (i * 0.2)}s ease-in-out infinite alternate`,
              animationDelay: `${i * 0.3}s`
            }}
          ></div>
        ))}
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Content */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Badge */}
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-sm font-medium mb-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <Award className="w-4 h-4" />
            </div>

            {/* Main Headline */}
            <h1 className={`font-bold mb-6 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <span className="block text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-2">
                Transform Your Business
              </span>
              <span className="block text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-4">
                with Enterprise
              </span>
              <span className="block text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                AI Solutions
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className={`text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              Deploy intelligent automation, predictive analytics, and AI-driven insights that deliver measurable ROI. 
              Purpose-built for enterprise scale, security, and compliance.
            </p>

            {/* Key Benefits */}
            <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {[
                'Deploy in 30 days or less',
                '99.9% uptime SLA guarantee',
                'SOC2 & ISO certified security',
                '24/7 dedicated support'
              ].map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{benefit}</span>
                </div>
              ))}
            </div>
            
            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row gap-4 mb-8 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <a 
                href="#contact" 
                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold flex items-center justify-center gap-3 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/25 hover:scale-105 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10">Schedule Demo</span>
                <ArrowRight className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1" />
              </a>
              
              <a 
                href="/case" 
                className="group px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold flex items-center justify-center gap-3 transition-all duration-300 hover:bg-gray-50 hover:border-gray-400 hover:scale-105"
              >
                <Play className="w-5 h-5" />
                <span>View Case Studies</span>
              </a>
            </div>

            {/* Stats */}
            <div className={`grid grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {stats.map((stat, index) => (
                <div key={index} className="text-center lg:text-left">
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Interactive Visualization */}
          <div className="lg:col-span-5 relative">
            <div className="relative max-w-lg mx-auto">
              {/* Central AI Hub */}
              <div className="relative w-80 h-80 mx-auto">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white to-blue-50 border border-gray-200/50 backdrop-blur-xl shadow-2xl overflow-hidden">
                  {/* Content */}
                  <div className="absolute inset-0 p-8 flex flex-col items-center justify-center">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-6 shadow-lg">
                      <Brain className="w-10 h-10 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
                      AI Intelligence Hub
                    </h3>
                    <p className="text-gray-600 text-center text-sm mb-6">
                      Unified platform for all your AI operations
                    </p>

                    {/* Feature Indicators */}
                    <div className="flex gap-2">
                      {features.map((_, index) => (
                        <div
                          key={index}
                          className={`w-2 h-2 rounded-full transition-all duration-500 ${
                            activeFeature === index ? 'bg-blue-500' : 'bg-gray-300'
                          }`}
                        ></div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Animated Border */}
                  <div className="absolute inset-0 rounded-3xl border border-blue-200 opacity-50">
                    <div 
                      className="absolute inset-0 rounded-3xl border-2 border-blue-400"
                      style={{
                        animation: 'pulse 2s ease-in-out infinite',
                        clipPath: `circle(${activeFeature * 25 + 25}% at 50% 50%)`
                      }}
                    ></div>
                  </div>
                </div>

                {/* Orbiting Features */}
                {features.map((feature, index) => {
                  const angle = (index * 90) * (Math.PI / 180);
                  const radius = 180;
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;
                  const IconComponent = feature.icon;
                  
                  return (
                    <div
                      key={index}
                      className={`absolute w-16 h-16 rounded-2xl bg-white border-2 flex items-center justify-center transition-all duration-500 shadow-lg ${
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
                        className={`w-7 h-7 ${
                          activeFeature === index ? 'text-blue-600' : 'text-gray-600'
                        }`}
                      />
                      
                      {/* Tooltip */}
                      <div className={`absolute -bottom-16 left-1/2 transform -translate-x-1/2 transition-opacity duration-300 ${
                        activeFeature === index ? 'opacity-100' : 'opacity-0'
                      }`}>
                        <div className="bg-white px-3 py-2 rounded-lg shadow-lg border text-center whitespace-nowrap">
                          <div className="text-sm font-semibold text-gray-900">{feature.title}</div>
                          <div className="text-xs text-gray-600">{feature.description}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Connection Lines */}
                {features.map((_, index) => (
                  <div
                    key={`line-${index}`}
                    className="absolute top-1/2 left-1/2 origin-left h-px bg-gradient-to-r from-gray-300 to-transparent"
                    style={{
                      width: '140px',
                      transform: `translate(-50%, -50%) rotate(${index * 90}deg)`,
                      opacity: activeFeature === index ? 0.8 : 0.3,
                      transition: 'opacity 0.5s ease'
                    }}
                  ></div>
                ))}

                {/* Ambient Glow */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/5 to-indigo-500/10 blur-xl scale-150 -z-10"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Trusted By Section */}
        {/* <div className={`mt-20 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-8">
            <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">Trusted by industry leaders</p>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center opacity-60">
            {trustedBy.map((company, index) => (
              <div key={index} className="text-center">
                <div className="text-xl font-bold text-gray-400 hover:text-gray-600 transition-colors duration-300 cursor-pointer">
                  {company}
                </div>
              </div>
            ))}
          </div>
        </div> */}
      </Container>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gradient-to-b from-gray-400 to-gray-600 rounded-full mt-2"></div>
        </div>
      </div>

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
  );
};

export default Hero;