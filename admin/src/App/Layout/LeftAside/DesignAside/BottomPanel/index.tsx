import { NavTabs } from "@/components/NavTabs";
import { updateSearchParams } from "@/utils/updateSearchParams";
import { Button, Input, Space } from "antd";
import { useSearchParams } from "react-router-dom";
import Editor from "./Editor";
import TreeList from "./TreeList";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { useState } from "react";

type TreePanel = "tree" | "editor";

export const BottomPanel = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    treePanel: "tree" as TreePanel,
  });
  const [isSearching, setIsSearching] = useState(false); // 新增状态

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
              className="group"
              size="small"
              icon={
                <SearchOutlined className="text-gray-400 group-hover:text-gray-900 transition-colors" />
              }
              onClick={() => setIsSearching(true)} // 点击搜索按钮时显示搜索框
            />
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
            label: "组件树",
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
      {isSearching ? (
        <div className="border-b">
          <Input
            variant="borderless"
            placeholder="搜索"
            onBlur={() => setIsSearching(false)} // 当搜索框失去焦点时恢复原状
            autoFocus
            className={"pl-4 pr-3 py-1.5"}
            allowClear
          />
        </div>
      ) : null}
      {render()}
    </div>
  );
};
