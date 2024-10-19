import type { CoreRepo } from '../types';
import { memGame } from './memGameRepo';
import { memPlayer } from './memPlayerRepo';

export const memCore = (): CoreRepo => ({
  gameRepo: memGame(),
  playerRepo: memPlayer(),
});
