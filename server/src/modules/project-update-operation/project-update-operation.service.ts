import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ProjectUpdateOperation, Prisma } from '@prisma/client';

@Injectable()
export class ProjectUpdateOperationService {
  constructor(private prisma: PrismaService) {}

  async projectUpdateOperation(
    projectUpdateOperationWhereUniqueInput: Prisma.ProjectUpdateOperationWhereUniqueInput,
  ): Promise<ProjectUpdateOperation | null> {
    return this.prisma.projectUpdateOperation.findUnique({
      where: projectUpdateOperationWhereUniqueInput,
    });
  }

  async projectUpdateOperations(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ProjectUpdateOperationWhereUniqueInput;
    where?: Prisma.ProjectUpdateOperationWhereInput;
    orderBy?: Prisma.ProjectUpdateOperationOrderByWithRelationInput;
  }): Promise<ProjectUpdateOperation[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.projectUpdateOperation.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createProjectUpdateOperation(
    data: Prisma.ProjectUpdateOperationCreateInput,
  ): Promise<ProjectUpdateOperation> {
    return this.prisma.projectUpdateOperation.create({
      data,
    });
  }

  async updateProjectUpdateOperation(params: {
    where: Prisma.ProjectUpdateOperationWhereUniqueInput;
    data: Prisma.ProjectUpdateOperationUpdateInput;
  }): Promise<ProjectUpdateOperation> {
    const { where, data } = params;
    return this.prisma.projectUpdateOperation.update({
      data,
      where,
    });
  }

  async deleteProjectUpdateOperation(
    where: Prisma.ProjectUpdateOperationWhereUniqueInput,
  ): Promise<ProjectUpdateOperation> {
    return this.prisma.projectUpdateOperation.delete({
      where,
    });
  }
}
