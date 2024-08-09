import { useAppDispatch, useAppSelector } from '@/modules/ui/界面状态仓库模块';
import { JsonForm } from './JsonForm';
import { widgetTreeNodeDataBaseIsWidgetTreeNodeData } from '@/common/utils';
import { 获取模块上下文 } from '@/modules/ui/界面组件树管理模块/hooks';

export const PropsForm = () => {
  const 当前聚焦的部件key = useAppSelector(
    (state) => state.projectContent.当前聚集的部件key,
  );

  const dispatch = useAppDispatch();

  const 当前聚焦的部件的数据 = useAppSelector((state) =>
    state.projectContent.当前聚集的部件key
      ? state.projectContent.widgetTreeNodeDatas[
          state.projectContent.当前聚集的部件key
        ]
      : undefined,
  );

  const { 部件组件管理模块, 界面状态仓库模块 } = 获取模块上下文();

  if (!当前聚焦的部件key) {
    return null;
  }

  if (
    !当前聚焦的部件的数据 ||
    !widgetTreeNodeDataBaseIsWidgetTreeNodeData(当前聚焦的部件的数据)
  ) {
    throw new Error('当前聚焦的部件的数据不是一个有效的部件数据');
  }

  const formConfig = 部件组件管理模块.getWidgetFormConfig(
    当前聚焦的部件的数据.widgetLibName,
    当前聚焦的部件的数据.componentName,
  );

  return (
    <JsonForm
      key={当前聚焦的部件key}
      formData={当前聚焦的部件的数据.props}
      config={formConfig ?? []}
      onValuesChange={(_changedValues, allValues) => {
        dispatch(
          界面状态仓库模块.slices.projectContent.actions.更新组件部件的props({
            部件组件管理模块实例: 部件组件管理模块,
            widgetKey: 当前聚焦的部件key,
            allValues,
          }),
        );
      }}
    />
  );
};
