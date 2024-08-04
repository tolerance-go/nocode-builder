import { cloneElement } from 'react';
import { WidgetComponentProps } from '../../types';
import { theme } from 'antd';

export const Root = ({
  slotElements,
  isOverWidget,
  isDragging,
  getStageHeight,
}: WidgetComponentProps) => {
  const { token } = theme.useToken();
  console.log('slotElements', slotElements, getStageHeight());
  return (
    <div data-test-id="root-component">
      {isDragging &&
        slotElements?.children?.map((child) => {
          return cloneElement(child, {
            style: {
              ...child.props?.style,
              height: getStageHeight(),
              background: token.blue2,
              border: `1px solid ${token.blue6}`,
            },
          });
        })}
    </div>
  );
};
