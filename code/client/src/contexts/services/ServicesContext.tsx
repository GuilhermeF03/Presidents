import { GameServices } from '@services/gameServices';
import { LandingServices } from '@services/landingServices';
import { createContext } from 'react';

type Services = {
  landing: LandingServices;
  game: GameServices;
};

export const ServicesContext = createContext<Services | undefined>(undefined);
