import { GameNotFoundError } from '@data/repos/errors/notFound.ts';
import { memData } from '@data/repos/memory/data.ts';
import type { GameRepo } from '@data/repos/types.ts';

const getGame: GameRepo['getGame'] = async (gameId: string) => {
  const { games } = memData;
  const game = games[gameId];
  if (!game) throw new GameNotFoundError(gameId);

  return game;
};

export default {
  getGame,
};
