import { css } from '@emotion/css';
import { Avatar, Flex, Layout, Space, Typography, theme } from 'antd';
import { Outlet } from 'react-router-dom';

const { Sider, Content } = Layout;

export const Auth = () => {
  const { token } = theme.useToken();
  return (
    <Layout
      style={{
        overflow: 'hidden',
        height: '100vh',
      }}
    >
      <Sider width="40%">
        <Flex
          vertical
          align="center"
          justify="center"
          style={{
            height: '100%',
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
            <Flex vertical gap={token.sizeXXL}>
              <Flex
                vertical
                style={{
                  textAlign: 'center',
                }}
              >
                <Typography.Title>UNOCODE</Typography.Title>
                {/* <Typography.Title level={5}>AI & 零代码平台</Typography.Title>
                <Typography.Paragraph>一键上线，仅待设计</Typography.Paragraph> */}
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
            height: '100%',
          }}
        >
          <div
            className={css`
              translate: 0 -20%;
            `}
          >
            <Flex vertical gap={token.sizeXXL * 2} align="end">
              <Typography.Text>
                “
                <Typography.Text italic>
                  {/* 使用 UNOCODE
                  零代码平台，我无需编程基础，只要懂业务，就能快速上线所需应用，真的很方便，强烈推荐！ */}
                  每一个不曾起舞的日子，都是对生命的辜负。
                </Typography.Text>
                ”
              </Typography.Text>

              <Space size="middle">
                <Avatar src={'/nicai.webp'} size={'large'} />
                <Space direction="vertical" size={token.sizeXXS}>
                  <Typography.Text strong>弗里德里希·尼采</Typography.Text>
                  <Typography.Text type="secondary">
                    19世纪德国著名的哲学家，诗人
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
