import { describe, it, expect } from 'vitest';
import { ViewKey } from '@/common/types';
import {
  DirectoryTreeNodeTypeEnum,
  ProjectTreeNodeData,
  ProjectTreeNodeDataBase,
} from '../../types';
import {
  createProjectTreeInitialState,
  createProjectTreeSlice,
  ProjectTreeStates,
} from '.';
import { ProjectTypeEnum, WidgetPlatformTypeEnum } from '@/_gen/models';

describe('projectTreeSlice', () => {
  const projectTreeSlice = createProjectTreeSlice();
  const { actions, reducer } = projectTreeSlice;

  // 初始状态
  const initialState: ProjectTreeStates = createProjectTreeInitialState();

  it('应更新节点数据', () => {
    const nodeKey: ViewKey = 'test-node';
    const initialData: ProjectTreeNodeData = {
      type: DirectoryTreeNodeTypeEnum.File,
      projectType: ProjectTypeEnum.View,
      title: '初始标题',
      projectDetail: {
        type: ProjectTypeEnum.View,
        platform: WidgetPlatformTypeEnum.PcWeb,
      },
    };
    const newData: Partial<ProjectTreeNodeData> = {
      title: '更新后的标题',
    };

    // 初始化状态，包含一个节点
    const stateWithNode: ProjectTreeStates = {
      ...initialState,
      项目树节点数据: {
        [nodeKey]: initialData,
      },
    };

    // 执行更新节点数据的 action
    const newState = reducer(
      stateWithNode,
      actions.更新节点的数据({
        key: nodeKey,
        data: newData,
      }),
    );

    // 断言节点的数据已被更新
    expect(newState.项目树节点数据[nodeKey]).toEqual({
      ...initialData,
      ...newData,
    });
  });

  it('应在节点不存在时不进行更新', () => {
    const nodeKey: ViewKey = 'non-existent-node';
    const newData: Partial<ProjectTreeNodeDataBase> = {
      title: '更新后的标题',
    };

    // 执行更新不存在节点数据的 action
    const newState = reducer(
      initialState,
      actions.更新节点的数据({
        key: nodeKey,
        data: newData,
      }),
    );

    // 断言状态未发生变化
    expect(newState).toEqual(initialState);
  });
});
