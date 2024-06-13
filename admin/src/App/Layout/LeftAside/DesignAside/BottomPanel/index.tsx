import { Tabs } from "antd";
import TreeList from "./TreeList";
import { css } from "@emotion/css";
import { useQueryParams } from "@/hooks/useQueryParams";
import Editor from "./Editor";

type TreePanel = "tree" | "editor";

export const BottomPanel = () => {
  const [{ treePanel }, updateQueryParams] = useQueryParams({
    treePanel: "tree" as TreePanel,
  });

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
          updateQueryParams({
            treePanel: key as TreePanel,
          });
        }}
      />
      {render()}
    </div>
  );
};
