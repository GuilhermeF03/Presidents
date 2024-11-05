import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
} from '@chakra-ui/react';
import { Sketch } from '@uiw/react-color';
import { useState } from 'react';

export type ColorSettingProps = {
  color: string;
  setColor: (color: string) => void;
};

export const ColorSetting = ({ color, setColor }: ColorSettingProps) => {
  const [tempColor, setTempColor] = useState(color);

  return (
    <Popover>
      <PopoverTrigger>
        <Button bgColor={color} />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          <Sketch
            style={{ marginLeft: 20 }}
            color={color}
            onChange={color => setTempColor(color.hex)}
            onMouseUp={() => setColor(tempColor)}
          />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
