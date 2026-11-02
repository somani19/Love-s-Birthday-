/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BackgroundEffects } from './components/BackgroundEffects';
import { TopHUD } from './components/TopHUD';
import { EasterEggModal } from './components/EasterEggModal';
import { AchievementsModal } from './components/AchievementsModal';

// Levels
import { Level1Welcome } from './components/levels/Level1Welcome';
import { Level2MagicalDoor } from './components/levels/Level2MagicalDoor';
import { Level3GiftKingdom } from './components/levels/Level3GiftKingdom';
import { Level4ButterflyChallenge } from './components/levels/Level4ButterflyChallenge';
import { Level5BalloonWorld } from './components/levels/Level5BalloonWorld';
import { Level6StarCollection } from './components/levels/Level6StarCollection';
import { Level7TreasureChest } from './components/levels/Level7TreasureChest';
import { Level8BirthdayCake } from './components/levels/Level8BirthdayCake';
import { Level9SecretLetter } from './components/levels/Level9SecretLetter';
import { Level10FinalCelebration } from './components/levels/Level10FinalCelebration';

// Utils & Data
import {
  calculateProgress,
  calculateAdventureScore,
  getAchievements,
} from './utils/gameLogic';
import { soundManager } from './utils/soundEffects';
import { GameStats } from './types';
import { Sparkles, Heart } from 'lucide-react';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [easterEggType, setEasterEggType] = useState<'doll' | 'bear' | null>(null);
  const [isAchievementsOpen, setIsAchievementsOpen] = useState(false);

  const [stats, setStats] = useState<GameStats>({
    butterfliesCaught: 0,
    balloonsPopped: 0,
    giftsOpened: 0,
    starsCollected: 0,
    candlesLit: 0,
    secretLetterRead: false,
    easterEggsFound: 0,
  });

  // Query parameter support: ?autostart=1 or ?level=X
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const requestedLevel = params.get('level');
      const isAutostart = params.get('autostart');

      if (requestedLevel) {
        const lvl = parseInt(requestedLevel, 10);
        if (!isNaN(lvl) && lvl >= 1 && lvl <= 10) {
          setCurrentLevel(lvl);
        }
      } else if (isAutostart === '1') {
        setCurrentLevel(2);
      }
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1100);

    return () => clearTimeout(timer);
  }, []);

  // Sync state to body dataset for ultra-mode and accessibility
  useEffect(() => {
    if (currentLevel === 1) {
      document.body.dataset.state = 'title';
    } else if (currentLevel === 10) {
      document.body.dataset.state = 'gameover';
    } else {
      document.body.dataset.state = 'playing';
    }
  }, [currentLevel]);

  // Global keyboard listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't capture when typing in search inputs
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (e.key === 'm' || e.key === 'M') {
        soundManager.toggleMusic();
      } else if (e.key === 'Escape') {
        setEasterEggType(null);
        setIsAchievementsOpen(false);
      } else if (e.key >= '1' && e.key <= '9') {
        const lvl = parseInt(e.key, 10);
        setCurrentLevel(lvl);
      } else if (e.key === '0') {
        setCurrentLevel(10);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const progressPercent = calculateProgress(currentLevel, 10);
  const totalScore = calculateAdventureScore(
    stats.butterfliesCaught,
    stats.starsCollected,
    stats.balloonsPopped,
    stats.giftsOpened,
    stats.candlesLit
  );

  const achievements = getAchievements(stats);

  const handleNextLevel = () => {
    soundManager.playSparkle();
    setCurrentLevel((prev) => Math.min(prev + 1, 10));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenEasterEgg = (type: 'doll' | 'bear') => {
    soundManager.playTwinkle();
    setEasterEggType(type);
    setStats((prev) => ({
      ...prev,
      easterEggsFound: prev.easterEggsFound + 1,
    }));
  };

  // Loading Screen
  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 text-white select-none">
        <BackgroundEffects />
        <div className="relative z-10 flex flex-col items-center text-center p-6 max-w-sm">
          <div className="text-6xl mb-4 animate-bounce">🪆</div>
          <h2 className="text-2xl font-serif font-bold text-pink-200 mb-2">
            Soni My Doll 🪆
          </h2>
          <p className="text-xs text-slate-400 mb-6">
            Weaving a magical Sweet 16 realm by Mannu 🐻...
          </p>
          <div className="w-48 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-amber-300 animate-pulse rounded-full w-3/4" />
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-pink-300/80 mt-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Spreading fairy dust & starlight...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative selection:bg-pink-500/30 selection:text-pink-200">
      {/* Dynamic ambient backgrounds */}
      <BackgroundEffects />

      {/* Top HUD Bar */}
      <TopHUD
        currentLevel={currentLevel}
        score={totalScore}
        progressPercent={progressPercent}
        onSelectLevel={(lvl) => {
          soundManager.playSparkle();
          setCurrentLevel(lvl);
        }}
        onOpenAchievements={() => {
          soundManager.playTwinkle();
          setIsAchievementsOpen(true);
        }}
        onOpenEasterEgg={handleOpenEasterEgg}
      />

      {/* Main Content Arena */}
      <main className="flex-1 flex flex-col justify-center pt-16 pb-8 relative z-10">
        {currentLevel === 1 && (
          <Level1Welcome onStart={handleNextLevel} />
        )}

        {currentLevel === 2 && (
          <Level2MagicalDoor onNext={handleNextLevel} />
        )}

        {currentLevel === 3 && (
          <Level3GiftKingdom
            onNext={handleNextLevel}
            onGiftOpened={(count) =>
              setStats((prev) => ({ ...prev, giftsOpened: count }))
            }
          />
        )}

        {currentLevel === 4 && (
          <Level4ButterflyChallenge
            onNext={handleNextLevel}
            onButterflyCaught={(count) =>
              setStats((prev) => ({ ...prev, butterfliesCaught: count }))
            }
          />
        )}

        {currentLevel === 5 && (
          <Level5BalloonWorld
            onNext={handleNextLevel}
            onBalloonPopped={(count) =>
              setStats((prev) => ({ ...prev, balloonsPopped: count }))
            }
          />
        )}

        {currentLevel === 6 && (
          <Level6StarCollection
            onNext={handleNextLevel}
            onStarCollected={(count) =>
              setStats((prev) => ({ ...prev, starsCollected: count }))
            }
          />
        )}

        {currentLevel === 7 && (
          <Level7TreasureChest
            onNext={handleNextLevel}
            onChestOpened={() => soundManager.playFanfare()}
          />
        )}

        {currentLevel === 8 && (
          <Level8BirthdayCake
            onNext={handleNextLevel}
            onCandlesLitChange={(count) =>
              setStats((prev) => ({ ...prev, candlesLit: count }))
            }
          />
        )}

        {currentLevel === 9 && (
          <Level9SecretLetter
            onNext={handleNextLevel}
            onLetterRead={() =>
              setStats((prev) => ({ ...prev, secretLetterRead: true }))
            }
          />
        )}

        {currentLevel === 10 && (
          <Level10FinalCelebration
            onRestart={() => setCurrentLevel(1)}
            onOpenAchievements={() => setIsAchievementsOpen(true)}
          />
        )}
      </main>

      {/* Modals */}
      <EasterEggModal
        type={easterEggType}
        onClose={() => setEasterEggType(null)}
      />

      <AchievementsModal
        isOpen={isAchievementsOpen}
        onClose={() => setIsAchievementsOpen(false)}
        achievements={achievements}
      />
    </div>
  );
}
