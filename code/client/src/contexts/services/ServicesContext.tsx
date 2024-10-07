import { GameServices } from '@pages/game/gameServices';
import { LandingServices } from '@pages/landing/landingServices';
import { createContext } from 'react';

type Services = {
  landing: LandingServices;
  game: GameServices;
};

export const ServicesContext = createContext<Services | undefined>(undefined);
