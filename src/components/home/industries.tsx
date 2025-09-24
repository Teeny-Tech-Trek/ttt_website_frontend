import React, { useState, useEffect } from 'react';
import { Home, Stethoscope, MessageCircle, Truck, Hotel, BookOpen, Zap } from 'lucide-react';

const Industries = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const caseStudyOptions = [
    {
      id: 'realestate',
      route: '/real-estate',
      icon: Home,
      title: 'Real Estate',
      description: 'Agentic AI for Listing Prep',
      highlight: '50-60% faster prep time'
    },
    {
      id: 'healthcare',
      route: '/healthcare',
      icon: Stethoscope,
      title: 'Healthcare',
      description: 'Pre-Op Intake & Scheduling',
      highlight: '28% fewer no-shows'
    },
    {
      id: 'ecommerce',
      route: '/ecommerce',
      icon: MessageCircle,
      title: 'D2C E-commerce',
      description: 'AI Support & WhatsApp Assistant',
      highlight: '68% faster response times'
    },
    {
      id: 'logistics',
      route: '/logistics',
      icon: Truck,
      title: 'Manufacturing & Logistics',
      description: 'Driver WhatsApp Bot + ETA Flow',
      highlight: '17% lower dwell time'
    },
    {
      id: 'hospitality',
      route: '/hospitality',
      icon: Hotel,
      title: 'Hospitality',
      description: 'AI Concierge & Itinerary Builder',
      highlight: '19% more direct bookings'
    },
    {
      id: 'education',
      route: '/education',
      icon: BookOpen,
      title: 'Education',
      description: 'Institutional Collaboration & Workshops',
      highlight: 'Better learning outcomes'
    },
    {
      id: 'financial',
      route: '/financial-services',
      icon: Zap,
      title: 'Financial Services',
      description: 'Back-Office Smart Automations',
      highlight: '20-25 hours/week saved'
    },
  ];

  // Auto-slide for mobile every 1 second
  useEffect(() => {
    if (isMobile) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % caseStudyOptions.length);
      }, 1000); // 1 second interval

      return () => clearInterval(interval);
    }
  }, [isMobile, caseStudyOptions.length]);

  const handleCardClick = (route) => {
    console.log('Navigate to:', route);
  };

  const getIconColor = (id) => {
    const colors = {
      realestate: 'text-blue-600',
      healthcare: 'text-green-600',
      ecommerce: 'text-purple-600',
      logistics: 'text-orange-600',
      hospitality: 'text-indigo-600',
      education: 'text-teal-600',
      financial: 'text-yellow-600',
    };
    return colors[id] || 'text-gray-600';
  };

  const getHighlightColor = (id) => {
    const colors = {
      realestate: 'bg-blue-100 text-blue-700',
      healthcare: 'bg-green-100 text-green-700',
      ecommerce: 'bg-purple-100 text-purple-700',
      logistics: 'bg-orange-100 text-orange-700',
      hospitality: 'bg-indigo-100 text-indigo-700',
      education: 'bg-teal-100 text-teal-700',
      financial: 'bg-yellow-100 text-yellow-700',
    };
    return colors[id] || 'bg-gray-100 text-gray-700';
  };

  const renderCard = (caseStudy, index, additionalClasses = '') => {
    const IconComponent = caseStudy.icon;
    
    return (
      <div 
        key={`${caseStudy.id}-${index}`}
        className={`flex-shrink-0 transition-all duration-500 transform cursor-pointer group hover:scale-105 ${additionalClasses}`}
        onClick={() => handleCardClick(caseStudy.route)}
      >
        <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200 w-full md:min-w-[320px] h-[180px] md:h-[200px] flex flex-col justify-between group-hover:border-gray-300 relative overflow-hidden">
          {/* Icon and Title */}
          <div className="flex items-start space-x-3 md:space-x-4">
            <div className={`${getIconColor(caseStudy.id)} transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
              <IconComponent size={24} className="md:w-8 md:h-8" strokeWidth={1.5} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-bold text-gray-800 truncate transition-colors md:text-lg group-hover:text-gray-900">
                {caseStudy.title}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-gray-600 md:text-sm line-clamp-2">
                {caseStudy.description}
              </p>
            </div>
          </div>
          
          {/* Highlight badge */}
          <div className="mt-3 md:mt-4">
            <span className={`inline-block px-2 md:px-3 py-1 md:py-2 rounded-full text-xs font-semibold ${getHighlightColor(caseStudy.id)} transition-all duration-300 group-hover:scale-105`}>
              {caseStudy.highlight}
            </span>
          </div>
          
          {/* Click indicator */}
          <div className="absolute transition-opacity duration-300 opacity-0 top-2 md:top-3 right-2 md:right-3 group-hover:opacity-100">
            <div className="flex items-center justify-center w-5 h-5 bg-blue-500 rounded-full md:w-6 md:h-6">
              <svg className="w-2 h-2 text-white md:w-3 md:h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
          
          {/* Subtle hover indicator */}
          <div className="absolute inset-0 transition-all duration-500 pointer-events-none rounded-2xl bg-gradient-to-r from-blue-400/0 to-purple-400/0 group-hover:from-blue-400/5 group-hover:to-purple-400/5"></div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full py-8 md:py-12 bg-gray-50">
      {/* Header Section */}
      <div className="px-4 mb-8 text-center md:mb-12">
        <h2 className="mb-3 text-2xl font-bold text-blue-900 md:mb-4 md:text-4xl">Industries</h2>
        <p className="max-w-2xl mx-auto text-sm text-gray-600 md:text-lg">
          Discover how our AI solutions transform businesses across various industries
        </p>
      </div>

      {/* Mobile Version - Single Card Slideshow */}
      {isMobile ? (
        <div className="px-4">
          <div className="relative">
            {/* Single card display */}
            <div className="transition-all duration-500 ease-in-out">
              {renderCard(caseStudyOptions[currentIndex], currentIndex)}
            </div>
            
            {/* Dots indicator */}
            <div className="flex justify-center mt-6 space-x-2">
              {caseStudyOptions.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-blue-600 w-6' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Desktop/Laptop Version - Continuous Scrolling */
        <div className="relative overflow-hidden">
          {/* Gradient overlays for smooth fade effect */}
          <div className="absolute top-0 left-0 z-10 w-32 h-full pointer-events-none bg-gradient-to-r from-gray-50 to-transparent"></div>
          <div className="absolute top-0 right-0 z-10 w-32 h-full pointer-events-none bg-gradient-to-l from-gray-50 to-transparent"></div>
          
          {/* Scrolling container */}
          <div className="flex space-x-8 animate-scroll-dynamic hover:pause-animation">
            {/* Create multiple sets for seamless scrolling */}
            {[...Array(3)].map((_, setIndex) => (
              <div key={setIndex} className="flex space-x-8 animate-float">
                {caseStudyOptions.map((caseStudy, index) => {
                  const delay = (setIndex * caseStudyOptions.length + index) * 0.1;
                  
                  return (
                    <div 
                      key={`${setIndex}-${caseStudy.id}`}
                      style={{ animationDelay: `${delay}s` }}
                    >
                      {renderCard(caseStudy, index)}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Custom styles for desktop animations */}
      <style jsx>{`
        @keyframes scroll-dynamic {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.1);
          }
          50% {
            box-shadow: 0 0 25px rgba(59, 130, 246, 0.2);
          }
        }

        .animate-scroll-dynamic {
          animation: scroll-dynamic 10s linear infinite;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .pause-animation:hover .animate-scroll-dynamic {
          animation-play-state: paused;
        }

        .pause-animation:hover .animate-float {
          animation-play-state: paused;
        }

        .group:hover {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .animate-scroll-dynamic {
          will-change: transform;
        }
        
        .group:hover .animate-float {
          transform: translateY(-8px) !important;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Industries;