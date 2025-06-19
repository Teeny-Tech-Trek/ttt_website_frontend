import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Zap, Cpu, Sparkles, Target, Brain, Code, Layers, Globe } from 'lucide-react';
import Container from '../ui/Container';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [activeOrb, setActiveOrb] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile device
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      };
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      mouseRef.current = {
        x: (touch.clientX / window.innerWidth) * 2 - 1,
        y: (touch.clientY / window.innerHeight) * 2 - 1,
      };
    };

    const animateElements = () => {
      const orbs = document.querySelectorAll('.floating-orb');
      const shapes = document.querySelectorAll('.bg-shape');
      const neurons = document.querySelectorAll('.neuron-line');
      
      orbs.forEach((orb, index) => {
        const element = orb as HTMLElement;
        const intensity = (index + 1) * (isMobile ? 0.5 : 0.8);
        const offsetX = mouseRef.current.x * intensity * (isMobile ? 4 : 8);
        const offsetY = mouseRef.current.y * intensity * (isMobile ? 4 : 8);
        
        element.style.transform = `translate3d(${offsetX}px, ${offsetY}px, ${index * 15}px) rotateX(${mouseRef.current.y * 3}deg) rotateY(${mouseRef.current.x * 3}deg)`;
      });

      shapes.forEach((shape, index) => {
        const element = shape as HTMLElement;
        const intensity = (index + 1) * 0.4;
        const offsetX = mouseRef.current.x * intensity * (isMobile ? 6 : 12);
        const offsetY = mouseRef.current.y * intensity * (isMobile ? 6 : 12);
        
        element.style.transform = `translate3d(${offsetX}px, ${offsetY}px, ${index * 25}px) rotateZ(${mouseRef.current.x * 8}deg)`;
      });

      neurons.forEach((neuron, index) => {
        const element = neuron as HTMLElement;
        const intensity = 0.5;
        const offsetX = mouseRef.current.x * intensity * (isMobile ? 3 : 5);
        const offsetY = mouseRef.current.y * intensity * (isMobile ? 3 : 5);
        
        element.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`;
      });

      requestAnimationFrame(animateElements);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    animateElements();

    // Auto-cycle active orb
    const interval = setInterval(() => {
      setActiveOrb(prev => (prev + 1) % 6);
    }, 2000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', checkIfMobile);
      clearInterval(interval);
    };
  }, [isMobile]);

  const orbData = [
    { icon: Brain, color: 'from-blue-500 to-blue-600', label: 'AI Intelligence' },
    { icon: Code, color: 'from-indigo-500 to-indigo-600', label: 'Smart Code' },
    { icon: Layers, color: 'from-blue-400 to-blue-500', label: 'Deep Learning' },
    { icon: Globe, color: 'from-indigo-400 to-indigo-500', label: 'Global Scale' },
    { icon: Zap, color: 'from-blue-600 to-blue-700', label: 'Lightning Fast' },
    { icon: Target, color: 'from-indigo-600 to-indigo-700', label: 'Precision' }
  ];

  return (
    <section 
      ref={heroRef}
      id="home" 
      className="min-h-screen flex items-center relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 pt-20"
      style={{
        perspective: '1500px',
        transformStyle: 'preserve-3d'
      }}
    >
      {/* Enhanced 3D Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Dynamic gradient shapes */}
        <div className="bg-shape absolute top-1/4 left-1/6 w-96 h-96 rounded-full bg-gradient-to-br from-blue-200/40 to-blue-300/30 blur-3xl opacity-70 animate-pulse"></div>
        <div className="bg-shape absolute bottom-1/3 right-1/5 w-[500px] h-[500px] rounded-full bg-gradient-to-tl from-indigo-200/35 to-blue-200/40 blur-3xl opacity-60"></div>
        <div className="bg-shape absolute top-1/2 left-1/2 w-80 h-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-blue-100/30 to-indigo-100/35 blur-3xl opacity-50"></div>
        
        {/* Neural network lines */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="neuron-line absolute opacity-20"
            style={{
              left: `${20 + (i * 10)}%`,
              top: `${15 + (i * 8)}%`,
              width: `${100 + (i * 20)}px`,
              height: '2px',
              background: `linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.6), transparent)`,
              transform: `rotate(${i * 15}deg)`,
              animation: `pulse ${2 + (i * 0.3)}s infinite alternate`
            }}
          ></div>
        ))}

        {/* Floating data particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/40 rounded-full animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          ></div>
        ))}
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Enhanced Text Content */}
          <div className="text-center lg:text-left space-y-6 lg:space-y-8 transform-gpu px-4 lg:px-0">
            <div className="relative">
              <h1 className="font-bold mb-8 lg:mb-10 relative z-10">
                <span 
                  className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4 lg:mb-6 text-gray-900 transform-gpu transition-all duration-1000 hover:scale-105"
                  style={{
                    textShadow: '0 4px 20px rgba(59, 130, 246, 0.1)',
                    transform: 'translateZ(20px)'
                  }}
                >
                  Small Teams.
                </span>
                <span 
                  className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4 lg:mb-6 text-gray-800 transform-gpu transition-all duration-1000 hover:scale-105"
                  style={{
                    textShadow: '0 6px 25px rgba(59, 130, 246, 0.15)',
                    transform: 'translateZ(15px)'
                  }}
                >
                  Big Impact.
                </span>
                <span 
                  className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 transform-gpu transition-all duration-1000 hover:scale-105"
                  style={{
                    filter: 'drop-shadow(0 8px 30px rgba(59, 130, 246, 0.3))',
                    transform: 'translateZ(25px)'
                  }}
                >
                  Powered by AI.
                </span>
              </h1>
            </div>
            
            <p 
              className="text-lg sm:text-xl text-gray-600 mb-8 lg:mb-12 max-w-lg mx-auto lg:mx-0 leading-relaxed transform-gpu"
              style={{
                transform: 'translateZ(10px)',
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.05)'
              }}
            >
              We build nimble, intelligent AI solutions designed for clarity, speed, and real-world results.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start transform-gpu">
              <a 
                href="#services" 
                className="group px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white rounded-2xl font-medium flex items-center justify-center gap-3 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/25 transform-gpu hover:scale-105 hover:-translate-y-1 relative overflow-hidden"
                style={{
                  transform: 'translateZ(15px)',
                  boxShadow: '0 10px 40px rgba(59, 130, 246, 0.2)'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10">Explore Our Services</span>
                <ArrowRight size={20} className="relative z-10 transition-transform group-hover:translate-x-2" strokeWidth={1.5} />
              </a>
              <a 
                href="#contact" 
                className="group px-6 sm:px-8 py-3 sm:py-4 border-2 border-blue-500 text-blue-600 rounded-2xl font-medium transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:shadow-lg transform-gpu hover:scale-105 hover:-translate-y-1 relative overflow-hidden backdrop-blur-sm"
                style={{
                  transform: 'translateZ(12px)',
                  boxShadow: '0 5px 20px rgba(59, 130, 246, 0.1)'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10">Get in Touch</span>
              </a>
            </div>
          </div>
          
          {/* Creative Interactive Visualization */}
          <div 
            className="relative transform-gpu w-full lg:w-auto px-4"
            style={{ 
              perspective: '1200px',
              height: isMobile ? 'clamp(300px, 80vw, 400px)' : 'auto'
            }}
          >
            {/* Central AI Brain Visualization */}
            <div 
              className="relative z-20 w-[clamp(200px,70vw,320px)] h-[clamp(200px,70vw,320px)] mx-auto"
              style={{ 
                transform: 'translateZ(50px)',
                marginTop: isMobile ? '1rem' : '0'
              }}
            >
              {/* Main central orb */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 via-blue-600/30 to-indigo-600/20 backdrop-blur-xl border border-white/20 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-indigo-500/10 animate-pulse"></div>
                <div className="relative z-10">
                  <Cpu className="h-16 sm:h-20 lg:h-24 w-16 sm:w-20 lg:w-24 text-blue-600 animate-pulse drop-shadow-2xl" strokeWidth={1} />
                  <div className="absolute inset-0 animate-ping opacity-30">
                    <Cpu className="h-16 sm:h-20 lg:h-24 w-16 sm:w-20 lg:w-24 text-blue-400" strokeWidth={0.5} />
                  </div>
                </div>
                
                {/* Rotating rings */}
                <div className="absolute inset-4 border-2 border-blue-400/30 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
                <div className="absolute inset-8 border border-indigo-400/20 rounded-full animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
              </div>

              {/* Orbiting elements */}
              {orbData.map((orb, index) => {
                const angle = (index * 60) * (Math.PI / 180);
                const radius = isMobile ? 100 : 160;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                const IconComponent = orb.icon;
                
                return (
                  <div
                    key={index}
                    className={`floating-orb absolute ${isMobile ? 'w-12 h-12' : 'w-16 h-16'} rounded-full bg-gradient-to-br ${orb.color} flex items-center justify-center transition-all duration-500 cursor-pointer group ${
                      activeOrb === index ? 'scale-125 shadow-2xl' : 'scale-100 hover:scale-110'
                    }`}
                    style={{
                      left: '50%',
                      top: '50%',
                      transform: `translate(-50%, -50%) translate(${x}px, ${y}px) translateZ(${activeOrb === index ? 40 : 20}px)`,
                      boxShadow: activeOrb === index 
                        ? '0 20px 60px rgba(59, 130, 246, 0.4)' 
                        : '0 10px 30px rgba(59, 130, 246, 0.2)',
                      animation: `orbit 20s linear infinite`,
                      animationDelay: `${index * -3.33}s`
                    }}
                    onMouseEnter={() => setActiveOrb(index)}
                    onTouchStart={() => setActiveOrb(index)}
                  >
                    <IconComponent 
                      className={`${isMobile ? 'h-4 w-4' : 'h-6 w-6'} text-white drop-shadow-lg`}
                      strokeWidth={1.5} 
                    />
                    
                    {/* Tooltip */}
                    <div className={`absolute -bottom-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${isMobile ? 'hidden' : 'block'}`}>
                      <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-medium text-gray-800 whitespace-nowrap border border-white/50">
                        {orb.label}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Connection lines */}
              {orbData.map((_, index) => (
                <div
                  key={`line-${index}`}
                  className="absolute top-1/2 left-1/2 origin-left h-px bg-gradient-to-r from-blue-400/40 to-transparent"
                  style={{
                    width: `${isMobile ? 100 : 160}px`,
                    transform: `translate(-50%, -50%) rotate(${index * 60}deg)`,
                    opacity: activeOrb === index ? 0.8 : 0.3,
                    transition: 'opacity 0.5s ease'
                  }}
                ></div>
              ))}
            </div>

            {/* Data flow visualization */}
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={`flow-${i}`}
                  className="absolute w-2 h-2 bg-blue-400/60 rounded-full"
                  style={{
                    left: '50%',
                    top: '50%',
                    animation: `dataFlow 4s linear infinite`,
                    animationDelay: `${i * 0.7}s`,
                    transform: `translate(-50%, -50%) rotate(${i * 60}deg) translateX(${isMobile ? 40 : 80}px)`
                  }}
                ></div>
              ))}
            </div>

            {/* Ambient glow effect */}
            <div 
              className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/10 via-transparent to-indigo-500/10 blur-3xl scale-150"
              style={{ transform: 'translateZ(-20px)' }}
            ></div>
          </div>
        </div>
      </Container>

      {/* Enhanced scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-blue-400/50 rounded-full flex justify-center backdrop-blur-sm">
          <div className="w-1 h-3 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>

      {/* Custom CSS animations */}
      <style>{`
        @keyframes orbit {
          from {
            transform: translate(-50%, -50%) rotate(0deg) translateX(${isMobile ? 100 : 160}px) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg) translateX(${isMobile ? 100 : 160}px) rotate(-360deg);
          }
        }
        
        @keyframes dataFlow {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) rotate(var(--rotation, 0deg)) translateX(${isMobile ? 20 : 40}px) scale(0);
          }
          20% {
            opacity: 1;
            transform: translate(-50%, -50%) rotate(var(--rotation, 0deg)) translateX(${isMobile ? 30 : 60}px) scale(1);
          }
          80% {
            opacity: 1;
            transform: translate(-50%, -50%) rotate(var(--rotation, 0deg)) translateX(${isMobile ? 70 : 140}px) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) rotate(var(--rotation, 0deg)) translateX(${isMobile ? 80 : 160}px) scale(0);
          }
        }

        @media (max-width: 768px) {
          .bg-shape {
            opacity: 0.3 !important;
            filter: blur(2rem) !important;
          }
          .neuron-line {
            display: none;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;