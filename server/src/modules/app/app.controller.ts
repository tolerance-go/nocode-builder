import {
  Controller,
  Get,
  Param,
  Query,
  Post,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Prisma } from '@prisma/client';

@Controller('apps')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':id')
  async getApp(@Param('id') id: string) {
    return this.appService.app({ id: Number(id) });
  }

  @Get()
  async getApps(
    @Query('skip') skip?: string,
    @Query('take') take?: string,
    @Query('cursor') cursor?: string,
    @Query('where') where?: Prisma.AppWhereInput,
    @Query('orderBy') orderBy?: Prisma.AppOrderByWithRelationInput,
  ) {
    return this.appService.apps({
      skip: skip ? Number(skip) : undefined,
      take: take ? Number(take) : undefined,
      cursor: cursor ? { id: Number(cursor) } : undefined,
      where,
      orderBy,
    });
  }

  @Post()
  async createApp(@Body() data: Prisma.AppCreateInput) {
    return this.appService.createApp(data);
  }

  @Patch(':id')
  async updateApp(
    @Param('id') id: string,
    @Body() data: Prisma.AppUpdateInput,
  ) {
    return this.appService.updateApp({
      where: { id: Number(id) },
      data,
    });
  }

  @Delete(':id')
  async deleteApp(@Param('id') id: string) {
    return this.appService.deleteApp({ id: Number(id) });
  }
}
