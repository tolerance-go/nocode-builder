import { HttpException, Injectable } from '@nestjs/common';
import {
  Prisma,
  Widget,
  WidgetLib,
  WidgetSlot,
  WidgetSlotAssignment,
} from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { WidgetAddSlotDto } from './dtos';

@Injectable()
export class WidgetService {
  constructor(private prisma: PrismaService) {}

  async widget(
    postWhereUniqueInput: Prisma.WidgetWhereUniqueInput,
    tx?: Prisma.TransactionClient,
  ): Promise<Widget | null> {
    const client = tx || this.prisma;
    return client.widget.findUnique({
      where: postWhereUniqueInput,
    });
  }

  async widgets(
    params: {
      skip?: number;
      take?: number;
      cursor?: Prisma.WidgetWhereUniqueInput;
      where?: Prisma.WidgetWhereInput;
      orderBy?: Prisma.WidgetOrderByWithRelationInput;
    },
    tx?: Prisma.TransactionClient,
  ): Promise<Widget[]> {
    const { skip, take, cursor, where, orderBy } = params;
    const client = tx || this.prisma;
    return client.widget.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async widgetsWithLib(
    params: {
      skip?: number;
      take?: number;
      cursor?: Prisma.WidgetWhereUniqueInput;
      where?: Prisma.WidgetWhereInput;
      orderBy?: Prisma.WidgetOrderByWithRelationInput;
    },
    tx?: Prisma.TransactionClient,
  ): Promise<
    (Widget & {
      widgetLib: WidgetLib;
    })[]
  > {
    const { skip, take, cursor, where, orderBy } = params;
    const client = tx || this.prisma;
    const widgets = client.widget.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        widgetLib: true,
      },
    });
    return widgets;
  }

  async widgetsWithSlots(
    params: {
      skip?: number;
      take?: number;
      cursor?: Prisma.WidgetWhereUniqueInput;
      where?: Prisma.WidgetWhereInput;
      orderBy?: Prisma.WidgetOrderByWithRelationInput;
    },
    tx?: Prisma.TransactionClient,
  ): Promise<
    (Widget & {
      widgetSlotAssignments: (WidgetSlotAssignment & {
        slot: WidgetSlot;
      })[];
    })[]
  > {
    const { skip, take, cursor, where, orderBy } = params;
    const client = tx || this.prisma;
    const data = await client.widget.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        widgetSlotAssignments: {
          include: {
            slot: true,
          },
        },
      },
    });
    return data;
  }

  async createWidget(
    data: Prisma.WidgetCreateInput,
    tx?: Prisma.TransactionClient,
  ): Promise<Widget> {
    try {
      const client = tx || this.prisma;
      const widget = await client.widget.create({
        data,
      });
      return widget;
    } catch (error) {
      throw new HttpException(`创建项目失败：${error.message}`, 500);
    }
  }

  async createWidgets(
    data: Prisma.WidgetCreateManyInput[],
    tx?: Prisma.TransactionClient,
  ): Promise<{ count: number }> {
    try {
      const client = tx || this.prisma;
      const result = await client.widget.createMany({
        data,
      });
      return { count: result.count };
    } catch (error) {
      throw new HttpException(`批量创建项目失败：${error.message}`, 500);
    }
  }

  async updateWidget(
    params: {
      where: Prisma.WidgetWhereUniqueInput;
      data: Prisma.WidgetUpdateInput;
    },
    tx?: Prisma.TransactionClient,
  ): Promise<Widget> {
    const { data, where } = params;
    const client = tx || this.prisma;
    return client.widget.update({
      data,
      where,
    });
  }

  async deleteWidget(
    where: Prisma.WidgetWhereUniqueInput,
    tx?: Prisma.TransactionClient,
  ): Promise<Widget> {
    const client = tx || this.prisma;
    return client.widget.delete({
      where,
    });
  }

  async clearWidgets(
    tx?: Prisma.TransactionClient,
  ): Promise<{ count: number }> {
    const client = tx || this.prisma;
    try {
      const result = await client.widget.deleteMany({});
      return { count: result.count };
    } catch (error) {
      throw new HttpException(`清空项目失败：${error.message}`, 500);
    }
  }

  async addSlot(
    params: WidgetAddSlotDto,
    userId: number,
    tx?: Prisma.TransactionClient,
  ): Promise<void> {
    const { slot } = params;
    const client = tx || this.prisma;

    const existSlot = await client.widgetSlot.findUnique({
      where: {
        name: slot.name,
        ownerId: userId,
      },
    });

    if (!existSlot) {
      const newSlot = await client.widgetSlot.create({
        data: {
          name: slot.name,
          ownerId: userId,
        },
      });

      this.connectSlot(
        {
          widgetId: params.widgetId,
          slotId: newSlot.id,
          userId,
        },
        tx,
      );
    } else {
      this.connectSlot(
        {
          widgetId: params.widgetId,
          slotId: existSlot.id,
          userId,
        },
        tx,
      );
    }
  }

  async deleteSlotAssignment(
    widgetId: number,
    slotId: number,
    userId: number,
    tx?: Prisma.TransactionClient,
  ): Promise<void> {
    const client = tx || this.prisma;
    const assignment = await client.widgetSlotAssignment.findUnique({
      where: {
        widgetId_slotId: {
          widgetId,
          slotId,
        },
      },
    });

    if (!assignment || assignment.ownerId !== userId) {
      throw new HttpException('Slot assignment not found or unauthorized', 404);
    }

    await client.widgetSlotAssignment.delete({
      where: {
        widgetId_slotId: {
          widgetId,
          slotId,
        },
      },
    });

    const remainingAssignments = await client.widgetSlotAssignment.findMany({
      where: { slotId },
    });

    if (remainingAssignments.length === 0) {
      await client.widgetSlot.delete({
        where: { id: slotId },
      });
    }
  }

  private async connectSlot(
    params: {
      widgetId: number;
      slotId: number;
      userId: number;
    },
    tx?: Prisma.TransactionClient,
  ): Promise<void> {
    const { widgetId, slotId, userId } = params;
    const client = tx || this.prisma;
    await client.widgetSlotAssignment.create({
      data: {
        widgetId,
        slotId,
        ownerId: userId,
      },
    });
  }
}
