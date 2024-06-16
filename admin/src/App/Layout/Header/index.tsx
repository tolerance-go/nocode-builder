import { getSearchParams } from "@/utils/getSearchParams";
import { PlayCircleTwoTone } from "@ant-design/icons";
import { Button, Flex, Space } from "antd";
import { LngSwitcher } from "./LngSwitcher";
import { Navs } from "./Navs";
import { UserAvatar } from "./UserAvatar";
import { useMatch } from "react-router-dom";

export const Header = () => {
  const match = useMatch("/apps/:id/design");
  return (
    <Flex justify="space-between" align="center" className="h-[100%]">
      <Navs />
      <Space>
        {match && (
          <Button
            type="text"
            icon={<PlayCircleTwoTone />}
            onClick={() =>
              window.open(`/preview${getSearchParams().get("pathname")}`)
            }
          >
            预览
          </Button>
        )}
        <LngSwitcher />
        <UserAvatar />
      </Space>
    </Flex>
  );
};
