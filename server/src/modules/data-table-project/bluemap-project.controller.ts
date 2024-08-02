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
import { DataTableProjectService } from './bluemap-project.service';
import {
  DataTableProjectResponseDto,
  DataTableProjectQueryDto,
  DataTableProjectCreateDto,
  DataTableProjectUpdateDto,
} from './dtos';
import { toDataTableProjectDto } from './utils';
import { Prisma } from '@prisma/client';

@Controller('dataTableProjects')
export class DataTableProjectController {
  constructor(
    private readonly dataTableProjectService: DataTableProjectService,
  ) {}

  @Get('detail/:id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    type: DataTableProjectResponseDto,
  })
  async getDataTableProject(
    @Param('id') id: string,
  ): Promise<DataTableProjectResponseDto | null> {
    const dataTableProject =
      await this.dataTableProjectService.dataTableProject({
        id: Number(id),
      });
    return dataTableProject ? toDataTableProjectDto(dataTableProject) : null;
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    type: [DataTableProjectResponseDto],
  })
  async getDataTableProjects(
    @Query() query: DataTableProjectQueryDto,
  ): Promise<DataTableProjectResponseDto[]> {
    const dataTableProjects =
      await this.dataTableProjectService.dataTableProjects({
        skip: query.skip,
        take: query.take,
        cursor: query.filter ? { id: Number(query.filter) } : undefined,
        orderBy: query.orderBy ? { [query.orderBy]: 'asc' } : undefined,
      });
    return dataTableProjects.map(toDataTableProjectDto);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 201,
    type: DataTableProjectResponseDto,
  })
  async createDataTableProject(
    @Body()
    { ...rest }: DataTableProjectCreateDto,
    @Req() req: Request & { user: JwtUserDto },
  ): Promise<DataTableProjectResponseDto> {
    const userId = req.user.id;
    const id = await this.dataTableProjectService.getNextDataTableProjectId();

    const dataTableProjectData: Prisma.DataTableProjectCreateInput = {
      id,
      ...rest,
      owner: {
        connect: {
          id: userId,
        },
      },
    };

    const dataTableProject =
      await this.dataTableProjectService.createDataTableProject(
        dataTableProjectData,
      );
    return toDataTableProjectDto(dataTableProject);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    type: DataTableProjectResponseDto,
  })
  async updateDataTableProject(
    @Param('id') id: string,
    @Body() data: DataTableProjectUpdateDto,
  ): Promise<DataTableProjectResponseDto> {
    const dataTableProject =
      await this.dataTableProjectService.updateDataTableProject({
        where: { id: Number(id) },
        data,
      });
    return toDataTableProjectDto(dataTableProject);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    type: DataTableProjectResponseDto,
  })
  async deleteDataTableProject(
    @Param('id') id: string,
  ): Promise<DataTableProjectResponseDto> {
    const dataTableProject =
      await this.dataTableProjectService.deleteDataTableProject({
        id: Number(id),
      });
    return toDataTableProjectDto(dataTableProject);
  }
}
