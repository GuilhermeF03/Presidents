import { GameNotFoundError } from '@/main/repos/errors/notFound.ts';
import { memData } from '@/main/repos/memory/data.ts';
import type { GameRepo } from '@/main/repos/types.ts';

const getGame: GameRepo['getGame'] = async (gameId: string) => {
  const { games } = memData;
  const game = games[gameId];
  if (!game) throw new GameNotFoundError(gameId);

  return game;
};

export default {
  getGame,
};
