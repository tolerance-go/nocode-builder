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
import { WidgetLibService } from './widget-lib.service';
import {
  WidgetLibResponseDto,
  WidgetLibQueryDto,
  WidgetLibCreateDto,
  WidgetLibUpdateDto,
} from './dtos';
import { toWidgetLibDto } from './utils';
import { Prisma } from '@prisma/client';

@Controller('widgetLibs')
export class WidgetLibController {
  constructor(private readonly widgetLibService: WidgetLibService) {}

  @Get('detail/:id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    type: WidgetLibResponseDto,
  })
  async getWidgetLib(
    @Param('id') id: string,
  ): Promise<WidgetLibResponseDto | null> {
    const widgetLib = await this.widgetLibService.widgetLib({
      id: Number(id),
    });
    return widgetLib ? toWidgetLibDto(widgetLib) : null;
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    type: [WidgetLibResponseDto],
  })
  async getWidgetLibs(
    @Query() query: WidgetLibQueryDto,
  ): Promise<WidgetLibResponseDto[]> {
    const widgetLibs = await this.widgetLibService.widgetLibs({
      skip: query.skip,
      take: query.take,
      cursor: query.filter ? { id: Number(query.filter) } : undefined,
      orderBy: query.orderBy ? { [query.orderBy]: 'asc' } : undefined,
    });
    return widgetLibs.map(toWidgetLibDto);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 201,
    type: WidgetLibResponseDto,
  })
  async createWidgetLib(
    @Body()
    { ...rest }: WidgetLibCreateDto,
    @Req() req: Request & { user: JwtUserDto },
  ): Promise<WidgetLibResponseDto> {
    const userId = req.user.id;
    const widgetLibData: Prisma.WidgetLibCreateInput = {
      ...rest,
      owner: {
        connect: {
          id: userId,
        },
      },
    };

    const widgetLib =
      await this.widgetLibService.createWidgetLib(widgetLibData);
    return toWidgetLibDto(widgetLib);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    type: WidgetLibResponseDto,
  })
  async updateWidgetLib(
    @Param('id') id: string,
    @Body() data: WidgetLibUpdateDto,
  ): Promise<WidgetLibResponseDto> {
    const widgetLib = await this.widgetLibService.updateWidgetLib({
      where: { id: Number(id) },
      data,
    });
    return toWidgetLibDto(widgetLib);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    type: WidgetLibResponseDto,
  })
  async deleteWidgetLib(
    @Param('id') id: string,
  ): Promise<WidgetLibResponseDto> {
    const widgetLib = await this.widgetLibService.deleteWidgetLib({
      id: Number(id),
    });
    return toWidgetLibDto(widgetLib);
  }
}
