import { DesignAsideType } from "@/types";
import { useSearchParams } from "react-router-dom";
import ComponentSettingsForm from "./ComponentSettingsForm";
import { ComponentStorePanel } from "./ComponentStorePanel";

export const DesignAside = () => {
  const [searchParams] = useSearchParams({
    designAsideType: "settings" as DesignAsideType,
  });

  if (searchParams.get("designAsideType") === "store") {
    return <ComponentStorePanel />;
  }

  if (searchParams.get("designAsideType") === "settings") {
    return <ComponentSettingsForm />;
  }
};
