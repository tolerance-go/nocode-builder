import { HttpException, Injectable } from '@nestjs/common';
import { Prisma, ViewProject } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ViewProjectService {
  constructor(private prisma: PrismaService) {}

  async viewProject(
    postWhereUniqueInput: Prisma.ViewProjectWhereUniqueInput,
    tx?: Prisma.TransactionClient,
  ): Promise<ViewProject | null> {
    const client = tx || this.prisma;
    return client.viewProject.findUnique({
      where: postWhereUniqueInput,
    });
  }

  async viewProjects(
    params: {
      skip?: number;
      take?: number;
      cursor?: Prisma.ViewProjectWhereUniqueInput;
      where?: Prisma.ViewProjectWhereInput;
      orderBy?: Prisma.ViewProjectOrderByWithRelationInput;
    },
    tx?: Prisma.TransactionClient,
  ): Promise<ViewProject[]> {
    const { skip, take, cursor, where, orderBy } = params;
    const client = tx || this.prisma;
    return client.viewProject.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createViewProject(
    data: Prisma.ViewProjectCreateInput,
    tx?: Prisma.TransactionClient,
  ): Promise<ViewProject> {
    try {
      const client = tx || this.prisma;
      const viewProject = await client.viewProject.create({
        data,
      });
      return viewProject;
    } catch (error) {
      throw new HttpException(`创建项目失败：${error.message}`, 500);
    }
  }

  async updateViewProject(
    params: {
      where: Prisma.ViewProjectWhereUniqueInput;
      data: Prisma.ViewProjectUpdateInput;
    },
    tx?: Prisma.TransactionClient,
  ): Promise<ViewProject> {
    const { data, where } = params;
    const client = tx || this.prisma;
    return client.viewProject.update({
      data,
      where,
    });
  }

  async deleteViewProject(
    where: Prisma.ViewProjectWhereUniqueInput,
    tx?: Prisma.TransactionClient,
  ): Promise<ViewProject> {
    const client = tx || this.prisma;
    return client.viewProject.delete({
      where,
    });
  }

  async clearViewProjects(
    tx?: Prisma.TransactionClient,
  ): Promise<{ count: number }> {
    const client = tx || this.prisma;
    try {
      const result = await client.viewProject.deleteMany({});
      return { count: result.count };
    } catch (error) {
      throw new HttpException(`清空项目失败：${error.message}`, 500);
    }
  }

  // 获取下一个 ViewProjectGroup 的 ID
  async getNextViewProjectId(tx?: Prisma.TransactionClient): Promise<number> {
    const client = tx || this.prisma;
    const lastViewProject = await client.viewProject.findFirst({
      orderBy: {
        id: 'desc',
      },
    });

    return lastViewProject ? lastViewProject.id + 1 : 1;
  }
}
