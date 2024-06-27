import { Button, Flex, Space, theme } from "antd";
import { ProjectTreeHistory } from "./ProjectTreeHistory";
import { useSnapshot } from "valtio";
import { layoutStore } from "@/stores";
import { CloseOutlined } from "@ant-design/icons";
import { projectTreeHistoryState } from "@/stores/projectTree";

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
      <Flex
        style={{
          height: "100%",
        }}
        vertical
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
                  layoutStore.closeProjectTreeTimeLineAction();
                  projectTreeHistoryState.goTo(
                    projectTreeHistoryState.historyNodeCount - 1,
                  );
                }}
              ></Button>
            </Space>
          </Flex>
        </header>
        <div
          style={{
            padding: `${token.paddingSM}px`,
            overflow: "auto",
            flexGrow: 1,
            scrollbarWidth: "thin",
            scrollbarColor: "auto",
          }}
        >
          <ProjectTreeHistory />
        </div>
      </Flex>
    </aside>
  );
};
