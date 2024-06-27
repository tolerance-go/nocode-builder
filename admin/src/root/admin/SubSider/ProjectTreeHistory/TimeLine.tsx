import { projectTreeStore } from "@/stores";
import { SmileOutlined } from "@ant-design/icons";
import { Timeline as AntdTimeline } from "antd";
import React from "react";
import { useSnapshot } from "valtio";

export const TimeLine: React.FC = () => {
  const projectTreeTimelineState = useSnapshot(
    projectTreeStore.projectTreeTimelineState,
  );

  return (
    <AntdTimeline
      reverse
      items={projectTreeTimelineState.data.map((node, index) => {
        if (projectTreeTimelineState.data.length - 1 === index) {
          return {
            children: node.createdAt.toISOString(),
            color: "#00CCFF",
            dot: <SmileOutlined />,
          };
        }
        return {
          children: node.createdAt.toISOString(),
        };
      })}
    />
  );
};
