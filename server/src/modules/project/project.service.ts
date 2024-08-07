import { HttpException, Injectable } from '@nestjs/common';
import { Prisma, Project } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  async project(
    postWhereUniqueInput: Prisma.ProjectWhereUniqueInput,
    tx?: Prisma.TransactionClient,
  ): Promise<Project | null> {
    const client = tx || this.prisma;
    return client.project.findUnique({
      where: postWhereUniqueInput,
    });
  }

  async projects(
    params: {
      skip?: number;
      take?: number;
      cursor?: Prisma.ProjectWhereUniqueInput;
      where?: Prisma.ProjectWhereInput;
      orderBy?: Prisma.ProjectOrderByWithRelationInput;
    },
    tx?: Prisma.TransactionClient,
  ): Promise<Project[]> {
    const { skip, take, cursor, where, orderBy } = params;
    const client = tx || this.prisma;
    return client.project.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createProject(
    data: Prisma.ProjectCreateInput,
    tx?: Prisma.TransactionClient,
  ): Promise<Project> {
    try {
      const client = tx || this.prisma;
      const project = await client.project.create({
        data,
      });
      return project;
    } catch (error) {
      throw new HttpException(`创建项目失败：${error.message}`, 500);
    }
  }

  async updateProject(
    params: {
      where: Prisma.ProjectWhereUniqueInput;
      data: Prisma.ProjectUpdateInput;
    },
    tx?: Prisma.TransactionClient,
  ): Promise<Project> {
    const { data, where } = params;
    const client = tx || this.prisma;
    return client.project.update({
      data,
      where,
    });
  }

  async deleteProject(
    where: Prisma.ProjectWhereUniqueInput,
    tx?: Prisma.TransactionClient,
  ): Promise<Project> {
    const client = tx || this.prisma;
    return client.project.delete({
      where,
    });
  }

  async clearProjects(
    tx?: Prisma.TransactionClient,
  ): Promise<{ count: number }> {
    const client = tx || this.prisma;
    try {
      const result = await client.project.deleteMany({});
      return { count: result.count };
    } catch (error) {
      throw new HttpException(`清空项目失败：${error.message}`, 500);
    }
  }

  // 获取下一个 ProjectGroup 的 ID
  async getNextProjectId(tx?: Prisma.TransactionClient): Promise<number> {
    const client = tx || this.prisma;
    const lastProject = await client.project.findFirst({
      orderBy: {
        id: 'desc',
      },
    });

    return lastProject ? lastProject.id + 1 : 1;
  }
}
