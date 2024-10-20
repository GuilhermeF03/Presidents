import { PlayerNotFoundError } from '@/repos/errors/notFound';
import type { Hand, Profile } from '@core/model/game/Player';
import type { ActiveGameState, GameState, PendingGameState } from '@core/model/game/State';
import { GameNotFoundError } from '../errors/notFound';
import type { GameRepo } from '../types';
import { isRole, newActiveGame, newPendingGame, newPlayer } from '../utils';
import { memData } from './data';

export const memGame = (): GameRepo => {
  const { games } = memData;

  const updatePlayer: GameRepo['updatePlayer'] = async (gameId, details) => {
    const game = await getGame(gameId);
    game.players[details.playerId] = details;
  };

  const getGame: GameRepo['getGame'] = async (gameId: string) => {
    const game = games[gameId];
    if (!game) {
      throw new GameNotFoundError(gameId);
    }
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

  const startGame: GameRepo['startGame'] = async input => {
    const { gameId } = input;
    const game = (await getGame(gameId)) as PendingGameState;
    games[gameId] = newActiveGame(game);
  };

  const playerIsHost: GameRepo['playerIsHost'] = async _input => {
    throw new Error('Not implemented yet!!');
  };

  return {
    getGame,
    addPlayerToGame,
    createGame,
    joinGame,
    playerIsHost,
    updatePlayer,
    leaveGame,
    playCard,
    startGame,
  };
};
