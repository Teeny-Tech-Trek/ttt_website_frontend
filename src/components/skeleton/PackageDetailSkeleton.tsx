import React from 'react';
import Skeleton from './Skeleton';

export const PackageDetailSkeleton: React.FC = () => {
  return (
    <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-10 mt-12">
      {/* Title */}
      <Skeleton className="w-3/4 h-8 rounded-lg mb-6" />
      {/* Key-Value details list */}
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="space-y-1.5">
            <Skeleton className="w-28 h-4 rounded" />
            <Skeleton className="w-full h-4 rounded ml-2" />
          </div>
        ))}
      </div>
      {/* Action button */}
      <div className="mt-8">
        <Skeleton className="w-56 h-12 rounded-xl" />
      </div>
    </div>
  );
};

export default PackageDetailSkeleton;
