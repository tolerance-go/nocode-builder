import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ProjectGroupService } from 'src/modules/project-group/project-group.service';
import { ProjectService } from 'src/modules/project/project.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { OperationsDto } from './dtos';
import { OperationType, TableName } from '@unocode/common';
import {
  ProjectModelRecordDto,
  ProjectGroupModelRecordDto,
  BluemapProjectModelRecordDto,
  DataTableProjectModelRecordDto,
  ProjectDetailModelRecordDto,
  ViewProjectModelRecordDto,
} from 'src/_gen/dtos/model-records';
import { ProjectDetailService } from 'src/modules/project-detail/project-detail.service';
import { ViewProjectService } from 'src/modules/view-project/view-project.service';
import { BluemapProjectService } from '../bluemap-project/bluemap-project.service';
import { DataTableProjectService } from '../data-table-project/data-table-project.service';

@Injectable()
export class SyncService {
  constructor(
    private prisma: PrismaService,
    private projectService: ProjectService,
    private projectGroupService: ProjectGroupService,
    private projectDetailService: ProjectDetailService,
    private viewProjectService: ViewProjectService,
    private dataTableProjectService: DataTableProjectService,
    private bluemapProjectService: BluemapProjectService,
  ) {}

  async applyOperations(operations: OperationsDto): Promise<void> {
    await this.prisma.$transaction(async (tx) => {
      for (const operation of operations.operations) {
        const { record, operation: operationType, tableName } = operation;

        switch (operationType) {
          case OperationType.ADD_RECORD:
            await this.handleAddOperation(record, tableName, tx);
            break;

          case OperationType.UPDATE_RECORD:
            await this.handleUpdateOperation(record, tableName, tx);
            break;

          case OperationType.DELETE_RECORD:
            await this.handleDeleteOperation(record, tableName, tx);
            break;

          case OperationType.CLEAR_RECORDS:
            await this.handleClearOperation(tableName, tx);
            break;

          default:
            throw new Error(`未知的操作类型: ${operationType}`);
        }
      }
    });
  }

  private async handleAddOperation(
    record: any,
    tableName: TableName,
    tx: Prisma.TransactionClient,
  ) {
    switch (tableName) {
      case TableName.Project:
        await this.projectService.createProject(
          this.createProjectCreateInput(record.projectOperationRecord!),
          tx,
        );
        break;
      case TableName.ProjectGroup:
        await this.projectGroupService.createProjectGroup(
          this.createProjectGroupCreateInput(
            record.projectGroupOperationRecord!,
          ),
          tx,
        );
        break;
      case TableName.ProjectDetail:
        await this.projectDetailService.createProjectDetail(
          this.createProjectDetailCreateInput(
            record.projectDetailOperationRecord!,
          ),
          tx,
        );
        break;
      case TableName.ViewProject:
        await this.viewProjectService.createViewProject(
          this.createViewProjectCreateInput(record.viewProjectOperationRecord!),
          tx,
        );
        break;
      case TableName.DataTableProject:
        await this.dataTableProjectService.createDataTableProject(
          this.createDataTableProjectCreateInput(
            record.dataTableProjectOperationRecord!,
          ),
          tx,
        );
        break;
      case TableName.BluemapProject:
        await this.bluemapProjectService.createBluemapProject(
          this.createBluemapProjectCreateInput(
            record.bluemapProjectOperationRecord!,
          ),
          tx,
        );
        break;
      default:
        throw new Error(`未知的表名: ${tableName}`);
    }
  }

  private async handleUpdateOperation(
    record: any,
    tableName: TableName,
    tx: Prisma.TransactionClient,
  ) {
    switch (tableName) {
      case TableName.Project:
        await this.projectService.updateProject(
          {
            where: { id: record.projectOperationRecord!.id },
            data: this.createProjectUpdateInput(record.projectOperationRecord!),
          },
          tx,
        );
        break;
      case TableName.ProjectGroup:
        await this.projectGroupService.updateProjectGroup(
          {
            where: { id: record.projectGroupOperationRecord!.id },
            data: this.createProjectGroupUpdateInput(
              record.projectGroupOperationRecord!,
            ),
          },
          tx,
        );
        break;
      case TableName.ProjectDetail:
        await this.projectDetailService.updateProjectDetail(
          {
            where: { id: record.projectDetailOperationRecord!.id },
            data: this.createProjectDetailUpdateInput(
              record.projectDetailOperationRecord!,
            ),
          },
          tx,
        );
        break;
      case TableName.ViewProject:
        await this.viewProjectService.updateViewProject(
          {
            where: { id: record.viewProjectOperationRecord!.id },
            data: this.createViewProjectUpdateInput(
              record.viewProjectOperationRecord!,
            ),
          },
          tx,
        );
        break;
      case TableName.DataTableProject:
        await this.dataTableProjectService.updateDataTableProject(
          {
            where: { id: record.dataTableProjectOperationRecord!.id },
            data: this.createDataTableProjectUpdateInput(
              record.dataTableProjectOperationRecord!,
            ),
          },
          tx,
        );
        break;
      case TableName.BluemapProject:
        await this.bluemapProjectService.updateBluemapProject(
          {
            where: { id: record.bluemapProjectOperationRecord!.id },
            data: this.createBluemapProjectUpdateInput(
              record.bluemapProjectOperationRecord!,
            ),
          },
          tx,
        );
        break;
      default:
        throw new Error(`未知的表名: ${tableName}`);
    }
  }

  private async handleDeleteOperation(
    record: any,
    tableName: TableName,
    tx: Prisma.TransactionClient,
  ) {
    switch (tableName) {
      case TableName.Project:
        await this.projectService.deleteProject(
          { id: record.projectOperationRecord!.id },
          tx,
        );
        break;
      case TableName.ProjectGroup:
        await this.projectGroupService.deleteProjectGroup(
          { id: record.projectGroupOperationRecord!.id },
          tx,
        );
        break;
      case TableName.ProjectDetail:
        await this.projectDetailService.deleteProjectDetail(
          { id: record.projectDetailOperationRecord!.id },
          tx,
        );
        break;
      case TableName.ViewProject:
        await this.viewProjectService.deleteViewProject(
          { id: record.viewProjectOperationRecord!.id },
          tx,
        );
        break;
      case TableName.DataTableProject:
        await this.dataTableProjectService.deleteDataTableProject(
          { id: record.dataTableProjectOperationRecord!.id },
          tx,
        );
        break;
      case TableName.BluemapProject:
        await this.bluemapProjectService.deleteBluemapProject(
          { id: record.bluemapProjectOperationRecord!.id },
          tx,
        );
        break;
      default:
        throw new Error(`未知的表名: ${tableName}`);
    }
  }

  private async handleClearOperation(
    tableName: TableName,
    tx: Prisma.TransactionClient,
  ) {
    switch (tableName) {
      case TableName.Project:
        await this.projectService.clearProjects(tx);
        break;
      case TableName.ProjectGroup:
        await this.projectGroupService.clearProjectGroups(tx);
        break;
      case TableName.ProjectDetail:
        await this.projectDetailService.clearProjectDetails(tx);
        break;
      case TableName.ViewProject:
        await this.viewProjectService.clearViewProjects(tx);
        break;
      case TableName.DataTableProject:
        await this.dataTableProjectService.clearDataTableProjects(tx);
        break;
      case TableName.BluemapProject:
        await this.bluemapProjectService.clearBluemapProjects(tx);
        break;
      default:
        throw new Error(`未知的表名: ${tableName}`);
    }
  }

  private createProjectCreateInput(
    record: ProjectModelRecordDto,
  ): Prisma.ProjectCreateInput {
    const input: Prisma.ProjectCreateInput = {
      id: record.id,
      name: record.name,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
      type: record.type,
      owner: {
        connect: {
          id: record.ownerId,
        },
      },
      projectDetail: {
        connect: {
          id: record.projectDetailId,
        },
      },
    };

    // 检查 projectGroupId 是否存在，若存在则添加连接信息
    if (record.projectGroupId) {
      input.projectGroup = {
        connect: {
          id: record.projectGroupId,
        },
      };
    }

    return input;
  }

  private createProjectGroupCreateInput(
    record: ProjectGroupModelRecordDto,
  ): Prisma.ProjectGroupCreateInput {
    const input: Prisma.ProjectGroupCreateInput = {
      id: record.id,
      name: record.name,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
      owner: {
        connect: {
          id: record.ownerId,
        },
      },
    };

    // 检查 projectGroupId 是否存在，若存在则添加连接信息
    if (record.parentGroupId) {
      input.parentGroup = {
        connect: {
          id: record.parentGroupId,
        },
      };
    }

    return input;
  }

  private createProjectDetailCreateInput(
    record: ProjectDetailModelRecordDto,
  ): Prisma.ProjectDetailCreateInput {
    const input: Prisma.ProjectDetailCreateInput = {
      id: record.id,
      owner: {
        connect: {
          id: record.ownerId,
        },
      },
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    };

    // 检查 projectDetailId 是否存在，若存在则添加连接信息
    if (record.viewProjectId) {
      input.viewProject = {
        connect: {
          id: record.viewProjectId,
        },
      };
    } else if (record.dataTableProjectId) {
      input.dataTableProject = {
        connect: {
          id: record.dataTableProjectId,
        },
      };
    } else if (record.bluemapProjectId) {
      input.bluemapProject = {
        connect: {
          id: record.bluemapProjectId,
        },
      };
    }

    return input;
  }

  private createViewProjectCreateInput(
    record: ViewProjectModelRecordDto,
  ): Prisma.ViewProjectCreateInput {
    const input: Prisma.ViewProjectCreateInput = {
      id: record.id,
      platformType: record.platformType,
      owner: {
        connect: {
          id: record.ownerId,
        },
      },
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    };

    return input;
  }

  private createDataTableProjectCreateInput(
    record: DataTableProjectModelRecordDto,
  ): Prisma.DataTableProjectCreateInput {
    const input: Prisma.DataTableProjectCreateInput = {
      id: record.id,
      owner: {
        connect: {
          id: record.ownerId,
        },
      },
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    };

    return input;
  }

  private createBluemapProjectCreateInput(
    record: BluemapProjectModelRecordDto,
  ): Prisma.BluemapProjectCreateInput {
    const input: Prisma.BluemapProjectCreateInput = {
      id: record.id,
      owner: {
        connect: {
          id: record.ownerId,
        },
      },
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    };

    return input;
  }

  private createProjectUpdateInput(
    record: ProjectModelRecordDto,
  ): Prisma.ProjectUpdateInput {
    const input: Prisma.ProjectUpdateInput = {
      name: record.name,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
      type: record.type,
      owner: {
        connect: {
          id: record.ownerId,
        },
      },
    };

    if (record.projectGroupId) {
      input.projectGroup = {
        connect: {
          id: record.projectGroupId,
        },
      };
    }

    return input;
  }

  private createProjectGroupUpdateInput(
    record: ProjectGroupModelRecordDto,
  ): Prisma.ProjectGroupUpdateInput {
    const input: Prisma.ProjectGroupUpdateInput = {
      name: record.name,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
      owner: {
        connect: {
          id: record.ownerId,
        },
      },
    };

    if (record.parentGroupId) {
      input.parentGroup = {
        connect: {
          id: record.parentGroupId,
        },
      };
    }

    return input;
  }

  private createProjectDetailUpdateInput(
    record: ProjectDetailModelRecordDto,
  ): Prisma.ProjectDetailUpdateInput {
    const input: Prisma.ProjectDetailUpdateInput = {
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
      owner: {
        connect: {
          id: record.ownerId,
        },
      },
    };

    if (record.viewProjectId) {
      input.viewProject = {
        connect: {
          id: record.viewProjectId,
        },
      };
    } else if (record.dataTableProjectId) {
      input.dataTableProject = {
        connect: {
          id: record.dataTableProjectId,
        },
      };
    } else if (record.bluemapProjectId) {
      input.bluemapProject = {
        connect: {
          id: record.bluemapProjectId,
        },
      };
    }

    return input;
  }

  private createViewProjectUpdateInput(
    record: ViewProjectModelRecordDto,
  ): Prisma.ViewProjectUpdateInput {
    const input: Prisma.ViewProjectUpdateInput = {
      platformType: record.platformType,
      owner: {
        connect: {
          id: record.ownerId,
        },
      },
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    };

    return input;
  }

  private createDataTableProjectUpdateInput(
    record: DataTableProjectModelRecordDto,
  ): Prisma.DataTableProjectUpdateInput {
    const input: Prisma.DataTableProjectUpdateInput = {
      owner: {
        connect: {
          id: record.ownerId,
        },
      },
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    };

    return input;
  }

  private createBluemapProjectUpdateInput(
    record: BluemapProjectModelRecordDto,
  ): Prisma.BluemapProjectUpdateInput {
    const input: Prisma.BluemapProjectUpdateInput = {
      owner: {
        connect: {
          id: record.ownerId,
        },
      },
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    };

    return input;
  }
}
