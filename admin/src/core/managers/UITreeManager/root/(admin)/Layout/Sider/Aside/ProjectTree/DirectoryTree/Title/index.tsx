import {
  删除项目树节点,
  stopEditingProjectStructureTreeNode,
  updateProjectStructureTreeTempNode,
  updateProjectTreeDataRecordItem,
  useAppDispatch,
  useAppSelector,
} from '@/core/managers/UIStoreManager';
import { selectProjectStructureTreeNodeDataRecordItem } from '@/core/managers/UITreeManager/selectors';
import { Dropdown, Flex, InputRef, Typography, theme } from 'antd';
import { useRef } from 'react';
import { TitleInput } from './TitleInput';
import { isTitleInputError } from './utils';
import { TEST_IDS } from '@cypress/shared/constants';

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

  const saveInput = (fromBlur: boolean = false) => {
    const inputIsError = isTitleInputError(
      inputRef.current?.input?.value ?? '',
    );

    if (inputIsError) {
      // 如果是临时新建的
      if (projectStructureTreeTempNode === nodeKey) {
        if (fromBlur) {
          // 删除
          dispatch(删除项目树节点(nodeKey));
        }
      }
    } else {
      const currentValue = inputRef.current?.input?.value.trim();
      if (!currentValue) {
        throw new Error('此处标题不应为空');
      }
      saveNode(currentValue);
      dispatch(stopEditingProjectStructureTreeNode());
    }
  };

  return isEditing ? (
    <TitleInput
      id={TEST_IDS.项目树标题输入框}
      size="small"
      ref={inputRef}
      autoFocus
      defaultValue={nodeDataRecord?.title}
      onBlur={() => {
        saveInput(true);
      }}
      onPressEnter={() => {
        saveInput();
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
              dispatch(删除项目树节点(nodeKey));
            },
          },
        ],
      }}
    >
      <span
        data-test-class={'project-tree-title'}
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
