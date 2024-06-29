import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { TimeChunk, Prisma } from '@prisma/client';

@Injectable()
export class TimeChunkService {
  constructor(private prisma: PrismaService) {}

  async timeChunk(
    timeChunkWhereUniqueInput: Prisma.TimeChunkWhereUniqueInput,
  ): Promise<TimeChunk | null> {
    return this.prisma.timeChunk.findUnique({
      where: timeChunkWhereUniqueInput,
    });
  }

  async timeChunks(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TimeChunkWhereUniqueInput;
    where?: Prisma.TimeChunkWhereInput;
    orderBy?: Prisma.TimeChunkOrderByWithRelationInput;
  }): Promise<TimeChunk[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.timeChunk.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createTimeChunk(
    data: Prisma.TimeChunkCreateInput,
  ): Promise<TimeChunk> {
    return this.prisma.timeChunk.create({
      data,
    });
  }

  async updateTimeChunk(params: {
    where: Prisma.TimeChunkWhereUniqueInput;
    data: Prisma.TimeChunkUpdateInput;
  }): Promise<TimeChunk> {
    const { where, data } = params;
    return this.prisma.timeChunk.update({
      data,
      where,
    });
  }

  async deleteTimeChunk(
    where: Prisma.TimeChunkWhereUniqueInput,
  ): Promise<TimeChunk> {
    return this.prisma.timeChunk.delete({
      where,
    });
  }
}
