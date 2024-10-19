import type { Profile } from '@core/model/game/Player';
import type { GameInput, GameProfileInput, PlayCardInput } from '@core/model/game/inputs';
import type { TRPCError } from '@trpc/server';
import type { Observable } from '@trpc/server/observable';

export interface CorePipeline {
  game: GamePipeline;
}

export interface GamePipeline {
  createGame: (input: Profile) => Promise<string>;
  joinGame: (input: GameProfileInput) => Promise<void>;
  leaveGame: (input: GameInput) => Promise<void>;
  startGame: (input: GameInput) => Promise<void>;
  enterGame: (input: GameInput) => Promise<Observable<any, TRPCError>>;
  playCard: (input: PlayCardInput) => Promise<void>;
}
