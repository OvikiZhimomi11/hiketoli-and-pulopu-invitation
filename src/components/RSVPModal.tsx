import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { X, Send, Heart, Users, Sparkles, MessageCircleHeart } from 'lucide-react';
import { GuestBlessing } from '../types';
import { initialBlessings } from '../data/weddingData';

interface RSVPModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultName: string;
}

export const RSVPModal: React.FC<RSVPModalProps> = ({ isOpen, onClose, defaultName }) => {
  const [blessings, setBlessings] = useState<GuestBlessing[]>(initialBlessings);
  const [name, setName] = useState(defaultName);
  const [attendance, setAttendance] = useState<'attending' | 'praying_from_afar' | 'attending_with_family'>('attending');
  const [message, setMessage] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newBlessing: GuestBlessing = {
      id: Date.now().toString(),
      name: name.trim(),
      message: message.trim(),
      attendance,
      timestamp: 'Just now',
    };

    setBlessings([newBlessing, ...blessings]);
    setHasSubmitted(true);

    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#f5d061', '#ff8fa3', '#ffffff', '#e6af2e'],
    });

    setTimeout(() => {
      setMessage('');
      setHasSubmitted(false);
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-xl max-h-[90vh] flex flex-col bg-neutral-900 border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden text-neutral-100">
        {/* Header */}
        <div className="p-5 border-b border-neutral-800 flex items-center justify-between bg-gradient-to-r from-neutral-900 via-amber-950/20 to-neutral-900">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-amber-400 fill-amber-400/20" />
            <h3 className="font-cinzel text-base md:text-lg font-bold text-amber-200 tracking-wide">
              RSVP & Blessing Messages
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 overflow-y-auto space-y-6">
          {hasSubmitted ? (
            <div className="p-6 rounded-xl bg-amber-500/10 border border-amber-500/30 text-center space-y-2">
              <Sparkles className="w-8 h-8 text-amber-400 mx-auto animate-bounce" />
              <h4 className="font-cinzel text-base text-amber-200 font-semibold">
                Thank You for Your RSVP and Blessings!
              </h4>
              <p className="text-xs text-neutral-300 font-cormorant text-base">
                Your warm prayers mean the world to Hiketoli & Pulopu Wilson.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-cinzel text-amber-300/90 uppercase tracking-wider mb-1">
                  Your Full Name / Family Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950/80 border border-neutral-700 focus:border-amber-400 text-sm text-neutral-100 focus:outline-none transition-colors"
                  placeholder="e.g. Dr. & Mrs. Angke Konyak"
                />
              </div>

              <div>
                <label className="block text-xs font-cinzel text-amber-300/90 uppercase tracking-wider mb-1.5">
                  Will You Be Attending the Holy Matrimony?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setAttendance('attending')}
                    className={`px-3 py-2 rounded-xl text-xs font-cinzel font-medium border text-center transition-all ${
                      attendance === 'attending'
                        ? 'bg-amber-500/20 border-amber-400 text-amber-200'
                        : 'bg-neutral-800/60 border-neutral-700 text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    Joyfully Attending
                  </button>
                  <button
                    type="button"
                    onClick={() => setAttendance('attending_with_family')}
                    className={`px-3 py-2 rounded-xl text-xs font-cinzel font-medium border text-center transition-all ${
                      attendance === 'attending_with_family'
                        ? 'bg-amber-500/20 border-amber-400 text-amber-200'
                        : 'bg-neutral-800/60 border-neutral-700 text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    With Family
                  </button>
                  <button
                    type="button"
                    onClick={() => setAttendance('praying_from_afar')}
                    className={`px-3 py-2 rounded-xl text-xs font-cinzel font-medium border text-center transition-all ${
                      attendance === 'praying_from_afar'
                        ? 'bg-amber-500/20 border-amber-400 text-amber-200'
                        : 'bg-neutral-800/60 border-neutral-700 text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    Praying from Afar
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-cinzel text-amber-300/90 uppercase tracking-wider mb-1">
                  Your Congratulatory Wish / Prayer
                </label>
                <textarea
                  required
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950/80 border border-neutral-700 focus:border-amber-400 text-sm text-neutral-100 focus:outline-none transition-colors"
                  placeholder="Write a heartfelt message or prayer for the couple..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-cinzel font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg transition-all active:scale-98"
              >
                <Send className="w-4 h-4" />
                <span>Submit RSVP & Blessing</span>
              </button>
            </form>
          )}

          {/* Guest Blessings Stream */}
          <div className="pt-4 border-t border-neutral-800">
            <div className="flex items-center gap-2 mb-3">
              <MessageCircleHeart className="w-4 h-4 text-amber-400" />
              <h4 className="font-cinzel text-xs uppercase tracking-wider text-amber-200 font-semibold">
                Blessings & Wishes from Loved Ones
              </h4>
            </div>

            <div className="space-y-3">
              {blessings.map((b) => (
                <div
                  key={b.id}
                  className="p-3.5 rounded-xl bg-neutral-950/60 border border-neutral-800/80 space-y-1.5"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-cormorant font-bold text-amber-300 text-sm">{b.name}</span>
                    <span className="text-[11px] text-neutral-500">{b.timestamp}</span>
                  </div>
                  <p className="text-xs sm:text-sm font-cormorant italic text-neutral-200 leading-relaxed">
                    "{b.message}"
                  </p>
                  <div className="text-[10px] text-amber-400/80 font-cinzel">
                    {b.attendance === 'attending' && 'Attending in Person'}
                    {b.attendance === 'attending_with_family' && 'Attending with Family'}
                    {b.attendance === 'praying_from_afar' && 'Sending Prayers & Love'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
