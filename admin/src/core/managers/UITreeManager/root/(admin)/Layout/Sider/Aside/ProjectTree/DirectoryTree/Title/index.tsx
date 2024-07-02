import {
  removeProjectStructureTreeNode,
  stopEditingProjectStructureTreeNode,
  updateProjectStructureTreeTempNode,
  updateProjectTreeDataRecordItem,
  useAppDispatch,
  useAppSelector,
} from '@/core/managers/UIStoreManager';
import { selectProjectStructureTreeNodeDataRecordItem } from '@/core/managers/UITreeManager/selectors';
import { Dropdown, Flex, InputRef, Typography, theme } from 'antd';
import { useRef } from 'react';
import { AutoSelectInput } from './AutoSelectInput';

export const Title = ({ nodeKey }: { nodeKey: string }) => {
  const inputRef = useRef<InputRef>(null);
  const { token } = theme.useToken();

  const dispatch = useAppDispatch();

  const projectStructureTreeTempNode = useAppSelector(
    (state) => state.projectTree.projectStructureTreeTempNode,
  );
  const editingProjectStructureTreeNode = useAppSelector(
    (state) => state.projectTree.editingProjectStructureTreeNode,
  );

  const isEditing = editingProjectStructureTreeNode === nodeKey;

  const nodeDataRecord = useAppSelector((state) =>
    selectProjectStructureTreeNodeDataRecordItem(state, nodeKey),
  );

  const saveNode = (currentValue: string) => {
    if (projectStructureTreeTempNode === nodeKey) {
      dispatch(updateProjectStructureTreeTempNode(null));
    }
    dispatch(
      updateProjectTreeDataRecordItem({
        key: nodeKey,
        data: { title: currentValue },
      }),
    );
    dispatch(stopEditingProjectStructureTreeNode());
  };

  const saveInput = () => {
    const currentValue = inputRef.current?.input?.value.trim();
    if (currentValue) {
      saveNode(currentValue);
      return;
    }

    /** 不合法的输入时 */

    // 如果是临时新建的
    if (projectStructureTreeTempNode === nodeKey) {
      // 删除
      dispatch(removeProjectStructureTreeNode(nodeKey));

      // projectTreeHistoryState.remove(
      //   projectTreeHistoryState.historyNodeCount - 1,
      // );
    }

    // 始终结束编辑
    dispatch(stopEditingProjectStructureTreeNode());
  };

  return isEditing ? (
    <AutoSelectInput
      size="small"
      ref={inputRef}
      autoFocus
      defaultValue={nodeDataRecord?.title}
      onBlur={() => saveInput()}
      onPressEnter={() => saveInput()}
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
              dispatch(stopEditingProjectStructureTreeNode());
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
              dispatch(removeProjectStructureTreeNode(nodeKey));
            },
          },
        ],
      }}
    >
      <span
        style={{
          display: 'inline-block',
          width: '100%',
        }}
      >
        {nodeDataRecord?.title}
      </span>
    </Dropdown>
  );
};
