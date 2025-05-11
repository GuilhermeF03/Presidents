import {
  type ActiveGameState,
  type FinishedGameState,
  type GameRoleMap,
  type PendingGameState,
  Role,
} from '@core/model/game/State.ts';
import type { GamePlayerInfo, Profile } from '@core/model/game/player.ts';
import { LinkedList, LinkedListNode } from '@core/model/LinkedList.ts';
import { Hand } from '@core/model/game/Hand.ts';


export const isRole = (state: Hand | Role): state is Role => {
  return (state as Role) in Role;
};

export const newPlayer = (profile: Profile): LinkedListNode<GamePlayerInfo> => {
  return new LinkedListNode<GamePlayerInfo>({
    playerId: profile.playerId,
    name: profile.name,
    picture: profile.picture,
    hand: new Hand(),
  });
};

export const newPendingGame = (gameId: string, profile: Profile): PendingGameState => {
  const playersList = new LinkedList<GamePlayerInfo>()
  const newPlayerNode = newPlayer(profile);
  playersList.append(newPlayerNode);

  return {
    id: gameId,
    host: profile.playerId,
    players: playersList,
    roles: {
      [Role.President]: undefined,
      [Role.VicePresident]: undefined,
      [Role.ViceScum]: undefined,
      [Role.Scum]: undefined,
    },
  };
};

export const newActiveGame = (pendingGame: PendingGameState): ActiveGameState => {
  return {
    ...pendingGame,
    pile: [],
    roles: {
      [Role.President]: undefined,
      [Role.VicePresident]: undefined,
      [Role.ViceScum]: undefined,
      [Role.Scum]: undefined,
    },
  };
};

export const newFinishedGame = (
  activeGame: ActiveGameState,
  roles : GameRoleMap
): FinishedGameState => {
  return {
    ...activeGame,
    roles
  };
};
