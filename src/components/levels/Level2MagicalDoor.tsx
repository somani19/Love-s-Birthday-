import React, { useState } from 'react';
import { Sparkles, Key, ArrowRight, Lock, Unlock } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/adventureData';
import { soundManager } from '../../utils/soundEffects';

interface Level2MagicalDoorProps {
  onNext: () => void;
}

export const Level2MagicalDoor: React.FC<Level2MagicalDoorProps> = ({ onNext }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenDoor = () => {
    if (isOpen || isOpening) return;
    setIsOpening(true);
    soundManager.playDoorOpen();

    setTimeout(() => {
      setIsOpen(true);
      setIsOpening(false);
      soundManager.playSparkle();
    }, 900);
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 py-8 z-10">
      <div className="max-w-2xl w-full flex flex-col items-center">
        {/* Header Title */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-400/30 text-purple-300 text-xs font-semibold mb-3">
          <Key className="w-3.5 h-3.5 text-amber-300" />
          <span>Level 2 · The Enchanted Gateway</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold font-serif text-white mb-2">
          The Magical Door
        </h2>
        <p className="text-sm sm:text-base text-slate-300 max-w-md mb-8">
          Only {PERSONAL_INFO.name} holds the golden key to unlock what lies behind...
        </p>

        {/* The 3D Glowing Door Container */}
        <div className="relative w-64 sm:w-80 h-96 perspective-1000 mb-8">
          {/* Outer glowing frame */}
          <div className="absolute inset-0 rounded-t-full border-4 border-amber-300/60 shadow-[0_0_50px_rgba(251,191,36,0.35)] bg-slate-950/80 overflow-hidden flex items-center justify-center">
            {/* Interior Magical Portal Light (visible when door opens) */}
            <div
              className={`absolute inset-0 bg-gradient-to-t from-pink-500/80 via-purple-500/80 to-amber-200/90 flex flex-col items-center justify-center p-6 transition-all duration-1000 ${
                isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
              }`}
            >
              <Sparkles className="w-12 h-12 text-white animate-spin mb-3" style={{ animationDuration: '8s' }} />
              <div className="text-2xl mb-1">🪆 ✨ 👑</div>
              <p className="text-white font-serif font-bold text-lg leading-tight drop-shadow-md">
                Welcome to your Realm, Soni!
              </p>
              <p className="text-xs text-white/90 mt-1 font-sans">
                Sweet 16 Kingdom Unlocked!
              </p>
            </div>

            {/* Left and Right Door Panels that swing open */}
            <div
              onClick={handleOpenDoor}
              className={`absolute inset-0 flex cursor-pointer transition-transform duration-1000 origin-left ${
                isOpen ? '-rotate-y-85 opacity-30' : 'hover:scale-[1.01]'
              }`}
              style={{
                transformStyle: 'preserve-3d',
                transformOrigin: 'left center',
                transform: isOpen ? 'perspective(1000px) rotateY(-105deg)' : undefined,
              }}
            >
              {/* Door Surface */}
              <div className="w-full h-full rounded-t-full bg-gradient-to-b from-purple-900/90 via-pink-900/90 to-slate-900 border-2 border-pink-400/50 shadow-2xl flex flex-col items-center justify-center p-6 relative select-none">
                {/* Decorative Carvings */}
                <div className="w-44 h-72 border border-pink-400/30 rounded-t-full flex flex-col items-center justify-center p-4">
                  <div className="text-4xl mb-4 animate-pulse">👑</div>
                  <div className="text-xs tracking-widest uppercase font-serif text-pink-300 mb-6">
                    Soni's Realm
                  </div>

                  {/* Door Knob & Lock */}
                  <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-200 shadow-[0_0_20px_rgba(251,191,36,0.6)] flex items-center justify-center border-2 border-amber-500/50">
                    {isOpen ? (
                      <Unlock className="w-6 h-6 text-amber-900" />
                    ) : (
                      <Lock className="w-6 h-6 text-amber-900 animate-bounce" />
                    )}
                  </div>
                  <span className="text-[11px] text-amber-200 mt-2 font-medium">
                    {isOpen ? 'Door Unlocked' : 'Click to Open'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Revealed Message Card */}
        {isOpen ? (
          <div className="glass-panel max-w-lg w-full rounded-2xl p-6 border border-pink-400/40 bg-slate-900/80 shadow-[0_0_35px_rgba(244,114,182,0.3)] animate-fade-in text-center">
            <h3 className="text-xl font-bold font-serif text-pink-200 mb-2">
              ✨ The Stars Align for You, Soni!
            </h3>
            <p className="text-sm text-slate-200 leading-relaxed mb-6 font-sans">
              "Behind this enchanted gateway lies a kingdom built out of your laughter,
              your innocent dreams, and our timeless bond. Happy Sweet 16, my precious doll!
              Your next surprise awaits!"
            </p>
            <button
              onClick={onNext}
              type="button"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold text-sm shadow-lg hover:shadow-pink-500/50 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <span>Enter Gift Kingdom 🎁</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={handleOpenDoor}
            type="button"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-pink-500 text-slate-950 font-bold text-sm shadow-[0_0_25px_rgba(251,191,36,0.5)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <Key className="w-4 h-4" />
            <span>Knock & Unlock the Door 🚪</span>
          </button>
        )}
      </div>
    </div>
  );
};
