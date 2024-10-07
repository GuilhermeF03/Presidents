import { gameServices } from '@pages/game/gameServices';
import { landingServices } from '@pages/landing/landingServices';
import { ReactElement } from 'react';
import { ServicesContext } from './ServicesContext';

type ServicesProviderProps = {
  children: ReactElement;
};

export const ServicesProvider = ({ children }: ServicesProviderProps) => {
  return (
    <ServicesContext.Provider value={{ landing: landingServices, game: gameServices }}>
      {children}
    </ServicesContext.Provider>
  );
};
