import { Flex, Layout, theme } from "antd";
import { Aside } from "./Aside";
import { Navbar } from "./Navbar";

export const Sider = () => {
  const { token } = theme.useToken();

  return (
    <Layout.Sider
      width={400}
      style={{
        borderRight: `1px solid ${token.colorBorderSecondary}`,
        backgroundColor: token.colorBgContainer,
        height: "100%",
      }}
    >
      <Flex
        style={{
          height: "100%",
        }}
      >
        <Navbar />
        <Aside />
      </Flex>
    </Layout.Sider>
  );
};
