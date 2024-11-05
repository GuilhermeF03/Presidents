import { STYLES } from '@/components/styles/styles.ts';
import { dylan } from '@dicebear/collection';

const DEFAULT_MOODS: dylan.Options['mood'] = ['happy', 'sad', 'confused', 'angry'];
const randomMood = () => DEFAULT_MOODS[Math.floor(Math.random() * DEFAULT_MOODS.length)];

const DEFAULT_HAIRS: dylan.Options['hair'] = ['bangs', 'wavy', 'shaggy', 'roundBob', 'fluffy', 'plain', 'longCurls'];
const randomHair = () => DEFAULT_HAIRS[Math.floor(Math.random() * DEFAULT_HAIRS.length)];

const randomSkinColor = () => {
  const options = STYLES.colors.SKIN_PALETTE;
  return options[Math.floor(Math.random() * options.length)];
};

const randomBackgroundColor = () => {
  const options = STYLES.colors.BACKGROUND_PALETTE;
  return options[Math.floor(Math.random() * options.length)];
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
