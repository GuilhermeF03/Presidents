import { ProfileContext } from '@/contexts/profile/ProfileContext.tsx';
import { newUser } from '@/library/profile-creation/profileCreation.ts';
import lo from 'lodash';
import { useContext, useEffect } from 'react';

export const useProfileContext = () => {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error('useProfileContext must be used within a ProfileProvider');
  }

  const { profile, setProfile, avatarOptions, setAvatarOptions } = context; // Directly destructure profile and setProfile from context

  useEffect(() => {
    const fetchProfile = async () => {
      if (!profile || !avatarOptions || lo.isEmpty(Object.keys(avatarOptions))) {
        const { profile, options } = await newUser();
        setProfile(profile); // Update profile in context, triggering re-render
        setAvatarOptions(options); // Update avatarOptions in context, triggering re-render
      }
    };
    fetchProfile();
  }, [profile, setProfile, avatarOptions, setAvatarOptions]);

  return context; // Return the entire context object
};
