import React from "react";
import { Card } from "antd";

const gridStyle: React.CSSProperties = {
  width: "25%",
  textAlign: "center",
};

export const ComponentDisplay: React.FC = () => (
  <Card
    bordered={false}
    style={{
      borderRadius: 0,
    }}
  >
    <Card.Grid style={gridStyle}>Content</Card.Grid>
    <Card.Grid style={gridStyle}>Content</Card.Grid>
    <Card.Grid style={gridStyle}>Content</Card.Grid>
    <Card.Grid style={gridStyle}>Content</Card.Grid>
    <Card.Grid style={gridStyle}>Content</Card.Grid>
    <Card.Grid style={gridStyle}>Content</Card.Grid>
    <Card.Grid style={gridStyle}>Content</Card.Grid>
  </Card>
);
