import { Button, Flex, Space, theme } from "antd";
import { ProjectTreeHistory } from "./ProjectTreeHistory";
import { useSnapshot } from "valtio";
import { layoutStore } from "@/stores";
import { CloseOutlined } from "@ant-design/icons";

export const SubSider = () => {
  const { token } = theme.useToken();
  const layoutState = useSnapshot(layoutStore.layoutState);

  if (!layoutState.subSiderVisible) {
    return null;
  }

  return (
    <aside
      style={{
        borderRight: `1px solid ${token.colorBorderSecondary}`,
        backgroundColor: token.colorBgContainer,
        position: "absolute",
        top: 0,
        left: 400,
        width: 200,
        height: "100vh",
        zIndex: token.zIndexBase + 1,
      }}
    >
      <header
        style={{
          padding: `${token.paddingXXS}px ${token.paddingXXS}px`,
          borderBottom: `1px solid ${token.colorBorderSecondary}`,
          backgroundColor: token.colorBgContainer,
        }}
      >
        <Flex justify="end">
          <Space>
            <Button
              type="text"
              icon={<CloseOutlined />}
              onClick={() => {
                layoutStore.closeSubSiderAction();
              }}
            ></Button>
          </Space>
        </Flex>
      </header>
      <div
        style={{
          padding: `${token.paddingSM}px`,
        }}
      >
        <ProjectTreeHistory />
      </div>
    </aside>
  );
};
