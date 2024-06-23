import { appTemplateGroups } from "@/configs/apps";
import { Menu, Typography } from "antd";
import React from "react";
import { CardList } from "./CardList";
import { css, cx } from "@emotion/css";
import { scrollbarCls } from "@/styles/class";

export const AppTemplate: React.FC = () => {
  return (
    <div className="mx-auto p-10 pt-10 w-[1400px] h-[100%]">
      <div className="flex gap-10 h-[100%]">
        <div className="w-[210px] pt-12 flex-shrink-0">
          <Typography.Title level={4} className="ml-4 pb-1">
            推荐模板
          </Typography.Title>
          <Menu
            mode="inline"
            items={appTemplateGroups}
            // className={css`
            //   & {
            //     border-right: none !important;
            //   }
            // `}
          />
        </div>
        <div
          className={cx(
            "flex-grow flex flex-col gap-12 pr-2 overflow-y-auto pb-10 scrollbar hover-scrollbar",
            scrollbarCls
          )}
        >
          <div>
            <Typography.Title level={3} className="pb-4">
              客户关系管理 (CRM)
            </Typography.Title>
            <CardList />
          </div>
          <div>
            <Typography.Title level={3} className="pb-4">
              客户关系管理 (CRM)
            </Typography.Title>
            <CardList />
          </div>
        </div>
      </div>
    </div>
  );
};
