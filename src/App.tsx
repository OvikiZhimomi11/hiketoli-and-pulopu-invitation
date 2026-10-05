import React, { useState } from 'react';
import { WeddingEnvelope } from './components/WeddingEnvelope';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenCard = () => {
    setIsOpen(true);
  };

  return (
    <div className="min-h-screen w-full bg-[#06181d] text-neutral-100 flex flex-col items-center justify-center relative overflow-y-auto selection:bg-amber-500/30 selection:text-amber-200 py-6 px-3 sm:px-6">
      {/* Ambient luxury lighting */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-50 -z-10"
        style={{
          background: 'radial-gradient(circle at 50% 45%, #10424d 0%, #07232b 55%, #030e12 100%)',
        }}
      />

      {/* Subtle background golden dust aura */}
      <div 
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[500px] h-[340px] sm:h-[500px] rounded-full pointer-events-none opacity-20 -z-10 blur-3xl"
        style={{
          background: 'radial-gradient(circle, #e8c76b 0%, rgba(212,175,55,0.2) 40%, transparent 70%)',
        }}
      />

      {!isOpen ? (
        /* Only the "Open the card" button in the center */
        <div className="relative z-10 flex flex-col items-center justify-center text-center animate-fade-in my-auto">
          <div className="relative group">
            {/* Ambient gold glow */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 opacity-40 group-hover:opacity-75 blur-md transition duration-500" />
            
            <button
              onClick={handleOpenCard}
              className="relative px-9 py-3.5 sm:px-11 sm:py-4 rounded-full bg-gradient-to-r from-[#e8c76b] via-[#faeaae] to-[#cf9c34] text-neutral-950 font-cinzel font-bold text-xs sm:text-sm tracking-[0.25em] uppercase shadow-[0_10px_35px_rgba(212,175,55,0.4)] hover:shadow-[0_15px_45px_rgba(212,175,55,0.7)] hover:scale-105 active:scale-95 transition-all duration-300 border border-amber-100/90 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Open the card</span>
            </button>
          </div>
        </div>
      ) : (
        /* The Wedding Card */
        <div className="relative z-10 w-full flex flex-col items-center justify-center my-auto">
          <WeddingEnvelope onReset={() => setIsOpen(false)} />
        </div>
      )}
    </div>
  );
}
