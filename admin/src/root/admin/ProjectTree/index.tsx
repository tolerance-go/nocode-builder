import { LoadingOutlined } from "@ant-design/icons";
import { Flex, Spin } from "antd";
import { Suspense } from "react";
import { TreeMenu } from "./TreeMenu";

export const ProjectTree = () => {
  return (
    <Suspense
      fallback={
        <Flex
          style={{
            height: "100%",
          }}
          justify="center"
          align="center"
        >
          <Spin indicator={<LoadingOutlined spin />} />
        </Flex>
      }
    >
      <TreeMenu />
    </Suspense>
  );
};
