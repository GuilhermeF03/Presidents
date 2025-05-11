import { z } from 'zod';
import type { LinkedList } from '../LinkedList.ts';
import type { Card } from './card';
import type { ID } from './misc.ts';
import type { GamePlayerInfo } from './player';

export enum Role {
  President = 'President',
  VicePresident = 'Vice President',
  ViceScum = 'Vice Scum',
  Scum = 'Scum',
  Person = 'Person'
}
export const ZodRole = z.nativeEnum(Role);

class BaseGameState {
  constructor(
    public id: ID,
    public host: ID,
    public players: LinkedList<GamePlayerInfo>,
    public roles: GameRoleMap = {
      [Role.President]: "",
      [Role.VicePresident]: "",
      [Role.ViceScum]: "",
      [Role.Scum]: "",
    },
  ) {}
}

/**
 * Represents the state of the game when it is pending.
 */
export class PendingGameState extends BaseGameState {}

export type GameRoleMap = {
  [Role.President]: ID | undefined;
  [Role.VicePresident]: ID | undefined;
  [Role.ViceScum]: ID | undefined;
  [Role.Scum]: ID | undefined;
};

/**
 * Represents the state of the game when it is in progress.
 */
export class ActiveGameState extends BaseGameState {
  constructor(
    id: ID,
    host: ID,
    players: LinkedList<GamePlayerInfo>,
    roles: GameRoleMap,
    public pile: Card[],
  ) {
    super(id, host, players, roles);
  }
}

/**
 * Represents the state of the game when it is finished.
 */
export class FinishedGameState extends BaseGameState {
  constructor(
    id: ID,
    host: ID,
    roles: GameRoleMap,
    players: LinkedList<GamePlayerInfo>,
  ) {
    super(id, host, players, roles);
  }
}

/**
 * Represents the state of the game.
 */
export type GameState = PendingGameState | ActiveGameState | FinishedGameState;
export const toGameStateString = (gameState: GameState): 'pending' | 'active' | 'finished' => {
  if (gameState instanceof PendingGameState) {
    return 'pending';
  }
  if (gameState instanceof ActiveGameState) {
    return 'active';
  }
  if (gameState instanceof FinishedGameState) {
    return 'finished';
  }
  throw new Error('Unknown game state');
}
