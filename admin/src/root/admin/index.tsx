import { Layout, theme } from "antd";
import { Navigate } from "react-router-dom";
import store from "store2";
import { TreeMenu } from "./TreeMenu";

export const Admin = () => {
  const { token } = theme.useToken();
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
      <Layout.Sider
        width={400}
        style={{
          borderRight: `1px solid ${token.colorBorderSecondary}`,
        }}
      >
        <TreeMenu />
      </Layout.Sider>
    </Layout>
  );
};
