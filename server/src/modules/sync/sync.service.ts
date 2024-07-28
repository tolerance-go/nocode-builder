import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import {
  ProjectGroupOperationRecordDto,
  ProjectOperationRecordDto,
} from 'src/_gen/dtos';
import { OperationType } from 'src/common/enums/operation-type';
import { ProjectGroupService } from 'src/modules/project-group/project-group.service';
import { ProjectService } from 'src/modules/project/project.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { OperationsDto } from './dtos';

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
            } else if (tableName === 'projectGroup' && 'id' in record) {
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
            } else if (tableName === 'projectGroup' && 'id' in record) {
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
    record: ProjectOperationRecordDto,
  ): Prisma.ProjectCreateInput {
    return {
      name: record.name,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
      type: record.type,
      owner: {
        connect: {
          id: record.ownerId,
        },
      },
      projectGroup:
        record.projectGroup && record.projectGroupId
          ? {
              connectOrCreate: {
                where: { id: record.projectGroupId },
                create: this.createProjectGroupCreateInput(record.projectGroup),
              },
            }
          : undefined,
    };
  }

  private createProjectGroupCreateInput(
    record: ProjectGroupOperationRecordDto,
  ): Prisma.ProjectGroupCreateInput {
    return {
      name: record.name,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
      owner: {
        connect: {
          id: record.ownerId,
        },
      },
      projects: {
        connectOrCreate: record.projects.map((project) => ({
          where: { id: project.id },
          create: this.createProjectCreateInput(project),
        })),
      },
      parentGroup:
        record.parentGroupId && record.parentGroup
          ? {
              connectOrCreate: {
                where: { id: record.parentGroupId },
                create: this.createProjectGroupCreateInput(record.parentGroup),
              },
            }
          : undefined,
      childGroups: {
        connectOrCreate: record.childGroups.map((childGroup) => ({
          where: { id: childGroup.id },
          create: this.createProjectGroupCreateInput(childGroup),
        })),
      },
    };
  }

  private createProjectUpdateInput(
    record: ProjectOperationRecordDto,
  ): Prisma.ProjectUpdateInput {
    return {
      name: record.name,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
      type: record.type,
      owner: {
        connect: {
          id: record.ownerId,
        },
      },
      projectGroup:
        record.projectGroup && record.projectGroupId
          ? {
              connectOrCreate: {
                where: { id: record.projectGroupId },
                create: this.createProjectGroupCreateInput(record.projectGroup),
              },
            }
          : undefined,
    };
  }

  private createProjectGroupUpdateInput(
    record: ProjectGroupOperationRecordDto,
  ): Prisma.ProjectGroupUpdateInput {
    return {
      name: record.name,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
      owner: {
        connect: {
          id: record.ownerId,
        },
      },
      projects: {
        connectOrCreate: record.projects.map((project) => ({
          where: { id: project.id },
          create: this.createProjectCreateInput(project),
        })),
      },
      parentGroup:
        record.parentGroupId && record.parentGroup
          ? {
              connectOrCreate: {
                where: { id: record.parentGroupId },
                create: this.createProjectGroupCreateInput(record.parentGroup),
              },
            }
          : undefined,
      childGroups: {
        connectOrCreate: record.childGroups.map((childGroup) => ({
          where: { id: childGroup.id },
          create: this.createProjectGroupCreateInput(childGroup),
        })),
      },
    };
  }
}
