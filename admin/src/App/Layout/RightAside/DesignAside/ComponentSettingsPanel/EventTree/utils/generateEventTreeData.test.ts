import { describe, it, expect } from "vitest";
import { generateEventTreeData } from "./generateEventTreeData";
import { WidgetEventItem, WidgetEventGroupItem } from "@/types";
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

const clickWidgetEvent = {
  groupType: mouseWidgetEventGroup.type,
  menuTitle: "点击事件",
  type: "click",
};

const widgetEvents: WidgetEventItem[] = [clickWidgetEvent];

const widgetEventGroups: WidgetEventGroupItem[] = [
  viewWidgetEventGroup,
  mouseWidgetEventGroup,
];

// const widgetEventsByType = validateAndCreateConfigMap(widgetEvents, "type");
const widgetEventGroupsByType = validateAndCreateConfigMap(
  widgetEventGroups,
  "type"
);

describe("generateEventTreeData", () => {
  it("应正确生成树数据", () => {
    const eventGroups = new Map<string, WidgetEventGroupItem>(
      widgetEventGroupsByType
    );
    const supportEvents = widgetEvents;

    const treeData = generateEventTreeData(supportEvents, eventGroups);

    expect(treeData).toEqual([
      {
        title: "界面交互",
        key: "viewWidgetEventGroup",
        children: [
          {
            title: "鼠标事件",
            key: "mouseWidgetEventGroup",
            children: [
              {
                title: "点击事件",
                key: "click",
                isLeaf: true,
              },
            ],
          },
        ],
      },
    ]);
  });

  it("应处理空的 supportEvents 和 eventGroups", () => {
    const eventGroups = new Map<string, WidgetEventGroupItem>();
    const supportEvents: WidgetEventItem[] = [];

    const treeData = generateEventTreeData(supportEvents, eventGroups);

    expect(treeData).toEqual([]);
  });

  it("应处理没有 parentGroupType 的支持事件", () => {
    const eventGroups = new Map<string, WidgetEventGroupItem>([
      [
        "viewWidgetEventGroup",
        { type: "viewWidgetEventGroup", menuTitle: "界面交互" },
      ],
    ]);

    const supportEvents: WidgetEventItem[] = [
      {
        groupType: "viewWidgetEventGroup",
        menuTitle: "点击事件",
        type: "click",
      },
    ];

    const treeData = generateEventTreeData(supportEvents, eventGroups);

    expect(treeData).toEqual([
      {
        title: "界面交互",
        key: "viewWidgetEventGroup",
        children: [
          {
            title: "点击事件",
            key: "click",
            isLeaf: true,
          },
        ],
      },
    ]);
  });

  it("应处理嵌套的事件组", () => {
    const viewWidgetEventGroup: WidgetEventGroupItem = {
      type: "viewWidgetEventGroup",
      menuTitle: "界面交互",
    };

    const mouseWidgetEventGroup: WidgetEventGroupItem = {
      type: "mouseWidgetEventGroup",
      menuTitle: "鼠标事件",
      parentGroupType: viewWidgetEventGroup.type,
    };

    const keyboardWidgetEventGroup: WidgetEventGroupItem = {
      type: "keyboardWidgetEventGroup",
      menuTitle: "键盘事件",
      parentGroupType: mouseWidgetEventGroup.type,
    };

    const eventGroups = new Map<string, WidgetEventGroupItem>([
      ["viewWidgetEventGroup", viewWidgetEventGroup],
      ["mouseWidgetEventGroup", mouseWidgetEventGroup],
      ["keyboardWidgetEventGroup", keyboardWidgetEventGroup],
    ]);

    const supportEvents: WidgetEventItem[] = [
      {
        groupType: "keyboardWidgetEventGroup",
        menuTitle: "按键事件",
        type: "keyPress",
      },
    ];

    const treeData = generateEventTreeData(supportEvents, eventGroups);

    expect(treeData).toEqual([
      {
        title: "界面交互",
        key: "viewWidgetEventGroup",
        children: [
          {
            title: "鼠标事件",
            key: "mouseWidgetEventGroup",
            children: [
              {
                title: "键盘事件",
                key: "keyboardWidgetEventGroup",
                children: [
                  {
                    title: "按键事件",
                    key: "keyPress",
                    isLeaf: true,
                  },
                ],
              },
            ],
          },
        ],
      },
    ]);
  });
});
