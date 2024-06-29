import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ProjectGroupOperation, Prisma } from '@prisma/client';

@Injectable()
export class ProjectGroupOperationService {
  constructor(private prisma: PrismaService) {}

  async projectGroupOperation(
    projectGroupOperationWhereUniqueInput: Prisma.ProjectGroupOperationWhereUniqueInput,
  ): Promise<ProjectGroupOperation | null> {
    return this.prisma.projectGroupOperation.findUnique({
      where: projectGroupOperationWhereUniqueInput,
    });
  }

  async projectGroupOperations(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ProjectGroupOperationWhereUniqueInput;
    where?: Prisma.ProjectGroupOperationWhereInput;
    orderBy?: Prisma.ProjectGroupOperationOrderByWithRelationInput;
  }): Promise<ProjectGroupOperation[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.projectGroupOperation.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createProjectGroupOperation(
    data: Prisma.ProjectGroupOperationCreateInput,
  ): Promise<ProjectGroupOperation> {
    return this.prisma.projectGroupOperation.create({
      data,
    });
  }

  async updateProjectGroupOperation(params: {
    where: Prisma.ProjectGroupOperationWhereUniqueInput;
    data: Prisma.ProjectGroupOperationUpdateInput;
  }): Promise<ProjectGroupOperation> {
    const { where, data } = params;
    return this.prisma.projectGroupOperation.update({
      data,
      where,
    });
  }

  async deleteProjectGroupOperation(
    where: Prisma.ProjectGroupOperationWhereUniqueInput,
  ): Promise<ProjectGroupOperation> {
    return this.prisma.projectGroupOperation.delete({
      where,
    });
  }
}
