import { newUser } from '@/library/profile-creation/profileCreation.ts';
import {
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
} from '@chakra-ui/react';
import { ProfileDrawerNameAndAvatar } from '@components/layouts/nav-bar/profile/drawer/ProfileDrawerNameAndAvatar.tsx';
import { ProfileSettings } from '@components/layouts/nav-bar/profile/drawer/settings/ProfileSettings.tsx';
import type { Profile } from '@core/model/game/player.ts';
import type { dylan } from '@dicebear/collection';
import { useProfileContext } from '@hooks/useProfileContext.tsx';
import { MutableRefObject, useEffect, useRef, useState } from 'react';

export type ProfileDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  btnRef: MutableRefObject<HTMLButtonElement | null>;
  onSave: (tempProfile: Profile, avatarOptions: dylan.Options) => void;
  profile: Profile;
};

export const ProfileDrawer = ({ isOpen, onClose, btnRef, onSave }: ProfileDrawerProps) => {
  // State for temporary profile changes

  const { profile, avatarOptions } = useProfileContext();
  const profileNameRef = useRef<HTMLInputElement>(null);
  const [tempProfilePicOptions, setTempProfilePicOptions] = useState<dylan.Options>(avatarOptions);
  const [tempProfile, setTempProfile] = useState<Profile>(profile);

  useEffect(() => {
    if (isOpen) setTempProfile(profile);
  }, [isOpen, profile]);

  useEffect(() => {
    const fetchNewProfile = async () => {
      const profileName = profileNameRef.current?.value || '';
      const { profile: newProfile } = await newUser(profileName, tempProfilePicOptions);
      setTempProfile(prevState => ({
        ...prevState,
        picture: newProfile.picture,
      }));
    };
    fetchNewProfile();
  }, [tempProfilePicOptions]);

  const _onSave = () => {
    onSave(tempProfile, tempProfilePicOptions);
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} finalFocusRef={btnRef}>
      <DrawerOverlay />
      <DrawerContent height={'fit-content'} width={'fit-content'} className={'rounded-3xl gap-3.5'}>
        <DrawerCloseButton />
        <DrawerHeader>Profile Settings</DrawerHeader>

        <DrawerBody height={'100%'} objectFit={'cover'} className={'flex flex-col'} gap={'1.5rem'}>
          <ProfileDrawerNameAndAvatar tempProfile={tempProfile} setTempProfile={setTempProfile} />
          <Divider />
          <ProfileSettings
            tempProfile={tempProfile}
            setTempProfile={setTempProfile}
            tempPicOptions={tempProfilePicOptions}
            setTempPicOptions={setTempProfilePicOptions}
          />
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={_onSave}>
            Apply
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
