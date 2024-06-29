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
import { TimeNodeCreateDto } from './dtos/time-node-create.dto';
import { TimeNodeQueryDto } from './dtos/time-node-query.dto';
import { TimeNodeUpdateDto } from './dtos/time-node-update.dto';
import { TimeNodeDto } from './dtos/time-node.dto';
import { TimeNodeService } from './time-node.service';
import { toTimeNodeDto } from './utils/toTimeNodeDto';

@Controller('project-groups')
export class TimeNodeController {
  constructor(private readonly timeNodeService: TimeNodeService) {}

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The project group has been successfully fetched.',
    type: TimeNodeDto,
  })
  async getTimeNode(
    @Param('id') id: string,
  ): Promise<TimeNodeDto | null> {
    const timeNode = await this.timeNodeService.timeNode({
      id: Number(id),
    });
    return timeNode ? toTimeNodeDto(timeNode) : null;
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The project groups have been successfully fetched.',
    type: [TimeNodeDto],
  })
  async getTimeNodes(
    @Query() query: TimeNodeQueryDto,
  ): Promise<TimeNodeDto[]> {
    const timeNodes = await this.timeNodeService.timeNodes({
      skip: query.skip,
      take: query.take,
      cursor: query.filter ? { id: Number(query.filter) } : undefined,
      orderBy: query.orderBy ? { [query.orderBy]: 'asc' } : undefined,
    });
    return timeNodes.map(toTimeNodeDto);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 201,
    description: 'The project group has been successfully created.',
    type: TimeNodeDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async createTimeNode(
    @Body() data: TimeNodeCreateDto,
    @Req() req: Request & { user: JwtUserDto },
  ): Promise<TimeNodeDto> {
    const { parentGroupId, ...rest } = data;
    const userId = req.user.id;
    const timeNode = await this.timeNodeService.createTimeNode({
      ...rest,
      owner: {
        connect: {
          id: userId,
        },
      },
      parentGroup: parentGroupId
        ? {
            connect: {
              id: parentGroupId,
            },
          }
        : undefined,
    });
    return toTimeNodeDto(timeNode);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'The project group has been successfully updated.',
    type: TimeNodeDto,
  })
  async updateTimeNode(
    @Param('id') id: string,
    @Body() data: TimeNodeUpdateDto,
  ): Promise<TimeNodeDto> {
    const timeNode = await this.timeNodeService.updateTimeNode({
      where: { id: Number(id) },
      data,
    });
    return toTimeNodeDto(timeNode);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The project group has been successfully deleted.',
    type: TimeNodeDto,
  })
  async deleteTimeNode(@Param('id') id: string): Promise<TimeNodeDto> {
    const timeNode = await this.timeNodeService.deleteTimeNode({
      id: Number(id),
    });
    return toTimeNodeDto(timeNode);
  }
}
