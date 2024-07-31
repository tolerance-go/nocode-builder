import { HttpException, Injectable } from '@nestjs/common';
import { Prisma, WidgetSlot } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WidgetSlotService {
  constructor(private prisma: PrismaService) {}

  async widgetSlot(
    postWhereUniqueInput: Prisma.WidgetSlotWhereUniqueInput,
    tx?: Prisma.TransactionClient,
  ): Promise<WidgetSlot | null> {
    const client = tx || this.prisma;
    return client.widgetSlot.findUnique({
      where: postWhereUniqueInput,
    });
  }

  async widgetSlots(
    params: {
      skip?: number;
      take?: number;
      cursor?: Prisma.WidgetSlotWhereUniqueInput;
      where?: Prisma.WidgetSlotWhereInput;
      orderBy?: Prisma.WidgetSlotOrderByWithRelationInput;
    },
    tx?: Prisma.TransactionClient,
  ): Promise<WidgetSlot[]> {
    const { skip, take, cursor, where, orderBy } = params;
    const client = tx || this.prisma;
    return client.widgetSlot.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createWidgetSlot(
    data: Prisma.WidgetSlotCreateInput,
    tx?: Prisma.TransactionClient,
  ): Promise<WidgetSlot> {
    try {
      const client = tx || this.prisma;
      const widgetSlot = await client.widgetSlot.create({
        data,
      });
      return widgetSlot;
    } catch (error) {
      throw new HttpException(`创建项目失败：${error.message}`, 500);
    }
  }

  async createWidgetSlots(
    data: Prisma.WidgetSlotCreateManyInput[],
    tx?: Prisma.TransactionClient,
  ): Promise<{ count: number }> {
    try {
      const client = tx || this.prisma;
      const result = await client.widgetSlot.createMany({
        data,
      });
      return { count: result.count };
    } catch (error) {
      throw new HttpException(`批量创建项目失败：${error.message}`, 500);
    }
  }

  async updateWidgetSlot(
    params: {
      where: Prisma.WidgetSlotWhereUniqueInput;
      data: Prisma.WidgetSlotUpdateInput;
    },
    tx?: Prisma.TransactionClient,
  ): Promise<WidgetSlot> {
    const { data, where } = params;
    const client = tx || this.prisma;
    return client.widgetSlot.update({
      data,
      where,
    });
  }

  async deleteWidgetSlot(
    where: Prisma.WidgetSlotWhereUniqueInput,
    tx?: Prisma.TransactionClient,
  ): Promise<WidgetSlot> {
    const client = tx || this.prisma;
    return client.widgetSlot.delete({
      where,
    });
  }

  async clearWidgetSlots(
    tx?: Prisma.TransactionClient,
  ): Promise<{ count: number }> {
    const client = tx || this.prisma;
    try {
      const result = await client.widgetSlot.deleteMany({});
      return { count: result.count };
    } catch (error) {
      throw new HttpException(`清空项目失败：${error.message}`, 500);
    }
  }
}
