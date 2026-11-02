import React, { useState, useEffect } from 'react';
import { Mail, Sparkles, Heart, ArrowRight, Copy, Check, FastForward } from 'lucide-react';
import { SECRET_LETTER, PERSONAL_INFO } from '../../data/adventureData';
import { soundManager } from '../../utils/soundEffects';

interface Level9SecretLetterProps {
  onNext: () => void;
  onLetterRead: () => void;
}

export const Level9SecretLetter: React.FC<Level9SecretLetterProps> = ({
  onNext,
  onLetterRead,
}) => {
  const [isOpened, setIsOpened] = useState(false);
  const [displayedTextLength, setDisplayedTextLength] = useState(0);
  const [copied, setCopied] = useState(false);

  // Full joined text for typewriter
  const fullLetterContent = [
    SECRET_LETTER.salutation,
    '',
    ...SECRET_LETTER.paragraphs,
    '',
    SECRET_LETTER.signOff,
    SECRET_LETTER.sender,
  ].join('\n\n');

  const openLetter = () => {
    setIsOpened(true);
    onLetterRead();
    soundManager.playSparkle();
  };

  // Typewriter effect
  useEffect(() => {
    if (!isOpened) return;

    if (displayedTextLength < fullLetterContent.length) {
      const timer = setTimeout(() => {
        setDisplayedTextLength((prev) => Math.min(prev + 4, fullLetterContent.length));
        // Soft occasional typewriter sound
        if (displayedTextLength % 20 === 0) {
          soundManager.playTone(800 + Math.random() * 200, 'sine', 0.05, 0.02);
        }
      }, 25);

      return () => clearTimeout(timer);
    }
  }, [isOpened, displayedTextLength, fullLetterContent.length]);

  const showImmediately = () => {
    setDisplayedTextLength(fullLetterContent.length);
    soundManager.playSparkle();
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(fullLetterContent);
    setCopied(true);
    soundManager.playTwinkle();
    setTimeout(() => setCopied(false), 2500);
  };

  const isTypingComplete = displayedTextLength >= fullLetterContent.length;

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-between px-4 py-8 z-10">
      {/* Top Header */}
      <div className="max-w-xl w-full text-center z-20">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-400/30 text-rose-300 text-xs font-semibold mb-2">
          <Mail className="w-3.5 h-3.5 text-rose-300" />
          <span>Level 9 · The Handwritten Secret Letter</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold font-serif text-white mb-2">
          A Letter From the Heart 💌
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mb-6">
          Straight from Mannu 🐻 to his favorite doll Soni 🪆 on her Sweet 16.
        </p>
      </div>

      {!isOpened ? (
        /* Sealed Magical Wax Envelope */
        <div className="my-8 flex flex-col items-center justify-center animate-fade-in max-w-md w-full">
          <div
            onClick={openLetter}
            className="group relative cursor-pointer w-72 sm:w-88 h-56 rounded-3xl bg-gradient-to-br from-rose-950/80 via-purple-950/70 to-slate-900 border-2 border-rose-400/40 shadow-[0_0_50px_rgba(244,114,182,0.3)] flex flex-col items-center justify-center p-6 hover:scale-105 active:scale-95 transition-all select-none overflow-hidden"
          >
            {/* Wax Seal */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-rose-600 to-red-500 border-2 border-rose-300/60 shadow-[0_0_25px_rgba(225,29,72,0.8)] flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform">
              <Heart className="w-8 h-8 fill-white" />
            </div>

            <div className="text-sm font-serif font-bold text-rose-200">
              To: {PERSONAL_INFO.name}
            </div>
            <div className="text-xs text-slate-400 mt-1">
              From: {PERSONAL_INFO.createdBy}
            </div>

            <div className="mt-4 px-3 py-1 rounded-full bg-white/10 text-[11px] text-pink-300 font-medium flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>Tap Wax Seal to Unseal</span>
            </div>
          </div>

          <button
            onClick={openLetter}
            type="button"
            className="mt-6 inline-flex items-center gap-2 px-8 py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-purple-600 text-white font-bold text-sm shadow-[0_0_25px_rgba(244,114,182,0.5)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <Mail className="w-4 h-4" />
            <span>Open & Read Secret Letter ✨</span>
          </button>
        </div>
      ) : (
        /* Opened Letter Scroll with Typewriter Effect */
        <div className="w-full max-w-2xl my-4 flex flex-col gap-4 animate-fade-in">
          {/* Action buttons bar */}
          <div className="flex items-center justify-between text-xs px-2">
            <div className="flex items-center gap-2 text-pink-300 font-serif font-bold text-sm">
              <Heart className="w-4 h-4 fill-pink-400" />
              <span>Mannu's Handwritten Words</span>
            </div>

            <div className="flex items-center gap-2">
              {!isTypingComplete && (
                <button
                  onClick={showImmediately}
                  type="button"
                  className="px-2.5 py-1 rounded-lg glass-panel bg-white/5 border border-white/10 text-slate-300 hover:text-white flex items-center gap-1 text-[11px] cursor-pointer"
                >
                  <FastForward className="w-3 h-3 text-amber-300" />
                  <span>Read All</span>
                </button>
              )}

              <button
                onClick={copyToClipboard}
                type="button"
                className="px-2.5 py-1 rounded-lg glass-panel bg-white/5 border border-white/10 text-slate-300 hover:text-white flex items-center gap-1 text-[11px] cursor-pointer"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-slate-400" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Letter Parchment Container */}
          <div className="relative rounded-3xl p-6 sm:p-10 bg-gradient-to-b from-stone-900/90 via-slate-900/90 to-stone-950/95 border-2 border-rose-300/30 shadow-[0_0_50px_rgba(244,114,182,0.2)] text-left max-h-[520px] overflow-y-auto font-sans leading-relaxed text-slate-100 selection:bg-pink-500/40">
            {/* Top decorative header */}
            <div className="border-b border-rose-400/20 pb-4 mb-6 flex items-center justify-between">
              <div>
                <span className="text-[11px] uppercase tracking-widest text-rose-300 font-semibold block">
                  Sweet 16 Secret Keepsake
                </span>
                <span className="text-xs text-slate-400">
                  Written with all heart for Soni
                </span>
              </div>
              <div className="text-2xl">🪆 🧿 🐻</div>
            </div>

            {/* Letter Body (Typewriter rendered) */}
            <div className="whitespace-pre-wrap font-sans text-sm sm:text-base text-slate-200 leading-relaxed space-y-4">
              {fullLetterContent.slice(0, displayedTextLength)}
              {!isTypingComplete && (
                <span className="inline-block w-1.5 h-4 ml-0.5 bg-rose-400 animate-pulse align-middle" />
              )}
            </div>

            {/* Bottom seal */}
            <div className="mt-8 pt-6 border-t border-rose-400/20 flex items-center justify-between text-xs text-slate-400">
              <span>Date: Sweet 16th Birthday</span>
              <span className="text-rose-300 font-serif font-bold">Forever Protected 🧿❤️</span>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Footer */}
      <div className="z-20 text-center mt-4">
        <button
          onClick={onNext}
          type="button"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white font-bold text-sm shadow-[0_0_30px_rgba(244,114,182,0.5)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <span>🎉 Enter Grand Final Celebration ✨</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
