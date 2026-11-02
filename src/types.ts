export interface WishCard {
  id: number;
  category: 'Love & Bond' | 'Sweet 16' | 'Dreams' | 'Joy & Smiles' | 'Radiance' | 'Mannu\'s Blessings';
  title: string;
  message: string;
  icon: string;
}

export interface GiftItem {
  id: number;
  boxColor: string;
  ribbonColor: string;
  title: string;
  wish: string;
  icon: string;
  sparkleType: string;
}

export interface ButterflyItem {
  id: number;
  color: string;
  accent: string;
  size: number;
  speed: number;
  compliment: string;
}

export interface StarItem {
  id: number;
  title: string;
  message: string;
  constellationPoint: { x: number; y: number };
  color: string;
}

export interface BalloonItem {
  id: number;
  color: string;
  shineColor: string;
  compliment: string;
  x: number;
  speed: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

export interface GameStats {
  butterfliesCaught: number;
  balloonsPopped: number;
  giftsOpened: number;
  starsCollected: number;
  candlesLit: number;
  secretLetterRead: boolean;
  easterEggsFound: number;
}

export interface LevelProgressState {
  level1Completed: boolean;
  level2DoorOpened: boolean;
  level3GiftsOpened: number;
  level4ButterfliesCaught: number;
  level5BalloonsPopped: number;
  level6StarsCollected: number;
  level7ChestOpened: boolean;
  level8CandlesLit: number;
  level9LetterRead: boolean;
  celebrationReached: boolean;
}
