import { createCaller } from '@/controllers/root';
import { memCore } from '@/repos/memory/memCore';
import { coreServices } from '@/services/coreServices';
import { v4 as uuid } from 'uuid';
import { createTestContext } from './utils';

describe('Game Management', () => {
  let caller: ReturnType<typeof createCaller>;

  beforeEach(() => {
    const coreRepo = memCore;
    const services = coreServices(coreRepo);
    const ctx = createTestContext(services);
    caller = createCaller(ctx);
  });

  describe('Creating a game', () => {
    test('should create a new game', async () => {
      const id = uuid();
      const createGame = await caller.game.create({ playerId: id });
      expect(createGame).toBeDefined();
    });

    test('should not create a game with the same name', async () => {
      const id = uuid();
      await caller.game.create({ playerId: id });
      const createGameAgain = await caller.game.create({ playerId: id });
      expect(createGameAgain).toBeUndefined(); // or some specific error/response
    });
  });

  describe('Joining a game', () => {
    test('should join an existing game', async () => {
      const id = uuid();
      const gameId = await caller.game.create({ playerId: id });
      expect(gameId).toBeDefined();

      const joinGame = await caller.game.join({
        gameId: gameId as string,
        playerId: uuid(),
      });
      expect(joinGame).toBeDefined();
    });

    test('should not join a non-existing game', async () => {
      const joinGame = await caller.game.join({
        gameId: uuid(),
        playerId: uuid(),
      });
      expect(joinGame).toBeUndefined(); // or some specific error/response
    });
  });

  // More describe blocks for other functionalities
});
