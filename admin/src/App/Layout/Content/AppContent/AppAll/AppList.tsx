import { PreviewCard } from "@/components/PreviewCard";
import stores from "@/stores";
import { StarFilled, StarOutlined } from "@ant-design/icons";
import { Button, List, Typography } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useSnapshot } from "valtio";

export const AppList = (props: { type: "list" | "card" }) => {
  const apps = useSnapshot(stores.apps.states.apps);
  const nav = useNavigate();
  // 按照是否收藏排序，收藏的项目排在前面
  const sortedApps = [...apps.list].sort((a, b) => {
    const aFavorite = a.ifFavorite ? 1 : 0;
    const bFavorite = b.ifFavorite ? 1 : 0;
    return bFavorite - aFavorite;
  });

  return (
    <List
      itemLayout="horizontal"
      dataSource={sortedApps}
      grid={
        props.type === "card"
          ? {
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 4,
              lg: 4,
              xl: 6,
              xxl: 3,
            }
          : undefined
      }
      header={
        props.type === "list" ? (
          <div className="flex justify-between items-center px-2">
            <Typography.Text
              className="flex-1"
              style={{
                fontSize: 13,
              }}
            >
              应用名称
            </Typography.Text>
            <Typography.Text
              className="flex-1"
              style={{
                fontSize: 13,
              }}
            >
              更新时间
            </Typography.Text>
            <Typography.Text
              className="flex-1"
              style={{
                fontSize: 13,
              }}
            >
              状态
            </Typography.Text>
            <Typography.Text
              style={{
                fontSize: 13,
              }}
            >
              <Button
                type="text"
                className="invisible"
                icon={<StarFilled className="text-yellow-400" />}
              ></Button>
            </Typography.Text>
          </div>
        ) : undefined
      }
      renderItem={(item) =>
        props.type === "list" ? (
          <List.Item
            key={item.id}
            className="group hover:bg-slate-50 hover:cursor-pointer transition-colors duration-200"
            onClick={() => {
              nav(`/apps/${item.id}/data`);
            }}
          >
            <div className="flex h-[100%] items-center justify-between px-2 w-full">
              <Typography.Text strong className="flex-1">
                {item.menuTitle}
              </Typography.Text>
              <Typography.Text className="flex-1">
                13 小时前更新
              </Typography.Text>
              <Typography.Text className="flex-1">未发布</Typography.Text>
              <div
                onClick={(e) => e.stopPropagation()}
                className="flex items-center justify-center"
              >
                {item.ifFavorite ? (
                  <Button
                    type="text"
                    icon={<StarFilled className="text-yellow-400" />}
                    onClick={() => {
                      stores.apps.actions.unfavoriteApp(item.id);
                    }}
                  ></Button>
                ) : (
                  <Button
                    className="group-hover:opacity-100 opacity-0"
                    type="text"
                    icon={<StarOutlined />}
                    onClick={() => {
                      stores.apps.actions.favoriteApp(item.id);
                    }}
                  ></Button>
                )}
              </div>
            </div>
          </List.Item>
        ) : (
          <List.Item key={item.id}>
            <PreviewCard
              template={{
                title: item.menuTitle,
                type: item.terminalType,
                previewImgSrc:
                  "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
              }}
            />
          </List.Item>
        )
      }
    />
  );
};
