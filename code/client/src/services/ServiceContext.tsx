import { ReactElement, ReactNode, createContext, useContext } from 'react';
import { Services, coreServices } from './coreServices';

interface ServicesContextProps {
  services: Services;
}

const ServicesContext = createContext<ServicesContextProps>({} as ServicesContextProps);

export const useServicesContext = () => {
  const context = useContext(ServicesContext);
  if (!context) {
    throw new Error('useServicesContext must be used within a ServicesProvider');
  }
  return context;
};

type ServicesProviderProps = {
  children: ReactElement;
};

export const ServicesProvider = ({ children }: ServicesProviderProps) => {
  return <ServicesContext.Provider value={{ services: coreServices }}>{children}</ServicesContext.Provider>;
};
