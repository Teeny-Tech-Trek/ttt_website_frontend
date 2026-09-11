import React from 'react';
import Skeleton from './Skeleton';

export const DiscussionSkeleton: React.FC = () => (
  <div className="p-6 bg-white border border-slate-200/80 rounded-2xl shadow-xs space-y-4">
    <div className="flex items-center gap-3">
      <Skeleton variant="circular" className="w-10 h-10 shrink-0" />
      <div className="space-y-1.5 flex-1">
        <Skeleton className="w-32 h-4 rounded" />
        <Skeleton className="w-20 h-3 rounded" />
      </div>
      <Skeleton className="w-16 h-6 rounded-full" />
    </div>
    <Skeleton className="w-full h-5 rounded" />
    <Skeleton className="w-4/5 h-4 rounded" />
    <div className="flex items-center gap-4 pt-2">
      <Skeleton className="w-14 h-4 rounded" />
      <Skeleton className="w-14 h-4 rounded" />
      <Skeleton className="w-20 h-4 rounded ml-auto" />
    </div>
  </div>
);

export const EventCardSkeleton: React.FC = () => (
  <div className="p-6 bg-white border border-slate-200/80 rounded-2xl shadow-xs flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between">
    <div className="flex items-start gap-4 flex-1">
      {/* Date badge */}
      <div className="w-14 h-14 rounded-xl bg-slate-100 border border-slate-200 flex flex-col items-center justify-center shrink-0 p-1">
        <Skeleton className="w-8 h-3 rounded mb-1" />
        <Skeleton className="w-6 h-5 rounded" />
      </div>
      <div className="space-y-2 flex-1">
        <div className="flex items-center gap-2">
          <Skeleton className="w-16 h-4 rounded-md" />
          <Skeleton className="w-24 h-4 rounded-md" />
        </div>
        <Skeleton className="w-3/4 h-5 rounded" />
        <Skeleton className="w-1/2 h-3.5 rounded" />
      </div>
    </div>
    <Skeleton className="w-28 h-10 rounded-xl shrink-0" />
  </div>
);

export const ResourceCardSkeleton: React.FC = () => (
  <div className="p-6 bg-white border border-slate-200/80 rounded-2xl shadow-xs space-y-4">
    <div className="flex items-start justify-between gap-3">
      <div className="flex items-center gap-3">
        <Skeleton className="w-11 h-11 rounded-xl shrink-0" />
        <div className="space-y-1.5">
          <Skeleton className="w-36 h-4 rounded" />
          <Skeleton className="w-20 h-3 rounded" />
        </div>
      </div>
      <Skeleton className="w-16 h-6 rounded-md" />
    </div>
    <Skeleton className="w-full h-3.5 rounded" />
    <Skeleton className="w-4/5 h-3.5 rounded" />
    <div className="pt-2 flex justify-end">
      <Skeleton className="w-24 h-9 rounded-lg" />
    </div>
  </div>
);

export const StoryCardSkeleton: React.FC = () => (
  <div className="p-6 bg-white border border-slate-200/80 rounded-2xl shadow-xs space-y-4">
    <div className="flex items-center gap-3">
      <Skeleton variant="circular" className="w-12 h-12 shrink-0" />
      <div className="space-y-1.5">
        <Skeleton className="w-28 h-4 rounded" />
        <Skeleton className="w-36 h-3 rounded" />
      </div>
    </div>
    <Skeleton className="w-full h-4 rounded" />
    <Skeleton className="w-full h-4 rounded" />
    <Skeleton className="w-2/3 h-4 rounded" />
    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
      <Skeleton className="w-24 h-5 rounded" />
      <Skeleton className="w-20 h-4 rounded" />
    </div>
  </div>
);

export default {
  DiscussionSkeleton,
  EventCardSkeleton,
  ResourceCardSkeleton,
  StoryCardSkeleton,
};
