import type { CoreServices } from '@/services/types';
import type { Profile } from '@core/model/game/Player';
import { TRPCError } from '@trpc/server';
import { anything, deepEqual, instance, when } from 'ts-mockito';
import { v4 as uuid } from 'uuid';
import type { ZodIssue } from 'zod';
import { mockCaller, mockServices } from './utils';

describe('Game Router Tests', async () => {
  describe('Create Game', async () => {
    test('Invalid Ids - Should give validation error', async () => {
      // given
      const services = mockServices();
      const caller = mockCaller(services);

      // when
      try {
        await caller.game.createGame({
          playerId: 'test',
          name: 'test',
          picture: '34',
        } as Profile);
      } catch (e) {
        // then
        expect(e).toBeInstanceOf(TRPCError);
        const error = e as TRPCError;
        expect(error.code).toBe('BAD_REQUEST');

        const data = JSON.parse(error.message) as ZodIssue[];

        const [playerIdError, pictureError] = data;

        // playerId should be invalid
        expect(playerIdError).toBeDefined();
        expect(playerIdError).toMatchObject<ZodIssue>({
          code: 'invalid_string',
          message: 'Invalid uuid',
          validation: 'uuid',
          path: ['playerId'],
        });

        // picture should be invalid
        expect(data.length).toBeDefined();
        expect(pictureError).toMatchObject<ZodIssue>({
          code: 'invalid_string',
          message: 'Invalid base64',
          validation: 'base64',
          path: ['picture'],
        });
      }
    });

    test('Valid Ids - Should create a game', async () => {
      // given
      const input: Profile = {
        playerId: uuid(),
        name: 'test',
        picture: 'test',
      };
      const mockGameId = uuid();

      const services = mockServices(mock => {
        const { game } = mock;
        when(game.createGame(deepEqual(input))).thenResolve(mockGameId);
        return mock;
      });
      const caller = mockCaller(services);

      // when
      const id = await caller.game.createGame(input);

      // then
      expect(id).toBe(mockGameId);
    });
  });
});
