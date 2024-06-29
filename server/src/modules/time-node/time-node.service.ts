import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { TimeNode, Prisma } from '@prisma/client';

@Injectable()
export class TimeNodeService {
  constructor(private prisma: PrismaService) {}

  async timeNode(
    timeNodeWhereUniqueInput: Prisma.TimeNodeWhereUniqueInput,
  ): Promise<TimeNode | null> {
    return this.prisma.timeNode.findUnique({
      where: timeNodeWhereUniqueInput,
    });
  }

  async timeNodes(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TimeNodeWhereUniqueInput;
    where?: Prisma.TimeNodeWhereInput;
    orderBy?: Prisma.TimeNodeOrderByWithRelationInput;
  }): Promise<TimeNode[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.timeNode.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createTimeNode(
    data: Prisma.TimeNodeCreateInput,
  ): Promise<TimeNode> {
    return this.prisma.timeNode.create({
      data,
    });
  }

  async updateTimeNode(params: {
    where: Prisma.TimeNodeWhereUniqueInput;
    data: Prisma.TimeNodeUpdateInput;
  }): Promise<TimeNode> {
    const { where, data } = params;
    return this.prisma.timeNode.update({
      data,
      where,
    });
  }

  async deleteTimeNode(
    where: Prisma.TimeNodeWhereUniqueInput,
  ): Promise<TimeNode> {
    return this.prisma.timeNode.delete({
      where,
    });
  }
}
