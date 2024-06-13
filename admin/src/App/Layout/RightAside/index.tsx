import Route from "@/components/Route";
import { DesignAside } from "./DesignAside";

export const RightAside = () => {
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
    <aside className={"w-[400px] border-l"}>
      <Route path="/apps/:id/design" element={<DesignAside />}></Route>
    </aside>
  );
};

export default RightAside;
