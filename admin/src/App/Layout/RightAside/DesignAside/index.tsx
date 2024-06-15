import { useSearchParams } from "react-router-dom";
import { ComponentSettingsPanel } from "./ComponentSettingsPanel";
import { ComponentStorePanel } from "./ComponentStorePanel";

export const DesignAside = () => {
  const [searchParams] = useSearchParams({
    designAsideSettings: "true",
    designAsideStore: "false",
  });

  return (
    <>
      {searchParams.get("designAsideStore") === "true" && (
        <ComponentStorePanel />
      )}
      {searchParams.get("designAsideSettings") === "true" && (
        <ComponentSettingsPanel />
      )}
    </>
  );
};
