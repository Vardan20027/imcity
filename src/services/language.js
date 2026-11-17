import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../locales/i18n';

const KEY = 'language';

export const normalizeLanguage = code => {
  const value = String(code || '').toLowerCase();
  if (value.startsWith('en')) return 'en';
  if (value.startsWith('ru')) return 'ru';
  return 'hy';
};

export const currentLanguage = () => normalizeLanguage(i18n.language);

export const loadLanguage = async () => {
  try {
    const saved = await AsyncStorage.getItem(KEY);
    const lang = normalizeLanguage(saved || 'hy');
    if (i18n.language !== lang) await i18n.changeLanguage(lang);
    return lang;
  } catch (error) {
    return currentLanguage();
  }
};

export const setLanguage = async code => {
  const lang = normalizeLanguage(code);
  try {
    await AsyncStorage.setItem(KEY, lang);
  } catch (error) {
    // The in-memory language still switches if storage is unavailable.
  }
  if (i18n.language !== lang) await i18n.changeLanguage(lang);
  return lang;
};
