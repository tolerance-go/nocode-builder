import { theme } from 'antd';
import { PropsForm } from './PropsForm';

export const WidgetPropsPanel = () => {
  const { token } = theme.useToken();
  // const 当前聚集的部件key = useAppSelector(
  //   (state) => state.projectContent.当前聚集的部件key,
  // );
  // const 当前选中的部件keys = useAppSelector(
  //   (state) => state.projectContent.当前选中的部件keys,
  // );

  return (
    <div
      style={{
        padding: `${token.paddingXXS}px ${token.paddingXS}px`,
      }}
    >
      {/* WidgetPropsPanel
      {JSON.stringify(
        {
          当前聚集的部件key,
          当前选中的部件keys,
        },
        null,
        2,
      )} */}
      <PropsForm />
    </div>
  );
};
