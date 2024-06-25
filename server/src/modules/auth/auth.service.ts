import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { LoginResponseDto } from './dtos/login-response.dto';
import { JwtPayloadDto } from './dtos/jwt-payload.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.user({
      name: username,
    });
    if (user && (await bcrypt.compare(pass, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User): Promise<LoginResponseDto> {
    const payload: JwtPayloadDto = { username: user.name, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
