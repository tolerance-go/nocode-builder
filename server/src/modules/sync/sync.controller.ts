import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
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
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async applyProjectDiff(
    @Body() diffs: ProjectDiffDto,
    @Req() req: Request & { user: JwtUserDto },
  ): Promise<void> {
    await this.syncService.applyProjectDiff(diffs, req.user.id);
  }
}
