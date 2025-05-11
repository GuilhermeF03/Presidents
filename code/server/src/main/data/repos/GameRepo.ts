import { ActiveGameState, type GameState, Role, toGameStateString } from '@core/model/game/State';
import type { GameRepoType } from '@data/repos/types.ts';
import { newPlayer } from '@data/repos/utils.ts';
import { GameEntity } from '@data/entities/GameEntity.ts';
import { LinkedList } from '@core/model/LinkedList';
import type { GamePlayerInfo, Profile } from '@core/model/game/player';
import { EntityRepository } from '@mikro-orm/core';
import type { JoinGameInfo } from '@core/model/game/game.ts';
import { Hand } from '@core/model/game/Hand.ts';

export class GameRepo extends EntityRepository<GameEntity> implements GameRepoType {
  createGame = async (profile: Profile) => {
    return await this.em.transactional(async (em) => {
      const player = newPlayer(profile);
      const playersList = new LinkedList<GamePlayerInfo>();
      playersList.append(player);

      const game = em.create(GameEntity, {
        hostId: profile.playerId,
        players: playersList.asList(),
        roles: {
          [Role.President]: undefined,
          [Role.VicePresident]: undefined,
          [Role.ViceScum]: undefined,
          [Role.Scum]: undefined,
        },
        pile: [],
        state: "pending"
      });
      em.persist(game);
      await em.flush();
      return game.id;
    });
  };

  getGame = async (gameId: string) => {
    return await this.em.transactional(async (em) => {
      const game = await em.findOne(GameEntity, gameId);
      if (!game) throw new Error('Game not found');

      return {
        id: game.id,
        host: game.hostId,
        players: LinkedList.fromList(game.players),
        roles: game.roles,
        pile: game.pile,
        state: game.state,
      } as GameState;
    });
  };

  updateGame = async (gameId: string, gameState: GameState) => {
    return await this.em.transactional(async (em) => {
      const game = await em.findOne(GameEntity, { id: gameId });
      if (!game) throw new Error('Game not found');

      em.assign(game, {
        hostId: gameState.host,
        players: gameState.players.asList(),
        roles: gameState.roles,
        pile: (gameState instanceof ActiveGameState) ? gameState.pile : [],
        state: toGameStateString(gameState),
      });

      await em.flush();
    });
  };

  leaveGame = async ({ gameId, playerId }: { gameId: string, playerId: string }) => {
    return await this.em.transactional(async (em) => {
      const game = await em.findOne(GameEntity, { id: gameId });
      if (!game) throw new Error('Game not found');

      game.players = game.players.filter(p => p.playerId !== playerId);
      em.persist(game);
      await em.flush();
    });
  };

  joinGame = async (input: JoinGameInfo) => {
    return await this.em.transactional(async (em) => {
      const { gameId, ...profile } = input;
      const game = await em.findOne(GameEntity, { id: gameId });
      if (!game) throw new Error('Game not found');

      game.players.push({
        playerId: profile.playerId,
        name: profile.name,
        picture: profile.picture,
        hand: new Hand(),
      });
      em.persist(game);
      await em.flush();
    });
  };

  startGame = async (gameId: string) => {
    return await this.em.transactional(async (em) => {
      const game = await em.findOne(GameEntity, { id: gameId });
      if (!game) throw new Error('Game not found');

      game.state = 'active';
      em.persist(game);
      await em.flush();
    });
  };

  addPlayer = async (gameId: string, profile: Profile) => {
    return await this.em.transactional(async (em) => {
      const game = await em.findOne(GameEntity, { id: gameId });
      if (!game) throw new Error('Game not found');

      game.players.push({
        playerId: profile.playerId,
        name: profile.name,
        picture: profile.picture,
        hand: new Hand(),
      });
      em.persist(game);
      await em.flush();
    });
  };

  getPlayerDetails = async (playerId: string) => {
    return await this.em.transactional(async (em) => {
      const games = await em.find(GameEntity, {});
      for (const game of games) {
        const player = game.players.find(p => p.playerId === playerId);
        if (player) {
          return {
            playerId: player.playerId,
            name: player.name,
            picture: player.picture,
            hand: player.hand,
          };
        }
      }
      throw new Error('Player not found');
    });
  };

  updatePlayer = async (gameId: string, playerId: string, profile: Profile) => {
    return await this.em.transactional(async (em) => {
      const game = await em.findOne(GameEntity, { id: gameId });
      if (!game) throw new Error('Game not found');

      const player = game.players.find(p => p.playerId === playerId);
      if (!player) throw new Error('Player not found');

      Object.assign(player, {
        playerId: profile.playerId,
        name: profile.name,
        picture: profile.picture,
      });

      em.persist(game);
      await em.flush();
    });
  };

  removePlayer = async (gameId: string, playerId: string) => {
    return await this.em.transactional(async (em) => {
      const game = await em.findOne(GameEntity, { id: gameId });
      if (!game) throw new Error('Game not found');

      const player = game.players.find(p => p.playerId === playerId);
      if (!player) throw new Error('Player not found');

      game.players = game.players.filter(player => player.playerId !== playerId);
      em.persist(game);
      await em.flush();
      em.persist(game);
      await em.flush();
    });
  };

  playerInGame = async (gameId: string, playerId: string) => {
    return await this.em.transactional(async (em) => {
      const game = await em.findOne(GameEntity, { id: gameId });
      if (!game) return false;
      return !!game.players.find(p => p.playerId === playerId);
    });
  };

  playerInAnyGame = async (playerId: string) => {
    return await this.em.transactional(async (em) => {
      const games = await em.findAll(GameEntity, {});
      for (const game of games) {
        if (game.players.find(p => p.playerId === playerId)) {
          return true;
        }
      }
      return false;
    });
  };

  isGameHost = async (gameId: string, playerId: string) => {
    const game = await this.findOne({ id: gameId });
    return game?.hostId === playerId;
  };
}
