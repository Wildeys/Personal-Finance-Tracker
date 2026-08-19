import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { stores } from '@/stores';
import { resources } from './resources';
import type { TxKeyPath } from './types';

export type { TxKeyPath } from './types';

// Initialize i18next without reading stores here — stores/index imports this
// file via UILanguageStore, so `stores` is still undefined at module load.
i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  compatibilityJSON: 'v4',
  interpolation: {
    escapeValue: false,
  },
});

export const translate = (key: TxKeyPath, options?: Record<string, unknown>): string => {
  // Read the observable so observer components still re-render on change.
  void stores?.uiLanguage?.language;
  return i18n.t(key, options) as string;
};

export const syncLanguage = (lang: string) => {
  i18n.changeLanguage(lang);
};

export default i18n;
