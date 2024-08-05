import { WidgetComponentProps } from '../../types';

export const Root = ({ slotElements }: WidgetComponentProps) => {
  return <div data-test-id="root-component">{slotElements?.children}</div>;
};
