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
    public players: LinkedList<GamePlayerInfo>
  ) {}
}

/**
 * Represents the state of the game when it is pending.
 */
export class PendingGameState extends BaseGameState {
  constructor(
    public id: ID,
    public host: ID,
    public players: LinkedList<GamePlayerInfo>,
    public roles: GameRoleMap
  ) {
    super(id, host, players);
  }
}

type GameRoleMap = {
  [Role.President]?: ID;
  [Role.VicePresident]?: ID;
  [Role.ViceScum]?: ID;
  [Role.Scum]?: ID;
};

/**
 * Represents the state of the game when it is in progress.
 */
export class ActiveGameState extends BaseGameState {
  constructor(
    id: ID,
    host: ID,
    players: LinkedList<GamePlayerInfo>,
    public pile: Card[],
    public roles: GameRoleMap
  ) {
    super(id, host, players);
  }
}

/**
 * Represents the state of the game when it is finished.
 */
export class FinishedGameState extends BaseGameState {
  constructor(
    id: ID,
    host: ID,
    players: LinkedList<GamePlayerInfo>,
    public rolesMap: GameRoleMap
  ) {
    super(id, host, players);
  }
}

/**
 * Represents the state of the game.
 */
export type GameState = PendingGameState | ActiveGameState | FinishedGameState;
