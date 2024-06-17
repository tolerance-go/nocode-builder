import { ensure } from "@/utils/ensure";
import { nodeConfigs } from "../components/configs";

export const findNodeConfig = (id: string) => {
  const item = nodeConfigs.find((item) => item.id === id);
  ensure(!!item, "id 没有找到对应配置。");

  return item;
};
