import stores from "@/stores";
import { useSnapshot } from "valtio";
import Editor from "./Editor";
import SettingsForm from "./SettingsForm";

export const RightAside = () => {
  const currentSystemPaths = useSnapshot(stores.navs.states.currentSystemPaths);

  if (currentSystemPaths.isApp) {
    return null;
  }

  return (
    <aside className={"w-[400px] border-l"}>
      {currentSystemPaths.isAppDesign ? <Editor /> : <SettingsForm />}
    </aside>
  );
};

export default RightAside;
