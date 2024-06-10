import { proxy } from "valtio";

/**
 * 当前系统路径
 *
 * eg: apps -> design
 */
export type SystemPaths = string[];

export const currentSystemPaths = proxy<SystemPaths>(["apps"]);

export const changePaths = (index: number, item: string) => {
  currentSystemPaths[index] = item;
};
