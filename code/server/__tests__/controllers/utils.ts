import type { CoreServices } from '@/services/coreServices';
import { createInjectedContext } from '@/trpc/trpc';

type CreateContextOptions = {};

export const trpcContext = (services: CoreServices) =>
  createInjectedContext(services, () => {
    return {
      injection: {
        services,
      },
    };
  });
type Context = Awaited<ReturnType<typeof trpcContext>>;
