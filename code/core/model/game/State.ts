import { z } from 'zod';
import type { Card } from './card';
import type { GamePlayerInfo } from './player';

export enum Role {
  President = 'president',
  VicePresident = 'vicePresident',
  ViceScum = 'viceScum',
  Scum = 'scum',
  Person = 'person'
}
export const ZodRole = z.nativeEnum(Role);

class BaseGameState {
  constructor(
    public id: string,
    public host: string,
    public players: Record<string, GamePlayerInfo>
  ) {}
}

export class PendingGameState extends BaseGameState {}

type GameRoleMap = {
  [Role.President]?: string;
  [Role.VicePresident]?: string;
  [Role.ViceScum]?: string;
  [Role.Scum]?: string;
};
export class ActiveGameState extends BaseGameState {
  constructor(
    id: string,
    host: string,
    players: Record<string, GamePlayerInfo>,
    public pile: Card[],
    public round: number,
    public turn: number,
    public rolesMap: GameRoleMap
  ) {
    super(id, host, players);
  }
}

export class FinishedGameState extends BaseGameState {
  constructor(
    id: string,
    host: string,
    players: Record<string, GamePlayerInfo>,
    public round: number,
    public rolesMap: GameRoleMap
  ) {
    super(id, host, players);
  }
}
export type GameState = PendingGameState | ActiveGameState | FinishedGameState;
