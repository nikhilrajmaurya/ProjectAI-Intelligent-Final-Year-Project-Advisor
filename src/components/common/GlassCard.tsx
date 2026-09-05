import React from 'react';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  glow?: 'none' | 'blue' | 'cyan' | 'purple';
  elevated?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  hoverEffect = false,
  glow = 'none',
  elevated = false,
  ...props
}) => {
  const glowStyles = {
    none: '',
    blue: 'hover:shadow-[0_4px_20px_rgba(37,99,235,0.12)] hover:border-blue-500/30',
    cyan: 'hover:shadow-[0_4px_20px_rgba(6,182,212,0.12)] hover:border-cyan-500/30',
    purple: 'hover:shadow-[0_4px_20px_rgba(168,85,247,0.12)] hover:border-purple-500/30',
  };

  return (
    <div
      className={`rounded-2xl border transition-all duration-200 ${
        elevated ? 'glass-panel' : 'glass-card'
      } ${hoverEffect ? 'hover:-translate-y-1 cursor-pointer' : ''} ${
        glow !== 'none' ? glowStyles[glow] : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
