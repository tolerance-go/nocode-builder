import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './lng/en.json';
import zh from './lng/zh.json';

const resources = {
  en: {
    translation: en,
  },
  zh: {
    translation: zh,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en', // 初始语言
  fallbackLng: 'en', // 备用语言
  interpolation: {
    escapeValue: false, // react 已经安全转义
  },
});

export default i18n;
