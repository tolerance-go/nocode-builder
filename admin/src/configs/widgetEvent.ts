import { WidgetEventGroupItem, WidgetEventItem } from "@/types";
import { validateAndCreateConfigMap } from "@/utils/blueMap/validateAndCreateConfigMap";

// 交互事件类型
const viewWidgetEventGroup: WidgetEventGroupItem = {
  type: "viewWidgetEventGroup",
  menuTitle: "界面交互",
};

export const clickWidgetEvent = {
  groupType: viewWidgetEventGroup.type,
  menuTitle: "点击事件",
  type: "click",
};

export const widgetEvents: WidgetEventItem[] = [clickWidgetEvent];

export const widgetEventGroups: WidgetEventGroupItem[] = [viewWidgetEventGroup];

export const widgetEventsByType = validateAndCreateConfigMap(
  widgetEvents,
  "type"
);
