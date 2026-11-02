import React from 'react';
import { X, Heart, Sparkles } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

interface EasterEggModalProps {
  type: 'doll' | 'bear' | null;
  onClose: () => void;
}

export const EasterEggModal: React.FC<EasterEggModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="easter-egg-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative max-w-md w-full glass-panel rounded-3xl p-6 sm:p-8 text-center border border-pink-400/30 shadow-[0_0_50px_rgba(244,114,182,0.3)] bg-slate-900/90 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          type="button"
          aria-label="Close Secret Note"
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {type === 'doll' ? (
          <div>
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-tr from-pink-500/20 to-purple-500/20 flex items-center justify-center text-5xl shadow-inner border border-pink-400/40 animate-bounce">
              🪆
            </div>
            <div className="flex items-center justify-center gap-1.5 text-xs text-pink-300 font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Secret Doll Easter Egg
            </div>
            <h3 id="easter-egg-title" className="text-2xl font-bold font-serif text-pink-200 mb-3">
              To Soni, My Eternal Doll ✨
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-6 font-sans">
              "No matter how many birthdays come and go, in my heart you will always be that sweet, adorable, drama-queen little doll whose happiness means the absolute world to me. Keep that precious smile forever!"
            </p>
            <div className="text-right text-xs text-pink-300 font-medium">
              — Your Secret Keeper & Guide, <span className="font-bold">Mannu 🐻</span>
            </div>
          </div>
        ) : (
          <div>
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-tr from-amber-500/20 to-orange-500/20 flex items-center justify-center text-5xl shadow-inner border border-amber-400/40 animate-pulse">
              🐻
            </div>
            <div className="flex items-center justify-center gap-1.5 text-xs text-amber-300 font-semibold uppercase tracking-wider mb-2">
              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" /> Giant Bear Hug Incoming!
            </div>
            <h3 id="easter-egg-title" className="text-2xl font-bold font-serif text-amber-200 mb-3">
              Big Bear Hug for Soni! 🧸❤️
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-6 font-sans">
              "Sending you the biggest, warmest, most unconditional bear hug across time and space! Whenever you feel tired, angry, or confused, remember Mannu is always standing right behind you with open arms."
            </p>
            <div className="text-right text-xs text-amber-300 font-medium">
              — Always with you, <span className="font-bold">Mannu 🐻</span>
            </div>
          </div>
        )}

        <button
          onClick={() => {
            soundManager.playSparkle();
            onClose();
          }}
          type="button"
          className="mt-6 w-full py-3 px-6 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium text-sm shadow-lg hover:brightness-110 active:scale-95 transition-all cursor-pointer"
        >
          Keep in My Heart ❤️
        </button>
      </div>
    </div>
  );
};
