import { Route, Routes } from "react-router-dom";
import { AppList } from "./AppList";
import { DataTable } from "./DataTable";
import { Designer } from "./Designer";

export const Content = () => {
  return (
    <Routes>
      <Route path="/apps" element={<AppList />}></Route>
      <Route path="/apps/:id/data" element={<DataTable />}></Route>
      <Route path="/apps/:id/design" element={<Designer />}></Route>
    </Routes>
  );
};
