import React from 'react';
import { Sparkles, Heart, Gift, ArrowRight } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/adventureData';
import { soundManager } from '../../utils/soundEffects';

interface Level1WelcomeProps {
  onStart: () => void;
}

export const Level1Welcome: React.FC<Level1WelcomeProps> = ({ onStart }) => {
  const handleStart = () => {
    soundManager.playFanfare();
    soundManager.toggleMusic(true);
    onStart();
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 py-12 z-10">
      {/* Floating decorative elements */}
      <div className="absolute top-10 left-[10%] text-4xl animate-float opacity-80 select-none">
        🎈
      </div>
      <div className="absolute top-20 right-[12%] text-4xl animate-float-reverse opacity-80 select-none">
        🦋
      </div>
      <div className="absolute bottom-20 left-[15%] text-3xl animate-bounce opacity-70 select-none">
        ✨
      </div>
      <div className="absolute bottom-16 right-[18%] text-4xl animate-float opacity-80 select-none">
        💖
      </div>
      <div className="absolute top-1/3 left-[5%] text-3xl animate-pulse opacity-60 select-none">
        ⭐
      </div>
      <div className="absolute top-1/2 right-[6%] text-3xl animate-float-reverse opacity-70 select-none">
        🌸
      </div>

      {/* Main Glassmorphism Welcome Card */}
      <div className="max-w-2xl w-full glass-panel rounded-3xl p-8 sm:p-12 border border-pink-400/30 shadow-[0_0_60px_rgba(244,114,182,0.25)] relative overflow-hidden bg-slate-900/60 backdrop-blur-2xl">
        {/* Subtle decorative glow */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-pink-500/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />

        {/* Top Badges / Tagline */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/15 border border-pink-400/40 text-pink-300 text-xs sm:text-sm font-medium mb-6">
          <Sparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
          <span>A Magical Sweet 16 Birthday Adventure</span>
          <Heart className="w-3.5 h-3.5 fill-pink-400 text-pink-400 animate-pulse" />
        </div>

        {/* Big Personalized Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-serif text-white tracking-tight leading-tight mb-4">
          Happy 16th Birthday, <br />
          <span className="bg-gradient-to-r from-pink-300 via-purple-300 to-amber-200 bg-clip-text text-transparent underline decoration-pink-500/30 decoration-wavy">
            {PERSONAL_INFO.name}
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-lg mx-auto leading-relaxed mb-8 font-sans">
          Welcome to your enchanted realm, my sweet little doll! A magical journey
          woven with secret wishes, challenges, memories, laughter, and heartfelt blessings.
        </p>

        {/* Creator attribution note */}
        <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-pink-200/90 mb-10 pb-6 border-b border-white/10">
          <span>Crafted with infinite love, secrets & giggles by</span>
          <span className="font-semibold px-2.5 py-0.5 rounded-lg bg-white/10 text-amber-300 border border-amber-300/30">
            {PERSONAL_INFO.createdBy}
          </span>
        </div>

        {/* Glowing Animated Start Button */}
        <div className="flex flex-col items-center justify-center gap-3">
          <button
            onClick={handleStart}
            data-start="true"
            type="button"
            className="group relative inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-4.5 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white font-bold text-base sm:text-lg shadow-[0_0_35px_rgba(244,114,182,0.5)] hover:shadow-[0_0_50px_rgba(244,114,182,0.8)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer overflow-hidden border border-white/20"
          >
            {/* Shimmer effect */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <Gift className="w-5 h-5 text-amber-200 group-hover:rotate-12 transition-transform duration-300" />
            <span>Start the Surprise 🎁</span>
            <ArrowRight className="w-5 h-5 text-pink-200 group-hover:translate-x-1 transition-transform" />
          </button>
          <span className="text-[11px] text-slate-400">
            Turn your sound on for the full fairy-tale experience ✨
          </span>
        </div>
      </div>
    </div>
  );
};
