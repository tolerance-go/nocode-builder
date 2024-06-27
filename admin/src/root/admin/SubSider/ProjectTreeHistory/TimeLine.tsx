import { projectTreeStore } from "@/stores";
import { SmileOutlined } from "@ant-design/icons";
import { Timeline as AntdTimeline } from "antd";
import React from "react";
import { useSnapshot } from "valtio";

export const TimeLine: React.FC = () => {
  const projectTreeHistoryState = useSnapshot(
    projectTreeStore.projectTreeHistoryState,
  );

  // 监听依赖
  projectTreeHistoryState.value.data;

  return (
    <AntdTimeline
      reverse
      items={projectTreeHistoryState.history.nodes.map((node, index) => {
        if (projectTreeHistoryState.history.nodes.length - 1 === index) {
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
