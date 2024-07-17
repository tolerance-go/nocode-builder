import { useAppDispatch, useAppSelector } from '@/core/managers/UIStoreManager';
import { 组件类名 } from '@/core/managers/UITreeManager/constants';
import { use界面状态管理者 } from '@/core/managers/UITreeManager/hooks';
import { selectProjectStructureTreeNodeDataRecordItem } from '@/core/managers/UITreeManager/selectors';
import { 测试标识, 测试类名 } from '@/constants';
import { cx } from '@emotion/css';
import { Dropdown, Flex, Typography, theme } from 'antd';
import { TitleInput } from './TitleInput';

export const Title = ({ nodeKey }: { nodeKey: string }) => {
  const {
    store: reduxStore,
    slices: {
      projectTree: { actions: projectTreeActions },
    },
  } = use界面状态管理者();

  const { token } = theme.useToken();

  const dispatch = useAppDispatch();

  const 编辑临时创建节点之前选中的节点是否为自身 = useAppSelector((state) =>
    state.projectTree.编辑节点标题之前暂存的选中的节点keys?.includes(nodeKey),
  );
  const 激活的节点的key是否为自身 = useAppSelector(
    (state) => state.projectTree.激活的节点的key === nodeKey,
  );
  const 当前聚焦的节点key是否为自身 = useAppSelector(
    (state) => state.projectTree.当前聚焦的节点key === nodeKey,
  );
  const 当前正在编辑的项目树节点的key = useAppSelector(
    (state) => state.projectTree.当前正在编辑的项目树节点的key,
  );

  const isEditing = 当前正在编辑的项目树节点的key === nodeKey;

  const nodeDataRecord = useAppSelector((state) =>
    selectProjectStructureTreeNodeDataRecordItem(state, nodeKey),
  );

  return isEditing ? (
    <TitleInput nodeKey={nodeKey} />
  ) : (
    <Dropdown
      trigger={['contextMenu']}
      rootClassName={组件类名.项目树节点右键菜单容器}
      menu={{
        style: {
          width: token.sizeXXL * 5,
        },
        items: [
          {
            key: 'edit',
            label: (
              <Flex
                data-test-id={测试标识.重命名项目树节点标题菜单按钮}
                justify="space-between"
                align="center"
              >
                重命名...
                <Typography.Text keyboard>F2</Typography.Text>
              </Flex>
            ),
            onClick: ({ domEvent }) => {
              domEvent.stopPropagation();
              const {
                projectTree: { 当前聚焦的节点key },
              } = reduxStore.getState();

              if (!当前聚焦的节点key) return;

              dispatch(
                projectTreeActions.更新当前编辑节点是哪个并更新输入框的值(
                  当前聚焦的节点key,
                ),
              );
            },
          },
          {
            key: 'delete',
            label: (
              <Flex justify="space-between" align="center">
                删除
                <Typography.Text keyboard>Delete/Backspace</Typography.Text>
              </Flex>
            ),
            onClick: ({ domEvent }) => {
              domEvent.stopPropagation();
              dispatch(projectTreeActions.删除单个节点(nodeKey));
            },
          },
        ],
      }}
    >
      <span
        data-test-class={cx(
          测试类名.项目树节点标题,
          编辑临时创建节点之前选中的节点是否为自身 &&
            测试类名.编辑临时创建节点之前选中的节点,
        )}
        style={{
          display: 'inline-block',
          width: '100%',
        }}
        className={cx(
          激活的节点的key是否为自身 && 'active',
          当前聚焦的节点key是否为自身 && 'focused',
        )}
      >
        {nodeDataRecord?.title}
      </span>
    </Dropdown>
  );
};
