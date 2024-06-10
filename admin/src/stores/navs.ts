import { proxy } from "valtio";

/**
 * 当前系统路径
 *
 * eg: apps -> design
 */
export type SystemPaths = { id: string }[];

export const currentSystemPaths = proxy<SystemPaths>([]);
