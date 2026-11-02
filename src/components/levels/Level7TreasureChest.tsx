import React, { useState } from 'react';
import { Sparkles, ArrowRight, Search, Heart, Lock, Unlock } from 'lucide-react';
import { TREASURE_WISHES, PERSONAL_INFO } from '../../data/adventureData';
import { WishCard } from '../../types';
import { soundManager } from '../../utils/soundEffects';
import confetti from 'canvas-confetti';

interface Level7TreasureChestProps {
  onNext: () => void;
  onChestOpened: () => void;
}

const CATEGORIES = [
  'All',
  'Love & Bond',
  'Sweet 16',
  'Dreams',
  'Joy & Smiles',
  'Radiance',
  "Mannu's Blessings",
];

export const Level7TreasureChest: React.FC<Level7TreasureChestProps> = ({
  onNext,
  onChestOpened,
}) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);

  const handleOpenChest = () => {
    setIsUnlocked(true);
    onChestOpened();
    soundManager.playFanfare();
    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#FBBF24', '#F472B6', '#C084FC', '#38BDF8'],
    });
  };

  const toggleFavorite = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    soundManager.playTwinkle();
    setFavoriteIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const filteredWishes = TREASURE_WISHES.filter((wish) => {
    const matchesCat =
      activeCategory === 'All' || wish.category === activeCategory;
    const matchesQuery =
      wish.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      wish.message.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-between px-4 py-8 z-10">
      {/* Top Header */}
      <div className="max-w-xl w-full text-center z-20">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Level 7 · The Vault of 30 Wishes</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold font-serif text-white mb-2">
          Magical Treasure Chest 💎
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mb-6">
          30 enchanted birthday blessings woven exclusively for {PERSONAL_INFO.name}.
        </p>
      </div>

      {!isUnlocked ? (
        /* Sealed Chest View */
        <div className="flex flex-col items-center justify-center my-8 text-center animate-fade-in max-w-md w-full">
          <div
            onClick={handleOpenChest}
            className="group relative cursor-pointer p-8 rounded-3xl glass-panel bg-gradient-to-b from-amber-900/40 via-slate-900/80 to-slate-950 border-2 border-amber-400/50 shadow-[0_0_60px_rgba(251,191,36,0.3)] hover:scale-105 active:scale-95 transition-all duration-300 select-none"
          >
            <div className="w-36 h-36 mx-auto mb-4 flex items-center justify-center text-7xl filter drop-shadow-[0_0_20px_rgba(251,191,36,0.8)] group-hover:rotate-3 transition-transform">
              💎
            </div>
            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-amber-400/20 border border-amber-300/40 flex items-center justify-center text-2xl text-amber-300 shadow-inner">
              <Lock className="w-8 h-8 text-amber-300 animate-bounce" />
            </div>
            <h3 className="text-2xl font-bold font-serif text-amber-200 mb-1">
              Tap to Unlock Treasure
            </h3>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              Open to reveal all 30 glowing Sweet 16 cards from Mannu
            </p>
          </div>

          <button
            onClick={handleOpenChest}
            type="button"
            className="mt-6 inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-pink-500 text-slate-950 font-bold text-sm shadow-[0_0_25px_rgba(251,191,36,0.6)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <Unlock className="w-4 h-4" />
            <span>Open Soni's Chest ✨</span>
          </button>
        </div>
      ) : (
        /* Unlocked Vault View - 30 Cards Grid */
        <div className="w-full max-w-5xl my-4 flex flex-col gap-6 animate-fade-in">
          {/* Controls: Category Filter Tabs & Search */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 glass-panel p-4 rounded-2xl border border-white/10 bg-slate-900/70">
            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    type="button"
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? 'bg-amber-400/30 text-amber-200 border border-amber-400/50 shadow-sm'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search wishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-400/50 transition-colors"
              />
            </div>
          </div>

          {/* Cards Count Info */}
          <div className="flex items-center justify-between text-xs text-slate-400 px-2">
            <span>
              Showing <span className="font-bold text-amber-300">{filteredWishes.length}</span> of 30 Wishes
            </span>
            <span>
              ⭐ {favoriteIds.length} Saved in Favorites
            </span>
          </div>

          {/* 30 Glowing Wish Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[520px] overflow-y-auto pr-1">
            {filteredWishes.map((wish) => {
              const isFav = favoriteIds.includes(wish.id);
              return (
                <div
                  key={wish.id}
                  className="glass-panel-card p-5 rounded-2xl border border-white/10 bg-slate-900/60 hover:border-amber-400/40 hover:bg-slate-900/80 transition-all duration-300 flex flex-col justify-between group shadow-sm"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl p-2 rounded-xl bg-white/5 border border-white/10">
                          {wish.icon}
                        </span>
                        <div>
                          <span className="text-[10px] text-amber-300/90 font-semibold uppercase tracking-wider block">
                            {wish.category}
                          </span>
                          <span className="text-[10px] text-slate-500">Wish #{wish.id}</span>
                        </div>
                      </div>

                      <button
                        onClick={(e) => toggleFavorite(wish.id, e)}
                        type="button"
                        aria-label={isFav ? 'Remove Favorite' : 'Add to Favorites'}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            isFav ? 'fill-rose-500 text-rose-500' : ''
                          }`}
                        />
                      </button>
                    </div>

                    <h4 className="text-base font-bold font-serif text-white mb-1.5 group-hover:text-amber-200 transition-colors">
                      {wish.title}
                    </h4>

                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      {wish.message}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-400">
                    <span>Soni My Doll 🪆</span>
                    <span className="text-pink-300">By Mannu 🐻</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Navigation Footer */}
      <div className="z-20 text-center mt-4">
        <button
          onClick={onNext}
          type="button"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-sm shadow-[0_0_25px_rgba(244,114,182,0.4)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <span>Level 8 · Birthday Cake 🎂</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
