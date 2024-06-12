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
  /**
   * 区块
   */
  sections: ComponentWidget[];
  /**
   * 模板
   */
  templates: GroupWidget[];
}>({
  components: [],
  sections: [],
  templates: [],
});

export const states = {
  windowDisplayComponents,
};
