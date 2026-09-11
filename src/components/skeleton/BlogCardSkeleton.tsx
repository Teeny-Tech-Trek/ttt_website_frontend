import React from 'react';
import Skeleton from './Skeleton';

export const BlogCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden flex flex-col justify-between h-full">
      {/* Media placeholder */}
      <Skeleton className="w-full aspect-[16/10] rounded-none" />

      <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between">
        <div>
          {/* Category badge */}
          <div className="mb-3">
            <Skeleton className="w-20 h-5 rounded-md" />
          </div>

          {/* Title lines */}
          <Skeleton className="w-full h-6 rounded-md mb-2" />
          <Skeleton className="w-4/5 h-6 rounded-md mb-4" />

          {/* Excerpt lines */}
          <Skeleton className="w-full h-4 rounded mb-2" />
          <Skeleton className="w-full h-4 rounded mb-2" />
          <Skeleton className="w-2/3 h-4 rounded mb-6" />
        </div>

        {/* Footer author & date */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2.5">
            <Skeleton variant="circular" className="w-8 h-8" />
            <div className="space-y-1">
              <Skeleton className="w-20 h-3" />
              <Skeleton className="w-14 h-2.5" />
            </div>
          </div>
          <Skeleton className="w-16 h-3" />
        </div>
      </div>
    </div>
  );
};

export default BlogCardSkeleton;
