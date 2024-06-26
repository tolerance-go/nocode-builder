import { WidgetEventGroupItem, WidgetEventItem } from "@/types/common";
import { validateAndCreateConfigMap } from "@/utils/blueMap/validateAndCreateConfigMap";

// 交互事件类型
const viewWidgetEventGroup: WidgetEventGroupItem = {
  type: "viewWidgetEventGroup",
  menuTitle: "界面交互",
};

// 鼠标事件
const mouseWidgetEventGroup: WidgetEventGroupItem = {
  type: "mouseWidgetEventGroup",
  menuTitle: "鼠标事件",
  parentGroupType: viewWidgetEventGroup.type,
};

export const clickWidgetEvent = {
  groupType: mouseWidgetEventGroup.type,
  menuTitle: "点击事件",
  type: "click",
};

export const widgetEvents: WidgetEventItem[] = [clickWidgetEvent];

export const widgetEventGroups: WidgetEventGroupItem[] = [
  mouseWidgetEventGroup,
  viewWidgetEventGroup,
];

export const widgetEventsByType = validateAndCreateConfigMap(
  widgetEvents,
  "type"
);
export const widgetEventGroupsByType = validateAndCreateConfigMap(
  widgetEventGroups,
  "type"
);
