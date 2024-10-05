import { Profile } from '@core/models/game/Player';
import { Dispatch, SetStateAction, createContext } from 'react';

type ProfileContextProps = {
  profile: Profile;
  setProfile: Dispatch<SetStateAction<Profile>>;
};

export const ProfileContext = createContext<ProfileContextProps | undefined>(undefined);
