import type { CoreServices } from '@/services/coreServices';
import { createCaller } from '../../src/controllers/root';
import { trpcContext as createTestContext } from './utils';

test('add and get post', async () => {
  const services: CoreServices = {
    game: {
      create: jest.fn().mockResolvedValue('michael'),
    },
  };
  const ctx = createTestContext(services);
  const caller = createCaller(ctx);
  const post = await caller.game.create();
  expect(post).toEqual({ id: 1 });
});
