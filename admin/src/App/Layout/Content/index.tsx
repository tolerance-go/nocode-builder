import { useSnapshot } from "valtio";
import { DataTable } from "./DataTable";
import stores from "@/stores";
import { AppList } from "./AppList";
import { Designer } from "./Designer";

export const Content = () => {
  const currentSystemPaths = useSnapshot(stores.navs.states.currentSystemPaths);
  const currentSelectedApp = useSnapshot(stores.navs.states.currentSelectedApp);

  if (currentSystemPaths.paths[0] === "apps") {
    if (currentSelectedApp.id) {
      return <Designer />;
    }
    return <AppList />;
  }

  return <DataTable />;
};
