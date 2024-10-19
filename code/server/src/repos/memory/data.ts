import type { GameState } from '@core/model/game/State';

type MemData = {
  games: Record<string, GameState>;
};

export const memData: MemData = {
  games: {},
};
