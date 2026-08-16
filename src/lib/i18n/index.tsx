import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { I18nManager } from 'react-native';

import { stores } from '@/stores';
import { resources } from './resources';

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

// Setup RTL
const isRTL = false;
I18nManager.allowRTL(isRTL);
I18nManager.forceRTL(isRTL);

// Translation function - accesses store to make it reactive
export const translate = (key: string, options?: any): string => {
  // Access the language to trigger re-renders in observer components
  const lang = stores?.uiLanguage?.language;
  if (lang && i18n.language !== lang) {
    i18n.changeLanguage(lang);
  }
  return i18n.t(key, options) as string;
};

// Sync i18next with language change
export const syncLanguage = (lang: string) => {
  i18n.changeLanguage(lang);
};

export default i18n;
