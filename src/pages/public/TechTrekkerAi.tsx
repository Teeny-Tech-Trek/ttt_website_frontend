import React from 'react';
import { Loader2 } from 'lucide-react';

interface ComingSoonProps {
  title?: string;
}

const TechTrekkerAi: React.FC<ComingSoonProps> = ({
  title = "Coming soon"
}) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="text-center">
        {/* Loading Icon */}
        <div className="flex justify-center mb-8">
          <Loader2 className="w-12 h-12 text-gray-700 animate-spin" />
        </div>
        
        {/* Title */}
        <h1 className="text-4xl font-light tracking-wide text-gray-900 md:text-5xl">
          {title}
        </h1>
      </div>
    </div>
  );
};

export default TechTrekkerAi;