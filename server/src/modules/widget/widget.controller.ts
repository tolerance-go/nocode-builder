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
import { WidgetService } from './widget.service';
import {
  WidgetResponseDto,
  WidgetQueryDto,
  WidgetCreateDto,
  WidgetUpdateDto,
} from './dtos';
import { toWidgetDto } from './utils';

@Controller('widgets')
export class WidgetController {
  constructor(private readonly widgetService: WidgetService) {}

  @Get(':id')
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

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 201,
    type: WidgetResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async createWidget(
    @Body() { ...rest }: WidgetCreateDto,
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
    });
    return toWidgetDto(widget);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'The widget has been successfully updated.',
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
    description: 'The widget has been successfully deleted.',
    type: WidgetResponseDto,
  })
  async deleteWidget(@Param('id') id: string): Promise<WidgetResponseDto> {
    const widget = await this.widgetService.deleteWidget({
      id: Number(id),
    });
    return toWidgetDto(widget);
  }
}
