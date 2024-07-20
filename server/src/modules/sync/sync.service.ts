import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ProjectGroupService } from 'src/modules/project-group/project-group.service';
import { ProjectService } from 'src/modules/project/project.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProjectCreateDto } from '../project/dtos';
import { ProjectDiffDto, ProjectGroupCreateWithChildrenDto } from './dtos';

@Injectable()
export class SyncService {
  constructor(
    private prisma: PrismaService,
    private projectService: ProjectService,
    private projectGroupService: ProjectGroupService,
  ) {}

  async applyProjectDiff(diff: ProjectDiffDto, userId: number): Promise<void> {
    await this.prisma.$transaction(async (tx) => {
      if (diff.additions) {
        for (const additionGroup of diff.additions) {
          for (const addition of additionGroup) {
            await this.processAddition(addition, userId, tx);
          }
        }
      }

      // if (diff.projectsToUpdate) {
      //   for (const projectData of diff.projectsToUpdate) {
      //     const { id, projectGroupId, ...data } = projectData;
      //     await this.projectService.updateProject(
      //       {
      //         where: { id },
      //         data: {
      //           ...data,
      //           projectGroup: {
      //             connect: { id: projectGroupId },
      //           },
      //         },
      //       },
      //       tx,
      //     );
      //   }
      // }

      // if (diff.projectGroupsToUpdate) {
      //   for (const projectGroupData of diff.projectGroupsToUpdate) {
      //     const { id, parentGroupId, ...data } = projectGroupData;
      //     await this.projectGroupService.updateProjectGroup(
      //       {
      //         where: { id },
      //         data: {
      //           ...data,
      //           parentGroup: {
      //             connect: { id: parentGroupId },
      //           },
      //         },
      //       },
      //       tx,
      //     );
      //   }
      // }

      // if (diff.projectIdsToDelete) {
      //   for (const projectId of diff.projectIdsToDelete) {
      //     await this.projectService.deleteProject({ id: projectId }, tx);
      //   }
      // }

      // if (diff.projectGroupIdsToDelete) {
      //   for (const projectGroupId of diff.projectGroupIdsToDelete) {
      //     await this.projectGroupService.deleteProjectGroup(
      //       { id: projectGroupId },
      //       tx,
      //     );
      //   }
      // }
    });
  }

  private async processAddition(
    addition: ProjectGroupCreateWithChildrenDto | ProjectCreateDto,
    userId: number,
    tx: Prisma.TransactionClient,
    parentGroupId?: number,
  ): Promise<void> {
    if ('children' in addition && addition.children) {
      const { children, ...data } =
        addition as ProjectGroupCreateWithChildrenDto;
      const projectGroup = await this.projectGroupService.createProjectGroup(
        {
          ...data,
          owner: {
            connect: { id: userId },
          },
          parentGroup: parentGroupId
            ? { connect: { id: parentGroupId } }
            : undefined,
        },
        tx,
      );

      if (children) {
        for (const child of children) {
          await this.processAddition(child, userId, tx, projectGroup.id);
        }
      }
    } else {
      const project = addition as ProjectCreateDto;
      await this.projectService.createProject(
        {
          ...project,
          projectGroup: parentGroupId
            ? {
                connect: { id: parentGroupId },
              }
            : undefined,
          owner: {
            connect: { id: userId },
          },
          type: project.type,
        },
        tx,
      );
    }
  }
}
