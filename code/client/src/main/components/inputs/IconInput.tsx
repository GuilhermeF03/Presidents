import { type InputAddonProps, InputGroup, type InputProps } from '@chakra-ui/react';
import { BaseInput } from '@components/inputs/BaseInput.tsx';
import { InputIcon } from '@components/inputs/InputIcon.tsx';
import { type ReactNode, forwardRef } from 'react';

type IconInputProps = InputProps & {
  anchor: 'left' | 'right';
  icon: ReactNode;
  iconProps?: InputAddonProps;
};

export const IconInput = forwardRef<HTMLInputElement, IconInputProps>(({ anchor, icon, iconProps, ...rest }, ref) => {
  return (
    <InputGroup>
      <InputIcon anchor={anchor} icon={icon} iconProps={iconProps} />
      {/* Adjust input padding based on icon position */}
      <BaseInput
        ref={ref} // Pass the ref to BaseInput
        {...rest}
        paddingLeft={anchor === 'left' ? '2.5rem' : undefined} // Adjust padding to avoid overlap
        paddingRight={anchor === 'right' ? '2.5rem' : undefined}
      />
    </InputGroup>
  );
});
