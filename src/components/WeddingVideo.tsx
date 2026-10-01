import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Play, Pause, Maximize2, SkipForward, SkipBack, Share2, ArrowLeft } from 'lucide-react';
import { videoScenes } from '../data/weddingData';

interface WeddingVideoProps {
  onOpenCard: () => void;
  onBack?: () => void;
}

export const WeddingVideo: React.FC<WeddingVideoProps> = ({
  onOpenCard,
  onBack,
}) => {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentScene = videoScenes[currentSceneIndex];
  const totalScenes = videoScenes.length;

  // Handle scene playback & progress loop
  useEffect(() => {
    if (!isPlaying) return;

    const interval = 100; // update every 100ms
    const totalDurationMs = currentScene.duration * 1000;
    const step = (interval / totalDurationMs) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentSceneIndex((idx) => (idx + 1) % totalScenes);
          return 0;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isPlaying, currentScene.duration, totalScenes]);

  const handleNext = () => {
    setProgress(0);
    setCurrentSceneIndex((idx) => (idx + 1) % totalScenes);
  };

  const handlePrev = () => {
    setProgress(0);
    setCurrentSceneIndex((idx) => (idx - 1 + totalScenes) % totalScenes);
  };

  const handleOpenCardClick = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#f5d061', '#e6af2e', '#fcf6bd', '#d4af37', '#ffffff'],
    });
    onOpenCard();
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  return (
    <div className="w-full max-w-5xl flex flex-col items-center">
      {/* Top back bar if available */}
      {onBack && (
        <div className="w-full flex items-center justify-start mb-3 px-2">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-900/90 hover:bg-neutral-800 text-amber-200 text-xs font-cinzel border border-amber-500/25 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>
        </div>
      )}

      {/* Main Video Viewport */}
      <div
        ref={containerRef}
        className="relative w-full aspect-video md:aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl bg-neutral-950 border border-amber-900/30 group select-none"
      >
        {/* Film Scenes with Ken Burns movement */}
        {videoScenes.map((scene, idx) => {
          const isActive = idx === currentSceneIndex;
          return (
            <div
              key={scene.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <img
                src={scene.image}
                alt={scene.title}
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover transform duration-[7000ms] ease-out ${
                  isActive ? 'scale-110 translate-y-1' : 'scale-100'
                }`}
              />

              {/* Scrims */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-neutral-950/50" />
              <div className="absolute inset-0 bg-radial from-transparent via-transparent to-neutral-950/80" />

              {/* Subtitles & Captions */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 pb-24 md:pb-28 max-w-3xl pointer-events-none">
                <span className="text-amber-400 font-cinzel text-xs md:text-sm tracking-[0.25em] uppercase mb-2 drop-shadow-md">
                  {scene.subtitle}
                </span>
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-cormorant font-semibold text-white tracking-wide leading-tight mb-2 drop-shadow-lg">
                  {scene.title}
                </h2>
                <p className="text-sm md:text-lg font-cormorant italic text-neutral-200/90 leading-relaxed max-w-xl drop-shadow">
                  {scene.quote}
                </p>
              </div>
            </div>
          );
        })}

        {/* Top Badge */}
        <div className="absolute top-4 left-4 z-20 pointer-events-none">
          <div className="flex items-center gap-2 bg-neutral-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-amber-500/20 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span className="text-xs font-cinzel text-amber-200 tracking-wider">
              Wedding Video · Hiketoli & Pulopu Wilson
            </span>
          </div>
        </div>

        {/* Center Button: Rings on one side, Wedding couples decor on the other side */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
          <button
            onClick={handleOpenCardClick}
            className="group/btn relative px-7 py-3.5 sm:px-9 sm:py-4 rounded-full bg-gradient-to-r from-[#e8c76b] via-[#f7e096] to-[#cf9c34] text-neutral-950 font-cinzel font-bold text-sm sm:text-base tracking-widest uppercase shadow-[0_0_35px_rgba(245,208,97,0.6)] hover:shadow-[0_0_55px_rgba(245,208,97,0.85)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-3 border-2 border-amber-200 cursor-pointer"
          >
            {/* Left side: Rings emoji */}
            <span className="text-2xl sm:text-3xl select-none group-hover:scale-110 transition-transform">
              💍
            </span>

            <span>Open the card</span>

            {/* Right side: Wedding couple decor PNG */}
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border border-amber-800/40 bg-neutral-950 shadow-sm flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <img
                src="/src/assets/images/wedding_couple_decor_1790875175902.jpg"
                alt="Wedding couple decor"
                className="w-full h-full object-cover"
              />
            </div>
          </button>
          <span className="mt-2.5 text-xs text-amber-200 font-cinzel tracking-wider drop-shadow bg-neutral-950/70 backdrop-blur-xs px-3.5 py-1 rounded-full border border-amber-400/20">
            Tap to view wedding invitation card
          </span>
        </div>

        {/* Bottom Scrubber & Controls */}
        <div className="absolute bottom-0 inset-x-0 z-20 p-4 sm:p-6 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent">
          {/* Timeline Bar */}
          <div className="flex items-center gap-1.5 mb-3">
            {videoScenes.map((_, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setCurrentSceneIndex(idx);
                  setProgress(0);
                }}
                className="h-1 flex-1 bg-white/20 hover:bg-white/40 cursor-pointer rounded-full overflow-hidden transition-colors"
              >
                <div
                  className={`h-full bg-amber-400 transition-all ${
                    idx < currentSceneIndex
                      ? 'w-full'
                      : idx === currentSceneIndex
                      ? 'duration-100 ease-linear'
                      : 'w-0'
                  }`}
                  style={{
                    width: idx === currentSceneIndex ? `${progress}%` : undefined,
                  }}
                />
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between text-neutral-300 text-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2 rounded-full hover:bg-white/10 text-white transition-colors"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
              </button>
              <button
                onClick={handlePrev}
                className="p-1.5 rounded-full hover:bg-white/10 text-neutral-300 transition-colors"
                title="Previous scene"
              >
                <SkipBack className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-1.5 rounded-full hover:bg-white/10 text-neutral-300 transition-colors"
                title="Next scene"
              >
                <SkipForward className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleFullscreen}
                className="p-1.5 rounded-full hover:bg-white/10 text-neutral-300 transition-colors"
                title="Fullscreen"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
