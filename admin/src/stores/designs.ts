import { proxy } from "valtio";

type StaticPropsValue = string | number | boolean | null | undefined;

type StaticProps = {
  [key: string]: StaticPropsValue | StaticProps;
};

export type NodePlainChild = string | number | boolean | null | undefined;

export type NodeData = {
  id: string;
  elementType: string;
  children?: NodeData[] | NodePlainChild;
  staticProps: StaticProps;
};

const designTreeData = proxy<{
  nodeData: NodeData[];
}>({
  nodeData: [],
});

/** 当前悬停的组件 id 集合 */
const hoveredComponents = proxy<{
  ids: string[];
}>({
  ids: [],
});

/**
 * 当前是否在拖拽组件中
 */
const isDragging = proxy<{
  dragging: boolean;
}>({
  dragging: false,
});

export const states = {
  designTreeData,
  hoveredComponents,
  isDragging,
};

export const actions = {
  replaceNodeData: (data: NodeData[]) => {
    designTreeData.nodeData = data;
  },
  /** 切换悬停组件高亮 */
  switchHoveredComponent: (id: string, hovered: boolean) => {
    if (hovered) {
      if (!hoveredComponents.ids.includes(id)) {
        hoveredComponents.ids.push(id);
      }
    } else {
      hoveredComponents.ids = hoveredComponents.ids.filter(
        (componentId) => componentId !== id
      );
    }
  },
  /** 修改拖拽状态 */
  changeDragging: (value: boolean) => {
    isDragging.dragging = value;
  },
};
