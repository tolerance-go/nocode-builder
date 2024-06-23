import { appTemplateGroups } from "@/configs/apps";
import { scrollbarCls } from "@/styles/class";
import { cx } from "@emotion/css";
import { Affix, Menu, Typography } from "antd";
import React, { useRef } from "react";
import { CardList } from "./CardList";

// mx-auto p-10 pt-10
export const AppTemplate: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  return (
    <div className="h-[100%]">
      <div
        className={cx(
          "flex-grow pt-14 pb-20 flex flex-col gap-12 pr-2 overflow-y-auto h-[100%]",
          scrollbarCls
        )}
        ref={containerRef}
      >
        <div className="w-[1400px] mx-auto flex gap-5">
          <div className="w-[210px] pt-16 flex-shrink-0">
            <Affix offsetTop={40} target={() => containerRef.current}>
              <div>
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
            </Affix>
          </div>
          <div className="flex flex-col gap-12">
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
            <div>
              <Typography.Title level={3} className="pb-4">
                客户关系管理 (CRM)
              </Typography.Title>
              <CardList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
