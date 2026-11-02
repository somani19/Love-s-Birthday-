import React, { useEffect, useState } from 'react';
import { Sparkles, Heart, Award, RotateCcw, Share2, Check, Printer } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/adventureData';
import { soundManager } from '../../utils/soundEffects';
import confetti from 'canvas-confetti';

interface Level10FinalCelebrationProps {
  onRestart: () => void;
  onOpenAchievements: () => void;
}

export const Level10FinalCelebration: React.FC<Level10FinalCelebrationProps> = ({
  onRestart,
  onOpenAchievements,
}) => {
  const [showCertificate, setShowCertificate] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const fireContinuousFireworks = () => {
    soundManager.playFanfare();

    const duration = 4.5 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ['#F472B6', '#FBBF24', '#38BDF8', '#C084FC'],
      });
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ['#EC4899', '#F59E0B', '#10B981', '#A855F7'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  useEffect(() => {
    fireContinuousFireworks();
  }, []);

  const copyShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      soundManager.playSparkle();
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 py-12 z-10 select-none">
      {/* Floating Celebration Icons */}
      <div className="absolute top-8 left-[8%] text-5xl animate-float opacity-90 select-none pointer-events-none">
        🎈
      </div>
      <div className="absolute top-12 right-[10%] text-5xl animate-float-reverse opacity-90 select-none pointer-events-none">
        👑
      </div>
      <div className="absolute bottom-16 left-[12%] text-4xl animate-bounce opacity-90 select-none pointer-events-none">
        💖
      </div>
      <div className="absolute bottom-20 right-[14%] text-4xl animate-float opacity-90 select-none pointer-events-none">
        🦋
      </div>
      <div className="absolute top-1/2 left-[4%] text-3xl animate-pulse opacity-80 select-none pointer-events-none">
        ⭐
      </div>
      <div className="absolute top-1/3 right-[5%] text-4xl animate-float opacity-90 select-none pointer-events-none">
        🎂
      </div>

      <div className="max-w-3xl w-full glass-panel rounded-3xl p-8 sm:p-14 border border-pink-400/40 shadow-[0_0_80px_rgba(244,114,182,0.35)] relative overflow-hidden bg-slate-900/80 backdrop-blur-3xl animate-fade-in">
        {/* Glow backdrop bubbles */}
        <div className="absolute -top-32 -left-32 w-64 h-64 bg-pink-500/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-purple-500/25 rounded-full blur-3xl pointer-events-none" />

        {/* Crown & Doll emblem */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-3xl animate-bounce">👑</span>
          <span className="text-4xl animate-pulse">🪆</span>
          <span className="text-3xl animate-bounce" style={{ animationDelay: '0.2s' }}>
            🐻
          </span>
        </div>

        {/* Giant Glowing Birthday Message */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-serif tracking-tight text-white mb-4 leading-tight">
          🎉 HAPPY BIRTHDAY! 🎂✨
        </h1>

        {/* Subtitle with Name */}
        <div className="text-xl sm:text-2xl md:text-3xl font-serif text-pink-300 font-bold mb-6">
          Dearest {PERSONAL_INFO.name}
        </div>

        {/* Comprehensive Celebration Paragraph */}
        <div className="max-w-2xl mx-auto space-y-4 text-slate-200 text-sm sm:text-base leading-relaxed font-sans mb-8">
          <p>
            Happy Sweet 16th Birthday! Today is a glorious celebration of everything you are:
            your contagious laughter, your gentle kindness, your fiery cute tantrums, and the pure
            light you bring into the world.
          </p>
          <p className="text-pink-200 font-medium">
            May this landmark 16th year shower you with boundless happiness, outstanding success,
            glowing health, thrilling adventures, breathtaking memories, unshakable confidence, and
            a future as radiant as your heart.
          </p>
          <p className="text-xs sm:text-sm text-slate-300">
            Always remember: wherever life leads you, you will forever remain Mannu's cherished little doll.
            May divine blessings (🧿) protect you every second of every day.
          </p>
        </div>

        {/* Dedication footer */}
        <div className="py-4 border-y border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-300 gap-2 mb-8">
          <div className="flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            <span>Forever Loved & Celebrated</span>
          </div>
          <div className="font-semibold text-amber-300">
            Created with infinite love by {PERSONAL_INFO.createdBy}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={fireContinuousFireworks}
            type="button"
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white font-bold text-xs sm:text-sm shadow-[0_0_25px_rgba(244,114,182,0.5)] hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-200" />
            <span>Launch More Fireworks 🎆</span>
          </button>

          <button
            onClick={() => setShowCertificate(true)}
            type="button"
            className="px-5 py-3 rounded-2xl glass-panel bg-white/10 border border-white/20 text-white font-medium text-xs sm:text-sm hover:bg-white/15 transition-all cursor-pointer flex items-center gap-2"
          >
            <Award className="w-4 h-4 text-amber-300" />
            <span>Royal 16 Certificate 📜</span>
          </button>

          <button
            onClick={copyShare}
            type="button"
            className="px-4 py-3 rounded-2xl glass-panel bg-white/10 border border-white/20 text-white font-medium text-xs sm:text-sm hover:bg-white/15 transition-all cursor-pointer flex items-center gap-2"
            title="Share or Copy Link"
          >
            {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4 text-purple-300" />}
            <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
          </button>

          <button
            onClick={onRestart}
            type="button"
            className="px-4 py-3 rounded-2xl glass-panel bg-white/5 border border-white/10 text-slate-300 font-medium text-xs sm:text-sm hover:text-white hover:bg-white/10 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Replay 🔄</span>
          </button>
        </div>
      </div>

      {/* Royal Certificate Modal */}
      {showCertificate && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
          onClick={() => setShowCertificate(false)}
        >
          <div
            className="relative max-w-xl w-full rounded-3xl p-8 sm:p-10 bg-gradient-to-b from-amber-950/90 via-stone-900/95 to-slate-950 border-4 border-amber-300/60 shadow-[0_0_80px_rgba(251,191,36,0.3)] text-center text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-amber-400/20 border-2 border-amber-300/50 flex items-center justify-center text-3xl">
              👑
            </div>

            <div className="text-[11px] font-serif uppercase tracking-[0.2em] text-amber-300 mb-1">
              Royal Decree of Sweet 16
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-amber-200 mb-4">
              Certificate of Eternal Love & Grace
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
              This royal milestone is formally bestowed upon{' '}
              <span className="font-bold text-pink-300 font-serif text-base">
                {PERSONAL_INFO.name}
              </span>{' '}
              on the occasion of her 16th Birthday. Certified as the sweetest, most adorable,
              wonderfully crazy, and forever treasured Little Doll in the entire universe.
            </p>

            <div className="flex items-center justify-between text-xs pt-6 border-t border-amber-300/20 text-slate-400">
              <div className="text-left">
                <span className="block text-[10px] text-amber-300/80">BESTOWED BY</span>
                <span className="font-bold text-white">{PERSONAL_INFO.createdBy}</span>
              </div>
              <div className="text-2xl">🧿 ❤️ 🪆</div>
              <div className="text-right">
                <span className="block text-[10px] text-amber-300/80">HONORED AGE</span>
                <span className="font-bold text-white">Sweet 16 Years</span>
              </div>
            </div>

            <button
              onClick={() => setShowCertificate(false)}
              type="button"
              className="mt-6 px-6 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs hover:bg-amber-300 transition-colors cursor-pointer"
            >
              Close Keepsake 📜
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
