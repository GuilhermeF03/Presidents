import type { Deck } from '@core/model/game/Deck';
import type { GamePlayerInfo, Hand, Profile } from '@core/model/game/Player';
import { type ActiveGameState, type FinishedGameState, type PendingGameState, Role } from '@core/model/game/State';

export const isRole = (state: Hand | Role): state is Role => {
  return (state as Role) in Role;
};

export const newPlayer = (profile: Profile): GamePlayerInfo => {
  return {
    ...profile,
    state: { cards: [] },
  };
};

export const newPendingGame = (gameId: string, profile: Profile): PendingGameState => {
  return {
    id: gameId,
    host: profile.playerId,
    players: {
      [profile.playerId]: newPlayer(profile),
    },
  };
};

export const newActiveGame = (pendingGame: PendingGameState): ActiveGameState => {
  return {
    ...pendingGame,
    pile: [],
    round: 0,
    turn: 0,
    rolesMap: {},
  };
};

export const newFinishedGame = (activeGame: ActiveGameState): FinishedGameState => {
  return {
    ...activeGame,
    round: activeGame.round + 1,
  };
};
