import React from 'react';

interface LogoIconProps {
  className?: string;
  size?: number;
  animated?: boolean;
}

export const LogoIcon: React.FC<LogoIconProps> = ({
  className = '',
  size = 32,
  animated = true,
}) => {
  return (
    <div
      className={`relative flex items-center justify-center select-none flex-shrink-0 ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {/* Dynamic ambient back-glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-blue-600 via-cyan-400 to-indigo-500 opacity-60 blur-md pointer-events-none transition-opacity duration-300 group-hover:opacity-100" />

      {/* SVG Icon */}
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full relative z-10 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]"
      >
        <defs>
          {/* Base rounded squircle container gradient */}
          <linearGradient id="mentorai-bg" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop stopColor="#080c18" />
            <stop offset="0.6" stopColor="#04060d" />
            <stop offset="1" stopColor="#020408" />
          </linearGradient>

          {/* Border rim gradient */}
          <linearGradient id="mentorai-border" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop stopColor="#38bdf8" />
            <stop offset="0.4" stopColor="#6366f1" />
            <stop offset="1" stopColor="#06b6d4" />
          </linearGradient>

          {/* Primary ribbon strand 1 */}
          <linearGradient id="mentorai-strand-cyan" x1="6" y1="12" x2="42" y2="36" gradientUnits="userSpaceOnUse">
            <stop stopColor="#22d3ee" />
            <stop offset="0.5" stopColor="#3b82f6" />
            <stop offset="1" stopColor="#818cf8" />
          </linearGradient>

          {/* Primary ribbon strand 2 */}
          <linearGradient id="mentorai-strand-violet" x1="42" y1="12" x2="6" y2="36" gradientUnits="userSpaceOnUse">
            <stop stopColor="#818cf8" />
            <stop offset="0.5" stopColor="#6366f1" />
            <stop offset="1" stopColor="#06b6d4" />
          </linearGradient>

          {/* Center core pulse radial */}
          <radialGradient id="mentorai-core" cx="24" cy="24" r="6" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ffffff" />
            <stop offset="0.45" stopColor="#67e8f9" />
            <stop offset="1" stopColor="#0284c7" stopOpacity="0" />
          </radialGradient>

          {/* Glow filter */}
          <filter id="mentorai-glow" x="-20%" y="-20%" width="140%" height="140%" filterUnits="userSpaceOnUse">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Squircle Chassis with Glass Rim */}
        <rect
          x="1"
          y="1"
          width="46"
          height="46"
          rx="14"
          fill="url(#mentorai-bg)"
          stroke="url(#mentorai-border)"
          strokeWidth="1.2"
          className="transition-all duration-300"
        />

        {/* Subtle grid accent inside the badge */}
        <line x1="12" y1="24" x2="36" y2="24" stroke="#38bdf8" strokeOpacity="0.08" strokeWidth="1" strokeDasharray="2 2" />
        <line x1="24" y1="12" x2="24" y2="36" stroke="#38bdf8" strokeOpacity="0.08" strokeWidth="1" strokeDasharray="2 2" />

        {/* Dynamic AI Neural Loop - Upper Left to Lower Right */}
        <path
          d="M13 32V20C13 15.0294 17.0294 11 22 11C23.1046 11 24 11.8954 24 13V35C24 36.1046 24.8954 37 26 37C30.9706 37 35 32.9706 35 28V16"
          stroke="url(#mentorai-strand-cyan)"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#mentorai-glow)"
          className={animated ? "transition-all duration-500 group-hover:scale-105" : ""}
        />

        {/* Interlocking Neural Arc - Upper Right to Lower Left */}
        <path
          d="M35 16V28C35 32.9706 30.9706 37 26 37C24.8954 37 24 36.1046 24 35V13C24 11.8954 23.1046 11 22 11C17.0294 11 13 15.0294 13 20"
          stroke="url(#mentorai-strand-violet)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="4 3"
          opacity="0.75"
        />

        {/* Central Luminous Quantum Core / Spark */}
        <circle cx="24" cy="24" r="3.2" fill="url(#mentorai-core)" />
        <circle cx="24" cy="24" r="1.2" fill="#ffffff" />

        {/* Satellite Neural Nodes */}
        <circle cx="13" cy="19" r="1.5" fill="#38bdf8" />
        <circle cx="35" cy="29" r="1.5" fill="#a855f7" />
      </svg>
    </div>
  );
};
