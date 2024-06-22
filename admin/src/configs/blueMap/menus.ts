import { validateAndCreateConfigMap } from "@/utils/blueMap/validateAndCreateConfigMap";
import { MenuGroups } from "../../types/blueMap";

export const menuGroups: MenuGroups = [
  {
    type: "flow-control",
    title: "控制流",
  },
];

export const menuGroupsByType = validateAndCreateConfigMap(menuGroups, "type");
