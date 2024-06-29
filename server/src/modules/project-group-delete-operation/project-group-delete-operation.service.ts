import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ProjectGroupDeleteOperation, Prisma } from '@prisma/client';

@Injectable()
export class ProjectGroupDeleteOperationService {
  constructor(private prisma: PrismaService) {}

  async projectGroupDeleteOperation(
    projectGroupDeleteOperationWhereUniqueInput: Prisma.ProjectGroupDeleteOperationWhereUniqueInput,
  ): Promise<ProjectGroupDeleteOperation | null> {
    return this.prisma.projectGroupDeleteOperation.findUnique({
      where: projectGroupDeleteOperationWhereUniqueInput,
    });
  }

  async projectGroupDeleteOperations(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ProjectGroupDeleteOperationWhereUniqueInput;
    where?: Prisma.ProjectGroupDeleteOperationWhereInput;
    orderBy?: Prisma.ProjectGroupDeleteOperationOrderByWithRelationInput;
  }): Promise<ProjectGroupDeleteOperation[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.projectGroupDeleteOperation.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createProjectGroupDeleteOperation(
    data: Prisma.ProjectGroupDeleteOperationCreateInput,
  ): Promise<ProjectGroupDeleteOperation> {
    return this.prisma.projectGroupDeleteOperation.create({
      data,
    });
  }

  async updateProjectGroupDeleteOperation(params: {
    where: Prisma.ProjectGroupDeleteOperationWhereUniqueInput;
    data: Prisma.ProjectGroupDeleteOperationUpdateInput;
  }): Promise<ProjectGroupDeleteOperation> {
    const { where, data } = params;
    return this.prisma.projectGroupDeleteOperation.update({
      data,
      where,
    });
  }

  async deleteProjectGroupDeleteOperation(
    where: Prisma.ProjectGroupDeleteOperationWhereUniqueInput,
  ): Promise<ProjectGroupDeleteOperation> {
    return this.prisma.projectGroupDeleteOperation.delete({
      where,
    });
  }
}
