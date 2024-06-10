import { Button } from "antd";
import { useTranslation } from "react-i18next";

export const LngSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = () => {
    const newLanguage = i18n.language === "en" ? "zh" : "en";
    i18n.changeLanguage(newLanguage);
  };

  return (
    <Button type="text" onClick={changeLanguage}>
      {i18n.language === "en" ? "Switch to 中文" : "切换到 English"}
    </Button>
  );
};
