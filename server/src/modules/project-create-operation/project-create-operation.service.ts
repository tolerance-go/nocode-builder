import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ProjectCreateOperation, Prisma } from '@prisma/client';

@Injectable()
export class ProjectCreateOperationService {
  constructor(private prisma: PrismaService) {}

  async projectCreateOperation(
    projectCreateOperationWhereUniqueInput: Prisma.ProjectCreateOperationWhereUniqueInput,
  ): Promise<ProjectCreateOperation | null> {
    return this.prisma.projectCreateOperation.findUnique({
      where: projectCreateOperationWhereUniqueInput,
    });
  }

  async projectCreateOperations(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ProjectCreateOperationWhereUniqueInput;
    where?: Prisma.ProjectCreateOperationWhereInput;
    orderBy?: Prisma.ProjectCreateOperationOrderByWithRelationInput;
  }): Promise<ProjectCreateOperation[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.projectCreateOperation.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createProjectCreateOperation(
    data: Prisma.ProjectCreateOperationCreateInput,
  ): Promise<ProjectCreateOperation> {
    return this.prisma.projectCreateOperation.create({
      data,
    });
  }

  async updateProjectCreateOperation(params: {
    where: Prisma.ProjectCreateOperationWhereUniqueInput;
    data: Prisma.ProjectCreateOperationUpdateInput;
  }): Promise<ProjectCreateOperation> {
    const { where, data } = params;
    return this.prisma.projectCreateOperation.update({
      data,
      where,
    });
  }

  async deleteProjectCreateOperation(
    where: Prisma.ProjectCreateOperationWhereUniqueInput,
  ): Promise<ProjectCreateOperation> {
    return this.prisma.projectCreateOperation.delete({
      where,
    });
  }
}
