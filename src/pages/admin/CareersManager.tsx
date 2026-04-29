import React from 'react';

const CareersManager: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Careers Management</h1>
        <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90">
          New Position
        </button>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="space-y-4">
          <p className="text-gray-500">Coming Soon.....</p>
        </div>
      </div>
    </div>
  );
};

export default CareersManager;