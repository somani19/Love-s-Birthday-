import React, { useState } from 'react';
import { Sparkles, ArrowRight, Flame, Wind } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/adventureData';
import { soundManager } from '../../utils/soundEffects';
import confetti from 'canvas-confetti';

interface Level8BirthdayCakeProps {
  onNext: () => void;
  onCandlesLitChange: (count: number) => void;
}

export const Level8BirthdayCake: React.FC<Level8BirthdayCakeProps> = ({
  onNext,
  onCandlesLitChange,
}) => {
  // 16 candles for Sweet 16!
  const [candles, setCandles] = useState<boolean[]>(() => new Array(16).fill(false));
  const [candlesBlownOut, setCandlesBlownOut] = useState(false);
  const [wishMade, setWishMade] = useState(false);

  const litCount = candles.filter(Boolean).length;
  const allLit = litCount === 16;

  const triggerCelebration = () => {
    soundManager.playFanfare();

    // Multistage fireworks & confetti
    const count = 200;
    const defaults = { origin: { y: 0.7 } };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55, colors: ['#F472B6', '#FBBF24'] });
    fire(0.2, { spread: 60, colors: ['#C084FC', '#38BDF8'] });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, colors: ['#F43F5E', '#FFF'] });
    fire(0.1, { spread: 120, startVelocity: 45 });
  };

  const toggleCandle = (index: number) => {
    if (candlesBlownOut) return;
    soundManager.playCandleLit();

    const updated = [...candles];
    updated[index] = !updated[index];
    setCandles(updated);

    const newLit = updated.filter(Boolean).length;
    onCandlesLitChange(newLit);

    if (newLit === 16) {
      triggerCelebration();
    }
  };

  const lightAllCandles = () => {
    if (candlesBlownOut) return;
    const all = new Array(16).fill(true);
    setCandles(all);
    onCandlesLitChange(16);
    triggerCelebration();
  };

  const blowOutCandles = () => {
    soundManager.playSparkle();
    setCandlesBlownOut(true);
    setWishMade(true);

    confetti({
      particleCount: 100,
      spread: 120,
      origin: { y: 0.6 },
      colors: ['#FFF', '#FDE047', '#F472B6', '#C084FC'],
    });
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-between px-4 py-8 z-10 select-none">
      {/* Top Header */}
      <div className="max-w-xl w-full text-center z-20">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/15 border border-pink-400/30 text-pink-300 text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Level 8 · Sweet 16 Celebration Cake</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold font-serif text-white mb-2">
          Light the 16 Candles, Soni! 🎂
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mb-4">
          Click each candle to ignite your 16 years of sweetness, laughter, and radiance!
        </p>

        {/* Counter & Action */}
        <div className="flex items-center justify-center gap-4 text-xs">
          <div className="px-4 py-1.5 rounded-full glass-panel bg-white/5 border border-white/10 text-slate-300">
            Candles Lit: <span className="font-bold text-amber-300 font-mono text-sm">{litCount} / 16</span>
          </div>

          {!allLit && !candlesBlownOut && (
            <button
              onClick={lightAllCandles}
              type="button"
              className="px-3 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40 hover:bg-amber-500/30 transition-all cursor-pointer font-medium"
            >
              Light All 16 ✨
            </button>
          )}
        </div>
      </div>

      {/* Interactive Birthday Cake Stage */}
      <div className="relative w-full max-w-xl my-6 flex flex-col items-center justify-center">
        {/* Cake Crown / Number 16 Topper */}
        <div className="mb-2 flex items-center justify-center gap-2">
          <span className="text-3xl animate-bounce filter drop-shadow-[0_0_12px_rgba(251,191,36,0.8)]">
            👑
          </span>
          <div className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-pink-500 text-slate-950 font-extrabold text-sm shadow-[0_0_20px_rgba(251,191,36,0.6)]">
            SWEET 16
          </div>
          <span className="text-3xl animate-bounce filter drop-shadow-[0_0_12px_rgba(251,191,36,0.8)]" style={{ animationDelay: '0.2s' }}>
            🪆
          </span>
        </div>

        {/* 16 Candles Ring on Top of Cake */}
        <div className="flex items-end justify-center gap-1.5 sm:gap-2 mb-[-8px] z-20 px-4 flex-wrap max-w-md">
          {candles.map((isLit, idx) => (
            <button
              key={idx}
              onClick={() => toggleCandle(idx)}
              type="button"
              aria-label={`Candle ${idx + 1}`}
              className="flex flex-col items-center group cursor-pointer"
            >
              {/* Flame */}
              <div className="h-7 flex items-center justify-center">
                {isLit && !candlesBlownOut ? (
                  <div className="w-3.5 h-6 rounded-full bg-gradient-to-t from-red-500 via-amber-400 to-yellow-100 animate-flame shadow-[0_0_15px_rgba(251,191,36,0.9)]" />
                ) : candlesBlownOut ? (
                  <div className="text-[10px] text-slate-400 animate-pulse">💨</div>
                ) : (
                  <div className="w-1.5 h-2 bg-slate-400 group-hover:bg-amber-300 rounded-t transition-colors" />
                )}
              </div>

              {/* Candle Body */}
              <div
                className={`w-3 sm:w-3.5 h-10 rounded-t-sm shadow-sm transition-all ${
                  idx % 2 === 0
                    ? 'bg-gradient-to-b from-pink-300 via-rose-400 to-pink-500'
                    : 'bg-gradient-to-b from-purple-300 via-indigo-400 to-purple-500'
                } ${isLit ? 'border-t border-amber-200' : 'opacity-80'}`}
              >
                {/* Candle spiral stripes */}
                <div className="w-full h-1 bg-white/40 mt-2" />
                <div className="w-full h-1 bg-white/40 mt-2" />
              </div>
            </button>
          ))}
        </div>

        {/* 3-Tier Layered Cake */}
        <div className="flex flex-col items-center z-10">
          {/* Top Tier */}
          <div className="w-48 sm:w-56 h-14 rounded-t-3xl bg-gradient-to-r from-pink-400 via-rose-300 to-pink-400 border-2 border-pink-200 shadow-lg relative overflow-hidden flex items-center justify-center">
            {/* White Cream Drippings */}
            <div className="absolute top-0 inset-x-0 h-4 bg-white/80 rounded-b-xl flex justify-around px-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="w-3 h-5 bg-white/90 rounded-b-full shadow-sm" />
              ))}
            </div>
            <span className="text-xs font-serif font-bold text-pink-900 tracking-wider pt-2">
              Soni's Magic
            </span>
          </div>

          {/* Middle Tier */}
          <div className="w-64 sm:w-72 h-16 rounded-t-2xl bg-gradient-to-r from-purple-400 via-fuchsia-300 to-purple-400 border-2 border-purple-200 shadow-xl relative overflow-hidden flex items-center justify-center">
            <div className="absolute top-0 inset-x-0 h-4 bg-white/80 rounded-b-xl flex justify-around px-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="w-3.5 h-5 bg-white/90 rounded-b-full shadow-sm" />
              ))}
            </div>
            <span className="text-xs font-serif font-bold text-purple-950 tracking-wider pt-2">
              Pure Heart & Innocence
            </span>
          </div>

          {/* Bottom Tier */}
          <div className="w-80 sm:w-96 h-20 rounded-t-2xl bg-gradient-to-r from-rose-500 via-pink-400 to-rose-500 border-2 border-rose-200 shadow-2xl relative overflow-hidden flex items-center justify-center">
            <div className="absolute top-0 inset-x-0 h-5 bg-white/80 rounded-b-xl flex justify-around px-3">
              {Array.from({ length: 11 }).map((_, i) => (
                <div key={i} className="w-4 h-6 bg-white/90 rounded-b-full shadow-sm" />
              ))}
            </div>
            <div className="text-center pt-3">
              <span className="text-sm font-serif font-bold text-rose-950 block">
                Happy 16th Birthday, My Little Doll!
              </span>
              <span className="text-[10px] text-rose-900 font-medium">
                Forever Protected by Mannu 🐻
              </span>
            </div>
          </div>

          {/* Cake Stand / Plate */}
          <div className="w-96 sm:w-[440px] h-5 rounded-full bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-amber-300/80" />
        </div>

        {/* Wish Card / Blow Out Prompt */}
        {allLit && !candlesBlownOut && (
          <div className="mt-6 p-4 rounded-2xl glass-panel bg-slate-900/90 border border-amber-400/50 shadow-2xl text-center animate-fade-in max-w-md w-full">
            <h4 className="text-lg font-bold font-serif text-amber-200 mb-1">
              ✨ All 16 Candles are Blazing!
            </h4>
            <p className="text-xs text-slate-300 mb-4">
              Close your eyes, make your deepest secret wish, and blow them out!
            </p>
            <button
              onClick={blowOutCandles}
              type="button"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-950 font-bold text-xs shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <Wind className="w-4 h-4" />
              <span>Blow Out the Candles 💨🎂</span>
            </button>
          </div>
        )}

        {wishMade && (
          <div className="mt-6 p-4 rounded-2xl glass-panel bg-pink-950/80 border border-pink-400/50 shadow-2xl text-center animate-fade-in max-w-md w-full">
            <h4 className="text-lg font-bold font-serif text-pink-200 mb-1">
              🎉 Your Wish is Sent to the Stars!
            </h4>
            <p className="text-xs text-slate-200">
              May every single dream of yours come true this year, Soni!
            </p>
          </div>
        )}
      </div>

      {/* Navigation Footer */}
      <div className="z-20 text-center mt-4">
        <button
          onClick={onNext}
          type="button"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-sm shadow-[0_0_25px_rgba(244,114,182,0.4)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <span>Level 9 · The Secret Letter 💌</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
