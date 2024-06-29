import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ProjectOperation, Prisma } from '@prisma/client';

@Injectable()
export class ProjectOperationService {
  constructor(private prisma: PrismaService) {}

  async projectOperation(
    projectOperationWhereUniqueInput: Prisma.ProjectOperationWhereUniqueInput,
  ): Promise<ProjectOperation | null> {
    return this.prisma.projectOperation.findUnique({
      where: projectOperationWhereUniqueInput,
    });
  }

  async projectOperations(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ProjectOperationWhereUniqueInput;
    where?: Prisma.ProjectOperationWhereInput;
    orderBy?: Prisma.ProjectOperationOrderByWithRelationInput;
  }): Promise<ProjectOperation[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.projectOperation.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createProjectOperation(
    data: Prisma.ProjectOperationCreateInput,
  ): Promise<ProjectOperation> {
    return this.prisma.projectOperation.create({
      data,
    });
  }

  async updateProjectOperation(params: {
    where: Prisma.ProjectOperationWhereUniqueInput;
    data: Prisma.ProjectOperationUpdateInput;
  }): Promise<ProjectOperation> {
    const { where, data } = params;
    return this.prisma.projectOperation.update({
      data,
      where,
    });
  }

  async deleteProjectOperation(
    where: Prisma.ProjectOperationWhereUniqueInput,
  ): Promise<ProjectOperation> {
    return this.prisma.projectOperation.delete({
      where,
    });
  }
}
