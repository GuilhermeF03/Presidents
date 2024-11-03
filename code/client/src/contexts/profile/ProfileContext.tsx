import type { Profile } from '@core/model/game/player.ts';
import { type Dispatch, type SetStateAction, createContext } from 'react';

type ProfileContextProps = {
  profile: Profile;
  setProfile: Dispatch<SetStateAction<Profile>>;
};

export const ProfileContext = createContext<ProfileContextProps | undefined>(undefined);
