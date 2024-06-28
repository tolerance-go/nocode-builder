import { Sider } from "./Sider";
import { SubSider } from "./SubSider";
import { Layout as AntdLayout } from "antd";

export const Layout = () => {
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
