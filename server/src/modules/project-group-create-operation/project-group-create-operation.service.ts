import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ProjectGroupCreateOperation, Prisma } from '@prisma/client';

@Injectable()
export class ProjectGroupCreateOperationService {
  constructor(private prisma: PrismaService) {}

  async projectGroupCreateOperation(
    projectGroupCreateOperationWhereUniqueInput: Prisma.ProjectGroupCreateOperationWhereUniqueInput,
  ): Promise<ProjectGroupCreateOperation | null> {
    return this.prisma.projectGroupCreateOperation.findUnique({
      where: projectGroupCreateOperationWhereUniqueInput,
    });
  }

  async projectGroupCreateOperations(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ProjectGroupCreateOperationWhereUniqueInput;
    where?: Prisma.ProjectGroupCreateOperationWhereInput;
    orderBy?: Prisma.ProjectGroupCreateOperationOrderByWithRelationInput;
  }): Promise<ProjectGroupCreateOperation[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.projectGroupCreateOperation.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createProjectGroupCreateOperation(
    data: Prisma.ProjectGroupCreateOperationCreateInput,
  ): Promise<ProjectGroupCreateOperation> {
    return this.prisma.projectGroupCreateOperation.create({
      data,
    });
  }

  async updateProjectGroupCreateOperation(params: {
    where: Prisma.ProjectGroupCreateOperationWhereUniqueInput;
    data: Prisma.ProjectGroupCreateOperationUpdateInput;
  }): Promise<ProjectGroupCreateOperation> {
    const { where, data } = params;
    return this.prisma.projectGroupCreateOperation.update({
      data,
      where,
    });
  }

  async deleteProjectGroupCreateOperation(
    where: Prisma.ProjectGroupCreateOperationWhereUniqueInput,
  ): Promise<ProjectGroupCreateOperation> {
    return this.prisma.projectGroupCreateOperation.delete({
      where,
    });
  }
}
