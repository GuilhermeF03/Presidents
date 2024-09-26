import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { trpc, useTRPC as useTRPCClient } from './utils/trpc';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Landing } from './pages/landing/Landing.tsx';
import { ChakraProvider } from '@chakra-ui/react';

export function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useTRPCClient();

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Landing />} />
            </Routes>
          </BrowserRouter>
        </ChakraProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
}
