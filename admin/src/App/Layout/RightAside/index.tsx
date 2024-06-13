import Route from "@/components/Route";
import { ComponentStorePanel } from "./ComponentStorePanel";

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
      <Route path="/apps/:id/design" element={<ComponentStorePanel />}></Route>
    </aside>
  );
};

export default RightAside;
