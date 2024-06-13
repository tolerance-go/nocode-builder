import { Route, Routes } from "react-router-dom";
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
    <aside className={"w-[400px] border-l h-[100%]"}>
      <Routes>
        <Route path="/apps/:id/design" element={<DesignAside />}></Route>
      </Routes>
    </aside>
  );
};

export default RightAside;
