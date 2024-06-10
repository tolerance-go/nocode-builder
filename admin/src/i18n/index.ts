import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./lng/en.json";
import zh from "./lng/zh.json";

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
  lng: "en", // 默认语言
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
