import React from 'react';
import { X, Award, CheckCircle2, Lock } from 'lucide-react';
import { Achievement } from '../types';

interface AchievementsModalProps {
  isOpen: boolean;
  onClose: () => void;
  achievements: Achievement[];
}

export const AchievementsModal: React.FC<AchievementsModalProps> = ({
  isOpen,
  onClose,
  achievements,
}) => {
  if (!isOpen) return null;

  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="achievements-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative max-w-xl w-full max-h-[85vh] flex flex-col glass-panel rounded-3xl p-6 sm:p-8 border border-purple-400/30 shadow-[0_0_60px_rgba(192,132,252,0.25)] bg-slate-900/95 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-purple-500/30 to-pink-500/30 border border-purple-400/30 text-purple-300">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 id="achievements-title" className="text-xl font-bold font-serif text-pink-200">
                Soni's Sweet 16 Badges
              </h3>
              <p className="text-xs text-slate-400">
                {unlockedCount} of {achievements.length} magical badges unlocked
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            type="button"
            aria-label="Close Badges"
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Badges List */}
        <div className="overflow-y-auto py-4 space-y-3 pr-1 my-2">
          {achievements.map((item) => (
            <div
              key={item.id}
              className={`p-3.5 rounded-2xl border transition-all flex items-center gap-4 ${
                item.unlocked
                  ? 'bg-white/8 border-pink-400/30 shadow-[0_4px_16px_rgba(244,114,182,0.1)]'
                  : 'bg-white/2 border-white/5 opacity-50'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 ${
                  item.unlocked
                    ? 'bg-gradient-to-br from-pink-500/30 to-purple-500/30 border border-pink-400/40 text-pink-200'
                    : 'bg-white/5 border border-white/10 text-slate-500'
                }`}
              >
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-semibold text-slate-100 truncate">
                    {item.title}
                  </h4>
                  {item.unlocked && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1 shrink-0">
                      <CheckCircle2 className="w-3 h-3" /> Unlocked
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 mt-0.5 line-clamp-2">
                  {item.description}
                </p>
              </div>
              {!item.unlocked && (
                <div className="text-slate-500 p-2 shrink-0">
                  <Lock className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="pt-3 border-t border-white/10 text-center">
          <p className="text-xs text-pink-300/80">
            Crafted with infinite love for Soni My Doll 🪆 by Mannu 🐻
          </p>
        </div>
      </div>
    </div>
  );
};
