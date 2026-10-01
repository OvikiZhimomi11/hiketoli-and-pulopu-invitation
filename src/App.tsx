import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { WeddingEnvelope } from './components/WeddingEnvelope';
import { PetalOverlay } from './components/PetalOverlay';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenCard = () => {
    setIsOpen(true);
    confetti({
      particleCount: 75,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#d4af37', '#fdf5e6', '#f3d999', '#ffffff', '#e6a15c'],
    });
  };

  return (
    <div className="min-h-screen w-full bg-[#071d23] text-neutral-100 flex flex-col items-center justify-center relative overflow-y-auto selection:bg-amber-500/30 selection:text-amber-200 py-6 px-3 sm:px-6">
      {/* Background Animation: Gold & White Floral Petals Falling */}
      <PetalOverlay />

      {/* Ambient luxury lighting */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-40 -z-10"
        style={{
          background: 'radial-gradient(circle at 50% 50%, #10424d 0%, #08242b 60%, #041216 100%)',
        }}
      />

      {!isOpen ? (
        /* Middle of the screen: "Open the card" */
        <div className="relative z-10 flex flex-col items-center justify-center text-center animate-fade-in my-auto">
          <button
            onClick={handleOpenCard}
            className="group relative px-9 py-4 sm:px-12 sm:py-5 rounded-full bg-gradient-to-r from-[#e8c76b] via-[#f7e096] to-[#cf9c34] text-neutral-950 font-cinzel font-bold text-base sm:text-xl tracking-widest uppercase shadow-[0_10px_45px_rgba(212,175,55,0.45)] hover:shadow-[0_15px_60px_rgba(212,175,55,0.75)] hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-amber-200/90 cursor-pointer"
          >
            <span>Open the card</span>
          </button>
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
