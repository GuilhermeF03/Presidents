import { HStack, Text } from '@chakra-ui/react';
import React from 'react';

export type ProfileSettingProps = {
  setting: string;
  children: React.ReactNode;
};

export const ProfileSetting = ({ setting, children }: ProfileSettingProps) => {
  return (
    <HStack>
      <Text className={'font-bold text-sm'}> {setting} </Text>
      {children}
    </HStack>
  );
};
