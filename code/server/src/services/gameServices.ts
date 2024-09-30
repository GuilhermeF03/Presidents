import type { GamePipeline } from '@/pipeline.types';
import type { GameRepo } from '@/repos/types';
import type { GameOpInput } from '@core/models/game/Input';

export interface GameServices extends GamePipeline {}

const gameServices = (gameRepo: GameRepo): GameServices => ({
  create: async input => {
    const id = await gameRepo.create(input);
    return id;
  },
  join: async input => {
    const gameId = await gameRepo.join(input);
    return gameId;
  },
  leave: async input => {
    return await gameRepo.leave(input);
  },
  play: async input => {
    return await gameRepo.play(input);
  },
  start: function (_input: GameOpInput): Promise<void> {
    throw new Error('Function not implemented.');
  },
});

export default gameServices;
