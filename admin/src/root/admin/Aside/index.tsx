import { Avatar, Button, Dropdown, Flex, Layout, theme } from "antd";
import { useNavigate } from "react-router-dom";
import { Header } from "./Header";
import { ProjectTree } from "./ProjectTree";

export const Aside = () => {
  const { token } = theme.useToken();
  const navigate = useNavigate();

  return (
    <Layout.Sider
      width={400}
      style={{
        borderRight: `1px solid ${token.colorBorderSecondary}`,
        backgroundColor: token.colorBgContainer,
      }}
    >
      <Flex
        style={{
          height: "100%",
        }}
      >
        <Flex
          style={{
            padding: `${token.sizeSM}px ${token.sizeXS}px`,
            borderRight: `1px solid ${token.colorBorderSecondary}`,
          }}
          justify="center"
          align="end"
        >
          <Dropdown
            menu={{
              items: [
                {
                  key: "1",
                  label: "登出",
                  onClick: () => {
                    navigate("/login");
                  },
                },
              ],
            }}
            placement="topRight"
          >
            <Button type="text" shape="circle" icon={<Avatar />}></Button>
          </Dropdown>
        </Flex>
        <Flex
          vertical
          style={{
            height: "100%",
            flexGrow: 1,
          }}
        >
          <Header />
          <div
            style={{
              flexGrow: 1,
            }}
          >
            <ProjectTree />
          </div>
        </Flex>
      </Flex>
    </Layout.Sider>
  );
};
