import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './lng/en.json';
import zh from './lng/zh.json';
import { EngineBase, ModuleBase } from '@/base';

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

export class 语言国际化系统 extends ModuleBase {
  private static instance: 语言国际化系统;

  public static getInstance(engine: EngineBase): 语言国际化系统 {
    if (!语言国际化系统.instance) {
      语言国际化系统.instance = new 语言国际化系统(engine);
    }
    ModuleBase.断言实例是否合法(语言国际化系统.instance, engine);
    return 语言国际化系统.instance;
  }

  i18n = i18n;
}
