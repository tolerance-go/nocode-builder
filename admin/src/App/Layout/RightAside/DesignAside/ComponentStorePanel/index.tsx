import { updateSearchParams } from "@/utils/updateSearchParams";
import { Button, Input, Segmented, Select, Space } from "antd";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { ComponentStore } from "./ComponentStore";
import { NavTabs } from "@/components/NavTabs";
import { SearchOutlined } from "@ant-design/icons";

type SegmentedType = "component" | "section" | "template";
type StoreLib = "pc" | "mobile";

export const ComponentStorePanel = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    segmented: "component",
    storeLib: "pc",
  });

  const [isSearching, setIsSearching] = useState(false); // 新增状态

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
          <div className="flex items-center gap-1.5">
            <Select
              variant='borderless'
              defaultValue={"H5"}
              options={[
                {
                  label: "后台管理系统",
                  value: "后台管理系统",
                },
                {
                  label: "问卷调查页",
                  value: "问卷调查页",
                },
              ]}
              className="max-w-[80px]"
              popupMatchSelectWidth={false}
            ></Select>
            <div className="flex-grow">
              {isSearching ? (
                <Input
                  placeholder="搜索"
                  onBlur={() => setIsSearching(false)} // 当搜索框失去焦点时恢复原状
                  autoFocus
                />
              ) : (
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
              )}
            </div>
            <Button
              type="text"
              icon={<SearchOutlined />}
              onClick={() => setIsSearching(true)} // 点击搜索按钮时显示搜索框
            />
          </div>
        </div>
        <div className="flex-grow">
          {segmented === "component" && <ComponentStore />}
        </div>
      </div>
    </div>
  );
};
