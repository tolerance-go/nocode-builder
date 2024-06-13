import { DesignAside } from "./DesignAside";
import { AppAside } from "./AppAside";
import { Route, Routes } from "react-router-dom";

export const LeftAside = () => {
  return (
    <div className="flex flex-col h-[100%]">
      <Routes>
        <Route path="/apps" element={<AppAside />}></Route>
        <Route path="/apps/:id/design" element={<DesignAside />}></Route>
      </Routes>
    </div>
  );
};
