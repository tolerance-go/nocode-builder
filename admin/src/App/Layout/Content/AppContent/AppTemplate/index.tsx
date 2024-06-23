import { templateUseCases } from "@/configs/apps";
import { scrollbarCls } from "@/styles/class";
import { updateSearchParams } from "@/utils/updateSearchParams";
import { cx } from "@emotion/css";
import {
  Affix,
  Breadcrumb,
  Button,
  Menu,
  MenuProps,
  Space,
  Typography,
} from "antd";
import React, { useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { CardList } from "./CardList";

type MenuItem = Required<MenuProps>["items"][number];

// 从 TemplateUseCase 数组中生成 MenuItem 数组
const appTemplateGroups: MenuItem[] = templateUseCases.map((useCase) => ({
  key: useCase.type,
  label: useCase.title,
}));

export const AppTemplate: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [searchParams, setSearchParams] = useSearchParams({});

  const selectedUseCaseType =
    searchParams.get("selectedUseCaseType") ||
    (appTemplateGroups[0]?.key as string | undefined);

  // 处理菜单项选择事件
  const handleMenuSelect = ({ key }: { key: string }) => {
    setSearchParams(
      updateSearchParams(searchParams, {
        selectedUseCaseType: key,
      })
    );
  };

  return (
    <div className="h-[100%]">
      <div
        className={cx(
          "flex-grow pt-8 pb-20 flex flex-col gap-12 pr-2 overflow-y-auto h-[100%]",
          scrollbarCls
        )}
        ref={containerRef}
      >
        <div className="w-[1500px] mx-auto px-10">
          <div className="pl-1 mb-5">
            <div className="mb-5">
              <Breadcrumb
                items={[
                  {
                    title: "应用",
                  },
                  {
                    title: "模板创建",
                  },
                ]}
              />
            </div>
            <div className="flex justify-between">
              <Typography.Title level={3}>创建新应用程序</Typography.Title>
              <Space>
                <Button size="large" shape="round">
                  导入程序
                </Button>
                <Button size="large" shape="round" type="primary">
                  空白模板
                </Button>
              </Space>
            </div>
          </div>
          <div className="flex gap-10">
            <div className="w-[210px] flex-shrink-0">
              <Affix offsetTop={20} target={() => containerRef.current}>
                <div>
                  <Menu
                    mode="inline"
                    selectedKeys={
                      selectedUseCaseType ? [selectedUseCaseType] : undefined
                    }
                    items={appTemplateGroups}
                    onSelect={handleMenuSelect}
                    // className={css`
                    //   & {
                    //     border-right: none !important;
                    //   }
                    // `}
                  />
                </div>
              </Affix>
            </div>
            <div>
              <div className="flex flex-col gap-12">
                <div>
                  <Typography.Title level={4} className="pb-4">
                    桌面端
                  </Typography.Title>
                  <CardList />
                </div>
                <div>
                  <Typography.Title level={4} className="pb-4">
                    移动端
                  </Typography.Title>
                  <CardList />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
