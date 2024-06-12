import { NavItem, SystemPaths } from "@/types";
import { DeepReadonly } from "../types";
import { TabsProps } from "antd";

/**
 * 根据给定的导航数据和系统路径，查找选项卡项。
 *
 * @param data - 导航数据
 * @param path - 当前系统路径
 * @returns 选项卡项的 TabsProps 格式
 */
export function findTabItems(
  data: NavItem[],
  path: DeepReadonly<SystemPaths>
): TabsProps["items"] {
  // 如果路径为空，返回顶层项目
  if (path.length === 1) {
    return data.map((item) => ({
      key: item.key,
      label: item.label,
    }));
  }

  if (path.length === 2) {
    const target = data.find((item) => item.key === path[0].value);
    if (path[1].type === "id") {
      return target?.items?.find((item) => item.key.startsWith(":"))?.items;
    }
  }

  if (path.length === 3) {
    const target = data.find((item) => item.key === path[0].value);
    if (path[1].type === "id") {
      return target?.items?.find((item) => item.key.startsWith(":"))?.items;
    }
  }

  // 将找到的项目映射为 TabsProps 格式
  return data.map((item) => ({
    key: item.key,
    label: item.label,
  }));
}
