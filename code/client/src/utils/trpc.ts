import type { AppRouter } from '@server/controllers/root';
import { httpBatchLink } from '@trpc/client';
import { createTRPCReact } from '@trpc/react-query';
import { useState } from 'react';

export const trpc = createTRPCReact<AppRouter>();

export const useTRPCClient = () => {
  return useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: 'http://localhost:4321/trpc',
        }),
      ],
    })
  );
};
