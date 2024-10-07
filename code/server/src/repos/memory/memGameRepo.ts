import { PlayerNotFoundError } from '@/repos/errors/notFound';
import type { Hand, Profile } from '@core/model/game/Player';
import type { ActiveGameState, GameState, PendingGameState } from '@core/model/game/State';
import { GameNotFoundError } from '../errors/notFound';
import type { GameRepo } from '../types';
import { isRole, newActiveGame, newPendingGame, newPlayer } from '../utils';

const memGame = (): GameRepo => {
  const games: Record<string, GameState> = {};

  const getPlayerDetails: GameRepo['getPlayerDetails'] = async userId => {
    for (const gameId in games) {
      const game = games[gameId];
      const player = game.players[userId];
      if (player) return player;
    }
    throw new PlayerNotFoundError(userId);
  };

  const getPlayer: GameRepo['getPlayer'] = async (userId: string) => (await getPlayerDetails(userId)) as Profile;

  const updatePlayer: GameRepo['updatePlayer'] = async (gameId, details) => {
    const game = await getGame(gameId);
    game.players[details.playerId] = details;
  };

  const playerIs: GameRepo['playerIs'] = async (playerId, role) => {
    const { state } = await getPlayerDetails(playerId);
    return isRole(state) && state === role;
  };

  const playerIsHost: GameRepo['playerIsHost'] = async (gameId, playerId) => {
    const game = await getGame(gameId);
    return game.host === playerId;
  };

  const getGame: GameRepo['getGame'] = async (gameId: string) => {
    const game = games[gameId];
    if (!game) throw new GameNotFoundError(gameId);
    return game;
  };

  const addPlayerToGame: GameRepo['addPlayerToGame'] = async input => {
    const { gameId, playerId } = input;
    const game = (await getGame(gameId)) as PendingGameState;

    game.players[playerId] = newPlayer(input);
  };

  const createGame: GameRepo['createGame'] = async input => {
    const { gameId } = input;

    games[gameId] = newPendingGame(gameId, input);
  };

  const joinGame: GameRepo['joinGame'] = async input => {
    const { gameId, playerId } = input;
    const game = (await getGame(gameId)) as PendingGameState;
    game.players[playerId] = newPlayer(input);
  };

  const leaveGame: GameRepo['leaveGame'] = async input => {
    const { gameId, playerId } = input;
    const game = await getGame(gameId);
    await getPlayer(playerId); // Ensure player exists
    delete game.players[playerId];
  };

  const playCard: GameRepo['playCard'] = async input => {
    const { gameId, playerId, card } = input;
    const game = (await getGame(gameId)) as ActiveGameState;
    const player = await getPlayerDetails(playerId);

    game.pile.push(card);

    const state = player.state as Hand;
    state.cards = state.cards.filter(c => c !== card);
    player.state = state;

    game.players[playerId] = player;
  };

  const startGame: GameRepo['startGame'] = async gameId => {
    const game = (await getGame(gameId)) as PendingGameState;
    games[gameId] = newActiveGame(game);
  };

  return {
    getPlayerDetails,
    getPlayer,
    updatePlayer,
    playerIs,
    playerIsHost,
    getGame,
    addPlayerToGame,
    createGame,
    joinGame,
    leaveGame,
    playCard,
    startGame,
  };
};

export default memGame;
