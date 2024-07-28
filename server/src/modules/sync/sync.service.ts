import { Injectable } from '@nestjs/common';
import { ProjectGroupService } from 'src/modules/project-group/project-group.service';
import { ProjectService } from 'src/modules/project/project.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { OperationsDto } from './dtos';
import { OperationType } from 'src/common/enums/operation-type';
import { ProjectResponseDto } from '../project/dtos';
import { Project } from '@prisma/client';

@Injectable()
export class SyncService {
  constructor(
    private prisma: PrismaService,
    private projectService: ProjectService,
    private projectGroupService: ProjectGroupService,
  ) {}

  async applyOperations(
    operations: OperationsDto[],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _userId: number,
  ): Promise<void> {
    await this.prisma.$transaction(async (tx) => {
      for (const operation of operations) {
        const { record, operation: operationType, tableName } = operation;

        switch (operationType) {
          case OperationType.ADD_RECORD:
            if (tableName === 'project') {
              const projectResponseRecord = record as Project;
              await this.projectService.createProject(
                {
                  ...projectResponseRecord,
                  owner: {
                    connect: {
                      id: projectResponseRecord.ownerId,
                    },
                  },
                },
                tx,
              );
            } else if (tableName === 'projectGroup') {
              await this.projectGroupService.createProjectGroup(record, tx);
            }
            break;

          case OperationType.UPDATE_RECORD:
            if (tableName === 'project' && 'id' in record) {
              await this.projectService.updateProject(
                { where: { id: record.id }, data: record },
                tx,
              );
            } else if (tableName === 'projectGroup' && 'id' in record) {
              await this.projectGroupService.updateProjectGroup(
                { where: { id: record.id }, data: record },
                tx,
              );
            }
            break;

          case OperationType.DELETE_RECORD:
            if (tableName === 'project' && 'id' in record) {
              await this.projectService.deleteProject({ id: record.id }, tx);
            } else if (tableName === 'projectGroup' && 'id' in record) {
              await this.projectGroupService.deleteProjectGroup(
                { id: record.id },
                tx,
              );
            }
            break;

          case OperationType.CLEAR_RECORDS:
            // 实现清除记录的逻辑
            break;

          default:
            throw new Error(`未知的操作类型: ${operationType}`);
        }
      }
    });
  }
}
