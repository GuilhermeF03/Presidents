import { useServicesContext } from './ServiceContext';

export async function useCreateGame(pId: string) {
  const { services } = useServicesContext();
}

export async function useJoinGame(pId: string, gId: string) {}

export const landingServices = {
  useCreateGame,
  useJoinGame,
};

export type LandingServices = typeof landingServices;
