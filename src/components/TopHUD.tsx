import React, { useState } from 'react';
import { Sparkles, Award, Map, ChevronDown } from 'lucide-react';
import { AudioControls } from './AudioControls';
import { TOTAL_LEVELS } from '../utils/gameLogic';

interface TopHUDProps {
  currentLevel: number;
  score: number;
  progressPercent: number;
  onSelectLevel: (lvl: number) => void;
  onOpenAchievements: () => void;
  onOpenEasterEgg: (type: 'doll' | 'bear') => void;
}

const LEVEL_NAMES = [
  'Magical Welcome',
  'The Magical Door',
  'Gift Kingdom',
  'Butterfly Challenge',
  'Balloon World',
  'Star Collection',
  'Treasure Chest',
  'Birthday Cake',
  'Secret Letter',
  'Final Celebration',
];

export const TopHUD: React.FC<TopHUDProps> = ({
  currentLevel,
  score,
  progressPercent,
  onSelectLevel,
  onOpenAchievements,
  onOpenEasterEgg,
}) => {
  const [levelDropdownOpen, setLevelDropdownOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-3 sm:px-6 py-2.5 sm:py-3 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand Zone */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="text-xl sm:text-2xl animate-bounce" title="Soni My Doll">🪆</span>
            <span className="text-base sm:text-lg animate-pulse" title="Mannu">🐻</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-xs sm:text-sm tracking-tight text-pink-200 whitespace-nowrap">
                Soni My Doll 🪆
              </span>
              <span className="hidden md:inline-block text-[10px] px-1.5 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-400/30">
                Sweet 16
              </span>
            </div>
            <p className="hidden sm:block text-[10px] text-slate-400">
              Created with love by Mannu 🐻
            </p>
          </div>
        </div>

        {/* Center: Adventure Level & Progress */}
        <div className="flex-1 max-w-xs sm:max-w-md mx-2 relative">
          <div className="flex items-center justify-between text-[11px] font-medium text-slate-300 mb-1">
            <button
              onClick={() => setLevelDropdownOpen(!levelDropdownOpen)}
              type="button"
              className="flex items-center gap-1 text-pink-300 hover:text-pink-100 transition-colors font-medium cursor-pointer"
            >
              <Map className="w-3.5 h-3.5" />
              <span className="truncate max-w-[120px] sm:max-w-[200px]">
                Lvl {currentLevel}: {LEVEL_NAMES[currentLevel - 1] || 'Celebration'}
              </span>
              <ChevronDown className={`w-3 h-3 transition-transform ${levelDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            <span className="tabular-nums font-mono text-[10px] text-purple-300">
              {progressPercent}%
            </span>
          </div>

          {/* Progress track */}
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-amber-300 rounded-full transition-all duration-500 ease-out shadow-[0_0_8px_rgba(244,114,182,0.8)]"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Level Switcher Dropdown */}
          {levelDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 p-2 rounded-2xl glass-panel bg-slate-900/95 border border-pink-400/30 shadow-2xl z-50 animate-fade-in max-h-72 overflow-y-auto">
              <div className="text-[10px] text-slate-400 px-2 py-1 font-semibold uppercase tracking-wider">
                Jump to Adventure Level
              </div>
              <div className="space-y-1">
                {LEVEL_NAMES.map((name, idx) => {
                  const lvlNum = idx + 1;
                  const isActive = currentLevel === lvlNum;
                  return (
                    <button
                      key={lvlNum}
                      onClick={() => {
                        onSelectLevel(lvlNum);
                        setLevelDropdownOpen(false);
                      }}
                      type="button"
                      className={`w-full text-left px-3 py-1.5 rounded-xl text-xs flex items-center justify-between transition-all cursor-pointer ${
                        isActive
                          ? 'bg-pink-500/30 text-pink-200 font-semibold border border-pink-400/40'
                          : 'text-slate-300 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <span>
                        <span className="text-pink-400 font-mono mr-1.5">{lvlNum}.</span>
                        {name}
                      </span>
                      {isActive && <Sparkles className="w-3 h-3 text-amber-300" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right Controls: Easter Eggs, Badges & Audio */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Easter egg quick action for Soni Doll */}
          <button
            onClick={() => onOpenEasterEgg('doll')}
            type="button"
            aria-label="Secret Doll Note"
            title="A secret message for Soni 🪆"
            className="p-1.5 sm:px-2 sm:py-1 rounded-full text-xs font-medium border border-pink-400/30 bg-pink-500/10 text-pink-200 hover:bg-pink-500/25 transition-all cursor-pointer"
          >
            <span className="text-sm">🪆</span>
            <span className="hidden lg:inline ml-1">Doll Secret</span>
          </button>

          {/* Easter egg quick action for Bear Hug */}
          <button
            onClick={() => onOpenEasterEgg('bear')}
            type="button"
            aria-label="Mannu's Bear Hug"
            title="Warm Bear Hug from Mannu 🐻"
            className="p-1.5 sm:px-2 sm:py-1 rounded-full text-xs font-medium border border-amber-400/30 bg-amber-500/10 text-amber-200 hover:bg-amber-500/25 transition-all cursor-pointer"
          >
            <span className="text-sm">🐻</span>
            <span className="hidden lg:inline ml-1">Bear Hug</span>
          </button>

          {/* Badges Button */}
          <button
            onClick={onOpenAchievements}
            type="button"
            aria-label="Open Badges"
            className="p-2 rounded-full text-xs border border-purple-400/30 bg-purple-500/10 text-purple-200 hover:bg-purple-500/25 transition-all cursor-pointer"
            title="Adventure Badges"
          >
            <Award className="w-4 h-4 text-purple-300" />
          </button>

          {/* Audio Controls */}
          <AudioControls />
        </div>
      </div>
    </header>
  );
};
