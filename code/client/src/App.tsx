import { Flex, HStack } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Game } from './pages/game/Game';
import { Landing } from './pages/landing/Landing';
import './index.css';
import Footer from './components/layouts/Footer';
import NavBar from './components/layouts/NavBar';
import { AppProvider } from './contexts/AppProvider';
import { ProfileProvider } from './contexts/profile/ProfileProvider';
import { ServicesProvider } from './contexts/services/ServicesProvider';

export function App() {
  return (
    <AppProvider>
      <ServicesProvider>
        <ProfileProvider>
          {/* App Routes */}
          <Flex className="flex-col w-screen h-screen max-h-screen min-h-screen">
            <NavBar />

            {/** App Body */}
            <HStack className="items-center justify-center w-full h-full p-8 bg-green-500 grow">
              <BrowserRouter>
                {/* Probably add a context - must check React Query capabilities as Provider */}
                <Routes>
                  <Route path="/" element={<Landing />} /> {/* Landing Page */}
                  <Route path="/game/:gameId" element={<Game />} /> {/* Game Page */}
                </Routes>
              </BrowserRouter>
            </HStack>

            <Footer />
          </Flex>
        </ProfileProvider>
      </ServicesProvider>
    </AppProvider>
  );
}
