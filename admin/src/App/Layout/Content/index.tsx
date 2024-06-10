import { useSnapshot } from "valtio";
import { DataTable } from "./DataTable";
import stores from "@/stores";
import { AppList } from "./AppList";
import { Designer } from "./Designer";

export const Content = () => {
  const currentSystemPaths = useSnapshot(stores.navs.states.currentSystemPaths);

  if (currentSystemPaths.isAppData) {
    return <DataTable />;
  }

  if (currentSystemPaths.isAppDesign) {
    return <Designer />;
  }

  if (currentSystemPaths.isApp) {
    return <AppList />;
  }

  return <div>empty</div>;
};
