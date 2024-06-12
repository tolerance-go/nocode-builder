import React from "react";
import { Card } from "antd";
import { ComponentWidget } from "@/types";
import { DeepReadonly } from "@/utils/types";

const gridStyle: React.CSSProperties = {
  width: "25%",
  textAlign: "center",
};

export const ComponentDisplay: React.FC<{
  components: DeepReadonly<ComponentWidget[]>;
}> = ({ components }) => (
  <Card
    bordered={false}
    style={{
      borderRadius: 0,
    }}
  >
    {components.map((component, index) => (
      <Card.Grid key={index} style={gridStyle}>
        {component.name}
      </Card.Grid>
    ))}
  </Card>
);
