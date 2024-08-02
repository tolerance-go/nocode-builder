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
import { ViewProjectService } from './view-project.service';
import {
  ViewProjectResponseDto,
  ViewProjectQueryDto,
  ViewProjectCreateDto,
  ViewProjectUpdateDto,
} from './dtos';
import { toViewProjectDto } from './utils';
import { Prisma } from '@prisma/client';

@Controller('viewProjects')
export class ViewProjectController {
  constructor(private readonly viewProjectService: ViewProjectService) {}

  @Get('detail/:id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    type: ViewProjectResponseDto,
  })
  async getViewProject(
    @Param('id') id: string,
  ): Promise<ViewProjectResponseDto | null> {
    const viewProject = await this.viewProjectService.viewProject({
      id: Number(id),
    });
    return viewProject ? toViewProjectDto(viewProject) : null;
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    type: [ViewProjectResponseDto],
  })
  async getViewProjects(
    @Query() query: ViewProjectQueryDto,
  ): Promise<ViewProjectResponseDto[]> {
    const viewProjects = await this.viewProjectService.viewProjects({
      skip: query.skip,
      take: query.take,
      cursor: query.filter ? { id: Number(query.filter) } : undefined,
      orderBy: query.orderBy ? { [query.orderBy]: 'asc' } : undefined,
    });
    return viewProjects.map(toViewProjectDto);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 201,
    type: ViewProjectResponseDto,
  })
  async createViewProject(
    @Body()
    { ...rest }: ViewProjectCreateDto,
    @Req() req: Request & { user: JwtUserDto },
  ): Promise<ViewProjectResponseDto> {
    const userId = req.user.id;
    const id = await this.viewProjectService.getNextViewProjectId();

    const viewProjectData: Prisma.ViewProjectCreateInput = {
      id,
      ...rest,
      owner: {
        connect: {
          id: userId,
        },
      },
    };

    const viewProject =
      await this.viewProjectService.createViewProject(viewProjectData);
    return toViewProjectDto(viewProject);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    type: ViewProjectResponseDto,
  })
  async updateViewProject(
    @Param('id') id: string,
    @Body() data: ViewProjectUpdateDto,
  ): Promise<ViewProjectResponseDto> {
    const viewProject = await this.viewProjectService.updateViewProject({
      where: { id: Number(id) },
      data,
    });
    return toViewProjectDto(viewProject);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    type: ViewProjectResponseDto,
  })
  async deleteViewProject(
    @Param('id') id: string,
  ): Promise<ViewProjectResponseDto> {
    const viewProject = await this.viewProjectService.deleteViewProject({
      id: Number(id),
    });
    return toViewProjectDto(viewProject);
  }
}
