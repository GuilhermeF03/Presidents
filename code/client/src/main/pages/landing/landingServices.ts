import { trpc } from '@/trpc.ts';
import { Profile } from '@core/model/game/player.ts';

export const useCreateGame = () => {
  const { mutateAsync: _mutate, ...rest } = trpc.game.createGame.useMutation();
  return {
    ...rest,
    mutate: async (profile : Profile) => await _mutate(profile),
  };
};

export const useJoinGame = (profile: Profile) => {
  const { mutateAsync: _mutate, ...rest } = trpc.game.joinGame.useMutation();
  return {
    ...rest,
    mutate: async (gameId: string) => await _mutate({ gameId, ...profile }),
  };
};

export const landingServices = {
  useCreateGame,
  useJoinGame,
};

export type LandingServices = typeof landingServices;
