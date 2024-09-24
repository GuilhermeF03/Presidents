import type { GameRepo } from '@/repos/types';
import type { GameOpInput, PlayerOpInput } from '@core/models/input/types';

type GameServices = {
  create: (input: PlayerOpInput) => Promise<string>;
  join: (input: GameOpInput) => Promise<string>;
};

const gameServices = (gameRepo: GameRepo): GameServices => ({
  create: async input => {
    return input.playerId;
  },
  join: async input => {
    return '';
  },
});

export default gameServices;
