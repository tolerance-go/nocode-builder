import { useAppStore } from "@/store";
import { CloseOutlined } from "@ant-design/icons";
import { Button, Flex, Space, theme } from "antd";
import { ProjectTreeHistory } from "./ProjectTreeHistory";

export const SubSider = () => {
  const { token } = theme.useToken();
  const subSiderVisible = useAppStore.use.subSiderVisible();
  const closeProjectTreeTimeLineAction =
    useAppStore.use.closeProjectTreeTimeLineAction();

  if (!subSiderVisible) {
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
        height: "100vh",
        width: "auto",
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
                  closeProjectTreeTimeLineAction();
                  // projectTreeHistoryState.goTo(
                  //   projectTreeHistoryState.historyNodeCount - 1,
                  // );
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
