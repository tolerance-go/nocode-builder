import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { SystemBase } from '@/core/base';
import en from './lng/en.json';
import zh from './lng/zh.json';

export const resources = {
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

export class I18nSystem extends SystemBase {
  i18n = i18n;
}
