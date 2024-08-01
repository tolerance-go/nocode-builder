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
  ParseIntPipe,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { JwtUserDto } from '../auth/dtos/jwt-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { WidgetSlotAssignmentService } from './widget-slot.service';
import {
  WidgetSlotAssignmentResponseDto,
  WidgetSlotAssignmentQueryDto,
  WidgetSlotAssignmentCreateDto,
  WidgetSlotAssignmentUpdateDto,
  WidgetSlotAssignmentCreateManyDto,
} from './dtos';
import { toWidgetSlotAssignmentDto } from './utils';
import { Prisma } from '@prisma/client';
import { CountDto } from 'src/common/dtos';

@Controller('widgetSlotAssignments')
export class WidgetSlotAssignmentController {
  constructor(
    private readonly widgetSlotAssignmentService: WidgetSlotAssignmentService,
  ) {}

  @Get(':widgetId/:slotId')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    type: WidgetSlotAssignmentResponseDto,
  })
  async getWidgetSlotAssignment(
    @Param('widgetId', ParseIntPipe) widgetId: number,
    @Param('slotId', ParseIntPipe) slotId: number,
  ): Promise<WidgetSlotAssignmentResponseDto | null> {
    const widgetSlotAssignment =
      await this.widgetSlotAssignmentService.widgetSlotAssignment({
        widgetId_slotId: {
          widgetId: widgetId,
          slotId: slotId,
        },
      });
    return widgetSlotAssignment
      ? toWidgetSlotAssignmentDto(widgetSlotAssignment)
      : null;
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    type: [WidgetSlotAssignmentResponseDto],
  })
  async getWidgetSlotAssignments(
    @Query() query: WidgetSlotAssignmentQueryDto,
  ): Promise<WidgetSlotAssignmentResponseDto[]> {
    const widgetSlotAssignments =
      await this.widgetSlotAssignmentService.widgetSlotAssignments({
        skip: query.skip,
        take: query.take,
        cursor:
          query.filterWidgetId && query.filterSlotId
            ? {
                widgetId_slotId: {
                  widgetId: query.filterWidgetId,
                  slotId: query.filterSlotId,
                },
              }
            : undefined,
        orderBy: query.orderBy ? { [query.orderBy]: 'asc' } : undefined,
      });
    return widgetSlotAssignments.map(toWidgetSlotAssignmentDto);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 201,
    type: WidgetSlotAssignmentResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async createWidgetSlotAssignment(
    @Body() { ...rest }: WidgetSlotAssignmentCreateDto,
    @Req() req: Request & { user: JwtUserDto },
  ): Promise<WidgetSlotAssignmentResponseDto> {
    const userId = req.user.id;
    const widgetSlotAssignment =
      await this.widgetSlotAssignmentService.createWidgetSlotAssignment({
        widget: {
          connect: {
            id: rest.widgetId,
          },
        },
        slot: {
          connect: {
            id: rest.slotId,
          },
        },
        owner: {
          connect: {
            id: userId,
          },
        },
      });
    return toWidgetSlotAssignmentDto(widgetSlotAssignment);
  }

  @Post('bulk-create')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 201,
    type: CountDto,
  })
  @ApiResponse({ status: 400 })
  async createWidgetSlotAssignments(
    @Body() createWidgetSlotAssignmentsDto: WidgetSlotAssignmentCreateManyDto,
    @Req() req: Request & { user: JwtUserDto },
  ): Promise<{ count: number }> {
    const userId = req.user.id;
    const widgetSlotAssignmentsData: Prisma.WidgetSlotAssignmentCreateManyInput[] =
      createWidgetSlotAssignmentsDto.createDtos.map((dto) => ({
        ...dto,
        ownerId: userId,
      }));
    return this.widgetSlotAssignmentService.createWidgetSlotAssignments(
      widgetSlotAssignmentsData,
    );
  }

  @Patch(':widgetId/:slotId')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'The widgetSlotAssignment has been successfully updated.',
    type: WidgetSlotAssignmentResponseDto,
  })
  async updateWidgetSlotAssignment(
    @Param('widgetId', ParseIntPipe) widgetId: number,
    @Param('slotId', ParseIntPipe) slotId: number,
    @Body() data: WidgetSlotAssignmentUpdateDto,
  ): Promise<WidgetSlotAssignmentResponseDto> {
    const widgetSlotAssignment =
      await this.widgetSlotAssignmentService.updateWidgetSlotAssignment({
        where: {
          widgetId_slotId: {
            widgetId: widgetId,
            slotId: slotId,
          },
        },
        data,
      });
    return toWidgetSlotAssignmentDto(widgetSlotAssignment);
  }

  @Delete(':widgetId/:slotId')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'The widgetSlotAssignment has been successfully deleted.',
    type: WidgetSlotAssignmentResponseDto,
  })
  async deleteWidgetSlotAssignment(
    @Param('widgetId', ParseIntPipe) widgetId: number,
    @Param('slotId', ParseIntPipe) slotId: number,
  ): Promise<WidgetSlotAssignmentResponseDto> {
    const widgetSlotAssignment =
      await this.widgetSlotAssignmentService.deleteWidgetSlotAssignment({
        widgetId_slotId: {
          widgetId: widgetId,
          slotId: slotId,
        },
      });
    return toWidgetSlotAssignmentDto(widgetSlotAssignment);
  }
}
