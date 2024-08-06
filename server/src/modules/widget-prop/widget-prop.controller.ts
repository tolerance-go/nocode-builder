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
import { WidgetPropService } from './widget-prop.service';
import {
  WidgetPropResponseDto,
  WidgetPropQueryDto,
  WidgetPropCreateDto,
  WidgetPropUpdateDto,
} from './dtos';
import { toWidgetPropResponseDto } from './utils';
import { Prisma } from '@prisma/client';

@Controller('widgetProps')
export class WidgetPropController {
  constructor(private readonly widgetPropService: WidgetPropService) {}

  @Get('detail/:id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    type: WidgetPropResponseDto,
  })
  async getWidgetProp(
    @Param('id') id: string,
  ): Promise<WidgetPropResponseDto | null> {
    const widgetProp = await this.widgetPropService.widgetProp({
      id: Number(id),
    });
    return widgetProp ? toWidgetPropResponseDto(widgetProp) : null;
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    type: [WidgetPropResponseDto],
  })
  async getWidgetProps(
    @Query() query: WidgetPropQueryDto,
  ): Promise<WidgetPropResponseDto[]> {
    const widgetProps = await this.widgetPropService.widgetProps({
      skip: query.skip,
      take: query.take,
      cursor: query.filter ? { id: Number(query.filter) } : undefined,
      orderBy: query.orderBy ? { [query.orderBy]: 'asc' } : undefined,
    });
    return widgetProps.map(toWidgetPropResponseDto);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 201,
    type: WidgetPropResponseDto,
  })
  async createWidgetProp(
    @Body()
    { jsonValue, ...rest }: WidgetPropCreateDto,
    @Req() req: Request & { user: JwtUserDto },
  ): Promise<WidgetPropResponseDto> {
    const userId = req.user.id;

    const widgetPropData: Prisma.WidgetPropCreateInput = {
      ...rest,
      jsonValue: jsonValue ?? undefined,
      owner: {
        connect: {
          id: userId,
        },
      },
    };

    const widgetProp =
      await this.widgetPropService.createWidgetProp(widgetPropData);
    return toWidgetPropResponseDto(widgetProp);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    type: WidgetPropResponseDto,
  })
  async updateWidgetProp(
    @Param('id') id: string,
    @Body() data: WidgetPropUpdateDto,
  ): Promise<WidgetPropResponseDto> {
    const widgetProp = await this.widgetPropService.updateWidgetProp({
      where: { id: Number(id) },
      data,
    });
    return toWidgetPropResponseDto(widgetProp);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    type: WidgetPropResponseDto,
  })
  async deleteWidgetProp(
    @Param('id') id: string,
  ): Promise<WidgetPropResponseDto> {
    const widgetProp = await this.widgetPropService.deleteWidgetProp({
      id: Number(id),
    });
    return toWidgetPropResponseDto(widgetProp);
  }
}
