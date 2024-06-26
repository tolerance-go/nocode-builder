import { describe, it, expect } from "vitest";
import { BlueMapNodeConfig, MenuGroups } from "@/types";
import { generateTreeData } from ".";

// 测试数据
const mockConfigs: BlueMapNodeConfig[] = [
  {
    component: () => null,
    menu: {
      groupType: ["flow-control"],
      title: "分支",
      key: "branch",
    },
    id: "BranchControlNode",
    shapeName: "branch-control-node",
    type: "flowControl",
    connections: {
      input: {
        ports: [
          {
            id: "entry",
            type: "exec",
          },
          {
            id: "condition",
            type: "condition",
            args: {
              text: "表达式",
            },
          },
        ],
      },
      output: {
        ports: [
          {
            id: "truth",
            type: "exec",
            args: {
              text: "真",
            },
          },
          {
            id: "false",
            type: "exec",
            args: {
              text: "假",
            },
          },
        ],
      },
    },
  },
  {
    component: () => null,
    menu: {
      groupType: ["event"],
      title: "事件",
      key: "event",
    },
    id: "EventNode",
    shapeName: "event-node",
    type: "event",
    connections: {
      input: {
        ports: [],
      },
      output: {
        ports: [
          {
            id: "next",
            type: "exec",
          },
        ],
      },
    },
  },
];

const mockMenuGroups: MenuGroups = [
  {
    type: "flow-control",
    title: "控制流",
  },
  {
    type: "event",
    title: "添加事件",
  },
];

describe("generateTreeData", () => {
  it("应生成正确的树结构", () => {
    const treeData = generateTreeData(mockConfigs, mockMenuGroups);

    expect(treeData).toMatchInlineSnapshot(`
      [
        {
          "children": [
            {
              "configId": "BranchControlNode",
              "isLeaf": true,
              "key": "branch",
              "title": "分支",
            },
          ],
          "key": "group_flow-control",
          "title": "控制流",
        },
        {
          "children": [
            {
              "configId": "EventNode",
              "isLeaf": true,
              "key": "event",
              "title": "事件",
            },
          ],
          "key": "group_event",
          "title": "添加事件",
        },
      ]
    `);
  });

  it("应处理空配置", () => {
    const treeData = generateTreeData([], mockMenuGroups);
    expect(treeData).toMatchInlineSnapshot(`[]`);
  });

  it("应处理空菜单组", () => {
    expect(() =>
      generateTreeData(mockConfigs, [])
    ).toThrowErrorMatchingInlineSnapshot(
      `[Error: Group type flow-control must exist in groups.]`
    );
  });
});
