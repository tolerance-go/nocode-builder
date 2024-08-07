import { JSONValue } from '@/common/types';
import { SlotProps } from '../../界面组件树管理模块/root/(admin)/Layout/内容区域组件/view-editor/Stage/Slot';

export type WidgetComponentProps =
  | {
      mode: 'preview';
      defaultProps?: Record<string, JSONValue | undefined>;
    }
  | {
      mode: 'edit';
      slotElements:
        | Record<
            string,
            React.ReactElement<
              SlotProps,
              string | React.JSXElementConstructor<unknown>
            >
          >
        | undefined;

      isDragging: boolean;
      isOverWidget: boolean;
      dataSets?: Record<string, string | number>;
    };
