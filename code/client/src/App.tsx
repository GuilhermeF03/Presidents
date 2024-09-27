import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { trpc, useTRPCClient } from './utils/trpc';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Landing } from './landing/ui/Landing.tsx';
import { ChakraProvider } from '@chakra-ui/react';
import { Game } from './game/Game.tsx';

export function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useTRPCClient();
  return (
    // Add trpc support
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      {/* Add React Query Support for state management*/}
      <QueryClientProvider client={queryClient}>
        {/* Add Chakra Ui theming support */}
        <ChakraProvider>
          {/* App Routes */}
          <BrowserRouter>
            {/* Probably add a context - must check React Query capabilities as Provider */}
            <Routes>
              <Route path="/" element={<Landing />} /> {/* Landing Page */}
              <Route path="/game/:gameId" element={<Game />} /> {/* Game Page */}
            </Routes>
          </BrowserRouter>
        </ChakraProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
}
