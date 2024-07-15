import {
  DiffResult,
  ProjectStructureTreeDataNode,
  ProjectTreeNodeDataRecord,
} from '@/core/managers/UIStoreManager';
import { describe, expect, it } from 'vitest';
import { handleAdditions } from './handleAdditions';
import { ProjectTypeEnum } from '@/_gen/models';

describe('handleAdditions', () => {
  it('应该正确处理文件和文件夹的新增操作', () => {
    const diffResult: DiffResult<ProjectStructureTreeDataNode> = {
      删除: {
        节点keys: [],
        recordItems: [],
      },
      移动: [],
      新增: [
        {
          父节点key: null,
          index: 0,
          节点keys: ['1', '2'],
          recordItems: [
            {
              key: '1',
              children: [
                { key: '1-1', children: [] },
                { key: '1-2', children: [] },
              ],
            },
            {
              key: '2',
              children: [{ key: '2-1', children: [] }],
            },
          ],
        },
      ],
    };

    const newNodeDataRecord: ProjectTreeNodeDataRecord = {
      '1': { type: 'folder', title: '文件夹 1', id: -1 },
      '1-1': {
        id: -1,
        type: 'file',
        title: '文件 1-1',
        projectFileType: ProjectTypeEnum.View,
      },
      '1-2': {
        id: -1,
        type: 'file',
        title: '文件 1-2',
        projectFileType: ProjectTypeEnum.View,
      },
      '2': {
        id: -1,
        type: 'folder',
        title: '文件夹 2',
      },
      '2-1': {
        id: -1,
        type: 'file',
        title: '文件 2-1',
        projectFileType: ProjectTypeEnum.View,
      },
    };

    const result = handleAdditions(diffResult, newNodeDataRecord);

    expect(result).toEqual([
      [
        {
          name: '文件夹 1',
          children: [
            { name: '文件 1-1', type: ProjectTypeEnum.View },
            { name: '文件 1-2', type: ProjectTypeEnum.View },
          ],
        },
        {
          name: '文件夹 2',
          children: [{ name: '文件 2-1', type: ProjectTypeEnum.View }],
        },
      ],
    ]);
  });

  it('应该正确处理没有子节点的文件夹的新增操作', () => {
    const diffResult: DiffResult<ProjectStructureTreeDataNode> = {
      删除: {
        节点keys: [],
        recordItems: [],
      },
      移动: [],
      新增: [
        {
          父节点key: null,
          index: 0,
          节点keys: ['1'],
          recordItems: [
            {
              key: '1',
              children: [],
            },
          ],
        },
      ],
    };

    const newNodeDataRecord: ProjectTreeNodeDataRecord = {
      '1': { type: 'folder', title: '空文件夹', id: -1 },
    };

    const result = handleAdditions(diffResult, newNodeDataRecord);

    expect(result).toEqual([
      [
        {
          name: '空文件夹',
          children: [],
        },
      ],
    ]);
  });

  it('应该正确处理单个文件的新增操作', () => {
    const diffResult: DiffResult<ProjectStructureTreeDataNode> = {
      删除: {
        节点keys: [],
        recordItems: [],
      },
      移动: [],
      新增: [
        {
          父节点key: null,
          index: 0,
          节点keys: ['1'],
          recordItems: [
            {
              key: '1',
              children: [],
            },
          ],
        },
      ],
    };

    const newNodeDataRecord: ProjectTreeNodeDataRecord = {
      '1': {
        type: 'file',
        title: '单个文件',
        id: -1,
        projectFileType: ProjectTypeEnum.View,
      },
    };

    const result = handleAdditions(diffResult, newNodeDataRecord);

    expect(result).toEqual([
      [{ name: '单个文件', type: ProjectTypeEnum.View }],
    ]);
  });

  it('应该正确处理嵌套文件夹和文件的新增操作', () => {
    const diffResult: DiffResult<ProjectStructureTreeDataNode> = {
      删除: {
        节点keys: [],
        recordItems: [],
      },
      移动: [],
      新增: [
        {
          父节点key: null,
          index: 0,
          节点keys: ['1'],
          recordItems: [
            {
              key: '1',
              children: [
                {
                  key: '1-1',
                  children: [
                    { key: '1-1-1', children: [] },
                    { key: '1-1-2', children: [] },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };

    const newNodeDataRecord: ProjectTreeNodeDataRecord = {
      '1': { type: 'folder', title: '根文件夹', id: -1 },
      '1-1': { type: 'folder', title: '子文件夹', id: -1 },
      '1-1-1': {
        type: 'file',
        title: '文件 1-1-1',
        id: -1,
        projectFileType: ProjectTypeEnum.View,
      },
      '1-1-2': {
        type: 'file',
        title: '文件 1-1-2',
        id: -1,
        projectFileType: ProjectTypeEnum.View,
      },
    };

    const result = handleAdditions(diffResult, newNodeDataRecord);

    expect(result).toEqual([
      [
        {
          name: '根文件夹',
          children: [
            {
              name: '子文件夹',
              children: [
                { name: '文件 1-1-1', type: ProjectTypeEnum.View },
                { name: '文件 1-1-2', type: ProjectTypeEnum.View },
              ],
            },
          ],
        },
      ],
    ]);
  });
});
