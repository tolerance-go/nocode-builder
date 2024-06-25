import { Injectable } from '@nestjs/common';
import { Project, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  async app(
    postWhereUniqueInput: Prisma.ProjectWhereUniqueInput,
  ): Promise<Project | null> {
    return this.prisma.app.findUnique({
      where: postWhereUniqueInput,
    });
  }

  async apps(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ProjectWhereUniqueInput;
    where?: Prisma.ProjectWhereInput;
    orderBy?: Prisma.ProjectOrderByWithRelationInput;
  }): Promise<Project[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.app.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createProject(data: Prisma.ProjectCreateInput): Promise<Project> {
    return this.prisma.app.create({
      data,
    });
  }

  async updateProject(params: {
    where: Prisma.ProjectWhereUniqueInput;
    data: Prisma.ProjectUpdateInput;
  }): Promise<Project> {
    const { data, where } = params;
    return this.prisma.app.update({
      data,
      where,
    });
  }

  async deleteProject(where: Prisma.ProjectWhereUniqueInput): Promise<Project> {
    return this.prisma.app.delete({
      where,
    });
  }
}
