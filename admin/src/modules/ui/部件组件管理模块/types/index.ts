import { SlotElementProps } from '../../界面组件树管理模块/root/(admin)/Layout/内容区域组件/view-editor/Stage/SlotElement';

export type WidgetComponentProps = {
  slotElements:
    | Record<
        string,
        React.ReactElement<
          SlotElementProps,
          string | React.JSXElementConstructor<unknown>
        >[]
      >
    | undefined;

  isDragging: boolean;
  isOverWidget: boolean;
};
