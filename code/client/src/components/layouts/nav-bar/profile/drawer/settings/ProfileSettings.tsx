import { HStack, VStack } from '@chakra-ui/react';
import { ColorSetting } from '@components/layouts/nav-bar/profile/drawer/settings/ColorSetting.tsx';
import { ProfileSetting } from '@components/layouts/nav-bar/profile/drawer/settings/ProfileSetting.tsx';
import { Profile } from '@core/model/game/player.ts';
import { dylan } from '@dicebear/collection';
import React from 'react';

export type ProfileSettingsProps = {
  tempProfile: Profile;
  setTempProfile: React.Dispatch<React.SetStateAction<Profile>>;
  tempPicOptions: dylan.Options;
  setTempPicOptions: React.Dispatch<React.SetStateAction<dylan.Options>>;
};

export const ProfileSettings = ({
  tempProfile,
  setTempProfile,
  tempPicOptions,
  setTempPicOptions,
}: ProfileSettingsProps) => {
  const setBackgroundColor = (hex: string) => {
    console.log('New color', hex);
    setTempPicOptions(prev => ({
      ...prev,
      backgroundColor: [hex],
    }));
  };

  const setHairColor = (hex: string) => {
    setTempPicOptions(prev => ({
      ...prev,
      hairColor: [hex],
    }));
  };
  return (
    <VStack alignItems={'start'}>
      <HStack>
        <ProfileSetting setting={'Background Color'}>
          <ColorSetting color={tempPicOptions.backgroundColor?.at(0) ?? ''} setColor={setBackgroundColor} />
        </ProfileSetting>

        <ProfileSetting setting={'Skin Color'}>
          <ColorSetting color={tempPicOptions.hairColor?.at(0) ?? ''} setColor={setHairColor} />
        </ProfileSetting>
      </HStack>
      <HStack>
        <ProfileSetting setting={'HairColor'}>...</ProfileSetting>

        <ProfileSetting setting={'Hair Style'}>...</ProfileSetting>
      </HStack>
      <HStack></HStack>
    </VStack>
  );
};
