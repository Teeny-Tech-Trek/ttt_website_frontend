import React from 'react';
import Skeleton from './Skeleton';

export const FeaturedBlogSkeleton: React.FC = () => {
  return (
    <div className="mb-10 sm:mb-12">
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 lg:p-10 flex flex-col md:flex-row gap-6 sm:gap-8 lg:gap-12 items-center">
        {/* Left Media Skeleton */}
        <div className="w-full md:w-[48%] lg:w-[50%] shrink-0">
          <Skeleton className="w-full aspect-[16/10] rounded-2xl" />
        </div>

        {/* Right Article Details Skeleton */}
        <div className="flex flex-col justify-between flex-1 space-y-4 w-full">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Skeleton className="w-32 h-6 rounded-md" />
              <Skeleton className="w-24 h-6 rounded-md" />
            </div>

            <Skeleton className="w-full h-8 sm:h-9 rounded-lg mb-2" />
            <Skeleton className="w-3/4 h-8 sm:h-9 rounded-lg mb-4" />

            <Skeleton className="w-full h-4 rounded mb-2" />
            <Skeleton className="w-full h-4 rounded mb-2" />
            <Skeleton className="w-2/3 h-4 rounded mb-6" />
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <div className="flex items-center gap-3">
              <Skeleton variant="circular" className="w-10 h-10" />
              <div className="space-y-1.5">
                <Skeleton className="w-24 h-3.5" />
                <Skeleton className="w-16 h-3" />
              </div>
            </div>
            <Skeleton className="w-20 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedBlogSkeleton;
