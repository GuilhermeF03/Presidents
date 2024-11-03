import { Input, InputProps, theme } from '@chakra-ui/react';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

export const BaseInput = forwardRef<HTMLInputElement, InputProps>(({ ...rest }, ref) => {
  return (
    <Input
      backgroundColor={theme.colors.gray[100]}
      // Dynamically apply padding adjustments using Chakra's built-in logic
      paddingLeft={rest.paddingLeft} // Keep dynamic padding adjustments
      paddingRight={rest.paddingRight}
      className={twMerge('rounded-lg p-2 text-xl', rest.className)}
      {...rest}
      ref={ref}
    />
  );
});
