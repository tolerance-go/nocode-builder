import { JsonValue } from '@/common/types';
import { SlotProps } from '../../界面组件树管理模块/root/(admin)/Layout/内容区域组件/view-editor/Stage/Slot';

export type WidgetCompApis = {
  获取舞台预览组件尺寸: () =>
    | {
        width?: number | string;
        height?: number | string;
      }
    | undefined;
};

export interface PreviewModeProps {
  mode: 'preview';
  ref?: React.RefObject<WidgetCompApis>;
  defaultProps?: Record<string, JsonValue | undefined>;
}

export interface StagePreviewModeProps {
  mode: 'stage-preview';
  ref?: React.RefObject<WidgetCompApis>;
  defaultProps?: Record<string, JsonValue | undefined>;
}

export interface EditModeProps {
  mode: 'edit';
  ref?: React.RefObject<WidgetCompApis>;
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
  props?: Record<string, JsonValue | undefined>;
}

export type WidgetComponentProps =
  | PreviewModeProps
  | EditModeProps
  | StagePreviewModeProps;

export * from '../../../../common/types/JsonValue';
export * from './JsonForm';
export * from './props';
