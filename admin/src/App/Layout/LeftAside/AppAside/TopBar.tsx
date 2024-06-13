import { Flex, Space } from "antd";

export const TopBar = () => {
  return (
    <Flex justify="space-between" className="px-3.5 py-2">
      <span>Apps</span>

      <Space>
        <span>搜索</span>
        <span>添加</span>
      </Space>
    </Flex>
  );
};
