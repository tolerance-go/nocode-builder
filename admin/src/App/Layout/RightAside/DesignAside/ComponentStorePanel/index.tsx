import { NavTabs } from "@/components/NavTabs";
import { updateSearchParams } from "@/utils/updateSearchParams";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Segmented, Space } from "antd";
import { useSearchParams } from "react-router-dom";
import { ComponentStore } from "./ComponentStore";

type SegmentedType = "component" | "section" | "template";
type StoreLib = "pc" | "mobile";

export const ComponentStorePanel = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    segmented: "component",
    storeLib: "pc",
  });

  const segmented = searchParams.get("segmented") as SegmentedType;
  const storeLib = searchParams.get("storeLib") as StoreLib;
  return (
    <div className="animate-slideInRight absolute inset-0 z-50 bg-white">
      <div className="flex flex-col h-[100%]">
        <NavTabs
          tabBarExtraContent={
            <Space className="px-2">
              <Button
                size="small"
                type="text"
                onClick={() => {
                  setSearchParams(
                    updateSearchParams(searchParams, {
                      designAsideStore: "false",
                    })
                  );
                }}
              >
                关闭
              </Button>
            </Space>
          }
          activeKey={storeLib}
          items={[
            {
              label: "桌面端",
              key: "pc",
            },
            {
              label: "移动端",
              key: "mobile",
            },
          ]}
          onChange={(key) => {
            setSearchParams(
              updateSearchParams(searchParams, {
                storeLib: key,
              })
            );
          }}
        />
        <div className="px-1.5 py-3">
          <div className="flex items-center gap-2">
            <Segmented<SegmentedType>
              options={[
                {
                  label: "组件",
                  value: "component",
                },
                {
                  label: "区块",
                  value: "section",
                },
                {
                  label: "模板",
                  value: "template",
                },
              ]}
              className="flex-grow"
              block
              value={segmented}
              onChange={(val) => {
                setSearchParams(
                  updateSearchParams(searchParams, {
                    segmented: val,
                  })
                );
              }}
            />
            <Button type="text" icon={<SearchOutlined />}></Button>
          </div>
        </div>
        <div className="flex-grow">
          {segmented === "component" && <ComponentStore />}
        </div>
      </div>
    </div>
  );
};
