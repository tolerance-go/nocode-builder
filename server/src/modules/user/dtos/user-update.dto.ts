import { ApiProperty } from '@nestjs/swagger';

export class UserUpdateDto {
  @ApiProperty({ required: false })
  name?: string;

  @ApiProperty({ required: false })
  email?: string;

  @ApiProperty({ required: false })
  password?: string;

  @ApiProperty({ required: false })
  updatedAt?: string;
}
