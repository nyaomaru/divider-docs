import type { TopDictionary } from '@/types/dictionaries';

export const generatePresets = (dict: TopDictionary['top']) => [
  {
    id: 'preset-email',
    title: dict.presets?.email?.title,
    description: dict.presets?.email?.description,
  },
  {
    id: 'preset-csv',
    title: dict.presets?.csv?.title,
    description: dict.presets?.csv?.description,
  },
  {
    id: 'preset-path',
    title: dict.presets?.path?.title,
    description: dict.presets?.path?.description,
  },
];
