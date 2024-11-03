import { ProfileContext } from '@/contexts/profile/ProfileContext.tsx';
import { newUser } from '@/library/profile-creation/profileCreation.ts';
import { useContext, useEffect } from 'react';

export const useProfileContext = () => {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error('useProfileContext must be used within a ProfileProvider');
  }

  const { profile, setProfile } = context; // Directly destructure profile and setProfile from context

  useEffect(() => {
    const fetchProfile = async () => {
      if (!profile || profile.name === '' || profile.picture === '' || profile.playerId === '') {
        const newProfile = await newUser();
        setProfile(newProfile); // Update profile in context, triggering re-render
      }
    };
    fetchProfile();
  }, [profile, setProfile]);

  return context; // Return the entire context object
};
