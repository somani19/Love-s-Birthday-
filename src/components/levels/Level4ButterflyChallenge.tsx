import React, { useState, useEffect } from 'react';
import { Sparkles, Trophy, ArrowRight, Heart } from 'lucide-react';
import { BUTTERFLY_COMPLIMENTS, PERSONAL_INFO } from '../../data/adventureData';
import { soundManager } from '../../utils/soundEffects';

interface Level4ButterflyChallengeProps {
  onNext: () => void;
  onButterflyCaught: (total: number) => void;
}

interface ActiveButterfly {
  id: number;
  complimentId: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  caught: boolean;
}

export const Level4ButterflyChallenge: React.FC<Level4ButterflyChallengeProps> = ({
  onNext,
  onButterflyCaught,
}) => {
  const [caughtCount, setCaughtCount] = useState(0);
  const [latestCompliment, setLatestCompliment] = useState<string | null>(
    "Catch a butterfly to unlock Soni's secret compliment! 🦋"
  );
  const [butterflies, setButterflies] = useState<ActiveButterfly[]>(() =>
    Array.from({ length: 7 }, (_, i) => {
      const template = BUTTERFLY_COMPLIMENTS[i % BUTTERFLY_COMPLIMENTS.length];
      return {
        id: i + 1,
        complimentId: template.id,
        x: 15 + Math.random() * 70,
        y: 20 + Math.random() * 60,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        color: template.color,
        size: template.size,
        caught: false,
      };
    })
  );

  // Smooth drift animation
  useEffect(() => {
    const interval = setInterval(() => {
      setButterflies((prev) =>
        prev.map((b) => {
          if (b.caught) return b;
          let nx = b.x + b.vx;
          let ny = b.y + b.vy;
          let nvx = b.vx;
          let nvy = b.vy;

          if (nx < 8 || nx > 88) nvx = -nvx;
          if (ny < 15 || ny > 80) nvy = -nvy;

          return { ...b, x: nx, y: ny, vx: nvx, vy: nvy };
        })
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const catchButterfly = (b: ActiveButterfly) => {
    if (b.caught) return;
    soundManager.playButterflyCatch();

    const template = BUTTERFLY_COMPLIMENTS.find((c) => c.id === b.complimentId) || BUTTERFLY_COMPLIMENTS[0];
    setLatestCompliment(template.compliment);

    const newCount = caughtCount + 1;
    setCaughtCount(newCount);
    onButterflyCaught(newCount);

    setButterflies((prev) =>
      prev.map((item) => {
        if (item.id === b.id) {
          return { ...item, caught: true };
        }
        return item;
      })
    );

    // Respawn after 2 seconds so the fun never ends!
    setTimeout(() => {
      setButterflies((prev) =>
        prev.map((item) => {
          if (item.id === b.id) {
            const nextTmpl = BUTTERFLY_COMPLIMENTS[Math.floor(Math.random() * BUTTERFLY_COMPLIMENTS.length)];
            return {
              ...item,
              x: 10 + Math.random() * 80,
              y: 20 + Math.random() * 60,
              caught: false,
              complimentId: nextTmpl.id,
              color: nextTmpl.color,
            };
          }
          return item;
        })
      );
    }, 2200);
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-between px-4 py-8 z-10 select-none overflow-hidden">
      {/* Header & Score bar */}
      <div className="max-w-xl w-full text-center z-20">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-400/30 text-purple-300 text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Level 4 · Butterfly Forest Challenge</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold font-serif text-white mb-2">
          Catch the Butterflies, Soni! 🦋
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mb-4">
          Click or tap the fluttering butterflies to catch their secret messages!
        </p>

        {/* Score & Counter */}
        <div className="flex items-center justify-center gap-4 text-xs font-medium">
          <div className="px-4 py-1.5 rounded-full glass-panel bg-pink-500/15 border border-pink-400/40 text-pink-200 flex items-center gap-1.5 shadow-sm">
            <Trophy className="w-4 h-4 text-amber-300" />
            <span>Butterflies Caught:</span>
            <span className="font-bold text-amber-300 font-mono text-sm">{caughtCount}</span>
          </div>
          <div className="px-3 py-1.5 rounded-full glass-panel bg-white/5 border border-white/10 text-slate-300">
            Goal: <span className="text-white font-bold">5+</span>
          </div>
        </div>
      </div>

      {/* Floating Interactive Butterfly Play Area */}
      <div className="relative w-full max-w-4xl h-[420px] sm:h-[480px] my-4 rounded-3xl glass-panel bg-slate-900/40 border border-white/10 shadow-inner overflow-hidden">
        {butterflies.map((b) => (
          <button
            key={b.id}
            onClick={() => catchButterfly(b)}
            type="button"
            aria-label={`Catch Butterfly ${b.id}`}
            style={{
              left: `${b.x}%`,
              top: `${b.y}%`,
              transform: `scale(${b.caught ? 1.5 : 1})`,
              opacity: b.caught ? 0 : 1,
              transition: 'transform 0.4s ease-out, opacity 0.4s ease-out',
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2 p-2 group cursor-pointer hover:scale-125 transition-transform"
          >
            {/* SVG Butterfly */}
            <div className="relative flex items-center justify-center">
              <svg
                width={b.size}
                height={b.size}
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="animate-pulse filter drop-shadow-[0_0_8px_rgba(244,114,182,0.8)]"
              >
                {/* Left Wings */}
                <path
                  d="M32 32 C20 10, 0 16, 8 36 C12 46, 26 42, 32 32 Z"
                  fill={b.color}
                  fillOpacity="0.85"
                />
                {/* Right Wings */}
                <path
                  d="M32 32 C44 10, 64 16, 56 36 C52 46, 38 42, 32 32 Z"
                  fill={b.color}
                  fillOpacity="0.85"
                />
                {/* Body & Antennae */}
                <ellipse cx="32" cy="32" rx="2" ry="8" fill="#FFF" />
                <path d="M31 24 C28 18, 24 16, 22 17" stroke="#FFF" strokeWidth="1.5" />
                <path d="M33 24 C36 18, 40 16, 42 17" stroke="#FFF" strokeWidth="1.5" />
              </svg>
            </div>
          </button>
        ))}

        {/* Live unlocked compliment toast inside play area */}
        {latestCompliment && (
          <div className="absolute bottom-4 left-4 right-4 max-w-lg mx-auto p-4 rounded-2xl glass-panel bg-slate-900/90 border border-pink-400/40 shadow-xl text-center animate-fade-in pointer-events-none">
            <div className="flex items-center justify-center gap-1.5 text-xs text-pink-300 font-semibold mb-1">
              <Heart className="w-3.5 h-3.5 fill-pink-400 text-pink-400" /> Unlocked Secret Compliment
            </div>
            <p className="text-sm font-medium text-white font-sans">
              "{latestCompliment}"
            </p>
          </div>
        )}
      </div>

      {/* Navigation Footer */}
      <div className="z-20 text-center">
        <button
          onClick={onNext}
          type="button"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-sm shadow-[0_0_25px_rgba(244,114,182,0.4)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <span>Level 5 · Balloon World 🎈</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
