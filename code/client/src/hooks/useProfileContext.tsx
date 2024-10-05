import { ProfileContext } from '@/contexts/profile/ProfileContext';
import { useContext } from 'react';

export const useProfileContext = () => {
  const context = useContext(ProfileContext);

  if (!context) throw new Error('useServicesContext must be used within a ServicesProvider');

  return context;
};
