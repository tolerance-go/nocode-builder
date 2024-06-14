import { Flex, Space } from "antd";
import { LngSwitcher } from "./LngSwitcher";
import { Navs } from "./Navs";
import { UserAvatar } from "./UserAvatar";

export const Header = () => {
  return (
    <Flex justify="space-between" align="center">
      <Navs />
      <Space>
        <LngSwitcher />
        <UserAvatar />
      </Space>
    </Flex>
  );
};
