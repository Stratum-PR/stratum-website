import React, { useEffect, useState } from 'react';

interface TechAnimatedBackgroundProps {
  className?: string;
  opacity?: number;
}

const TechAnimatedBackground: React.FC<TechAnimatedBackgroundProps> = ({ 
  className = '', 
  opacity = 0.6
}) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} aria-hidden="true" style={{ opacity }}>
      {/* Animated radial lines from center */}
      {!prefersReducedMotion && (
        <svg className="absolute inset-0 w-full h-full opacity-20">
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i * 360) / 24;
            const radian = (angle * Math.PI) / 180;
            const length = 150;
            const x2 = 50 + Math.cos(radian) * length;
            const y2 = 50 + Math.sin(radian) * length;
            
            return (
              <line
                key={`radial-${i}`}
                x1="50%"
                y1="50%"
                x2={`${x2}%`}
                y2={`${y2}%`}
                stroke="rgba(255, 255, 255, 0.15)"
                strokeWidth="1"
              >
                <animate
                  attributeName="opacity"
                  values="0.1;0.4;0.1"
                  dur={`${3 + (i % 3)}s`}
                  repeatCount="indefinite"
                  begin={`${i * 0.1}s`}
                />
              </line>
            );
          })}
        </svg>
      )}

      {/* Concentric circles */}
      {!prefersReducedMotion && (
        <svg className="absolute inset-0 w-full h-full opacity-15">
          {Array.from({ length: 8 }).map((_, i) => {
            const radius = 10 + (i * 8);
            const delay = i * 0.3;
            
            return (
              <circle
                key={`circle-${i}`}
                cx="50%"
                cy="50%"
                r={`${radius}%`}
                fill="none"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="0.5"
              >
                <animate
                  attributeName="r"
                  values={`${radius}%;${radius + 2}%;${radius}%`}
                  dur={`${4 + i * 0.5}s`}
                  repeatCount="indefinite"
                  begin={`${delay}s`}
                />
                <animate
                  attributeName="opacity"
                  values="0.1;0.3;0.1"
                  dur={`${4 + i * 0.5}s`}
                  repeatCount="indefinite"
                  begin={`${delay}s`}
                />
              </circle>
            );
          })}
        </svg>
      )}

      {/* Floating particles */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0">
          {Array.from({ length: 40 }).map((_, i) => {
            const size = 3 + Math.random() * 4;
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            const delay = Math.random() * 5;
            const duration = 8 + Math.random() * 12;
            const direction = Math.random() > 0.5 ? 1 : -1;
            
            return (
              <div
                key={`particle-${i}`}
                className="absolute rounded-full bg-white"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  left: `${left}%`,
                  top: `${top}%`,
                  opacity: 0.2 + Math.random() * 0.4,
                  boxShadow: `0 0 ${size * 2}px rgba(255, 255, 255, 0.5)`,
                  animationName: 'particleFloat',
                  animationDuration: `${duration}s`,
                  animationTimingFunction: 'linear',
                  animationIterationCount: 'infinite',
                  animationDelay: `${delay}s`,
                  transform: 'translate(-50%, -50%)',
                }}
              />
            );
          })}
        </div>
      )}

      {/* Light beams/rays */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0">
          {Array.from({ length: 6 }).map((_, i) => {
            const angle = (i * 60) + Math.random() * 20;
            const width = 2 + Math.random() * 3;
            const delay = i * 1.5;
            const duration = 6 + Math.random() * 4;
            
            return (
              <div
                key={`beam-${i}`}
                className="absolute"
                style={{
                  width: `${width}px`,
                  height: '100%',
                  left: '50%',
                  top: '0',
                  background: `linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.1), transparent)`,
                  transform: `translateX(-50%) rotate(${angle}deg)`,
                  transformOrigin: 'center top',
                  animationName: 'beamRotate',
                  animationDuration: `${duration}s`,
                  animationTimingFunction: 'ease-in-out',
                  animationIterationCount: 'infinite',
                  animationDelay: `${delay}s`,
                }}
              />
            );
          })}
        </div>
      )}

      {/* Animated gradient mesh */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              background: `
                radial-gradient(circle at 20% 30%, rgba(38, 106, 178, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 80% 70%, rgba(230, 224, 142, 0.2) 0%, transparent 50%),
                radial-gradient(circle at 50% 50%, rgba(30, 43, 126, 0.2) 0%, transparent 50%)
              `,
              animation: 'gradientShift 20s ease-in-out infinite',
            }}
          />
        </div>
      )}

      {/* Geometric shapes floating */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0">
          {Array.from({ length: 12 }).map((_, i) => {
            const size = 30 + Math.random() * 50;
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            const delay = i * 0.5;
            const duration = 10 + Math.random() * 15;
            const rotation = Math.random() * 360;
            const shapeType = i % 3;
            
            return (
              <div
                key={`shape-${i}`}
                className="absolute border border-white/10"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  left: `${left}%`,
                  top: `${top}%`,
                  transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
                  animationName: 'shapeFloat',
                  animationDuration: `${duration}s`,
                  animationTimingFunction: 'ease-in-out',
                  animationIterationCount: 'infinite',
                  animationDelay: `${delay}s`,
                  clipPath: shapeType === 0 
                    ? 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' 
                    : shapeType === 1
                    ? 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'
                    : 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
                }}
              />
            );
          })}
        </div>
      )}

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="subtle-grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#subtle-grid)" />
        </svg>
      </div>
    </div>
  );
};

export default TechAnimatedBackground;
