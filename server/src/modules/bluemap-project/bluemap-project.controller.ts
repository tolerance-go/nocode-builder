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
import { BluemapProjectService } from './bluemap-project.service';
import {
  BluemapProjectResponseDto,
  BluemapProjectQueryDto,
  BluemapProjectCreateDto,
  BluemapProjectUpdateDto,
} from './dtos';
import { toBluemapProjectDto } from './utils';
import { Prisma } from '@prisma/client';

@Controller('bluemapProjects')
export class BluemapProjectController {
  constructor(private readonly bluemapProjectService: BluemapProjectService) {}

  @Get('detail/:id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    type: BluemapProjectResponseDto,
  })
  async getBluemapProject(
    @Param('id') id: string,
  ): Promise<BluemapProjectResponseDto | null> {
    const bluemapProject = await this.bluemapProjectService.bluemapProject({
      id: Number(id),
    });
    return bluemapProject ? toBluemapProjectDto(bluemapProject) : null;
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    type: [BluemapProjectResponseDto],
  })
  async getBluemapProjects(
    @Query() query: BluemapProjectQueryDto,
  ): Promise<BluemapProjectResponseDto[]> {
    const bluemapProjects = await this.bluemapProjectService.bluemapProjects({
      skip: query.skip,
      take: query.take,
      cursor: query.filter ? { id: Number(query.filter) } : undefined,
      orderBy: query.orderBy ? { [query.orderBy]: 'asc' } : undefined,
    });
    return bluemapProjects.map(toBluemapProjectDto);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 201,
    type: BluemapProjectResponseDto,
  })
  async createBluemapProject(
    @Body()
    { ...rest }: BluemapProjectCreateDto,
    @Req() req: Request & { user: JwtUserDto },
  ): Promise<BluemapProjectResponseDto> {
    const userId = req.user.id;
    const id = await this.bluemapProjectService.getNextBluemapProjectId();

    const bluemapProjectData: Prisma.BluemapProjectCreateInput = {
      id,
      ...rest,
      owner: {
        connect: {
          id: userId,
        },
      },
    };

    const bluemapProject =
      await this.bluemapProjectService.createBluemapProject(bluemapProjectData);
    return toBluemapProjectDto(bluemapProject);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    type: BluemapProjectResponseDto,
  })
  async updateBluemapProject(
    @Param('id') id: string,
    @Body() data: BluemapProjectUpdateDto,
  ): Promise<BluemapProjectResponseDto> {
    const bluemapProject =
      await this.bluemapProjectService.updateBluemapProject({
        where: { id: Number(id) },
        data,
      });
    return toBluemapProjectDto(bluemapProject);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    type: BluemapProjectResponseDto,
  })
  async deleteBluemapProject(
    @Param('id') id: string,
  ): Promise<BluemapProjectResponseDto> {
    const bluemapProject =
      await this.bluemapProjectService.deleteBluemapProject({
        id: Number(id),
      });
    return toBluemapProjectDto(bluemapProject);
  }
}
