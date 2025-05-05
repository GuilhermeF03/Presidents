import type { GameState } from '@core/model/game/State.ts';

type MemData = {
  games: Record<string, GameState>;
};

export const memData: MemData = {
  games: {},
};
