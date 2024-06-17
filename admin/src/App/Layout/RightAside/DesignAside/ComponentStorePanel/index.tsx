import { updateSearchParams } from "@/utils/updateSearchParams";
import { Button, Input, Segmented, Select, Space } from "antd";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { ComponentStore } from "./ComponentStore";
import { NavTabs } from "@/components/NavTabs";
import { SearchOutlined } from "@ant-design/icons";
import { css } from "@emotion/css";

type SegmentedType = "component" | "section" | "template";
type StoreLib = "pc" | "mobile";
type StoreSubLib = "admin" | "form-page";

export const ComponentStorePanel = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    segmented: "component",
    storeLib: "pc",
    storeSubLib: "admin",
  });

  const [isSearching, setIsSearching] = useState(false); // 新增状态

  const segmented = searchParams.get("segmented") as SegmentedType;
  const storeLib = searchParams.get("storeLib") as StoreLib;
  const storeSubLib = searchParams.get("storeSubLib") as StoreSubLib;

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
        <NavTabs
          tabBarExtraContent={
            <Space className="px-2">
              <Button size="small" type="text">
                新增
              </Button>
            </Space>
          }
          activeKey={storeSubLib}
          className={css`
            .ant-tabs-tab-btn {
              font-size: 13px;
            }
          `}
          items={[
            {
              label: "后台管理系统",
              key: "admin",
            },
            {
              label: "问卷调查页",
              key: "form-page",
            },
          ]}
          onChange={(key) => {
            setSearchParams(
              updateSearchParams(searchParams, {
                storeSubLib: key,
              })
            );
          }}
        />
        <div className="px-2 pb-2 pt-3">
          <div className="flex items-center gap-2">
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
              className="group"
              icon={
                <SearchOutlined className="text-gray-500 group-hover:text-gray-900 transition-colors" />
              }
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
