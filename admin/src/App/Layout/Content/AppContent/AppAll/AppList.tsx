import stores from "@/stores";
import { AppData } from "@/types";
import { EditOutlined, EllipsisOutlined } from "@ant-design/icons";
import { Button, List, Space, Typography } from "antd";
import React from "react";
import { useSnapshot } from "valtio";

export const AppList: React.FC = () => {
  const apps = useSnapshot(stores.apps.states.apps);
  return (
    <List
      itemLayout="horizontal"
      dataSource={apps.list as AppData[]}
      renderItem={(item) => (
        <List.Item key={item.id} className="group hover:bg-slate-50">
          <Typography.Text strong className="px-2 flex-1">
            {item.menuTitle}
          </Typography.Text>
          <Typography.Text className="px-2 flex-1">
            13 小时前更新
          </Typography.Text>
          <Typography.Text className="px-2 flex-1">未发布</Typography.Text>
          <Space className="group-hover:opacity-100 opacity-0 transition-opacity px-2">
            <Button icon={<EditOutlined />} type="text">
              编辑
            </Button>
            <Button icon={<EllipsisOutlined />} type="text"></Button>
          </Space>
        </List.Item>
      )}
    />
  );
};
