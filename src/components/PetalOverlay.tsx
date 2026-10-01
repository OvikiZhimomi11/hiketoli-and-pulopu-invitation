import React from 'react';

interface PetalConfig {
  id: number;
  type: 'gold' | 'white';
  left: string;
  delay: string;
  duration: string;
  width: number;
  height: number;
  animType: 'animate-petal-left' | 'animate-petal-right' | 'animate-petal-tumble';
  opacity: number;
  initialRotate: number;
}

export const PetalOverlay: React.FC = () => {
  // Rich collection of gold and white floral petals with negative delays
  // so petals are immediately falling when the page loads
  const petals: PetalConfig[] = [
    // Left side petals
    { id: 1, type: 'gold', left: '3%', delay: '-2.5s', duration: '11s', width: 22, height: 28, animType: 'animate-petal-right', opacity: 0.85, initialRotate: 24 },
    { id: 2, type: 'white', left: '8%', delay: '-7s', duration: '13s', width: 24, height: 32, animType: 'animate-petal-left', opacity: 0.8, initialRotate: -35 },
    { id: 3, type: 'gold', left: '14%', delay: '-1s', duration: '10s', width: 18, height: 24, animType: 'animate-petal-tumble', opacity: 0.9, initialRotate: 45 },
    { id: 4, type: 'white', left: '19%', delay: '-4.8s', duration: '12.5s', width: 26, height: 34, animType: 'animate-petal-right', opacity: 0.75, initialRotate: -15 },
    { id: 5, type: 'gold', left: '25%', delay: '-9.2s', duration: '14s', width: 20, height: 26, animType: 'animate-petal-left', opacity: 0.85, initialRotate: 60 },
    
    // Center-left petals
    { id: 6, type: 'white', left: '31%', delay: '-3.1s', duration: '11.5s', width: 28, height: 36, animType: 'animate-petal-tumble', opacity: 0.8, initialRotate: -40 },
    { id: 7, type: 'gold', left: '37%', delay: '-8.4s', duration: '12s', width: 17, height: 22, animType: 'animate-petal-right', opacity: 0.9, initialRotate: 15 },
    { id: 8, type: 'white', left: '42%', delay: '-0.5s', duration: '13.5s', width: 23, height: 30, animType: 'animate-petal-left', opacity: 0.75, initialRotate: -25 },
    { id: 9, type: 'gold', left: '48%', delay: '-6.2s', duration: '10.5s', width: 25, height: 32, animType: 'animate-petal-tumble', opacity: 0.85, initialRotate: 50 },

    // Center-right petals
    { id: 10, type: 'white', left: '54%', delay: '-2.1s', duration: '12s', width: 26, height: 33, animType: 'animate-petal-right', opacity: 0.8, initialRotate: -10 },
    { id: 11, type: 'gold', left: '60%', delay: '-7.6s', duration: '13s', width: 19, height: 25, animType: 'animate-petal-left', opacity: 0.9, initialRotate: 35 },
    { id: 12, type: 'white', left: '66%', delay: '-4.3s', duration: '11s', width: 27, height: 35, animType: 'animate-petal-tumble', opacity: 0.75, initialRotate: -50 },
    { id: 13, type: 'gold', left: '72%', delay: '-10.1s', duration: '14.5s', width: 22, height: 29, animType: 'animate-petal-right', opacity: 0.85, initialRotate: 20 },

    // Right side petals
    { id: 14, type: 'white', left: '78%', delay: '-1.4s', duration: '12.5s', width: 24, height: 31, animType: 'animate-petal-left', opacity: 0.8, initialRotate: -30 },
    { id: 15, type: 'gold', left: '84%', delay: '-5.7s', duration: '10.8s', width: 20, height: 26, animType: 'animate-petal-tumble', opacity: 0.9, initialRotate: 40 },
    { id: 16, type: 'white', left: '90%', delay: '-8.9s', duration: '13s', width: 25, height: 33, animType: 'animate-petal-right', opacity: 0.75, initialRotate: -20 },
    { id: 17, type: 'gold', left: '95%', delay: '-3.7s', duration: '11.2s', width: 18, height: 24, animType: 'animate-petal-left', opacity: 0.85, initialRotate: 15 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden" aria-hidden="true">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className={`absolute top-0 ${petal.animType}`}
          style={{
            left: petal.left,
            animationDelay: petal.delay,
            animationDuration: petal.duration,
          }}
        >
          {petal.type === 'gold' ? (
            /* Metallic Gold Floral Petal */
            <div
              className="relative shadow-[0_2px_8px_rgba(212,175,55,0.35)] transition-transform"
              style={{
                width: `${petal.width}px`,
                height: `${petal.height}px`,
                transform: `rotate(${petal.initialRotate}deg)`,
                opacity: petal.opacity,
              }}
            >
              <svg viewBox="0 0 40 50" className="w-full h-full drop-shadow-sm">
                <defs>
                  <linearGradient id={`goldPetalGrad_${petal.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fff3b0" />
                    <stop offset="30%" stopColor="#f3cc61" />
                    <stop offset="70%" stopColor="#d4af37" />
                    <stop offset="100%" stopColor="#aa7c11" />
                  </linearGradient>
                </defs>
                {/* Curved Organic Rose Petal Shape */}
                <path
                  d="M 20,2 C 32,2 39,15 38,32 C 37,42 28,48 20,49 C 12,48 3,42 2,32 C 1,15 8,2 20,2 Z"
                  fill={`url(#goldPetalGrad_${petal.id})`}
                />
                {/* Subtle gold center rib/vein */}
                <path
                  d="M 20,8 C 21,20 20,38 20,45"
                  fill="none"
                  stroke="#ffe894"
                  strokeWidth="0.8"
                  opacity="0.6"
                />
              </svg>
            </div>
          ) : (
            /* Delicate White Silk Floral Petal */
            <div
              className="relative shadow-[0_2px_10px_rgba(255,255,255,0.25)] transition-transform"
              style={{
                width: `${petal.width}px`,
                height: `${petal.height}px`,
                transform: `rotate(${petal.initialRotate}deg)`,
                opacity: petal.opacity,
              }}
            >
              <svg viewBox="0 0 40 50" className="w-full h-full drop-shadow-sm">
                <defs>
                  <linearGradient id={`whitePetalGrad_${petal.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="45%" stopColor="#fcfbf7" />
                    <stop offset="85%" stopColor="#f4eee1" />
                    <stop offset="100%" stopColor="#e8dfce" />
                  </linearGradient>
                </defs>
                {/* Gracefully Flared White Petal */}
                <path
                  d="M 20,3 C 33,3 39,16 38,33 C 37,43 27,48 20,48 C 13,48 3,43 2,33 C 1,16 7,3 20,3 Z"
                  fill={`url(#whitePetalGrad_${petal.id})`}
                />
                {/* Translucent petal rim highlight */}
                <path
                  d="M 20,3 C 33,3 39,16 38,33"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="1"
                  opacity="0.8"
                />
                <path
                  d="M 20,10 C 20,22 19,38 20,44"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="0.75"
                  opacity="0.5"
                />
              </svg>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
