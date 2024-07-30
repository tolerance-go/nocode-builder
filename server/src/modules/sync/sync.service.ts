import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ProjectGroupService } from 'src/modules/project-group/project-group.service';
import { ProjectService } from 'src/modules/project/project.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { OperationsDto } from './dtos';
import { OperationType } from '@unocode/common';
import {
  ProjectModelRecordDto,
  ProjectGroupModelRecordDto,
} from 'src/_gen/dtos/model-records';

@Injectable()
export class SyncService {
  constructor(
    private prisma: PrismaService,
    private projectService: ProjectService,
    private projectGroupService: ProjectGroupService,
  ) {}

  async applyOperations(operations: OperationsDto): Promise<void> {
    await this.prisma.$transaction(async (tx) => {
      for (const operation of operations.operations) {
        const { record, operation: operationType, tableName } = operation;

        switch (operationType) {
          case OperationType.ADD_RECORD:
            if (tableName === 'project') {
              const projectRecord = record.projectOperationRecord!;
              await this.projectService.createProject(
                this.createProjectCreateInput(projectRecord),
                tx,
              );
            } else if (tableName === 'projectGroup') {
              const projectGroupRecord = record.projectGroupOperationRecord!;
              await this.projectGroupService.createProjectGroup(
                this.createProjectGroupCreateInput(projectGroupRecord),
                tx,
              );
            }
            break;

          case OperationType.UPDATE_RECORD:
            if (tableName === 'project') {
              const projectRecord = record.projectOperationRecord!;
              await this.projectService.updateProject(
                {
                  where: { id: projectRecord.id },
                  data: this.createProjectUpdateInput(projectRecord),
                },
                tx,
              );
            } else if (tableName === 'projectGroup') {
              const projectGroupRecord = record.projectGroupOperationRecord!;

              await this.projectGroupService.updateProjectGroup(
                {
                  where: { id: projectGroupRecord.id },
                  data: this.createProjectGroupUpdateInput(projectGroupRecord),
                },
                tx,
              );
            }
            break;

          case OperationType.DELETE_RECORD:
            if (tableName === 'project') {
              const projectRecord = record.projectOperationRecord!;
              await this.projectService.deleteProject(
                { id: projectRecord.id },
                tx,
              );
            } else if (tableName === 'projectGroup') {
              const projectGroupRecord = record.projectGroupOperationRecord!;
              await this.projectGroupService.deleteProjectGroup(
                { id: projectGroupRecord.id },
                tx,
              );
            }
            break;

          case OperationType.CLEAR_RECORDS:
            if (tableName === 'project') {
              await this.projectService.clearProjects(tx);
            } else if (tableName === 'projectGroup') {
              await this.projectGroupService.clearProjectGroups(tx);
            }
            break;

          default:
            throw new Error(`未知的操作类型: ${operationType}`);
        }
      }
    });
  }

  private createProjectCreateInput(
    record: ProjectModelRecordDto,
  ): Prisma.ProjectCreateInput {
    const input: Prisma.ProjectCreateInput = {
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
}
