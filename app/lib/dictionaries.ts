import 'server-only';

import { notFound } from 'next/navigation';
import type {
  PlaygroundDictionary,
  TopDictionary,
} from '@/types/dictionaries';

export const localeCodes = ['en', 'nl', 'ja'] as const;

export type Locale = (typeof localeCodes)[number];

type Dictionary = TopDictionary & PlaygroundDictionary;

export function isLocale(value: string): value is Locale {
  return localeCodes.includes(value as Locale);
}

const dictionaries = {
  en: () =>
    import('../../dictionaries/en.json').then((module) => module.default),
  nl: () =>
    import('../../dictionaries/nl.json').then((module) => module.default),
  ja: () =>
    import('../../dictionaries/ja.json').then((module) => module.default),
} satisfies Record<Locale, () => Promise<Dictionary>>;

export async function getDictionary(locale: string): Promise<Dictionary> {
  if (!isLocale(locale)) {
    notFound();
  }

  return dictionaries[locale]();
}
