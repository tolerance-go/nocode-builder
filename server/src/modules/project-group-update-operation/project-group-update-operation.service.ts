import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ProjectGroupUpdateOperation, Prisma } from '@prisma/client';

@Injectable()
export class ProjectGroupUpdateOperationService {
  constructor(private prisma: PrismaService) {}

  async projectGroupUpdateOperation(
    projectGroupUpdateOperationWhereUniqueInput: Prisma.ProjectGroupUpdateOperationWhereUniqueInput,
  ): Promise<ProjectGroupUpdateOperation | null> {
    return this.prisma.projectGroupUpdateOperation.findUnique({
      where: projectGroupUpdateOperationWhereUniqueInput,
    });
  }

  async projectGroupUpdateOperations(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ProjectGroupUpdateOperationWhereUniqueInput;
    where?: Prisma.ProjectGroupUpdateOperationWhereInput;
    orderBy?: Prisma.ProjectGroupUpdateOperationOrderByWithRelationInput;
  }): Promise<ProjectGroupUpdateOperation[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.projectGroupUpdateOperation.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createProjectGroupUpdateOperation(
    data: Prisma.ProjectGroupUpdateOperationCreateInput,
  ): Promise<ProjectGroupUpdateOperation> {
    return this.prisma.projectGroupUpdateOperation.create({
      data,
    });
  }

  async updateProjectGroupUpdateOperation(params: {
    where: Prisma.ProjectGroupUpdateOperationWhereUniqueInput;
    data: Prisma.ProjectGroupUpdateOperationUpdateInput;
  }): Promise<ProjectGroupUpdateOperation> {
    const { where, data } = params;
    return this.prisma.projectGroupUpdateOperation.update({
      data,
      where,
    });
  }

  async deleteProjectGroupUpdateOperation(
    where: Prisma.ProjectGroupUpdateOperationWhereUniqueInput,
  ): Promise<ProjectGroupUpdateOperation> {
    return this.prisma.projectGroupUpdateOperation.delete({
      where,
    });
  }
}
