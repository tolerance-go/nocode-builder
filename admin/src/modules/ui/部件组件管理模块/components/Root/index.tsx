import { useStageSize } from '@/common/contexts';
import { SlotStyleContext } from '@/modules/ui/界面组件树管理模块/root/(admin)/Layout/内容区域组件/view-editor/Stage/Slot/Placeholder';
import { SlotPlaceholderPosition } from '@/modules/ui/界面组件树管理模块/root/(admin)/Layout/内容区域组件/view-editor/Stage/Slot/Placeholder/enums';
import { WidgetCompApis, WidgetComponentProps } from '../../types';
import { forwardRef, useImperativeHandle, useRef } from 'react';

export const Root = forwardRef<WidgetCompApis, WidgetComponentProps>(
  (props, ref) => {
    const stageSize = useStageSize();
    const innerRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => {
      return {
        获取舞台预览组件尺寸: () => {
          return stageSize;
        },
      };
    });

    if (props.mode === 'edit') {
      const { slotElements, dataSets } = props;
      return (
        <div ref={innerRef} {...dataSets} data-test-id="root-component">
          <SlotStyleContext.Provider
            value={{
              getSlotPlaceholderStyle({ position, emptyBorderWidth }) {
                if (position === SlotPlaceholderPosition.Empty) {
                  return {
                    width: stageSize.width - emptyBorderWidth * 2,
                    height: stageSize.height - emptyBorderWidth * 2,
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
