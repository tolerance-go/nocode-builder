import {
  Body,
  Controller,
  HttpException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { JwtUserDto } from '../auth/dtos/jwt-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ProjectDiffDto } from './dtos';
import { SyncService } from './sync.service';

@Controller('syncs')
export class SyncController {
  constructor(private readonly syncService: SyncService) {}

  @Post('apply-project-diff')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 201,
  })
  @ApiResponse({ status: 400 })
  @ApiResponse({ status: 500 })
  async applyProjectDiff(
    @Body() diffs: ProjectDiffDto,
    @Req() req: Request & { user: JwtUserDto },
  ): Promise<void> {
    throw new HttpException('Not implemented', 501);
    await this.syncService.applyProjectDiff(diffs, req.user.id);
  }
}
