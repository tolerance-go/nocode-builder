import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { JwtUserDto } from '../auth/dtos/jwt-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { WidgetSlotService } from './widget-slot.service';
import {
  WidgetSlotResponseDto,
  WidgetSlotQueryDto,
  WidgetSlotCreateDto,
  WidgetSlotUpdateDto,
  WidgetSlotCreateManyDto,
} from './dtos';
import { toWidgetSlotDto } from './utils';
import { Prisma } from '@prisma/client';
import { CountDto } from 'src/common/dtos';

@Controller('widgetSlots')
export class WidgetSlotController {
  constructor(private readonly widgetSlotService: WidgetSlotService) {}

  @Get('detail/:id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    type: WidgetSlotResponseDto,
  })
  async getWidgetSlot(
    @Param('id') id: string,
  ): Promise<WidgetSlotResponseDto | null> {
    const widgetSlot = await this.widgetSlotService.widgetSlot({
      id: Number(id),
    });
    return widgetSlot ? toWidgetSlotDto(widgetSlot) : null;
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    type: [WidgetSlotResponseDto],
  })
  async getWidgetSlots(
    @Query() query: WidgetSlotQueryDto,
  ): Promise<WidgetSlotResponseDto[]> {
    const widgetSlots = await this.widgetSlotService.widgetSlots({
      skip: query.skip,
      take: query.take,
      cursor: query.filter ? { id: Number(query.filter) } : undefined,
      orderBy: query.orderBy ? { [query.orderBy]: 'asc' } : undefined,
    });
    return widgetSlots.map(toWidgetSlotDto);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 201,
    type: WidgetSlotResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async createWidgetSlot(
    @Body() { ...rest }: WidgetSlotCreateDto,
    @Req() req: Request & { user: JwtUserDto },
  ): Promise<WidgetSlotResponseDto> {
    const userId = req.user.id;
    const widgetSlot = await this.widgetSlotService.createWidgetSlot({
      ...rest,
      owner: {
        connect: {
          id: userId,
        },
      },
    });
    return toWidgetSlotDto(widgetSlot);
  }

  @Post('bulk-create')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 201,
    type: CountDto,
  })
  @ApiResponse({ status: 400 })
  async createWidgetSlots(
    @Body() createWidgetSlotsDto: WidgetSlotCreateManyDto,
    @Req() req: Request & { user: JwtUserDto },
  ): Promise<{ count: number }> {
    const userId = req.user.id;
    const widgetSlotsData: Prisma.WidgetSlotCreateManyInput[] =
      createWidgetSlotsDto.createDtos.map((dto) => ({
        ...dto,
        ownerId: userId,
      }));
    return this.widgetSlotService.createWidgetSlots(widgetSlotsData);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'The widgetSlot has been successfully updated.',
    type: WidgetSlotResponseDto,
  })
  async updateWidgetSlot(
    @Param('id') id: string,
    @Body() data: WidgetSlotUpdateDto,
  ): Promise<WidgetSlotResponseDto> {
    const widgetSlot = await this.widgetSlotService.updateWidgetSlot({
      where: { id: Number(id) },
      data,
    });
    return toWidgetSlotDto(widgetSlot);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'The widgetSlot has been successfully deleted.',
    type: WidgetSlotResponseDto,
  })
  async deleteWidgetSlot(
    @Param('id') id: string,
  ): Promise<WidgetSlotResponseDto> {
    const widgetSlot = await this.widgetSlotService.deleteWidgetSlot({
      id: Number(id),
    });
    return toWidgetSlotDto(widgetSlot);
  }
}
