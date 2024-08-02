import { HttpException, Injectable } from '@nestjs/common';
import { Prisma, DataTableProject } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DataTableProjectService {
  constructor(private prisma: PrismaService) {}

  async dataTableProject(
    postWhereUniqueInput: Prisma.DataTableProjectWhereUniqueInput,
    tx?: Prisma.TransactionClient,
  ): Promise<DataTableProject | null> {
    const client = tx || this.prisma;
    return client.dataTableProject.findUnique({
      where: postWhereUniqueInput,
    });
  }

  async dataTableProjects(
    params: {
      skip?: number;
      take?: number;
      cursor?: Prisma.DataTableProjectWhereUniqueInput;
      where?: Prisma.DataTableProjectWhereInput;
      orderBy?: Prisma.DataTableProjectOrderByWithRelationInput;
    },
    tx?: Prisma.TransactionClient,
  ): Promise<DataTableProject[]> {
    const { skip, take, cursor, where, orderBy } = params;
    const client = tx || this.prisma;
    return client.dataTableProject.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createDataTableProject(
    data: Prisma.DataTableProjectCreateInput,
    tx?: Prisma.TransactionClient,
  ): Promise<DataTableProject> {
    try {
      const client = tx || this.prisma;
      const dataTableProject = await client.dataTableProject.create({
        data,
      });
      return dataTableProject;
    } catch (error) {
      throw new HttpException(`创建项目失败：${error.message}`, 500);
    }
  }

  async updateDataTableProject(
    params: {
      where: Prisma.DataTableProjectWhereUniqueInput;
      data: Prisma.DataTableProjectUpdateInput;
    },
    tx?: Prisma.TransactionClient,
  ): Promise<DataTableProject> {
    const { data, where } = params;
    const client = tx || this.prisma;
    return client.dataTableProject.update({
      data,
      where,
    });
  }

  async deleteDataTableProject(
    where: Prisma.DataTableProjectWhereUniqueInput,
    tx?: Prisma.TransactionClient,
  ): Promise<DataTableProject> {
    const client = tx || this.prisma;
    return client.dataTableProject.delete({
      where,
    });
  }

  async clearDataTableProjects(
    tx?: Prisma.TransactionClient,
  ): Promise<{ count: number }> {
    const client = tx || this.prisma;
    try {
      const result = await client.dataTableProject.deleteMany({});
      return { count: result.count };
    } catch (error) {
      throw new HttpException(`清空项目失败：${error.message}`, 500);
    }
  }

  // 获取下一个 DataTableProjectGroup 的 ID
  async getNextDataTableProjectId(
    tx?: Prisma.TransactionClient,
  ): Promise<number> {
    const client = tx || this.prisma;
    const lastDataTableProject = await client.dataTableProject.findFirst({
      orderBy: {
        id: 'desc',
      },
    });

    return lastDataTableProject ? lastDataTableProject.id + 1 : 1;
  }
}
