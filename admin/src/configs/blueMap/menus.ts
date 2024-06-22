import { validateAndCreateConfigMap } from "@/utils/blueMap/validateAndCreateConfigMap";
import { MenuGroups } from "../../types/blueMap";

export const menuGroups: MenuGroups = [
  {
    type: "flow-control",
    title: "控制流",
  },
  {
    type: 'event',
    title: "添加事件",
  },
];

export const menuGroupsByType = validateAndCreateConfigMap(menuGroups, "type");
