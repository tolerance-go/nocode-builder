import { useQueryParams } from "@/hooks/useQueryParams";
import { ComponentStorePanel } from "./ComponentStorePanel";
import ComponentSettingsForm from "./ComponentSettingsForm";
import { DesignAsideType } from "@/types";

export const DesignAside = () => {
  const [query] = useQueryParams({
    designAsideType: "settings" as DesignAsideType,
  });

  if (query.designAsideType === "store") {
    return <ComponentStorePanel />;
  }

  if (query.designAsideType === "settings") {
    return <ComponentSettingsForm />;
  }
};
