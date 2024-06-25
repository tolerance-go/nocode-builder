import { Controller, Post, UseGuards, Request } from '@nestjs/common';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { User } from '@prisma/client';
import { LoginResponseDto } from './dtos/login-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(
    @Request() req: Request & { user: User },
  ): Promise<LoginResponseDto> {
    return this.authService.login(req.user);
  }
}
