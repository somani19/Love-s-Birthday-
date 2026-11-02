import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Heart } from 'lucide-react';
import { BALLOON_COMPLIMENTS, PERSONAL_INFO } from '../../data/adventureData';
import { soundManager } from '../../utils/soundEffects';
import confetti from 'canvas-confetti';

interface Level5BalloonWorldProps {
  onNext: () => void;
  onBalloonPopped: (total: number) => void;
}

interface FloatingBalloon {
  id: number;
  x: number;
  y: number; // percentage from top
  speed: number;
  color: string;
  shineColor: string;
  size: number;
  popped: boolean;
}

const BALLOON_COLORS = [
  { color: '#F43F5E', shine: '#FDA4AF' }, // Rose
  { color: '#EC4899', shine: '#FBCFE8' }, // Pink
  { color: '#8B5CF6', shine: '#DDD6FE' }, // Purple
  { color: '#06B6D4', shine: '#A5F3FC' }, // Cyan
  { color: '#F59E0B', shine: '#FDE68A' }, // Amber
  { color: '#10B981', shine: '#A7F3D0' }, // Emerald
  { color: '#6366F1', shine: '#C7D2FE' }, // Indigo
];

export const Level5BalloonWorld: React.FC<Level5BalloonWorldProps> = ({
  onNext,
  onBalloonPopped,
}) => {
  const [poppedCount, setPoppedCount] = useState(0);
  const [currentCompliment, setCurrentCompliment] = useState<string | null>(
    "Pop a floating balloon to reveal Soni's birthday compliment! 🎈"
  );

  const [balloons, setBalloons] = useState<FloatingBalloon[]>(() =>
    Array.from({ length: 9 }, (_, i) => {
      const c = BALLOON_COLORS[i % BALLOON_COLORS.length];
      return {
        id: i + 1,
        x: 10 + Math.random() * 80,
        y: 20 + Math.random() * 65,
        speed: 0.15 + Math.random() * 0.2,
        color: c.color,
        shineColor: c.shine,
        size: 55 + Math.random() * 20,
        popped: false,
      };
    })
  );

  // Smooth upward float
  useEffect(() => {
    const timer = setInterval(() => {
      setBalloons((prev) =>
        prev.map((b) => {
          if (b.popped) return b;
          let newY = b.y - b.speed;
          if (newY < -15) {
            newY = 105;
            b.x = 8 + Math.random() * 84;
          }
          return { ...b, y: newY };
        })
      );
    }, 40);

    return () => clearInterval(timer);
  }, []);

  const popBalloon = (b: FloatingBalloon, event: React.MouseEvent) => {
    if (b.popped) return;
    soundManager.playPop();

    // Trigger localized confetti pop
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const x = rect.left / window.innerWidth;
    const y = rect.top / window.innerHeight;

    confetti({
      particleCount: 25,
      spread: 45,
      origin: { x, y },
      colors: [b.color, b.shineColor, '#FFF'],
    });

    const randomCompliment =
      BALLOON_COMPLIMENTS[Math.floor(Math.random() * BALLOON_COMPLIMENTS.length)];
    setCurrentCompliment(randomCompliment);

    const newTotal = poppedCount + 1;
    setPoppedCount(newTotal);
    onBalloonPopped(newTotal);

    setBalloons((prev) =>
      prev.map((item) => (item.id === b.id ? { ...item, popped: true } : item))
    );

    // Respawn balloon after 1.8s
    setTimeout(() => {
      setBalloons((prev) =>
        prev.map((item) => {
          if (item.id === b.id) {
            const nextColor =
              BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)];
            return {
              ...item,
              popped: false,
              y: 105,
              x: 10 + Math.random() * 80,
              color: nextColor.color,
              shineColor: nextColor.shine,
            };
          }
          return item;
        })
      );
    }, 1800);
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-between px-4 py-8 z-10 select-none overflow-hidden">
      {/* Top Header */}
      <div className="max-w-xl w-full text-center z-20">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/15 border border-pink-400/30 text-pink-300 text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Level 5 · Balloon Kingdom</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold font-serif text-white mb-2">
          Pop the Balloons, Soni! 🎈
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mb-4">
          Every balloon holds a sparkling compliment for {PERSONAL_INFO.name}!
        </p>

        {/* Counter */}
        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full glass-panel bg-white/5 border border-white/10 text-xs text-slate-300">
          <span>Balloons Popped:</span>
          <span className="font-bold text-pink-300 font-mono text-sm">
            {poppedCount}
          </span>
          <span className="text-slate-500">|</span>
          <span>Goal: <span className="text-white font-semibold">5+</span></span>
        </div>
      </div>

      {/* Floating Balloon Canvas / Arena */}
      <div className="relative w-full max-w-4xl h-[420px] sm:h-[480px] my-4 rounded-3xl glass-panel bg-slate-900/40 border border-white/10 shadow-inner overflow-hidden">
        {balloons.map((b) => (
          <button
            key={b.id}
            onClick={(e) => popBalloon(b, e)}
            type="button"
            aria-label={`Pop Balloon ${b.id}`}
            style={{
              left: `${b.x}%`,
              top: `${b.y}%`,
              transform: `scale(${b.popped ? 1.4 : 1})`,
              opacity: b.popped ? 0 : 1,
              transition: 'transform 0.2s ease-out, opacity 0.2s ease-out',
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2 p-1 cursor-pointer hover:scale-115 transition-transform"
          >
            {/* SVG Balloon */}
            <div className="relative flex flex-col items-center">
              <svg
                width={b.size}
                height={b.size * 1.25}
                viewBox="0 0 60 75"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]"
              >
                {/* Balloon body */}
                <ellipse cx="30" cy="30" rx="26" ry="29" fill={b.color} />
                {/* Specular shine */}
                <ellipse
                  cx="20"
                  cy="18"
                  rx="6"
                  ry="12"
                  fill={b.shineColor}
                  fillOpacity="0.75"
                  transform="rotate(-25 20 18)"
                />
                {/* Balloon knot */}
                <polygon points="26,58 34,58 30,64" fill={b.color} />
                {/* String */}
                <path
                  d="M30 64 Q33 68 28 72 Q31 75 30 78"
                  stroke="rgba(255,255,255,0.4)"
                  strokeWidth="1.5"
                  fill="none"
                />
              </svg>
            </div>
          </button>
        ))}

        {/* Live Revealed Compliment Card */}
        {currentCompliment && (
          <div className="absolute bottom-4 left-4 right-4 max-w-lg mx-auto p-4 rounded-2xl glass-panel bg-slate-900/95 border border-pink-400/40 shadow-xl text-center animate-fade-in pointer-events-none">
            <div className="flex items-center justify-center gap-1.5 text-xs text-pink-300 font-semibold mb-1">
              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
              <span>Compliment for My Little Doll</span>
            </div>
            <p className="text-base font-bold text-white font-sans">
              "{currentCompliment}"
            </p>
          </div>
        )}
      </div>

      {/* Next Level Button */}
      <div className="z-20 text-center">
        <button
          onClick={onNext}
          type="button"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-sm shadow-[0_0_25px_rgba(244,114,182,0.4)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <span>Level 6 · Star Collection ⭐</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
