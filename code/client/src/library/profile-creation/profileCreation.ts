import type { Profile } from '@core/model/game/player.ts';
import { dylan } from '@dicebear/collection';
import { toPng } from '@dicebear/converter';
import { type Options, createAvatar } from '@dicebear/core';
import { v4 as uuid } from 'uuid';

// DEFAULT AVATAR

const DEFAULT_MOODS: dylan.Options['mood'] = ['happy', 'sad', 'confused', 'angry'];
const getMood = () => DEFAULT_MOODS[Math.floor(Math.random() * DEFAULT_MOODS.length)];

const DEFAULT_HAIRS: dylan.Options['hair'] = ['bangs', 'wavy', 'shaggy', 'roundBob', 'fluffy', 'plain', 'longCurls'];
const getHair = () => DEFAULT_HAIRS[Math.floor(Math.random() * DEFAULT_HAIRS.length)];

const DEFAULT_SKIN_COLORS: dylan.Options['skinColor'] = [
  'c26450',
  'ffd6c0',
  'ffbc9b',
  'd4a59a',
  'c68642',
  '8d5524',
  '5c3a21',
  'd9a066',
  'b55239',
  '8a3f2d',
  '5c2e1f',
  'd9a066',
  'b55239',
  '8a3f2d',
  '5c2e1f',
  'd9a066',
  'b55239',
  '8a3f2d',
  '5c2e1f',
  'd9a066',
  'b55239',
  '8a3f2d',
  '5c2e1f',
  'd9a066',
  'b55239',
  '8a3f2d',
  '5c2e1f',
  'd9a066',
  'b55239',
  '8a3f2d',
  '5c2e1f',
  'd9a066',
  'b55239',
  '8a3f2d',
  '5c2e1f',
  'd9a066',
  'b55239',
  '8a3f2d',
  '5c2e1f',
  'd9a066',
  'b55239',
  '8a3f2d',
  '5c2e1f',
  'd9a066',
  'b55239',
  '8a3f2d',
  '5c2e1f',
];
const getSkinColor = () => DEFAULT_SKIN_COLORS[Math.floor(Math.random() * DEFAULT_SKIN_COLORS.length)];

const DEFAULT_BACKGROUND_COLORS: dylan.Options['backgroundColor'] = [
  '00A878',
  'FE5E41',
  'AF3B6E',
  '21FA90',
  '001514',
  'FBFFFE',
];

const getBackgroundColor = () =>
  DEFAULT_BACKGROUND_COLORS[Math.floor(Math.random() * DEFAULT_BACKGROUND_COLORS.length)];

const DEFAULT_AVATAR: dylan.Options = {
  mood: [getMood()],
  skinColor: [getSkinColor()],
  hair: [getHair()],
  backgroundColor: [getBackgroundColor()],
};

const DEFAULT_NAME_PREFIXES = [
  'Lively',
  'Sassy',
  'Clever',
  'Witty',
  'Energetic',
  'Brave',
  'Charming',
  'Daring',
  'Fierce',
];

const DEFAULT_NAME_SUFFIXES = ['Jake', 'Molly', 'Charlie', 'Sophie', 'Max', 'Bella', 'Buddy', 'Lucy', 'Daisy'];

export const getAvatar = async (opts: Partial<dylan.Options | Options>) => {
  const avatar = createAvatar(dylan, opts).toString();
  const png = toPng(avatar);
  return await png.toDataUri();
};

export const newUser = async (
  name: string | undefined = undefined,
  picOpts: Partial<dylan.Options> = DEFAULT_AVATAR
): Promise<Profile> => {
  return {
    playerId: uuid(),
    picture: await getAvatar(picOpts),
    name: name ?? randomName(),
  };
};

export const randomName = () => {
  const prefix = DEFAULT_NAME_PREFIXES[Math.floor(Math.random() * DEFAULT_NAME_PREFIXES.length)];
  const suffix = DEFAULT_NAME_SUFFIXES[Math.floor(Math.random() * DEFAULT_NAME_SUFFIXES.length)];
  return `${prefix} ${suffix}`;
};
