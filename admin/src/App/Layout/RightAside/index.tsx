import { useMatch } from "react-router-dom";
import { DesignAside } from "./DesignAside";

export const RightAside = () => {
  const match = useMatch("/apps/:id/design");
  // const render = () => {
  //   if (currentSystemPaths.isAppDesign) {
  //     if (currentSystemPaths.isAppDesignAndRightSideIsEditor) {
  //       return <EditorPanel />;
  //     }

  //     return <ComponentStorePanel />;
  //   }
  //   return <SettingsForm />;
  // };

  return (
    <aside className={"w-[400px] relative border-l h-[100%] bg-white"}>
      {match && <DesignAside />}
    </aside>
  );
};

export default RightAside;
