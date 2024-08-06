import { HttpException, Injectable } from '@nestjs/common';
import { Prisma, WidgetProp } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WidgetPropService {
  constructor(private prisma: PrismaService) {}

  async widgetProp(
    postWhereUniqueInput: Prisma.WidgetPropWhereUniqueInput,
    tx?: Prisma.TransactionClient,
  ): Promise<WidgetProp | null> {
    const client = tx || this.prisma;
    return client.widgetProp.findUnique({
      where: postWhereUniqueInput,
    });
  }

  async widgetProps(
    params: {
      skip?: number;
      take?: number;
      cursor?: Prisma.WidgetPropWhereUniqueInput;
      where?: Prisma.WidgetPropWhereInput;
      orderBy?: Prisma.WidgetPropOrderByWithRelationInput;
    },
    tx?: Prisma.TransactionClient,
  ): Promise<WidgetProp[]> {
    const { skip, take, cursor, where, orderBy } = params;
    const client = tx || this.prisma;
    return client.widgetProp.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createWidgetProp(
    data: Prisma.WidgetPropCreateInput,
    tx?: Prisma.TransactionClient,
  ): Promise<WidgetProp> {
    try {
      const client = tx || this.prisma;
      const widgetProp = await client.widgetProp.create({
        data,
      });
      return widgetProp;
    } catch (error) {
      throw new HttpException(`创建项目失败：${error.message}`, 500);
    }
  }

  async updateWidgetProp(
    params: {
      where: Prisma.WidgetPropWhereUniqueInput;
      data: Prisma.WidgetPropUpdateInput;
    },
    tx?: Prisma.TransactionClient,
  ): Promise<WidgetProp> {
    const { data, where } = params;
    const client = tx || this.prisma;
    return client.widgetProp.update({
      data,
      where,
    });
  }

  async deleteWidgetProp(
    where: Prisma.WidgetPropWhereUniqueInput,
    tx?: Prisma.TransactionClient,
  ): Promise<WidgetProp> {
    const client = tx || this.prisma;
    return client.widgetProp.delete({
      where,
    });
  }

  async clearWidgetProps(
    tx?: Prisma.TransactionClient,
  ): Promise<{ count: number }> {
    const client = tx || this.prisma;
    try {
      const result = await client.widgetProp.deleteMany({});
      return { count: result.count };
    } catch (error) {
      throw new HttpException(`清空项目失败：${error.message}`, 500);
    }
  }

  // 获取下一个 WidgetPropGroup 的 ID
  async getNextWidgetPropId(tx?: Prisma.TransactionClient): Promise<number> {
    const client = tx || this.prisma;
    const lastWidgetProp = await client.widgetProp.findFirst({
      orderBy: {
        id: 'desc',
      },
    });

    return lastWidgetProp ? lastWidgetProp.id + 1 : 1;
  }
}
