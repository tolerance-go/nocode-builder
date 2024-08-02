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
import { ProjectDetailService } from './project-detail.service';
import {
  ProjectDetailResponseDto,
  ProjectDetailQueryDto,
  ProjectDetailCreateDto,
  ProjectDetailUpdateDto,
} from './dtos';
import { toProjectDetailDto } from './utils';
import { Prisma } from '@prisma/client';

@Controller('projectDetails')
export class ProjectDetailController {
  constructor(private readonly projectDetailService: ProjectDetailService) {}

  @Get('detail/:id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    type: ProjectDetailResponseDto,
  })
  async getProjectDetail(
    @Param('id') id: string,
  ): Promise<ProjectDetailResponseDto | null> {
    const projectDetail = await this.projectDetailService.projectDetail({
      id: Number(id),
    });
    return projectDetail ? toProjectDetailDto(projectDetail) : null;
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    type: [ProjectDetailResponseDto],
  })
  async getProjectDetails(
    @Query() query: ProjectDetailQueryDto,
  ): Promise<ProjectDetailResponseDto[]> {
    const projectDetails = await this.projectDetailService.projectDetails({
      skip: query.skip,
      take: query.take,
      cursor: query.filter ? { id: Number(query.filter) } : undefined,
      orderBy: query.orderBy ? { [query.orderBy]: 'asc' } : undefined,
    });
    return projectDetails.map(toProjectDetailDto);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 201,
    type: ProjectDetailResponseDto,
  })
  async createProjectDetail(
    @Body()
    {
      viewProjectId,
      dataTableProjectId,
      bluemapProjectId,
      ...rest
    }: ProjectDetailCreateDto,
    @Req() req: Request & { user: JwtUserDto },
  ): Promise<ProjectDetailResponseDto> {
    const userId = req.user.id;
    const id = await this.projectDetailService.getNextProjectDetailId();

    const projectDetailData: Prisma.ProjectDetailCreateInput = {
      id,
      ...rest,
      owner: {
        connect: {
          id: userId,
        },
      },
    };

    if (viewProjectId !== undefined) {
      projectDetailData.viewProject = {
        connect: {
          id: viewProjectId,
        },
      };
    }

    if (dataTableProjectId !== undefined) {
      projectDetailData.dataTableProject = {
        connect: {
          id: dataTableProjectId,
        },
      };
    }

    if (bluemapProjectId !== undefined) {
      projectDetailData.bluemapProject = {
        connect: {
          id: bluemapProjectId,
        },
      };
    }

    const projectDetail =
      await this.projectDetailService.createProjectDetail(projectDetailData);
    return toProjectDetailDto(projectDetail);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    type: ProjectDetailResponseDto,
  })
  async updateProjectDetail(
    @Param('id') id: string,
    @Body() data: ProjectDetailUpdateDto,
  ): Promise<ProjectDetailResponseDto> {
    const projectDetail = await this.projectDetailService.updateProjectDetail({
      where: { id: Number(id) },
      data,
    });
    return toProjectDetailDto(projectDetail);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    type: ProjectDetailResponseDto,
  })
  async deleteProjectDetail(
    @Param('id') id: string,
  ): Promise<ProjectDetailResponseDto> {
    const projectDetail = await this.projectDetailService.deleteProjectDetail({
      id: Number(id),
    });
    return toProjectDetailDto(projectDetail);
  }
}
