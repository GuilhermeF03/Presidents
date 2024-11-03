import {
  type ButtonProps as BProps,
  type BackgroundProps,
  type BorderProps,
  Button,
  type ColorProps,
  theme,
} from '@chakra-ui/react';

type ButtonProps = BProps & {
  normalTextColor?: ColorProps['textColor'];
  normalBorderColor?: BorderProps['borderColor'];
  normalBgColor?: BackgroundProps['bgColor'];

  hoverTextColor?: ColorProps['textColor'];
  hoverBorderColor?: BorderProps['borderColor'];
  hoverBgColor?: BackgroundProps['bgColor'];
};

const PRIMARY_COLOR: ColorProps['textColor'] = theme.colors.cyan[500];
const SECONDARY_COLOR: ColorProps['textColor'] = theme.colors.gray[200];

export function BaseButton({
  normalTextColor = PRIMARY_COLOR,
  normalBorderColor = PRIMARY_COLOR,
  normalBgColor = SECONDARY_COLOR,
  hoverTextColor = SECONDARY_COLOR,
  hoverBorderColor = PRIMARY_COLOR,
  hoverBgColor = PRIMARY_COLOR,
  ...rest
}: ButtonProps) {
  return (
    <Button
      textColor={normalTextColor}
      bgColor={normalBgColor}
      borderColor={normalBorderColor}
      _hover={{
        textColor: hoverTextColor,
        bgColor: hoverBgColor,
        borderColor: hoverBorderColor,
      }}
      borderWidth={4}
      className={'rounded-3xl p-2 text-xl font-bold'}
      {...rest}
    >
      {rest.children}
    </Button>
  );
}
