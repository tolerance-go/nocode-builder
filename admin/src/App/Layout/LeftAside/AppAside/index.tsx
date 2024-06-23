import { AddBtn } from "@/components/AddBtn";
import { NavTabs } from "@/components/NavTabs";
import { SearchBtn } from "@/components/SearchBtn";
import { Space } from "antd";
import AppTreeList from "./AppTreeList";

export const AppAside = () => {
  return (
    <div className="bg-white">
      <NavTabs
        tabBarExtraContent={
          <Space className="px-2">
            <SearchBtn />
            <AddBtn></AddBtn>
          </Space>
        }
        items={[
          {
            label: "组件树",
            key: "tree",
          },
          // {
          //   label: "编辑器",
          //   key: "editor",
          // },
        ]}
      />
      <div className="py-2">
        <AppTreeList />
      </div>
    </div>
  );
};
