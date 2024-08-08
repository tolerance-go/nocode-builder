import { useStageSize } from '@/common/contexts';
import { SlotStyleContext } from '@/modules/ui/界面组件树管理模块/root/(admin)/Layout/内容区域组件/view-editor/Stage/Slot/Placeholder';
import { SlotPlaceholderPosition } from '@/modules/ui/界面组件树管理模块/root/(admin)/Layout/内容区域组件/view-editor/Stage/Slot/Placeholder/enums';
import { WidgetComponentProps } from '../../types';
import { forwardRef } from 'react';

export const Root = forwardRef<HTMLDivElement, WidgetComponentProps>(
  (props, ref) => {
    const stageSize = useStageSize();

    if (props.mode === 'edit') {
      const { slotElements, dataSets } = props;
      return (
        <div ref={ref} {...dataSets} data-test-id="root-component">
          <SlotStyleContext.Provider
            value={{
              getSlotPlaceholderStyle({ position }) {
                if (position === SlotPlaceholderPosition.Empty) {
                  return {
                    width: stageSize.width - 2,
                    height: stageSize.height - 2,
                  };
                }
              },
            }}
          >
            {slotElements?.children}
          </SlotStyleContext.Provider>
        </div>
      );
    }

    throw new Error('Root component is only available in edit mode.');
  },
);
