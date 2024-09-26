import { Input, InputProps as IProps, theme } from '@chakra-ui/react';
import { twMerge } from 'tailwind-merge';

type InputProps = IProps;

export function BaseInput({ ...rest }: InputProps) {
  return (
    <Input
      variant={'outline'}
      backgroundColor={theme.colors.gray[100]}
      className={twMerge('text-xl  p-2 rounded-lg ', rest.className)}
      {...rest}
    >
      {rest.children}
    </Input>
  );
}
