import React, { useState, useEffect } from 'react';
import { RotateCw, ArrowLeft, MapPin, ExternalLink, Navigation, X, Camera, Compass } from 'lucide-react';

interface WeddingEnvelopeProps {
  onReset: () => void;
}

// Default realistic church photo & stylized map graphic
const DEFAULT_CHURCH_PHOTO = '/src/assets/images/satakha_church_real_photo_1790878984943.jpg';
const STYLIZED_MAP_GRAPHIC = '/src/assets/images/stylized_wedding_venue_map_1790876897182.jpg';

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
    <div className="flex flex-col items-center my-0.5">
      <div className="flex items-center justify-center gap-2.5 sm:gap-3.5 font-cinzel select-none">
        {/* Days */}
        <div className="flex flex-col items-center">
          <span className="text-xs sm:text-sm font-bold text-[#c59b27] leading-none tracking-tight">
            {String(timeLeft.days).padStart(2, '0')}
          </span>
          <span className="text-[7px] sm:text-[7.5px] uppercase tracking-wider text-[#142e47] font-semibold mt-0.5">
            Days
          </span>
        </div>

        <span className="text-[#c59b27] text-xs font-light pb-2 select-none">:</span>

        {/* Hours */}
        <div className="flex flex-col items-center">
          <span className="text-xs sm:text-sm font-bold text-[#c59b27] leading-none tracking-tight">
            {String(timeLeft.hours).padStart(2, '0')}
          </span>
          <span className="text-[7px] sm:text-[7.5px] uppercase tracking-wider text-[#142e47] font-semibold mt-0.5">
            Hours
          </span>
        </div>

        <span className="text-[#c59b27] text-xs font-light pb-2 select-none">:</span>

        {/* Minutes */}
        <div className="flex flex-col items-center">
          <span className="text-xs sm:text-sm font-bold text-[#c59b27] leading-none tracking-tight">
            {String(timeLeft.minutes).padStart(2, '0')}
          </span>
          <span className="text-[7px] sm:text-[7.5px] uppercase tracking-wider text-[#142e47] font-semibold mt-0.5">
            Mins
          </span>
        </div>

        <span className="text-[#c59b27] text-xs font-light pb-2 select-none">:</span>

        {/* Seconds */}
        <div className="flex flex-col items-center">
          <span className="text-xs sm:text-sm font-bold text-[#c59b27] leading-none tracking-tight">
            {String(timeLeft.seconds).padStart(2, '0')}
          </span>
          <span className="text-[7px] sm:text-[7.5px] uppercase tracking-wider text-[#142e47] font-semibold mt-0.5">
            Secs
          </span>
        </div>
      </div>
    </div>
  );
};

export const WeddingEnvelope: React.FC<WeddingEnvelopeProps> = ({ onReset }) => {
  const [activeSide, setActiveSide] = useState<'inside' | 'cover' | 'map'>('inside');
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [churchImage, setChurchImage] = useState<string>(DEFAULT_CHURCH_PHOTO);

  const handleOpenMap = () => {
    setIsMapModalOpen(true);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setChurchImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

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
            <span>Venue & Church</span>
          </button>

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
        </div>
      </div>

      {/* The Wedding Card Container */}
      <div className="w-full flex flex-col items-center justify-center">
        <div className="w-full max-w-[410px] sm:max-w-[430px]">
          {activeSide === 'inside' && (
            <CardInside
              churchImage={churchImage}
              onFlip={() => setActiveSide('cover')}
              onOpenMap={handleOpenMap}
            />
          )}
          {activeSide === 'map' && (
            <CardVenueMap
              churchImage={churchImage}
              onBackToCard={() => setActiveSide('inside')}
              onUploadCustomPhoto={handleImageUpload}
            />
          )}
          {activeSide === 'cover' && (
            <CardCover onFlip={() => setActiveSide('inside')} />
          )}
        </div>

        {/* Quick Flip Prompt */}
        <div className="mt-3 flex items-center justify-center gap-3 text-xs font-cinzel text-amber-300/80">
          {activeSide !== 'inside' && (
            <button
              onClick={() => setActiveSide('inside')}
              className="flex items-center gap-1 hover:text-amber-100 transition-colors cursor-pointer"
            >
              <RotateCw className="w-3 h-3" />
              <span>View Invitation Card</span>
            </button>
          )}
          {activeSide !== 'map' && (
            <button
              onClick={() => setActiveSide('map')}
              className="flex items-center gap-1 hover:text-amber-100 transition-colors cursor-pointer"
            >
              <MapPin className="w-3 h-3 text-amber-400" />
              <span>View Church Photo & Location</span>
            </button>
          )}
        </div>
      </div>

      {/* Real Church & Location Modal */}
      {isMapModalOpen && (
        <VenueMapModal
          churchImage={churchImage}
          onClose={() => setIsMapModalOpen(false)}
        />
      )}
    </div>
  );
};

/**
 * PAGE 2: Exact Pixel-Faithful Wedding Card
 * Displays the real photograph of Satakha Town Baptist Church!
 */
const CardInside: React.FC<{
  churchImage: string;
  onFlip: () => void;
  onOpenMap: () => void;
}> = ({ churchImage, onFlip, onOpenMap }) => {
  return (
    <div
      onClick={onFlip}
      className="cursor-pointer relative w-full aspect-[1/1.52] bg-white rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.55)] border border-neutral-200 p-4 sm:p-6 flex flex-col items-center justify-between text-center select-none transition-transform hover:scale-[1.005]"
    >
      {/* SECTION 1: Top Monogram Wreath & Scripture */}
      <div className="flex flex-col items-center w-full pt-0.5">
        {/* Soft Slate Blue Floral Wreath with Gold H & P Monogram */}
        <div className="relative w-32 h-24 sm:w-36 sm:h-28 flex items-center justify-center">
          <svg viewBox="0 0 200 160" className="w-full h-full">
            <defs>
              <linearGradient id="goldHPMono" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e3c267" />
                <stop offset="40%" stopColor="#c59b27" />
                <stop offset="100%" stopColor="#9a7314" />
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
        <div className="mt-0.5 px-3 text-[#1a365d] leading-tight">
          <p className="font-cormorant italic text-[12px] sm:text-[13.5px] leading-snug">
            May your constant love be with us, Lord ,<br />
            as we put our hope in you.
          </p>
          <p className="font-cormorant italic font-semibold text-[11px] sm:text-[12px] mt-0.5">
            Psalm 33:22
          </p>
        </div>
      </div>

      {/* SECTION 2: Announcement & Couple Name */}
      <div className="flex flex-col items-center w-full my-auto px-1">
        <p className="font-cormorant font-bold text-[#142e47] text-[12px] sm:text-[13.5px] tracking-wide">
          With the blessings of Almighty God and our families
        </p>

        {/* "We" with delicate hairline dividers */}
        <div className="flex items-center justify-center gap-2.5 my-0.5 w-full max-w-[180px]">
          <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-slate-300 to-slate-400" />
          <span className="font-script text-2xl sm:text-3xl text-[#1f3a56] italic">
            We
          </span>
          <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-slate-300 to-slate-400" />
        </div>

        {/* Couple's Name in Golden Calligraphy */}
        <h1 
          className="font-script text-2xl sm:text-3xl md:text-[38px] leading-tight my-0.5 select-none"
          style={{
            background: 'linear-gradient(135deg, #e4be5b 0%, #c4962e 45%, #9b7218 85%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 1px 1px rgba(180, 140, 40, 0.2))',
          }}
        >
          Hiketoli & Pulopu Wilson
        </h1>

        {/* Symmetrical Parents' Columns */}
        <div className="grid grid-cols-2 gap-2 w-full max-w-xs sm:max-w-sm my-1 text-center text-[#142e47]">
          {/* Bride Parents Column */}
          <div className="flex flex-col items-center border-r border-slate-300 pr-1.5">
            <span className="font-cormorant text-xs sm:text-sm font-bold text-[#142e47]">
              D/o
            </span>
            <span className="font-cormorant text-[11px] sm:text-xs font-semibold text-[#142e47] leading-snug mt-0.5">
              Mrs. KheshiliT. Jimo
            </span>
            <span className="font-cormorant text-[10px] text-[#142e47] leading-none my-0.5">
              &
            </span>
            <span className="font-cormorant text-[11px] sm:text-xs font-semibold text-[#142e47] leading-snug">
              Late Er. K. Tosuho Sema
            </span>
          </div>

          {/* Groom Parents Column */}
          <div className="flex flex-col items-center pl-1.5">
            <span className="font-cormorant text-xs sm:text-sm font-bold text-[#142e47]">
              S/o
            </span>
            <span className="font-cormorant text-[11px] sm:text-xs font-semibold text-[#142e47] leading-snug mt-0.5">
              Late Mrs. KeluonguüHelena Khruomo
            </span>
            <span className="font-cormorant text-[10px] text-[#142e47] leading-none my-0.5">
              &
            </span>
            <span className="font-cormorant text-[11px] sm:text-xs font-semibold text-[#142e47] leading-snug">
              Late Mr. N.Kughavi Zhimomi
            </span>
          </div>
        </div>

        {/* Cordially request text */}
        <p className="font-cormorant font-semibold text-[11px] sm:text-[12.5px] text-[#142e47] max-w-xs leading-snug mt-1">
          Cordially request the honour of your presence and prayers<br />
          as we join hands in holy matrimony on
        </p>
      </div>

      {/* SECTION 3: Date, Time, Venue, Countdown & Real Church Photo Section */}
      <div className="flex flex-col items-center w-full pb-1">
        {/* Month */}
        <span className="font-cormorant text-xs sm:text-[13px] text-[#142e47]">
          October
        </span>

        {/* Date Row: Tuesday || 20 || 10:00 A.M */}
        <div className="flex items-center justify-center gap-2.5 my-0.5">
          <span className="font-cormorant text-sm sm:text-base font-bold text-[#142e47]">
            Tuesday
          </span>

          <div className="flex gap-0.5 h-5 items-center">
            <span className="w-[1.5px] h-full bg-[#c59b27]" />
            <span className="w-[1.5px] h-full bg-[#c59b27]" />
          </div>

          <span className="font-cormorant text-xl sm:text-2xl font-bold text-[#142e47] leading-none px-0.5">
            20
          </span>

          <div className="flex gap-0.5 h-5 items-center">
            <span className="w-[1.5px] h-full bg-[#c59b27]" />
            <span className="w-[1.5px] h-full bg-[#c59b27]" />
          </div>

          <span className="font-cormorant text-sm sm:text-base font-bold text-[#142e47]">
            10:00 A.M
          </span>
        </div>

        <span className="font-cormorant text-[11px] sm:text-xs text-[#142e47]">
          2026
        </span>

        {/* Church Venue */}
        <h3 className="font-cormorant font-bold text-sm sm:text-base text-[#142e47] mt-1 tracking-wide">
          Satakha Town Baptist Church
        </h3>

        {/* Elegant Countdown Timer */}
        <WeddingCountdown />

        {/* REAL GOOGLE / DOCUMENTARY CHURCH PICTURE SECTION */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            onOpenMap();
          }}
          className="w-full max-w-[260px] sm:max-w-[280px] my-1 rounded-lg overflow-hidden border border-[#c59b27]/60 shadow-sm relative group bg-[#fdfbf7] cursor-pointer hover:border-[#c59b27] transition-all"
          title="Click to view real church photo & Google Maps location"
        >
          <div className="relative aspect-[16/6] w-full overflow-hidden">
            <img
              src={churchImage}
              alt="Satakha Town Baptist Church exterior"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#102a43]/90 via-[#102a43]/25 to-transparent pointer-events-none" />
            <div className="absolute bottom-1 left-2 right-2 flex items-center justify-between text-white text-[9px] font-cinzel">
              <span className="flex items-center gap-1 font-semibold text-amber-200 drop-shadow">
                <MapPin className="w-2.5 h-2.5 text-amber-400" />
                Satakha, Nagaland
              </span>
              <span className="text-amber-200/90 text-[8px] tracking-wider uppercase flex items-center gap-0.5 underline">
                <span>Location & Photos</span>
                <ExternalLink className="w-2 h-2" />
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Vintage Golden Flourish SVG */}
        <div className="w-32 sm:w-36 h-4 mt-0.5 flex items-center justify-center">
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
 * Dedicated Venue Card: Real Church Picture & Stylized Route Map
 */
const CardVenueMap: React.FC<{
  churchImage: string;
  onBackToCard: () => void;
  onUploadCustomPhoto: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ churchImage, onBackToCard, onUploadCustomPhoto }) => {
  const [viewTab, setViewTab] = useState<'photo' | 'map'>('photo');

  const handleOpenGoogleMaps = () => {
    window.open(
      'https://www.google.com/maps/search/?api=1&query=Satakha+Town+Baptist+Church+Nagaland',
      '_blank'
    );
  };

  return (
    <div className="relative w-full aspect-[1/1.52] bg-white rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.55)] border border-neutral-200 p-4 sm:p-6 flex flex-col items-center justify-between text-center select-none animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col items-center w-full pt-0.5">
        <span className="font-cinzel text-xs text-[#c59b27] tracking-[0.25em] uppercase font-semibold">
          Wedding Venue & Location
        </span>
        <h2 className="font-cormorant font-bold text-lg sm:text-xl text-[#142e47] mt-0.5">
          Satakha Town Baptist Church
        </h2>
        <p className="font-cormorant italic text-xs text-[#142e47]/80">
          Satakha, Zunheboto District, Nagaland
        </p>

        {/* View Switcher: Church Photo vs Stylized Map */}
        <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-full mt-2 border border-slate-200">
          <button
            onClick={() => setViewTab('photo')}
            className={`px-3 py-1 rounded-full text-xs font-cinzel transition-all cursor-pointer ${
              viewTab === 'photo'
                ? 'bg-[#142e47] text-amber-200 font-semibold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Church Photo 🏛️
          </button>
          <button
            onClick={() => setViewTab('map')}
            className={`px-3 py-1 rounded-full text-xs font-cinzel transition-all cursor-pointer ${
              viewTab === 'map'
                ? 'bg-[#142e47] text-amber-200 font-semibold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Route Map 🗺️
          </button>
        </div>
      </div>

      {/* Main Visual Display: Real Church Photo OR Stylized Map Graphic */}
      <div className="relative w-full my-auto rounded-lg overflow-hidden border-2 border-[#c59b27]/60 shadow-md bg-[#faf8f2]">
        {viewTab === 'photo' ? (
          <div className="relative aspect-[16/10] w-full overflow-hidden group">
            <img
              src={churchImage}
              alt="Satakha Town Baptist Church Real Photo"
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
            />
            <div className="absolute bottom-2 left-2 bg-[#102a43]/90 text-white text-[10px] font-cinzel px-2.5 py-1 rounded-full flex items-center gap-1 shadow">
              <MapPin className="w-3 h-3 text-amber-400" />
              <span>Satakha Town Baptist Church</span>
            </div>

            {/* Custom Photo Upload trigger for host */}
            <label
              className="absolute top-2 right-2 bg-neutral-900/80 hover:bg-neutral-900 text-amber-200 text-[10px] font-cinzel px-2.5 py-1 rounded-full border border-amber-500/30 flex items-center gap-1 shadow cursor-pointer transition-colors"
              title="Upload your own custom church photo"
            >
              <Camera className="w-3 h-3" />
              <span>Change Photo</span>
              <input
                type="file"
                accept="image/*"
                onChange={onUploadCustomPhoto}
                className="hidden"
              />
            </label>
          </div>
        ) : (
          <div className="relative aspect-[16/10] w-full overflow-hidden">
            <img
              src={STYLIZED_MAP_GRAPHIC}
              alt="Stylized wedding venue map graphic"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 left-2 bg-[#102a43]/85 backdrop-blur-xs px-2.5 py-1 rounded-full text-white text-[10px] font-cinzel flex items-center gap-1 shadow">
              <Compass className="w-3 h-3 text-amber-400" />
              <span>Satakha Route Guide</span>
            </div>
          </div>
        )}
      </div>

      {/* Location Details & Navigation Action */}
      <div className="flex flex-col items-center w-full pb-0.5 space-y-1.5">
        <p className="font-cormorant text-xs text-[#142e47] leading-tight max-w-xs">
          Coordinates: <span className="font-semibold">26.0125° N, 94.4856° E</span>
          <br />
          Ceremony begins at <span className="font-semibold">10:00 A.M.</span> on Tuesday, October 20, 2026.
        </p>

        {/* Google Maps Button */}
        <button
          onClick={handleOpenGoogleMaps}
          className="w-full max-w-[240px] py-2 px-4 rounded-full bg-gradient-to-r from-[#e8c76b] via-[#f7e096] to-[#cf9c34] text-neutral-950 font-cinzel font-bold text-xs tracking-wider uppercase shadow-md hover:shadow-lg hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-2 border border-amber-200 cursor-pointer"
        >
          <Navigation className="w-3.5 h-3.5 fill-current" />
          <span>Open in Google Maps</span>
          <ExternalLink className="w-3 h-3" />
        </button>

        <button
          onClick={onBackToCard}
          className="text-[11px] font-cinzel text-neutral-500 hover:text-neutral-900 underline underline-offset-2 transition-colors cursor-pointer"
        >
          Return to Invitation Card
        </button>
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
          </svg>

          {/* Monogram */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="font-script text-5xl sm:text-6xl text-gold-foil leading-none drop-shadow-md">
              H
            </span>
            <span className="font-cormorant italic text-xl sm:text-2xl text-amber-200/90 leading-tight">
              &
            </span>
            <span className="font-script text-5xl sm:text-6xl text-gold-foil leading-none drop-shadow-md">
              P
            </span>
            
            <span className="font-script text-2xl sm:text-3xl text-amber-200/95 mt-1 tracking-wider drop-shadow">
              Hiketoli & Pulopu
            </span>
          </div>
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

/**
 * Modal Popup for Church Photo & Google Maps Location
 */
const VenueMapModal: React.FC<{ churchImage: string; onClose: () => void }> = ({
  churchImage,
  onClose,
}) => {
  const handleOpenGoogleMaps = () => {
    window.open(
      'https://www.google.com/maps/search/?api=1&query=Satakha+Town+Baptist+Church+Nagaland',
      '_blank'
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-amber-300 p-5 text-neutral-900 flex flex-col items-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="text-center mb-2.5">
          <span className="font-cinzel text-xs text-[#c59b27] font-semibold tracking-widest uppercase">
            Wedding Venue Location
          </span>
          <h3 className="font-cormorant font-bold text-lg text-[#142e47]">
            Satakha Town Baptist Church
          </h3>
          <p className="font-cormorant text-xs text-neutral-600">
            Satakha, Zunheboto District, Nagaland
          </p>
        </div>

        {/* Church Photo Display */}
        <div className="relative w-full rounded-xl overflow-hidden border border-[#c59b27]/40 shadow-inner mb-3">
          <img
            src={churchImage}
            alt="Satakha Town Baptist Church"
            className="w-full aspect-[16/10] object-cover"
          />
          <div className="absolute bottom-2 left-2 bg-[#102a43]/90 text-white text-[10px] font-cinzel px-2.5 py-1 rounded-full flex items-center gap-1 shadow">
            <MapPin className="w-3 h-3 text-amber-400" />
            <span>Satakha, Nagaland</span>
          </div>
        </div>

        {/* Venue Information */}
        <p className="font-cormorant text-xs text-center text-slate-700 mb-3 px-2">
          Join us at Satakha Town Baptist Church on Tuesday, October 20, 2026 at 10:00 A.M.
          View photos, directions, and satellite imagery on Google Maps below.
        </p>

        {/* Action Button */}
        <button
          onClick={handleOpenGoogleMaps}
          className="w-full py-2.5 px-4 rounded-full bg-gradient-to-r from-[#e8c76b] via-[#f7e096] to-[#cf9c34] text-neutral-950 font-cinzel font-bold text-xs tracking-wider uppercase shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Navigation className="w-3.5 h-3.5 fill-current" />
          <span>Open in Google Maps & Photos</span>
          <ExternalLink className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
