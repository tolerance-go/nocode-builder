import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { CountDto } from 'src/common/dtos';
import {
  WidgetAddSlotDto,
  WidgetCreateDto,
  WidgetCreateManyDto,
  WidgetQueryByPlatformDto,
  WidgetQueryDto,
  WidgetResponseDto,
  WidgetUpdateDto,
  WidgetWithLibResponseDto,
  WidgetWithSlotsResponseDto,
} from './dtos';
import { toWidgetDto } from './utils';
import { WidgetService } from './widget.service';
import { JwtUserDto } from '../auth/dtos/jwt-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { toWidgetSlotAssignmentDto } from '../widget-slot-assignment/utils';
import { toWidgetSlotDto } from '../widget-slot/utils';
import { toWidgetLibDto } from '../widget-lib/utils';

@Controller('widgets')
export class WidgetController {
  constructor(private readonly widgetService: WidgetService) {}

  @Get('detail/:id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    type: WidgetResponseDto,
  })
  async getWidget(@Param('id') id: string): Promise<WidgetResponseDto | null> {
    const widget = await this.widgetService.widget({
      id: Number(id),
    });
    return widget ? toWidgetDto(widget) : null;
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    type: [WidgetResponseDto],
  })
  async getWidgets(
    @Query() query: WidgetQueryDto,
  ): Promise<WidgetResponseDto[]> {
    const widgets = await this.widgetService.widgets({
      skip: query.skip,
      take: query.take,
      cursor: query.filter ? { id: Number(query.filter) } : undefined,
      orderBy: query.orderBy ? { [query.orderBy]: 'asc' } : undefined,
    });
    return widgets.map(toWidgetDto);
  }

  @Get('filter-by-platform')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    type: [WidgetWithLibResponseDto],
  })
  async getWidgetsWithLibFilterByPlatform(
    @Query() query: WidgetQueryByPlatformDto,
  ): Promise<WidgetWithLibResponseDto[]> {
    const widgets = await this.widgetService.widgetsWithLib({
      skip: query.skip,
      take: query.take,
      cursor: query.filter ? { id: Number(query.filter) } : undefined,
      orderBy: query.orderBy ? { [query.orderBy]: 'asc' } : undefined,
      where: {
        platforms: {
          has: query.platformType,
        },
      },
    });
    return widgets.map((widget) => ({
      ...toWidgetDto(widget),
      widgetLib: toWidgetLibDto(widget.widgetLib),
    }));
  }

  @Get('with-slots')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    type: [WidgetWithSlotsResponseDto],
  })
  async getWidgetsWithSlots(
    @Query() query: WidgetQueryDto,
  ): Promise<WidgetWithSlotsResponseDto[]> {
    const widgets = await this.widgetService.widgetsWithSlots({
      skip: query.skip,
      take: query.take,
      cursor: query.filter ? { id: Number(query.filter) } : undefined,
      orderBy: query.orderBy ? { [query.orderBy]: 'asc' } : undefined,
    });
    return widgets.map((item) => {
      return {
        ...toWidgetDto(item),
        widgetSlotAssignments: item.widgetSlotAssignments.map((slot) => {
          return {
            ...toWidgetSlotAssignmentDto(slot),
            slot: toWidgetSlotDto(slot.slot),
          };
        }),
      };
    });
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 201,
    type: WidgetResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async createWidget(
    @Body() { widgetLibId, ...rest }: WidgetCreateDto,
    @Req() req: Request & { user: JwtUserDto },
  ): Promise<WidgetResponseDto> {
    const userId = req.user.id;
    const widget = await this.widgetService.createWidget({
      ...rest,
      owner: {
        connect: {
          id: userId,
        },
      },
      widgetLib: {
        connect: {
          id: widgetLibId,
        },
      },
    });
    return toWidgetDto(widget);
  }

  @Post('add-slot')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 201,
    type: WidgetResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async addSlot(
    @Body() data: WidgetAddSlotDto,
    @Req() req: Request & { user: JwtUserDto },
  ): Promise<void> {
    const userId = req.user.id;

    await this.widgetService.addSlot(data, userId);
  }

  @Post('bulk-create')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 201,
    type: CountDto,
  })
  @ApiResponse({ status: 400 })
  async createWidgets(
    @Body() createWidgetsDto: WidgetCreateManyDto,
    @Req() req: Request & { user: JwtUserDto },
  ): Promise<{ count: number }> {
    const userId = req.user.id;
    const widgetsData: Prisma.WidgetCreateManyInput[] =
      createWidgetsDto.createDtos.map((dto) => ({
        ...dto,
        ownerId: userId,
      }));
    return this.widgetService.createWidgets(widgetsData);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    type: WidgetResponseDto,
  })
  async updateWidget(
    @Param('id') id: string,
    @Body() data: WidgetUpdateDto,
  ): Promise<WidgetResponseDto> {
    const widget = await this.widgetService.updateWidget({
      where: { id: Number(id) },
      data,
    });
    return toWidgetDto(widget);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    type: WidgetResponseDto,
  })
  async deleteWidget(@Param('id') id: string): Promise<WidgetResponseDto> {
    const widget = await this.widgetService.deleteWidget({
      id: Number(id),
    });
    return toWidgetDto(widget);
  }

  @Delete(':widgetId/slot/:slotId')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
  })
  async deleteSlotAssignment(
    @Param('widgetId', ParseIntPipe) widgetId: number,
    @Param('slotId', ParseIntPipe) slotId: number,
    @Req() req: Request & { user: JwtUserDto },
  ): Promise<void> {
    const userId = req.user.id;
    await this.widgetService.deleteSlotAssignment(widgetId, slotId, userId);
  }
}
