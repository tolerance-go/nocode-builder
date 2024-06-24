import { AddBtn } from "@/components/AddBtn";
import { NavTabs } from "@/components/NavTabs";
import { SearchBtn } from "@/components/SearchBtn";
import { Space } from "antd";
import { useNavigate } from "react-router-dom";
import AppTreeList from "./AppTreeList";

export const AppAside = () => {
  const nav = useNavigate();
  return (
    <div className="bg-white">
      <NavTabs
        tabBarExtraContent={
          <Space className="px-2">
            <SearchBtn />
            <AddBtn
              onClick={() => {
                nav("/apps/templates");
              }}
            />
          </Space>
        }
        items={[
          {
            label: "我的",
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
