import { describe, it, expect } from 'vitest';
import { generateProjectTreeMeta } from './generateProjectTreeMeta';
import {
  ProjectModelRecord,
  ProjectGroupModelRecord,
} from '@/_gen/model-records';
import { DirectoryTreeNodeTypeEnum } from '../types';
import { ProjectTypeEnum } from '@/_gen/models';

describe('generateProjectTreeMeta 函数测试', () => {
  it('应正确生成项目树结构', () => {
    const projectRecords: ProjectModelRecord[] = [
      {
        id: 1,
        name: '项目A',
        ownerId: 1,
        type: ProjectTypeEnum.View,
        projectGroupId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: '项目B',
        ownerId: 1,
        type: ProjectTypeEnum.Bluemap,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    const projectGroupRecords: ProjectGroupModelRecord[] = [
      {
        id: 1,
        name: '项目组1',
        ownerId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: '项目组2',
        parentGroupId: 1,
        ownerId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    const result = generateProjectTreeMeta(projectRecords, projectGroupRecords);

    expect(result.项目树节点数据).toEqual({
      '1_group': { title: '项目组1', type: DirectoryTreeNodeTypeEnum.Folder },
      '2_group': { title: '项目组2', type: DirectoryTreeNodeTypeEnum.Folder },
      '1_project': {
        title: '项目A',
        type: DirectoryTreeNodeTypeEnum.File,
        projectType: ProjectTypeEnum.View,
      },
      '2_project': {
        title: '项目B',
        type: DirectoryTreeNodeTypeEnum.File,
        projectType: ProjectTypeEnum.Bluemap,
      },
    });

    expect(result.derived_节点到父节点的映射).toEqual({
      '1_group': null,
      '2_group': '1_group',
      '1_project': '1_group',
      '2_project': null,
    });

    expect(result.项目结构树).toEqual([
      {
        key: '1_group',
        title: '项目组1',
        children: [
          {
            key: '1_project',
            title: '项目A',
            children: [],
          },
          {
            key: '2_group',
            title: '项目组2',
            children: [],
          },
        ],
      },
      {
        key: '2_project',
        title: '项目B',
        children: [],
      },
    ]);
  });
});
