import React from 'react';

interface LogoProps {
  className?: string;
  compact?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', compact = false }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        width={compact ? 28 : 36}
        height={compact ? 20 : 28}
        viewBox="0 0 36 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        role="img"
        className="block"
      >
        <title>HosWeb</title>
        {/* ECG / heartbeat style path */}
        <path
          d="M2 18 L8 18 L10 14 L12 22 L14 8 L16 18 L32 18"
          stroke="#0EA5FF"
          strokeWidth={2.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>

      {!compact && (
        <span className="text-2xl font-semibold text-slate-800 tracking-tight">HosWeb</span>
      )}
    </div>
  );
};

export default Logo;
