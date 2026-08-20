import { I18nManager } from 'react-native';

export { translate } from './i18n';
export * from './theme';
export * from './use-keyboard-height';
export type { TxKeyPath } from './i18n/types';

export const isRTL = I18nManager.isRTL;