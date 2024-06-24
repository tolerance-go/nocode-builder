import { useMatch } from "react-router-dom";
import { AppDetail } from "./AppDetail";
import { AppTemplate } from "./AppTemplate";

export const AppContent = () => {
  const match = useMatch("/apps/templates");

  if (match) {
    return <AppTemplate />;
  }

  return <AppDetail />;
};
