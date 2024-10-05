import { GAME_CONSTANTS } from '@/domain/GameConstants.ts';
import type { GameRepo } from '@/repos/types';
import { InvalidGameStateError, InvalidNumberOfPlayersError } from '@/services/errors/bad';
import { PlayerAlreadyInGameError } from '@/services/errors/conflict';
import type { GameServices } from '@/services/types';
import { Deck } from '@core/model/game/Deck';
import type { Hand } from '@core/model/game/Player';
import { ActiveGameState, PendingGameState } from '@core/model/game/State';
import type { GameInput } from '@core/model/game/inputs';
import { v4 as uuid } from 'uuid';
import { PlayerNotHostError } from './errors/auth';
import { playerCount } from './utils';

export default function (gameRepo: GameRepo): GameServices {
  /**
   * Create a new game
   * @param input - The input object containing:
   * - playerId: The ID of the player creating the game
   * - playerName: The name of the player creating the game
   * - pic: The picture of the player creating the game, in base64 format
   * @returns The ID of the created game
   */
  const createGame: GameServices['createGame'] = async input => {
    const { playerId } = input;

    if (await gameRepo.getPlayer(playerId)) throw new PlayerAlreadyInGameError();

    const gameId = uuid();
    await gameRepo.createGame({ gameId, ...input });

    return gameId;
  };

  /**
   * Join a game
   * @param input - The input object containing:
   * - gameId: The ID of the game to join
   * - playerId: The ID of the player joining the game
   * - playerName: The name of the player joining the game
   * - pic: The picture of the player joining the game, in base64
   * @returns void
   * @throws GameNotFoundError - If the game does not exist
   * @throws GameNotPendingError - If the game is not in a pending state
   * @throws InvalidNumberOfPlayersError - If the game is full
   */
  const joinGame: GameServices['joinGame'] = async input => {
    const { gameId, playerId } = input;

    if (await gameRepo.getPlayer(playerId)) throw new PlayerAlreadyInGameError(gameId);

    const game = await gameRepo.getGame(gameId);

    if (!(game instanceof PendingGameState)) throw new InvalidGameStateError('pending');

    if (playerCount(game) === GAME_CONSTANTS.MAX_PLAYERS) throw new InvalidNumberOfPlayersError('Game is full');

    await gameRepo.addPlayerToGame(input);
  };

  /**
   * Leave a game
   * @param input - The input object containing:
   * - gameId: The ID of the game to leave
   * - playerId: The ID of the player leaving the game
   * @returns void
   * @throws GameNotFoundError - If the game does not exist
   * @throws PlayerAlreadyInGameError - If the player is not in a game
   */
  const leaveGame: GameServices['leaveGame'] = async input => {
    await gameRepo.leaveGame(input);
  };

  /**
   * Play a card
   * @param input - The input object containing:
   * - gameId: The ID of the game in which to play the card
   * - playerId: The ID of the player playing the card
   * - card: The card to play
   * @returns void
   * @throws GameNotFoundError - If the game does not exist
   * @throws PlayerNotFound - If the player is not in a game
   * @throws GameNotActiveError - If the game is not in an active state
   * @throws InvalidCardError - If the card is not valid
   * @throws InvalidPlayerTurnError - If it is not the player's turn
   * @throws InvalidCardPlayError - If the card cannot be played
   */
  const playCard: GameServices['playCard'] = async input => {
    const { gameId } = input;

    const game = await gameRepo.getGame(gameId);

    if (!(game instanceof ActiveGameState)) throw new InvalidGameStateError();

    return await gameRepo.playCard(input);
  };

  /**
   * Start a game
   * @param input - The input object containing:
   * - gameId: The ID of the game to start
   * - playerId: The ID of the player starting the game
   * @returns void
   * @throws GameNotFoundError - If the game does not exist
   * @throws PlayerNotFound - If the player is not in a game
   * @throws GameNotPendingError - If the game is not in a pending state
   * @throws InvalidNumberOfPlayersError - If the game does not have enough players
   * @throws InvalidPlayerTurnError - If it is not the player's turn
   * @throws InvalidGameStateError - If the game is not in a pending state
   * @throws InvalidCardError - If the card is not valid
   */
  const startGame: GameServices['startGame'] = async (input: GameInput) => {
    const { gameId, playerId } = input;

    const game = await gameRepo.getGame(gameId);

    if (!(game instanceof PendingGameState)) throw new InvalidGameStateError('pending');

    if (!(await gameRepo.playerIsHost(gameId, playerId))) throw new PlayerNotHostError(playerId, gameId);

    if (playerCount(game) < GAME_CONSTANTS.MIN_PLAYERS) throw new InvalidNumberOfPlayersError('Not enough players');

    const deck = new Deck();
    deck.shuffle();

    // Deal cards to players
    const player = Object.values(game.players);

    for (let i = 0; i < deck.cards.length; i++) {
      const card = deck.draw();
      if (!card) break;
      (player[i % player.length].state as Hand).cards.push(card);
    }
    for (const entry of player) await gameRepo.updatePlayer(gameId, entry);

    await gameRepo.startGame(gameId);
  };

  return {
    createGame,
    joinGame,
    leaveGame,
    playCard,
    startGame,
  };
}
