import { PlayCircleTwoTone } from "@ant-design/icons";
import { Button, Flex, Space } from "antd";
import { LngSwitcher } from "./LngSwitcher";
import { Navs } from "./Navs";
import { UserAvatar } from "./UserAvatar";

export const Header = () => {
  return (
    <Flex justify="space-between" align="center">
      <Navs />
      <Space>
        <Button
          type="text"
          icon={<PlayCircleTwoTone />}
          onClick={() => window.open("/preview")}
        >
          预览
        </Button>
        <LngSwitcher />
        <UserAvatar />
      </Space>
    </Flex>
  );
};
