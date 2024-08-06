import { useStageSize } from '@/common/contexts';
import { SlotStyleContext } from '@/modules/ui/界面组件树管理模块/root/(admin)/Layout/内容区域组件/view-editor/Stage/Slot/Placeholder';
import { SlotPlaceholderPosition } from '@/modules/ui/界面组件树管理模块/root/(admin)/Layout/内容区域组件/view-editor/Stage/Slot/Placeholder/enums';
import { WidgetComponentProps } from '../../types';

export const Root = (props: WidgetComponentProps) => {
  const stageSize = useStageSize();

  if (props.mode === 'edit') {
    const { slotElements } = props;
    return (
      <div data-test-id="root-component">
        <SlotStyleContext.Provider
          value={{
            getSlotItemStyle({ position }) {
              if (position === SlotPlaceholderPosition.Empty) {
                return {
                  width: stageSize.width - 2,
                  height: stageSize.height - 2,
                };
              }
              return {
                width: '100%',
                height: 10,
              };
            },
          }}
        >
          {slotElements?.children}
        </SlotStyleContext.Provider>
      </div>
    );
  }

  throw new Error('Root component is only available in edit mode.');
};
