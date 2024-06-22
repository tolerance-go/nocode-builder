import { MenuGroups } from "../../../../../types/blueMap";
import { validateAndCreateConfigMap } from "../utils/validateAndCreateConfigMap";

export const menuGroups: MenuGroups = [
  {
    type: "flow-control",
    title: "控制流",
  },
];

export const menuGroupsByType = validateAndCreateConfigMap(menuGroups, "type");
