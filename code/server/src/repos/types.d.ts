import type { Deck } from '@core/model/game/Deck';
import type { GameProfileInput } from '@core/model/game/Input';
import type { GameState, Role } from '@core/model/game/State';
import type { GamePlayerInfo, Profile } from '@core/model/game/player';
import type { CorePipeline, GamePipeline } from '../pipeline.types';

export interface CoreRepo extends CorePipeline {
  game: GameRepo;
}
export interface GameRepo extends GamePipeline {
  // Validation methods

  /**
   * Get a player by their ID
   * @param userId  - The ID of the player
   * @returns  The player's profile
   * @throws PlayerNotFoundError - If the player does not exist
   */
  getPlayer: (userId: string) => Promise<Profile>;

  /**
   * Get a player's details by their ID
   * @param userId - The ID of the player
   * @returns The player's details
   * @throws PlayerNotFoundError - If the player does not exist
   */
  getPlayerDetails: (userId: string) => Promise<GamePlayerInfo>;

  updatePlayer: (gameId: string, details: GamePlayerInfo) => Promise<void>;

  /**
   * Check if a player is in a game
   * @param role - The role of the player
   * @returns  True if the player is in the game, false otherwise
   * @throws PlayerNotFoundError - If the player does not exist
   **/
  playerIs(playerId: string, role: Role): Promise<boolean>;

  /**
   * Check if a player is the host of a game
   * @param playerId
   * @returns True if the player is the host, false otherwise
   * @throws PlayerNotFoundError - If the player does not exist
   */
  playerIsHost: (gameId: string, playerId: string) => Promise<boolean>;

  // Main methods
  /**
   * Get a game by its ID
   * @param gameId
   * @throws GameNotFoundError - If the game does not exist
   */
  getGame: (gameId: string) => Promise<GameState>;

  /**
   * Add a player to a game
   * @param input - The input object containing:
   * - gameId: The ID of the game
   * - playerId: The ID of the player
   * - playerName: The name of the player
   * - picture: The picture of the player, in base64 format
   **/
  addPlayerToGame: (input: GameProfileInput) => Promise<void>;

  /**
   * Create a new game
   * @param input - The input object containing:
   * - gameId: The ID of the game
   * - playerId: The ID of the player
   * - playerName: The name of the player
   * - picture: The picture of the player, in base64 format
   **/
  createGame: (input: GameProfileInput) => Promise<void>;

  /**
   * Join a game
   * @param input - The input object containing:
   * - gameId: The ID of the game
   * - playerId: The ID of the player
   * - playerName: The name of the player
   * - picture: The picture of the player, in base64 format
   **/
  startGame: (gameId: string) => Promise<void>;
}
