// import {
//   addNodeAction,
//   removeNodeAction,
//   treeMapStore,
//   treeStore,
//   updateNodeAction,
// } from "@/stores/db/stores";
// import { Button, Flex, Space, Typography } from "antd";
// import { useSnapshot } from "valtio";

// export const Test = () => {
//   const { data } = useSnapshot(treeStore);
//   const { data: treeMapStoreData } = useSnapshot(treeMapStore);
//   return (
//     <>
//       <Flex>
//         <Space>
//           <Button
//             onClick={() => {
//               updateNodeAction(4, "new");
//             }}
//           >
//             更新
//           </Button>
//           <Button
//             onClick={() => {
//               addNodeAction(4, {
//                 name: "new",
//                 id: 100,
//               });
//             }}
//           >
//             插入
//           </Button>
//           <Button
//             onClick={() => {
//               removeNodeAction(4);
//             }}
//           >
//             删除
//           </Button>
//         </Space>
//       </Flex>
//       <Typography.Paragraph>
//         <Flex gap={4}>
//           <pre style={{ width: "50%" }}>{JSON.stringify(data, null, 2)}</pre>
//           <pre style={{ width: "50%" }}>
//             {JSON.stringify(Array.from(treeMapStoreData), null, 2)}
//           </pre>
//         </Flex>
//       </Typography.Paragraph>
//     </>
//   );
// };
