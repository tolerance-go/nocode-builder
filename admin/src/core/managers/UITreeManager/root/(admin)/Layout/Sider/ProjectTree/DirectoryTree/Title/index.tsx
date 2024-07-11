import {
  reduxStore,
  useAppDispatch,
  useAppSelector,
  停止节点编辑状态并清空输入内容,
  删除项目树节点并同步其他状态,
  更新为了编辑临时创建节点之前选中的节点的key为,
  更新为了编辑创建的临时节点为,
  更新当前编辑节点是哪个并更新输入框的值,
  更新节点的数据,
} from '@/core/managers/UIStoreManager';
import { 组件类名 } from '@/core/managers/UITreeManager/constants';
import { useCtx验证管理者 } from '@/core/managers/UITreeManager/hooks';
import { selectProjectStructureTreeNodeDataRecordItem } from '@/core/managers/UITreeManager/selectors';
import { 测试标识, 测试类 } from '@cypress/shared/constants';
import { cx } from '@emotion/css';
import { Dropdown, Flex, InputRef, Typography, theme } from 'antd';
import { useRef } from 'react';
import { TitleInput } from './TitleInput';

export const Title = ({ nodeKey }: { nodeKey: string }) => {
  const 验证管理者 = useCtx验证管理者();
  const inputRef = useRef<InputRef>(null);
  const { token } = theme.useToken();

  const dispatch = useAppDispatch();

  const 为了编辑临时创建的节点的key = useAppSelector(
    (state) => state.projectTree.为了编辑临时创建的节点的key,
  );
  const 编辑临时创建节点之前选中的节点是否为自身 = useAppSelector((state) =>
    state.projectTree.为了编辑节点标题而暂存的之前选中的节点keys?.includes(
      nodeKey,
    ),
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

  const 保存标题输入 = (来自失去焦点: boolean = false) => {
    const 标题内容有错 = 验证管理者.项目树节点标题是否有效(
      inputRef.current?.input?.value ?? '',
    );

    if (标题内容有错) {
      if (为了编辑临时创建的节点的key === nodeKey) {
        if (来自失去焦点) {
          dispatch(删除项目树节点并同步其他状态(nodeKey));
        }
      } else {
        if (来自失去焦点) {
          dispatch(停止节点编辑状态并清空输入内容());
        }
      }
    } else {
      // 标题内容没有错
      const 当前输入标题 = inputRef.current?.input?.value.trim();
      if (!当前输入标题) {
        throw new Error('此处标题不应为空');
      }
      if (为了编辑临时创建的节点的key === nodeKey) {
        dispatch(更新为了编辑创建的临时节点为(null));
        dispatch(更新为了编辑临时创建节点之前选中的节点的key为(null));
      }
      dispatch(
        更新节点的数据({
          key: nodeKey,
          data: { title: 当前输入标题 },
        }),
      );
      dispatch(停止节点编辑状态并清空输入内容());
    }
  };

  return isEditing ? (
    <TitleInput
      id={测试标识.项目树标题输入框}
      size="small"
      ref={inputRef}
      autoFocus
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
                更新当前编辑节点是哪个并更新输入框的值(当前聚焦的节点key),
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
              dispatch(删除项目树节点并同步其他状态(nodeKey));
            },
          },
        ],
      }}
    >
      <span
        data-test-class={cx(
          测试类.项目树节点标题,
          编辑临时创建节点之前选中的节点是否为自身 &&
            测试类.编辑临时创建节点之前选中的节点,
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
