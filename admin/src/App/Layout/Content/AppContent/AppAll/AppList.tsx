import { IconHoverableButton } from "@/components/BaseButton";
import stores from "@/stores";
import { AppData } from "@/types";
import {
  EditOutlined,
  EllipsisOutlined,
  StarFilled,
  StarOutlined,
} from "@ant-design/icons";
import { Button, List, Space, Typography } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useSnapshot } from "valtio";

export const AppList: React.FC = () => {
  const apps = useSnapshot(stores.apps.states.apps);
  const nav = useNavigate();
  return (
    <List
      itemLayout="horizontal"
      dataSource={apps.list as AppData[]}
      renderItem={(item) => (
        <List.Item
          key={item.id}
          className="group hover:bg-slate-50 hover:cursor-pointer"
          onClick={() => {
            nav(`/apps/${item.id}/data`);
          }}
        >
          <Typography.Text strong className="px-2 flex-1">
            {item.menuTitle}
          </Typography.Text>
          <Typography.Text className="px-2 flex-1">
            13 小时前更新
          </Typography.Text>
          <Typography.Text className="px-2 flex-1">未发布</Typography.Text>
          <Space className="px-2" onClick={(e) => e.stopPropagation()}>
            <Space className="group-hover:opacity-100 opacity-0 transition-opacity">
              <Button
                
                icon={<EditOutlined />}
                onClick={() => {
                  nav(`/apps/${item.id}/data`);
                }}
              >
                编辑
              </Button>
              <Button icon={<EllipsisOutlined />} type="text"></Button>
            </Space>
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
                className="group-hover:opacity-100 opacity-0 transition-opacity"
                type="text"
                icon={<StarOutlined />}
                onClick={() => {
                  stores.apps.actions.favoriteApp(item.id);
                }}
              ></Button>
            )}
          </Space>
        </List.Item>
      )}
    />
  );
};
