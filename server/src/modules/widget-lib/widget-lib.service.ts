import { HttpException, Injectable } from '@nestjs/common';
import { Prisma, WidgetLib } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WidgetLibService {
  constructor(private prisma: PrismaService) {}

  async widgetLib(
    postWhereUniqueInput: Prisma.WidgetLibWhereUniqueInput,
    tx?: Prisma.TransactionClient,
  ): Promise<WidgetLib | null> {
    const client = tx || this.prisma;
    return client.widgetLib.findUnique({
      where: postWhereUniqueInput,
    });
  }

  async widgetLibs(
    params: {
      skip?: number;
      take?: number;
      cursor?: Prisma.WidgetLibWhereUniqueInput;
      where?: Prisma.WidgetLibWhereInput;
      orderBy?: Prisma.WidgetLibOrderByWithRelationInput;
    },
    tx?: Prisma.TransactionClient,
  ): Promise<WidgetLib[]> {
    const { skip, take, cursor, where, orderBy } = params;
    const client = tx || this.prisma;
    return client.widgetLib.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createWidgetLib(
    data: Prisma.WidgetLibCreateInput,
    tx?: Prisma.TransactionClient,
  ): Promise<WidgetLib> {
    try {
      const client = tx || this.prisma;
      const widgetLib = await client.widgetLib.create({
        data,
      });
      return widgetLib;
    } catch (error) {
      throw new HttpException(`创建项目失败：${error.message}`, 500);
    }
  }

  async updateWidgetLib(
    params: {
      where: Prisma.WidgetLibWhereUniqueInput;
      data: Prisma.WidgetLibUpdateInput;
    },
    tx?: Prisma.TransactionClient,
  ): Promise<WidgetLib> {
    const { data, where } = params;
    const client = tx || this.prisma;
    return client.widgetLib.update({
      data,
      where,
    });
  }

  async deleteWidgetLib(
    where: Prisma.WidgetLibWhereUniqueInput,
    tx?: Prisma.TransactionClient,
  ): Promise<WidgetLib> {
    const client = tx || this.prisma;
    return client.widgetLib.delete({
      where,
    });
  }

  async clearWidgetLibs(
    tx?: Prisma.TransactionClient,
  ): Promise<{ count: number }> {
    const client = tx || this.prisma;
    try {
      const result = await client.widgetLib.deleteMany({});
      return { count: result.count };
    } catch (error) {
      throw new HttpException(`清空项目失败：${error.message}`, 500);
    }
  }
}
