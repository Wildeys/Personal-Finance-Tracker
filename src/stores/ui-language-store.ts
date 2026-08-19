import { makeAutoObservable } from 'mobx';
import { hydrateStore, makePersistable } from 'mobx-persist-store';
import { I18nManager } from 'react-native';
import type { Language } from '@/lib/i18n/resources';
import { syncLanguage, translate } from '@/lib/i18n';
import { notify } from '@/utils/confirm';
import { PVoid } from './types';

export class UILanguageStore {
  language: Language = 'en';

  setLanguage = async (v: Language): Promise<void> => {
    this.language = v;

    const shouldBeRTL = v === 'ar';
    if (shouldBeRTL !== I18nManager.isRTL) {
      I18nManager.allowRTL(shouldBeRTL);
      I18nManager.forceRTL(shouldBeRTL);
      notify(
        translate('settings.language'),
        translate('settings.restart_required')
      );
    }

    syncLanguage(v);
  };

  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: 'UILanguage',
      properties: ['language'],
      debugMode: false,
    });
  }

  hydrate = async (): PVoid => {
    await hydrateStore(this);
    syncLanguage(this.language);
    const shouldBeRTL = this.language === 'ar';
    I18nManager.allowRTL(shouldBeRTL);
    I18nManager.forceRTL(shouldBeRTL);
  };
}
