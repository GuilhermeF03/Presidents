import type { Card } from '@core/model/game/card.ts';
import type { GamePlayerTuple, JoinGameInfo } from '@core/model/game/game.ts';
import type { ID } from '@core/model/game/misc.ts';
import type { GamePlayerInfo, Profile } from '@core/model/game/player.ts';
import type { StreamEvent } from '@core/model/stream/events.ts';
import type { TRPCError } from '@trpc/server';
import type { Observable, Observer } from '@trpc/server/observable';

export type CoreServices = {
  game: GameServices;
  player: PlayerServices;
  card: CardServices;
  stream: StreamServices;
};
export type GameServices = {
  // Creates a game
  createGame: (input: Profile) => Promise<{ id: string; stream: Observable<StreamEvent, TRPCError> }>;
  // Joins into an already created game
  joinGame: (input: JoinGameInfo) => Promise<Observable<StreamEvent, TRPCError>>;
  // Leaves a game
  leaveGame: (input: GamePlayerTuple) => Promise<void>;
  // Starts the game
  startGame: (input: GamePlayerTuple) => Promise<void>;
};
export type PlayerServices = {
  // Updates the player profile
  updateProfile: (gameId: string, details: GamePlayerInfo) => Promise<void>;
  // Checks if the player is the host of the game
  isPlayerHost: (input: GamePlayerTuple) => Promise<boolean>;

  // Checks if the player is in the game
  playerInAnyGame: (playerId: ID) => Promise<boolean>;
  // Checks if the player is in the game
  playerInGame: (input: GamePlayerTuple) => Promise<boolean>;
  // Gets the player profile
  getPlayerDetails: (userId: string) => Promise<Profile>;
};
export type CardServices = {
  playCards: (input: GamePlayerTuple, ...cards: Card[]) => Promise<void>;
};

export type StreamServices = {
  getStream: (userId: string) => Observer<StreamEvent, TRPCError>;
  registerStream:(userId: string) => Observable<StreamEvent, TRPCError>;
  sendEvent: <T extends StreamEvent>(userId: string, event: T) => void;
  sendError: (userId: string, error: TRPCError) => void;
  sendComplete: (userId: string) => void;
}
