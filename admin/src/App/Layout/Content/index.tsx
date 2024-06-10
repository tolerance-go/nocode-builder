import { useSnapshot } from "valtio";
import { DataTable } from "./DataTable";
import stores from "@/stores";
import { AppList } from "./AppList";

export const Content = () => {
  const currentSystemPaths = useSnapshot(stores.navs.currentSystemPaths);
  return currentSystemPaths[0] === "apps" ? (
    <>
      <DataTable />
    </>
  ) : (
    <>
      <AppList />
    </>
  );
};
