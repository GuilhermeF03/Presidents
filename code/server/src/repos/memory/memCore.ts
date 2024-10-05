import type { CoreRepo } from '../types';
import memGame from './memGame';

export const memCore: CoreRepo = {
  game: memGame(),
};
