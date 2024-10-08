import { Profile } from '@core/model/game/Player';
import Cookies from 'js-cookie';
import { ReactElement, useState } from 'react';
import { ProfileContext } from './ProfileContext';

type ProfileProviderProps = {
  children: ReactElement;
};

export const ProfileProvider = ({ children }: ProfileProviderProps) => {
  const [profile, setProfile] = useState(() => {
    const cookieData = Cookies.get('profile');
    return cookieData ? (JSON.parse(cookieData) as Profile) : ({ picture: '', name: '', playerId: '' } as Profile);
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
