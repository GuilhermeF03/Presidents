import { trpc } from '@/trpc/trpc';
import { PlayerOpInput } from '@core/models/game/Input';
import { Profile } from '@core/models/game/Player';

export const useCreateGame = (profile: Profile) => {
  const { mutateAsync: _mutate, ...rest } = trpc.game.create.useMutation();
  return {
    ...rest,
    mutate: async () => await _mutate(profile),
  };
};

export const useJoinGame = (profile: Profile) => {
  const { mutateAsync: _mutate, ...rest } = trpc.game.join.useMutation();
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
