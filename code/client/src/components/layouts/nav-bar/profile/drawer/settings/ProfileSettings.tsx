import { HStack, VStack } from '@chakra-ui/react';
import { ProfileSetting } from '@components/layouts/nav-bar/profile/drawer/settings/ProfileSetting.tsx';
import { ColorSetting } from '@components/layouts/nav-bar/profile/drawer/settings/color/ColorSetting.tsx';
import { STYLES } from '@components/styles/styles.ts';
import { Profile } from '@core/model/game/player.ts';
import { dylan } from '@dicebear/collection';
import React, { useEffect } from 'react';

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

  const setSkinColor = (hex: string) => {
    setTempPicOptions(prev => ({
      ...prev,
      skinColor: [hex],
    }));
  };

  useEffect(() => {
    console.log('Updating tempProfile with new profilePicOptions', tempPicOptions);
  }, [tempPicOptions]);

  return (
    <VStack alignItems={'start'}>
      <HStack>
        <ProfileSetting setting={'Background Color'}>
          <ColorSetting
            colors={STYLES.colors.BACKGROUND_PALETTE}
            color={`#${tempPicOptions.backgroundColor?.at(0)}`}
            setColor={setBackgroundColor}
          />
        </ProfileSetting>

        <ProfileSetting setting={'Skin Color'}>
          <ColorSetting
            colors={STYLES.colors.SKIN_PALETTE}
            color={`#${tempPicOptions.skinColor?.at(0)}`}
            setColor={setSkinColor}
          />
        </ProfileSetting>
      </HStack>
      <HStack>
        <ProfileSetting setting={'HairColor'}>
          <ColorSetting
            colors={STYLES.colors.HAIR_PALETTE}
            color={`#${tempPicOptions.hairColor?.at(0)}`}
            setColor={setHairColor}
          />
        </ProfileSetting>

        <ProfileSetting setting={'Hair Style'}>...</ProfileSetting>
      </HStack>
      <HStack></HStack>
    </VStack>
  );
};
