import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';
import { LoginDto } from './login.dto';

export class RegisterDto extends LoginDto {
  @ApiProperty()
  @IsBoolean()
  autoLogin: boolean;
}
