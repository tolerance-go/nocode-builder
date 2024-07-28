import { Injectable } from '@nestjs/common';
import { ProjectGroupService } from 'src/modules/project-group/project-group.service';
import { ProjectService } from 'src/modules/project/project.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { OperationsDto } from './dtos';
import { OperationType } from 'src/common/enums/operation-type';
import { Project } from '@prisma/client';
import {
  ProjectGroupOperationRecordDto,
  ProjectOperationRecordDto,
} from 'src/_gen/dtos';

@Injectable()
export class SyncService {
  constructor(
    private prisma: PrismaService,
    private projectService: ProjectService,
    private projectGroupService: ProjectGroupService,
  ) {}

  async applyOperations(operations: OperationsDto[]): Promise<void> {
    await this.prisma.$transaction(async (tx) => {
      for (const operation of operations) {
        const { record, operation: operationType, tableName } = operation;

        switch (operationType) {
          case OperationType.ADD_RECORD:
            if (tableName === 'project') {
              const projectRecord = record as ProjectOperationRecordDto;
              await this.projectService.createProject(
                {
                  name: projectRecord.name,
                  createdAt: projectRecord.createdAt,
                  updatedAt: projectRecord.updatedAt,
                  type: projectRecord.type,
                  owner: {
                    connect: {
                      id: projectRecord.ownerId,
                    },
                  },
                  projectGroup: {
                    connectOrCreate: {
                      where: { id: projectRecord.projectGroupId },
                      create: {
                        name: projectRecord.projectGroup!.name,
                        createdAt: projectRecord.projectGroup!.createdAt,
                        updatedAt: projectRecord.projectGroup!.updatedAt,
                        parentGroup: {
                          connectOrCreate: {
                            where: {
                              id: projectRecord.projectGroup?.parentGroupId,
                            },
                            create: {
                              name: projectRecord.projectGroup!.parentGroup!
                                .name,
                              createdAt:
                                projectRecord.projectGroup?.parentGroup!
                                  .createdAt,
                              updatedAt:
                                projectRecord.projectGroup?.parentGroup!
                                  .updatedAt,
                              owner: {
                                connect: {
                                  id: projectRecord.parentGroupOwnerId,
                                },
                              },
                            },
                          },
                        },
                        owner: {
                          connect: {
                            id: projectRecord.ownerId,
                          },
                        },
                        childGroups: {
                          connectOrCreate:
                            projectRecord.projectGroup?.childGroups.map(
                              (childGroup) => ({
                                where: { id: childGroup.id },
                                create: {
                                  name: childGroup.name,
                                  createdAt: childGroup.createdAt,
                                  updatedAt: childGroup.updatedAt,
                                  owner: {
                                    connect: {
                                      id: childGroup.ownerId,
                                    },
                                  },
                                },
                              }),
                            ),
                        },
                      },
                    },
                  },
                },
                tx,
              );
            } else if (tableName === 'projectGroup') {
              const projectGroupRecord =
                record as ProjectGroupOperationRecordDto;
              await this.projectGroupService.createProjectGroup(
                {
                  name: projectGroupRecord.name,
                  createdAt: projectGroupRecord.createdAt,
                  updatedAt: projectGroupRecord.updatedAt,
                  parentGroup: {
                    connectOrCreate: {
                      where: { id: projectGroupRecord.parentGroupId },
                      create: {
                        name: projectGroupRecord.parentGroup!.name,
                        createdAt: projectGroupRecord.parentGroup!.createdAt,
                        updatedAt: projectGroupRecord.parentGroup!.updatedAt,
                        owner: {
                          connect: {
                            id: projectGroupRecord.parentGroupOwnerId,
                          },
                        },
                      },
                    },
                  },
                  owner: {
                    connect: {
                      id: projectGroupRecord.ownerId,
                    },
                  },
                },
                tx,
              );
            }
            break;

          case OperationType.UPDATE_RECORD:
            if (tableName === 'project') {
              const projectRecord = record as ProjectOperationRecordDto;
              await this.projectService.updateProject(
                {
                  where: { id: record.id },
                  data: {
                    name: projectRecord.name,
                    createdAt: projectRecord.createdAt,
                    updatedAt: projectRecord.updatedAt,
                    type: projectRecord.type,
                    owner: {
                      connect: {
                        id: projectRecord.ownerId,
                      },
                    },
                    projectGroup: {
                      connectOrCreate: {
                        where: { id: projectRecord.projectGroupId },
                        create: {
                          name: projectRecord.projectGroup!.name,
                          createdAt: projectRecord.projectGroup!.createdAt,
                          updatedAt: projectRecord.projectGroup!.updatedAt,
                          owner: {
                            connect: {
                              id: projectRecord.projectGroupOwnerId,
                            },
                          },
                        },
                      },
                    },
                  },
                },
                tx,
              );
            } else if (tableName === 'projectGroup' && 'id' in record) {
              const projectGroupRecord =
                record as ProjectGroupOperationRecordDto;

              await this.projectGroupService.updateProjectGroup(
                {
                  where: { id: record.id },
                  data: {
                    name: projectGroupRecord.name,
                    createdAt: projectGroupRecord.createdAt,
                    updatedAt: projectGroupRecord.updatedAt,
                    parentGroup: {
                      connectOrCreate: {
                        where: { id: projectGroupRecord.parentGroupId },
                        create: {
                          name: projectGroupRecord.parentGroup!.name,
                          createdAt: projectGroupRecord.parentGroup!.createdAt,
                          updatedAt: projectGroupRecord.parentGroup!.updatedAt,
                          owner: {
                            connect: {
                              id: projectGroupRecord.parentGroupOwnerId,
                            },
                          },
                        },
                      },
                    },
                    owner: {
                      connect: {
                        id: projectGroupRecord.ownerId,
                      },
                    },
                  },
                },
                tx,
              );
            }
            break;

          case OperationType.DELETE_RECORD:
            if (tableName === 'project') {
              await this.projectService.deleteProject({ id: record.id }, tx);
            } else if (tableName === 'projectGroup' && 'id' in record) {
              await this.projectGroupService.deleteProjectGroup(
                { id: record.id },
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
}
