import type { CoreRepo } from '../types';
import memGame from './memGameRepo';

export const memCore = (): CoreRepo => ({
  game: memGame(),
});
