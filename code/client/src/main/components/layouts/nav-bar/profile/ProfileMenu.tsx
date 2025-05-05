import { Button, type ButtonProps, useDisclosure } from '@chakra-ui/react';

import { ProfilePortrait } from '@components/ProfilePortrait.tsx';
import { ProfileDrawer } from '@components/layouts/nav-bar/profile/drawer/ProfileDrawer.tsx';
import type { Profile } from '@core/model/game/player.ts';
import { dylan } from '@dicebear/collection';
import { useProfileContext } from '@hooks/useProfileContext.tsx';
import { forwardRef, useRef } from 'react';

export type ProfileMenuProps = ButtonProps;
export const ProfileMenu = forwardRef<HTMLButtonElement, ProfileMenuProps>((props, ref) => {
  // State and context
  const { profile, setProfile, setAvatarOptions } = useProfileContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement | null>(null);

  // Save tempProfile to context's profile and close the drawer
  const onSave = (tempProfile: Profile, avatarOptions: dylan.Options) => {
    setProfile(tempProfile); // Persist tempProfile to context
    setAvatarOptions(avatarOptions);
    onClose();
  };

  return (
    <>
      <Button
        __css={''}
        ref={ref}
        onClick={onOpen}
        className="right-4 h-12 w-12 rounded-full bg-blue-500 md:h-16 md:w-16 border-4 border-black"
        bgColor="white"
        position="absolute"
        {...props}
      >
        {profile.picture && <ProfilePortrait picture={profile.picture} />}
      </Button>

      <ProfileDrawer isOpen={isOpen} onClose={onClose} btnRef={btnRef} onSave={onSave} profile={profile} />
    </>
  );
});
