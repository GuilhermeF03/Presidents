import { InputAddonProps, InputLeftElement, InputRightElement } from '@chakra-ui/react';
import { ReactNode } from 'react';

export type InputIconProps = {
  anchor: 'left' | 'right';
  icon: ReactNode;

  iconProps?: InputAddonProps;
};
export function InputIcon({ anchor, icon, iconProps }: InputIconProps) {
  return anchor === 'left' ? (
    <InputLeftElement pointerEvents="none" {...iconProps}>
      {icon}
    </InputLeftElement>
  ) : (
    <InputRightElement pointerEvents="none" {...iconProps}>
      {icon}
    </InputRightElement>
  );
}
