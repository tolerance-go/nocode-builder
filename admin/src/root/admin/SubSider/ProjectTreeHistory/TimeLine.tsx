import { projectTreeStore } from "@/stores";
import { projectTreeHistoryState } from "@/stores/projectTreeStore";
import { FieldTimeOutlined } from "@ant-design/icons";
import { Timeline as AntdTimeline, Button } from "antd";
import dayjs from "dayjs";
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
        const title = (
          <Button
            size="small"
            type="text"
            onClick={() => {
              projectTreeHistoryState.goTo(index);
            }}
          >
            {dayjs(node.createdAt).format("DD/MM/YYYY HH:mm:ss")}
          </Button>
        );

        if (projectTreeTimelineState.data.length - 1 === index) {
          return {
            children: title,
            color: "#00CCFF",
          };
        }
        return {
          children: title,
        };
      })}
    />
  );
};
