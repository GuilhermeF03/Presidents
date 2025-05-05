import type { Profile } from '@core/model/game/player.ts';
import { dylan } from '@dicebear/collection';
import Cookies from 'js-cookie';
import { type ReactElement, useState } from 'react';
import { ProfileContext } from './ProfileContext';

type ProfileProviderProps = {
  children: ReactElement;
};

export const ProfileProvider = ({ children }: ProfileProviderProps) => {
  const [profile, setProfile] = useState(() => {
    const cookieData = Cookies.get('profile');
    return cookieData ? (JSON.parse(cookieData) as Profile) : ({ picture: '', name: '', playerId: '' } as Profile);
  });

  const [avatarOptions, setAvatarOptions] = useState<dylan.Options>(() => {
    const cookieData = Cookies.get('avatarOptions');
    return cookieData ? (JSON.parse(cookieData) as dylan.Options) : {};
  });

  return (
    <ProfileContext.Provider
      value={{
        profile,
        setProfile,
        avatarOptions,
        setAvatarOptions,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
