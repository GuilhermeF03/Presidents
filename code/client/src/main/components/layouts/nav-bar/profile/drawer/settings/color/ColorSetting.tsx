import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
} from '@chakra-ui/react';
import { ColorResult, Github } from '@uiw/react-color';

export type ColorSettingProps = {
  colors: string[];
  color: string;
  setColor: (color: string) => void;
};

export const ColorSetting = ({ colors, color, setColor }: ColorSettingProps) => {
  const onColorChange = (color: ColorResult) => {
    setColor(color.hex.split('#')[1]);
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Button bgColor={color} />
      </PopoverTrigger>

      <PopoverContent>
        <PopoverArrow />

        <PopoverCloseButton />

        <PopoverBody>
          <Github
            colors={colors.map(color => `#${color}`)}
            style={{ marginLeft: 20 }}
            color={color}
            onChange={onColorChange}
          />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
