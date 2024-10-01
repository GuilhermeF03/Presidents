import { gameServices } from '@services/gameServices';
import { landingServices } from '@services/landingServices';
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
