import stores from "@/stores";
import { useSnapshot } from "valtio";
import SettingsForm from "./SettingsForm";

export const RightAside = () => {
  const currentSystemPaths = useSnapshot(stores.navs.currentSystemPaths);
  const isApps = currentSystemPaths[0] === "apps";

  return !isApps ? null : (
    <aside className={"w-[400px] border-l"}>
      <SettingsForm />
    </aside>
  );
};

export default RightAside;
