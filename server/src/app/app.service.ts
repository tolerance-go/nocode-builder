import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { App, Prisma } from '@prisma/client';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async app(
    postWhereUniqueInput: Prisma.AppWhereUniqueInput,
  ): Promise<App | null> {
    return this.prisma.app.findUnique({
      where: postWhereUniqueInput,
    });
  }

  async posts(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.AppWhereUniqueInput;
    where?: Prisma.AppWhereInput;
    orderBy?: Prisma.AppOrderByWithRelationInput;
  }): Promise<App[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.app.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createApp(data: Prisma.AppCreateInput): Promise<App> {
    return this.prisma.app.create({
      data,
    });
  }

  async updateApp(params: {
    where: Prisma.AppWhereUniqueInput;
    data: Prisma.AppUpdateInput;
  }): Promise<App> {
    const { data, where } = params;
    return this.prisma.app.update({
      data,
      where,
    });
  }

  async deleteApp(where: Prisma.AppWhereUniqueInput): Promise<App> {
    return this.prisma.app.delete({
      where,
    });
  }
}
