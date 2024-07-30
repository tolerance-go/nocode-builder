import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { OperationsDto } from './dtos';
import { SyncService } from './sync.service';

@Controller('syncs')
export class SyncController {
  constructor(private readonly syncService: SyncService) {}

  @Post('apply-operations')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 201,
  })
  @ApiResponse({ status: 400 })
  @ApiResponse({ status: 500 })
  async applyProjectDiff(
    @Body() operations: OperationsDto,
    // @Req() req: Request & { user: JwtUserDto },
  ): Promise<boolean> {
    await this.syncService.applyOperations(operations);
    return true;
  }
}
