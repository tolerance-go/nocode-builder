import stores from "@/stores";
import { useSnapshot } from "valtio";
import { EditorPanel } from "./EditorPanel";
import SettingsForm from "./SettingsForm";
import { ComponentStorePanel } from "./ComponentStorePanel";

export const RightAside = () => {
  const currentSystemPaths = useSnapshot(stores.navs.states.currentSystemPaths);

  if (currentSystemPaths.isApp) {
    return null;
  }

  const render = () => {
    if (currentSystemPaths.isAppDesign) {
      if (currentSystemPaths.isAppDesignAndRightSideIsEditor) {
        return <EditorPanel />;
      }

      return <ComponentStorePanel />;
    }
    return <SettingsForm />;
  };

  return <aside className={"w-[400px] border-l"}>{render()}</aside>;
};

export default RightAside;
