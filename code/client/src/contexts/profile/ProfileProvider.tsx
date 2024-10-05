import { Profile } from '@core/models/game/Player';
import Cookies from 'js-cookie';
import { ReactElement, useState } from 'react';
import { ProfileContext } from './ProfileContext';

type ProfileProviderProps = {
  children: ReactElement;
};

export const ProfileProvider = ({ children }: ProfileProviderProps) => {
  const [profile, setProfile] = useState(() => {
    const cookieData = Cookies.get('profile');
    return cookieData ? (JSON.parse(cookieData) as Profile) : { pic: '', name: '', playerId: '' };
  });

  return (
    <ProfileContext.Provider
      value={{
        profile,
        setProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
