import { useMatch } from "react-router-dom";
import { AppDetail } from "./AppDetail";
import { AppTemplate } from "./AppTemplate";
import { AppAll } from "./AppAll";

export const AppContent = () => {
  const tplMatch = useMatch("/apps/templates");
  const allMatch = useMatch("/apps/all");

  if (allMatch) {
    return <AppAll />;
  }

  if (tplMatch) {
    return <AppTemplate />;
  }

  return <AppDetail />;
};
