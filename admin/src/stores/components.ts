import { ComponentWidget, GroupWidget } from "@/types";
import { proxy } from "valtio";

/**
 * 橱窗展示组件
 */
const windowDisplayComponents = proxy<{
  /**
   * 组件
   */
  components: ComponentWidget[];
  groupComponents: {
    name: string;
    components: ComponentWidget[];
  }[];
  /**
   * 区块
   */
  sections: ComponentWidget[];
  /**
   * 模板
   */
  templates: GroupWidget[];
}>({
  components: [
    {
      type: "component",
      groupType: "general",
      elementType: "Button",
      name: "button",
      tags: [],
    },
    {
      type: "component",
      groupType: "dataDisplay",
      elementType: "Table",
      name: "table",
      tags: [],
    },
  ],
  sections: [],
  templates: [],
  get groupComponents() {
    const groups: { [key: string]: ComponentWidget[] } = {};

    this.components.forEach((component) => {
      if (!groups[component.groupType]) {
        groups[component.groupType] = [];
      }
      groups[component.groupType].push(component);
    });

    return Object.keys(groups).map((groupName) => ({
      name: groupName,
      components: groups[groupName],
    }));
  },
});

export const states = {
  windowDisplayComponents,
};
