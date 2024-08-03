import {
  WidgetTreeDataNode,
  WidgetTreeNodeDataRecord,
  WidgetTreeNodeType,
} from '@/modules/ui/界面状态仓库模块';

// 模拟的 widgetTree 数据
export const mockWidgetTree: WidgetTreeDataNode[] = [
  {
    key: 'root',
    type: WidgetTreeNodeType.Widget,
    title: 'Root Widget',
    children: [
      {
        key: 'slot-1',
        type: WidgetTreeNodeType.Slot,
        title: 'Slot 1',
        children: [
          {
            key: 'widget-1-1',
            type: WidgetTreeNodeType.Widget,
            title: 'Widget 1-1',
            children: [
              {
                key: 'slot-1-1-1',
                type: WidgetTreeNodeType.Slot,
                title: 'Slot 1-1-1',
                children: [],
              },
            ],
          },
          {
            key: 'widget-1-2',
            type: WidgetTreeNodeType.Widget,
            title: 'Widget 1-2',
            children: [],
          },
        ],
      },
      {
        key: 'slot-2',
        type: WidgetTreeNodeType.Slot,
        title: 'Slot 2',
        children: [
          {
            key: 'widget-2-1',
            type: WidgetTreeNodeType.Widget,
            title: 'Widget 2-1',
            children: [],
          },
        ],
      },
    ],
  },
];

// 模拟的 widgetTreeNodeDatas 数据
export const mockWidgetTreeNodeDatas: WidgetTreeNodeDataRecord = {
  root: {
    key: 'root',
    type: WidgetTreeNodeType.Widget,
    title: 'Root Widget',
  },
  'slot-1': {
    key: 'slot-1',
    type: WidgetTreeNodeType.Slot,
    title: 'Slot 1',
  },
  'widget-1-1': {
    key: 'widget-1-1',
    type: WidgetTreeNodeType.Widget,
    title: 'Widget 1-1',
  },
  'slot-1-1-1': {
    key: 'slot-1-1-1',
    type: WidgetTreeNodeType.Slot,
    title: 'Slot 1-1-1',
  },
  'widget-1-2': {
    key: 'widget-1-2',
    type: WidgetTreeNodeType.Widget,
    title: 'Widget 1-2',
  },
  'slot-2': {
    key: 'slot-2',
    type: WidgetTreeNodeType.Slot,
    title: 'Slot 2',
  },
  'widget-2-1': {
    key: 'widget-2-1',
    type: WidgetTreeNodeType.Widget,
    title: 'Widget 2-1',
  },
};
