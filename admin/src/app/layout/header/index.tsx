import { Flex } from "antd";
import { LngSwitcher } from "./LngSwitcher";
import { Navs } from "./Navs";

export const Header = () => {
  return (
    <Flex justify="space-between" align="center">
      <Navs />
      <LngSwitcher />
    </Flex>
  );
};
