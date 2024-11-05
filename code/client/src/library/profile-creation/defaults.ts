import { dylan } from '@dicebear/collection';

const DEFAULT_MOODS: dylan.Options['mood'] = ['happy', 'sad', 'confused', 'angry'];
const randomMood = () => DEFAULT_MOODS[Math.floor(Math.random() * DEFAULT_MOODS.length)];

const DEFAULT_HAIRS: dylan.Options['hair'] = ['bangs', 'wavy', 'shaggy', 'roundBob', 'fluffy', 'plain', 'longCurls'];
const randomHair = () => DEFAULT_HAIRS[Math.floor(Math.random() * DEFAULT_HAIRS.length)];

const DEFAULT_SKIN_COLORS: dylan.Options['skinColor'] = [
  'c26450',
  'ffd6c0',
  'ffbc9b',
  'd4a59a',
  'd9a066',
  'b55239',
  '8a3f2d',
  '5c2e1f',
];
const randomSkinColor = () => DEFAULT_SKIN_COLORS[Math.floor(Math.random() * DEFAULT_SKIN_COLORS.length)];

const DEFAULT_BACKGROUND_COLORS: dylan.Options['backgroundColor'] = [
  '00A878',
  'FE5E41',
  'AF3B6E',
  '21FA90',
  '001514',
  'FBFFFE',
];

const randomBackgroundColor = () =>
  DEFAULT_BACKGROUND_COLORS[Math.floor(Math.random() * DEFAULT_BACKGROUND_COLORS.length)];

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

export const DEFAULT_AVATAR: dylan.Options = {
  mood: [randomMood()],
  skinColor: [randomSkinColor()],
  hair: [randomHair()],
  backgroundColor: [randomBackgroundColor()],
};

export const randomName = () => {
  const prefix = DEFAULT_NAME_PREFIXES[Math.floor(Math.random() * DEFAULT_NAME_PREFIXES.length)];
  const suffix = DEFAULT_NAME_SUFFIXES[Math.floor(Math.random() * DEFAULT_NAME_SUFFIXES.length)];
  return `${prefix} ${suffix}`;
};
