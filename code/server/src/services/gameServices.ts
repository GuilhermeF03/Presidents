import type { GameRepo } from '@/repos/types';
import type { GameOpInput, PlayerOpInput } from '@core/models/input/types';

type GameServices = {
  create: (input: PlayerOpInput) => Promise<string>;
  join: (input: GameOpInput) => Promise<string>;
};

const gameServices = (_gameRepo: GameRepo): GameServices => ({
  create: async input => {
    return input.playerId;
  },
  join: async _input => {
    return '';
  },
});

export default gameServices;
