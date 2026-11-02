import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateProgress,
  checkAllCandlesLit,
  checkStarsCollected,
  countOpenedGifts,
  calculateAdventureScore,
  getAchievements,
} from './gameLogic';

test('calculateProgress returns correct percentage values', () => {
  assert.equal(calculateProgress(1, 10), 10);
  assert.equal(calculateProgress(5, 10), 50);
  assert.equal(calculateProgress(10, 10), 100);
  assert.equal(calculateProgress(12, 10), 100);
});

test('checkAllCandlesLit correctly validates all 16 candles', () => {
  const allLit = new Array(16).fill(true);
  const someLit = [true, true, false, true];
  const empty: boolean[] = [];

  assert.equal(checkAllCandlesLit(allLit), true);
  assert.equal(checkAllCandlesLit(someLit), false);
  assert.equal(checkAllCandlesLit(empty), false);
});

test('checkStarsCollected validates when 5 stars are collected', () => {
  assert.equal(checkStarsCollected([true, true, true, true, true]), true);
  assert.equal(checkStarsCollected([true, true, false, true, true]), false);
});

test('countOpenedGifts counts opened gift flags', () => {
  assert.equal(countOpenedGifts([true, false, true, true]), 3);
  assert.equal(countOpenedGifts([]), 0);
});

test('calculateAdventureScore scores activities properly', () => {
  const score = calculateAdventureScore(4, 5, 10, 8, 16);
  // 4*25 (100) + 5*50 (250) + 10*15 (150) + 8*30 (240) + 16*40 (640) = 1380
  assert.equal(score, 1380);
});

test('getAchievements unlocks badges dynamically based on stats', () => {
  const stats = {
    butterfliesCaught: 6,
    balloonsPopped: 9,
    giftsOpened: 6,
    starsCollected: 5,
    candlesLit: 16,
    secretLetterRead: true,
    easterEggsFound: 1,
  };

  const achievements = getAchievements(stats);
  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  assert.equal(unlockedCount, 9); // all 9 unlocked
});
