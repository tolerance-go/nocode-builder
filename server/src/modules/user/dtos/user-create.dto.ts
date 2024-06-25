import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class UserCreateDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: false })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty()
  @IsString()
  @Length(6, 20)
  @IsNotEmpty()
  password: string;

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  createdAt?: string;

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  updatedAt?: string;
}
