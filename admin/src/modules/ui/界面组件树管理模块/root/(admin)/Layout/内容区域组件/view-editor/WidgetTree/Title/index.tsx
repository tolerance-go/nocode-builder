import { ViewKey } from '@/common/types';
import { useAppSelector } from '@/modules/ui/界面状态仓库模块';

export const Title = ({ nodeKey }: { nodeKey: ViewKey }) => {
  const nodeData = useAppSelector(
    (state) => state.projectContent.widgetTreeNodeDatas[nodeKey],
  );

  return nodeData.title;
};
