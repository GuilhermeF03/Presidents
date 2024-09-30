import type { Card } from '@core/models/game/Card';
import { Deck } from '@core/models/game/Deck';
import type { Hand } from '@core/models/game/Player';
import { type ActiveGameState, type GameState, type PendingGameState, Role } from '@core/models/game/State';
import { v4 as uuid } from 'uuid';
import type { GameRepo } from '../types';

const games: Record<string, GameState> = {};

/**
 * Checks if a player is in any game
 * @argument playerId - the id of the player
 */
export const playerInGame = (playerId: string) => {
  return Object.values(games).some(game => playerId in game.players);
};

export const gameExists = (gameId: string) => {
  return gameId in games;
};

/**
 * Returns the hand of a player in a game, or its role if the player has already finished the game
 * @param gameId
 * @param playerId
 * @returns
 */
const getPlayerHand = (gameId: string, playerId: string) => {
  const gameState = games[gameId];
  const playerInfo = gameState.players[playerId];

  return getPlayerInfo(playerInfo);
};

const getPlayerInfo = (info: Hand | Role): { hand: Hand; type: 'Hand' } | { role: Role; type: 'Role' } => {
  if (Array.isArray(info))
    return {
      hand: info as Hand,
      type: 'Hand',
    };
  return {
    role: info as Role,
    type: 'Role',
  };
};

const dealCards = (players: Hand[], cards: Card[]) => {
  const numPlayers = players.length;
  let p = 0;
  while (cards.length > 0) {
    const card = cards.pop();
    if (!card) break;
    players[p++ % numPlayers].cards.push(card);
  }
};

const memGame: GameRepo = {
  // Create a new game
  create: async input => {
    const { playerId } = input;
    if (playerInGame(playerId)) throw new Error('Player is already in a game');

    // Player is not in any game - create a new game
    const gameId = uuid();

    const playerHand: Hand = { ...input, cards: [] };
    const gameState: PendingGameState = {
      id: gameId,
      players: {
        [playerId]: playerHand,
      },
      state: 'pending',
    };

    games[gameId] = gameState;
    return gameId;
  },

  // Join a game
  join: async input => {
    const { playerId, gameId } = input;
    if (playerInGame(playerId)) throw new Error('Player is already in a game');
    if (!gameExists(gameId)) throw new Error('Game does not exist');

    const gameState = games[gameId];
    if (gameState.state !== 'pending') throw new Error('Game is not in pending state');

    const playerHand: Hand = { ...input, cards: [] };
    gameState.players[playerId] = playerHand;
  },

  leave: async input => {
    const { playerId, gameId } = input;
    if (!playerInGame(playerId)) throw new Error('Player is not in a game');
    if (!gameExists(gameId)) throw new Error('Game does not exist');

    const gameState = games[gameId];
    if (gameState.state === 'active') {
      const hand = getPlayerHand(gameId, playerId);
      if (hand.type == 'Role') throw new Error('Player has already finished the game');

      // Player is in the middle of a game - remove them from the game and split their cards between the remaining players

      const playerHand = hand.hand;
      const players = Object.entries(gameState.players)
        .filter(([id, hand]) => id !== playerId && getPlayerInfo(hand).type == 'Hand')
        .map(([, hand]) => hand as Hand);

      // Distribute the cards in the player's hand to the remaining players
      dealCards(players, playerHand.cards);
    }
    delete gameState.players[playerId];
  },

  start: async input => {
    const { gameId, playerId } = input;
    if (!gameExists(gameId)) throw new Error('Game does not exist');
    if (!playerInGame(playerId)) throw new Error('Player is not in a game');

    // Check if the player is the game owner
    const gameState = games[gameId];
    if (gameState.state !== 'pending') throw new Error('Game is not in pending state');

    if (Object.keys(gameState.players)[0] !== playerId) throw new Error('Player is not the game owner');

    // Create a new deck and shuffle it
    const deck = new Deck();
    deck.shuffle();

    // Deal the cards to the players
    const players = Object.entries(gameState.players)
      .filter(([_id, hand]) => getPlayerInfo(hand).type == 'Hand')
      .map(([_id, hand]) => hand as Hand);

    dealCards(players, deck.cards);

    // Set the game state to active
    const activeGameState: ActiveGameState = {
      ...gameState,
      deck,
      pile: [],
      round: 0,
      turn: 0,
      president: '',
      vicePresident: '',
      viceScum: '',
      scum: '',
      state: 'active',
    };

    games[gameId] = activeGameState;
  },

  play: async input => {},
};

export default memGame;
