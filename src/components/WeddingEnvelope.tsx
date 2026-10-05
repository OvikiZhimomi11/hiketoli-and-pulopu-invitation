import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, ExternalLink, Navigation } from 'lucide-react';

interface WeddingEnvelopeProps {
  onReset: () => void;
}

const GOOGLE_MAPS_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d57411.54054153899!2d94.445023!3d25.927958!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3747cbbe1cc34565%3A0x6bad69a99a1ff912!2sSTBC!5e0!3m2!1sen!2sus!4v1791174011809!5m2!1sen!2sus';
const GOOGLE_MAPS_DIRECTIONS_URL =
  'https://www.google.com/maps/place/STBC/@25.927958,94.445023,15z/data=!4m6!3m5!1s0x3747cbbe1cc34565:0x6bad69a99a1ff912!8m2!3d25.927958!4d94.445023!16s%2Fg%2F11b6d0v_9_';

/**
 * Elegant Countdown Timer to October 20, 2026, 10:00 A.M. using font-cinzel style
 */
const WeddingCountdown: React.FC = () => {
  // Wedding Date: Tuesday, October 20, 2026 at 10:00 A.M. IST (UTC+05:30)
  const targetTime = new Date('2026-10-20T10:00:00+05:30').getTime();

  const calculateTimeRemaining = () => {
    const now = Date.now();
    const difference = targetTime - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isPast: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeRemaining);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(interval);
  }, [targetTime]);

  if (timeLeft.isPast) {
    return (
      <div className="my-1 py-0.5 px-3 rounded-full bg-amber-500/10 border border-amber-400/30">
        <span className="font-cinzel text-[11px] font-bold text-[#c59b27] tracking-widest uppercase">
          Today We Celebrate Holy Matrimony
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center my-1">
      <div className="flex items-center justify-center gap-2.5 sm:gap-3.5 font-cinzel select-none">
        {/* Days */}
        <div className="flex flex-col items-center">
          <span className="text-xs sm:text-sm font-bold text-[#c59b27] leading-none tracking-tight">
            {String(timeLeft.days).padStart(2, '0')}
          </span>
          <span className="text-[7.5px] sm:text-[8px] uppercase tracking-wider text-[#142e47] font-semibold mt-0.5">
            Days
          </span>
        </div>

        <span className="text-[#c59b27] text-xs font-light pb-2 select-none">:</span>

        {/* Hours */}
        <div className="flex flex-col items-center">
          <span className="text-xs sm:text-sm font-bold text-[#c59b27] leading-none tracking-tight">
            {String(timeLeft.hours).padStart(2, '0')}
          </span>
          <span className="text-[7.5px] sm:text-[8px] uppercase tracking-wider text-[#142e47] font-semibold mt-0.5">
            Hours
          </span>
        </div>

        <span className="text-[#c59b27] text-xs font-light pb-2 select-none">:</span>

        {/* Minutes */}
        <div className="flex flex-col items-center">
          <span className="text-xs sm:text-sm font-bold text-[#c59b27] leading-none tracking-tight">
            {String(timeLeft.minutes).padStart(2, '0')}
          </span>
          <span className="text-[7.5px] sm:text-[8px] uppercase tracking-wider text-[#142e47] font-semibold mt-0.5">
            Mins
          </span>
        </div>

        <span className="text-[#c59b27] text-xs font-light pb-2 select-none">:</span>

        {/* Seconds */}
        <div className="flex flex-col items-center">
          <span className="text-xs sm:text-sm font-bold text-[#c59b27] leading-none tracking-tight">
            {String(timeLeft.seconds).padStart(2, '0')}
          </span>
          <span className="text-[7.5px] sm:text-[8px] uppercase tracking-wider text-[#142e47] font-semibold mt-0.5">
            Secs
          </span>
        </div>
      </div>
    </div>
  );
};

export const WeddingEnvelope: React.FC<WeddingEnvelopeProps> = ({ onReset }) => {
  // Start with 'cover' first right after clicking "Open the card"
  const [activeSide, setActiveSide] = useState<'inside' | 'cover' | 'map'>('cover');

  return (
    <div className="w-full max-w-2xl flex flex-col items-center justify-center animate-fade-in my-auto py-2">
      {/* Top Simple Navigation */}
      <div className="w-full max-w-[420px] flex items-center justify-between gap-1.5 mb-3 bg-neutral-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-amber-500/25 shadow-lg">
        <button
          onClick={onReset}
          className="flex items-center gap-1 text-xs font-cinzel text-amber-300 hover:text-amber-100 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setActiveSide('cover')}
            className={`px-2.5 py-1 rounded-full text-xs font-cinzel transition-all cursor-pointer ${
              activeSide === 'cover'
                ? 'bg-amber-500/30 text-amber-200 border border-amber-400/40 font-semibold'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Cover
          </button>

          <button
            onClick={() => setActiveSide('inside')}
            className={`px-2.5 py-1 rounded-full text-xs font-cinzel transition-all cursor-pointer ${
              activeSide === 'inside'
                ? 'bg-amber-500/30 text-amber-200 border border-amber-400/40 font-semibold'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Invitation
          </button>

          <button
            onClick={() => setActiveSide('map')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-cinzel transition-all cursor-pointer ${
              activeSide === 'map'
                ? 'bg-amber-500/30 text-amber-200 border border-amber-400/40 font-semibold'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <MapPin className="w-3 h-3 text-amber-400" />
            <span>Google Map</span>
          </button>
        </div>
      </div>

      {/* The Wedding Card Container */}
      <div className="w-full flex flex-col items-center justify-center">
        <div className="w-full max-w-[410px] sm:max-w-[430px]">
          {activeSide === 'cover' && (
            <CardCover onFlip={() => setActiveSide('inside')} />
          )}
          {activeSide === 'inside' && (
            <CardInside 
              onFlip={() => setActiveSide('cover')} 
              onOpenMap={() => setActiveSide('map')} 
            />
          )}
          {activeSide === 'map' && <CardVenueMap />}
        </div>
      </div>
    </div>
  );
};

/**
 * PAGE 2: Exact Pixel-Faithful Wedding Card from User's Uploaded Image
 */
interface CardInsideProps {
  onFlip: () => void;
  onOpenMap: () => void;
}

const CardInside: React.FC<CardInsideProps> = ({ onFlip, onOpenMap }) => {
  return (
    <div
      onClick={onFlip}
      className="cursor-pointer relative w-full aspect-[1/1.52] bg-white rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.55)] border border-neutral-200 p-5 sm:p-7 flex flex-col items-center justify-between text-center select-none transition-transform hover:scale-[1.005]"
    >
      {/* SECTION 1: Top Monogram Wreath & Scripture */}
      <div className="relative z-10 flex flex-col items-center w-full pt-1">
        {/* Soft Slate Blue Floral Wreath with Gold H & P Monogram */}
        <div className="relative w-36 h-28 sm:w-40 sm:h-32 flex items-center justify-center">
          <svg viewBox="0 0 200 160" className="w-full h-full">
            <defs>
              <linearGradient id="goldHPMono" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f3de98" />
                <stop offset="50%" stopColor="#c59b27" />
                <stop offset="100%" stopColor="#9b7218" />
              </linearGradient>
            </defs>

            {/* Oval slate-blue botanical foliage wreath matching the uploaded image */}
            <g stroke="#55758d" fill="none" strokeWidth="1.2" strokeLinecap="round" opacity="0.9">
              <path d="M 100,20 C 60,20 30,55 35,95 C 40,125 70,145 100,148" />
              <path d="M 32,85 C 24,70 30,50 45,35" strokeWidth="0.8" />
              <path d="M 40,110 C 35,125 55,140 75,146" strokeWidth="0.8" />
              <path d="M 100,20 C 140,20 170,55 165,95 C 160,125 130,145 100,148" />
              <path d="M 168,85 C 176,70 170,50 155,35" strokeWidth="0.8" />
              <path d="M 160,110 C 165,125 145,140 125,146" strokeWidth="0.8" />
            </g>

            {/* Leaves and floral sprigs in slate-blue */}
            <g fill="#55758d" stroke="none" opacity="0.85">
              {[
                { cx: 45, cy: 40, r: 3 }, { cx: 58, cy: 30, r: 2.5 }, { cx: 75, cy: 23, r: 3 },
                { cx: 33, cy: 62, r: 3.2 }, { cx: 31, cy: 80, r: 3 }, { cx: 35, cy: 100, r: 3 },
                { cx: 48, cy: 125, r: 3.5 }, { cx: 68, cy: 140, r: 3 }, { cx: 88, cy: 146, r: 2.8 },
                { cx: 155, cy: 40, r: 3 }, { cx: 142, cy: 30, r: 2.5 }, { cx: 125, cy: 23, r: 3 },
                { cx: 167, cy: 62, r: 3.2 }, { cx: 169, cy: 80, r: 3 }, { cx: 165, cy: 100, r: 3 },
                { cx: 152, cy: 125, r: 3.5 }, { cx: 132, cy: 140, r: 3 }, { cx: 112, cy: 146, r: 2.8 },
                { cx: 50, cy: 55, r: 2 }, { cx: 62, cy: 40, r: 2.2 }, { cx: 85, cy: 28, r: 2 },
                { cx: 150, cy: 55, r: 2 }, { cx: 138, cy: 40, r: 2.2 }, { cx: 115, cy: 28, r: 2 },
                { cx: 42, cy: 115, r: 2 }, { cx: 158, cy: 115, r: 2 },
              ].map((dot, i) => (
                <circle key={i} cx={dot.cx} cy={dot.cy} r={dot.r} />
              ))}
            </g>

            {/* Monogram: H, - & -, P */}
            <text
              x="100"
              y="68"
              textAnchor="middle"
              fill="url(#goldHPMono)"
              className="font-script"
              style={{ fontSize: '38px', fontStyle: 'italic', fontWeight: 500 }}
            >
              H
            </text>
            <text
              x="100"
              y="85"
              textAnchor="middle"
              fill="url(#goldHPMono)"
              className="font-cormorant"
              style={{ fontSize: '14px', fontStyle: 'italic' }}
            >
              - & -
            </text>
            <text
              x="100"
              y="120"
              textAnchor="middle"
              fill="url(#goldHPMono)"
              className="font-script"
              style={{ fontSize: '38px', fontStyle: 'italic', fontWeight: 500 }}
            >
              P
            </text>
          </svg>
        </div>

        {/* Bible Verse */}
        <div className="mt-1 px-3 text-[#1a365d] leading-tight">
          <p className="font-cormorant italic text-[12.5px] sm:text-[14px] leading-snug">
            May your constant love be with us, Lord,<br />
            as we put our hope in you.
          </p>
          <p className="font-cormorant italic font-semibold text-[11.5px] sm:text-[12.5px] mt-0.5 text-[#55758d]">
            Psalm 33:22
          </p>
        </div>
      </div>

      {/* SECTION 2: Announcement & Couple Name */}
      <div className="relative z-10 flex flex-col items-center w-full my-auto px-2">
        <p className="font-cormorant font-bold text-[#142e47] text-[13px] sm:text-[14.5px] tracking-wide">
          With the blessings of Almighty God and our families
        </p>

        {/* "We" with dividers */}
        <div className="flex items-center justify-center gap-3 my-1 w-full max-w-[200px]">
          <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#c59b27]/40 to-slate-400" />
          <span className="font-script text-3xl sm:text-4xl text-[#142e47] italic">
            We
          </span>
          <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#c59b27]/40 to-slate-400" />
        </div>

        {/* Couple's Name in Golden Calligraphy */}
        <h1 
          className="font-script text-3xl sm:text-4xl md:text-[42px] leading-tight my-1 select-none"
          style={{
            background: 'linear-gradient(135deg, #f5df9a 0%, #c4962e 45%, #9b7218 85%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 1px 2px rgba(180, 140, 40, 0.25))',
          }}
        >
          Hikety & Wilson
        </h1>

        {/* Symmetrical Parents' Columns */}
        <div className="grid grid-cols-2 gap-3 w-full max-w-sm my-1.5 text-center text-[#142e47]">
          {/* Bride Parents Column */}
          <div className="flex flex-col items-center border-r border-[#c59b27]/30 pr-2">
            <span className="font-cormorant text-sm sm:text-base font-bold text-[#142e47]">
              D/o
            </span>
            <span className="font-cormorant text-xs sm:text-[13.5px] font-semibold text-[#142e47] leading-snug mt-0.5">
              Mrs. Kheshili T. Jimo
            </span>
            <span className="font-cormorant text-xs sm:text-[13px] text-[#c59b27] leading-none my-0.5">
              &
            </span>
            <span className="font-cormorant text-xs sm:text-[13.5px] font-semibold text-[#142e47] leading-snug">
              Late Er. K. Tosuho Sema
            </span>
          </div>

          {/* Groom Parents Column */}
          <div className="flex flex-col items-center pl-2">
            <span className="font-cormorant text-sm sm:text-base font-bold text-[#142e47]">
              S/o
            </span>
            <span className="font-cormorant text-xs sm:text-[13.5px] font-semibold text-[#142e47] leading-snug mt-0.5">
              Late Mrs. Keluonguü Helena Khruomo
            </span>
            <span className="font-cormorant text-xs sm:text-[13px] text-[#c59b27] leading-none my-0.5">
              &
            </span>
            <span className="font-cormorant text-xs sm:text-[13.5px] font-semibold text-[#142e47] leading-snug">
              Late Mr. N. Kughavi Zhimomi
            </span>
          </div>
        </div>

        {/* Cordially request text */}
        <p className="font-cormorant font-semibold text-[12px] sm:text-[13.5px] text-[#142e47] max-w-xs sm:max-w-sm leading-snug mt-1.5">
          Cordially request the honour of your presence and prayers<br />
          as we join hands in holy matrimony on
        </p>
      </div>

      {/* SECTION 3: Date, Time, Venue & Countdown */}
      <div className="relative z-10 flex flex-col items-center w-full pb-1">
        {/* Month */}
        <span className="font-cormorant text-xs sm:text-sm text-[#142e47] tracking-wider uppercase font-semibold">
          October
        </span>

        {/* Date Row: Tuesday || 20 || 10:00 A.M */}
        <div className="flex items-center justify-center gap-3 my-0.5">
          <span className="font-cormorant text-base sm:text-lg font-bold text-[#142e47]">
            Tuesday
          </span>

          <div className="flex gap-0.5 h-6 items-center">
            <span className="w-[1.5px] h-full bg-[#c59b27]" />
            <span className="w-[1.5px] h-full bg-[#c59b27]" />
          </div>

          <span className="font-cormorant text-2xl sm:text-3xl font-bold text-[#142e47] leading-none px-1">
            20
          </span>

          <div className="flex gap-0.5 h-6 items-center">
            <span className="w-[1.5px] h-full bg-[#c59b27]" />
            <span className="w-[1.5px] h-full bg-[#c59b27]" />
          </div>

          <span className="font-cormorant text-base sm:text-lg font-bold text-[#142e47]">
            10:00 A.M
          </span>
        </div>

        <span className="font-cormorant text-xs sm:text-sm text-[#142e47] font-semibold tracking-wider">
          2026
        </span>

        {/* Church Venue */}
        <h3 className="font-cormorant font-bold text-base sm:text-lg text-[#142e47] mt-1 tracking-wide">
          Satakha Town Baptist Church
        </h3>

        {/* Elegant Countdown Timer */}
        <WeddingCountdown />

        {/* Clean Google Maps Direct Action Button / Placeholder */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpenMap();
          }}
          className="my-1.5 px-4 py-1.5 rounded-full bg-[#142e47] hover:bg-[#1a3a58] text-amber-200 border border-amber-400/50 shadow-sm transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5 text-xs font-cinzel font-semibold cursor-pointer"
        >
          <MapPin className="w-3.5 h-3.5 text-amber-400" />
          <span>Open in Google Maps</span>
          <ExternalLink className="w-3 h-3 text-amber-300" />
        </button>

        {/* Bottom Vintage Golden Flourish SVG */}
        <div className="w-36 sm:w-44 h-4 mt-0.5 flex items-center justify-center opacity-85">
          <svg viewBox="0 0 180 32" className="w-full h-full text-[#c59b27]">
            <path
              d="M 20,16 C 40,6 60,26 80,16 C 85,13 90,19 95,16 C 115,26 135,6 160,16"
              fill="none"
              stroke="#c59b27"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M 65,16 C 75,8 85,24 95,16 C 105,8 115,24 125,16"
              fill="none"
              stroke="#c59b27"
              strokeWidth="1.2"
              opacity="0.7"
            />
            <circle cx="90" cy="16" r="3.5" fill="#c59b27" />
            <circle cx="45" cy="16" r="2" fill="#c59b27" />
            <circle cx="135" cy="16" r="2" fill="#c59b27" />
          </svg>
        </div>
      </div>
    </div>
  );
};

/**
 * Dedicated Venue Card: Interactive Live Google Map View
 */
const CardVenueMap: React.FC = () => {
  return (
    <div className="relative w-full aspect-[1/1.52] bg-[#fdfcf9] rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.65)] border border-[#d8cdb8] p-5 sm:p-6 flex flex-col items-center justify-between text-center select-none animate-fade-in overflow-hidden">
      {/* Luxury Double Gold Hairline Inset */}
      <div className="absolute inset-2 sm:inset-2.5 border border-[#d4af37]/35 rounded-lg pointer-events-none" />
      <div className="absolute inset-3 sm:inset-3.5 border border-[#d4af37]/15 rounded-md pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-10 flex flex-col items-center w-full pt-1">
        <span className="font-cinzel text-xs text-[#c59b27] tracking-[0.25em] uppercase font-semibold">
          Wedding Venue & Location
        </span>
        <h2 className="font-cormorant font-bold text-xl sm:text-2xl text-[#142e47] mt-0.5">
          Satakha Town Baptist Church
        </h2>
        <p className="font-cormorant italic text-xs sm:text-sm text-[#142e47]/80">
          Satakha, Zunheboto District, Nagaland
        </p>
      </div>

      {/* Live Interactive Google Map Embed (Exact STBC place pin) */}
      <div className="relative z-10 w-full my-auto rounded-xl overflow-hidden border-2 border-[#c59b27]/40 shadow-inner bg-slate-100 aspect-[4/3]">
        <iframe
          title="Satakha Town Baptist Church (STBC) Google Map"
          src={GOOGLE_MAPS_EMBED_URL}
          className="w-full h-full border-0"
          loading="lazy"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>

      {/* Navigation Action */}
      <div className="relative z-10 flex flex-col items-center w-full pb-1">
        {/* Google Maps External Button */}
        <a
          href={GOOGLE_MAPS_DIRECTIONS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full max-w-[240px] py-2.5 px-4 rounded-full bg-gradient-to-r from-[#e8c76b] via-[#faeaae] to-[#cf9c34] text-neutral-950 font-cinzel font-bold text-xs tracking-wider uppercase shadow-md hover:shadow-lg hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-2 border border-amber-200 cursor-pointer"
        >
          <Navigation className="w-3.5 h-3.5 fill-current" />
          <span>Get Directions</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
};

/**
 * PAGE 1: Card Cover (Teal & Gold)
 */
const CardCover: React.FC<{ onFlip: () => void }> = ({ onFlip }) => {
  return (
    <div
      onClick={onFlip}
      className="cursor-pointer relative w-full aspect-[1/1.52] rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.85)] border border-amber-400/40 p-6 flex flex-col items-center justify-between text-center select-none transition-transform hover:scale-[1.005]"
      style={{
        backgroundColor: '#0c3843',
        backgroundImage: 'radial-gradient(circle at 50% 35%, #154c5a 0%, #0a2f38 75%, #051d23 100%)',
      }}
    >
      <div className="absolute inset-3 border border-amber-400/30 rounded-lg pointer-events-none" />
      <div className="absolute inset-4 border border-amber-300/15 rounded-md pointer-events-none" />

      <div className="h-4" />

      {/* Centerpiece: Golden Foliage Wreath with Calligraphic Monogram */}
      <div className="flex flex-col items-center justify-center relative my-auto w-full">
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 max-w-[85%] flex items-center justify-center">
          <svg viewBox="0 0 300 300" className="w-full h-full text-amber-300 drop-shadow-md">
            <defs>
              <linearGradient id="goldGradCoverClean2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fceda4" />
                <stop offset="35%" stopColor="#d4af37" />
                <stop offset="70%" stopColor="#aa7c19" />
                <stop offset="100%" stopColor="#fed25a" />
              </linearGradient>
            </defs>

            <path
              d="M 60,150 C 60,80 120,45 180,45 C 220,45 250,75 255,120 C 260,170 230,230 160,250 C 100,265 60,210 60,150"
              fill="none"
              stroke="url(#goldGradCoverClean2)"
              strokeWidth="2.5"
              strokeDasharray="4 2"
              opacity="0.9"
            />
            <path
              d="M 50,170 C 45,120 75,70 140,50 C 190,35 240,65 250,105"
              fill="none"
              stroke="url(#goldGradCoverClean2)"
              strokeWidth="1.8"
              opacity="0.9"
            />
            {[
              { cx: 70, cy: 90, r: 4 }, { cx: 105, cy: 60, r: 5 }, { cx: 155, cy: 45, r: 6 },
              { cx: 210, cy: 55, r: 5 }, { cx: 245, cy: 90, r: 5 }, { cx: 255, cy: 140, r: 6 },
              { cx: 235, cy: 195, r: 5 }, { cx: 190, cy: 240, r: 6 }, { cx: 130, cy: 255, r: 5 },
              { cx: 80, cy: 220, r: 6 }, { cx: 55, cy: 155, r: 5 },
            ].map((leaf, i) => (
              <g key={i}>
                <circle cx={leaf.cx} cy={leaf.cy} r={leaf.r} fill="url(#goldGradCoverClean2)" />
                <circle cx={leaf.cx} cy={leaf.cy} r={leaf.r * 1.5} fill="none" stroke="url(#goldGradCoverClean2)" strokeWidth="0.8" opacity="0.6" />
              </g>
            ))}

            {/* Monogram Initials inside SVG: Eliminates HTML line-box and background-clip descender clipping */}
            <text
              x="150"
              y="118"
              textAnchor="middle"
              fill="url(#goldGradCoverClean2)"
              className="font-script"
              style={{ fontSize: '76px', fontStyle: 'italic', fontWeight: 500 }}
            >
              H
            </text>
            <text
              x="150"
              y="152"
              textAnchor="middle"
              fill="url(#goldGradCoverClean2)"
              className="font-cormorant"
              style={{ fontSize: '26px', fontStyle: 'italic' }}
            >
              - & -
            </text>
            <text
              x="150"
              y="222"
              textAnchor="middle"
              fill="url(#goldGradCoverClean2)"
              className="font-script"
              style={{ fontSize: '76px', fontStyle: 'italic', fontWeight: 500 }}
            >
              P
            </text>
          </svg>
        </div>

        {/* Date */}
        <div className="mt-4">
          <span className="font-cinzel text-amber-300 text-sm sm:text-base tracking-[0.35em] font-semibold drop-shadow">
            2 0 - 1 0 - 2 0 2 6
          </span>
        </div>
      </div>

      <div className="text-[10px] text-amber-300/60 font-cinzel tracking-widest uppercase pb-1">
        Tap to open inside
      </div>
    </div>
  );
};
