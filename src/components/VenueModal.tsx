import React from 'react';
import { X, MapPin, ExternalLink, Clock, Church, Car, Calendar } from 'lucide-react';
import { weddingData } from '../data/weddingData';

interface VenueModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VenueModal: React.FC<VenueModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'Satakha Town Baptist Church Nagaland'
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-neutral-900 border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden text-neutral-100">
        {/* Header */}
        <div className="p-5 border-b border-neutral-800 flex items-center justify-between bg-gradient-to-r from-neutral-900 via-amber-950/20 to-neutral-900">
          <div className="flex items-center gap-2">
            <Church className="w-5 h-5 text-amber-400" />
            <h3 className="font-cinzel text-base font-bold text-amber-200 tracking-wide">
              Venue & Order of Service
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-5">
          {/* Main Church Card */}
          <div className="p-4 rounded-xl bg-neutral-950/80 border border-amber-500/20 space-y-2">
            <h4 className="font-cormorant font-bold text-lg text-amber-300">
              {weddingData.event.venue}
            </h4>
            <p className="text-xs text-neutral-300 font-sans-clean flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{weddingData.event.town}, {weddingData.event.state}</span>
            </p>
            <p className="text-xs text-neutral-400 font-sans-clean flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{weddingData.event.fullDateString} · Starts promptly at {weddingData.event.time}</span>
            </p>

            <div className="pt-2">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-200 text-xs font-cinzel font-medium transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>

          {/* Program Schedule */}
          <div>
            <h5 className="font-cinzel text-xs uppercase tracking-wider text-amber-300/90 font-semibold mb-3 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Schedule of Matrimony</span>
            </h5>
            <div className="space-y-2 text-xs font-sans-clean">
              <div className="flex items-start gap-3 p-2.5 rounded-lg bg-neutral-950/40 border border-neutral-800">
                <span className="font-cinzel text-amber-400 font-semibold w-18 shrink-0">09:30 AM</span>
                <div>
                  <p className="text-neutral-200 font-medium">Guest Arrival & Musical Prelude</p>
                  <p className="text-neutral-400 text-[11px]">Seating in the sanctuary pews</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-2.5 rounded-lg bg-neutral-950/40 border border-amber-500/30">
                <span className="font-cinzel text-amber-400 font-semibold w-18 shrink-0">10:00 AM</span>
                <div>
                  <p className="text-amber-200 font-medium">Solemnisation of Holy Matrimony</p>
                  <p className="text-neutral-400 text-[11px]">Exchange of vows, rings, praise & pastoral blessings</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-2.5 rounded-lg bg-neutral-950/40 border border-neutral-800">
                <span className="font-cinzel text-amber-400 font-semibold w-18 shrink-0">11:45 AM</span>
                <div>
                  <p className="text-neutral-200 font-medium">Congratulatory Photographs</p>
                  <p className="text-neutral-400 text-[11px]">With families, church elders, and honored guests</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-2.5 rounded-lg bg-neutral-950/40 border border-neutral-800">
                <span className="font-cinzel text-amber-400 font-semibold w-18 shrink-0">12:30 PM</span>
                <div>
                  <p className="text-neutral-200 font-medium">Wedding Feast & Fellowship</p>
                  <p className="text-neutral-400 text-[11px]">Traditional reception dinner</p>
                </div>
              </div>
            </div>
          </div>

          {/* Travel & Parking Note */}
          <div className="p-3 rounded-lg bg-neutral-950/50 border border-neutral-800 flex items-start gap-2.5 text-xs text-neutral-300">
            <Car className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p>
              Designated vehicle parking is arranged around the church grounds. Please arrive 20–30 minutes prior to the service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
