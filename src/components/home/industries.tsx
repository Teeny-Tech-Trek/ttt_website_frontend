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
    <div className="w-full py-12 bg-gray-50">
      {/* Header Section */}
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-4xl font-bold text-blue-900">Industries</h2>
        <p className="max-w-2xl mx-auto text-lg text-gray-600">
          Discover how our AI solutions transform businesses across various industries
        </p>
      </div>
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
                const IconComponent = caseStudy.icon;
                const delay = (setIndex * caseStudyOptions.length + index) * 0.1;
                
                return (
                  <div 
                    key={`${setIndex}-${caseStudy.id}`}
                    className="flex-shrink-0 transition-all duration-500 transform cursor-pointer group hover:scale-105"
                    style={{
                      animationDelay: `${delay}s`
                    }}
                    onClick={() => handleCardClick(caseStudy.route)}
                  >
                    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200 min-w-[320px] h-[200px] flex flex-col justify-between group-hover:border-gray-300 relative overflow-hidden">
                      {/* Icon and Title */}
                      <div className="flex items-start space-x-4">
                        <div className={`${getIconColor(caseStudy.id)} transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                          <IconComponent size={32} strokeWidth={1.5} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-800 transition-colors group-hover:text-gray-900">
                            {caseStudy.title}
                          </h3>
                          <p className="mt-1 text-sm leading-relaxed text-gray-600">
                            {caseStudy.description}
                          </p>
                        </div>
                      </div>
                      
                      {/* Highlight badge */}
                      <div className="mt-4">
                        <span className={`inline-block px-3 py-2 rounded-full text-xs font-semibold ${getHighlightColor(caseStudy.id)} transition-all duration-300 group-hover:scale-105`}>
                          {caseStudy.highlight}
                        </span>
                      </div>
                      
                      {/* Click indicator */}
                      <div className="absolute transition-opacity duration-300 opacity-0 top-3 right-3 group-hover:opacity-100">
                        <div className="flex items-center justify-center w-6 h-6 bg-blue-500 rounded-full">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                      
                      {/* Subtle hover indicator */}
                      <div className="absolute inset-0 transition-all duration-500 pointer-events-none rounded-2xl bg-gradient-to-r from-blue-400/0 to-purple-400/0 group-hover:from-blue-400/5 group-hover:to-purple-400/5"></div>
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

        /* Smooth scroll behavior */
        .animate-scroll-dynamic {
          will-change: transform;
        }
        
        /* Enhanced hover states */
        .group:hover .animate-float {
          transform: translateY(-8px) !important;
        }
      `}</style>
    </div>
  );
};

export default Industries;