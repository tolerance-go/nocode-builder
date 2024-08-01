import { HttpException, Injectable } from '@nestjs/common';
import { Prisma, WidgetSlotAssignment } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WidgetSlotAssignmentService {
  constructor(private prisma: PrismaService) {}

  async widgetSlotAssignment(
    postWhereUniqueInput: Prisma.WidgetSlotAssignmentWhereUniqueInput,
    tx?: Prisma.TransactionClient,
  ): Promise<WidgetSlotAssignment | null> {
    const client = tx || this.prisma;
    return client.widgetSlotAssignment.findUnique({
      where: postWhereUniqueInput,
    });
  }

  async widgetSlotAssignments(
    params: {
      skip?: number;
      take?: number;
      cursor?: Prisma.WidgetSlotAssignmentWhereUniqueInput;
      where?: Prisma.WidgetSlotAssignmentWhereInput;
      orderBy?: Prisma.WidgetSlotAssignmentOrderByWithRelationInput;
    },
    tx?: Prisma.TransactionClient,
  ): Promise<WidgetSlotAssignment[]> {
    const { skip, take, cursor, where, orderBy } = params;
    const client = tx || this.prisma;
    const data = client.widgetSlotAssignment.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
    return data;
  }

  async createWidgetSlotAssignment(
    data: Prisma.WidgetSlotAssignmentCreateInput,
    tx?: Prisma.TransactionClient,
  ): Promise<WidgetSlotAssignment> {
    try {
      const client = tx || this.prisma;
      const widgetSlotAssignment = await client.widgetSlotAssignment.create({
        data,
      });
      return widgetSlotAssignment;
    } catch (error) {
      throw new HttpException(`创建项目失败：${error.message}`, 500);
    }
  }

  async createWidgetSlotAssignments(
    data: Prisma.WidgetSlotAssignmentCreateManyInput[],
    tx?: Prisma.TransactionClient,
  ): Promise<{ count: number }> {
    try {
      const client = tx || this.prisma;
      const result = await client.widgetSlotAssignment.createMany({
        data,
      });
      return { count: result.count };
    } catch (error) {
      throw new HttpException(`批量创建项目失败：${error.message}`, 500);
    }
  }

  async updateWidgetSlotAssignment(
    params: {
      where: Prisma.WidgetSlotAssignmentWhereUniqueInput;
      data: Prisma.WidgetSlotAssignmentUpdateInput;
    },
    tx?: Prisma.TransactionClient,
  ): Promise<WidgetSlotAssignment> {
    const { data, where } = params;
    const client = tx || this.prisma;
    return client.widgetSlotAssignment.update({
      data,
      where,
    });
  }

  async deleteWidgetSlotAssignment(
    where: Prisma.WidgetSlotAssignmentWhereUniqueInput,
    tx?: Prisma.TransactionClient,
  ): Promise<WidgetSlotAssignment> {
    const client = tx || this.prisma;
    return client.widgetSlotAssignment.delete({
      where,
    });
  }

  async clearWidgetSlotAssignments(
    tx?: Prisma.TransactionClient,
  ): Promise<{ count: number }> {
    const client = tx || this.prisma;
    try {
      const result = await client.widgetSlotAssignment.deleteMany({});
      return { count: result.count };
    } catch (error) {
      throw new HttpException(`清空项目失败：${error.message}`, 500);
    }
  }
}
