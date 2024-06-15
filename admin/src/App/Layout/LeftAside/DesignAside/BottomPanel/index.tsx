import { Button, Space, Tabs } from "antd";
import TreeList from "./TreeList";
import { css } from "@emotion/css";
import Editor from "./Editor";
import { useSearchParams } from "react-router-dom";
import { updateSearchParams } from "@/utils/updateSearchParams";

type TreePanel = "tree" | "editor";

export const BottomPanel = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    treePanel: "tree" as TreePanel,
  });

  const treePanel = searchParams.get("treePanel") as TreePanel;

  const render = () => {
    if (treePanel === "tree") {
      return <TreeList />;
    }
    if (treePanel === "editor") {
      return <Editor />;
    }
  };

  return (
    <div className="flex-grow bg-white">
      <Tabs
        tabBarExtraContent={
          <Space className="px-2">
            <Button
              type="text"
              size="small"
              onClick={() => {
                setSearchParams(
                  updateSearchParams(searchParams, {
                    designAsideType: "store",
                  })
                );
              }}
            >
              添加
            </Button>
          </Space>
        }
        className={css`
          .ant-tabs-nav {
            margin-bottom: 0;
            height: 34px;
          }
          .ant-tabs-nav .ant-tabs-tab {
            border-top: 0;
            border-left: 0;
          }
        `}
        activeKey={treePanel}
        type="card"
        size={"small"}
        items={[
          {
            label: "节点树",
            key: "tree",
          },
          {
            label: "编辑器",
            key: "editor",
          },
        ]}
        onChange={(key) => {
          setSearchParams(
            updateSearchParams(searchParams, {
              treePanel: key,
            })
          );
        }}
      />
      {render()}
    </div>
  );
};
