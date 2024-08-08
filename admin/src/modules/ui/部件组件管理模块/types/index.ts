import { JSONValue } from '@/common/types';
import { SlotProps } from '../../界面组件树管理模块/root/(admin)/Layout/内容区域组件/view-editor/Stage/Slot';

export interface PreviewModeProps {
  mode: 'preview';
  ref?: React.RefObject<HTMLElement>;
  defaultProps?: Record<string, JSONValue | undefined>;
}

export interface EditModeProps {
  mode: 'edit';
  ref?: React.RefObject<HTMLElement>;
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
}

export type WidgetComponentProps = PreviewModeProps | EditModeProps;
