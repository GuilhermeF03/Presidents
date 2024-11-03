import { ColorEditor, ColorPicker } from '@adobe/react-spectrum';

export type ColorSettingProps = {
  color: string;
  setColor: (color: any) => void;
};

export const ColorSetting = ({ color, setColor }: ColorSettingProps) => {
  return (
    <ColorPicker label="Fill" defaultValue="#5100FF">
      <ColorEditor />
    </ColorPicker>
  );
};
