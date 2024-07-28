import { HttpException, Injectable } from '@nestjs/common';
import { Prisma, ProjectGroup } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ProjectGroupService {
  constructor(private prisma: PrismaService) {}

  async projectGroup(
    projectGroupWhereUniqueInput: Prisma.ProjectGroupWhereUniqueInput,
    tx?: Prisma.TransactionClient,
  ): Promise<ProjectGroup | null> {
    const client = tx || this.prisma;
    return client.projectGroup.findUnique({
      where: projectGroupWhereUniqueInput,
    });
  }

  async projectGroups(
    params: {
      skip?: number;
      take?: number;
      cursor?: Prisma.ProjectGroupWhereUniqueInput;
      where?: Prisma.ProjectGroupWhereInput;
      orderBy?: Prisma.ProjectGroupOrderByWithRelationInput;
    },
    tx?: Prisma.TransactionClient,
  ): Promise<ProjectGroup[]> {
    const { skip, take, cursor, where, orderBy } = params;
    const client = tx || this.prisma;
    return client.projectGroup.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createProjectGroup(
    data: Prisma.ProjectGroupCreateInput,
    tx?: Prisma.TransactionClient,
  ): Promise<ProjectGroup> {
    const client = tx || this.prisma;
    return client.projectGroup.create({
      data,
    });
  }

  async updateProjectGroup(
    params: {
      where: Prisma.ProjectGroupWhereUniqueInput;
      data: Prisma.ProjectGroupUpdateInput;
    },
    tx?: Prisma.TransactionClient,
  ): Promise<ProjectGroup> {
    const { where, data } = params;
    const client = tx || this.prisma;
    return client.projectGroup.update({
      data,
      where,
    });
  }

  async deleteProjectGroup(
    where: Prisma.ProjectGroupWhereUniqueInput,
    tx?: Prisma.TransactionClient,
  ): Promise<ProjectGroup> {
    const client = tx || this.prisma;
    return client.projectGroup.delete({
      where,
    });
  }

  async clearProjectGroups(
    tx?: Prisma.TransactionClient,
  ): Promise<{ count: number }> {
    const client = tx || this.prisma;
    try {
      const result = await client.projectGroup.deleteMany({});
      return { count: result.count };
    } catch (error) {
      throw new HttpException(`清空项目组失败：${error.message}`, 500);
    }
  }
}
