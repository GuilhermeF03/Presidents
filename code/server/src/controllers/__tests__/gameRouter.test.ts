import type { Profile } from '@core/model/game/Player';
import { Rank, Suit } from '@core/model/game/card';
import type { PlayCardInput } from '@core/model/game/inputs';
import { deepEqual, when } from 'ts-mockito';
import { v4 as uuid } from 'uuid';
import { expectValidationError, mockCaller, mockServices } from './utils';

describe('Game Router Tests', () => {
  describe('Create Game', () => {
    test('Invalid Ids - Should give validation error', async () => {
      const caller = mockCaller(mockServices());

      try {
        await caller.game.createGame({
          playerId: 'test',
          name: 'test',
          picture: '34',
        } as Profile);
      } catch (e) {
        expectValidationError(e, [
          { code: 'invalid_string', message: 'Invalid uuid', validation: 'uuid', path: ['playerId'] },
          { code: 'invalid_string', message: 'Invalid base64', validation: 'base64', path: ['picture'] },
        ]);
      }
    });

    test('Valid Ids - Should create a game', async () => {
      const input: Profile = { playerId: uuid(), name: 'test', picture: 'test' };
      const mockGameId = uuid();
      const caller = mockCaller(
        mockServices(mock => {
          when(mock.game.createGame(deepEqual(input))).thenResolve(mockGameId);
          return mock;
        })
      );

      const id = await caller.game.createGame(input);
      expect(id).toBe(mockGameId);
    });
  });

  describe('Join Game', () => {
    test('Invalid Ids - Should give validation error', async () => {
      const caller = mockCaller(mockServices());

      try {
        await caller.game.joinGame({
          playerId: 'test',
          picture: '34',
          name: 'test',
          gameId: '21',
        });
      } catch (e) {
        expectValidationError(e, [
          { code: 'invalid_string', message: 'Invalid uuid', validation: 'uuid', path: ['playerId'] },
          { code: 'invalid_string', message: 'Invalid base64', validation: 'base64', path: ['picture'] },
          { code: 'invalid_string', message: 'Invalid uuid', validation: 'uuid', path: ['gameId'] },
        ]);
      }
    });

    test('Valid Ids - Should join a game', async () => {
      const input = { playerId: uuid(), name: 'test', picture: 'test', gameId: uuid() };
      const caller = mockCaller(
        mockServices(mock => {
          when(mock.game.joinGame(deepEqual(input))).thenResolve();
          return mock;
        })
      );

      await caller.game.joinGame(input);
    });
  });

  describe('Start Game', () => {
    test('Invalid Ids - Should give validation error', async () => {
      const caller = mockCaller(mockServices());

      try {
        await caller.game.startGame({ playerId: 'test', gameId: '21' });
      } catch (e) {
        expectValidationError(e, [
          { code: 'invalid_string', message: 'Invalid uuid', validation: 'uuid', path: ['gameId'] },
        ]);
      }
    });

    test('Valid Ids - Should start a game', async () => {
      const input = { playerId: uuid(), gameId: uuid() };
      const caller = mockCaller(
        mockServices(mock => {
          when(mock.game.startGame(input)).thenResolve();
          return mock;
        })
      );

      await caller.game.startGame(input);
    });
  });

  describe('Leave Game', () => {
    test('Invalid Ids - Should give validation error', async () => {
      const caller = mockCaller(mockServices());

      try {
        await caller.game.leaveGame({ playerId: 'test', gameId: '21' });
      } catch (e) {
        expectValidationError(e, [
          { code: 'invalid_string', message: 'Invalid uuid', validation: 'uuid', path: ['gameId'] },
        ]);
      }
    });

    test('Valid Ids - Should leave a game', async () => {
      const input = { playerId: uuid(), gameId: uuid() };
      const caller = mockCaller(
        mockServices(mock => {
          when(mock.game.leaveGame(input)).thenResolve();
          return mock;
        })
      );

      await caller.game.leaveGame(input);
    });
  });

  describe('Play Card', () => {
    test('Invalid Ids - Should give validation error', async () => {
      const caller = mockCaller(mockServices());

      try {
        await caller.game.playCard({
          playerId: 'test',
          gameId: '21',
          card: { suit: Suit.Clubs, rank: Rank.Four },
        });
      } catch (e) {
        expectValidationError(e, [
          { code: 'invalid_string', message: 'Invalid uuid', validation: 'uuid', path: ['gameId'] },
        ]);
      }
    });

    test('Valid Ids - Should play a card', async () => {
      const input: PlayCardInput = {
        playerId: uuid(),
        gameId: uuid(),
        card: { suit: Suit.Clubs, rank: Rank.Four },
      };
      const caller = mockCaller(
        mockServices(mock => {
          when(mock.game.playCard(input)).thenResolve();
          return mock;
        })
      );

      await caller.game.playCard(input);
    });
  });
});
