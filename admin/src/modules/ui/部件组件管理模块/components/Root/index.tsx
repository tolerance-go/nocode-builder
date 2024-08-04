import { cloneElement } from 'react';
import { WidgetComponentProps } from '../../types';
import { useStageHeight } from '@/common/contexts';

export const Root = ({
  slotElements,
  isOverWidget,
  isDragging,
}: WidgetComponentProps) => {
  const stageHeight = useStageHeight();
  console.log('slotElements', slotElements, stageHeight);
  return (
    <div data-test-id="root-component">
      {isDragging &&
        slotElements?.children?.map((child) => {
          return cloneElement(child, {
            style: {
              ...child.props?.style,
              height: stageHeight - 2,
            },
          });
        })}
    </div>
  );
};
