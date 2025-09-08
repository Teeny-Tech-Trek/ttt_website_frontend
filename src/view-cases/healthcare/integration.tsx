import React from 'react';

const IntegrationsSection = () => {
  const integrations = [
    "MEDITAB",
    "athenahealth", 
    "EXPERITY",
    "dr chrono",
    "eClinicalWorks",
    "Epic"
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-600 mb-4">
            Integrations
          </h2>
          <p className="text-xl text-gray-600">
            Already integrated with the tools you use every day
          </p>
        </div>

        {/* Integration logos grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {integrations.map((integration, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow h-24 flex items-center justify-center group"
            >
              <div className="text-lg font-bold text-gray-600 group-hover:text-blue-600 transition-colors text-center">
                {integration}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IntegrationsSection;