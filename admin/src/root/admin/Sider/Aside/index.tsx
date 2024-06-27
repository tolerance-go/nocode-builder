import { Flex } from "antd";
import { Header } from "./Header";
import { ProjectTree } from "./ProjectTree";

export const Aside = () => {
  return (
    <Flex
      vertical
      style={{
        height: "100%",
        flexGrow: 1,
      }}
    >
      <Header />
      <div
        style={{
          flexGrow: 1,
        }}
      >
        <ProjectTree />
      </div>
    </Flex>
  );
};
