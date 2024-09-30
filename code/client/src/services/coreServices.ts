import { GameServices, gameServices } from './gameServices';
import { LandingServices, landingServices } from './landingServices';

export type Services = {
  landing: LandingServices;
  game: GameServices;
};

export const coreServices: Services = {
  landing: landingServices,
  game: gameServices,
};
