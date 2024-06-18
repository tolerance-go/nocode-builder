import { NavTabs } from "@/components/NavTabs";
import { updateSearchParams } from "@/utils/updateSearchParams";
import { Button, Space } from "antd";
import { useSearchParams } from "react-router-dom";
import Editor from "./Editor";
import TreeList from "./TreeList";
import { PlusOutlined } from "@ant-design/icons";

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
      <NavTabs
        tabBarExtraContent={
          <Space className="px-2">
            <Button
              type="text"
              size="small"
              className="group"
              icon={
                <PlusOutlined className="text-gray-400 group-hover:text-gray-900 transition-colors" />
              }
              onClick={() => {
                setSearchParams(
                  updateSearchParams(searchParams, {
                    designAsideStore: "true",
                  })
                );
              }}
            ></Button>
          </Space>
        }
        activeKey={treePanel}
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
