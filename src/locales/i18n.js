import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en';
import ru from './ru';
import am from './am';

const resources = {
  en: { translation: en },
  am: { translation: am },
  hy: { translation: am },
  ru: { translation: ru },
};

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources,
  lng: 'hy',
  fallbackLng: 'hy',
  interpolation: {
    escapeValue: false,
  },
});
export default i18n;
