import { AddBtn } from "@/components/AddBtn";
import { NavTabs } from "@/components/NavTabs";
import { SearchBtn } from "@/components/SearchBtn";
import { Space } from "antd";
import AppTreeList from "./AppTreeList";
import { updateSearchParams } from "@/utils/updateSearchParams";
import { SEARCH_PARAMS } from "@/constants";
import { useSearchParams } from "react-router-dom";

export const AppAside = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <div className="bg-white">
      <NavTabs
        tabBarExtraContent={
          <Space className="px-2">
            <SearchBtn />
            <AddBtn
              onClick={() => {
                setSearchParams(
                  updateSearchParams(searchParams, {
                    [SEARCH_PARAMS.APP.IS_TEMPLATE]: "true",
                  })
                );
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
