import React, { useState } from 'react';
import { Gift, Sparkles, Check, ArrowRight, X } from 'lucide-react';
import { GIFT_BOXES, PERSONAL_INFO } from '../../data/adventureData';
import { GiftItem } from '../../types';
import { soundManager } from '../../utils/soundEffects';
import confetti from 'canvas-confetti';

interface Level3GiftKingdomProps {
  onNext: () => void;
  onGiftOpened: (count: number) => void;
}

export const Level3GiftKingdom: React.FC<Level3GiftKingdomProps> = ({
  onNext,
  onGiftOpened,
}) => {
  const [openedGifts, setOpenedGifts] = useState<number[]>([]);
  const [activeModalGift, setActiveModalGift] = useState<GiftItem | null>(null);

  const handleOpenGift = (gift: GiftItem) => {
    soundManager.playSparkle();

    if (!openedGifts.includes(gift.id)) {
      const updated = [...openedGifts, gift.id];
      setOpenedGifts(updated);
      onGiftOpened(updated.length);

      // Trigger localized celebratory confetti
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#F472B6', '#C084FC', '#FBBF24', '#38BDF8'],
      });
    }

    setActiveModalGift(gift);
  };

  const handleOpenAll = () => {
    const allIds = GIFT_BOXES.map((g) => g.id);
    setOpenedGifts(allIds);
    onGiftOpened(allIds.length);
    soundManager.playFanfare();
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.5 },
    });
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 py-8 z-10">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/15 border border-pink-400/30 text-pink-300 text-xs font-semibold mb-3">
          <Gift className="w-3.5 h-3.5 text-amber-300" />
          <span>Level 3 · Kingdom of Surprises</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold font-serif text-white mb-2">
          Gift Kingdom for Soni 🎁
        </h2>
        <p className="text-sm text-slate-300 max-w-lg mx-auto mb-6">
          10 enchanted floating gift boxes created specifically for your Sweet 16!
          Tap each box to unwrap its secret wish.
        </p>

        {/* Status tracker */}
        <div className="flex items-center justify-between max-w-xs mx-auto mb-6 px-4 py-2 rounded-2xl glass-panel bg-white/5 border border-white/10 text-xs">
          <span className="text-slate-300">Gifts Unwrapped:</span>
          <span className="font-bold text-pink-300 tabular-nums">
            {openedGifts.length} / {GIFT_BOXES.length}
          </span>
          {openedGifts.length < 10 && (
            <button
              onClick={handleOpenAll}
              type="button"
              className="text-[10px] text-amber-300 underline hover:text-amber-200 cursor-pointer"
            >
              Unwrap All ✨
            </button>
          )}
        </div>

        {/* 10 Floating Gift Boxes Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-8">
          {GIFT_BOXES.map((gift, index) => {
            const isOpened = openedGifts.includes(gift.id);
            return (
              <button
                key={gift.id}
                onClick={() => handleOpenGift(gift)}
                type="button"
                aria-label={`Unwrap Gift Box ${gift.id}: ${gift.title}`}
                className={`relative group p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col items-center justify-center min-h-[140px] select-none text-center ${
                  isOpened
                    ? 'glass-panel bg-pink-900/30 border-pink-400/50 shadow-[0_0_20px_rgba(244,114,182,0.2)]'
                    : 'glass-panel-card bg-slate-900/70 border-white/10 hover:border-pink-400/50 hover:scale-105'
                }`}
              >
                {/* Floating Inner Graphic */}
                <div
                  className="relative mb-2 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    animation: `float ${3.5 + (index % 3) * 0.5}s ease-in-out infinite`,
                    animationDelay: `${index * 0.2}s`,
                  }}
                >
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-tr ${gift.boxColor} flex items-center justify-center text-2xl shadow-lg relative overflow-hidden transition-transform group-hover:rotate-6`}
                  >
                    {/* Ribbon */}
                    <div className={`absolute inset-x-0 h-2 top-1/2 -translate-y-1/2 ${gift.ribbonColor} opacity-90`} />
                    <div className={`absolute inset-y-0 w-2 left-1/2 -translate-x-1/2 ${gift.ribbonColor} opacity-90`} />
                    <span className="relative z-10">{gift.icon}</span>
                  </div>

                  {isOpened && (
                    <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] shadow">
                      <Check className="w-3 h-3" />
                    </div>
                  )}
                </div>

                <div className="text-xs font-semibold text-slate-200 line-clamp-1 group-hover:text-pink-300">
                  Box #{gift.id}
                </div>
                <div className="text-[10px] text-slate-400">
                  {isOpened ? 'Read Wish ✨' : 'Tap to open'}
                </div>
              </button>
            );
          })}
        </div>

        {/* Next Level Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onNext}
            type="button"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-sm shadow-[0_0_25px_rgba(244,114,182,0.4)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <span>Level 4 · Butterfly Challenge 🦋</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Modal for viewing individual opened gift */}
      {activeModalGift && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in"
          onClick={() => setActiveModalGift(null)}
        >
          <div
            className="relative max-w-md w-full glass-panel rounded-3xl p-6 sm:p-8 bg-slate-900/95 border border-pink-400/40 shadow-2xl text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveModalGift(null)}
              type="button"
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10"
              aria-label="Close Wish"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-tr from-pink-500/20 to-purple-500/20 border border-pink-400/40 flex items-center justify-center text-3xl">
              {activeModalGift.icon}
            </div>

            <div className="text-[11px] font-semibold text-pink-300 uppercase tracking-widest mb-1">
              Gift #{activeModalGift.id} · Sweet 16 Wish
            </div>
            <h3 className="text-xl font-bold font-serif text-white mb-3">
              {activeModalGift.title}
            </h3>

            <p className="text-sm text-slate-200 leading-relaxed mb-6 font-sans">
              "{activeModalGift.wish}"
            </p>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-4 border-t border-white/10">
              <span>Dedicated to {PERSONAL_INFO.name}</span>
              <span className="text-pink-300 font-medium">By {PERSONAL_INFO.createdBy}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
