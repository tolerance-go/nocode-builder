import {
  WidgetTreeDataNode,
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
          },
          {
            key: 'widget-1-2',
            type: WidgetTreeNodeType.Widget,
            title: 'Widget 1-2',
          },
        ],
      },
    ],
  },
];
