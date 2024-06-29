import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ProjectGroup, Prisma } from '@prisma/client';

@Injectable()
export class ProjectGroupService {
  constructor(private prisma: PrismaService) {}

  async projectGroup(
    projectGroupWhereUniqueInput: Prisma.ProjectGroupWhereUniqueInput,
  ): Promise<ProjectGroup | null> {
    return this.prisma.projectGroup.findUnique({
      where: projectGroupWhereUniqueInput,
    });
  }

  async projectGroups(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ProjectGroupWhereUniqueInput;
    where?: Prisma.ProjectGroupWhereInput;
    orderBy?: Prisma.ProjectGroupOrderByWithRelationInput;
  }): Promise<ProjectGroup[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.projectGroup.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createProjectGroup(
    data: Prisma.ProjectGroupCreateInput,
  ): Promise<ProjectGroup> {
    return this.prisma.projectGroup.create({
      data,
    });
  }

  async updateProjectGroup(params: {
    where: Prisma.ProjectGroupWhereUniqueInput;
    data: Prisma.ProjectGroupUpdateInput;
  }): Promise<ProjectGroup> {
    const { where, data } = params;
    return this.prisma.projectGroup.update({
      data,
      where,
    });
  }

  async deleteProjectGroup(
    where: Prisma.ProjectGroupWhereUniqueInput,
  ): Promise<ProjectGroup> {
    return this.prisma.projectGroup.delete({
      where,
    });
  }
}
