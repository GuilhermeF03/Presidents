import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { trpc, useTRPC } from './utils/trpc';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Landing } from './pages/landing/Landing.tsx';

export function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useTRPC();

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </trpc.Provider>
  );
}
