import { AppRouter } from '@server/controllers/rootRouter.ts';
import { httpBatchLink, splitLink, unstable_httpBatchStreamLink } from '@trpc/client';
import { createTRPCReact } from '@trpc/react-query';
import { useState } from 'react';

export const trpc = createTRPCReact<AppRouter>();

export const useTRPCClient = () => {
  return useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: 'http://localhost:4321/',
          fetch(url, options) {
            return fetch(url, {
              ...options,
              //credentials: 'include',
            });
          },
        }),
        splitLink({
          condition: op => op.type === 'subscription',
          true: unstable_httpBatchStreamLink({
            url: 'http://localhost:4321/trpc',
          }),
          false: httpBatchLink({
            url: 'http://localhost:4321/trpc',
          }),
        }),
      ],
    })
  );
};
