import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { JwtUserDto } from '../auth/dtos/jwt-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TimeChunkCreateDto } from './dtos/time-chunk-create.dto';
import { TimeChunkQueryDto } from './dtos/time-chunk-query.dto';
import { TimeChunkUpdateDto } from './dtos/time-chunk-update.dto';
import { TimeChunkDto } from './dtos/time-chunk.dto';
import { TimeChunkService } from './time-chunk.service';
import { toTimeChunkDto } from './utils/toTimeChunkDto';

@Controller('project-groups')
export class TimeChunkController {
  constructor(private readonly timeChunkService: TimeChunkService) {}

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The project group has been successfully fetched.',
    type: TimeChunkDto,
  })
  async getTimeChunk(@Param('id') id: string): Promise<TimeChunkDto | null> {
    const timeChunk = await this.timeChunkService.timeChunk({
      id: Number(id),
    });
    return timeChunk ? toTimeChunkDto(timeChunk) : null;
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The project groups have been successfully fetched.',
    type: [TimeChunkDto],
  })
  async getTimeChunks(
    @Query() query: TimeChunkQueryDto,
  ): Promise<TimeChunkDto[]> {
    const timeChunks = await this.timeChunkService.timeChunks({
      skip: query.skip,
      take: query.take,
      cursor: query.filter ? { id: Number(query.filter) } : undefined,
      orderBy: query.orderBy ? { [query.orderBy]: 'asc' } : undefined,
    });
    return timeChunks.map(toTimeChunkDto);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 201,
    description: 'The project group has been successfully created.',
    type: TimeChunkDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async createTimeChunk(
    @Body() data: TimeChunkCreateDto,
    @Req() req: Request & { user: JwtUserDto },
  ): Promise<TimeChunkDto> {
    const userId = req.user.id;

    const { timeNodesConnect, ...rest } = data;
    const timeChunk = await this.timeChunkService.createTimeChunk({
      ...rest,
      user: {
        connect: {
          id: userId,
        },
      },
      timeNodes: timeNodesConnect
        ? {
            connect: timeNodesConnect.map((id) => ({ id })),
          }
        : undefined,
    });

    return toTimeChunkDto(timeChunk);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'The project group has been successfully updated.',
    type: TimeChunkDto,
  })
  async updateTimeChunk(
    @Param('id') id: string,
    @Body() data: TimeChunkUpdateDto,
  ): Promise<TimeChunkDto> {
    const timeChunk = await this.timeChunkService.updateTimeChunk({
      where: { id: Number(id) },
      data,
    });
    return toTimeChunkDto(timeChunk);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The project group has been successfully deleted.',
    type: TimeChunkDto,
  })
  async deleteTimeChunk(@Param('id') id: string): Promise<TimeChunkDto> {
    const timeChunk = await this.timeChunkService.deleteTimeChunk({
      id: Number(id),
    });
    return toTimeChunkDto(timeChunk);
  }
}
