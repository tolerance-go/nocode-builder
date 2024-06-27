import { Layout } from "antd";
import { Navigate } from "react-router-dom";
import store from "store2";
import { Sider } from "./Sider";

export const Admin = () => {
  if (!store.get("token")) {
    return <Navigate to={"/entry/login"} />;
  }

  return (
    <Layout
      style={{
        overflow: "hidden",
        height: "100vh",
      }}
    >
      <Sider />
    </Layout>
  );
};
