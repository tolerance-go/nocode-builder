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
      id: "component-test-Custom",
      type: "component",
      groupType: "test",
      elementType: "Custom",
      name: "Custom",
      tags: [],
      defaultStaticProps: {},
      settingsForm: [
        { type: "text", label: "Name", name: "name", defaultValue: "John Doe" },
        {
          type: "select",
          label: "Gender",
          name: "gender",
          defaultValue: "male",
          options: ["male", "female"],
        },
        {
          type: "checkbox",
          label: "Agree to Terms",
          name: "agree",
          defaultValue: true,
        },
        {
          type: "date",
          label: "Date of Birth",
          name: "dob",
        },
        { type: "number", label: "Age", name: "age", defaultValue: 30 },
        {
          type: "switch",
          label: "Subscribe",
          name: "subscribe",
          defaultValue: false,
        },
      ],
    },
    {
      id: "component-general-Button",
      type: "component",
      groupType: "general",
      elementType: "Button",
      name: "Button",
      tags: [],
      defaultStaticProps: {},
      settingsForm: [
        { type: "text", label: "文字", name: "text", defaultValue: "按钮" },
        {
          type: "select",
          label: "类型",
          name: "type",
          defaultValue: "default",
          options: ["primary", "dashed", "link", "text", "default"],
        },
      ],
    },
    {
      id: "component-dataDisplay-Table",
      type: "component",
      groupType: "dataDisplay",
      elementType: "Table",
      name: "Table",
      tags: [],
    },
    {
      id: "component-layout-Flex",
      type: "component",
      groupType: "layout",
      elementType: "Flex",
      name: "Flex",
      tags: [],
      defaultStaticProps: {
        style: {
          padding: 10,
        },
      },
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

export const states = proxy({
  windowDisplayComponents,
});

export const actions = {
  /** 根据 id 找到 widget */
  findWidgetById: (id: string): ComponentWidget | GroupWidget | null => {
    // 从 components 中查找
    for (const component of windowDisplayComponents.components) {
      if (component.id === id) {
        return component;
      }
    }

    // 从 sections 中查找
    for (const section of windowDisplayComponents.sections) {
      if (section.id === id) {
        return section;
      }
    }

    // 从 templates 中查找
    for (const template of windowDisplayComponents.templates) {
      if (template.id === id) {
        return template;
      }
    }

    return null;
  },
};
