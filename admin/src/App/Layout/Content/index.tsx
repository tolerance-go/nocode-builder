import { AppList } from "./AppList";
import { DataTable } from "./DataTable";
import { Designer } from "./Designer";
import Route from "@/components/Route";

export const Content = () => {
  return (
    <>
      <Route path="/apps" element={<AppList />}></Route>
      <Route path="/apps/:id/data" element={<DataTable />}></Route>
      <Route path="/apps/:id/design" element={<Designer />}></Route>
    </>
  );
};
