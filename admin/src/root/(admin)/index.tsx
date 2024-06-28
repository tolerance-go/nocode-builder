import { Layout } from "antd";
import { Navigate } from "react-router-dom";
import store from "store2";
import { Sider } from "./Sider";
import { SubSider } from "./SubSider";

export const Admin = () => {
  if (!store.get("token")) {
    return <Navigate to={"/login"} />;
  }

  return (
    <Layout
      style={{
        overflow: "hidden",
        height: "100vh",
        position: "relative",
      }}
    >
      <Sider />
      <SubSider />
    </Layout>
  );
};
