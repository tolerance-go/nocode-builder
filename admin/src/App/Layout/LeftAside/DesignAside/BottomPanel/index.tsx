import { Button, Tabs } from "antd";
import TreeList from "./TreeList";
import { css } from "@emotion/css";
import Editor from "./Editor";
import { useSearchParams } from "react-router-dom";

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
    <div className="flex-grow">
      <Tabs
        tabBarExtraContent={
          <Button
            type="text"
            size="small"
            onClick={() => {
              searchParams.set("designAsideType", "store");
              setSearchParams(searchParams);
            }}
          >
            添加
          </Button>
        }
        className={css`
          .ant-tabs-nav {
            margin-bottom: 0;
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
          searchParams.set("treePanel", key);
          setSearchParams(searchParams);
        }}
      />
      {render()}
    </div>
  );
};
