import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'blue' | 'cyan' | 'green' | 'amber' | 'purple' | 'slate' | 'rose';
  size?: 'sm' | 'md';
  className?: string;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'blue',
  size = 'sm',
  className = '',
  icon,
}) => {
  const variantStyles = {
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20 dark:text-blue-300',
    cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20 dark:text-cyan-300',
    green: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 dark:text-emerald-300',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20 dark:text-amber-300',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20 dark:text-purple-300',
    slate: 'bg-slate-500/10 text-slate-400 border-slate-500/20 dark:text-slate-300',
    rose: 'bg-rose-500/10 text-rose-400 border-rose-500/20 dark:text-rose-300',
  };

  const sizeStyles = {
    sm: 'text-xs px-2.5 py-0.5 gap-1 font-medium',
    md: 'text-sm px-3 py-1 gap-1.5 font-medium',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </span>
  );
};
