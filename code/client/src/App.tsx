import { ChakraProvider, Flex } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Game } from './pages/game/Game';
import { Landing } from './pages/landing/Landing';
import { trpc, useTRPCClient } from './trpc/trpc';
import './index.css';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import { ServicesProvider } from './contexts/ServicesProvider';

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
          {/* Add Services Provider */}
          <ServicesProvider>
            {/* App Routes */}
            <Flex className="w-screen max-h-screen min-h-screen" direction="column" h="100vh">
              <NavBar />

              {/** App Body */}
              <Flex
                className="h-full gap-8 p-8 bg-green-500 grow md:gap-56 md:p-16"
                direction="row"
                align={'center'}
                justifyContent={'center'}
              >
                <BrowserRouter>
                  {/* Probably add a context - must check React Query capabilities as Provider */}
                  <Routes>
                    <Route path="/" element={<Landing />} /> {/* Landing Page */}
                    <Route path="/game/:gameId" element={<Game />} /> {/* Game Page */}
                  </Routes>
                </BrowserRouter>
              </Flex>
              <Footer />
            </Flex>
          </ServicesProvider>
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
