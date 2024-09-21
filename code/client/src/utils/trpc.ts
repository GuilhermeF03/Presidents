import { createTRPCReact } from '@trpc/react-query';
import { httpBatchLink } from '@trpc/client';
import type { AppRouter } from '@server/server';
import { useState } from 'react';

export const trpc = createTRPCReact<AppRouter>();

export const useTRPC = () => {
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
