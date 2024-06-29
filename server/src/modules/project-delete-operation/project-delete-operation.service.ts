import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ProjectDeleteOperation, Prisma } from '@prisma/client';

@Injectable()
export class ProjectDeleteOperationService {
  constructor(private prisma: PrismaService) {}

  async projectDeleteOperation(
    projectDeleteOperationWhereUniqueInput: Prisma.ProjectDeleteOperationWhereUniqueInput,
  ): Promise<ProjectDeleteOperation | null> {
    return this.prisma.projectDeleteOperation.findUnique({
      where: projectDeleteOperationWhereUniqueInput,
    });
  }

  async projectDeleteOperations(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ProjectDeleteOperationWhereUniqueInput;
    where?: Prisma.ProjectDeleteOperationWhereInput;
    orderBy?: Prisma.ProjectDeleteOperationOrderByWithRelationInput;
  }): Promise<ProjectDeleteOperation[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.projectDeleteOperation.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createProjectDeleteOperation(
    data: Prisma.ProjectDeleteOperationCreateInput,
  ): Promise<ProjectDeleteOperation> {
    return this.prisma.projectDeleteOperation.create({
      data,
    });
  }

  async updateProjectDeleteOperation(params: {
    where: Prisma.ProjectDeleteOperationWhereUniqueInput;
    data: Prisma.ProjectDeleteOperationUpdateInput;
  }): Promise<ProjectDeleteOperation> {
    const { where, data } = params;
    return this.prisma.projectDeleteOperation.update({
      data,
      where,
    });
  }

  async deleteProjectDeleteOperation(
    where: Prisma.ProjectDeleteOperationWhereUniqueInput,
  ): Promise<ProjectDeleteOperation> {
    return this.prisma.projectDeleteOperation.delete({
      where,
    });
  }
}
