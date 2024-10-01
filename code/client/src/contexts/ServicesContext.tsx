import { ReactElement, ReactNode, createContext, useContext } from 'react';
import { GameServices, gameServices } from '../services/gameServices';
import { LandingServices, landingServices } from '../services/landingServices';

type Services = {
  landing: LandingServices;
  game: GameServices;
};

export const ServicesContext = createContext<Services | undefined>(undefined);
