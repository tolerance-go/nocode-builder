import {
  templateUseCases,
  templateUseCasesById,
  templates,
} from "@/configs/apps";
import { scrollbarCls } from "@/styles/class";
import { updateSearchParams } from "@/utils/updateSearchParams";
import { css, cx } from "@emotion/css";
import {
  Affix,
  Breadcrumb,
  Button,
  Empty,
  Menu,
  MenuProps,
  Space,
  Typography,
} from "antd";
import React, { useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { CardList } from "./CardList";
import { ensure } from "@/utils/ensure";
import CreateAppModal, { CreateAppModalRef } from "./CreateAppModal";

type MenuItem = Required<MenuProps>["items"][number];

// 从 TemplateUseCase 数组中生成 MenuItem 数组
const appTemplateGroups: MenuItem[] = templateUseCases.map((useCase) => ({
  key: useCase.type,
  label: useCase.title,
}));

export const AppTemplate: React.FC = () => {
  const createAppModalRef = useRef<CreateAppModalRef>(null);
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

  const tpls = templates.filter((tpl) => {
    const templateUseCase = templateUseCasesById.get(tpl.useCasId);
    ensure(templateUseCase, "templateUseCase 必须存在。");

    return templateUseCase.type == selectedUseCaseType;
  });

  const desktopTpls = tpls.filter((tpl) => tpl.type === "desktop");
  const mobileTpls = tpls.filter((tpl) => tpl.type === "mobile");

  return (
    <>
      <div className="h-[100%]">
        <div
          className={cx(
            "flex-grow pt-8 pb-20 flex flex-col gap-12 pr-2 overflow-y-auto h-[100%]",
            scrollbarCls
          )}
          ref={containerRef}
        >
          <div className="w-[1500px] mx-auto px-10">
            <div className="mb-5">
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
                  <Button >导入程序</Button>
                  <Button
                    
                    type="primary"
                    onClick={() => {
                      createAppModalRef.current?.showModal();
                    }}
                  >
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
                      className={css`
                        border-right: none !important;

                        .ant-menu-item {
                          margin-inline: 0;
                        }
                      `}
                    />
                  </div>
                </Affix>
              </div>
              {tpls.length ? (
                <div className="flex flex-col gap-12">
                  {desktopTpls.length ? (
                    <div>
                      <Typography.Title level={4} className="pb-4">
                        桌面端
                      </Typography.Title>
                      <CardList templates={desktopTpls} />
                    </div>
                  ) : null}
                  {mobileTpls.length ? (
                    <div>
                      <Typography.Title level={4} className="pb-4">
                        移动端
                      </Typography.Title>
                      <CardList templates={mobileTpls} />
                    </div>
                  ) : null}
                </div>
              ) : (
                <div className="flex-grow flex justify-center items-center">
                  <Empty description="暂无匹配"></Empty>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <CreateAppModal ref={createAppModalRef} />
    </>
  );
};
