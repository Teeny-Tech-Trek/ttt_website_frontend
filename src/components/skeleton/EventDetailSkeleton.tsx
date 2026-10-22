import React from 'react';
import Skeleton from './Skeleton';

export const EventDetailSkeleton: React.FC = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px 8px',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 740,
          background: '#fff',
          borderRadius: 24,
          boxShadow: '0 8px 38px 0 rgba(31,82,140,0.18)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          margin: '0 auto',
        }}
      >
        <div style={{ padding: '34px 28px 22px 28px' }}>
          {/* Title */}
          <Skeleton className="w-4/5 h-9 rounded-lg mb-4" />
          {/* Date */}
          <Skeleton className="w-1/2 h-5 rounded mb-3" />
          {/* Location */}
          <Skeleton className="w-1/3 h-4 rounded mb-5" />
          {/* Description lines */}
          <div className="space-y-3 pt-3 border-t border-slate-100 mb-6">
            <Skeleton className="w-full h-4 rounded" />
            <Skeleton className="w-full h-4 rounded" />
            <Skeleton className="w-3/4 h-4 rounded" />
          </div>
          {/* Register button placeholder */}
          <Skeleton className="w-full sm:w-44 h-12 rounded-xl" />
        </div>
      </div>
    </div>
  );
};

export default EventDetailSkeleton;
