import { HStack, Input, VStack } from '@chakra-ui/react';
import { ProfilePortrait } from '@components/ProfilePortrait.tsx';
import { Profile } from '@core/model/game/player.ts';
import * as React from 'react';

export type ProfileDrawerNameAndAvatarProps = {
  tempProfile: Profile;
  setTempProfile: React.Dispatch<React.SetStateAction<Profile>>;
};

export const ProfileFrame = ({ tempProfile, setTempProfile }: ProfileDrawerNameAndAvatarProps) => {
  const setUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTempProfile(prev => ({
      ...prev,
      name: event.target.value,
    }));
  };

  return (
    <VStack gap={'1.5rem'}>
      <HStack>
        <Input placeholder="Name" defaultValue={tempProfile.name} onChange={setUserName} />
      </HStack>
      <ProfilePortrait picture={tempProfile.picture} />
    </VStack>
  );
};
