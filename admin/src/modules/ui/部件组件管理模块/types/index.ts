import { SlotProps } from '../../界面组件树管理模块/root/(admin)/Layout/内容区域组件/view-editor/Stage/Slot';

export type WidgetComponentProps = {
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
};
