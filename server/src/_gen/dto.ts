/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED        ##
 * ---------------------------------------------------------------
 */

import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDateString,
  IsEnum,
} from 'class-validator';

export class UserDto {
  id: number;
  name: string;
  email?: string;
  password: string;
  projects: ProjectDto[];
  createdAt: Date;
  updatedAt: Date;
  projectGroups: ProjectGroupDto[];
}

export class ProjectDto {
  id: number;
  name: string;
  ownerId: number;
  owner: UserDto;
  createdAt: Date;
  updatedAt: Date;
  projectGroup?: ProjectGroupDto;
  projectGroupId?: number;
  type: ProjectTypeEnum;
}

export class ProjectGroupDto {
  id: number;
  name: string;
  parentGroupId?: number;
  parentGroup?: ProjectGroupDto;
  childGroups: ProjectGroupDto[];
  ownerId: number;
  owner: UserDto;
  projects: ProjectDto[];
  createdAt: Date;
  updatedAt: Date;
}
