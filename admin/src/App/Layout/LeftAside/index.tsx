import Route from "@/components/Route";
import { DesignAside } from "./DesignAside";
import { AppAside } from "./AppAside";

export const LeftAside = () => {
  return (
    <div className="flex flex-col">
      <Route path="/apps" element={<AppAside />}></Route>
      <Route path="/apps/:id/design" element={<DesignAside />}></Route>
    </div>
  );
};
