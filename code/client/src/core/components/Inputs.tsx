import {
  Input,
  InputAddonProps,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  InputProps as IProps,
  theme,
} from '@chakra-ui/react';
import { twMerge } from 'tailwind-merge';
import { ReactNode } from 'react';

type InputProps = IProps;

export function BaseInput({ ...rest }: InputProps) {
  return (
    <Input
      backgroundColor={theme.colors.gray[100]}
      // Dynamically apply padding adjustments using Chakra's built-in logic
      paddingLeft={rest.paddingLeft} // Keep dynamic padding adjustments
      paddingRight={rest.paddingRight}
      className={twMerge('rounded-lg p-2 text-xl', rest.className)}
      {...rest}
    />
  );
}

type IconInputProps = IProps & {
  anchor: 'left' | 'right';
  icon: ReactNode;
  iconProps?: InputAddonProps;
};

export function IconInput({ anchor, icon, iconProps, ...rest }: IconInputProps) {
  return (
    <InputGroup>
      {anchor === 'left' ? (
        <InputLeftElement pointerEvents="none" {...iconProps}>
          {icon}
        </InputLeftElement>
      ) : (
        <InputRightElement pointerEvents="none" {...iconProps}>
          {icon}
        </InputRightElement>
      )}
      {/* Adjust input padding based on icon position */}
      <BaseInput
        {...rest}
        paddingLeft={anchor === 'left' ? '2.5rem' : undefined} // Adjust padding to avoid overlap
        paddingRight={anchor === 'right' ? '2.5rem' : undefined}
      />
    </InputGroup>
  );
}
