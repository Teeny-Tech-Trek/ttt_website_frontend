import React from 'react';
import Skeleton from './Skeleton';

export const BlogDetailSkeleton: React.FC = () => {
  return (
    <section className="min-h-screen bg-[#f8fafc] relative font-sans overflow-x-clip pt-16 sm:pt-20">
      {/* Sub-Navigation Header Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="w-5 h-5 rounded" />
            <Skeleton className="w-24 h-4 rounded" />
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="hidden md:inline-block w-48 h-4 rounded" />
            <Skeleton className="w-24 h-6 rounded-full" />
          </div>
        </div>
      </div>

      {/* 3-Column Layout */}
      <div className="max-w-[1400px] mx-auto px-3 sm:px-6 lg:px-8 py-8 lg:py-10 flex justify-center items-start gap-6 xl:gap-10">
        {/* Left Column (Sticky Pill) */}
        <aside className="hidden xl:flex sticky top-28 flex-col items-center gap-3 w-14 shrink-0">
          <div className="bg-white p-2.5 rounded-2xl shadow-md border border-slate-200 flex flex-col items-center gap-3 w-full">
            <Skeleton className="w-10 h-10 rounded-xl" />
            <div className="w-6 h-px bg-slate-200" />
            <Skeleton className="w-7 h-4 rounded" />
            <div className="w-6 h-px bg-slate-200" />
            <Skeleton className="w-10 h-10 rounded-xl" />
            <Skeleton className="w-10 h-10 rounded-xl" />
            <Skeleton className="w-10 h-10 rounded-xl" />
          </div>
        </aside>

        {/* Center Column: Main Article Card (840px) */}
        <main className="w-full max-w-[840px] flex-1 flex flex-col">
          <div className="w-full bg-white rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.06)] border border-slate-200 overflow-hidden flex flex-col">
            {/* Header */}
            <div className="px-5 sm:px-8 xl:px-12 pt-8 sm:pt-10 pb-6 flex flex-col items-center text-center">
              <Skeleton className="w-28 h-6 rounded-full mb-4" />
              <Skeleton className="w-full h-9 sm:h-11 rounded-lg mb-3" />
              <Skeleton className="w-3/4 h-9 sm:h-11 rounded-lg mb-6" />

              {/* Author byline row */}
              <div className="flex items-center justify-center gap-4 py-3.5 w-full max-w-xl border-t border-b border-slate-100">
                <Skeleton variant="circular" className="w-7 h-7" />
                <Skeleton className="w-24 h-4 rounded" />
                <Skeleton className="w-20 h-4 rounded" />
                <Skeleton className="w-16 h-4 rounded" />
              </div>
            </div>

            {/* Hero Image Placeholder (16:9) */}
            <div className="px-5 sm:px-8 xl:px-12 pb-8">
              <Skeleton className="w-full aspect-[16/9] rounded-xl" />
            </div>

            {/* Article Content Lines */}
            <div className="px-5 sm:px-8 xl:px-12 pb-12 space-y-4">
              <Skeleton className="w-full h-4 rounded" />
              <Skeleton className="w-full h-4 rounded" />
              <Skeleton className="w-11/12 h-4 rounded" />
              <Skeleton className="w-4/5 h-4 rounded mb-6" />

              <Skeleton className="w-1/2 h-7 rounded-md mt-6 mb-3" />
              <Skeleton className="w-full h-4 rounded" />
              <Skeleton className="w-full h-4 rounded" />
              <Skeleton className="w-5/6 h-4 rounded" />
              <Skeleton className="w-3/4 h-4 rounded mb-6" />

              <Skeleton className="w-2/3 h-7 rounded-md mt-6 mb-3" />
              <Skeleton className="w-full h-4 rounded" />
              <Skeleton className="w-full h-4 rounded" />
              <Skeleton className="w-4/5 h-4 rounded" />
            </div>
          </div>
        </main>

        {/* Right Column: Recommendations Sidebar */}
        <aside className="hidden lg:block w-[320px] xl:w-[360px] shrink-0 sticky top-28">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-5">
            <Skeleton className="w-36 h-6 rounded-md mb-2" />
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-3 pb-4 border-b border-slate-100 last:border-b-0 last:pb-0">
                <Skeleton className="w-16 h-16 rounded-xl shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="w-full h-4 rounded" />
                  <Skeleton className="w-3/4 h-4 rounded" />
                  <Skeleton className="w-16 h-3 rounded" />
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
};

export default BlogDetailSkeleton;
