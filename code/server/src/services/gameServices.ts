import type { GameRepo } from '@/repos/types';

type GameServices = {
  create: () => Promise<string>;
};

const gameServices = (gameRepo: GameRepo): GameServices => ({
  create: async () => {
    return 'michael';
  },
});

export default gameServices;
