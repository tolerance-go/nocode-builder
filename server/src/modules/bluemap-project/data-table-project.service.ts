import { HttpException, Injectable } from '@nestjs/common';
import { Prisma, BluemapProject } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BluemapProjectService {
  constructor(private prisma: PrismaService) {}

  async bluemapProject(
    postWhereUniqueInput: Prisma.BluemapProjectWhereUniqueInput,
    tx?: Prisma.TransactionClient,
  ): Promise<BluemapProject | null> {
    const client = tx || this.prisma;
    return client.bluemapProject.findUnique({
      where: postWhereUniqueInput,
    });
  }

  async bluemapProjects(
    params: {
      skip?: number;
      take?: number;
      cursor?: Prisma.BluemapProjectWhereUniqueInput;
      where?: Prisma.BluemapProjectWhereInput;
      orderBy?: Prisma.BluemapProjectOrderByWithRelationInput;
    },
    tx?: Prisma.TransactionClient,
  ): Promise<BluemapProject[]> {
    const { skip, take, cursor, where, orderBy } = params;
    const client = tx || this.prisma;
    return client.bluemapProject.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createBluemapProject(
    data: Prisma.BluemapProjectCreateInput,
    tx?: Prisma.TransactionClient,
  ): Promise<BluemapProject> {
    try {
      const client = tx || this.prisma;
      const bluemapProject = await client.bluemapProject.create({
        data,
      });
      return bluemapProject;
    } catch (error) {
      throw new HttpException(`创建项目失败：${error.message}`, 500);
    }
  }

  async updateBluemapProject(
    params: {
      where: Prisma.BluemapProjectWhereUniqueInput;
      data: Prisma.BluemapProjectUpdateInput;
    },
    tx?: Prisma.TransactionClient,
  ): Promise<BluemapProject> {
    const { data, where } = params;
    const client = tx || this.prisma;
    return client.bluemapProject.update({
      data,
      where,
    });
  }

  async deleteBluemapProject(
    where: Prisma.BluemapProjectWhereUniqueInput,
    tx?: Prisma.TransactionClient,
  ): Promise<BluemapProject> {
    const client = tx || this.prisma;
    return client.bluemapProject.delete({
      where,
    });
  }

  async clearBluemapProjects(
    tx?: Prisma.TransactionClient,
  ): Promise<{ count: number }> {
    const client = tx || this.prisma;
    try {
      const result = await client.bluemapProject.deleteMany({});
      return { count: result.count };
    } catch (error) {
      throw new HttpException(`清空项目失败：${error.message}`, 500);
    }
  }

  // 获取下一个 BluemapProjectGroup 的 ID
  async getNextBluemapProjectId(
    tx?: Prisma.TransactionClient,
  ): Promise<number> {
    const client = tx || this.prisma;
    const lastBluemapProject = await client.bluemapProject.findFirst({
      orderBy: {
        id: 'desc',
      },
    });

    return lastBluemapProject ? lastBluemapProject.id + 1 : 1;
  }
}
