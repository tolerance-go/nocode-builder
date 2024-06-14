import { ComponentWidget } from "@/types";
import { DeepReadonly } from "@/utils/types";
import { Card } from "antd";
import React from "react";
import { DisplayItem } from "./DisplayItem";
const gridStyle: React.CSSProperties = {
  width: "25%",
  textAlign: "center",
  padding: 0,
};
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
        <Card.Grid key={component.id} style={gridStyle}>
          <DisplayItem component={component} index={index} />
        </Card.Grid>
      ))}
    </Card>
  );
};
