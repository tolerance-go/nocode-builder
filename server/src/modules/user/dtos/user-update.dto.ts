import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsEmail,
  Length,
  IsDateString,
} from 'class-validator';

export class UserUpdateDto {
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(6, 20)
  password?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsDateString()
  updatedAt?: string;
}
