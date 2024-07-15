import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProjectDiffDto } from './dtos';
import { ProjectService } from 'src/modules/project/project.service';
import { ProjectGroupService } from 'src/modules/project-group/project-group.service';

@Injectable()
export class SyncService {
  constructor(
    private prisma: PrismaService,
    private projectService: ProjectService,
    private projectGroupService: ProjectGroupService,
  ) {}

  async applyProjectDiff(diff: ProjectDiffDto, userId: number): Promise<void> {
    await this.prisma.$transaction(async (tx) => {
      if (diff.projectsToCreate) {
        for (const projectData of diff.projectsToCreate) {
          await this.projectService.createProject(
            {
              ...projectData,
              projectGroup: {
                connect: { id: projectData.projectGroupId },
              },
              owner: {
                connect: { id: userId },
              },
            },
            tx,
          );
        }
      }

      if (diff.projectGroupsToCreate) {
        for (const projectGroupData of diff.projectGroupsToCreate) {
          const { parentGroupId, ...data } = projectGroupData;
          await this.projectGroupService.createProjectGroup(
            {
              ...data,
              owner: {
                connect: { id: userId },
              },
              parentGroup: {
                connect: { id: parentGroupId },
              },
            },
            tx,
          );
        }
      }

      if (diff.projectsToUpdate) {
        for (const projectData of diff.projectsToUpdate) {
          const { id, projectGroupId, ...data } = projectData;
          await this.projectService.updateProject(
            {
              where: { id },
              data: {
                ...data,
                projectGroup: {
                  connect: { id: projectGroupId },
                },
              },
            },
            tx,
          );
        }
      }

      if (diff.projectGroupsToUpdate) {
        for (const projectGroupData of diff.projectGroupsToUpdate) {
          const { id, parentGroupId, ...data } = projectGroupData;
          await this.projectGroupService.updateProjectGroup(
            {
              where: { id },
              data: {
                ...data,
                parentGroup: {
                  connect: { id: parentGroupId },
                },
              },
            },
            tx,
          );
        }
      }

      if (diff.projectIdsToDelete) {
        for (const projectId of diff.projectIdsToDelete) {
          await this.projectService.deleteProject({ id: projectId }, tx);
        }
      }

      if (diff.projectGroupIdsToDelete) {
        for (const projectGroupId of diff.projectGroupIdsToDelete) {
          await this.projectGroupService.deleteProjectGroup(
            { id: projectGroupId },
            tx,
          );
        }
      }
    });
  }
}
