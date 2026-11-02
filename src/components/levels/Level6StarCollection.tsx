import React, { useState } from 'react';
import { Star, Sparkles, ArrowRight, X } from 'lucide-react';
import { STAR_WISHES, PERSONAL_INFO } from '../../data/adventureData';
import { StarItem } from '../../types';
import { soundManager } from '../../utils/soundEffects';
import confetti from 'canvas-confetti';

interface Level6StarCollectionProps {
  onNext: () => void;
  onStarCollected: (count: number) => void;
}

export const Level6StarCollection: React.FC<Level6StarCollectionProps> = ({
  onNext,
  onStarCollected,
}) => {
  const [collectedStarIds, setCollectedStarIds] = useState<number[]>([]);
  const [activeStarModal, setActiveStarModal] = useState<StarItem | null>(null);

  const collectStar = (star: StarItem) => {
    soundManager.playTwinkle();

    if (!collectedStarIds.includes(star.id)) {
      const updated = [...collectedStarIds, star.id];
      setCollectedStarIds(updated);
      onStarCollected(updated.length);

      confetti({
        particleCount: 30,
        spread: 60,
        origin: { x: star.constellationPoint.x / 100, y: star.constellationPoint.y / 100 },
        colors: ['#FDE047', '#F472B6', '#FFF'],
      });
    }

    setActiveStarModal(star);
  };

  const handleCollectAll = () => {
    const allIds = STAR_WISHES.map((s) => s.id);
    setCollectedStarIds(allIds);
    onStarCollected(allIds.length);
    soundManager.playFanfare();
    confetti({
      particleCount: 70,
      spread: 90,
      origin: { y: 0.5 },
    });
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-between px-4 py-8 z-10 select-none">
      {/* Top Header */}
      <div className="max-w-xl w-full text-center z-20">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-semibold mb-2">
          <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
          <span>Level 6 · Night Sky Constellation</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold font-serif text-white mb-2">
          Collect 5 Wishing Stars ⭐
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mb-4">
          Click the glowing stars in Soni's constellation to reveal the universe's blessings.
        </p>

        {/* Counter */}
        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full glass-panel bg-white/5 border border-white/10 text-xs text-slate-300">
          <span>Stars Collected:</span>
          <span className="font-bold text-amber-300 font-mono text-sm">
            {collectedStarIds.length} / {STAR_WISHES.length}
          </span>
          {collectedStarIds.length < 5 && (
            <button
              onClick={handleCollectAll}
              type="button"
              className="text-[10px] text-pink-300 underline hover:text-pink-200 cursor-pointer"
            >
              Collect All ✨
            </button>
          )}
        </div>
      </div>

      {/* Enchanted Sky Arena */}
      <div className="relative w-full max-w-4xl h-[420px] sm:h-[480px] my-4 rounded-3xl glass-panel bg-slate-950/80 border border-amber-300/20 shadow-[0_0_50px_rgba(251,191,36,0.15)] overflow-hidden">
        {/* Constellation SVG Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {/* Subtle guide lines */}
          <polyline
            points={STAR_WISHES.map(
              (s) => `${s.constellationPoint.x}%,${s.constellationPoint.y}%`
            ).join(' ')}
            stroke="rgba(251, 191, 36, 0.25)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            fill="none"
          />
          {/* Active bright lines for collected stars */}
          {collectedStarIds.length >= 2 && (
            <polyline
              points={STAR_WISHES.filter((s) => collectedStarIds.includes(s.id))
                .map((s) => `${s.constellationPoint.x}%,${s.constellationPoint.y}%`)
                .join(' ')}
              stroke="rgba(244, 114, 182, 0.75)"
              strokeWidth="2.5"
              fill="none"
              className="filter drop-shadow-[0_0_8px_rgba(244,114,182,0.8)]"
            />
          )}
        </svg>

        {/* The 5 Stars */}
        {STAR_WISHES.map((star, idx) => {
          const isCollected = collectedStarIds.includes(star.id);
          return (
            <button
              key={star.id}
              onClick={() => collectStar(star)}
              type="button"
              aria-label={`Collect ${star.title}`}
              style={{
                left: `${star.constellationPoint.x}%`,
                top: `${star.constellationPoint.y}%`,
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 p-3 group cursor-pointer"
            >
              <div className="relative flex items-center justify-center">
                {/* Glowing Aura Ring */}
                <div
                  className={`absolute w-14 h-14 rounded-full transition-all duration-500 ${
                    isCollected
                      ? 'bg-amber-400/30 scale-125 animate-pulse shadow-[0_0_30px_rgba(251,191,36,0.8)]'
                      : 'bg-white/10 group-hover:scale-110 group-hover:bg-amber-400/20'
                  }`}
                />

                {/* Star Icon */}
                <Star
                  className={`w-8 h-8 sm:w-10 sm:h-10 transition-transform duration-300 group-hover:scale-125 ${
                    isCollected
                      ? 'fill-amber-300 text-amber-200 filter drop-shadow-[0_0_12px_rgba(251,191,36,0.9)] animate-spin-slow'
                      : 'fill-white/30 text-white/70 group-hover:fill-amber-200 group-hover:text-amber-300'
                  }`}
                  style={{ animationDuration: '10s' }}
                />

                {/* Star Number Badge */}
                <span className="absolute -bottom-2 px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-slate-900 border border-amber-300/40 text-amber-300">
                  #{idx + 1}
                </span>
              </div>
            </button>
          );
        })}

        {/* Sky Ambient Stars Background Dots */}
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white opacity-40 animate-pulse pointer-events-none"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              left: `${Math.random() * 95}%`,
              top: `${Math.random() * 95}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Next Level Button */}
      <div className="z-20 text-center">
        <button
          onClick={onNext}
          type="button"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-sm shadow-[0_0_25px_rgba(244,114,182,0.4)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <span>Level 7 · Treasure Chest 💎</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Star Wish Modal */}
      {activeStarModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in"
          onClick={() => setActiveStarModal(null)}
        >
          <div
            className="relative max-w-md w-full glass-panel rounded-3xl p-6 sm:p-8 bg-slate-900/95 border border-amber-400/40 shadow-2xl text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveStarModal(null)}
              type="button"
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 cursor-pointer"
              aria-label="Close Star Modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-400/20 border border-amber-300/40 flex items-center justify-center text-3xl shadow-[0_0_30px_rgba(251,191,36,0.3)]">
              ⭐
            </div>

            <div className="text-[11px] font-semibold text-amber-300 uppercase tracking-widest mb-1">
              Constellation Blessing #{activeStarModal.id}
            </div>
            <h3 className="text-xl font-bold font-serif text-white mb-3">
              {activeStarModal.title}
            </h3>

            <p className="text-sm text-slate-200 leading-relaxed mb-6 font-sans">
              "{activeStarModal.message}"
            </p>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-4 border-t border-white/10">
              <span>Constellation of Love</span>
              <span className="text-amber-300 font-medium">For Soni My Doll 🪆</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
