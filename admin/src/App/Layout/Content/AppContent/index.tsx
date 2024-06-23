import { useSearchParams } from "react-router-dom";
import { AppDetail } from "./AppDetail";
import { AppTemplate } from "./AppTemplate";
import { SEARCH_PARAMS } from "@/constants";

export const AppContent = () => {
  const [searchParams] = useSearchParams();

  if (searchParams.get(SEARCH_PARAMS.APP.IS_TEMPLATE)) {
    return <AppTemplate />;
  }

  return <AppDetail />;
};
