// import { VerticalLeftOutlined } from "@ant-design/icons";
import { Timeline as AntdTimeline } from "antd";
// import dayjs from "dayjs";
// import { useSnapshot } from "valtio";

export const TimeLine = () => {
  // const { token } = theme.useToken();

  return (
    <AntdTimeline
      reverse
      // items={[].map((node, index) => {
      //   const color =
      //     projectTreeTimelineState.index === index ? token.cyan8 : token.blue4;

      //   const title = (
      //     <Button
      //       size="small"
      //       type="text"
      //       onClick={() => {
      //         // projectTreeHistoryState.goTo(index);
      //       }}
      //     >
      //       {dayjs(node.createdAt).format("DD/MM/YYYY HH:mm:ss")}
      //     </Button>
      //   );

      //   if (projectTreeTimelineState.data.length - 1 === index) {
      //     return {
      //       children: title,
      //       color,
      //       dot: <VerticalLeftOutlined rotate={270} />,
      //     };
      //   }
      //   return {
      //     children: title,
      //     color,
      //   };
      // })}
    />
  );
};
