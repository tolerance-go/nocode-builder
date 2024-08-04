import { describe, it, expect } from 'vitest';
import { generateProjectTreeMeta } from './generateProjectTreeMeta';
import {
  ProjectModelRecord,
  ProjectGroupModelRecord,
  ProjectDetailModelRecord,
  BluemapProjectModelRecord,
  DataTableProjectModelRecord,
  ViewProjectModelRecord,
} from '@/_gen/model-records';
import {
  DirectoryTreeNodeTypeEnum,
  BluemapProjectDetail,
  ViewProjectDetail,
} from '../types';
import { ProjectTypeEnum, WidgetPlatformTypeEnum } from '@/_gen/models';

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
        projectDetailId: 1,
      },
      {
        id: 2,
        name: '项目B',
        ownerId: 1,
        type: ProjectTypeEnum.Bluemap,
        createdAt: new Date(),
        updatedAt: new Date(),
        projectDetailId: 2,
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

    const projectDetailRecords: ProjectDetailModelRecord[] = [
      {
        id: 1,
        viewProjectId: 1,
        bluemapProjectId: undefined,
        dataTableProjectId: undefined,
        ownerId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        viewProjectId: undefined,
        bluemapProjectId: 1,
        dataTableProjectId: undefined,
        ownerId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    const viewProjectModelRecords: ViewProjectModelRecord[] = [
      {
        id: 1,
        platformType: WidgetPlatformTypeEnum.PcWeb,
        ownerId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    const bluemapProjectModelRecords: BluemapProjectModelRecord[] = [
      {
        id: 1,
        ownerId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    const dataTableProjectModelRecords: DataTableProjectModelRecord[] = [];

    const result = generateProjectTreeMeta(
      projectRecords,
      projectGroupRecords,
      projectDetailRecords,
      viewProjectModelRecords,
      bluemapProjectModelRecords,
      dataTableProjectModelRecords,
    );

    expect(result.项目树节点数据).toEqual({
      '1_group': {
        backfillProjectRecordId: 1,
        title: '项目组1',
        type: DirectoryTreeNodeTypeEnum.Folder,
      },
      '2_group': {
        backfillProjectRecordId: 2,
        title: '项目组2',
        type: DirectoryTreeNodeTypeEnum.Folder,
      },
      '1_project': {
        backfillProjectRecordId: 1,
        title: '项目A',
        type: DirectoryTreeNodeTypeEnum.File,
        projectType: ProjectTypeEnum.View,
        projectDetail: {
          type: ProjectTypeEnum.View,
          platform: WidgetPlatformTypeEnum.PcWeb,
        } satisfies ViewProjectDetail,
      },
      '2_project': {
        backfillProjectRecordId: 2,
        title: '项目B',
        type: DirectoryTreeNodeTypeEnum.File,
        projectType: ProjectTypeEnum.Bluemap,
        projectDetail: {
          type: ProjectTypeEnum.Bluemap,
        } satisfies BluemapProjectDetail,
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
            key: '2_group',
            title: '项目组2',
            children: [],
          },
          {
            key: '1_project',
            title: '项目A',
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

  it('应正确生成包含3级嵌套结构的项目树', () => {
    const projectRecords: ProjectModelRecord[] = [
      {
        id: 1,
        name: '项目A',
        ownerId: 1,
        type: ProjectTypeEnum.View,
        projectGroupId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        projectDetailId: 1,
      },
      {
        id: 2,
        name: '项目B',
        ownerId: 1,
        type: ProjectTypeEnum.Bluemap,
        createdAt: new Date(),
        updatedAt: new Date(),
        projectDetailId: 2,
      },
      {
        id: 3,
        name: '项目C',
        ownerId: 1,
        type: ProjectTypeEnum.View,
        projectGroupId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
        projectDetailId: 3,
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
      {
        id: 3,
        name: '项目组3',
        parentGroupId: 2,
        ownerId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    const projectDetailRecords: ProjectDetailModelRecord[] = [
      {
        id: 1,
        viewProjectId: 1,
        bluemapProjectId: undefined,
        dataTableProjectId: undefined,
        ownerId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        viewProjectId: undefined,
        bluemapProjectId: 1,
        dataTableProjectId: undefined,
        ownerId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        viewProjectId: 2,
        bluemapProjectId: undefined,
        dataTableProjectId: undefined,
        ownerId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    const viewProjectModelRecords: ViewProjectModelRecord[] = [
      {
        id: 1,
        platformType: WidgetPlatformTypeEnum.PcWeb,
        ownerId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        platformType: WidgetPlatformTypeEnum.MobileWeb,
        ownerId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    const bluemapProjectModelRecords: BluemapProjectModelRecord[] = [
      {
        id: 1,
        ownerId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    const dataTableProjectModelRecords: DataTableProjectModelRecord[] = [];

    const result = generateProjectTreeMeta(
      projectRecords,
      projectGroupRecords,
      projectDetailRecords,
      viewProjectModelRecords,
      bluemapProjectModelRecords,
      dataTableProjectModelRecords,
    );

    expect(result.项目树节点数据).toEqual({
      '1_group': {
        backfillProjectRecordId: 1,
        title: '项目组1',
        type: DirectoryTreeNodeTypeEnum.Folder,
      },
      '2_group': {
        backfillProjectRecordId: 2,
        title: '项目组2',
        type: DirectoryTreeNodeTypeEnum.Folder,
      },
      '3_group': {
        backfillProjectRecordId: 3,
        title: '项目组3',
        type: DirectoryTreeNodeTypeEnum.Folder,
      },
      '1_project': {
        backfillProjectRecordId: 1,
        title: '项目A',
        type: DirectoryTreeNodeTypeEnum.File,
        projectType: ProjectTypeEnum.View,
        projectDetail: {
          type: ProjectTypeEnum.View,
          platform: WidgetPlatformTypeEnum.PcWeb,
        } as ViewProjectDetail,
      },
      '2_project': {
        backfillProjectRecordId: 2,
        title: '项目B',
        type: DirectoryTreeNodeTypeEnum.File,
        projectType: ProjectTypeEnum.Bluemap,
        projectDetail: {
          type: ProjectTypeEnum.Bluemap,
        } as BluemapProjectDetail,
      },
      '3_project': {
        backfillProjectRecordId: 3,
        title: '项目C',
        type: DirectoryTreeNodeTypeEnum.File,
        projectType: ProjectTypeEnum.View,
        projectDetail: {
          type: ProjectTypeEnum.View,
          platform: WidgetPlatformTypeEnum.MobileWeb,
        } as ViewProjectDetail,
      },
    });

    expect(result.derived_节点到父节点的映射).toEqual({
      '1_group': null,
      '2_group': '1_group',
      '3_group': '2_group',
      '1_project': '1_group',
      '2_project': null,
      '3_project': '3_group',
    });

    expect(result.项目结构树).toEqual([
      {
        key: '1_group',
        title: '项目组1',
        children: [
          {
            key: '2_group',
            title: '项目组2',
            children: [
              {
                key: '3_group',
                title: '项目组3',
                children: [
                  {
                    key: '3_project',
                    title: '项目C',
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            key: '1_project',
            title: '项目A',
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
