import type { Profile } from '@core/model/game/player.ts';
import { dylan } from '@dicebear/collection';
import { type Dispatch, type SetStateAction, createContext } from 'react';

type ProfileContextProps = {
  profile: Profile;
  setProfile: Dispatch<SetStateAction<Profile>>;
  avatarOptions: dylan.Options;
  setAvatarOptions: Dispatch<SetStateAction<dylan.Options>>;
};

export const ProfileContext = createContext<ProfileContextProps | undefined>(undefined);
