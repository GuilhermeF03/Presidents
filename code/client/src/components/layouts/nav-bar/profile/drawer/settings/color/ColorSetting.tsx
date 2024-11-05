import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
} from '@chakra-ui/react';
import { Github } from '@uiw/react-color';

export type ColorSettingProps = {
  colors: string[];
  color: string;
  setColor: (color: string) => void;
};

export const ColorSetting = ({ colors, color, setColor }: ColorSettingProps) => {
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
            colors={colors}
            style={{
              marginLeft: 20,
            }}
            color={color}
            onChange={color => setColor(color.hex.split('#')[1])}
          />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
