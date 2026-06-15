import React from 'react';
import { Home, Stethoscope, MessageCircle, Truck, Hotel, BookOpen, Zap, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const caseStudyOptions = [
  {
    id: 'realestate',
    route: '/real-estate',
    icon: Home,
    title: 'Real Estate',
    description: 'Agentic AI for Listing Prep',
    highlight: '50-60% faster prep time',
  },
  {
    id: 'healthcare',
    route: '/healthcare',
    icon: Stethoscope,
    title: 'Healthcare',
    description: 'Pre-Op Intake & Scheduling',
    highlight: '28% fewer no-shows',
  },
  {
    id: 'ecommerce',
    route: '/ecommerce',
    icon: MessageCircle,
    title: 'D2C E-commerce',
    description: 'AI Support & WhatsApp Assistant',
    highlight: '68% faster response times',
  },
  {
    id: 'logistics',
    route: '/logistics',
    icon: Truck,
    title: 'Manufacturing & Logistics',
    description: 'Driver WhatsApp Bot + ETA Flow',
    highlight: '17% lower dwell time',
  },
  {
    id: 'hospitality',
    route: '/hospitality',
    icon: Hotel,
    title: 'Hospitality',
    description: 'AI Concierge & Itinerary Builder',
    highlight: '19% more direct bookings',
  },
  {
    id: 'education',
    route: '/education',
    icon: BookOpen,
    title: 'Education',
    description: 'Institutional Collaboration & Workshops',
    highlight: 'Better learning outcomes',
  },
  {
    id: 'financial',
    route: '/financial-services',
    icon: Zap,
    title: 'Financial Services',
    description: 'Back-Office Smart Automations',
    highlight: '20-25 hours/week saved',
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

const Industries = () => {
  const navigate = useNavigate();

  const handleCardClick = (route) => navigate(route);

  const renderCard = (caseStudy, key) => {
    const IconComponent = caseStudy.icon;
    return (
      <div
        key={key}
        className="flex-shrink-0 w-[280px] sm:w-[320px] px-2 sm:px-3"
        aria-hidden={key.toString().includes('dup') ? true : undefined}
      >
        <div
          role="button"
          tabIndex={0}
          onClick={() => handleCardClick(caseStudy.route)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') handleCardClick(caseStudy.route);
          }}
          className="bg-white rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 h-[180px] md:h-[200px] flex flex-col justify-between cursor-pointer group hover:-translate-y-1 hover:border-gray-300 relative overflow-hidden"
        >
          <div className="flex items-start space-x-3 md:space-x-4">
            <div
              className={`${getIconColor(
                caseStudy.id
              )} transform transition-all duration-300 group-hover:scale-110`}
            >
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

          <div className="mt-3 md:mt-4">
            <span
              className={`inline-block px-2 md:px-3 py-1 md:py-2 rounded-full text-xs font-semibold ${getHighlightColor(
                caseStudy.id
              )}`}
            >
              {caseStudy.highlight}
            </span>
          </div>

          <div className="absolute transition-opacity duration-300 opacity-0 top-2 md:top-3 right-2 md:right-3 group-hover:opacity-100">
            <div className="flex items-center justify-center w-5 h-5 bg-blue-500 rounded-full md:w-6 md:h-6">
              <ChevronRight className="w-3 h-3 text-white" />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full py-8 md:py-12 bg-gray-50">
      {/* Header */}
      <div className="px-4 mb-8 text-center md:mb-12">
        <h2 className="mb-3 text-4xl font-bold text-blue-900 md:mb-4">Industries</h2>
        <p className="max-w-2xl mx-auto text-sm text-gray-600 md:text-lg">
          Discover how our AI solutions transform businesses across various industries
        </p>
      </div>

      {/* Continuous marquee */}
      <div className="marquee group/marquee relative w-full overflow-hidden">
        {/* Edge fade masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 sm:w-24 bg-gradient-to-r from-gray-50 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 sm:w-24 bg-gradient-to-l from-gray-50 to-transparent" />

        <div className="marquee-track flex w-max py-2">
          {caseStudyOptions.map((c) => renderCard(c, c.id))}
          {/* Duplicated set for a seamless loop */}
          {caseStudyOptions.map((c) => renderCard(c, `${c.id}-dup`))}
        </div>
      </div>

      <style>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        @keyframes industries-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        .marquee-track {
          animation: industries-marquee 40s linear infinite;
        }

        /* Pause when the user hovers the strip */
        .marquee:hover .marquee-track {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
};

export default Industries;
