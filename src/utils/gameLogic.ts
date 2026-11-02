import { Achievement, GameStats, LevelProgressState } from '../types';

export const TOTAL_LEVELS = 10; // Level 1 through 9, plus Level 10 (Celebration)

export function calculateProgress(currentLevel: number, totalLevels: number = TOTAL_LEVELS): number {
  if (currentLevel <= 1) return 10;
  if (currentLevel >= totalLevels) return 100;
  return Math.round((currentLevel / totalLevels) * 100);
}

export function canAdvanceLevel(targetLevel: number, progress: LevelProgressState): boolean {
  if (targetLevel <= 1) return true;
  if (targetLevel === 2) return progress.level1Completed;
  if (targetLevel === 3) return progress.level2DoorOpened;
  if (targetLevel === 4) return progress.level3GiftsOpened >= 1; // at least 1 gift to preview or advance
  if (targetLevel === 5) return progress.level4ButterfliesCaught >= 1;
  if (targetLevel === 6) return progress.level5BalloonsPopped >= 1;
  if (targetLevel === 7) return progress.level6StarsCollected >= 1;
  if (targetLevel === 8) return progress.level7ChestOpened;
  if (targetLevel === 9) return progress.level8CandlesLit >= 16;
  if (targetLevel === 10) return progress.level9LetterRead;
  return false;
}

export function checkAllCandlesLit(candles: boolean[]): boolean {
  if (!candles || candles.length === 0) return false;
  return candles.every((c) => c === true);
}

export function checkStarsCollected(stars: boolean[]): boolean {
  if (!stars || stars.length === 0) return false;
  return stars.every((s) => s === true);
}

export function countOpenedGifts(gifts: boolean[]): number {
  if (!gifts) return 0;
  return gifts.filter(Boolean).length;
}

export function calculateAdventureScore(
  butterfliesCaught: number,
  starsCollected: number,
  balloonsPopped: number,
  giftsOpened: number,
  candlesLit: number
): number {
  return (
    butterfliesCaught * 25 +
    starsCollected * 50 +
    balloonsPopped * 15 +
    giftsOpened * 30 +
    candlesLit * 40
  );
}

export function getAchievements(stats: GameStats): Achievement[] {
  return [
    {
      id: 'first_step',
      title: 'First Step into Magic',
      description: 'Began the Sweet 16 Birthday Adventure',
      icon: '✨',
      unlocked: true,
    },
    {
      id: 'door_opened',
      title: 'Enchanted Gateway',
      description: 'Unlocked the magical glowing door to Soni’s kingdom',
      icon: '🚪',
      unlocked: stats.giftsOpened > 0 || stats.butterfliesCaught > 0,
    },
    {
      id: 'gift_master',
      title: 'Gift Kingdom Explorer',
      description: 'Opened at least 5 magical gifts',
      icon: '🎁',
      unlocked: stats.giftsOpened >= 5,
    },
    {
      id: 'butterfly_whisperer',
      title: 'Butterfly Whisperer',
      description: 'Caught 5 or more fluttering butterflies',
      icon: '🦋',
      unlocked: stats.butterfliesCaught >= 5,
    },
    {
      id: 'balloon_popper',
      title: 'Smile Spreader',
      description: 'Popped 8 colorful balloons of happiness',
      icon: '🎈',
      unlocked: stats.balloonsPopped >= 8,
    },
    {
      id: 'starlight_guardian',
      title: 'Constellation of Love',
      description: 'Collected all 5 shining starlight wishes',
      icon: '⭐',
      unlocked: stats.starsCollected >= 5,
    },
    {
      id: 'candle_lighter',
      title: 'Sweet 16 Illuminator',
      description: 'Lit all 16 candles on the birthday cake',
      icon: '🎂',
      unlocked: stats.candlesLit >= 16,
    },
    {
      id: 'letter_keeper',
      title: 'Keeper of Secrets',
      description: 'Read Mannu’s heartfelt handwritten letter',
      icon: '💌',
      unlocked: stats.secretLetterRead,
    },
    {
      id: 'easter_egg_hunter',
      title: 'Bond of a Lifetime',
      description: 'Discovered the hidden Easter egg hug',
      icon: '🐻',
      unlocked: stats.easterEggsFound > 0,
    },
  ];
}
