import { useSyncExternalStore } from 'react';
import i18n from './i18n';
import { PHRASES } from './phrases';
import { currentLanguage } from '../services/language';

const subscribe = listener => {
  i18n.on('languageChanged', listener);
  return () => i18n.off('languageChanged', listener);
};

export const text = source => {
  if (source == null || source === '') return '';
  const value = String(source);
  const lang = currentLanguage();
  if (lang === 'hy') return value;
  return PHRASES[value]?.[lang] || value;
};

export const useT = () => {
  useSyncExternalStore(subscribe, currentLanguage, currentLanguage);
  return text;
};
