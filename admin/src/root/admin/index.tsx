import { Layout } from "antd";
import { Navigate } from "react-router-dom";
import store from "store2";
import { Aside } from "./Aside";

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
      <Aside />
    </Layout>
  );
};
