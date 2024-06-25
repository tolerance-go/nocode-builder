import { css } from "@emotion/css";
import { Avatar, Flex, Layout, Space, Typography, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import { Outlet } from "react-router-dom";

export const Entry = () => {
  const { token } = theme.useToken();
  return (
    <Layout
      style={{
        borderRadius: 8,
        overflow: "hidden",
        height: "100vh",
      }}
    >
      <Sider width="40%">
        <Flex
          vertical
          align="center"
          justify="center"
          style={{
            height: "100%",
          }}
        >
          <div
            style={{
              width: 300,
            }}
            className={css`
              translate: 0 -20%;
            `}
          >
            <Flex vertical gap={token.sizeUnit * 10}>
              <Flex
                vertical
                style={{
                  textAlign: "center",
                }}
              >
                <Typography.Title>UNOCODE</Typography.Title>
                <Typography.Title level={4}>
                  下一代无代码开发平台
                </Typography.Title>
              </Flex>
              <Outlet />
            </Flex>
          </div>
        </Flex>
      </Sider>
      <Content>
        <Flex
          vertical
          align="center"
          justify="center"
          style={{
            height: "100%",
          }}
        >
          <div
            className={css`
              translate: 0 -20%;
            `}
          >
            <Flex vertical gap={token.sizeUnit * 10} align="end">
              <Typography.Text>
                “
                <Typography.Text italic>
                  使用 UNOCODE
                  零代码平台，我无需编程基础，只要懂业务，就能快速上线所需应用，真的很方便，强烈推荐！
                </Typography.Text>
                ”
              </Typography.Text>

              <Space size="middle">
                <Avatar size={"large"} />
                <Space direction="vertical" size={token.sizeUnit / 4}>
                  <Typography.Text strong>周天宇</Typography.Text>
                  <Typography.Text type="secondary">
                    光大证券高级产品经理
                  </Typography.Text>
                </Space>
              </Space>
            </Flex>
          </div>
        </Flex>
      </Content>
    </Layout>
  );
};
