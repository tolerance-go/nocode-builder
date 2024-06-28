import { useAppStore } from "@/store";
import { Layout as AntdLayout } from "antd";
import React, { useState } from "react";
import { Sider } from "./Sider";
import { SubSider } from "./SubSider";

export const Layout = () => {
  const loadProjectTableData = useAppStore.use.loadProjectTableData();
  const loadProjectGroupTableData = useAppStore.use.loadProjectGroupTableData();

  useState(() => {
    loadProjectTableData();
    loadProjectGroupTableData();
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
