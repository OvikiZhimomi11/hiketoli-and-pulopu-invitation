import React, { useRef } from 'react';
import { 
  Calendar, 
  MapPin, 
  HeartHandshake, 
  Printer, 
  ArrowLeft,
  Share2,
  Download
} from 'lucide-react';
import { weddingData } from '../data/weddingData';

interface WeddingCardProps {
  onBackToVideo: () => void;
  onOpenRSVP: () => void;
  onOpenVenue: () => void;
}

export const WeddingCard: React.FC<WeddingCardProps> = ({
  onBackToVideo,
  onOpenRSVP,
  onOpenVenue,
}) => {
  const [copiedToast, setCopiedToast] = React.useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleAddToCalendar = () => {
    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Hiketoli and Pulopu Wilson//Wedding Invitation//EN',
      'BEGIN:VEVENT',
      'UID:wedding-hiketoli-pulopu-20261020',
      'DTSTAMP:20261001T000000Z',
      'DTSTART:20261020T043000Z', // 10:00 AM IST
      'DTEND:20261020T083000Z',
      'SUMMARY:Wedding: Hiketoli & Pulopu Wilson',
      'DESCRIPTION:Holy Matrimony of Hiketoli and Pulopu Wilson at Satakha Town Baptist Church. Psalm 33:22.',
      'LOCATION:Satakha Town Baptist Church\\, Satakha\\, Zunheboto\\, Nagaland',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'Hiketoli-Pulopu-Wedding.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Hiketoli & Pulopu's Wedding Invitation",
        text: "You are cordially invited to the Holy Matrimony of Hiketoli & Pulopu Wilson on October 20, 2026 at Satakha Town Baptist Church.",
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 2500);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center py-4 px-3 sm:px-6 animate-fade-in">
      {/* Top Action Toolbar */}
      <div className="w-full max-w-xl flex items-center justify-between mb-5 bg-neutral-900/90 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-amber-500/20 shadow-xl">
        <button
          onClick={onBackToVideo}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-amber-200 text-xs font-cinzel font-medium transition-all border border-amber-500/20 active:scale-95 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Video</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-amber-300 text-xs font-cinzel border border-amber-500/20 transition-all cursor-pointer"
            title="Share Invitation"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Share</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-amber-300 text-xs font-cinzel border border-amber-500/20 transition-all cursor-pointer"
            title="Print or Save"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Print / Save</span>
          </button>
        </div>
      </div>

      {copiedToast && (
        <div className="mb-4 px-4 py-1.5 rounded-full bg-amber-400 text-neutral-950 text-xs font-cinzel font-semibold shadow-md">
          Link copied to clipboard!
        </div>
      )}

      {/* Direct Wedding Card (No Envelope) */}
      <div 
        ref={cardRef}
        className="relative w-full max-w-[430px] aspect-[1/1.55] rounded-xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.85)] border border-amber-200/60 p-6 sm:p-7 flex flex-col items-center justify-between text-center select-none bg-[#fbfaf5]"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, #ffffff 0%, #faf8f2 60%, #f3eee3 100%)`,
        }}
      >
        {/* Delicate Gold Foil Border Rim */}
        <div className="absolute inset-3 border border-amber-600/30 rounded-lg pointer-events-none" />
        <div className="absolute inset-4 border border-amber-700/15 rounded-md pointer-events-none" />

        {/* Top: Monogram with Foliage Crest & Scripture */}
        <div className="flex flex-col items-center pt-2">
          {/* Circular botanical laurel crest with H & P */}
          <div className="relative w-16 h-16 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full text-slate-500">
              <path
                d="M 25,50 C 25,25 45,15 50,15 C 55,15 75,25 75,50 C 75,75 55,85 50,85 C 45,85 25,75 25,50"
                fill="none"
                stroke="#6b8696"
                strokeWidth="1.2"
                strokeDasharray="2 1"
              />
              {[20, 35, 50, 65, 80].map((deg) => (
                <circle
                  key={deg}
                  cx={50 + 28 * Math.cos((deg * Math.PI) / 180)}
                  cy={50 + 28 * Math.sin((deg * Math.PI) / 180)}
                  r="1.8"
                  fill="#6b8696"
                />
              ))}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-script text-base text-amber-700 leading-none">H</span>
              <span className="text-[9px] text-slate-500 leading-none">&</span>
              <span className="font-script text-base text-amber-700 leading-none">P</span>
            </div>
          </div>

          {/* Scripture from original card: Psalm 33:22 */}
          <div className="mt-1 px-4 max-w-sm">
            <p className="font-cormorant italic text-slate-800 text-xs sm:text-sm leading-snug">
              May your constant love be with us, Lord ,<br />
              as we put our hope in you.
            </p>
            <p className="font-cormorant font-semibold text-slate-700 text-xs mt-0.5">
              Psalm 33:22
            </p>
          </div>
        </div>

        {/* Center: Couple Announcement */}
        <div className="my-auto flex flex-col items-center w-full px-2">
          <p className="font-cinzel text-slate-800 text-[11px] sm:text-xs tracking-wider uppercase">
            With the blessings of Almighty God and our families
          </p>

          {/* Flourished "We" */}
          <div className="flex items-center justify-center gap-3 my-1 w-full max-w-[160px]">
            <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-slate-400 to-transparent" />
            <span className="font-script text-2xl sm:text-3xl text-slate-700 italic">
              We
            </span>
            <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-slate-400 to-transparent" />
          </div>

          {/* Bride & Groom Calligraphy */}
          <h1 className="font-script text-3xl sm:text-4xl lg:text-[42px] text-amber-600 drop-shadow-xs tracking-wide leading-tight my-1">
            Hiketoli & Pulopu Wilson
          </h1>

          {/* Parents' Details: Two Symmetrical Columns */}
          <div className="grid grid-cols-2 gap-3 w-full max-w-md my-2 text-center text-slate-800">
            {/* Bride's Parents */}
            <div className="flex flex-col items-center border-r border-slate-300/80 pr-2">
              <span className="font-cinzel text-[11px] font-bold text-slate-900 tracking-wider">
                D/o
              </span>
              <span className="font-cormorant text-xs sm:text-sm font-semibold text-slate-900 leading-snug mt-1">
                Mrs. Kheshili T. Jimo
              </span>
              <span className="font-cormorant text-xs text-slate-600 leading-none my-0.5">
                &
              </span>
              <span className="font-cormorant text-xs sm:text-sm font-semibold text-slate-900 leading-snug">
                Late Er. K. Tosuho Sema
              </span>
            </div>

            {/* Groom's Parents */}
            <div className="flex flex-col items-center pl-2">
              <span className="font-cinzel text-[11px] font-bold text-slate-900 tracking-wider">
                S/o
              </span>
              <span className="font-cormorant text-xs sm:text-sm font-semibold text-slate-900 leading-snug mt-1">
                Late Mrs. Keluonguü Helena Khruomo
              </span>
              <span className="font-cormorant text-xs text-slate-600 leading-none my-0.5">
                &
              </span>
              <span className="font-cormorant text-xs sm:text-sm font-semibold text-slate-900 leading-snug">
                Late Mr. N. Kughavi Zhimomi
              </span>
            </div>
          </div>

          {/* Formal Request */}
          <p className="font-cormorant text-xs sm:text-sm text-slate-800 max-w-xs sm:max-w-sm leading-relaxed mt-2 font-medium">
            Cordially request the honour of your presence and prayers<br />
            as we join hands in holy matrimony on
          </p>
        </div>

        {/* Date, Time & Church Venue */}
        <div className="flex flex-col items-center pb-2 w-full">
          <span className="font-cormorant italic text-xs sm:text-sm text-slate-700">
            October
          </span>

          <div className="flex items-center justify-center gap-3 sm:gap-4 my-1">
            <span className="font-cinzel text-sm sm:text-base font-semibold text-slate-900">
              Tuesday
            </span>
            <span className="w-[1px] h-6 bg-amber-600/40" />
            <span className="font-cinzel text-2xl sm:text-3xl font-bold text-amber-600 leading-none">
              20
            </span>
            <span className="w-[1px] h-6 bg-amber-600/40" />
            <span className="font-cinzel text-xs sm:text-sm font-semibold text-slate-900 tracking-tight">
              10:00 A.M
            </span>
          </div>

          <span className="font-cinzel text-[11px] sm:text-xs text-slate-700 tracking-widest">
            2026
          </span>

          <h3 className="font-cormorant font-bold text-base sm:text-lg text-slate-900 mt-2 tracking-wide">
            Satakha Town Baptist Church
          </h3>

          {/* Ornamental Golden Flourish */}
          <div className="w-32 h-6 mt-1 flex items-center justify-center opacity-80">
            <svg viewBox="0 0 160 30" className="w-full h-full text-amber-600">
              <path
                d="M 10,15 C 30,5 50,25 70,15 C 75,12 80,18 85,15 C 105,25 125,5 150,15"
                fill="none"
                stroke="#cf9c34"
                strokeWidth="1.5"
              />
              <circle cx="80" cy="15" r="3" fill="#cf9c34" />
              <circle cx="40" cy="15" r="1.5" fill="#cf9c34" />
              <circle cx="120" cy="15" r="1.5" fill="#cf9c34" />
            </svg>
          </div>
        </div>
      </div>

      {/* Companion Actions */}
      <div className="w-full max-w-xl mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button
          onClick={handleAddToCalendar}
          className="flex items-center justify-center gap-2 p-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-amber-200 border border-amber-500/30 shadow-md text-xs font-cinzel font-medium transition-all cursor-pointer"
        >
          <Calendar className="w-4 h-4 text-amber-400" />
          <span>Add to Calendar</span>
        </button>

        <button
          onClick={onOpenVenue}
          className="flex items-center justify-center gap-2 p-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-amber-200 border border-amber-500/30 shadow-md text-xs font-cinzel font-medium transition-all cursor-pointer"
        >
          <MapPin className="w-4 h-4 text-amber-400" />
          <span>Church Venue</span>
        </button>

        <button
          onClick={onOpenRSVP}
          className="flex items-center justify-center gap-2 p-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-cinzel font-bold text-xs tracking-wider shadow-md transition-all cursor-pointer"
        >
          <HeartHandshake className="w-4 h-4 text-neutral-950" />
          <span>RSVP & Blessings</span>
        </button>
      </div>
    </div>
  );
};
