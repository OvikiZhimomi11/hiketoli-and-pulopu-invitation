import React, { useState } from 'react';
import { X, Copy, Check, Share2, Play, MessageSquare } from 'lucide-react';

interface ShareVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onWatchVideo: () => void;
}

export const ShareVideoModal: React.FC<ShareVideoModalProps> = ({
  isOpen,
  onClose,
  onWatchVideo,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Clean shareable URL pointing specifically to the wedding video
  const baseUrl = window.location.origin + window.location.pathname;
  const videoUrl = `${baseUrl}?view=video`;

  const shareText = `💍 You're cordially invited to celebrate the Holy Matrimony of Hiketoli & Pulopu Wilson! Click to watch our wedding video and open our invitation: ${videoUrl}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(videoUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsAppShare = () => {
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(waUrl, '_blank');
  };

  const handleNativeShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Hiketoli & Pulopu's Wedding Video",
        text: "You are cordially invited to watch our wedding video and open our wedding card.",
        url: videoUrl,
      }).catch(() => {});
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-neutral-900 border border-amber-500/40 rounded-2xl shadow-2xl p-6 text-neutral-100 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">🎬</span>
            <h3 className="font-cinzel text-base font-bold text-amber-200 tracking-wide">
              Share Wedding Video
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-neutral-300 font-sans-clean leading-relaxed">
          Share this direct video link with your guests. When they open it, they will watch the wedding video and can tap to view the invitation card!
        </p>

        {/* Link Box */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-cinzel text-amber-300/80 uppercase tracking-wider">
            Direct Wedding Video Link:
          </label>
          <div className="flex items-center gap-2 p-2 rounded-xl bg-neutral-950 border border-neutral-700">
            <input
              type="text"
              readOnly
              value={videoUrl}
              className="bg-transparent text-xs text-neutral-300 flex-1 outline-none truncate"
            />
            <button
              onClick={handleCopyLink}
              className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-cinzel font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-neutral-950" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-neutral-950" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Share Action Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <button
            onClick={handleWhatsAppShare}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-cinzel font-semibold text-xs tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 fill-white" />
            <span>WhatsApp</span>
          </button>

          <button
            onClick={handleNativeShare}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-cinzel font-bold text-xs tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Link</span>
          </button>
        </div>

        {/* Preview Video Button */}
        <div className="pt-2 border-t border-neutral-800 flex justify-center">
          <button
            onClick={() => {
              onClose();
              onWatchVideo();
            }}
            className="text-xs font-cinzel text-amber-300 hover:text-amber-100 flex items-center gap-1.5 underline underline-offset-4 cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Watch Video Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};
