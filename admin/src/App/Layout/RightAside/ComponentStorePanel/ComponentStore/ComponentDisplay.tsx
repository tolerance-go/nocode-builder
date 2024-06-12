import { ComponentWidget } from "@/types";
import { DeepReadonly } from "@/utils/types";
import { Card } from "antd";
import React from "react";
import { DisplayItem } from "./DisplayItem";

export const ComponentDisplay: React.FC<{
  components: DeepReadonly<ComponentWidget[]>;
}> = ({ components }) => {
  return (
    <Card
      bordered={false}
      style={{
        borderRadius: 0,
      }}
    >
      {components.map((component, index) => (
        <DisplayItem component={component} index={index} />
      ))}
    </Card>
  );
};
