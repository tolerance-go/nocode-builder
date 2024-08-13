import { ViewKey } from '@/common/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  WidgetTreeNodeDataRecord,
  WidgetTreeDataNode,
  WidgetTreeNodeDataRecordItem,
  WidgetTreeNodeType,
  WidgetSlotTreeDataNode,
  WidgetSlotTreeNodeData,
} from '../../types';
import { generateDerivedMapping } from './utils';
import {
  RootComponentName,
  SystemWidgetLibName,
} from '@/common/constants/components';
import { WidgetDisplayEnum } from '@/_gen/models';
import { widgetTreeNodeDataBaseIsWidgetTreeNodeData } from '@/common/utils';
import { 部件组件管理模块 } from '@/modules/ui/部件组件管理模块';

export type ProjectContentStates = {
  // 派生数据
  derived_widget节点到父节点的映射: Record<ViewKey, ViewKey | null>;
  // 关联数据
  widgetTreeNodeDatas: WidgetTreeNodeDataRecord;
  widgetTree: WidgetTreeDataNode[];
  isDragging: boolean;
  // dragClientOffset: { x: number; y: number } | null;
  stagePreviewCompSize: {
    width: number | string;
    height: number | string;
  } | null;
  当前选中的部件keys: ViewKey[];
  当前聚集的部件key: ViewKey | null;
  当前鼠标hover的部件key: ViewKey | null;
  拖拽stay的插槽节点keys路径: ViewKey[];
  haha: string;
};

export const createProjectContentInitialState = () => {
  const initialState: ProjectContentStates = {
    derived_widget节点到父节点的映射: {},
    widgetTree: [],
    widgetTreeNodeDatas: {},
    isDragging: false,
    stagePreviewCompSize: null,
    当前选中的部件keys: [],
    当前聚集的部件key: null,
    当前鼠标hover的部件key: null,
    拖拽stay的插槽节点keys路径: [],
    haha: '0',
    // dragClientOffset: null,
  };
  return initialState;
};

const initialState: ProjectContentStates = createProjectContentInitialState();

export const RootWidgetKey = 'root';

function findNodeByKey(
  tree: WidgetTreeDataNode[] | WidgetSlotTreeDataNode[],
  key: ViewKey,
): WidgetTreeDataNode | WidgetSlotTreeDataNode | null {
  for (const node of tree) {
    if (node.key === key) {
      return node;
    }
    if (node.children) {
      const found = findNodeByKey(node.children, key);
      if (found) {
        return found;
      }
    }
  }
  return null;
}

export const createProjectContentSlice = () => {
  const projectContentSlice = createSlice({
    name: 'projectContent',
    initialState,
    reducers: {
      updateWidgetTreeData(
        state,
        action: PayloadAction<{
          widgetTree: WidgetTreeDataNode[];
          widgetTreeNodeDatas: WidgetTreeNodeDataRecord;
        }>,
      ) {
        state.widgetTree = action.payload.widgetTree;
        state.widgetTreeNodeDatas = action.payload.widgetTreeNodeDatas;
        state.derived_widget节点到父节点的映射 = generateDerivedMapping(
          action.payload.widgetTree,
        );
      },

      初始化根部件(state) {
        if (state.widgetTree.find((item) => item.key === RootWidgetKey)) return;

        state.widgetTree.push({
          key: RootWidgetKey,
          type: WidgetTreeNodeType.Widget,
          children: [
            {
              key: 'root-children',
              type: WidgetTreeNodeType.Slot,
            },
          ],
        });

        state.widgetTreeNodeDatas[RootWidgetKey] = {
          key: RootWidgetKey,
          type: WidgetTreeNodeType.Widget,
          widgetLibName: SystemWidgetLibName,
          componentName: RootComponentName,
          display: WidgetDisplayEnum.Block,
          title: 'Root',
          props: {},
        };

        state.widgetTreeNodeDatas['root-children'] = {
          key: 'root-children',
          type: WidgetTreeNodeType.Slot,
          name: 'children',
          title: 'children',
        };

        state.derived_widget节点到父节点的映射[RootWidgetKey] = null;
        state.derived_widget节点到父节点的映射['root-children'] = null;
      },

      添加组件到插槽(
        state,
        action: PayloadAction<{
          parentKey: ViewKey;
          slotKey: ViewKey;
          widgetNode: WidgetTreeDataNode;
          widgetData: WidgetTreeNodeDataRecordItem;
          widgetSlotsData: Record<string, WidgetSlotTreeNodeData>;
          index: number;
        }>,
      ) {
        const {
          parentKey,
          slotKey,
          widgetNode,
          widgetData,
          index,
          widgetSlotsData,
        } = action.payload;
        const parent = findNodeByKey(state.widgetTree, parentKey);

        if (parent && parent.type === WidgetTreeNodeType.Widget) {
          const slot = parent.children?.find(
            (child) =>
              child.key === slotKey && child.type === WidgetTreeNodeType.Slot,
          ) as WidgetSlotTreeDataNode | undefined;

          if (slot) {
            slot.children = slot.children ?? [];
            slot.children.splice(index, 0, widgetNode);
            state.widgetTreeNodeDatas[widgetNode.key] = widgetData;

            state.widgetTreeNodeDatas = {
              ...state.widgetTreeNodeDatas,
              ...widgetSlotsData,
            };

            state.derived_widget节点到父节点的映射[widgetNode.key] = parentKey;
          }
        }
      },

      更新拖拽状态(state, action: PayloadAction<boolean>) {
        state.isDragging = action.payload;
      },

      更新舞台预览组件尺寸(
        state,
        action: PayloadAction<{
          width: number | string;
          height: number | string;
        } | null>,
      ) {
        state.stagePreviewCompSize = action.payload;
      },

      // 更新拖动中当前鼠标指针相对于页面左上角的坐标(
      //   state,
      //   action: PayloadAction<{ x: number; y: number } | null>,
      // ) {
      //   state.dragClientOffset = action.payload;
      // },

      更新当前选中的部件keys(state, action: PayloadAction<ViewKey[]>) {
        state.当前选中的部件keys = action.payload;
      },

      更新当前聚焦的部件key(state, action: PayloadAction<ViewKey | null>) {
        state.当前聚集的部件key = action.payload;
      },

      选中某个部件(state, action: PayloadAction<ViewKey>) {
        state.当前聚集的部件key = action.payload;
        state.当前选中的部件keys = [action.payload];
      },

      更新组件部件的props(
        state,
        {
          payload: { widgetKey, allValues, 部件组件管理模块实例 },
        }: PayloadAction<{
          部件组件管理模块实例: 部件组件管理模块;
          widgetKey: ViewKey;
          allValues: Record<string, unknown>;
        }>,
      ) {
        const widgetData = state.widgetTreeNodeDatas[widgetKey];

        if (!widgetTreeNodeDataBaseIsWidgetTreeNodeData(widgetData)) {
          throw new Error('数据非法');
        }

        const schema = 部件组件管理模块实例.getWidgetPropsSchema(
          widgetData.widgetLibName,
          widgetData.componentName,
        );

        const props = 部件组件管理模块实例.validateComponentProps(
          schema,
          allValues,
        );

        widgetData.props = props;
      },

      更新当前鼠标悬停的组件部件key(
        state,
        {
          payload: { widgetKey },
        }: PayloadAction<{
          widgetKey: ViewKey | null;
        }>,
      ) {
        state.当前鼠标hover的部件key = widgetKey;
      },

      向拖拽stay的插槽节点路径添加key(
        state,
        {
          payload: { widgetKey },
        }: PayloadAction<{
          widgetKey: ViewKey;
        }>,
      ) {
        // 检测重复
        if (state.拖拽stay的插槽节点keys路径.includes(widgetKey)) {
          return;
        }

        state.拖拽stay的插槽节点keys路径.push(widgetKey);
      },

      删除拖拽stay的插槽节点路径中的key(
        state,
        {
          payload: { widgetKey },
        }: PayloadAction<{
          widgetKey: ViewKey;
        }>,
      ) {
        const index = state.拖拽stay的插槽节点keys路径.findIndex(
          (item) => item === widgetKey,
        );

        if (index !== -1) {
          state.拖拽stay的插槽节点keys路径.splice(index, 1);
        }
      },
    },
  });
  return projectContentSlice;
};
