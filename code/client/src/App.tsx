import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Game } from './game/Game.tsx';
import { Landing } from './landing/ui/Landing.tsx';
import { trpc, useTRPCClient } from './trpc/trpc.ts';
import './index.css';

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

function main() {
  const root = document.getElementById('root');

  if (!root) throw new Error('No root element found');
  
  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

void main();
