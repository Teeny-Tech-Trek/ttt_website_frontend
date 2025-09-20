import React from 'react';
import { Home, Stethoscope, MessageCircle, Truck, Hotel, BookOpen, Zap } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { useNavigate } from 'react-router-dom';

const Industries = () => {
  const navigate = useNavigate();

  const handleCardClick = (route) => {
    navigate(route);
  };
  
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

  return (
    <div className="w-full py-8 bg-gray-50 sm:py-12 lg:py-16 xl:py-20 2xl:py-24">
      
      {/* Header Section - Responsive */}
      <div className="px-4 mb-8 text-center sm:mb-12 lg:mb-16 xl:mb-20 2xl:mb-24 sm:px-6 lg:px-8">
        <h2 className="font-bold text-[#1f528c] mb-3
                       text-2xl
                       sm:text-3xl sm:mb-4
                       md:text-4xl
                       lg:text-5xl lg:mb-6
                       xl:text-6xl xl:mb-8
                       2xl:text-7xl 2xl:mb-10">Industries</h2>
        <p className="max-w-xl mx-auto text-sm text-gray-600 sm:text-base sm:max-w-2xl lg:text-lg lg:max-w-3xl xl:text-xl xl:max-w-4xl 2xl:text-2xl 2xl:max-w-5xl">
          Discover how our AI solutions transform businesses across various industries
        </p>
      </div>

      {/* Scrolling Layout for All Devices */}
      <div className="relative overflow-hidden">
        {/* Gradient overlays for smooth fade effect - Responsive width */}
        <div className="absolute top-0 left-0 z-10 w-8 h-full pointer-events-none bg-gradient-to-r from-gray-50 to-transparent sm:w-16 xl:w-32 2xl:w-48"></div>
        <div className="absolute top-0 right-0 z-10 w-8 h-full pointer-events-none bg-gradient-to-l from-gray-50 to-transparent sm:w-16 xl:w-32 2xl:w-48"></div>
        
        {/* Scrolling container */}
        <div className="flex space-x-4 animate-scroll-dynamic hover:pause-animation sm:space-x-6 xl:space-x-8 2xl:space-x-12">
          {/* Create multiple sets for seamless scrolling */}
          {[...Array(3)].map((_, setIndex) => (
            <div key={setIndex} className="flex space-x-4 animate-float sm:space-x-6 xl:space-x-8 2xl:space-x-12">
              {caseStudyOptions.map((caseStudy, index) => {
                const IconComponent = caseStudy.icon;
                const delay = (setIndex * caseStudyOptions.length + index) * 0.1;
                
                return (
                  <div 
                    key={`${setIndex}-${caseStudy.id}`}
                    className="flex-shrink-0 transition-all duration-500 transform cursor-pointer group hover:scale-105 active:scale-95"
                    style={{
                      animationDelay: `${delay}s`
                    }}
                    onClick={() => handleCardClick(caseStudy.route)}
                  >
                    <div className="bg-white border border-gray-200 shadow-lg transition-all duration-500 hover:shadow-2xl group-hover:border-gray-300 relative overflow-hidden flex flex-col justify-between
                                    rounded-xl p-3 min-w-[200px] h-[140px]
                                    sm:rounded-2xl sm:p-4 sm:min-w-[240px] sm:h-[160px]
                                    md:p-5 md:min-w-[260px] md:h-[170px]
                                    lg:p-6 lg:min-w-[280px] lg:h-[180px]
                                    xl:rounded-3xl xl:p-7 xl:min-w-[320px] xl:h-[200px]
                                    2xl:p-8 2xl:min-w-[360px] 2xl:h-[220px]">
                      
                      {/* Icon and Title */}
                      <div className="flex items-start space-x-2 sm:space-x-3 lg:space-x-4 2xl:space-x-5">
                        <div className={`${getIconColor(caseStudy.id)} transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 flex-shrink-0`}>
                          <IconComponent strokeWidth={1.5}
                                        className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 2xl:w-9 2xl:h-9" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xs font-bold text-gray-800 transition-colors group-hover:text-gray-900 line-clamp-2 sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
                            {caseStudy.title}
                          </h3>
                          <p className="mt-1 text-xs leading-relaxed text-gray-600 line-clamp-2 sm:text-xs md:text-sm lg:text-sm xl:text-base 2xl:text-lg">
                            {caseStudy.description}
                          </p>
                        </div>
                      </div>
                      
                      {/* Highlight badge */}
                      <div className="mt-2 sm:mt-3 lg:mt-4 2xl:mt-5">
                        <span className={`inline-block px-2 py-1 rounded-full font-semibold transition-all duration-300 group-hover:scale-105 ${getHighlightColor(caseStudy.id)}
                                         text-xs
                                         sm:text-xs
                                         md:px-3 md:py-1.5 md:text-sm
                                         xl:px-4 xl:py-2 xl:text-sm
                                         2xl:px-5 2xl:py-2 2xl:text-base`}>
                          {caseStudy.highlight}
                        </span>
                      </div>
                      
                      {/* Click indicator */}
                      <div className="absolute transition-opacity duration-300 opacity-0 group-hover:opacity-100 top-2 right-2 sm:top-3 sm:right-3 lg:top-4 lg:right-4 2xl:top-5 2xl:right-5">
                        <div className="flex items-center justify-center w-4 h-4 bg-blue-500 rounded-full sm:w-5 sm:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 2xl:w-8 2xl:h-8">
                          <svg className="text-white
                                         w-2 h-2
                                         sm:w-2.5 sm:h-2.5
                                         lg:w-3 lg:h-3
                                         xl:w-4 xl:h-4
                                         2xl:w-5 2xl:h-5" 
                               fill="none" 
                               stroke="currentColor" 
                               viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                      
                      {/* Subtle hover indicator */}
                      <div className="absolute inset-0 transition-all duration-500 pointer-events-none bg-gradient-to-r from-blue-400/0 to-purple-400/0 group-hover:from-blue-400/5 group-hover:to-purple-400/5 rounded-xl sm:rounded-2xl xl:rounded-3xl"></div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Custom styles */}
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
          animation: scroll-dynamic 8s linear infinite;
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

        /* Smooth scroll behavior */
        .animate-scroll-dynamic {
          will-change: transform;
        }
        
        /* Enhanced hover states for desktop */
        @media (min-width: 1024px) {
          .group:hover .animate-float {
            transform: translateY(-8px) !important;
          }
        }

        /* Line clamp utility for text truncation */
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Touch feedback for mobile */
        @media (max-width: 1023px) {
          .group:active {
            transform: scale(0.95);
          }
        }
      `}</style>
    </div>
  );
};

export default Industries;