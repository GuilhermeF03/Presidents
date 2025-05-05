import { HStack, Select, VStack } from '@chakra-ui/react';
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

export const ProfileSettings = ({ tempPicOptions, setTempPicOptions }: ProfileSettingsProps) => {
  useEffect(() => {
    console.log('ProfileSettings: ', tempPicOptions);
  }, [tempPicOptions]);

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

  const setHairStyle = (style: dylan.Options['hair']) => {
    setTempPicOptions(prev => ({
      ...prev,
      hair: style,
    }));
  };

  const setMood = (style: dylan.Options['mood']) => {
    setTempPicOptions(prev => ({
      ...prev,
      mood: style,
    }));
  };

  return (
    <VStack alignItems={'start'}>
      {/* Background and skin settings */}
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

      {/* Hair settings*/}
      <HStack>
        <ProfileSetting setting={'HairColor'}>
          <ColorSetting
            colors={STYLES.colors.HAIR_PALETTE}
            color={`#${tempPicOptions.hairColor?.at(0)}`}
            setColor={setHairColor}
          />
        </ProfileSetting>

        <ProfileSetting setting={'Style'}>
          <Select
            value={tempPicOptions.hair?.[0] || ''}
            onChange={e => setHairStyle([e.target.value] as dylan.Options['hair'])}
          >
            <option value={'plain'}>Plain</option>
            <option value={'wavy'}>Wavy</option>
            <option value={'shortCurls'}>S Curls</option>
            <option value={'parting'}>Parting</option>
            <option value={'spiky'}>Spiky</option>
            <option value={'roundBob'}>Bob</option>
            <option value={'longCurls'}>L Curls</option>
            <option value={'buns'}>Bun</option>
            <option value={'bangs'}>Bangs</option>
            <option value={'fluffy'}>Fluffy</option>
            <option value={'shaggy'}>Shaggy</option>
            <option value={'flatTop'}>Flat Top</option>
          </Select>
        </ProfileSetting>
      </HStack>

      <ProfileSetting setting={'Mood'}>
        <Select
          value={tempPicOptions.mood?.[0] || ''}
          onChange={e => setMood([e.target.value] as dylan.Options['mood'])}
        >
          <option value={'happy'}>Happy</option>
          <option value={'angry'}>Angry</option>
          <option value={'neutral'}>Neutral</option>
          <option value={'superHappy'}>Super Happy</option>
          <option value={'sad'}>Sad</option>
          <option value={'hopeful'}>Hopeful</option>
          <option value={'confused'}>Confused</option>
        </Select>
      </ProfileSetting>
    </VStack>
  );
};
