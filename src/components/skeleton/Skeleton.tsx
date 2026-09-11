import React from 'react';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rounded' | 'rectangular';
  dark?: boolean;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'rounded',
  dark = false,
  style,
  ...props
}) => {
  const variantStyles = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rounded: 'rounded-xl',
    rectangular: 'rounded-none',
  };

  const bgStyle = dark
    ? 'bg-blue-900/40 border border-white/5 animate-shimmer-dark'
    : 'bg-slate-200/80 animate-shimmer';

  return (
    <div
      className={`inline-block ${variantStyles[variant]} ${bgStyle} ${className}`}
      style={style}
      aria-hidden="true"
      {...props}
    />
  );
};

export default Skeleton;
