import {
  删除项目树节点,
  停止节点编辑状态,
  更新为了编辑创建的临时节点是哪个,
  更新节点的数据,
  将当前选中的节点恢复为编辑临时创建节点之前选中的节点的key,
  useAppDispatch,
  useAppSelector,
  更新_编辑临时创建节点之前选中的节点的key_为,
} from '@/core/managers/UIStoreManager';
import { selectProjectStructureTreeNodeDataRecordItem } from '@/core/managers/UITreeManager/selectors';
import { Dropdown, Flex, InputRef, Typography, theme } from 'antd';
import { useRef } from 'react';
import { TitleInput } from './TitleInput';
import { 标题是否有错 } from './utils';
import { 测试类, 测试标识 } from '@cypress/shared/constants';

export const Title = ({ nodeKey }: { nodeKey: string }) => {
  const inputRef = useRef<InputRef>(null);
  const { token } = theme.useToken();

  const dispatch = useAppDispatch();

  const 为了编辑临时创建的节点的key = useAppSelector(
    (state) => state.projectTree.为了编辑临时创建的节点的key,
  );
  const 编辑临时创建节点之前选中的节点是否为自身 = useAppSelector((state) =>
    state.projectTree.编辑临时创建节点之前选中的节点的keys?.includes(nodeKey),
  );

  const 当前正在编辑的项目树节点的key = useAppSelector(
    (state) => state.projectTree.当前正在编辑的项目树节点的key,
  );

  const isEditing = 当前正在编辑的项目树节点的key === nodeKey;

  const nodeDataRecord = useAppSelector((state) =>
    selectProjectStructureTreeNodeDataRecordItem(state, nodeKey),
  );

  const 保存标题输入 = (来自失去焦点: boolean = false) => {
    const 标题内容有错 = 标题是否有错(inputRef.current?.input?.value ?? '');

    if (标题内容有错) {
      // 如果是临时新建的
      if (为了编辑临时创建的节点的key === nodeKey) {
        if (来自失去焦点) {
          // 删除
          dispatch(删除项目树节点(nodeKey));
          dispatch(更新为了编辑创建的临时节点是哪个(null));
          dispatch(将当前选中的节点恢复为编辑临时创建节点之前选中的节点的key());
        }
      }
    } else {
      const 当前输入标题 = inputRef.current?.input?.value.trim();
      if (!当前输入标题) {
        throw new Error('此处标题不应为空');
      }
      if (为了编辑临时创建的节点的key === nodeKey) {
        dispatch(更新为了编辑创建的临时节点是哪个(null));
        dispatch(更新_编辑临时创建节点之前选中的节点的key_为(null));
      }
      dispatch(
        更新节点的数据({
          key: nodeKey,
          data: { title: 当前输入标题 },
        }),
      );
      dispatch(停止节点编辑状态());
    }
  };

  return isEditing ? (
    <TitleInput
      id={测试标识.项目树标题输入框}
      size="small"
      ref={inputRef}
      autoFocus
      defaultValue={nodeDataRecord?.title}
      onBlur={() => {
        保存标题输入(true);
      }}
      onPressEnter={() => {
        保存标题输入();
      }}
      style={{ width: '100%' }}
    />
  ) : (
    <Dropdown
      trigger={['contextMenu']}
      menu={{
        style: {
          width: token.sizeXXL * 5,
        },
        items: [
          {
            key: 'edit',
            label: (
              <Flex justify="space-between" align="center">
                重命名...
                <Typography.Text keyboard>F2</Typography.Text>
              </Flex>
            ),
            onClick: ({ domEvent }) => {
              domEvent.stopPropagation();
              dispatch(停止节点编辑状态());
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
              dispatch(删除项目树节点(nodeKey));
            },
          },
        ],
      }}
    >
      <span
        data-test-class={测试类.项目树节点标题}
        style={{
          display: 'inline-block',
          width: '100%',
        }}
        className={
          编辑临时创建节点之前选中的节点是否为自身 ? 'hosted' : undefined
        }
      >
        {nodeDataRecord?.title}
      </span>
    </Dropdown>
  );
};
