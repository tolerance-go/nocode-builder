import { PreviewCard } from "@/components/PreviewCard";
import store from "@/store";
import { EllipsisOutlined, StarFilled, StarOutlined } from "@ant-design/icons";
import { css, cx } from "@emotion/css";
import { Button, List, Space, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import colors from "tailwindcss/colors";
import { useSnapshot } from "valtio";

export const AppList = (props: { type: "list" | "card" }) => {
  const apps = useSnapshot(store.apps.states.apps);
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
      className={css`
        .ant-list-header {
          border-bottom: 1px solid ${colors.gray[200]};
        }
      `}
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
                fontSize: 12,
              }}
            >
              应用名称
            </Typography.Text>
            <Typography.Text
              className="flex-1"
              style={{
                fontSize: 12,
              }}
            >
              更新时间
            </Typography.Text>
            <Typography.Text
              className="flex-1"
              style={{
                fontSize: 12,
              }}
            >
              状态
            </Typography.Text>
            <Typography.Text
              style={{
                fontSize: 12,
              }}
            >
              <Space>
                <Button
                  type="text"
                  className="invisible"
                  icon={<StarFilled />}
                ></Button>
                <Button
                  type="text"
                  className="invisible"
                  icon={<StarFilled />}
                ></Button>
              </Space>
            </Typography.Text>
          </div>
        ) : undefined
      }
      split={false}
      rowKey={(item) => item.id}
      renderItem={(item, index) =>
        props.type === "list" ? (
          <List.Item
            key={item.id}
            className={cx(
              "duration-200 border-b",
              index === sortedApps.length - 1 ? "border-b-0" : undefined,
              css`
                /* group hover:bg-slate-50 hover:cursor-pointer */
                &:hover {
                  background-color: ${colors.slate[50]};
                  cursor: pointer;

                  .unstar-btn {
                    opacity: 100;
                  }
                }

                .unstar-btn {
                  opacity: 0;
                }
              `
            )}
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
              <Space onClick={(e) => e.stopPropagation()}>
                <Button
                  className="unstar-btn group"
                  type="text"
                  icon={
                    <EllipsisOutlined className="text-gray-400 group-hover:text-gray-900 duration-200" />
                  }
                ></Button>
                {item.ifFavorite ? (
                  <Button
                    type="text"
                    icon={<StarFilled className="text-yellow-400" />}
                    onClick={() => {
                      store.apps.actions.unfavoriteApp(item.id);
                    }}
                  ></Button>
                ) : (
                  <Button
                    className="unstar-btn group"
                    type="text"
                    icon={
                      <StarOutlined className="text-gray-400 group-hover:text-yellow-400 duration-200" />
                    }
                    onClick={() => {
                      store.apps.actions.favoriteApp(item.id);
                    }}
                  ></Button>
                )}
              </Space>
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
