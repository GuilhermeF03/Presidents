import { Provider as SpectrumProvider, defaultTheme } from '@adobe/react-spectrum';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { trpc, useTRPCClient } from '../trpc.ts';

type AppProviderProps = {
  children: React.ReactNode;
};

/**
 * AppProvider is a context provider that wraps the entire application with the necessary core providers, which are:
 * - trpc.Provider: Provides the trpc client to the application in order to make trpc calls
 * - QueryClientProvider: Provides the React Query client to the application in order to manage state used by the trpc client
 * - ChakraProvider: Provides the Chakra UI theme to the application, which is used to style the application
 * @param props
 * @returns
 */
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useTRPCClient();
  return (
    // Add trpc support
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      {/* Add React Query Support for state management*/}
      <QueryClientProvider client={queryClient}>
        {/* Add Chakra Ui theming support */}
        <ChakraProvider>
          <SpectrumProvider theme={defaultTheme}>{children}</SpectrumProvider>
        </ChakraProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
};
