import { trpc } from '@/trpc/trpc';
import { Profile } from '@core/model/game/Player';

export const useCreateGame = (profile: Profile) => {
  const { mutateAsync: _mutate, ...rest } = trpc.game.createGame.useMutation();
  return {
    ...rest,
    mutate: async () => await _mutate(profile),
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
