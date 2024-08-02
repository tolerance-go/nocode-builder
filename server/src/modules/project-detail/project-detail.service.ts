import { HttpException, Injectable } from '@nestjs/common';
import { Prisma, ProjectDetail } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProjectDetailService {
  constructor(private prisma: PrismaService) {}

  async projectDetail(
    postWhereUniqueInput: Prisma.ProjectDetailWhereUniqueInput,
    tx?: Prisma.TransactionClient,
  ): Promise<ProjectDetail | null> {
    const client = tx || this.prisma;
    return client.projectDetail.findUnique({
      where: postWhereUniqueInput,
    });
  }

  async projectDetails(
    params: {
      skip?: number;
      take?: number;
      cursor?: Prisma.ProjectDetailWhereUniqueInput;
      where?: Prisma.ProjectDetailWhereInput;
      orderBy?: Prisma.ProjectDetailOrderByWithRelationInput;
    },
    tx?: Prisma.TransactionClient,
  ): Promise<ProjectDetail[]> {
    const { skip, take, cursor, where, orderBy } = params;
    const client = tx || this.prisma;
    return client.projectDetail.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createProjectDetail(
    data: Prisma.ProjectDetailCreateInput,
    tx?: Prisma.TransactionClient,
  ): Promise<ProjectDetail> {
    try {
      const client = tx || this.prisma;
      const projectDetail = await client.projectDetail.create({
        data,
      });
      return projectDetail;
    } catch (error) {
      throw new HttpException(`创建项目失败：${error.message}`, 500);
    }
  }

  async updateProjectDetail(
    params: {
      where: Prisma.ProjectDetailWhereUniqueInput;
      data: Prisma.ProjectDetailUpdateInput;
    },
    tx?: Prisma.TransactionClient,
  ): Promise<ProjectDetail> {
    const { data, where } = params;
    const client = tx || this.prisma;
    return client.projectDetail.update({
      data,
      where,
    });
  }

  async deleteProjectDetail(
    where: Prisma.ProjectDetailWhereUniqueInput,
    tx?: Prisma.TransactionClient,
  ): Promise<ProjectDetail> {
    const client = tx || this.prisma;
    return client.projectDetail.delete({
      where,
    });
  }

  async clearProjectDetails(
    tx?: Prisma.TransactionClient,
  ): Promise<{ count: number }> {
    const client = tx || this.prisma;
    try {
      const result = await client.projectDetail.deleteMany({});
      return { count: result.count };
    } catch (error) {
      throw new HttpException(`清空项目失败：${error.message}`, 500);
    }
  }

  // 获取下一个 ProjectDetailGroup 的 ID
  async getNextProjectDetailId(tx?: Prisma.TransactionClient): Promise<number> {
    const client = tx || this.prisma;
    const lastProjectDetail = await client.projectDetail.findFirst({
      orderBy: {
        id: 'desc',
      },
    });

    return lastProjectDetail ? lastProjectDetail.id + 1 : 1;
  }
}
