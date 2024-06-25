import { ApiProperty } from '@nestjs/swagger';

export class UserCreateDto {
  @ApiProperty()
  name: string;

  @ApiProperty({ required: false })
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty({ required: false })
  createdAt?: string;

  @ApiProperty({ required: false })
  updatedAt?: string;
}
