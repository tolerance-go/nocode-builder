import { useAppStore } from "@/store";
import { Layout as AntdLayout } from "antd";
import { useState } from "react";
import { Sider } from "./Sider";
import { SubSider } from "./SubSider";

export const Layout = () => {
  const loadProjectTableData = useAppStore.use.loadProjectTableData();

  useState(() => {
    loadProjectTableData();
  });

  return (
    <AntdLayout
      style={{
        overflow: "hidden",
        height: "100vh",
        position: "relative",
      }}
    >
      <Sider />
      <SubSider />
    </AntdLayout>
  );
};
