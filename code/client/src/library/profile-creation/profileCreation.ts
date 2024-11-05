import { DEFAULT_AVATAR, randomName } from '@/library/profile-creation/defaults.ts';
import type { Profile } from '@core/model/game/player.ts';
import { dylan } from '@dicebear/collection';
import { toPng } from '@dicebear/converter';
import { type Options, createAvatar } from '@dicebear/core';
import { v4 as uuid } from 'uuid';

// DEFAULT AVATAR

type ProfileAvatar = {
  picture: string;
  options: Partial<dylan.Options | Options>;
};

export const getAvatar = async (opts: Partial<dylan.Options | Options>): Promise<ProfileAvatar> => {
  const avatar = createAvatar(dylan, opts).toString();
  const png = toPng(avatar);
  const image = await png.toDataUri();
  return { picture: image, options: opts };
};

type NewUserReturn = {
  profile: Profile;
  options: Partial<dylan.Options>;
};
export const newUser = async (
  name: string | undefined = undefined,
  picOpts: Partial<dylan.Options> = DEFAULT_AVATAR
): Promise<NewUserReturn> => {
  const { picture, options } = await getAvatar(picOpts);

  return {
    profile: {
      playerId: uuid(),
      picture,
      name: name ?? randomName(),
    },
    options,
  };
};
