import { projectTreeStore } from "@/stores";
import { projectTreeHistoryState } from "@/stores/projectTree";
import { VerticalLeftOutlined } from "@ant-design/icons";
import { Timeline as AntdTimeline, Button, theme } from "antd";
import dayjs from "dayjs";
import React from "react";
import { useSnapshot } from "valtio";

export const TimeLine: React.FC = () => {
  const projectTreeTimelineState = useSnapshot(
    projectTreeStore.projectTreeTimelineState,
  );
  const { token } = theme.useToken();

  return (
    <AntdTimeline
      reverse
      items={projectTreeTimelineState.data.map((node, index) => {
        const color =
          projectTreeTimelineState.index === index ? token.cyan8 : token.blue4;

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
            color,
            dot: <VerticalLeftOutlined rotate={270} />,
          };
        }
        return {
          children: title,
          color,
        };
      })}
    />
  );
};
