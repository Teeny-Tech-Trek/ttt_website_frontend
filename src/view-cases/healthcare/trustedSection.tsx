import React from 'react';

const TrustedBySection = () => {
  const companies = [
    { name: "OxyClinical", logo: "oxyclinical" },
    { name: "UP.PARTNERS", logo: "up-partners" },
    { name: "Word&Brown", logo: "word-brown" },
    { name: "BROX AWARE", logo: "brox-aware" },
    { name: "KAISER PERMANENTE", logo: "kaiser" },
    { name: "MOLINA HEALTHCARE", logo: "molina" }
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-600 mb-4">
            Trusted By Industry Leaders
          </h2>
        </div>

        {/* Scrolling logos container */}
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll space-x-16 items-center">
            {/* First set of logos */}
            {companies.map((company, index) => (
              <div 
                key={`first-${index}`}
                className="flex-shrink-0 h-16 w-48 flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity"
              >
                <div className="text-2xl font-bold text-gray-600">
                  {company.name}
                </div>
              </div>
            ))}
            
            {/* Duplicate set for seamless scrolling */}
            {companies.map((company, index) => (
              <div 
                key={`second-${index}`}
                className="flex-shrink-0 h-16 w-48 flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity"
              >
                <div className="text-2xl font-bold text-gray-600">
                  {company.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default TrustedBySection;